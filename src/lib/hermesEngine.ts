import {
  formatOfficialBankTransferDetails,
  getConfiguredBankTransferDetails,
  OFFICIAL_BANK_ACCOUNT,
} from "@/data/businessConfig";
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
  type HermesIntentTag,
} from "@/lib/hermesCatalog";
import {
  getCustomer,
  getDbStorageMode,
  getRecentMessages,
  insertMessage,
  upsertCustomer,
  type ChannelType,
  type CommercialState,
  type CustomerType,
  type OrderRecord,
  type VehicleProfile,
} from "@/lib/hermesDb";
import { getIndexedCatalogEntry } from "@/lib/miloCatalogIndex";
import {
  executeMiloToolCall,
  MILO_OPENAI_TOOLS,
  type MiloToolExecutionContext,
} from "@/lib/miloTools";

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
  escalatedToHuman?: boolean;
  cartTotalUsd?: number | null;
}

const NVIDIA_CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const CATALOG_SIZE = 426;

interface NimModelTier {
  id: string;
  disableThinking: boolean;
  maxTokens: number;
  perStepTimeoutMs: number;
}

const NIM_MODEL_CASCADE: NimModelTier[] = [
  {
    id: "nvidia/nemotron-3.5-super-vl-120b-a12b",
    disableThinking: true,
    maxTokens: 480,
    perStepTimeoutMs: 7500,
  },
  {
    id: "nvidia/nemotron-3.5-lightning-30b-a3b",
    disableThinking: true,
    maxTokens: 440,
    perStepTimeoutMs: 5500,
  },
  {
    id: "nvidia/nemotron-3.5-bolt-e4b",
    disableThinking: false,
    maxTokens: 380,
    perStepTimeoutMs: 4200,
  },
];

