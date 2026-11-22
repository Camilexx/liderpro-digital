import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  generateAndSaveWeeklyAudit,
  getAdminDashboardSnapshot,
  resolveCustomerHumanEscalation,
  updateOrderStatus,
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
    };

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

    const orderId = Number(body.orderId);
    const validStatuses: OrderStatus[] = ["pending_dispatch", "dispatched", "completed", "cancelled"];
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
