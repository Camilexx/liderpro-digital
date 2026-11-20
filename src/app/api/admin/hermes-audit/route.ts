import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { generateAndSaveWeeklyAudit } from "@/lib/hermesDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorizedAdmin(req: NextRequest): { configured: boolean; authorized: boolean } {
  const expectedKey = (process.env.HERMES_ADMIN_KEY || "").trim();
  if (!expectedKey) {
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

  const a = Buffer.from(expectedKey, "utf8");
  const b = Buffer.from(candidate, "utf8");
  if (a.length !== b.length) {
    return { configured: true, authorized: false };
  }
  return { configured: true, authorized: crypto.timingSafeEqual(a, b) };
}

async function handleAuditRequest(req: NextRequest, daysParam: number) {
  const auth = isAuthorizedAdmin(req);
  if (!auth.configured) {
    return NextResponse.json(
      { ok: false, error: "HERMES_ADMIN_KEY no está configurada en las variables de entorno del servidor." },
      { status: 503 }
    );
  }
  if (!auth.authorized) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  const audit = await generateAndSaveWeeklyAudit(daysParam);
  return NextResponse.json({ ok: true, audit }, { status: 200 });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const daysRaw = Number(searchParams.get("days") || "7");
    const days = Number.isFinite(daysRaw) ? daysRaw : 7;
    return await handleAuditRequest(req, days);
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo generar la auditoría semanal de Hermes." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let days = 7;
    try {
      const body = (await req.json()) as { days?: number };
      if (typeof body?.days === "number" && Number.isFinite(body.days)) {
        days = body.days;
      }
    } catch {
      // Body vacío permitido, usa default 7 días
    }
    return await handleAuditRequest(req, days);
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo generar la auditoría semanal de Hermes." },
      { status: 500 }
    );
  }
}