export const MILO_SYSTEM_PROMPT =
  "Eres MILO, asesor automotriz humano y cercano de LíderPro Pedernales (WhatsApp 24/7: +593 96 748 9002), especialista real en lubricación, aditivos, refrigerantes, grasas, filtros y baterías en Ecuador.\n\n" +
  "DATOS REALES DEL NEGOCIO (NUNCA INVENTES OTROS):\n" +
  "- Tienda y bodega: Pedernales, Vía al Carmen (frente a la gasolinera). Horario: Lunes a Sábado de 08:00 a 18:00.\n" +
  "- Somos tienda especializada en productos/kits (NO hacemos mano de obra de taller mecánico de cambio de aceite, PERO sí entregamos el combo completo de aceite + filtro Advance + Cockpit Care con esponja de regalo, listo para llevar al mecánico o cambiar en casa).\n" +
  "- REGLA ÚNICA Y EXACTA DE ENVÍOS Y BATERÍAS (SIN CONTRADICCIONES):\n" +
  "  • Dentro de Pedernales: Domicilio GRATIS en compras/combos desde $35.00, e instalación + chequeo de alternador a domicilio 100% GRATIS en toda batería (sin monto mínimo).\n" +
  "  • Fuera de Pedernales (Jama, Cojimíes, San Vicente, Bahía, Chone, El Carmen, Santo Domingo, Quito, Guayaquil y todo Ecuador): Envío el mismo día por cooperativa de transporte, Servientrega o Tramaco (el valor del flete se confirma según ciudad y peso; el domicilio gratis aplica únicamente dentro de Pedernales).\n" +
  "- POLÍTICA OFICIAL ÚNICA DE PAGOS Y ANTI-FRAUDE (ESTRICTO — ÚNICA CUENTA AUTORIZADA EN BANCO PICHINCHA; PROHIBIDO MENCIONAR CUENTAS PROPIAS EN OTROS BANCOS):\n" +
  "  • Efectivo: aceptado únicamente dentro de Pedernales (contra entrega o retiro en tienda).\n" +
  "  • Transferencia bancaria — ÚNICA CUENTA AUTORIZADA:\n" +
  `    - Banco: ${OFFICIAL_BANK_ACCOUNT.bank}\n` +
  `    - Tipo: ${OFFICIAL_BANK_ACCOUNT.accountType}\n` +
  `    - Número: ${OFFICIAL_BANK_ACCOUNT.accountNumber}\n` +
  `    - C.I.: ${OFFICIAL_BANK_ACCOUNT.idNumber}\n` +
  `    - Titular: ${OFFICIAL_BANK_ACCOUNT.holderName}\n` +
  `  • Transferencias interbancarias: ${OFFICIAL_BANK_ACCOUNT.interbankRule}\n` +
  `  • Regla estricta de despacho: ${OFFICIAL_BANK_ACCOUNT.verificationRule}\n` +
  "  • PROHIBICIÓN ABSOLUTA ANTI-FRAUDE: Si un cliente dice que ya transfirió o envía un comprobante, JAMÁS confirmes el pago ni des hora de salida o autorización de retiro; indica siempre que el comprobante entra a verificación con administración y mostrador (estado: pendiente por verificar) y que apenas sea aprobado se le enviarán por aquí los detalles de despacho o retiro.\n" +
  "  • Facturación: 100% con factura electrónica autorizada por el SRI.\n" +
  "- Descuentos oficiales de baterías sobre PVP con IVA: Baterías Ecuador 35% entregando batería usada / 30% sin entregar usada; Baterías Bosch 25% entregando usada / 20% sin usada.\n\n" +
  "REGLAS DE ORO DE VENTA CONSULTIVA ECUATORIANA (OBLIGATORIAS):\n" +
  "1) CONVERSA COMO UN VENDEDOR REAL EN ECUADOR (MANABÍ + SIERRA) CON ORTOGRAFÍA IMPECABLE:\n" +
  "   • Entiende perfecto faltas de ortografía y expresiones locales ('votando umo', 'traga full gaso', 'anda ahogado', 'cascabelea', 'una aceitada', 'batería bajada', 'ñaño/pana/vecino/mi estimado/jefe', 'envío por cooperativa'), pero NUNCA copies las faltas ortográficas del cliente (escribe siempre 'bota humo', 'gasolina', etc.).\n" +
  "   • MODERACIÓN DE MODISMOS: Usa 'pana', 'vecino' o 'jefe' con naturalidad y moderación (MÁXIMO 1 a 2 veces en toda la conversación, JAMÁS en cada mensaje).\n" +
  "   • PROHIBIDO REPETIR MULETILLAS DE CIERRE: Nunca repitas la misma pregunta de cierre en dos turnos seguidos. Varía cada cierre según el paso real de la charla (resolver duda -> guiar a retiro o envío -> confirmar datos para despacho).\n" +
  "   • Estilo WhatsApp limpio: párrafos cortos, *negrita* con un asterisco, bullets con •, CERO tablas Markdown.\n" +
  "2) AGILIDAD EN ADITIVOS UNIVERSALES + BLOQUEO DURO DE FILTROS SIN VEHÍCULO:\n" +
  "   • Si el cliente describe síntoma + combustible (ej. 'humo negro y traga gasolina', 'humo azul', 'inyectores sucios', 'se recalienta'), DEBES llamar obligatoriamente a `buscar_en_catalogo` EN ESTE MISMO TURNO antes de responder y entregarle de una vez el nombre y precio exacto con IVA del aditivo universal devuelto por la herramienta (JAMÁS inventes el precio ni uses $35.00 como precio de producto).\n" +
  "   • PROHIBIDO cotizar o dar precio de cualquier filtro específico (aire, aceite, combustible o cabina) o aceite específico antes de conocer marca, modelo y año del vehículo. Si quieres sugerir revisar filtro de aire por humo negro, solo pregúntale qué vehículo y año tiene para cotizárselo exacto.\n" +
  "3) VERIFICACIÓN DE LITRAJE DEL MOTOR (> 4.0 LITROS): Cuando un vehículo requiera más de 4.0 litros de aceite (ej. 4.5–4.7L en SUVs como Chery Tiggo 7 Pro o 5L–6L en camionetas/SUVs grandes si no lleva ya un combo de 7L), DEBES avisar el litraje real y ofrecer sumar el envase adicional de 1 litro de la misma familia (ver 'litroAdicionalRecomendado' en buscar_en_catalogo) para que el cliente no se quede corto en la lubricadora, calculándolo junto en `gestionar_carrito`.\n" +
  "4) PROHIBIDO VOMITAR LISTAS ROBÓTICAS DE 3 OPCIONES SIN CRITERIO: Cuando el cliente pregunte '¿cuál es mejor?' o esté indeciso, RECOMIENDA 1 GANADOR CLARO del último tema conversado y explica en 1 frase sencilla por qué conviene más.\n" +
  "5) RESUELVE EL MENSAJE COMPLETO EN UN SOLO TURNO: Si piden 2 o 3 cosas distintas a la vez (ej. limpia inyectores + aceite + filtro para Aveo, o batería + aceite para Chery Tiggo 7 Pro), llama a `buscar_en_catalogo` con TODAS las consultas en el mismo arreglo `consultas`. Si piden 'ármame un combo completo' o 'dime el precio de todo', elige el mejor producto de cada ítem (incluyendo el litro extra si el motor supera 4L), llama a `gestionar_carrito` y entrega el desglose + total exacto devuelto por la herramienta.\n" +
  "6) PROHIBIDO INVENTAR PRECIOS O SUMAR MENTALMENTE: Solo menciona precios exactos con IVA devueltos por `buscar_en_catalogo` o `gestionar_carrito`.\n" +
  "7) CERO SESGO A ACEITES: Si el cliente preguntó primero por batería y luego dice su carro (ej. 'Volkswagen Gol 2010'), cotiza BATERÍA primero, no metas aceites que no pidió.\n" +
  "8) VEHÍCULOS POCO COMUNES: Si preguntan qué aceite o batería lleva un vehículo que no está en los resultados locales (ej. Chery Tiggo 7 Pro, Geely Coolray, Jetour), usa `consultar_especificacion_vehiculo_web` + `buscar_en_catalogo` en el mismo flujo para dar respuesta técnica precisa con productos reales nuestros.\n" +
  "9) PACIENCIA EN CONVERSACIONES LARGAS: Responde con calma cada duda sobre el calor de Manabí, cómo usar un aditivo, envíos por cooperativa, retiro en tienda o factura SRI manteniendo el carrito intacto sin presionar el cierre antes de tiempo.\n" +
  "10) HONESTIDAD TOTAL Y ESCALAMIENTO HUMANO: Si un producto no existe en bodega (pastillas de freno, líquido de frenos DOT 3/4, bujías, llantas), dilo sin rodeos. Si piden cotización mayorista grande (ej. 20-40 canecas), crédito a 30 días, descuentos fuera de tabla, hablar con un encargado/persona o muestran frustración, llama SIEMPRE a `escalar_a_asesor_humano` sin inventar condiciones ni créditos.\n" +
  "11) REGISTRO DE PEDIDO: Cuando el cliente ya confirme que quiere pedir y entregue su nombre, dirección/ciudad/retiro y forma de pago, llama a `registrar_pedido` (asegurándote primero que el carrito tenga todos los ítems exactos). Si el pago es por transferencia, entrega los datos exactos de Banco Pichincha (2216090525 / CI 1308068814 / ADRIAN MOSQUERA), aclara interbancarias solo con convenio directo, pide el comprobante COMPLETO y NO prometas hora de salida ni retiro hasta verificación.";

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

