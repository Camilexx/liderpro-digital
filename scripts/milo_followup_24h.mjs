#!/usr/bin/env node
/**
 * Seguimiento consultivo 24h de Milo V4.3.1 (modo seguro --dry-run por defecto).
 * - Lee Postgres en modo solo lectura para --dry-run (soporta .env.local y /opt/nexus/.env).
 * - Envía por WhatsApp Cloud API ÚNICAMENTE cuando se pasan juntas --send --confirm-hitl.
 * - Nunca imprime secretos ni números telefónicos completos en consola.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import {
  evaluateHumanEscalationMuteLock,
  sanitizeMiloLogisticsText,
} from "../src/lib/miloLogisticsPolicy.ts";

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

function parseEnvFile(filePath) {
  const out = {};
  if (!fs.existsSync(filePath)) return out;
  for (const raw of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const eq = line.indexOf("=");
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key) out[key] = val;
  }
  return out;
}

function loadEnvSafely() {
  const globalEnv = parseEnvFile("/opt/nexus/.env");
  const localEnv = parseEnvFile(path.join(REPO_ROOT, ".env.local"));
  return { ...globalEnv, ...localEnv, ...process.env };
}

function maskPhone(sessionOrPhone) {
  const digits = String(sessionOrPhone || "").replace(/[^\d]/g, "");
  if (digits.length >= 6) return `wa:${digits.slice(0, 4)}*****${digits.slice(-3)}`;
  return "wa:***";
}

function formatDurationHm(ms) {
  if (ms <= 0) return "EXPIRADA (00h 00m)";
  const totalMin = Math.floor(ms / 60000);
  const hh = Math.floor(totalMin / 60);
  const mm = totalMin % 60;
  return `${String(hh).padStart(2, "0")}h ${String(mm).padStart(2, "0")}m`;
}

function formatEcTime(dateObj) {
  return new Intl.DateTimeFormat("es-EC", {
    timeZone: "America/Guayaquil",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "2-digit",
    month: "2-digit",
  }).format(dateObj);
}

/**
 * 7 mensajes psicológicos precargados firmados como Milo:
 * - Cero fricción prematura (cero mención de transferencia anticipada/pago previo)
 * - Precios 100% coherentes con lo cotizado (y corrección amable de 9L=$121.50 para *234)
 * - Cierre por micro-compromiso centrado en el cliente
 */
const PRELOADED_FOLLOWUPS = {
  "985": {
    label: "Flota Sinotruk / Weichai / Foton / Poer / Glory",
    message:
      "Hola, soy Milo de Líder Pro. Quiero ayudarle a resolver sus 5 unidades en un solo pedido sin perder tiempo buscando por separado: tenemos listas las canecas 20L (15W-40 $125 / 10W-40 $128.50), el kit exacto de su Poer 2026 (5W-40 $92.50 o 15W-40 $69.50) con sus filtros en stock, Glory 560 ($42.50) y filtros para Foton Aumark. Ya pasé Sinotruk y Weichai al asesor para validarle todo junto. ¿A qué ciudad van y para cuándo les urge el mantenimiento?",
  },
  "234": {
    label: "Carlos Loor — Ford Ranger 3.2 Diésel 9L (Guayaquil)",
    message:
      "Hola Carlos, soy Milo de Líder Pro. Revisé bien su Ranger 3.2 porque ese motor no puede quedarse corto de aceite: le dejé armado el kit exacto de 9 litros en MANNOL 5W-40 alemán (Combo 7L $92.50 + 2L extra $29 = $121.50 c/IVA, con filtro de aceite y regalos incluidos). ¿Le toca el cambio esta semana para confirmarle hoy mismo el envío exacto a Guayaquil?",
  },
  "203": {
    label: "Anderson Romero — Toyota Hilux Vigo 2011 2.7 Gasolina 5W-30",
    message:
      "Hola Anderson, soy Milo de Líder Pro. Disculpe el cruce anterior, su Hilux 2.7 Gasolina merece el 5W-30 exacto que usted pidió para cuidarla bien: tenemos el Combo Energy JP 5W-30 (4L + filtro + regalos en $46.50, litros extra $12.50) o el Toyota OEM 5W-30 (4L $62.90, litros extra $17, filtro $3). ¿Su camioneta suele llevar 5 o 6 litros para dejarle el kit exacto listo?",
  },
  "292": {
    label: "Gary Moreira — Mazda BT-50 4x4 2012 2.5 Diésel",
    message:
      "Hola Gary, soy Milo de Líder Pro. Para que no pierda tiempo buscando el litro extra ni el filtro aparte, ya tenemos listo el kit completo de 8L para su Mazda BT-50 2.5 (Combo MANNOL 15W-40 7L + 1L extra + filtro de aceite + regalos) en $80.00 c/IVA. ¿Le queda mejor retirarlo en Pedernales o se lo despachamos directo a su ciudad?",
  },
  "263": {
    label: "Fabián — Canecas 20L 10W-40 / 15W-40",
    message:
      "Hola Fabián, soy Milo de Líder Pro. Para que su taller no pare por falta de aceite, le confirmo stock inmediato en canecas 20L MANNOL: 15W-40 a $125.00 y 10W-40 a $128.50 (incluyen filtro y regalos). ¿Cuántas canecas suele mover al mes o cuántas necesita para este despacho?",
  },
  "102": {
    label: "Julián — Chevrolet D-Max 2019 Diésel",
    message:
      "Hola Julián, soy Milo de Líder Pro. Para cuidar bien el turbo de su D-Max 2019 Diésel sin confusiones, la opción exacta es el Combo MANNOL Diesel Turbo 5W-40 7L (calidad alemana + filtro de aceite + regalos) en $92.50 c/IVA, listo para instalar. ¿Para cuándo le toca el cambio de aceite?",
  },
  "813": {
    label: "Edwin — Dongfeng Rich 6 2023 Diésel",
    message:
      "Hola Edwin, soy Milo de Líder Pro. Como su Rich 6 2023 es nueva, vale cuidarle bien el motor desde ya: tenemos el MANNOL Diésel TDI 5W-30 (7L en $103.90) y el Combo 5W-40 7L en $92.50 c/IVA (ya incluye filtro y regalos). Además tenemos sus filtros de aire ($5), combustible ($5.50) y cabina ($5.90) para dejarle el mantenimiento completo. ¿Prefiere mantenerse en 5W-30 o llevar el combo completo?",
  },
  "976": {
    label: "Ricky — Lead entrante sin vehículo aún",
    message:
      "Hola Ricky, soy Milo de Líder Pro. Vi que nos escribiste ayer y quería saber en qué te podemos ayudar hoy: ¿buscas combo de aceite + filtro, batería o algún producto para tu vehículo? Dime marca, modelo y año y te paso el dato exacto.",
  },
};

