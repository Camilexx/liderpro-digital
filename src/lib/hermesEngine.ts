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

export const HERMES_SYSTEM_PROMPT =
  "Eres HERMES, asesor comercial humano de LíderPro Pedernales (WhatsApp 24/7: +593 96 748 9002).\n" +
  "Base operativa real del negocio:\n" +
  "- Ubicación: Pedernales, Vía al Carmen (frente a la gasolinera).\n" +
  "- Pagos: Efectivo contra entrega en Pedernales, transferencia bancaria (Banco Pichincha / Guayaquil / Pacífico) y factura electrónica SRI en todas las ventas.\n" +
  "- Despachos: Entrega e instalación de baterías a domicilio 100% gratis en Pedernales; envíos el mismo día a El Carmen, Jama, Cojimíes, Santo Domingo y todo Ecuador por cooperativa o courier.\n" +
  "Reglas estrictas:\n" +
  "1) Tono ecuatoriano natural, cálido y directo en 3 a 5 líneas máximo (no sobre-expliques ni uses frases robóticas).\n" +
  "2) PROHIBIDO sumar precios, recalcular IVA o inventar cifras: usa únicamente los precios exactos y nombres limpios de [CALCULADORA EXACTA] (cero signos de exclamación raros en nombres de combos).\n" +
  "3) Máximo 2 opciones exactas por mensaje. En combos MANNOL menciona el regalo incluido (Cockpit Care con esponja de regalo). En toda cotización de batería (sola o con combo), muestra claramente AMBOS precios finales (*entregando tu batería usada* vs. *sin entregar batería usada*), destaca instalación gratis a domicilio en Pedernales y pregunta si entrega la batería usada.\n" +
  "4) Si piden un producto que no manejamos (llantas, pastillas, parabrisas), dilo con honestidad sin alucinar SKUs.";

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
  persistedLastQuote: LastQuoteSnapshot | null
): {
  vehicle: VehicleProfile | null;
  city: string | null;
  customerType: CustomerType;
  lastQuote: LastQuoteSnapshot | null;
  recentText: string;
} {
  let vehicle: VehicleProfile | null = null;
  let city: string | null = null;
  let customerType: CustomerType = "particular";
  let rebuiltLastQuote = persistedLastQuote;
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

      if (!persistedLastQuote) {
        const turnPlan = buildDeterministicQuotePlan({
          userText: turn.content,
          persistedVehicle: vehicle,
          persistedCity: city,
          persistedCustomerType: customerType,
          persistedLastQuote: rebuiltLastQuote,
          recentHistoryText: parts.join("\n"),
        });
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
    recentText: parts.join("\n"),
  };
}