interface NimToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

interface NimMessagePayload {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  tool_calls?: NimToolCall[];
  tool_call_id?: string;
}

interface NimCompletionResponse {
  ok: boolean;
  model?: string;
  content?: string;
  toolCalls?: NimToolCall[];
}

async function callNimStep(params: {
  messages: NimMessagePayload[];
  useTools: boolean;
  remainingBudgetMs: number;
  preferredModelIdx?: number;
}): Promise<NimCompletionResponse> {
  const keys = getNvidiaKeys();
  if (keys.length === 0 || params.remainingBudgetMs < 1200) {
    return { ok: false };
  }

  const startModelIdx = params.preferredModelIdx ?? 0;

  for (let mIdx = startModelIdx; mIdx < NIM_MODEL_CASCADE.length; mIdx++) {
    const tier = NIM_MODEL_CASCADE[mIdx];
    const stepTimeout = Math.min(tier.perStepTimeoutMs, Math.max(1800, params.remainingBudgetMs));

    for (let kIdx = 0; kIdx < Math.min(keys.length, 2); kIdx++) {
      // Rotate key slightly across calls to spread RPM limits evenly
      const apiKey = keys[(kIdx + mIdx) % keys.length];
      try {
        const body: Record<string, unknown> = {
          model: tier.id,
          temperature: 0.25,
          top_p: 0.9,
          max_tokens: tier.maxTokens,
          messages: params.messages,
        };
        if (tier.disableThinking) {
          body.chat_template_kwargs = { enable_thinking: false };
        }
        if (params.useTools) {
          body.tools = MILO_OPENAI_TOOLS;
          body.tool_choice = "auto";
        }

        const resp = await fetch(NVIDIA_CHAT_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(stepTimeout),
        });

        if (resp.status === 429 || resp.status >= 500) {
          continue;
        }
        if (!resp.ok) {
          break; // Try next model tier
        }

        const data = (await resp.json()) as {
          choices?: Array<{
            message?: {
              content?: string | null;
              tool_calls?: NimToolCall[];
            };
          }>;
        };

        const msg = data?.choices?.[0]?.message;
        const toolCalls = Array.isArray(msg?.tool_calls) ? msg.tool_calls : [];
        const content = (msg?.content || "").trim();

        if (toolCalls.length > 0 || content.length > 0) {
          return {
            ok: true,
            model: tier.id,
            content,
            toolCalls,
          };
        }
      } catch {
        // Timeout or transient network failure -> try next key/model
      }
    }
  }

  return { ok: false };
}