const LEDGER_PATH = "/opt/nexus/.nexus-ops/milo_followup_24h_ledger.json";

function loadLedger() {
  if (!fs.existsSync(LEDGER_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(LEDGER_PATH, "utf8")) || {};
  } catch {
    return {};
  }
}

function saveLedger(ledger) {
  fs.mkdirSync(path.dirname(LEDGER_PATH), { recursive: true });
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2) + "\n", { mode: 0o600 });
}

async function sendWhatsAppMessage(env, toDigits, bodyText) {
  const token = (env.WHATSAPP_ACCESS_TOKEN || env.WHATSAPP_TOKEN || "").trim();
  const phoneId = (env.WHATSAPP_PHONE_NUMBER_ID || "1496009743586982").trim();
  if (!token || !phoneId) {
    throw new Error("Faltan credenciales de WhatsApp Cloud API en entorno");
  }
  const resp = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: toDigits,
      type: "text",
      text: { body: bodyText },
    }),
    signal: AbortSignal.timeout(8000),
  });
  const txt = await resp.text();
  if (!resp.ok) {
    throw new Error(`WA Graph HTTP ${resp.status}: ${txt.slice(0, 180)}`);
  }
  let wamid = null;
  try {
    const parsed = JSON.parse(txt);
    wamid = parsed?.messages?.[0]?.id || null;
  } catch {
    wamid = null;
  }
  return { status: resp.status, wamid };
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const wantSend = args.has("--send");
  const confirmHitl = args.has("--confirm-hitl");

  if (wantSend && !confirmHitl) {
    console.error("BLOQUEADO (HITL): Para enviar mensajes reales debes pasar explícitamente --send --confirm-hitl.");
    process.exit(2);
  }
  const isDryRun = !wantSend;
  const env = loadEnvSafely();
  const rwDbUrl = (env.DATABASE_URL || env.POSTGRES_URL || "").trim();
  const roDbUrl = (env.LIDERPRO_DATABASE_URL_RO || "").trim();
  const dbUrl = isDryRun ? (roDbUrl || rwDbUrl) : (rwDbUrl || roDbUrl);
  const canWriteDb = Boolean(rwDbUrl) && !isDryRun;

  if (!dbUrl) {
    console.error("ERROR: No hay URL de Postgres disponible en entorno.");
    process.exit(1);
  }

  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  await client.connect();
  if (!canWriteDb) {
    await client.query("SET SESSION CHARACTERISTICS AS TRANSACTION READ ONLY");
  }

  const { rows } = await client.query(`
    SELECT
      c.phone_or_session,
      c.name,
      c.city,
      c.ad_tag,
      c.funnel_stage,
      COALESCE(c.needs_human, FALSE) AS needs_human,
      c.escalated_at,
      COALESCE(c.followup_count, 0)::int AS followup_count,
      c.last_followup_at,
      MAX(m.created_at) FILTER (WHERE m.role = 'user') AS last_user_at,
      MAX(m.created_at) AS last_msg_at
    FROM customers c
    JOIN messages m ON m.session_id = c.phone_or_session
    WHERE c.phone_or_session LIKE 'wa:%'
      AND COALESCE(c.needs_human, FALSE) = FALSE
      AND (c.escalated_at IS NULL OR c.escalated_at < NOW() - INTERVAL '24 hours')
      AND NOT EXISTS (
        SELECT 1 FROM orders o WHERE o.session_id = c.phone_or_session AND o.status <> 'cancelled'
      )
    GROUP BY c.phone_or_session, c.name, c.city, c.ad_tag, c.funnel_stage, c.needs_human, c.escalated_at, c.followup_count, c.last_followup_at
    HAVING MAX(m.created_at) FILTER (WHERE m.role = 'user') >= NOW() - INTERVAL '23 hours'
       AND COALESCE(c.followup_count, 0) < 1
    ORDER BY MAX(m.created_at) FILTER (WHERE m.role = 'user') ASC
  `);

  const ledger = loadLedger();
  const nowMs = Date.now();
  console.log(`=== MILO V4.3.1 FOLLOW-UP 24H (${isDryRun ? "DRY-RUN | 0 ENVÍOS REALES" : "LIVE SEND HITL"}) ===`);
  console.log(`Hora actual EC: ${formatEcTime(new Date(nowMs))} | Leads en ventana (<23h, followup_count=0): ${rows.length} | DB_MODE=${canWriteDb ? "RW" : "RO+LEDGER"}\n`);

  let sentCount = 0;
  let skippedLedger = 0;

  for (const row of rows) {
    const session = String(row.phone_or_session || "");
    const suffix = session.slice(-3);
    const masked = maskPhone(session);
    const lastUserAt = new Date(row.last_user_at);
    const expiresAt = new Date(lastUserAt.getTime() + 24 * 60 * 60 * 1000);
    const remainingMs = expiresAt.getTime() - nowMs;
    const preloaded = PRELOADED_FOLLOWUPS[suffix];

    if (!preloaded) continue;
    const muteVerdict = evaluateHumanEscalationMuteLock({
      needsHuman: Boolean(row.needs_human),
      escalatedAt: row.escalated_at || null,
    });
    if (muteVerdict.muted) {
      console.log(`- ${masked} | BLOQUEADO (${muteVerdict.reason})\n`);
      continue;
    }
    const safeMessage = sanitizeMiloLogisticsText(preloaded.message);
    if (ledger[masked]) {
      skippedLedger += 1;
      console.log(`- ${masked} | ${row.name || "Sin nombre"} | YA ENVIADO EN LEDGER (${ledger[masked].sentAt})\n`);
      continue;
    }

    const urgencyNote = suffix === "985" ? " [⚠️ VENCE PRIMERO ~12:54 PM EC]" : "";
    console.log(
      `- ${masked} | ${row.name || "Sin nombre"} | ${preloaded.label} | followup_count=${row.followup_count}\n` +
        `  Último msg cliente: ${formatEcTime(lastUserAt)} | Vence 24h: ${formatEcTime(expiresAt)} | Restante: ${formatDurationHm(remainingMs)}${urgencyNote}`
    );
    console.log(`  Mensaje Milo (${safeMessage.length} chars): "${safeMessage}"\n`);

    if (!isDryRun) {
      const toDigits = session.replace(/[^\d]/g, "");
      const waRes = await sendWhatsAppMessage(env, toDigits, safeMessage);
      const sentAtIso = new Date().toISOString();
      ledger[masked] = {
        sessionMasked: masked,
        suffix,
        sentAt: sentAtIso,
        httpStatus: waRes.status,
        wamid: waRes.wamid,
      };
      saveLedger(ledger);
      if (canWriteDb) {
        await client.query(
          `INSERT INTO messages (session_id, channel, role, content, intent_tag, created_at)
           VALUES ($1, 'whatsapp', 'assistant', $2, 'followup_24h', NOW())`,
          [session, safeMessage]
        );
        await client.query(
          `UPDATE customers
           SET last_followup_at = NOW(),
               followup_count = COALESCE(followup_count, 0) + 1,
               updated_at = NOW()
           WHERE phone_or_session = $1`,
          [session]
        );
      }
      console.log(`  ✅ ENVIADO ${masked} | HTTP ${waRes.status} | wamid=${waRes.wamid || "ok"} | hora_ec=${formatEcTime(new Date())}`);
      sentCount += 1;
    }
  }

  console.log(`RESUMEN: candidatos_precargados=${rows.filter((r) => PRELOADED_FOLLOWUPS[String(r.phone_or_session).slice(-3)]).length}, skipped_ledger=${skippedLedger}, enviados=${sentCount}, modo=${isDryRun ? "DRY_RUN" : "LIVE_SEND"}`);
  await client.end();
}

main().catch((err) => {
  console.error("ERROR followup_24h:", err instanceof Error ? err.message : String(err));
  process.exit(1);
});
