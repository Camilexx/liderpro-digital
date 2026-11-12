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
    subtitle: "Mostrador técnico, entregas inmediatas en Pedernales y retiro en local.",
    statusBadge: "🟢 En línea ahora • Atención Inmediata",
    phone: process.env.NEXT_PUBLIC_WHATSAPP_LINE_1 || "593983893231",
    displayPhone: "+593 98 389 3231",
  },
  despachos: {
    id: "despachos",
    label: "Línea Oficial 2 — Atención Directa / Despachos & Cotizaciones",
    subtitle: "Asesoría técnica rápida, envíos a las 24 provincias, flotas y facturación SRI.",
    statusBadge: "🟢 En línea ahora • Asesoría Rápida",
    phone: process.env.NEXT_PUBLIC_WHATSAPP_LINE_2 || "593967489002",
    displayPhone: "+593 96 748 9002",
  },
};

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
