export interface WhatsAppLine {
  id: "matriz" | "despachos";
  label: string;
  subtitle: string;
  statusBadge: string;
  phone: string;
  displayPhone: string;
}

export const LIDERPRO_WHATSAPP_LINES: Record<"matriz" | "despachos", WhatsAppLine> = {
  matriz: {
    id: "matriz",
    label: "Línea Oficial 1 — Matriz / Pedernales Vía al Carmen",
    subtitle: "Atención en Mostrador Local (Horario Comercial Lun-Sáb 08:00–18:00) • Retiro en local.",
    statusBadge: "🟢 En línea ahora • Mostrador Local",
    phone: process.env.NEXT_PUBLIC_WHATSAPP_LINE_1 || "593983893231",
    displayPhone: "+593 98 389 3231",
  },
  despachos: {
    id: "despachos",
    label: "Línea Oficial 2 — Atención 24/7 & Despachos",
    subtitle: "Cotizaciones inmediatas 24/7/365, campañas, envíos a las 24 provincias y flotas.",
    statusBadge: "🟢 En línea ahora • Atención 24/7 & Despachos",
    phone: process.env.NEXT_PUBLIC_WHATSAPP_LINE_2 || "593967489002",
    displayPhone: "+593 96 748 9002",
  },
};

/**
 * Evalúa si la hora actual en Ecuador (America/Guayaquil) está dentro del
 * horario comercial del local físico: Lunes a Sábado de 08:00 a 18:00.
 */
export function isEcuadorBusinessHours(now: Date = new Date()): boolean {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Guayaquil",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);

    const weekday = parts.find((p) => p.type === "weekday")?.value || "";
    const hourRaw = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
    const hour = hourRaw === 24 ? 0 : hourRaw;

    if (weekday === "Sun") return false;
    return hour >= 8 && hour < 18;
  } catch {
    return true;
  }
}

export function buildContextualWhatsAppMessage(
  itemOrCombo?: string,
  extraContext?: string
): string {
  const subject = itemOrCombo?.trim()
    ? itemOrCombo.trim()
    : "¡Combo Cambio MANNOL! o repuestos";

  const base = `¡Hola LiderPro! Vengo de la web y deseo cotizar el ${subject} con mi regalo de cortesía (MANNOL 6145 Cockpit Care + Esponja) para mi vehículo.`;
  return extraContext?.trim() ? `${base} ${extraContext.trim()}` : base;
}

export function buildLineWhatsAppUrl(
  lineId: "matriz" | "despachos",
  message: string
): string {
  const line = LIDERPRO_WHATSAPP_LINES[lineId];
  return `https://wa.me/${line.phone}?text=${encodeURIComponent(message)}`;
}