export function renderHumanDeterministicReply(
  plan: DeterministicQuotePlan,
  createdOrder: OrderRecord | null = null
): string {
  const vehicleStr = formatVehicleLabel(plan.detectedVehicle);
  const cityStr = plan.detectedCity || "Pedernales";

  switch (plan.intentTag) {
    case "pedido_confirmado": {
      const orderIdTag = createdOrder ? `#${createdOrder.id}` : "registrado";
      const chosen = plan.confirmedOption;
      const itemsText = chosen ? chosen.items.map((i) => i.name).join(" + ") : "tu pedido";
      const totalStr = chosen ? `$${chosen.totalUsd.toFixed(2)}` : "";
      const cName = plan.orderCapture?.customerName || "estimado";
      const addr = plan.orderCapture?.deliveryAddress || cityStr;
      const pay = plan.orderCapture?.paymentMethod || "por confirmar";
      return (
        `¡Pedido ${orderIdTag} confirmado, ${cName}! Ya alertamos a despacho en Pedernales para llevarte: *${itemsText}* por *${totalStr}* (IVA inc.).\n` +
        `📍 *Entrega:* ${addr}${plan.detectedCity ? `, ${plan.detectedCity}` : ""} | 💳 *Pago:* ${pay} | Factura SRI incluida.\n` +
        `Enseguida sale nuestro técnico/motorizado a coordinar contigo.`
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
        `¡Excelente elección! Separamos *${chosen?.items.map((i) => i.name).join(" + ")}* (${priceText}).\n` +
        `Para sacarlo a despacho e instalación gratis en Pedernales de inmediato, pásame por favor: *${missing}* (efectivo contra entrega en Pedernales o transferencia Pichincha/Guayaquil/Pacífico).`
      );
    }

    case "pregunta_ilogica":
      return (
        `¡Para nada recomendable, mi estimado! ${plan.ilologicalReason || "Eso dañaría gravemente el motor."}\n` +
        `Si me indicas la *marca, modelo y año* de tu vehículo, te cotizo al instante el lubricante exacto con IVA y tu combo MANNOL con Cockpit Care + esponja de regalo.`
      );

    case "producto_sin_stock":
      return (
        `Con gusto te atiendo, pero por ahora no manejamos *${plan.requestedProductWithoutStock || "ese repuesto"}* en bodega.\n` +
        `En LíderPro Pedernales somos especialistas en *baterías Bosch y Ecuador* (instalación a domicilio 100% gratis en Pedernales), *lubricantes MANNOL* y *filtros Advance*. ¿Te cotizo algo de esa línea?`
      );

    case "fuera_de_tema":
      return (
        `¡Jaja por acá solo movemos motores y baterías al 100%! 😄\n` +
        `Cuando necesites batería a domicilio gratis en Pedernales o combo MANNOL con regalo y factura SRI, dime tu vehículo y te cotizo al toque.`
      );

    case "info_operativa":
      return (
        `Estamos en *Pedernales, Vía al Carmen (frente a la gasolinera)*. Aceptamos efectivo contra entrega y transferencia (Banco Pichincha, Guayaquil o Pacífico), siempre con factura electrónica SRI.\n` +
        `En Pedernales la *instalación de baterías a domicilio es 100% gratis*, y enviamos el mismo día a El Carmen, Jama, Cojimíes, Santo Domingo y todo Ecuador.`
      );

    case "consulta_precio_sin_vehiculo":
      return (
        `¡Con todo gusto! Para darte el precio exacto con IVA, cuéntame en una línea: ¿para qué *marca, modelo y año* de vehículo lo necesitas${plan.missingFieldHint?.includes("diésel") ? " (gasolina o diésel)" : ""}?`
      );

    case "envio_delivery":
      if (plan.primaryTotalUsd !== null && plan.shippingDeltaUsd !== null) {
        return (
          `En Pedernales el envío es *100% gratis desde $${FREE_SHIPPING_THRESHOLD_USD}.00*: con tu compra de *$${plan.primaryTotalUsd.toFixed(2)}* te faltan *$${plan.shippingDeltaUsd.toFixed(2)}*.\n` +
          `También despachamos el mismo día a El Carmen, Jama, Cojimíes, Santo Domingo y todo Ecuador por cooperativa o courier con factura SRI.`
        );
      }
      return (
        `En *Pedernales* entregamos e instalamos baterías a domicilio *100% gratis* (envíos gratis desde *$${FREE_SHIPPING_THRESHOLD_USD}.00*), y enviamos el mismo día a El Carmen, Jama, Cojimíes, Santo Domingo y todo Ecuador.\n` +
        `Dime tu vehículo y te paso las opciones exactas con IVA.`
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
        `Para tu *${vehicleStr || "vehículo"}* en *${cityStr}* (IVA inc., incluye *Cockpit Care con esponja de regalo* e *instalación gratis a domicilio en Pedernales*):`,
        formatComboBatLine(1, opt1),
      ];
      if (opt2) {
        lines.push(formatComboBatLine(2, opt2));
      }
      lines.push(
        `Pagas en efectivo o transferencia (Pichincha/Guayaquil/Pacífico) con factura SRI. ¿Cuál opción prefieres y entregas tu batería usada?`
      );
      return lines.join("\n");
    }

    case "bateria_domicilio": {
      const opt1 = plan.options[0];
      const opt2 = plan.options[1];
      if (!opt1) break;
      const installNote =
        !plan.detectedCity || plan.detectedCity.toLowerCase() === "pedernales"
          ? "con *instalación gratis a domicilio en Pedernales*"
          : `con envío el mismo día a *${cityStr}* (e instalación gratis a domicilio en Pedernales)`;
      const formatBatLine = (idx: number, opt: typeof opt1) => {
        const it = opt.items[0];
        if (it?.isBattery && it.priceWithTradeIn && it.priceWithoutTradeIn) {
          const dWith = it.discountPctWithTradeIn ?? 0;
          const dWithout = it.discountPctWithoutTradeIn ?? 0;
          return (
            `• *Opción ${idx}:* ${it.name} → *$${it.priceWithTradeIn.toFixed(2)}* entregando tu batería usada (-${dWith}%)` +
            ` | *$${it.priceWithoutTradeIn.toFixed(2)}* sin entregar batería usada (-${dWithout}%)`
          );
        }
        return `• *Opción ${idx}:* ${it.name} → *$${opt.totalUsd.toFixed(2)}*`;
      };
      const lines: string[] = [
        `Para tu *${vehicleStr || "vehículo"}* te recomiendo estas 2 baterías con descuento oficial vigente (IVA inc.), ${installNote}:`,
        formatBatLine(1, opt1),
      ];
      if (opt2) {
        lines.push(formatBatLine(2, opt2));
      }
      lines.push(
        `Incluye garantía de fábrica y factura SRI. ¿Cuál prefieres y nos confirmas si entregas tu batería usada para registrar tu pedido?`
      );
      return lines.join("\n");
    }

    case "combo_lubricante":
    case "cotizacion_vehiculo": {
      const opt1 = plan.options[0];
      const opt2 = plan.options[1];
      if (!opt1) break;
      const lines: string[] = [
        `¡Excelente máquina! Para tu *${vehicleStr || "vehículo"}* tengo estas 2 opciones con IVA y *Cockpit Care con esponja de regalo*:`,
        `• *Opción 1:* ${opt1.items[0].name} → *$${opt1.totalUsd.toFixed(2)}*`,
      ];
      if (opt2) {
        lines.push(`• *Opción 2:* ${opt2.items[0].name} → *$${opt2.totalUsd.toFixed(2)}*`);
      }
      lines.push(`Envío gratis en Pedernales (o despacho hoy a todo Ecuador). ¿Cuál te apartamos o sumamos batería?`);
      return lines.join("\n");
    }

    case "filtro_refrigerante_aditivo":
      if (plan.options.length > 0) {
        const lines = plan.options.slice(0, 2).map((o, i) => `• *Opción ${i + 1}:* ${o.items[0].name} → *$${o.totalUsd.toFixed(2)}*`);
        return (
          `Tengo disponible en bodega Pedernales (Vía al Carmen frente a la gasolinera):\n${lines.join("\n")}\n` +
          `Envío gratis en Pedernales desde *$35.00* y factura SRI. ¿Te lo enviamos?`
        );
      }
      break;

    case "saludo":
      return (
        `¡Hola! Qué gusto saludarte desde *LíderPro Pedernales* (Vía al Carmen, frente a la gasolinera, ${META_CONFIG.line247Display}) 👋\n` +
        `Indícame la *marca, modelo y año* de tu vehículo para cotizarte tu *combo MANNOL con regalo* o *batería a domicilio gratis en Pedernales*.`
      );

    default:
      break;
  }

  return (
    `¡Con gusto te atiendo desde *LíderPro Pedernales*! Dime la *marca, modelo y año* de tu vehículo para cotizarte exacto tu combo MANNOL (con Cockpit Care + esponja de regalo) o batería con instalación gratis en Pedernales.`
  );
}

