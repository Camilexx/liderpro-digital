import { META_CONFIG } from "@/data/metaConfig";
import {
  buildDeterministicQuotePlan,
  extractBatteryTradeInFromText,
  extractCityFromText,
  extractCustomerType,
  extractVehicleFromText,
  formatVehicleLabel,
  FREE_SHIPPING_THRESHOLD_USD,
  mergeVehicleProfiles,
  sumExactPricesIva,
  type DeterministicQuotePlan,
  type HermesIntentTag,
} from "@/lib/hermesCatalog";
import {
  getCustomer,
  getDbStorageMode,
  getRecentMessages,
  insertMessage,
  insertOrder,
  upsertCustomer,
  type ChannelType,
  type CommercialState,
  type CustomerType,
  type LastQuoteSnapshot,
  type OrderRecord,
  type VehicleProfile,
} from "@/lib/hermesDb";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface HermesReplyOptions {
  sessionId?: string;
  channel?: ChannelType;
  customerName?: string | null;
  customerPhone?: string | null;
  timeoutMs?: number;
  persist?: boolean;
}

export interface HermesResult {
  reply: string;
  model: string;
  usedFallback: boolean;
  latencyMs: number;
  matchedSkus: string[];
  catalogSize: number;
  sessionId: string;
  messageId: number | null;
  activeVehicle: VehicleProfile | null;
  city: string | null;
  customerType: CustomerType;
  quotedTotalUsd: number | null;
  intentTag: HermesIntentTag;
  dbStorageMode: "postgres" | "local_fallback";
  orderCreated: boolean;
  order: OrderRecord | null;
}

const NVIDIA_CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const HERMES_MODEL = "nvidia/nemotron-3.5-bolt-e4b";
const CATALOG_SIZE = 426;

export const MILO_SYSTEM_PROMPT =
  "Eres MILO, Asesor Automotriz de LíderPro Pedernales (WhatsApp 24/7: +593 96 748 9002).\n" +
  "Base operativa real del negocio:\n" +
  "- Ubicación y horario: Pedernales, Vía al Carmen (frente a la gasolinera). Lunes a Sábado de 08:00 a 18:00.\n" +
  "- Catálogo real (426 SKUs): Lubricantes de motor (MANNOL, Mobil, Motul, Valvoline, Amalie, Aroil), Aditivos y químicos (limpia inyectores, Motor Flush, selladores), Refrigerantes OAT/híbridos, Grasas EP2/alta temperatura, Transmisión ATF/CVT/80W-90/75W-90, Hidráulicos ISO 32/46/68 para camaroneras, Sprays de taller, Estética UV3 (Cockpit Care, Simoniz, Areon), Filtros Advance y Baterías Ecuador & Bosch.\n" +
  "- Pagos: Efectivo contra entrega en Pedernales, transferencia bancaria (Banco Pichincha, Banco Guayaquil, Banco del Pacífico) y factura electrónica SRI.\n" +
  "- Despachos: Instalación de baterías a domicilio 100% gratis en Pedernales (envío gratis desde $35.00 en Pedernales); envíos el mismo día a Jama, El Carmen, Cojimíes, Santo Domingo y todo Ecuador.\n" +
  "Reglas estrictas:\n" +
  "1) Tono ecuatoriano natural, amable y directo en 2 a 4 líneas claras (sin tono robótico ni relleno).\n" +
  "2) PROHIBIDO inventar precios, sumar mentalmente o alterar cifras: usa SOLO los precios exactos con IVA de [CALCULADORA EXACTA].\n" +
  "3) CERO SESGO A ACEITES: Si preguntan por aditivos, refrigerantes, grasas, sprays, estética, hidráulicos o caja, responde sobre ESA categoría y NO metas combos de aceite de motor salvo que lo pidan.\n" +
  "4) HONESTIDAD TOTAL: Si preguntan por un ítem sin stock (ej. pastillas de freno, líquido de frenos DOT 3/4, llantas, bujías), dilo claro y sin rodeos. Si en el mismo mensaje piden un producto con stock y otro sin stock, cotiza lo que SÍ hay y aclara honestamente lo que no manejamos.\n" +
  "5) En baterías muestra claramente precio con batería usada vs. sin usada, menciona instalación gratis en Pedernales y pregunta si entrega la usada.";

export const HERMES_SYSTEM_PROMPT = MILO_SYSTEM_PROMPT;

function getNvidiaKeys(): string[] {
  return [
    process.env.NVIDIA_API_KEY,
    process.env.NVIDIA_API_KEY_2,
    process.env.NVIDIA_API_KEY_3,
    process.env.NVIDIA_API_KEY_4,
  ]
    .map((k) => (k || "").trim())
    .filter(Boolean);
}