function buildLiveCustomerContextBlock(
  ctx: MiloToolExecutionContext,
  recentAssistantTexts: string[]
): string {
  const lines: string[] = ["[CONTEXTO VIVO DEL CLIENTE EN POSTGRES]"];
  const vehLabel = formatVehicleLabel(ctx.activeVehicle);
  lines.push(`- Vehículo activo: ${vehLabel || "No indicado todavía (PROHIBIDO cotizar filtros hasta conocer marca/modelo/año)"}`);
  lines.push(`- Ciudad: ${ctx.city || "No indicada (asume Pedernales solo si pregunta entrega local)"}`);
  lines.push(`- Tipo de cliente: ${ctx.customerType}`);
  if (ctx.customerName) lines.push(`- Nombre guardado: ${ctx.customerName}`);
  if (ctx.commercialState.batteryTradeIn !== null) {
    lines.push(`- Batería usada (canje): ${ctx.commercialState.batteryTradeIn ? "SÍ entrega usada" : "NO entrega usada"}`);
  }

  const cart = ctx.commercialState.cartItems || [];
  if (cart.length > 0) {
    const total = sumExactPricesIva(cart.flatMap((i) => Array(Math.max(1, i.qty || 1)).fill(i.unitPriceIva)));
    const hasBat = cart.some((i) => i.isBattery && i.priceWithTradeIn && i.priceWithoutTradeIn);
    const totalConUsada = hasBat
      ? sumExactPricesIva(
          cart.flatMap((i) =>
            Array(Math.max(1, i.qty || 1)).fill(
              i.isBattery && i.priceWithTradeIn ? i.priceWithTradeIn : i.unitPriceIva
            )
          )
        )
      : total;
    const totalSinUsada = hasBat
      ? sumExactPricesIva(
          cart.flatMap((i) =>
            Array(Math.max(1, i.qty || 1)).fill(
              i.isBattery && i.priceWithoutTradeIn ? i.priceWithoutTradeIn : i.unitPriceIva
            )
          )
        )
      : total;
    const cartSummary = cart
      .map((i) => {
        const batNote =
          i.isBattery && i.priceWithTradeIn && i.priceWithoutTradeIn
            ? ` [con usada: $${i.priceWithTradeIn.toFixed(2)} | sin usada: $${i.priceWithoutTradeIn.toFixed(2)}]`
            : "";
        return `${i.qty}x ${i.name} [SKU: ${i.sku}] ($${i.unitPriceIva.toFixed(2)} c/u${batNote})`;
      })
      .join(" | ");
    lines.push(
      `- Carrito actual persistido: ${cartSummary} => Total exacto c/IVA: $${total.toFixed(2)}` +
        (hasBat
          ? ` (Total exacto carrito CON batería usada: $${totalConUsada.toFixed(2)} | Total exacto carrito SIN batería usada: $${totalSinUsada.toFixed(2)} — USA SIEMPRE ESTAS CIFRAS REDONDEADAS, NUNCA MULTIPLIQUES PORCENTAJES MENTALMENTE)`
          : "")
    );
  } else {
    lines.push("- Carrito actual persistido: Vacío");
  }

  const lastSkus = (ctx.commercialState.lastRecommendedSkus || []).slice(0, 8);
  if (lastSkus.length > 0) {
    const recDetails = lastSkus
      .map((sku) => {
        const e = getIndexedCatalogEntry(sku);
        return e ? `${e.sku}: ${e.name} ($${e.priceIva.toFixed(2)})` : sku;
      })
      .join(" | ");
    lines.push(`- Últimos SKUs cotizados/recomendados en este chat: ${recDetails}`);
  }

  // [DATOS BANCARIOS OFICIALES VERIFICADOS]
  const bankDetails = getConfiguredBankTransferDetails() || formatOfficialBankTransferDetails();
  lines.push(`- [DATOS BANCARIOS OFICIALES ÚNICOS]:\n${bankDetails}`);

  // [CONTROL DE ESTILO ANTI-REPETICIÓN]
  const joinedPrev = recentAssistantTexts.join(" ");
  const slangMatches = joinedPrev.match(/\b(pana|vecino|jefe|ñaño)\b/gi) || [];
  if (slangMatches.length >= 2) {
    lines.push(
      `- [CONTROL DE MODISMOS]: Ya usaste modismos locales (${slangMatches.length} veces) en mensajes previos. En ESTE turno NO uses "pana", "vecino", "jefe" ni "ñaño"; habla natural y cálido sin repetir muletillas.`
    );
  }
  const lastReply = recentAssistantTexts[recentAssistantTexts.length - 1] || "";
  if (lastReply) {
    const lastLine = lastReply.split("\n").map((l) => l.trim()).filter(Boolean).slice(-1)[0] || "";
    if (lastLine) {
      lines.push(
        `- [CONTROL ANTI-MULETILLA]: Tu cierre anterior fue "${lastLine.slice(0, 110)}". NO repitas esa misma pregunta ni una parecida; varía el cierre según el momento actual de la conversación.`
      );
    }
  }

  return lines.join("\n");
}

