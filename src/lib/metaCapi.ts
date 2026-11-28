/**
 * Meta Conversions API (CAPI) — emisor server-side para el webhook WhatsApp Línea 24/7.
 *
 * - Dataset por defecto: 1841181450502602 (LiderPro_Pedernales_Dataset), override META_DATASET_ID / META_PIXEL_ID.
 * - `Lead`    → mensaje entrante con `ctwa_clid` (Click-to-WhatsApp). action_source=business_messaging.
 * - `Contact` → mensaje orgánico (sin ctwa_clid). action_source=chat. 1 evento por remitente y día UTC.
 * - event_id determinista (sha256) ⇒ reintentos de Meta / mensajes repetidos deduplican en el Dataset.
 * - Modo seguro: META_CAPI_DRY_RUN es `true` salvo que se ponga explícitamente "false" | "0" | "off" | "no".
 * - Nunca se loguean tokens ni teléfonos en claro (solo hash SHA-256 normalizado según especificación Meta).
 *
 * Sin dependencias de Next.js: importable desde `node --test` (type stripping de Node >= 22.18).
 */
import { createHash } from "node:crypto";

export const DEFAULT_CAPI_DATASET_ID = "1841181450502602";
export const DEFAULT_CAPI_GRAPH_VERSION = "v21.0";

export type CapiEventName = "Lead" | "Contact";

export interface CapiInboundInput {
  /** wa_id del remitente (dígitos con código de país). */
  from: string;
  /** ID del mensaje WhatsApp (wamid…). */
  messageId?: string | null;
  /** Timestamp Unix (segundos) del mensaje según el webhook. */
  timestamp?: string | number | null;
  ctwaClid?: string | null;
  adId?: string | null;
  /** entry.id del webhook = WhatsApp Business Account ID. */
  wabaId?: string | null;
}

export interface CapiEvent {
  event_name: CapiEventName;
  event_time: number;
  event_id: string;
  action_source: "business_messaging" | "chat";
  messaging_channel?: "whatsapp";
  user_data: {
    ph?: string[];
    ctwa_clid?: string;
    whatsapp_business_account_id?: string;
  };
  custom_data?: Record<string, string>;
}

export interface CapiPayload {
  data: CapiEvent[];
  test_event_code?: string;
}

export type CapiEnv = Record<string, string | undefined>;

export interface CapiSendResult {
  ok: boolean;
  dryRun: boolean;
  skipped?: string;
  eventId: string;
  eventName: CapiEventName;
  status?: number;
  error?: string;
}

const sha256 = (v: string) => createHash("sha256").update(v, "utf8").digest("hex");

export function normalizePhoneDigits(phone: string): string {
  return (phone || "").replace(/\D/g, "");
}

export function hashPhone(phone: string): string | null {
  const digits = normalizePhoneDigits(phone);
  return digits.length >= 8 ? sha256(digits) : null;
}

export function isCapiDryRun(env: CapiEnv): boolean {
  const raw = (env.META_CAPI_DRY_RUN ?? "").trim().toLowerCase();
  return !["false", "0", "off", "no"].includes(raw);
}

export function resolveEventTime(timestamp: CapiInboundInput["timestamp"], nowSec: number): number {
  const n = Number(timestamp);
  // Meta rechaza eventos > 7 días o en el futuro; fuera de rango ⇒ ahora.
  if (Number.isFinite(n) && n > 0 && n <= nowSec + 60 && nowSec - n < 7 * 86400) return Math.floor(n);
  return nowSec;
}

export function classifyCapiEvent(input: CapiInboundInput): CapiEventName {
  return (input.ctwaClid || "").trim() ? "Lead" : "Contact";
}

/**
 * event_id determinista:
 *  - Lead:    lp_lead_<sha256(ctwa_clid)[:24]>        (1 lead por clic CTWA)
 *  - Contact: lp_contact_<sha256(from|YYYY-MM-DD)[:24]> (1 contacto por remitente/día UTC)
 */
export function buildCapiEventId(input: CapiInboundInput, eventTimeSec: number): string {
  const clid = (input.ctwaClid || "").trim();
  if (clid) return `lp_lead_${sha256(`ctwa:${clid}`).slice(0, 24)}`;
  const day = new Date(eventTimeSec * 1000).toISOString().slice(0, 10);
  return `lp_contact_${sha256(`wa:${normalizePhoneDigits(input.from)}|${day}`).slice(0, 24)}`;
}

export function buildCapiPayload(input: CapiInboundInput, env: CapiEnv, nowSec = Math.floor(Date.now() / 1000)): CapiPayload {
  const eventName = classifyCapiEvent(input);
  const eventTime = resolveEventTime(input.timestamp, nowSec);
  const clid = (input.ctwaClid || "").trim();
  const ph = hashPhone(input.from);

  const ev: CapiEvent = {
    event_name: eventName,
    event_time: eventTime,
    event_id: buildCapiEventId(input, eventTime),
    action_source: clid ? "business_messaging" : "chat",
    user_data: {},
  };
  if (ph) ev.user_data.ph = [ph];
  if (clid) {
    ev.messaging_channel = "whatsapp";
    ev.user_data.ctwa_clid = clid;
    const waba = (input.wabaId || "").trim();
    if (waba) ev.user_data.whatsapp_business_account_id = waba;
  }
  const adId = (input.adId || "").trim();
  if (adId) ev.custom_data = { ad_id: adId, lead_channel: "whatsapp_247" };
  else ev.custom_data = { lead_channel: "whatsapp_247" };

  const payload: CapiPayload = { data: [ev] };
  const testCode = (env.META_CAPI_TEST_EVENT_CODE || "").trim();
  if (testCode) payload.test_event_code = testCode;
  return payload;
}

export async function sendWhatsAppCapiEvent(
  input: CapiInboundInput,
  env: CapiEnv = process.env,
  fetchImpl: typeof fetch = fetch
): Promise<CapiSendResult> {
  const payload = buildCapiPayload(input, env);
  const ev = payload.data[0];
  const base = { eventId: ev.event_id, eventName: ev.event_name };

  if (!normalizePhoneDigits(input.from) && !ev.user_data.ctwa_clid) {
    return { ok: false, dryRun: true, skipped: "no_user_data", ...base };
  }
  if (isCapiDryRun(env)) {
    return { ok: true, dryRun: true, ...base };
  }

  const datasetId = (env.META_DATASET_ID || env.META_PIXEL_ID || DEFAULT_CAPI_DATASET_ID).trim();
  const token = (env.META_CAPI_ACCESS_TOKEN || env.META_ACCESS_TOKEN || "").trim();
  if (!token) return { ok: false, dryRun: false, skipped: "missing_token", ...base };
  const version = (env.META_GRAPH_VERSION || DEFAULT_CAPI_GRAPH_VERSION).trim();

  try {
    const res = await fetchImpl(`https://graph.facebook.com/${version}/${datasetId}/events`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const txt = (await res.text().catch(() => "")).slice(0, 200);
      return { ok: false, dryRun: false, status: res.status, error: txt, ...base };
    }
    return { ok: true, dryRun: false, status: res.status, ...base };
  } catch (err) {
    return { ok: false, dryRun: false, error: err instanceof Error ? err.message.slice(0, 160) : "fetch_error", ...base };
  }
}