function hydrateContextFromHistory(
  history: ChatTurn[],
  persistedLastQuote: LastQuoteSnapshot | null,
  persistedState: CommercialState | null
): {
  vehicle: VehicleProfile | null;
  city: string | null;
  customerType: CustomerType;
  lastQuote: LastQuoteSnapshot | null;
  commercialState: CommercialState | null;
  recentText: string;
} {
  let vehicle: VehicleProfile | null = null;
  let city: string | null = null;
  let customerType: CustomerType = "particular";
  let rebuiltLastQuote = persistedLastQuote;
  let rebuiltState = persistedState;
  const parts: string[] = [];

  for (const turn of history) {
    if (!turn?.content) continue;
    parts.push(turn.content);
    if (turn.role === "user") {
      const { profile } = extractVehicleFromText(turn.content);
      vehicle = mergeVehicleProfiles(vehicle, profile);
      const c = extractCityFromText(turn.content);
      if (c) city = c;
      customerType = extractCustomerType(turn.content, customerType);

      const tradeInFlag = extractBatteryTradeInFromText(turn.content);
      if (tradeInFlag !== null && rebuiltLastQuote) {
        rebuiltLastQuote = { ...rebuiltLastQuote, batteryTradeIn: tradeInFlag };
      }

      if (!persistedLastQuote && !persistedState) {
        const turnPlan = buildDeterministicQuotePlan({
          userText: turn.content,
          persistedVehicle: vehicle,
          persistedCity: city,
          persistedCustomerType: customerType,
          persistedLastQuote: rebuiltLastQuote,
          persistedCommercialState: rebuiltState,
          recentHistoryText: parts.join("\n"),
        });
        rebuiltState = {
          cartItems: turnPlan.cartItems,
          discussedCategories: turnPlan.discussedCategories,
          batteryTradeIn: turnPlan.batteryTradeInExplicit ?? rebuiltState?.batteryTradeIn ?? null,
          salesStage: turnPlan.salesStage,
          lastSuggestedItems: turnPlan.lastSuggestedItems,
        };
        if (turnPlan.options.length > 0) {
          rebuiltLastQuote = {
            intentTag: turnPlan.intentTag,
            options: turnPlan.options.map((o) => ({
              label: o.label,
              items: o.items,
              totalUsd: o.totalUsd,
              ...(o.hasBattery
                ? {
                    hasBattery: true,
                    totalWithTradeInUsd: o.totalWithTradeInUsd,
                    totalWithoutTradeInUsd: o.totalWithoutTradeInUsd,
                  }
                : {}),
              includesMannolGift: o.includesMannolGift,
              includesFreeBatteryInstallPedernales: o.includesFreeBatteryInstallPedernales,
            })),
            batteryTradeIn: turnPlan.orderCapture?.batteryTradeIn ?? rebuiltLastQuote?.batteryTradeIn ?? null,
            updatedAt: new Date().toISOString(),
          };
        }
      }
    }
  }

  return {
    vehicle,
    city,
    customerType,
    lastQuote: rebuiltLastQuote,
    commercialState: rebuiltState,
    recentText: parts.join("\n"),
  };
}