function sanitizeWhatsAppFormatting(raw: string): string {
  let text = raw.replace(/\r\n/g, "\n").trim();
  // Convert Markdown bold **x** -> WhatsApp bold *x*
  text = text.replace(/\*\*([^*\n]+)\*\*/g, "*$1*");
  // Convert Markdown headings ### Title -> *Title*
  text = text.replace(/^#{1,4}\s+(.+)$/gm, "*$1*");
  // Strip markdown table divider rows if any leaked
  text = text.replace(/^\|[\s:-]+\|[\s|:-]*$/gm, "");
  // Convert simple table rows "| A | B |" -> "• A — B"
  text = text.replace(/^\|(.+)\|$/gm, (_m, inner: string) => {
    const cells = inner
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    return cells.length > 0 ? `• ${cells.join(" — ")}` : "";
  });
  // Clean excessive blank lines
  text = text.replace(/\n{3,}/g, "\n\n").trim();
  return text;
}

function extractDollarNumbers(text: string): number[] {
  const found: number[] = [];
  const regex = /\$\s*(\d{1,4}(?:[.,]\d{1,2})?)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    const val = Number(m[1].replace(",", "."));
    if (Number.isFinite(val) && val > 0) {
      found.push(Number(val.toFixed(2)));
    }
  }
  return found;
}

function collectAllowedPrices(ctx: MiloToolExecutionContext, recentAssistantMsgs: string[]): Set<number> {
  const allowed = new Set<number>([FREE_SHIPPING_THRESHOLD_USD]);
  for (const p of ctx.observedPricesUsd) allowed.add(p);

  const cart = ctx.commercialState.cartItems || [];
  if (cart.length > 0) {
    const prices: number[] = [];
    const pricesWithTi: number[] = [];
    const pricesWithoutTi: number[] = [];
    for (const item of cart) {
      allowed.add(Number(item.unitPriceIva.toFixed(2)));
      if (item.listPriceIva) allowed.add(Number(item.listPriceIva.toFixed(2)));
      if (item.priceWithTradeIn) allowed.add(Number(item.priceWithTradeIn.toFixed(2)));
      if (item.priceWithoutTradeIn) allowed.add(Number(item.priceWithoutTradeIn.toFixed(2)));
      if (item.priceWithTradeIn && item.priceWithoutTradeIn) {
        allowed.add(Number(Math.abs(item.priceWithoutTradeIn - item.priceWithTradeIn).toFixed(2)));
      }
      const qty = Math.max(1, item.qty || 1);
      const sub = Number((item.unitPriceIva * qty).toFixed(2));
      allowed.add(sub);
      for (let i = 0; i < qty; i++) {
        prices.push(item.unitPriceIva);
        pricesWithTi.push(item.isBattery && item.priceWithTradeIn ? item.priceWithTradeIn : item.unitPriceIva);
        pricesWithoutTi.push(item.isBattery && item.priceWithoutTradeIn ? item.priceWithoutTradeIn : item.unitPriceIva);
      }
    }
    const total = sumExactPricesIva(prices);
    allowed.add(total);
    allowed.add(sumExactPricesIva(pricesWithTi));
    allowed.add(sumExactPricesIva(pricesWithoutTi));
    if (total < FREE_SHIPPING_THRESHOLD_USD) {
      allowed.add(Number((FREE_SHIPPING_THRESHOLD_USD - total).toFixed(2)));
    }
  }

  for (const sku of ctx.commercialState.lastRecommendedSkus || []) {
    const entry = getIndexedCatalogEntry(sku);
    if (entry) allowed.add(Number(entry.priceIva.toFixed(2)));
  }

  for (const msg of recentAssistantMsgs.slice(-6)) {
    for (const num of extractDollarNumbers(msg)) {
      allowed.add(num);
    }
  }

  return allowed;
}

