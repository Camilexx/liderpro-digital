import { NextRequest, NextResponse } from "next/server";
import { generateHermesReply, type ChatTurn } from "@/lib/hermesEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      message?: string;
      history?: ChatTurn[];
    };

    const message = (body.message || "").trim();
    if (!message) {
      return NextResponse.json(
        { error: "El campo 'message' es requerido." },
        { status: 400 }
      );
    }

    const history = Array.isArray(body.history) ? body.history : [];
    const result = await generateHermesReply(message, history, { timeoutMs: 2100 });

    return NextResponse.json(
      {
        ok: true,
        reply: result.reply,
        model: result.model,
        usedFallback: result.usedFallback,
        latencyMs: result.latencyMs,
        matchedSkus: result.matchedSkus,
        catalogSize: result.catalogSize,
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