export function renderHumanDeterministicReply(
  plan: DeterministicQuotePlan,
  createdOrder: OrderRecord | null = null,
  rawUserText = ""
): string {
  const vehicleStr = formatVehicleLabel(plan.detectedVehicle);
  const cityStr = plan.detectedCity || "Pedernales";
  const normQ = rawUserText
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  switch (plan.intentTag) {
    case "pedido_confirmado": {
      const orderIdTag = createdOrder ? `#${createdOrder.id}` : "registrado";
      const chosen = plan.confirmedOption;
      const itemsText = chosen ? chosen.items.map((i) => `${i.name} ($${i.unitPriceIva.toFixed(2)})`).join(" + ") : "tu pedido";
      const totalStr = chosen ? `$${chosen.totalUsd.toFixed(2)}` : "";
      const cName = plan.orderCapture?.customerName || "estimado";
      const addr = plan.orderCapture?.deliveryAddress || cityStr;
      const pay = plan.orderCapture?.paymentMethod || "por confirmar";
      return (
        `¡Listo, ${cName}! Tu pedido *${orderIdTag}* quedó confirmado con factura SRI.\n` +
        `🛒 *Detalle:* ${itemsText} → *Total con IVA: ${totalStr}*\n` +
        `📍 *Entrega:* ${addr}${plan.detectedCity ? `, ${plan.detectedCity}` : ""} | 💳 *Pago:* ${pay}. Enseguida coordinamos tu despacho desde Pedernales.`
      );
    }

    case "cierre_pedido_pendiente_datos": {
      const chosen = plan.confirmedOption;
      const missing = plan.orderCapture?.missingFields.join(", ") || "Nombre, Dirección exacta y Forma de pago";
      const priceText =
        chosen?.hasBattery && plan.orderCapture?.batteryTradeIn === null && chosen.totalWithTradeInUsd && chosen.totalWithoutTradeInUsd
          ? `*$${chosen.totalWithTradeInUsd.toFixed(2)}* entregando tu batería usada o *$${chosen.totalWithoutTradeInUsd.toFixed(2)}* sin entregar batería usada (IVA inc.)`
          : `*$${(chosen?.totalUsd ?? 0).toFixed(2)}* con IVA`;
      return (
        `¡Perfecto! Dejamos separado *${chosen?.items.map((i) => i.name).join(" + ")}* (${priceText}).\n` +
        `Para registrarlo y coordinar entrega inmediata, regálame: *${missing}*.`
      );
    }

    case "resumen_carrito": {
      const opt = plan.options[0];
      if (!opt) break;
      const lines = opt.items.map((i) => `• *${i.name}* → *$${i.unitPriceIva.toFixed(2)}*`);
      const shipNote = opt.qualifiesFreeShipping
        ? "✅ ¡Calificas para *envío gratis dentro de Pedernales* (supera los $35.00)!"
        : `Si sumas *$${(plan.shippingDeltaUsd ?? 0).toFixed(2)}* más, el envío local en Pedernales te sale gratis (desde $35.00).`;
      return (
        `Con gusto, aquí tienes el resumen exacto con IVA incluido:\n` +
        `${lines.join("\n")}\n` +
        `💵 *Total exacto (c/IVA): $${opt.totalUsd.toFixed(2)}*\n` +
        `${shipNote} ¿Te lo apartamos? Solo dime tu *nombre, dirección y forma de pago* (efectivo o transferencia Pichincha/Guayaquil/Pacífico).`
      );
    }

    case "milo_multicategoria": {
      const topEntries = plan.multicategoryItems.slice(0, 3);
      const lines = topEntries.map(
        (e, i) => `• *Opción ${i + 1}: ${e.name}* (${e.presentation}) → *$${e.priceIva.toFixed(2)}* c/IVA — ${e.functionSummary}.`
      );

      const parts: string[] = [];
      if (plan.cartItems.length >= 2) {
        const cartOpt = plan.options[plan.options.length - 1];
        const addedLabel = topEntries[0]?.name || "tu producto";
        const sumTxt =
          cartOpt && cartOpt.items.length >= 2
            ? ` (acumulado de tus ${cartOpt.items.length} ítems: *$${cartOpt.totalUsd.toFixed(2)}* c/IVA)`
            : "";
        parts.push(`¡Anotado! Sumamos *${addedLabel}* a tu pedido${sumTxt}:`);
      } else if (plan.missingRequestedItems.length > 0) {
        parts.push(`Te cuento con total transparencia qué tenemos en bodega y qué no manejamos por ahora:`);
      } else {
        parts.push(`¡Claro que sí! En LíderPro Pedernales tenemos en stock inmediato (IVA inc.):`);
      }

      parts.push(lines.join("\n"));

      if (plan.missingRequestedItems.length > 0) {
        parts.push(
          `⚠️ *Nota honesta:* Por el momento *no manejamos ${plan.missingRequestedItems.join(", ")}* en inventario (solo vendemos productos sellados de nuestro catálogo oficial).`
        );
      } else if (plan.multicategoryNote) {
        parts.push(`💡 *Tip:* ${plan.multicategoryNote}`);
      } else {
        parts.push(
          `Todos son originales con factura SRI (despacho hoy en Pedernales y envíos a todo Manabí). ¿Te sumamos alguno al pedido?`
        );
      }

      return parts.join("\n");
    }

    case "pregunta_ilogica":
      return (
        `¡Para nada recomendable! ${plan.ilologicalReason || "Eso dañaría gravemente el motor."}\n` +
        `Mejor cuídalo con el producto correcto: dime la *marca, modelo y año* de tu vehículo o qué síntoma tiene y te recomiendo exactamente lo que necesita con IVA.`
      );

    case "producto_sin_stock":
      return (
        `Con gusto te respondo con honestidad: actualmente *no manejamos ${plan.requestedProductWithoutStock || "ese repuesto"}* en nuestra bodega.\n` +
        `En LíderPro Pedernales somos especialistas en *lubricantes, aditivos, refrigerantes, grasas, sprays de taller, filtros Advance y baterías Bosch/Ecuador*. ¿Te ayudo a cotizar algo de estas líneas?`
      );

    case "fuera_de_tema":
      return (
        `¡Por acá soy *Milo*, tu asesor automotriz de LíderPro Pedernales! 😄\n` +
        `Cuando necesites aditivos, refrigerantes, grasas, baterías a domicilio gratis en Pedernales o combos de aceite con factura SRI, aquí estoy para ayudarte.`
      );

    case "info_operativa": {
      const mentionsBank = /\b(guayaquil|pichincha|pacifico|banco|transferencia|sri|factura)\b/.test(normQ);
      const mentionsHoursOrRetire = /\b(abiertos|horario|via al carmen|retirar|ubicados|donde quedan)\b/.test(normQ);
      if (mentionsBank && !mentionsHoursOrRetire) {
        return (
          `¡Sí! Entregamos *factura electrónica autorizada por el SRI* en todas tus compras.\n` +
          `Aceptamos *transferencia Banco Guayaquil, Banco Pichincha y Banco del Pacífico*, además de efectivo contra entrega en Pedernales.`
        );
      }
      if (mentionsHoursOrRetire) {
        return (
          `¡Sí, claro! Estamos atendiendo en *Pedernales, Vía al Carmen (frente a la gasolinera)* en horario de *Lunes a Sábado de 08:00 a 18:00*.\n` +
          `Puedes retirar directo en bodega con *factura SRI* y pago en efectivo o transferencia (Pichincha, Guayaquil o Pacífico).`
        );
      }
      return (
        `Estamos en *Pedernales, Vía al Carmen (frente a la gasolinera)*, atendiendo Lunes a Sábado de 08:00 a 18:00.\n` +
        `Aceptamos efectivo y transferencia (Banco Guayaquil, Pichincha o Pacífico) con factura SRI, e *instalación de baterías a domicilio gratis en Pedernales*.`
      );
    }

    case "consulta_precio_sin_vehiculo":
      return (
        `¡Con todo gusto! Para darte la recomendación exacta y el precio con IVA, dime por favor: ¿para qué *marca, modelo y año* de vehículo lo necesitas${plan.missingFieldHint?.includes("diésel") ? " (gasolina o diésel)" : ""}?`
      );

    case "envio_delivery":
      if (plan.primaryTotalUsd !== null && plan.shippingDeltaUsd !== null) {
        return (
          `En Pedernales el envío es *100% gratis desde $${FREE_SHIPPING_THRESHOLD_USD}.00*: con tu compra de *$${plan.primaryTotalUsd.toFixed(2)}* te faltan *$${plan.shippingDeltaUsd.toFixed(2)}*.\n` +
          `A cantones vecinos como *Jama, Cojimíes y El Carmen* despachamos el mismo día por encomienda/transporte con factura SRI.`
        );
      }
      if (plan.detectedCity && plan.detectedCity.toLowerCase() !== "pedernales") {
        return (
          `¡Sí! Hacemos *despachos el mismo día hacia ${plan.detectedCity}* por transporte intercantonal o encomienda segura con *factura electrónica SRI*.\n` +
          `Si confirmas tu pedido hoy, coordinamos el envío de inmediato desde nuestra bodega en Pedernales.`
        );
      }
      return (
        `En *Pedernales* instalamos baterías a domicilio *100% gratis* (envíos locales gratis desde *$${FREE_SHIPPING_THRESHOLD_USD}.00*), y despachamos el mismo día a *Jama, El Carmen, Cojimíes, Santo Domingo y todo Ecuador*.\n` +
        `¿Para qué ciudad coordinamos tu envío?`
      );

    case "bateria_y_combo": {
      const opt1 = plan.options[0];
      const opt2 = plan.options[1];
      if (!opt1) break;
      const formatComboBatLine = (idx: number, opt: typeof opt1) => {
        const names = opt.items.map((i) => i.name).join(" + ");
        if (opt.hasBattery && opt.totalWithTradeInUsd && opt.totalWithoutTradeInUsd) {
          return `• *Opción ${idx}:* ${names} → *$${opt.totalWithTradeInUsd.toFixed(2)}* (entregando tu batería usada) | *$${opt.totalWithoutTradeInUsd.toFixed(2)}* (sin entregar batería usada)`;
        }
        return `• *Opción ${idx}:* ${names} → Total *$${opt.totalUsd.toFixed(2)}*`;
      };
      const lines: string[] = [
        `Para tu *${vehicleStr || "vehículo"}* en *${cityStr}* (IVA inc., con *Cockpit Care + esponja de regalo* e *instalación gratis a domicilio en Pedernales*):`,
        formatComboBatLine(1, opt1),
      ];
      if (opt2) lines.push(formatComboBatLine(2, opt2));
      lines.push(
        `Pagas en efectivo o transferencia (Pichincha/Guayaquil/Pacífico) con factura SRI. ¿Cuál prefieres y entregas tu batería usada?`
      );
      return lines.join("\n");
    }

    case "bateria_domicilio": {
      const opt1 = plan.options[0];
      const opt2 = plan.options[1];
      if (!opt1) break;
      const it1 = opt1.items[0];
      if (plan.batteryTradeInExplicit === true && plan.preferredBatteryBrand === "ecuador" && it1?.isBattery && it1.priceWithTradeIn) {
        return (
          `Entregando tu batería usada, la *${it1.name}* (-${it1.discountPctWithTradeIn}% sobre PVP $${(it1.listPriceIva ?? it1.unitPriceIva).toFixed(2)}) te queda en *$${it1.priceWithTradeIn.toFixed(2)}* con IVA (sin usada $${(it1.priceWithoutTradeIn ?? it1.unitPriceIva).toFixed(2)}).\n` +
          `Incluye *instalación gratis a domicilio en Pedernales*, revisión de alternador y garantía de fábrica. ¿Te la enviamos hoy?`
        );
      }

      const installNote =
        !plan.detectedCity || plan.detectedCity.toLowerCase() === "pedernales"
          ? "con *instalación gratis a domicilio en Pedernales* y revisión de alternador"
          : `con envío el mismo día a *${cityStr}*`;

      const formatBatLine = (idx: number, opt: typeof opt1) => {
        const it = opt.items[0];
        if (it?.isBattery && it.priceWithTradeIn && it.priceWithoutTradeIn) {
          const dWith = it.discountPctWithTradeIn ?? 0;
          const dWithout = it.discountPctWithoutTradeIn ?? 0;
          return (
            `• *Opción ${idx}:* ${it.name} (PVP $${(it.listPriceIva ?? it.unitPriceIva).toFixed(2)}) → *$${it.priceWithTradeIn.toFixed(2)}* entregando usada (-${dWith}%)` +
            ` | *$${it.priceWithoutTradeIn.toFixed(2)}* sin usada (-${dWithout}%)`
          );
        }
        return `• *Opción ${idx}:* ${it.name} → *$${opt.totalUsd.toFixed(2)}*`;
      };

      const lead = plan.hasPriceObjection
        ? `Te entiendo totalmente; por eso aplicamos descuento directo sobre el precio de lista para tu *${vehicleStr || "vehículo"}* (${installNote}):`
        : `Para tu *${vehicleStr || "vehículo"}* te recomiendo estas baterías con descuento vigente (IVA inc., ${installNote}):`;

      const lines: string[] = [lead, formatBatLine(1, opt1)];
      if (opt2) lines.push(formatBatLine(2, opt2));
      lines.push(
        `Con tu batería usada ahorras fuerte desde el arranque + garantía nacional y factura SRI. ¿Entregas la batería usada?`
      );
      return lines.join("\n");
    }

    case "combo_lubricante":
    case "cotizacion_vehiculo": {
      const opt1 = plan.options[0];
      const opt2 = plan.options[1];
      if (!opt1) break;
      const lines: string[] = [
        `¡Excelente máquina! Para tu *${vehicleStr || "vehículo"}* te recomiendo estas 2 opciones con IVA y *Cockpit Care con esponja de regalo*:`,
        `• *Opción 1:* ${opt1.items[0].name} → *$${opt1.totalUsd.toFixed(2)}*`,
      ];
      if (opt2) lines.push(`• *Opción 2:* ${opt2.items[0].name} → *$${opt2.totalUsd.toFixed(2)}*`);
      lines.push(`Envío gratis en Pedernales o despacho hoy mismo a todo Ecuador. ¿Te aparto alguna o necesitas también filtros, transmisión o batería?`);
      return lines.join("\n");
    }

    case "saludo":
      return (
        `¡Hola! Soy *Milo*, tu asesor automotriz de *LíderPro Pedernales* (Vía al Carmen, ${META_CONFIG.line247Display}) 👋\n` +
        `Dime qué vehículo tienes o qué producto buscas (aditivos, lubricantes, refrigerantes, grasas, filtros o baterías) y te cotizo al instante con *IVA incluido*.`
      );

    default:
      break;
  }

  return (
    `¡Con gusto te atiendo! Soy *Milo* de *LíderPro Pedernales*. Dime qué producto necesitas o la *marca, modelo y año* de tu vehículo para cotizarte exacto con IVA.`
  );
}

