import { BUSINESS_CONFIG } from "@/data/businessConfig";

export type WhatsAppActionType =
  | "product"
  | "vehicle"
  | "emergency"
  | "general_quote"
  | "shipping"
  | "branch"
  | "b2b";

export interface WhatsAppContext {
  productName?: string;
  sku?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string | number;
  vehicleEngine?: string;
  neededItem?: string;
  city?: string;
  locationChoice?: "pedernales" | "quito" | "nacional";
  b2bNotes?: string;
}

export function buildWhatsAppLink(action: WhatsAppActionType, context: WhatsAppContext = {}): string {
  const phone =
    context.locationChoice === "quito"
      ? BUSINESS_CONFIG.locations.quito.whatsapp
      : BUSINESS_CONFIG.locations.pedernales.whatsapp;

  let message = "";

  switch (action) {
    case "product":
      message =
        `Hola LiderPro 👋\n\n` +
        `Quiero consultar/comprar:\n\n` +
        `• Producto: ${context.productName || "Repuesto automotriz"}\n` +
        `• SKU: ${context.sku || "N/A"}\n` +
        `• Vehículo: ${context.vehicleMake ? `${context.vehicleMake} ${context.vehicleModel || ""} (${context.vehicleYear || ""})` : "Por confirmar"}\n` +
        `• Ciudad: ${context.city || "Ecuador"}\n\n` +
        `¿Me pueden confirmar disponibilidad, precio y tiempo de despacho?`;
      break;

    case "vehicle":
      message =
        `Hola LiderPro 👋\n\n` +
        `Quisiera confirmar compatibilidad para mi vehículo:\n\n` +
        `• Marca: ${context.vehicleMake || "No especificada"}\n` +
        `• Modelo: ${context.vehicleModel || "No especificado"}\n` +
        `• Año: ${context.vehicleYear || "No especificado"}\n` +
        `• Motor/Cilindraje: ${context.vehicleEngine || "No especificado"}\n` +
        `• ¿Qué necesito?: ${context.neededItem || "Asesoría general"}\n` +
        `• Ciudad: ${context.city || "Ecuador"}\n\n` +
        `¿Qué producto me recomiendan?`;
      break;

    case "emergency":
      message =
        `🚨 *EMERGENCIA BATERÍA — LIDERPRO*\n\n` +
        `Mi vehículo no enciende y necesito asistencia rápida para batería.\n\n` +
        `• Vehículo: ${context.vehicleMake || ""} ${context.vehicleModel || ""} ${context.vehicleYear ? `(${context.vehicleYear})` : ""}\n` +
        `• Ciudad/Ubicación: ${context.city || "Pedernales / Quito / Ecuador"}\n` +
        `• Estado: No da arranque / Batería agotada\n\n` +
        `Por favor indíquenme si tienen entrega inmediata o auxilio técnico.`;
      break;

    case "shipping":
      message =
        `Hola LiderPro 👋\n\n` +
        `Quisiera consultar sobre envíos nacionales y costos de flete a mi ciudad:\n\n` +
        `• Ciudad de destino: ${context.city || "Mi ciudad"}\n` +
        `• Producto de interés: ${context.productName || "Repuestos varios"}\n\n` +
        `¿Desde dónde despachan (Pedernales o Quito) y cuánto demora la entrega?`;
      break;

    case "branch":
      const branchName =
        context.locationChoice === "pedernales"
          ? "Pedernales (Manabí)"
          : context.locationChoice === "quito"
          ? "Quito (Pichincha)"
          : "Pedernales / Quito";
      message =
        `Hola LiderPro 👋\n\n` +
        `Deseo coordinar una visita o retiro en el punto de atención de *${branchName}*.\n\n` +
        `¿Podrían confirmarme horarios de atención y dirección exacta?`;
      break;

    case "b2b":
      message =
        `Hola equipo LiderPro 👋\n\n` +
        `Escribo de parte de un *Taller Mecánico / Empresa / Flota* para cotización y lista de precios al por mayor:\n\n` +
        `• Ciudad: ${context.city || "Ecuador"}\n` +
        `• Requerimiento: ${context.b2bNotes || "Baterías, lubricantes y filtros por volumen"}\n\n` +
        `Agradezco me puedan contactar con un asesor comercial.`;
      break;

    case "general_quote":
    default:
      message =
        `Hola LiderPro 👋\n\n` +
        `Quisiera recibir asesoría especializada para un producto automotriz.\n\n` +
        `• Ciudad: ${context.city || "Ecuador"}\n\n` +
        `¿Me pueden ayudar a elegir la opción correcta?`;
      break;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