function buildCalculatorPromptBlock(plan: DeterministicQuotePlan): string {
  const vehicleStr = formatVehicleLabel(plan.detectedVehicle) || "No especificado aún";
  const cityStr = plan.detectedCity || "Pedernales (hub local)";
  const lines = [
    `[FICHA ACTIVA] Vehículo: ${vehicleStr} | Ciudad: ${cityStr} | Perfil: ${plan.detectedCustomerType} | Intención: ${plan.intentTag}`,
  ];
  if (plan.options.length > 0) {
    lines.push("[CALCULADORA EXACTA — USA ÚNICAMENTE ESTAS CIFRAS Y MÁXIMO 2 OPCIONES]:");
    plan.options.slice(0, 2).forEach((opt, i) => {
      if (opt.hasBattery && opt.totalWithTradeInUsd && opt.totalWithoutTradeInUsd) {
        const batItem = opt.items.find((x) => x.isBattery);
        const detail = opt.items
          .map((it) =>
            it.isBattery && it.priceWithTradeIn && it.priceWithoutTradeIn
              ? `${it.name} (PVP lista $${(it.listPriceIva ?? it.unitPriceIva).toFixed(2)}; con usada $${it.priceWithTradeIn.toFixed(2)} [-${it.discountPctWithTradeIn ?? 0}%] / sin usada $${it.priceWithoutTradeIn.toFixed(2)} [-${it.discountPctWithoutTradeIn ?? 0}%])`
              : `${it.name} ($${it.unitPriceIva.toFixed(2)})`
          )
          .join(" + ");
        lines.push(
          `Opción ${i + 1}: ${detail} => CON_BATERIA_USADA=$${opt.totalWithTradeInUsd.toFixed(2)} (-${batItem?.discountPctWithTradeIn ?? 0}%) | SIN_BATERIA_USADA=$${opt.totalWithoutTradeInUsd.toFixed(2)} (-${batItem?.discountPctWithoutTradeIn ?? 0}%)` +
            `${opt.includesMannolGift ? " | REGALO=Cockpit Care con esponja de regalo" : ""}` +
            `${opt.includesFreeBatteryInstallPedernales ? " | BENEFICIO=Instalación de batería gratis a domicilio en Pedernales" : ""}`
        );
      } else {
        const detail = opt.items.map((it) => `${it.name} ($${it.unitPriceIva.toFixed(2)})`).join(" + ");
        lines.push(
          `Opción ${i + 1}: ${detail} => TOTAL_EXACTO_CON_IVA=$${opt.totalUsd.toFixed(2)}` +
            `${opt.includesMannolGift ? " | REGALO=Cockpit Care con esponja de regalo" : ""}` +
            `${opt.includesFreeBatteryInstallPedernales ? " | BENEFICIO=Instalación de batería gratis a domicilio en Pedernales" : ""}`
        );
      }
    });
    if (plan.options.some((o) => o.hasBattery)) {
      lines.push(
        "PREGUNTA_OBLIGATORIA=Mostrar AMBOS precios exactos (entregando batería usada y sin entregar batería usada), instalación gratis en Pedernales, y preguntar si entrega la batería usada."
      );
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
  if (/como modelo de lenguaje|asistente de ia|inteligencia artificial|no tengo acceso a precios/i.test(llmReply)) {
    return false;
  }
  if (/[¡!]Combo Cambio MANNOL/i.test(llmReply)) {
    return false;
  }
  // Evitar que el LLM sugiera una batería de 64-65Ah si nuestra calculadora eligió 85-160Ah
  const hasHighAmpBattery = plan.options.some((o) =>
    o.items.some((i) => /(85|88|95|104|105|160)\s*amp/i.test(i.name))
  );
  if (hasHighAmpBattery && /\b(64|65)\s*amp\b/i.test(llmReply)) {
    return false;
  }

  const allowedAmounts = new Set<string>(["35", "35.00", "15", "20", "25", "30", "35"]);
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
  if (plan.primaryTotalUsd !== null) allowedAmounts.add(plan.primaryTotalUsd.toFixed(2));
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
  if (hasAnyBattery) {
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

  // 1. Recuperar memoria persistente de cliente + historial de mensajes
  const [persistedCustomer, dbRecentMsgs] = await Promise.all([
    shouldPersist ? getCustomer(sessionId) : Promise.resolve(null),
    shouldPersist ? getRecentMessages(sessionId, 8) : Promise.resolve([]),
  ]);

  const combinedHistory: ChatTurn[] =
    dbRecentMsgs.length > 0
      ? dbRecentMsgs.map((m) => ({ role: m.role, content: m.content }))
      : history;

  const hydratedHistory = hydrateContextFromHistory(
    combinedHistory,
    persistedCustomer?.lastQuote || null
  );

  const persistedVehicle = persistedCustomer?.activeVehicle || hydratedHistory.vehicle;
  const persistedCity = persistedCustomer?.city || hydratedHistory.city;
  const persistedCustomerType = persistedCustomer?.customerType || hydratedHistory.customerType;
  const persistedLastQuote = persistedCustomer?.lastQuote || hydratedHistory.lastQuote;

  // 2. Plan determinístico (calculadora exacta + escudo + captura de pedidos)
  const plan = buildDeterministicQuotePlan({
    userText: cleanUserText,
    persistedVehicle,
    persistedCity,
    persistedCustomerType,
    persistedLastQuote,
    recentHistoryText: hydratedHistory.recentText,
  });

  // 3. Registrar pedido si el cliente confirmó con los 3 datos mínimos
  let createdOrder: OrderRecord | null = null;
  let orderCreated = false;
  if (plan.intentTag === "pedido_confirmado" && plan.confirmedOption && plan.orderCapture) {
    if (shouldPersist) {
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
        totalUsd: plan.confirmedOption.totalUsd,
        deliveryAddress: plan.orderCapture.deliveryAddress,
        paymentMethod: plan.orderCapture.paymentMethod,
        status: "pending_dispatch",
      });
      createdOrder = orderRes.order;
      orderCreated = true;
    }
  }

  // 4. Actualizar ficha del cliente + guardar última cotización si aplica
  let nextLastQuote: LastQuoteSnapshot | undefined;
  if (
    plan.options.length > 0 &&
    ["cotizacion_vehiculo", "combo_lubricante", "bateria_domicilio", "bateria_y_combo", "filtro_refrigerante_aditivo"].includes(
      plan.intentTag
    )
  ) {
    nextLastQuote = {
      intentTag: plan.intentTag,
      options: plan.options.map((o) => ({
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
      selectedOptionIndex: null,
      batteryTradeIn: extractBatteryTradeInFromText(cleanUserText) ?? persistedLastQuote?.batteryTradeIn ?? null,
      updatedAt: new Date().toISOString(),
    };
  } else if (plan.intentTag === "cierre_pedido_pendiente_datos" && persistedLastQuote) {
    nextLastQuote = {
      ...persistedLastQuote,
      selectedOptionIndex: plan.orderCapture?.selectedOptionIndex ?? 0,
      batteryTradeIn: plan.orderCapture?.batteryTradeIn ?? persistedLastQuote.batteryTradeIn ?? null,
      updatedAt: new Date().toISOString(),
    };
  } else if (plan.intentTag === "pedido_confirmado") {
    nextLastQuote = undefined;
  }

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
      ...(nextLastQuote ? { lastQuote: nextLastQuote } : {}),
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

  // 5. Redacción natural con NVIDIA Nemotron sobre cálculos determinísticos
  const deterministicDirectIntents = new Set<HermesIntentTag>([
    "pregunta_ilogica",
    "producto_sin_stock",
    "fuera_de_tema",
    "consulta_precio_sin_vehiculo",
    "cierre_pedido_pendiente_datos",
    "pedido_confirmado",
    "info_operativa",
    "saludo",
  ]);

  let finalReply = renderHumanDeterministicReply(plan, createdOrder);
  let usedModel = "hermes-deterministic-ts";
  let usedFallback = true;

  const keys = getNvidiaKeys();
  if (!deterministicDirectIntents.has(plan.intentTag) && keys.length > 0 && plan.options.length > 0) {
    const calcBlock = buildCalculatorPromptBlock(plan);
    const recentTurns = combinedHistory
      .slice(-4)
      .filter((h) => h.content.trim().length > 0)
      .map((h) => ({ role: h.role, content: h.content.slice(0, 350) }));

    const userPrompt =
      `${calcBlock}\n\n` +
      `Mensaje actual del cliente:\n${cleanUserText}\n\n` +
      `Redacta la respuesta de WhatsApp en 3 a 4 líneas naturales usando los nombres limpios y cifras exactas de [CALCULADORA EXACTA].`;

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
              { role: "system", content: HERMES_SYSTEM_PROMPT },
              ...recentTurns,
              { role: "user", content: userPrompt },
            ],
            temperature: 0.25,
            max_tokens: 360,
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
        // Fallback limpio instantáneo si hay timeout de red
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