function buildCalculatorPromptBlock(plan: DeterministicQuotePlan): string {
  const vehicleStr = formatVehicleLabel(plan.detectedVehicle) || "No especificado aún";
  const cityStr = plan.detectedCity || "Pedernales (hub local)";
  const lines = [
    `[FICHA ACTIVA] Vehículo: ${vehicleStr} | Ciudad: ${cityStr} | Etapa: ${plan.salesStage} | Intención: ${plan.intentTag}`,
  ];
  if (plan.missingRequestedItems.length > 0) {
    lines.push(`[SIN_STOCK_OBLIGATORIO]: Aclarar honestamente que NO manejamos: ${plan.missingRequestedItems.join(", ")}.`);
  }
  if (plan.hasPriceObjection) {
    lines.push("[OBJECION_PRECIO]: El cliente siente el precio alto; enfatiza el ahorro real con batería usada (-35% Ecuador / -25% Bosch) + instalación gratis a domicilio en Pedernales + garantía.");
  }
  if (plan.options.length > 0) {
    lines.push("[CALCULADORA EXACTA — USA ÚNICAMENTE ESTAS CIFRAS CON IVA]:");
    plan.options.slice(0, 3).forEach((opt, i) => {
      if (opt.hasBattery && opt.totalWithTradeInUsd && opt.totalWithoutTradeInUsd) {
        const detail = opt.items
          .map((it) =>
            it.isBattery && it.priceWithTradeIn && it.priceWithoutTradeIn
              ? `${it.name} (PVP $${(it.listPriceIva ?? it.unitPriceIva).toFixed(2)}; con usada $${it.priceWithTradeIn.toFixed(2)} [-${it.discountPctWithTradeIn ?? 0}%] / sin usada $${it.priceWithoutTradeIn.toFixed(2)} [-${it.discountPctWithoutTradeIn ?? 0}%])`
              : `${it.name} ($${it.unitPriceIva.toFixed(2)})`
          )
          .join(" + ");
        lines.push(
          `Opción ${i + 1}: ${detail} => CON_BATERIA_USADA=$${opt.totalWithTradeInUsd.toFixed(2)} | SIN_BATERIA_USADA=$${opt.totalWithoutTradeInUsd.toFixed(2)}` +
            `${opt.includesMannolGift ? " | REGALO=Cockpit Care con esponja de regalo" : ""}` +
            `${opt.includesFreeBatteryInstallPedernales ? " | BENEFICIO=Instalación gratis a domicilio en Pedernales" : ""}`
        );
      } else {
        const detail = opt.items.map((it) => `${it.name} ($${it.unitPriceIva.toFixed(2)})`).join(" + ");
        lines.push(
          `${opt.label}: ${detail} => TOTAL_EXACTO_CON_IVA=$${opt.totalUsd.toFixed(2)}` +
            `${opt.includesMannolGift ? " | REGALO=Cockpit Care con esponja de regalo" : ""}`
        );
      }
    });
    if (plan.multicategoryItems.length > 0) {
      lines.push("[FUNCION_TECNICA]:");
      plan.multicategoryItems.slice(0, 3).forEach((m) => {
        lines.push(`- ${m.name} ($${m.priceIva.toFixed(2)}): ${m.functionSummary}`);
      });
    }
  }
  return lines.join("\n");
}

