import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  approveOrderPayment,
  buildApprovedDispatchMessage,
  buildRejectedPaymentMessage,
  generateAndSaveWeeklyAudit,
  getAdminDashboardSnapshot,
  getCustomer,
  insertMessage,
  rejectOrderPayment,
  resolveCustomerHumanEscalation,
  sendWhatsAppTextDirect,
  updateOrderStatus,
  upsertCustomer,
  type ChannelType,
  type OrderStatus,
} from "@/lib/hermesDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeEqual(aStr: string, bStr: string): boolean {
  const a = Buffer.from(aStr, "utf8");
  const b = Buffer.from(bStr, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function isAuthorizedAdmin(req: NextRequest): { configured: boolean; authorized: boolean } {
  const adminKey = (process.env.HERMES_ADMIN_KEY || "").trim();
  const cronSecret = (process.env.CRON_SECRET || "").trim();

  if (!adminKey && !cronSecret) {
    return { configured: false, authorized: false };
  }

  const headerKey = (req.headers.get("x-hermes-admin-key") || "").trim();
  const authHeader = (req.headers.get("authorization") || "").trim();
  const bearerKey = authHeader.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : "";

  const candidate = headerKey || bearerKey;
  if (!candidate) {
    return { configured: true, authorized: false };
  }

  if (adminKey && safeEqual(adminKey, candidate)) {
    return { configured: true, authorized: true };
  }
  if (cronSecret && bearerKey && safeEqual(cronSecret, bearerKey)) {
    return { configured: true, authorized: true };
  }

  return { configured: true, authorized: false };
}

function authErrorResponse(configured: boolean) {
  if (!configured) {
    return NextResponse.json(
      { ok: false, error: "HERMES_ADMIN_KEY no está configurada en las variables de entorno del servidor." },
      { status: 503 }
    );
  }
  return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
}

export async function GET(req: NextRequest) {
  try {
    const auth = isAuthorizedAdmin(req);
    if (!auth.configured || !auth.authorized) {
      return authErrorResponse(auth.configured);
    }

    const { searchParams } = new URL(req.url);
    const daysRaw = Number(searchParams.get("days") || "7");
    const days = Number.isFinite(daysRaw) ? daysRaw : 7;
    const view = (searchParams.get("view") || "").toLowerCase();

    if (view === "dashboard") {
      const channel = (searchParams.get("channel") || "all").toLowerCase();
      const onlyFix = searchParams.get("onlyFix") === "1" || searchParams.get("onlyFix") === "true";
      const dashboard = await getAdminDashboardSnapshot({ channel, onlyFix, days });
      return NextResponse.json({ ok: true, dashboard }, { status: 200 });
    }

    const notifyTelegram =
      searchParams.get("cron") === "1" ||
      searchParams.get("notify") === "1" ||
      req.headers.get("x-vercel-cron") === "1";

    const { report, telegramSent } = await generateAndSaveWeeklyAudit(days, {
      notifyTelegram,
    });
    return NextResponse.json({ ok: true, audit: report, telegramSent }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo generar la auditoría semanal de Milo." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = isAuthorizedAdmin(req);
    if (!auth.configured || !auth.authorized) {
      return authErrorResponse(auth.configured);
    }

    let days = 7;
    let notifyTelegram = true;
    try {
      const body = (await req.json()) as { days?: number; notifyTelegram?: boolean };
      if (typeof body?.days === "number" && Number.isFinite(body.days)) {
        days = body.days;
      }
      if (typeof body?.notifyTelegram === "boolean") {
        notifyTelegram = body.notifyTelegram;
      }
    } catch {
      // Body vacío usa valores por defecto
    }

    const { report, telegramSent } = await generateAndSaveWeeklyAudit(days, {
      notifyTelegram,
    });
    return NextResponse.json({ ok: true, audit: report, telegramSent }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo generar la auditoría semanal de Milo." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = isAuthorizedAdmin(req);
    if (!auth.configured || !auth.authorized) {
      return authErrorResponse(auth.configured);
    }

    const body = (await req.json()) as {
      action?: string;
      sessionId?: string;
      orderId?: number | string;
      status?: string;
      reason?: string;
      message?: string;
      city?: string | null;
      clearBadName?: boolean;
      unmute?: boolean;
      skusUsed?: string[];
      quotedTotalUsd?: number | null;
      intentTag?: string;
    };

    if (body.action === "send_verified_reply") {
      const targetSession = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
      const replyText = typeof body.message === "string" ? body.message.trim() : "";
      if (!targetSession || !replyText) {
        return NextResponse.json(
          { ok: false, error: "Se requieren 'sessionId' y 'message'." },
          { status: 400 }
        );
      }

      if (body.unmute !== false) {
        await resolveCustomerHumanEscalation(targetSession);
      }

      const existing = await getCustomer(targetSession);
      if (body.city || body.clearBadName) {
        await upsertCustomer({
          phoneOrSession: targetSession,
          name: body.clearBadName ? null : existing?.name ?? null,
          activeVehicle: existing?.activeVehicle ?? null,
          city: body.city ?? existing?.city ?? null,
          customerType: existing?.customerType ?? "taller",
          commercialState: existing?.commercialState ?? undefined,
          adId: existing?.adId ?? null,
          adTag: existing?.adTag ?? null,
          ctwaClid: existing?.ctwaClid ?? null,
          adHeadline: existing?.adHeadline ?? null,
          funnelStage: "producto_cotizado",
        });
      }

      const waTarget = targetSession.startsWith("wa:") ? targetSession.slice(3).replace(/[^\d]/g, "") : "";
      const whatsappSent = waTarget ? await sendWhatsAppTextDirect(waTarget, replyText) : false;

      if (whatsappSent) {
        await insertMessage({
          sessionId: targetSession,
          channel: "whatsapp",
          role: "assistant",
          content: replyText,
          skusUsed: Array.isArray(body.skusUsed) ? body.skusUsed : [],
          quotedTotalUsd: typeof body.quotedTotalUsd === "number" ? body.quotedTotalUsd : null,
          intentTag: body.intentTag || "b2b_flota",
          adId: existing?.adId ?? null,
          adTag: existing?.adTag ?? null,
          ctwaClid: existing?.ctwaClid ?? null,
        });
      }

      return NextResponse.json(
        { ok: whatsappSent, sessionId: targetSession, whatsappSent, unmuted: body.unmute !== false },
        { status: whatsappSent ? 200 : 502 }
      );
    }

    if (body.action === "resolve_escalation") {
      const targetSession = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
      if (!targetSession) {
        return NextResponse.json(
          { ok: false, error: "Se requiere 'sessionId' para resolver el escalamiento." },
          { status: 400 }
        );
      }
      const res = await resolveCustomerHumanEscalation(targetSession);
      return NextResponse.json({ ok: true, resolved: res.ok, sessionId: targetSession }, { status: 200 });
    }

    if (body.action === "approve_payment") {
      const targetOrderId = Number(body.orderId);
      if (!Number.isFinite(targetOrderId) || targetOrderId <= 0) {
        return NextResponse.json({ ok: false, error: "Se requiere 'orderId' válido." }, { status: 400 });
      }
      const approved = await approveOrderPayment(targetOrderId);
      if (!approved) {
        return NextResponse.json({ ok: false, error: "Pedido no encontrado." }, { status: 404 });
      }
      const dispatchMessage = buildApprovedDispatchMessage(approved);
      const msgChannel: ChannelType = approved.sessionId.startsWith("wa:")
        ? "whatsapp"
        : approved.sessionId.startsWith("ig:")
        ? "instagram"
        : approved.sessionId.startsWith("fb:")
        ? "messenger"
        : "demo_web";

      await insertMessage({
        sessionId: approved.sessionId,
        channel: msgChannel,
        role: "assistant",
        content: dispatchMessage,
        skusUsed: approved.itemsJson.map((i) => i.sku),
        quotedTotalUsd: approved.totalUsd,
        intentTag: "pago_verificado_despacho",
      });

      const waTarget = approved.sessionId.startsWith("wa:")
        ? approved.sessionId.slice(3)
        : approved.phone || "";
      const whatsappNotified =
        msgChannel === "whatsapp" && waTarget ? await sendWhatsAppTextDirect(waTarget, dispatchMessage) : false;

      return NextResponse.json(
        { ok: true, order: approved, dispatchMessage, whatsappNotified },
        { status: 200 }
      );
    }

    if (body.action === "reject_payment") {
      const targetOrderId = Number(body.orderId);
      if (!Number.isFinite(targetOrderId) || targetOrderId <= 0) {
        return NextResponse.json({ ok: false, error: "Se requiere 'orderId' válido." }, { status: 400 });
      }
      const rejected = await rejectOrderPayment(targetOrderId, body.reason ?? null);
      if (!rejected) {
        return NextResponse.json({ ok: false, error: "Pedido no encontrado." }, { status: 404 });
      }
      const rejectionMessage = buildRejectedPaymentMessage(rejected, body.reason ?? null);
      const msgChannel: ChannelType = rejected.sessionId.startsWith("wa:")
        ? "whatsapp"
        : rejected.sessionId.startsWith("ig:")
        ? "instagram"
        : rejected.sessionId.startsWith("fb:")
        ? "messenger"
        : "demo_web";

      await insertMessage({
        sessionId: rejected.sessionId,
        channel: msgChannel,
        role: "assistant",
        content: rejectionMessage,
        quotedTotalUsd: rejected.totalUsd,
        intentTag: "pago_rechazado_reintento",
      });

      const waTarget = rejected.sessionId.startsWith("wa:")
        ? rejected.sessionId.slice(3)
        : rejected.phone || "";
      const whatsappNotified =
        msgChannel === "whatsapp" && waTarget ? await sendWhatsAppTextDirect(waTarget, rejectionMessage) : false;

      return NextResponse.json(
        { ok: true, order: rejected, rejectionMessage, whatsappNotified },
        { status: 200 }
      );
    }

    const orderId = Number(body.orderId);
    const validStatuses: OrderStatus[] = [
      "pending_dispatch",
      "awaiting_payment",
      "payment_pending_verification",
      "ready_for_dispatch",
      "dispatched",
      "completed",
      "cancelled",
    ];
    const nextStatus = validStatuses.includes(body.status as OrderStatus)
      ? (body.status as OrderStatus)
      : null;

    if (!Number.isFinite(orderId) || orderId <= 0 || !nextStatus) {
      return NextResponse.json(
        { ok: false, error: "Se requieren 'orderId' y 'status' válido." },
        { status: 400 }
      );
    }

    const res = await updateOrderStatus(orderId, nextStatus);
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "Pedido no encontrado." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, order: res.order }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo actualizar el estado del pedido." },
      { status: 500 }
    );
  }
}
