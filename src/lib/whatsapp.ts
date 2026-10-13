import { BUSINESS_CONFIG } from "@/data/businessConfig";

export type WhatsAppActionType =
  | "product"
  | "vehicle"
  | "quick_compatibility"
  | "fleet_bulk"
  | "emergency"
  | "general_quote"
  | "shipping"
  | "branch"
  | "b2b"
  | "unknown_need";

export interface WhatsAppContext {
  brand?: string;
  productName?: string;
  presentation?: string;
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
  const phone = BUSINESS_CONFIG.whatsappMasterNumber || "593981881515";

  let message = "";

  switch (action) {
    case "product": {
      const brandStr = context.brand ? `${context.brand} ` : "";
      const nameStr = context.productName || "Repuesto / Lubricante / Batería";
      const presStr = context.presentation ? ` (${context.presentation})` : context.sku ? ` (${context.sku})` : "";
      const vehicleStr = context.vehicleMake
        ? `${context.vehicleMake} ${context.vehicleModel || ""} ${context.vehicleYear || ""}`.trim()
        : "[Marca/Modelo/Año por indicar]";
      const cityStr = context.city || "[Mi Ciudad]";

      message = `Hola LiderPro Pedernales, requiero cotizar ${brandStr}${nameStr}${presStr}. Mi vehículo es ${vehicleStr} y la ciudad de envío es ${cityStr}.`;
      break;
    }

    case "b2b":
    case "fleet_bulk": {
      const itemStr = context.b2bNotes || context.neededItem || "Aceites en Caneca/Tambor o Baterías Grupo 31";
      const cityStr = context.city || "[Ciudad por confirmar]";
      message = `Hola LiderPro Pedernales, requiero cotización al por mayor/flotas de ${itemStr}. Ciudad de entrega: ${cityStr}.`;
      break;
    }

    case "quick_compatibility":
    case "vehicle": {
      const modelStr =
        context.vehicleMake || context.vehicleModel
          ? `${context.vehicleMake || ""} ${context.vehicleModel || ""}`.trim()
          : "[Modelo de Vehículo]";
      const yearStr = context.vehicleYear ? `${context.vehicleYear}` : "[Año]";
      const extraDetails = [
        context.vehicleEngine ? `Motor: ${context.vehicleEngine}` : "",
        context.neededItem ? `Requerimiento: ${context.neededItem}` : "",
        context.city ? `Ciudad: ${context.city}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      message =
        `Hola LiderPro Pedernales, deseo confirmar qué aceite y batería recomienda el manual para mi ${modelStr} ${yearStr}.` +
        (extraDetails ? ` (${extraDetails})` : "");
      break;
    }

    case "emergency": {
      const vehicleStr =
        context.vehicleMake || context.vehicleModel
          ? `${context.vehicleMake || ""} ${context.vehicleModel || ""} ${context.vehicleYear || ""}`.trim()
          : "por confirmar";
      const cityStr = context.city || "Ecuador";
      const symptomStr = context.symptom || "No da arranque";
      message = `Hola LiderPro Pedernales, urgencia de batería: mi vehículo (${vehicleStr}) tiene el síntoma "${symptomStr}". Requiere diagnóstico/batería en ${cityStr}.`;
      break;
    }

    case "unknown_need": {
      const vehicleStr =
        context.vehicleMake || context.vehicleModel
          ? `${context.vehicleMake || ""} ${context.vehicleModel || ""} ${context.vehicleYear || ""}`.trim()
          : "[Modelo de Carro]";
      const yearStr = context.vehicleYear ? `${context.vehicleYear}` : "[Año]";
      message = `Hola LiderPro Pedernales, deseo confirmar qué aceite y batería recomienda el manual para mi ${vehicleStr} ${yearStr}. Tengo fotos/muestra para enviar por este chat.`;
      break;
    }

    case "shipping": {
      const cityStr = context.city || "[Mi Ciudad]";
      const prodStr = context.productName || "Baterías / Lubricantes / Filtros";
      message = `Hola LiderPro Pedernales, requiero cotizar el despacho nacional de ${prodStr} hacia ${cityStr} por encomienda interprovincial o courier autorizado.`;
      break;
    }

    case "branch": {
      const branchName =
        context.locationChoice === "quito"
          ? "Punto de Enlace Quito"
          : "Sede Central Pedernales (Manabí)";
      message = `Hola LiderPro Pedernales, deseo coordinar atención directa o retiro de pedido en ${branchName}.`;
      break;
    }

    case "general_quote":
    default: {
      const cityStr = context.city || "Ecuador";
      message = `Hola LiderPro Pedernales, deseo confirmar qué aceite y batería recomienda el manual para mi vehículo y consultar envío a ${cityStr}.`;
      break;
    }
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
