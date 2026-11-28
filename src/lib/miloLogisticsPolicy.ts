/**
 * Reglas inquebrantables de logística y reloj real America/Guayaquil para MILO / Hermes:
 *   1. Neutralidad de Transporte: prohibido nombrar cooperativas, Servientrega, Tramaco ni flotas específicas.
 *      Usar únicamente "envío a tu ciudad / dirección acordada" o "despacho nacional coordinado".
 *   2. Reloj Real America/Guayaquil (UTC-5, sin DST):
 *      - Lun–Vie hasta 16:30 EC → despacho el mismo día permitido.
 *      - Sáb hasta 12:00 EC     → despacho el mismo día permitido.
 *      - Después de corte o Dom → prohibido decir "hoy mismo"; usar:
 *        "dejarlo separado hoy en bodega y despacharlo en el primer turno hábil con guía".
 *
 * Sin dependencias de Next.js: testeable directamente con `node --test`.
 */

export const AFTER_HOURS_DISPATCH_PHRASE =
  "dejarlo separado hoy en bodega y despacharlo en el primer turno hábil con foto de tu guía apenas salga a ruta";

export const SAME_DAY_DISPATCH_PHRASE = "despacharlo hoy mismo con foto de tu guía apenas salga a ruta";

export const HUMAN_ESCALATION_MUTE_WINDOW_MS = 24 * 60 * 60 * 1000;

export interface HumanMuteState {
  needsHuman?: boolean | null;
  escalatedAt?: string | Date | null;
  lastHumanInterventionAt?: string | Date | null;
}

export interface HumanMuteVerdict {
  muted: boolean;
  reason: string | null;
}

/**
 * HUMAN_ESCALATION_MUTE_LOCK:
 * Bloquea 100% cualquier respuesta automática o seguimiento si la sesión tiene escalamiento activo
 * o recibió escalamiento/intervención manual en las últimas 24h (jamás pisar una venta caliente).
 */
export function evaluateHumanEscalationMuteLock(
  state: HumanMuteState | null | undefined,
  now: Date = new Date()
): HumanMuteVerdict {
  if (!state) return { muted: false, reason: null };
  if (state.needsHuman === true) {
    return { muted: true, reason: "HUMAN_ESCALATION_MUTE_LOCK:needs_human_active" };
  }
  const nowMs = now.getTime();
  for (const [label, raw] of [
    ["escalated_within_24h", state.escalatedAt],
    ["manual_intervention_within_24h", state.lastHumanInterventionAt],
  ] as const) {
    if (!raw) continue;
    const ts = raw instanceof Date ? raw.getTime() : Date.parse(String(raw));
    if (Number.isFinite(ts) && nowMs - ts >= 0 && nowMs - ts < HUMAN_ESCALATION_MUTE_WINDOW_MS) {
      return { muted: true, reason: `HUMAN_ESCALATION_MUTE_LOCK:${label}` };
    }
  }
  return { muted: false, reason: null };
}

export interface EcuadorClock {
  weekday: string; // "Mon".."Sun"
  hour: number;
  minute: number;
  minutesOfDay: number;
}

export function getEcuadorClock(now: Date = new Date()): EcuadorClock {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Guayaquil",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value || "Mon";
  let hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  if (hour === 24) hour = 0;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { weekday, hour, minute, minutesOfDay: hour * 60 + minute };
}

/** True únicamente en Lun–Vie <= 16:30 EC o Sáb <= 12:00 EC. Domingo siempre false. */
export function isWithinSameDayDispatchWindowEC(now: Date = new Date()): boolean {
  const clk = getEcuadorClock(now);
  if (clk.weekday === "Sun") return false;
  if (clk.weekday === "Sat") return clk.minutesOfDay <= 12 * 60;
  return clk.minutesOfDay <= 16 * 60 + 30;
}

export function getDispatchTimingPhraseEC(now: Date = new Date()): string {
  return isWithinSameDayDispatchWindowEC(now)
    ? SAME_DAY_DISPATCH_PHRASE
    : AFTER_HOURS_DISPATCH_PHRASE;
}

/**
 * Neutraliza cualquier mención a flotas/cooperativas/couriers específicos y elimina promesas
 * de "despacho hoy mismo" cuando la hora real en America/Guayaquil supera el corte hábil.
 */