function containsUsdAmount(text: string, amount: number): boolean {
  const exact = `$${amount.toFixed(2)}`;
  if (text.includes(exact)) return true;
  if (Number.isInteger(amount) && text.includes(`$${amount}`)) return true;
  return false;
}

function validateLlmPricingIntegrity(llmReply: string, plan: DeterministicQuotePlan): boolean {
  if (!llmReply || llmReply.length < 15) return false;
  if (/como modelo de lenguaje|asistente de ia|inteligencia artificial|no tengo acceso a precios|soy hermes/i.test(llmReply)) {
    return false;
  }
  if (/[¡!]Combo Cambio MANNOL/i.test(llmReply)) {
    return false;
  }

  // Zero oil-bias guard: when user asked about additives/coolants/grease/transmission/hydraulics/sprays, block unsolicited motor oils
  const allowsEngineOil =
    plan.matchedSubCategories.includes("lubricantes_motor") ||
    plan.matchedSubCategories.includes("combos_mannol") ||
    plan.intentTag === "cotizacion_vehiculo" ||
    plan.intentTag === "combo_lubricante" ||
    plan.intentTag === "bateria_y_combo";
  if (!allowsEngineOil && /\b(20W-50|5W-30|15W-40|10W-40|Combo MANNOL|Combo Cambio)\b/i.test(llmReply)) {
    return false;
  }

  // Missing items must be honestly disclosed
  if (plan.missingRequestedItems.length > 0 && !/\b(no\s+(?:manejamos|tenemos|disponemos|contamos)|sin\s+stock|no\s+vendemos)\b/i.test(llmReply)) {
    return false;
  }

  // High-amp safety guard
  const hasHighAmpBattery = plan.options.some((o) =>
    o.items.some((i) => /(85|88|95|104|105|160)\s*amp/i.test(i.name))
  );
  if (hasHighAmpBattery && /\b(64|65)\s*amp\b/i.test(llmReply)) {
    return false;
  }

  const allowedAmounts = new Set<string>(["35", "35.00", "15", "20", "25", "30"]);
  for (const opt of plan.options) {
    allowedAmounts.add(opt.totalUsd.toFixed(2));
    allowedAmounts.add(String(opt.totalUsd));
    if (opt.totalWithTradeInUsd) {
      allowedAmounts.add(opt.totalWithTradeInUsd.toFixed(2));
      allowedAmounts.add(String(opt.totalWithTradeInUsd));
    }
    if (opt.totalWithoutTradeInUsd) {
      allowedAmounts.add(opt.totalWithoutTradeInUsd.toFixed(2));
      allowedAmounts.add(String(opt.totalWithoutTradeInUsd));
    }
    for (const it of opt.items) {
      allowedAmounts.add(it.unitPriceIva.toFixed(2));
      allowedAmounts.add(String(it.unitPriceIva));
      if (it.priceWithTradeIn) {
        allowedAmounts.add(it.priceWithTradeIn.toFixed(2));
        allowedAmounts.add(String(it.priceWithTradeIn));
      }
      if (it.priceWithoutTradeIn) {
        allowedAmounts.add(it.priceWithoutTradeIn.toFixed(2));
        allowedAmounts.add(String(it.priceWithoutTradeIn));
      }
      if (it.listPriceIva) {
        allowedAmounts.add(it.listPriceIva.toFixed(2));
        allowedAmounts.add(String(it.listPriceIva));
      }
    }
  }
  for (const c of plan.cartItems) {
    allowedAmounts.add(c.unitPriceIva.toFixed(2));
    allowedAmounts.add(String(c.unitPriceIva));
  }
  if (plan.primaryTotalUsd !== null) {
    allowedAmounts.add(plan.primaryTotalUsd.toFixed(2));
    allowedAmounts.add(String(plan.primaryTotalUsd));
  }
  if (plan.shippingDeltaUsd !== null) allowedAmounts.add(plan.shippingDeltaUsd.toFixed(2));

  const matches = llmReply.matchAll(/\$\s*(\d+(?:\.\d{1,2})?)/g);
  for (const m of matches) {
    const num = Number(m[1]);
    if (!Number.isFinite(num)) return false;
    if (!allowedAmounts.has(num.toFixed(2)) && !allowedAmounts.has(String(num))) {
      return false;
    }
  }

  if (plan.options.length > 0 && plan.primaryTotalUsd !== null) {
    if (!containsUsdAmount(llmReply, plan.primaryTotalUsd)) {
      return false;
    }
  }

  const hasAnyBattery = plan.options.some((o) => o.hasBattery);
  if (hasAnyBattery && plan.batteryTradeInExplicit === null) {
    if (!/usada/i.test(llmReply)) return false;
    for (const opt of plan.options.slice(0, 2)) {
      if (opt.totalWithTradeInUsd && !containsUsdAmount(llmReply, opt.totalWithTradeInUsd)) return false;
      if (opt.totalWithoutTradeInUsd && !containsUsdAmount(llmReply, opt.totalWithoutTradeInUsd)) return false;
    }
  }

  if (plan.options.some((o) => o.includesFreeBatteryInstallPedernales)) {
    if (!/domicilio|instalaci[oó]n/i.test(llmReply) || !/gratis/i.test(llmReply)) {
      return false;
    }
  }

  return true;
}

