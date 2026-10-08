import { BUSINESS_CONFIG } from "@/data/businessConfig";

export type WhatsAppActionType =
  | "product"
  | "vehicle"
  | "emergency"
  | "general_quote"
  | "shipping"
  | "branch"
  | "b2b"
  | "unknown_need";

export interface WhatsAppContext {
  productName?: string;
  sku?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string | number;
  vehicleEngine?: string;
  neededItem?: string;
  symptom?: string;
  issueDescription?: string;
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
        `Quiero consultar compatibilidad y disponibilidad:\n\n` +
        `• Producto: ${context.productName || "Repuesto automotriz"}\n` +
        `• SKU: ${context.sku || "N/A"}\n` +
        `• Vehículo: ${context.vehicleMake ? `${context.vehicleMake} ${context.vehicleModel || ""} (${context.vehicleYear || ""})` : "Por confirmar"}\n` +
        `• Ciudad: ${context.city || "Ecuador"}\n\n` +
        `¿Me pueden confirmar compatibilidad técnica, disponibilidad y entrega?`;
      break;

    case "vehicle":
      message =
        `Hola LiderPro 👋\n\n` +
        `Necesito ayuda con el producto correcto para mi vehículo:\n\n` +
        `• Marca: ${context.vehicleMake || "No especificada"}\n` +
        `• Modelo: ${context.vehicleModel || "No especificado"}\n` +
        `• Año: ${context.vehicleYear || "No especificado"}\n` +
        `• Motor/Cilindraje: ${context.vehicleEngine || "No especificado"}\n` +
        `• Necesidad: ${context.neededItem || "Asesoría general"}\n` +
        `• Ciudad: ${context.city || "Ecuador"}\n\n` +
        `¿Me ayudan a encontrar el producto correcto?`;
      break;

    case "emergency":
      message =
        `🚨 *SOLICITUD DE BATERÍA URGENTE*\n\n` +
        `Mi vehículo no enciende y necesito asistencia para batería.\n\n` +
        `• Vehículo: ${context.vehicleMake || "Por confirmar"} ${context.vehicleModel || ""} ${context.vehicleYear ? `(${context.vehicleYear})` : ""}\n` +
        `• Ciudad: ${context.city || "Ecuador"}\n` +
        `• Síntoma: ${context.symptom || "No da arranque"}\n\n` +
        `Necesito ayuda para identificar la batería correcta y disponibilidad.`;
      break;

    case "unknown_need":
      message =
        `Hola LiderPro 👋\n\n` +
        `*NO SÉ EXACTAMENTE QUÉ REPUESTO NECESITO* y requiero asesoría técnica:\n\n` +
        `• Vehículo: ${context.vehicleMake || "Por indicar"} ${context.vehicleModel || ""} ${context.vehicleYear ? `(${context.vehicleYear})` : ""}\n` +
        `• Problema / Síntoma: ${context.issueDescription || context.symptom || "Por describir"}\n` +
        `• Ciudad: ${context.city || "Ecuador"}\n\n` +
        `Tengo fotos de la pieza/etiqueta para enviarles por este chat. ¿Me pueden ayudar a identificar el repuesto correcto?`;
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
