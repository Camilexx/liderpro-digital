import { NextRequest, NextResponse } from "next/server";
import { updateMessageQaFeedback } from "@/lib/hermesDb";
import { generateHermesReply, type ChatTurn } from "@/lib/hermesEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function generateDemoSessionId(): string {
  return `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      message?: string;
      history?: ChatTurn[];
      sessionId?: string;
      customerName?: string;
    };

    const message = (body.message || "").trim();
    if (!message) {
      return NextResponse.json(
        { ok: false, error: "El campo 'message' es requerido." },
        { status: 400 }
      );
    }

    const sessionId =
      typeof body.sessionId === "string" && body.sessionId.trim().length > 0
        ? body.sessionId.trim().slice(0, 120)
        : generateDemoSessionId();

    const history = Array.isArray(body.history) ? body.history : [];
    const result = await generateHermesReply(message, history, {
      sessionId,
      channel: "demo_web",
      customerName: typeof body.customerName === "string" ? body.customerName.trim().slice(0, 80) : null,
      timeoutMs: 4800,
    });

    return NextResponse.json(
      {
        ok: true,
        reply: result.reply,
        model: result.model,
        usedFallback: result.usedFallback,
        latencyMs: result.latencyMs,
        matchedSkus: result.matchedSkus,
        catalogSize: result.catalogSize,
        sessionId: result.sessionId,
        messageId: result.messageId,
        activeVehicle: result.activeVehicle,
        city: result.city,
        customerType: result.customerType,
        quotedTotalUsd: result.quotedTotalUsd,
        intentTag: result.intentTag,
        dbStorageMode: result.dbStorageMode,
        orderCreated: result.orderCreated,
        order: result.order,
        channel: "whatsapp_demo_hermes_24_7",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "No se pudo procesar la consulta en el simulador de Hermes.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      messageId?: number | string;
      qaFlag?: string;
      qaNote?: string;
    };

    const messageId = Number(body.messageId);
    const qaFlag = body.qaFlag === "good" || body.qaFlag === "fix" ? body.qaFlag : null;

    if (!Number.isFinite(messageId) || messageId <= 0 || !qaFlag) {
      return NextResponse.json(
        { ok: false, error: "Se requieren 'messageId' numérico y 'qaFlag' ('good' | 'fix')." },
        { status: 400 }
      );
    }

    const res = await updateMessageQaFeedback(
      messageId,
      qaFlag,
      typeof body.qaNote === "string" ? body.qaNote : null
    );

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Mensaje no encontrado para registrar auditoría QA." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, updated: res.updated }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar el feedback QA." },
      { status: 500 }
    );
  }
}