function findUnverifiedPrices(reply: string, allowed: Set<number>): number[] {
  const bad: number[] = [];
  for (const num of extractDollarNumbers(reply)) {
    let matched = false;
    for (const ok of allowed) {
      if (Math.abs(ok - num) <= 0.02) {
        matched = true;
        break;
      }
    }
    if (!matched) bad.push(num);
  }
  return bad;
}

function parseToolArgs(rawArgs: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(rawArgs || "{}");
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function buildEmergencyOfflineFallback(
  userMessage: string,
  ctx: MiloToolExecutionContext,
  recentHistoryText: string
): string {
  const plan = buildDeterministicQuotePlan({
    userText: userMessage,
    persistedVehicle: ctx.activeVehicle,
    persistedCity: ctx.city,
    persistedCustomerType: ctx.customerType,
    persistedLastQuote: null,
    persistedCommercialState: ctx.commercialState,
    recentHistoryText,
  });

  if (plan.options.length > 0) {
    const top = plan.options[0];
    const itemsText = top.items.map((i) => `*${i.name}* (*$${i.unitPriceIva.toFixed(2)}* c/IVA)`).join(" + ");
    return `¡Hola! Con gusto te ayudo desde LíderPro Pedernales: te recomiendo ${itemsText}. ¿Te lo agregamos al pedido o necesitas algo más para tu vehículo?`;
  }

  return (
    "¡Hola! Soy Milo de *LíderPro Pedernales* (Vía al Carmen, frente a la gasolinera). " +
    "Cuéntame qué producto buscas o la marca, modelo y año de tu carro y te paso la recomendación exacta con IVA."
  );
}

export async function generateHermesReply(
  userMessage: string,
  clientHistory: ChatTurn[] = [],
  options: HermesReplyOptions = {}
): Promise<HermesResult> {
  const startedAt = Date.now();
  const cleanMessage = (userMessage || "").trim();
  const sessionId = (options.sessionId || `anon-${startedAt}`).trim();
  const channel: ChannelType = options.channel || "demo_web";
  const shouldPersist = options.persist !== false;
  const totalBudgetMs = Math.max(8000, options.timeoutMs ?? 18000);
  const storageMode = getDbStorageMode();

  // 1. Cargar cliente y 30 mensajes recientes desde Neon Postgres
  const [persistedCustomer, dbHistory] = await Promise.all([
    getCustomer(sessionId),
    getRecentMessages(sessionId, 30),
  ]);

  const effectiveHistory: ChatTurn[] =
    dbHistory.length > 0
      ? dbHistory.map((m) => ({ role: m.role, content: m.content }))
      : (clientHistory || []).slice(-30);

  // Hidratar estado base del cliente + señales determinísticas del turno actual
  let activeVehicle = persistedCustomer?.activeVehicle ?? null;
  let city = persistedCustomer?.city ?? null;
  let customerType: CustomerType = persistedCustomer?.customerType ?? "particular";
  const customerName = options.customerName || persistedCustomer?.name || null;

  const extractedVeh = extractVehicleFromText(cleanMessage);
  if (extractedVeh.profile) {
    activeVehicle = mergeVehicleProfiles(activeVehicle, extractedVeh.profile);
  }
  const detectedCity = extractCityFromText(cleanMessage);
  if (detectedCity) city = detectedCity;
  customerType = extractCustomerType(cleanMessage, customerType);

  const prevState: CommercialState = persistedCustomer?.commercialState
    ? {
        cartItems: Array.isArray(persistedCustomer.commercialState.cartItems)
          ? [...persistedCustomer.commercialState.cartItems]
          : [],
        discussedCategories: Array.isArray(persistedCustomer.commercialState.discussedCategories)
          ? [...persistedCustomer.commercialState.discussedCategories]
          : [],
        batteryTradeIn: persistedCustomer.commercialState.batteryTradeIn ?? null,
        salesStage: persistedCustomer.commercialState.salesStage || "descubrimiento",
        lastSuggestedItems: Array.isArray(persistedCustomer.commercialState.lastSuggestedItems)
          ? [...persistedCustomer.commercialState.lastSuggestedItems]
          : [],
        lastRecommendedSkus: Array.isArray(persistedCustomer.commercialState.lastRecommendedSkus)
          ? [...persistedCustomer.commercialState.lastRecommendedSkus]
          : [],
      }
    : {
        cartItems: [],
        discussedCategories: [],
        batteryTradeIn: null,
        salesStage: "descubrimiento",
        lastSuggestedItems: [],
        lastRecommendedSkus: [],
      };

  const explicitTradeIn = extractBatteryTradeInFromText(cleanMessage);
  if (explicitTradeIn !== null) {
    prevState.batteryTradeIn = explicitTradeIn;
  }

  const toolCtx: MiloToolExecutionContext = {
    sessionId,
    customerName,
    customerPhone: options.customerPhone ?? null,
    activeVehicle,
    city,
    customerType,
    commercialState: prevState,
    observedPricesUsd: new Set<number>(),
    matchedSkus: new Set<string>(),
    createdOrder: null,
    escalatedToHuman: false,
    intentTag: "general",
    toolsUsed: [],
  };

  // Persistir turno del usuario
  if (shouldPersist) {
    await insertMessage({
      sessionId,
      channel,
      role: "user",
      content: cleanMessage,
      intentTag: null,
    });
  }

  // 2. Construir ventana conversacional de hasta 30 turnos + contexto vivo
  const recentAssistantTexts = effectiveHistory
    .filter((t) => t.role === "assistant")
    .map((t) => t.content);

  const llmMessages: NimMessagePayload[] = [
    { role: "system", content: MILO_SYSTEM_PROMPT },
    { role: "system", content: buildLiveCustomerContextBlock(toolCtx, recentAssistantTexts) },
    ...effectiveHistory.slice(-28).map((t) => ({
      role: t.role,
      content: t.content,
    })),
    { role: "user", content: cleanMessage },
  ];

  // 3. Bucle Agéntico Multi-Herramienta (máximo 4 iteraciones)
  let finalReply = "";
  let usedModel = "milo-offline-fallback";
  let usedFallback = false;
  const MAX_TOOL_ROUNDS = 4;

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const elapsed = Date.now() - startedAt;
    const remaining = totalBudgetMs - elapsed;
    const allowTools = round < MAX_TOOL_ROUNDS - 1;

    const stepRes = await callNimStep({
      messages: llmMessages,
      useTools: allowTools,
      remainingBudgetMs: remaining,
    });

    if (!stepRes.ok) {
      break;
    }

    usedModel = stepRes.model || usedModel;

    if (stepRes.toolCalls && stepRes.toolCalls.length > 0 && allowTools) {
      llmMessages.push({
        role: "assistant",
        content: stepRes.content || null,
        tool_calls: stepRes.toolCalls,
      });

      for (const tc of stepRes.toolCalls) {
        const args = parseToolArgs(tc.function?.arguments || "{}");
        const toolResult = await executeMiloToolCall(tc.function?.name || "", args, toolCtx);
        llmMessages.push({
          role: "tool",
          tool_call_id: tc.id,
          content: JSON.stringify(toolResult),
        });
      }
      continue;
    }

    if (stepRes.content && stepRes.content.length > 0) {
      finalReply = sanitizeWhatsAppFormatting(stepRes.content);
      break;
    }
  }

  // 4. Guardrail de integridad de precios sobre la respuesta final
  if (finalReply) {
    let allowedPrices = collectAllowedPrices(toolCtx, recentAssistantTexts);
    let badPrices = findUnverifiedPrices(finalReply, allowedPrices);
    if (badPrices.length > 0 && Date.now() - startedAt < totalBudgetMs - 2200) {
      let autoCatalogContext = "";
      if (toolCtx.observedPricesUsd.size === 0) {
        const autoLookup = await executeMiloToolCall(
          "buscar_en_catalogo",
          {
            consultas: [cleanMessage],
            ...(toolCtx.activeVehicle ? { vehiculo: formatVehicleLabel(toolCtx.activeVehicle) } : {}),
          },
          toolCtx
        );
        allowedPrices = collectAllowedPrices(toolCtx, recentAssistantTexts);
        badPrices = findUnverifiedPrices(finalReply, allowedPrices);
        autoCatalogContext = `\n[CATÁLOGO REAL VERIFICADO PARA ESTE TURNO]: ${JSON.stringify(autoLookup)}`;
      }

      if (badPrices.length > 0) {
        const productOnlyPrices = Array.from(allowedPrices)
          .filter((p) => {
            if (Math.abs(p - FREE_SHIPPING_THRESHOLD_USD) > 0.02) return true;
            return toolCtx.observedPricesUsd.has(p);
          })
          .sort((a, b) => a - b);

        const priceRuleInstruction =
          productOnlyPrices.length > 0
            ? `Reescribe tu respuesta al cliente usando ÚNICAMENTE los precios de productos y totales exactos devueltos por las herramientas (${productOnlyPrices
                .map((p) => `$${p.toFixed(2)}`)
                .join(", ")}). Nota: $${FREE_SHIPPING_THRESHOLD_USD.toFixed(
                2
              )} es únicamente el mínimo de domicilio gratis en Pedernales, NO el precio de un producto.`
            : `No tienes ningún precio de producto verificado todavía en herramientas; reescribe tu respuesta SIN poner ningún precio en dólares para productos (recuerda que $${FREE_SHIPPING_THRESHOLD_USD.toFixed(
                2
              )} es solo el mínimo de domicilio gratis, jamás el precio de un producto).`;

        const repairMessages: NimMessagePayload[] = [
          ...llmMessages,
          { role: "assistant", content: finalReply },
          {
            role: "user",
            content:
              `[CORRECCIÓN INTERNA DE PRECIOS] Detecté cifras en dólares no verificadas (${badPrices
                .map((p) => `$${p.toFixed(2)}`)
                .join(", ")}). ${priceRuleInstruction}${autoCatalogContext}\nNo menciones esta corrección interna.`,
          },
        ];
        const repaired = await callNimStep({
          messages: repairMessages,
          useTools: false,
          remainingBudgetMs: totalBudgetMs - (Date.now() - startedAt),
        });
        if (repaired.ok && repaired.content) {
          const candidate = sanitizeWhatsAppFormatting(repaired.content);
          if (findUnverifiedPrices(candidate, allowedPrices).length === 0) {
            finalReply = candidate;
          }
        }
      }
    }
  }

  // 5. Fallback de emergencia SOLO si NVIDIA NIM estuvo completamente caído
  if (!finalReply) {
    usedFallback = true;
    usedModel = "milo-deterministic-fallback";
    finalReply = buildEmergencyOfflineFallback(
      cleanMessage,
      toolCtx,
      effectiveHistory.map((t) => t.content).join("\n")
    );
  }

  // Calcular total de referencia para telemetría / QA
  const cartItems = toolCtx.commercialState.cartItems || [];
  const cartTotalUsd =
    cartItems.length > 0
      ? sumExactPricesIva(cartItems.flatMap((i) => Array(Math.max(1, i.qty || 1)).fill(i.unitPriceIva)))
      : null;
  const quotedTotalUsd =
    toolCtx.createdOrder?.totalUsd ??
    cartTotalUsd ??
    (toolCtx.observedPricesUsd.size > 0 ? Math.min(...Array.from(toolCtx.observedPricesUsd)) : null);

  // Actualizar estado persistente del cliente en Postgres
  toolCtx.commercialState.updatedAt = new Date().toISOString();
  if (shouldPersist) {
    await upsertCustomer({
      phoneOrSession: sessionId,
      name: toolCtx.customerName,
      activeVehicle: toolCtx.activeVehicle,
      city: toolCtx.city,
      customerType: toolCtx.customerType,
      commercialState: toolCtx.commercialState,
    });
  }

  const latencyMs = Date.now() - startedAt;
  const matchedSkusArr = Array.from(toolCtx.matchedSkus);

  let savedMessageId: number | null = null;
  if (shouldPersist) {
    const savedMsg = await insertMessage({
      sessionId,
      channel,
      role: "assistant",
      content: finalReply,
      skusUsed: matchedSkusArr,
      quotedTotalUsd,
      latencyMs,
      intentTag: toolCtx.intentTag,
    });
    savedMessageId = savedMsg.id;
  }

  return {
    reply: finalReply,
    model: usedModel,
    usedFallback,
    latencyMs,
    matchedSkus: matchedSkusArr,
    catalogSize: CATALOG_SIZE,
    sessionId,
    messageId: savedMessageId,
    activeVehicle: toolCtx.activeVehicle,
    city: toolCtx.city,
    customerType: toolCtx.customerType,
    quotedTotalUsd,
    intentTag: toolCtx.intentTag,
    dbStorageMode: storageMode,
    orderCreated: Boolean(toolCtx.createdOrder),
    order: toolCtx.createdOrder,
    escalatedToHuman: toolCtx.escalatedToHuman,
    cartTotalUsd,
  };
}