export async function generateHermesReply(
  userText: string,
  history: ChatTurn[] = [],
  options: HermesReplyOptions = {}
): Promise<HermesResult> {
  const startedAt = Date.now();
  const cleanUserText = (userText || "").trim();
  const sessionId = (options.sessionId || `anon-${Date.now()}`).trim();
  const channel: ChannelType = options.channel || "demo_web";
  const shouldPersist = options.persist !== false;
  const timeoutMs = options.timeoutMs ?? 4800;

  // 1. Recuperar ficha comercial + últimos 20 mensajes persistidos en Postgres
  const [persistedCustomer, dbRecentMsgs] = await Promise.all([
    shouldPersist ? getCustomer(sessionId) : Promise.resolve(null),
    shouldPersist ? getRecentMessages(sessionId, 20) : Promise.resolve([]),
  ]);

  const combinedHistory: ChatTurn[] =
    dbRecentMsgs.length > 0
      ? dbRecentMsgs.map((m) => ({ role: m.role, content: m.content }))
      : history;

  const hydratedHistory = hydrateContextFromHistory(
    combinedHistory,
    persistedCustomer?.lastQuote || null,
    persistedCustomer?.commercialState || null
  );

  const persistedVehicle = persistedCustomer?.activeVehicle || hydratedHistory.vehicle;
  const persistedCity = persistedCustomer?.city || hydratedHistory.city;
  const persistedCustomerType = persistedCustomer?.customerType || hydratedHistory.customerType;
  const persistedLastQuote = persistedCustomer?.lastQuote || hydratedHistory.lastQuote;
  const persistedCommercialState = persistedCustomer?.commercialState || hydratedHistory.commercialState;

  // 2. Plan determinístico (426 SKUs sin sesgo a aceites + carrito acumulado + batería + cierre)
  const plan = buildDeterministicQuotePlan({
    userText: cleanUserText,
    persistedVehicle,
    persistedCity,
    persistedCustomerType,
    persistedLastQuote,
    persistedCommercialState,
    recentHistoryText: hydratedHistory.recentText,
  });

  // 3. Registrar pedido si el cliente confirmó con datos mínimos
  let createdOrder: OrderRecord | null = null;
  let orderCreated = false;
  if (plan.intentTag === "pedido_confirmado" && plan.confirmedOption && plan.orderCapture) {
    if (shouldPersist) {
      const orderTotal = sumExactPricesIva(plan.confirmedOption.items.map((i) => i.unitPriceIva));
      const orderRes = await insertOrder({
        sessionId,
        customerName: plan.orderCapture.customerName || options.customerName || persistedCustomer?.name || null,
        phone: options.customerPhone || (sessionId.startsWith("wa:") ? sessionId.slice(3) : null),
        vehicle: plan.detectedVehicle,
        itemsJson: plan.confirmedOption.items.map((i) => ({
          sku: i.sku,
          name: i.name,
          unitPriceIva: i.unitPriceIva,
          qty: 1,
        })),
        totalUsd: orderTotal,
        deliveryAddress: plan.orderCapture.deliveryAddress,
        paymentMethod: plan.orderCapture.paymentMethod,
        status: "pending_dispatch",
      });
      createdOrder = orderRes.order;
      orderCreated = true;
    }
  }

  // 4. Actualizar estado comercial persistente + last_quote
  const quoteStoringIntents = new Set<HermesIntentTag>([
    "cotizacion_vehiculo",
    "combo_lubricante",
    "bateria_domicilio",
    "bateria_y_combo",
    "filtro_refrigerante_aditivo",
    "milo_multicategoria",
    "resumen_carrito",
  ]);

  let nextLastQuote: LastQuoteSnapshot | undefined;
  if (plan.options.length > 0 && quoteStoringIntents.has(plan.intentTag)) {
    const primaryQuoteOption =
      plan.intentTag === "milo_multicategoria" && plan.cartItems.length >= 2
        ? plan.options[plan.options.length - 1]
        : plan.options[0];
    nextLastQuote = {
      intentTag: plan.intentTag,
      options: (plan.intentTag === "milo_multicategoria" && plan.cartItems.length >= 2 ? [primaryQuoteOption, ...plan.options] : plan.options).map(
        (o) => ({
          label: o.label,
          items: o.items,
          totalUsd: o.totalUsd,
          ...(o.hasBattery
            ? {
                hasBattery: true,
                totalWithTradeInUsd: o.totalWithTradeInUsd,
                totalWithoutTradeInUsd: o.totalWithoutTradeInUsd,
              }
            : {}),
          includesMannolGift: o.includesMannolGift,
          includesFreeBatteryInstallPedernales: o.includesFreeBatteryInstallPedernales,
        })
      ),
      selectedOptionIndex: null,
      batteryTradeIn: plan.batteryTradeInExplicit ?? persistedLastQuote?.batteryTradeIn ?? null,
      updatedAt: new Date().toISOString(),
    };
  } else if (plan.intentTag === "cierre_pedido_pendiente_datos" && persistedLastQuote) {
    nextLastQuote = {
      ...persistedLastQuote,
      selectedOptionIndex: plan.orderCapture?.selectedOptionIndex ?? 0,
      batteryTradeIn: plan.orderCapture?.batteryTradeIn ?? persistedLastQuote.batteryTradeIn ?? null,
      updatedAt: new Date().toISOString(),
    };
  }

  const nextCommercialState: CommercialState =
    plan.intentTag === "pedido_confirmado"
      ? {
          cartItems: [],
          discussedCategories: plan.discussedCategories,
          batteryTradeIn: null,
          salesStage: "pedido_confirmado",
          lastSuggestedItems: [],
          updatedAt: new Date().toISOString(),
        }
      : {
          cartItems: plan.cartItems,
          discussedCategories: plan.discussedCategories,
          batteryTradeIn: plan.batteryTradeInExplicit ?? persistedCommercialState?.batteryTradeIn ?? null,
          salesStage: plan.salesStage,
          lastSuggestedItems: plan.lastSuggestedItems,
          updatedAt: new Date().toISOString(),
        };

  let savedVehicle = plan.detectedVehicle;
  let savedCity = plan.detectedCity;
  let savedType = plan.detectedCustomerType;

  if (shouldPersist) {
    const updatedCustomer = await upsertCustomer({
      phoneOrSession: sessionId,
      name: plan.orderCapture?.customerName || options.customerName || undefined,
      activeVehicle: plan.detectedVehicle ?? undefined,
      city: plan.detectedCity ?? undefined,
      customerType: plan.detectedCustomerType,
      ...(plan.intentTag === "pedido_confirmado" ? { lastQuote: null } : nextLastQuote ? { lastQuote: nextLastQuote } : {}),
      commercialState: nextCommercialState,
    });
    savedVehicle = updatedCustomer.activeVehicle;
    savedCity = updatedCustomer.city;
    savedType = updatedCustomer.customerType;

    await insertMessage({
      sessionId,
      channel,
      role: "user",
      content: cleanUserText,
      intentTag: plan.intentTag,
    });
  }

  // 5. Redacción natural con NVIDIA Nemotron (validada estrictamente) + respaldo determinístico Milo
  const deterministicDirectIntents = new Set<HermesIntentTag>([
    "pregunta_ilogica",
    "producto_sin_stock",
    "fuera_de_tema",
    "consulta_precio_sin_vehiculo",
    "cierre_pedido_pendiente_datos",
    "pedido_confirmado",
    "info_operativa",
    "envio_delivery",
    "resumen_carrito",
    "saludo",
  ]);

  let finalReply = renderHumanDeterministicReply(plan, createdOrder, cleanUserText);
  let usedModel = "milo-deterministic-ts";
  let usedFallback = true;

  const keys = getNvidiaKeys();
  if (!deterministicDirectIntents.has(plan.intentTag) && keys.length > 0 && plan.options.length > 0) {
    const calcBlock = buildCalculatorPromptBlock(plan);
    const recentTurns = combinedHistory
      .slice(-16)
      .filter((h) => h.content.trim().length > 0)
      .map((h) => ({ role: h.role, content: h.content.slice(0, 350) }));

    const userPrompt =
      `${calcBlock}\n\n` +
      `Mensaje actual del cliente:\n${cleanUserText}\n\n` +
      `Responde como Milo en 2 a 4 líneas naturales usando exactamente las cifras con IVA de [CALCULADORA EXACTA]. ${recentTurns.length > 0 ? "Ya están en conversación activa: no saludes con '¡Hola!' ni repitas el horario salvo que lo pidan." : ""}`;

    for (let i = 0; i < Math.min(2, keys.length); i++) {
      const apiKey = keys[i];
      const remainingBudget = Math.max(900, timeoutMs - (Date.now() - startedAt));
      try {
        const resp = await fetch(NVIDIA_CHAT_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: HERMES_MODEL,
            messages: [
              { role: "system", content: MILO_SYSTEM_PROMPT },
              ...recentTurns,
              { role: "user", content: userPrompt },
            ],
            temperature: 0.22,
            max_tokens: 380,
          }),
          signal: AbortSignal.timeout(remainingBudget),
        });
        if (!resp.ok) continue;
        const data = (await resp.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const candidate = (data.choices?.[0]?.message?.content || "").trim();
        if (validateLlmPricingIntegrity(candidate, plan)) {
          finalReply = candidate;
          usedModel = HERMES_MODEL;
          usedFallback = false;
          break;
        }
      } catch {
        // Respaldo determinístico instantáneo
      }
    }
  }

  const latencyMs = Date.now() - startedAt;
  let assistantMessageId: number | null = null;

  if (shouldPersist) {
    const storedAssistant = await insertMessage({
      sessionId,
      channel,
      role: "assistant",
      content: finalReply,
      skusUsed: plan.matchedSkus,
      quotedTotalUsd: plan.primaryTotalUsd,
      latencyMs,
      intentTag: plan.intentTag,
    });
    assistantMessageId = storedAssistant.id;
  }

  return {
    reply: finalReply,
    model: usedModel,
    usedFallback,
    latencyMs,
    matchedSkus: plan.matchedSkus,
    catalogSize: CATALOG_SIZE,
    sessionId,
    messageId: assistantMessageId,
    activeVehicle: savedVehicle,
    city: savedCity,
    customerType: savedType,
    quotedTotalUsd: plan.primaryTotalUsd,
    intentTag: plan.intentTag,
    dbStorageMode: getDbStorageMode(),
    orderCreated,
    order: createdOrder,
  };
}