export function sanitizeMiloLogisticsText(raw: string, now: Date = new Date()): string {
  let text = String(raw || "");

  // 1. Neutralidad de Transporte (cero menciones a cooperativas, Servientrega, Tramaco o flotas)
  text = text
    .replace(
      /\b(?:por|en|v[ií]a)\s+(?:cooperativas?\s+de\s+transporte|cooperativa\s*\/\s*servientrega\s*\/\s*tramaco|cooperativa\s+flota\s+[a-záéíóúñ]+(?:\s+[a-záéíóúñ]+)?|flota\s+[a-záéíóúñ]+|cooperativas?(?:\s+de\s+transporte)?(?:\s*,\s*servientrega(?:\s+o\s+tramaco)?)?|servientrega(?:\s*(?:,|\/|o|y)\s*tramaco)?|tramaco(?:\s*express)?|laarcourier|urbano\s+express|enetsa|reina\s+del\s+camino|trans\s+esmeraldas)\b/gi,
      "mediante despacho nacional coordinado"
    )
    .replace(
      /\b(?:cooperativa\s*\/\s*servientrega\s*\/\s*tramaco|servientrega|tramaco(?:\s*express)?|laarcourier|flota\s+imbabura|flota\s+invabura|reina\s+del\s+camino|trans\s+esmeraldas|cooperativas?\s+de\s+transporte|cooperativas?)\b/gi,
      "despacho nacional coordinado"
    )
    .replace(/\(\s*env[ií]o\s*<48h\s+mediante\s+despacho\s+nacional\s+coordinado\s*\)/gi, "(despacho nacional coordinado <48h)")
    .replace(/\benv[ií]o\s+mediante\s+despacho\s+nacional\s+coordinado\b/gi, "despacho nacional coordinado")
    .replace(/\bmediante\s+despacho\s+nacional\s+coordinado\s+mediante\s+despacho\s+nacional\s+coordinado\b/gi, "mediante despacho nacional coordinado");

  // 2. Reloj Real America/Guayaquil: fuera de corte prohibido prometer despacho/embalaje "hoy mismo"
  if (!isWithinSameDayDispatchWindowEC(now)) {
    text = text
      .replace(
        /\b(?:para\s+)?(?:despacharlo|despach[aá]rtelo|despachamos|envi[aá]rtelo|enviarlo|embalar(?:lo)?|salir\s+a\s+despachar)\s+hoy\s+mismo\b(?:\s+con\s+gu[ií]a)?/gi,
        (m) => (/^para\s+/i.test(m) ? `para ${AFTER_HOURS_DISPATCH_PHRASE}` : AFTER_HOURS_DISPATCH_PHRASE)
      )
      .replace(
        /\bembala\s+tu\s+pedido\s+hoy\s+mismo\b/gi,
        "deja tu pedido separado hoy en bodega y lo despacha en el primer turno hábil"
      )
      .replace(
        /\bsale\s+a\s+coordinar\s+la\s+entrega\s+contigo\s+hoy\s+mismo\b/gi,
        "deja tu pedido separado hoy en bodega y coordina la entrega en el primer turno hábil"
      )
      .replace(/\bhoy\s+mismo\b/gi, "en el primer turno hábil");
  }

  return text.replace(/[ \t]{2,}/g, " ").trim();
}

export function buildNeutralFreightEscalationCopy(params: {
  customerName?: string | null;
  cityLabel: string;
  totalTxt: string;
  selectedSkusLabel?: string | null;
  now?: Date;
}): { howToHandle: string; suggestedReply: string } {
  const rawName = (params.customerName || "").trim();
  const safeName =
    rawName &&
    !/^[a-f0-9]{6,}$/i.test(rawName.replace(/\s+/g, "")) &&
    !/\d|_/.test(rawName) &&
    !/^(?:ad|user|usr|lead|wa|id)[-_:.]/i.test(rawName) &&
    rawName.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, "").length >= 2
      ? rawName
      : "";
  const greeting = safeName ? `Hola ${safeName}` : "¡Hola! Qué gusto saludarte";
  const timing = getDispatchTimingPhraseEC(params.now);
  const howToHandle =
    `1) Cotiza el flete exacto para ${params.selectedSkusLabel || "el kit cotizado"} (${params.totalTxt}) según peso y destino (${params.cityLabel}) sin prometer flota ni courier específico.\n` +
    `2) Envía el valor exacto del envío a tu ciudad / dirección acordada sin contradecir el precio del kit dado por Milo y pide los datos para despacho nacional coordinado.`;
  const suggestedReply =
    `${greeting}, soy el asesor de LíderPro Pedernales. Tu kit ya está listo (${params.totalTxt} c/IVA) y enseguida te confirmo el valor exacto del envío a tu ciudad (${params.cityLabel}) para ${timing}.`;
  return { howToHandle, suggestedReply };
}
