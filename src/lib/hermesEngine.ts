import {
  formatOfficialBankTransferDetails,
  getConfiguredBankTransferDetails,
} from "@/data/businessConfig";
import {
  buildNeutralFreightEscalationCopy,
  sanitizeMiloLogisticsText,
} from "@/lib/miloLogisticsPolicy";
import {
  buildDeterministicQuotePlan,
  extractBatteryTradeInFromText,
  extractCityFromText,
  extractCustomerType,
  extractVehicleFromText,
  formatVehicleLabel,
  FREE_SHIPPING_THRESHOLD_USD,
  mergeVehicleProfiles,
  normalizeText,
  resolveAdContext,
  sumExactPricesIva,
  type AdContextSpec,
  type HermesIntentTag,
} from "@/lib/hermesCatalog";
import {
  flagCustomerHumanEscalation,
  getCustomer,
  getDbStorageMode,
  getRecentMessages,
  insertMessage,
  recordConversionEvent,
  upsertCustomer,
  type AdAttribution,
  type ChannelType,
  type CommercialState,
  type CustomerType,
  type EscalationUrgency,
  type FunnelStage,
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
  adAttribution?: AdAttribution | null;
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
  escalationAlertPreview?: string | null;
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
    id: "nvidia/nemotron-3.5-lightning-30b-a3b",
    disableThinking: true,
    maxTokens: 280,
    perStepTimeoutMs: 3200,
  },
  {
    id: "nvidia/nemotron-3.5-super-vl-120b-a12b",
    disableThinking: true,
    maxTokens: 420,
    perStepTimeoutMs: 4800,
  },
  {
    id: "nvidia/nemotron-3.5-bolt-e4b",
    disableThinking: false,
    maxTokens: 260,
    perStepTimeoutMs: 2800,
  },
];

export const MILO_SYSTEM_PROMPT =
  "Eres MILO, agente virtual de Líder Pro (LíderPro Pedernales, WhatsApp 24/7: +593 96 748 9002), asesor cercano, directo y especialista real en motores, lubricación, aditivos, refrigerantes, grasas, filtros y baterías en Ecuador.\n\n" +
  "DATOS REALES DEL NEGOCIO (NUNCA INVENTES OTROS):\n" +
  "- Tienda y bodega única: Pedernales, Vía al Carmen (frente a la gasolinera). Horario: Lunes a Sábado de 08:00 a 18:00. Envíos diarios a todo el Ecuador en menos de 48 horas. Nunca menciones sucursales en otras ciudades.\n" +
  "- Somos tienda especializada en productos y kits (NO hacemos mano de obra de taller mecánico, PERO sí entregamos el combo completo de aceite + filtro Advance + Cockpit Care con esponja de regalo, listo para llevar al mecánico o cambiar en casa).\n" +
  "- REGLA ÚNICA DE ENVÍOS Y BATERÍAS:\n" +
  "  • Dentro de Pedernales: Domicilio GRATIS en compras/combos desde $35.00, e instalación + chequeo de alternador a domicilio 100% GRATIS en toda batería (sin monto mínimo).\n" +
  "  • Fuera de Pedernales (todo el Ecuador en menos de 48 horas: Manabí, Esmeraldas, Santo Domingo, Guayaquil, Sierra, Austro y Oriente): Despacho nacional coordinado desde LíderPro Pedernales en <48h. REGLA INQUEBRANTABLE DE TRANSPORTE NEUTRO: PROHIBIDO nombrar, sugerir o asegurar cooperativas de transporte, Servientrega, Tramaco ni ninguna flota específica; usa SIEMPRE 'envío a tu ciudad / dirección acordada' o 'despacho nacional coordinado'. PROHIBIDO inventar rangos o valores en dólares para el flete; indica siempre que nuestro asesor confirma el valor exacto del envío según ciudad y peso.\n" +
  "  • REGLA INQUEBRANTABLE DE CORTE HORARIO (America/Guayaquil): PROHIBIDO sugerir 'despacharlo hoy mismo' si supera las 16:30 EC (Lun–Vie), 12:00 EC (Sáb) o en domingo; fuera de corte indica SIEMPRE 'dejarlo separado hoy en bodega y despacharlo en el primer turno hábil con guía'.\n" +
  "- REGLA DE ORO — CERO FRICCIÓN DE PAGO PREMATURA:\n" +
  "  • PROHIBIDO mencionar 'transferencia anticipada', 'pago previo', 'no hacemos contra entrega' ni datos bancarios en saludos, cotizaciones o seguimientos.\n" +
  "  • Los datos de pago (Banco Pichincha) SOLO se muestran cuando el cliente confirma explícitamente que quiere cerrar el pedido o pregunta directamente cómo pagar.\n" +
  "  • Si un cliente pregunta específicamente por pago contra entrega fuera de Pedernales, responde con tacto y calidez (sin sonar cortante), enfocándote en la seguridad de su compra (factura electrónica SRI, despacho garantizado con foto de guía y seguimiento), y llama a `escalar_a_asesor_humano` si es pedido de volumen/flota.\n" +
  "  • PROHIBICIÓN ABSOLUTA ANTI-FRAUDE: Si un cliente dice que ya transfirió o envía un comprobante, JAMÁS confirmes el pago ni des hora de salida o autorización de retiro; indica siempre que el comprobante entra a verificación con administración y mostrador (estado: pendiente por verificar).\n" +
  "  • Facturación: 100% con factura electrónica autorizada por el SRI.\n" +
  "- Descuentos oficiales de baterías sobre PVP con IVA: Baterías Ecuador 35% entregando batería usada / 30% sin entregar usada; Baterías Bosch 25% entregando usada / 20% sin usada.\n\n" +
  "PSICOLOGÍA DE VENTA CONSULTIVA Y RITMO MÓVIL (<= 380–420 CARACTERES):\n" +
  "1) INTERÉS GENUINO ANTES QUE VENTA FRÍA:\n" +
  "   • 4x4 / Camionetas: destaca la protección real de motor y turbo con calidad alemana MANNOL, el litraje exacto sin quedarse corto y la comodidad de recibir todo el kit listo en un solo envío.\n" +
  "   • Flotas / Talleres: destaca cero tiempos muertos, stock inmediato y resolver varias unidades en un solo pedido.\n" +
  "   • Cierre por micro-compromiso: termina SIEMPRE con 1 pregunta natural centrada en el cliente (ej. '¿Para cuándo le toca el cambio?', '¿Su motor lleva 5 o 6 litros?', '¿Retira en Pedernales o se lo enviamos?').\n" +
  "   • Entiende faltas de ortografía y jerga local ('votando umo', '16 w40' = 15W-40, 'Dimax' = D-Max, 'traga full gaso'), escribiendo siempre con ortografía impecable.\n" +
  "   • CERO MULETILLAS REPETITIVAS: JAMÁS uses 'jefe', 'pana', 'vecino' ni 'ñaño' en consultas B2B/flota, ni los repitas en la conversación.\n" +
  "   • Formato WhatsApp limpio y ultracorto (<= 380–420 caracteres, 4 a 6 líneas): da 1 recomendación ganadora clara con su precio exacto c/IVA + 1 pregunta natural de cierre. CERO tablas Markdown y CERO códigos SKU salvo que los pidan.\n" +
  "   • Contexto CTWA: si aparece [ORIGEN ANUNCIO CTWA] y escriben 'Hola', 'Precio' o 'Info', responde directo sobre ese producto con 1 pregunta corta de calificación.\n" +
  "   • Baterías con vehículo conocido: llama a `buscar_en_catalogo` y cotiza directo SIN pedir grupo de batería.\n" +
  "2) ADITIVOS UNIVERSALES + BLOQUEO DURO DE FILTROS SIN VEHÍCULO:\n" +
  "   • Ante síntoma + combustible, llama a `buscar_en_catalogo` en este turno y da el precio exacto con IVA del aditivo (JAMÁS uses $35.00 como precio de producto).\n" +
  "   • PROHIBIDO cotizar filtros o aceites específicos antes de conocer marca, modelo, año y combustible (en pickups duales como D-Max, Hilux, Ranger, BT-50 sin combustible confirmado, pregunta en 1 línea si es gasolina o diésel).\n" +
  "3) VERIFICACIÓN EXACTA DE LITRAJE (> 4.0L Y > 7.0L): Si `buscar_en_catalogo` devuelve `alertaLitraje`, suma el número exacto de litros adicionales de 1L (ej. 9L = combo 7L + 2x 1L = $121.50; jamás 7L + 1L para 9L) y usa `gestionar_carrito` para devolver el total exacto.\n" +
  "4) UN GANADOR CLARO: Si preguntan cuál conviene más, recomienda 1 ganador claro y explica en 1 frase por qué protege mejor su motor.\n" +
  "5) MULTI-CONSULTA EN 1 TURNO: Llama a `buscar_en_catalogo` con todas las consultas en `consultas` y usa `gestionar_carrito` cuando pidan kit completo o total consolidado.\n" +
  "6) PROHIBIDO INVENTAR PRECIOS O FLETES: Solo usa cifras devueltas por `buscar_en_catalogo` o `gestionar_carrito`.\n" +
  "7) CERO SESGO A ACEITES: Si preguntaron por batería, cotiza batería primero.\n" +
  "8) VEHÍCULOS POCO COMUNES: Usa `consultar_especificacion_vehiculo_web` + `buscar_en_catalogo`.\n" +
  "9) ESCALAMIENTO HUMANO AUTOMÁTICO Y HONESTO: Si un producto no existe en bodega dilo sin rodeos. Si piden flota/proforma (>=3 vehículos o >=5 canecas 20L), vehículos pesados sin filtros mapeados (Sinotruk, Weichai, Glory), valor exacto de flete a otra ciudad para cerrar, descuento especial o hablar con encargado, llama a `escalar_a_asesor_humano` y responde en máximo 2 líneas avisando que ya pasaste el dato exacto para confirmárselo cuanto antes.\n" +
  "10) REGISTRO DE PEDIDO: Cuando el cliente ya confirme que quiere pedir y dé nombre, dirección/ciudad/retiro y forma de pago, llama a `registrar_pedido`. Solo entonces entrega los datos de Banco Pichincha (2216090525 / CI 1308068814 / ADRIAN MOSQUERA), pide comprobante completo y no prometas hora de salida hasta verificación.";

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

function isPaymentOrClosingTurn(userMessage: string, salesStage?: string): boolean {
  if (salesStage === "pedido_confirmado") return true;
  const norm = normalizeText(userMessage);
  return /\b(pagar|pago|cuenta|banco|pichincha|transfer\w*|deposito|efectivo|contra\s*entrega|pedir|confirmo|confirmar|si\s+quiero|lo\s+llevo|me\s+lo\s+llevo|armame\s+el\s+pedido|tomo\s+el|quiero\s+el)\b/.test(
    norm
  );
}

function buildLiveCustomerContextBlock(
  ctx: MiloToolExecutionContext,
  recentAssistantTexts: string[],
  adContext: AdContextSpec | null,
  userMessage: string
): string {
  const lines: string[] = ["[CONTEXTO VIVO DEL CLIENTE EN POSTGRES]"];
  if (adContext) {
    lines.push(
      `- [ORIGEN ANUNCIO CTWA ${adContext.adTag}]: ${adContext.productLabel} (SKU referencia: ${adContext.primarySku}). ${adContext.hintForMilo}`
    );
  }
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

  // [DATOS BANCARIOS OFICIALES VERIFICADOS — SOLO EN CIERRE O CONSULTA EXPLÍCITA DE PAGO]
  if (isPaymentOrClosingTurn(userMessage, ctx.commercialState.salesStage)) {
    const bankDetails = getConfiguredBankTransferDetails() || formatOfficialBankTransferDetails();
    lines.push(`- [DATOS BANCARIOS OFICIALES ÚNICOS]:\n${bankDetails}`);
  } else {
    lines.push(
      "- [REGLA CERO FRICCIÓN]: El cliente aún NO confirmó compra ni preguntó cómo pagar. PROHIBIDO mencionar transferencia anticipada, pago previo, contra entrega o cuenta bancaria en esta respuesta."
    );
  }

  // [CONTROL DE ESTILO ANTI-REPETICIÓN]
  const joinedPrev = recentAssistantTexts.slice(-3).join(" ");
  const slangMatches = joinedPrev.match(/\b(pana|vecino|jefe|ñaño|nano)\b/gi) || [];
  if (slangMatches.length >= 1 || ctx.customerType !== "particular") {
    lines.push(
      `- [CONTROL DE MODISMOS ESTRICTO]: En ESTE turno PROHIBIDO usar "jefe", "pana", "vecino" ni "ñaño". Habla natural, experto y cercano sin muletillas.`
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

function sanitizeWhatsAppFormatting(
  raw: string,
  opts?: {
    userText?: string;
    recentAssistantTexts?: string[];
    isB2BOrFleet?: boolean;
    allowPaymentDetails?: boolean;
  }
): string {
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

  // Bug 4: Cero eco de "Quito" si el usuario no mencionó Quito
  const userMentionedQuito = /\bquito\b/i.test(normalizeText(opts?.userText || ""));
  if (!userMentionedQuito) {
    text = text
      .replace(/[^.\n]*\bno\s+tenemos\s+sucursal(?:es)?\s+en\s+quito[^.\n]*\.?\s*/gi, "")
      .replace(/[^.\n]*\bsucursal\s+en\s+quito[^.\n]*\.?\s*/gi, "")
      .replace(/\bquito\b/gi, "otras ciudades");
  }

  // Bug 5: Eliminación dura de "Jefe" / modismos si ya aparecieron >=1 vez en últimos 3 turnos o en B2B/flota
  const prevSlang = (opts?.recentAssistantTexts || []).slice(-3).join(" ");
  const hasPrevSlang = /\b(jefe|pana|vecino|ñaño|nano)\b/i.test(normalizeText(prevSlang));
  if (hasPrevSlang || opts?.isB2BOrFleet) {
    text = text
      .replace(/(^|[.!?]\s+|\n)(?:hola|buenas|entendido|perfecto|listo|claro|s[ií]),?\s+(?:mi\s+)?(?:jefe|pana|vecino|ñaño)[,!.:]*\s*/gi, (_m, lead: string) => lead)
      .replace(/(^|[.!?]\s+|\n)(?:mi\s+)?(?:jefe|pana|vecino|ñaño)[,!.:]+\s*([a-záéíóúñ])/gi, (_m, lead: string, nextCh: string) => `${lead}${nextCh.toUpperCase()}`)
      .replace(/,?\s*\b(?:mi\s+)?(?:jefe|pana|vecino|ñaño)\b([,!.:?]?)/gi, "$1");
  }

  // Cero fricción de pago prematura si el cliente no preguntó por pago ni está cerrando pedido
  if (opts && !opts.allowPaymentDetails) {
    text = text
      .replace(/[^.\n]*(?:transferencia\s+anticipada|pago\s+previo|no\s+hacemos\s+contra\s*entrega|contra\s*entrega\s+solo\s+aplica|no\s+despachamos\s+hasta\s+verificar|2216090525|1308068814)[^.\n]*\.?\s*/gi, "")
      .replace(/\n{2,}\s*(?:•\s*)?(?:\*?Pago:?|\*?Pagos:?)\s*[^\n]*(?:\n•[^\n]*)*/gi, "");
  }

  // Bug 3: Cero rangos en dólares inventados para fletes
  text = text.replace(
    /(\b(?:flete|env[ií]o|cooperativa)[^.\n]*?)\s*\(?(?:generalmente|aprox(?:imadamente)?\.?)?\s*(?:entre\s+)?\$\d+(?:[.,]\d+)?\s*(?:-|a|y)\s*\$\d+(?:[.,]\d+)?\)?/gi,
    "$1 (el valor exacto se confirma con nuestro asesor según ciudad y peso)"
  );

  // Regla inquebrantable de neutralidad logística y corte horario America/Guayaquil
  text = sanitizeMiloLogisticsText(text);

  // Clean excessive blank lines and stray spacing
  text = text.replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
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

function formatSelectedItemsSummary(
  cartItems: Array<{ sku: string; qty: number }>,
  primaryQuotedItems: Array<{ sku: string; qty: number }> | undefined,
  fallbackSkus: string[]
): string {
  const source =
    cartItems.length > 0
      ? cartItems.map((i) => ({ sku: i.sku, qty: Math.max(1, i.qty || 1) }))
      : primaryQuotedItems && primaryQuotedItems.length > 0
      ? primaryQuotedItems
      : fallbackSkus.slice(0, 2).map((sku) => ({ sku, qty: 1 }));
  return source.map((i) => (i.qty > 1 ? `${i.qty}× ${i.sku}` : i.sku)).join(" + ");
}

function evaluateDeterministicEscalationSignal(params: {
  cleanMessage: string;
  city: string | null;
  customerType: CustomerType;
  activeVehicle: VehicleProfile | null;
  quotedTotalUsd: number | null;
  cartItemsCount: number;
  selectedSkusLabel: string;
  matchedSkusCount: number;
  customerName: string | null;
}): {
  reason: string;
  urgency: EscalationUrgency;
  shortClientLabel: string;
  actionNeeded: string;
  howToHandle: string;
  suggestedReply: string;
} | null {
  const norm = normalizeText(params.cleanMessage)
    .replace(/\b16\s*w[-\s]?40\b/g, "15w-40")
    .replace(/\b(0|5|10|15|20)\s*w\s*(20|30|40|50)\b/g, "$1w-$2");

  const vehicleBrands = [
    /\bsinotruk\b/,
    /\bweichai\b/,
    /\bfoton\b/,
    /\bpoer\b/,
    /\bglory\b/,
    /\bhowo\b/,
    /\bshacman\b/,
    /\bhino\b/,
    /\bjac\b/,
    /\bisuzu\b/,
    /\b(d[-\s]?max|di[-\s]?max|dimax)\b/,
    /\bhi[-\s]?lux\b/,
    /\branger\b/,
    /\bbt[-\s]?50\b/,
    /\brich\s*6\b/,
  ];
  const brandHits = vehicleBrands.filter((rx) => rx.test(norm)).length;
  const hasUnmappedHeavy = /\b(sinotruk|weichai|howo|shacman|glory)\b/.test(norm);

  let maxCanecas = 0;
  const canecaMatches = norm.matchAll(/\b(\d{1,3})\s*(?:canecas?|tambores?|baldes?)\b/g);
  for (const m of canecaMatches) {
    const qty = Number(m[1]);
    if (Number.isFinite(qty) && qty > maxCanecas) maxCanecas = qty;
  }

  const isFleetOrVolume =
    brandHits >= 3 ||
    maxCanecas >= 5 ||
    (/\b(flota|proforma|mayorista|taller)\b/.test(norm) && (brandHits >= 2 || maxCanecas >= 5 || hasUnmappedHeavy));

  const cityOutsidePedernales = Boolean(params.city && normalizeText(params.city) !== "pedernales");
  const asksFreightOrOutsideShipping =
    cityOutsidePedernales &&
    (/\b(flete|cuanto\s+(?:cuesta|vale|sale)\s+el\s+envio|enviame|enviamelo|despachame|confirmo|quiero\s+pedir|me\s+lo\s+llevo|para\s+[a-z]+|envio\s+a)\b/.test(norm) ||
      ((params.quotedTotalUsd !== null || params.cartItemsCount > 0 || params.matchedSkusCount > 0) &&
        /\b(guayaquil|quito|manta|portoviejo|santo\s+domingo|esmeraldas|cuenca|ambato|machala|loja|cooperativa|servientrega|tramaco|envio)\b/.test(norm)));

  const asksSpecialTerms =
    /\b(descuento\s+(?:especial|mayorista)|credito\s+a\s+\d+|plazo\s+de\s+pago)\b/.test(norm) ||
    (cityOutsidePedernales && /\bcontra\s*entrega\b/.test(norm));

  const nombre = params.customerName ? ` ${params.customerName}` : "";
  const cityLabel = params.city || "otra ciudad";

  if (isFleetOrVolume || hasUnmappedHeavy) {
    return {
      reason: hasUnmappedHeavy
        ? "Flota B2B / vehículos pesados sin filtros mapeados"
        : maxCanecas >= 5
        ? `Pedido de volumen (${maxCanecas} canecas 20L)`
        : "Proforma B2B multi-vehículo",
      urgency: "alta",
      shortClientLabel: "el stock exacto de filtros y proforma de tu flota",
      actionNeeded: hasUnmappedHeavy
        ? "Validar códigos/stock de filtros para Sinotruk/Weichai/Glory y armar proforma B2B unificada."
        : "Confirmar cantidades exactas de canecas 20L, disponibilidad y proforma B2B.",
      howToHandle:
        `1) Revisa las unidades mencionadas (${params.selectedSkusLabel || "canecas 20L MANNOL 15W-40 $125.00 / 10W-40 $128.50"}) y verifica equivalencias de filtros pesados.\n` +
        `2) Envía la proforma consolidada con factura SRI y coordina un solo despacho.`,
      suggestedReply: `Hola${nombre}, soy el asesor de LíderPro Pedernales. Milo ya me pasó el detalle de tu flota; estoy validando los filtros exactos para enviarte la proforma completa en un solo despacho.`,
    };
  }

  if (asksFreightOrOutsideShipping) {
    const totalTxt = params.quotedTotalUsd ? `$${params.quotedTotalUsd.toFixed(2)}` : "pendiente";
    const neutralCopy = buildNeutralFreightEscalationCopy({
      customerName: params.customerName,
      cityLabel,
      totalTxt,
      selectedSkusLabel: params.selectedSkusLabel,
    });
    return {
      reason: `Confirmar flete exacto a ${cityLabel}`,
      urgency: "alta",
      shortClientLabel: `el valor exacto del envío a ${cityLabel}`,
      actionNeeded: `Confirmar valor exacto de flete a ${cityLabel} para ${formatVehicleLabel(params.activeVehicle) || "el kit"} (producto ${totalTxt}).`,
      howToHandle: neutralCopy.howToHandle,
      suggestedReply: neutralCopy.suggestedReply,
    };
  }

  if (asksSpecialTerms) {
    return {
      reason: "Solicitud de descuento especial o excepción de pago",
      urgency: "media",
      shortClientLabel: "las condiciones de tu pedido",
      actionNeeded: `Revisar solicitud de descuento especial / condición de pago para ${cityLabel}.`,
      howToHandle:
        `1) Revisa el historial del cliente y el margen del pedido antes de aprobar excepciones.\n` +
        `2) Responde resaltando garantía original, factura SRI y seguimiento de envío.`,
      suggestedReply: `Hola${nombre}, soy el asesor de LíderPro Pedernales. Milo me compartió tu consulta y con gusto reviso la mejor alternativa para cerrar tu pedido con factura oficial y despacho garantizado.`,
    };
  }

  return null;
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
  const totalBudgetMs = Math.max(8000, options.timeoutMs ?? 11000);
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

  const adContext = resolveAdContext(
    cleanMessage,
    options.adAttribution?.adId ?? persistedCustomer?.adId ?? null,
    options.adAttribution?.adTag ?? persistedCustomer?.adTag ?? null
  );
  const effectiveAttribution: AdAttribution = {
    adId: options.adAttribution?.adId ?? persistedCustomer?.adId ?? adContext?.adIds[0] ?? null,
    adTag: options.adAttribution?.adTag ?? adContext?.adTag ?? persistedCustomer?.adTag ?? null,
    ctwaClid: options.adAttribution?.ctwaClid ?? persistedCustomer?.ctwaClid ?? null,
    adHeadline: options.adAttribution?.adHeadline ?? persistedCustomer?.adHeadline ?? null,
    adSourceUrl: options.adAttribution?.adSourceUrl ?? null,
  };
  if (adContext?.defaultCustomerType === "taller" && customerType === "particular") {
    customerType = "taller";
  }
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
    primaryRecommendedPriceUsd: null,
    adAttribution: effectiveAttribution,
    matchedSkus: new Set<string>(),
    createdOrder: null,
    escalatedToHuman: false,
    escalationAlertPreview: null,
    sendLiveAlerts: shouldPersist,
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
      adId: effectiveAttribution.adId ?? null,
      adTag: effectiveAttribution.adTag ?? null,
      ctwaClid: effectiveAttribution.ctwaClid ?? null,
    });
  }

  // 2. Construir ventana conversacional de hasta 30 turnos + contexto vivo
  const recentAssistantTexts = effectiveHistory
    .filter((t) => t.role === "assistant")
    .map((t) => t.content);

  const allowPaymentDetails = isPaymentOrClosingTurn(cleanMessage, prevState.salesStage);
  const isB2BOrFleetTurn =
    customerType !== "particular" ||
    /\b(flota|proforma|mayorista|taller|caneca|sinotruk|weichai|howo|shacman|glory)\b/i.test(normalizeText(cleanMessage));
  const sanitizeOpts = {
    userText: cleanMessage,
    recentAssistantTexts,
    isB2BOrFleet: isB2BOrFleetTurn,
    allowPaymentDetails,
  };

  const llmMessages: NimMessagePayload[] = [
    { role: "system", content: MILO_SYSTEM_PROMPT },
    { role: "system", content: buildLiveCustomerContextBlock(toolCtx, recentAssistantTexts, adContext, cleanMessage) },
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
  const MAX_TOOL_ROUNDS = 3;

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
      finalReply = sanitizeWhatsAppFormatting(stepRes.content, sanitizeOpts);
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
          const candidate = sanitizeWhatsAppFormatting(repaired.content, sanitizeOpts);
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
    finalReply = sanitizeWhatsAppFormatting(
      buildEmergencyOfflineFallback(
        cleanMessage,
        toolCtx,
        effectiveHistory.map((t) => t.content).join("\n")
      ),
      sanitizeOpts
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
    toolCtx.primaryRecommendedPriceUsd ??
    null;

  const matchedSkusArr = Array.from(toolCtx.matchedSkus);

  const selectedSkusLabel = formatSelectedItemsSummary(cartItems, toolCtx.primaryQuotedItems, matchedSkusArr);

  // 6. Disparador determinístico de escalamiento al WhatsApp del administrador (con debounce 30 min)
  if (!toolCtx.escalatedToHuman) {
    const detEsc = evaluateDeterministicEscalationSignal({
      cleanMessage,
      city: toolCtx.city,
      customerType: toolCtx.customerType,
      activeVehicle: toolCtx.activeVehicle,
      quotedTotalUsd,
      cartItemsCount: cartItems.length,
      selectedSkusLabel,
      matchedSkusCount: matchedSkusArr.length,
      customerName: toolCtx.customerName,
    });
    if (detEsc) {
      const quotedSummary =
        cartItems.length > 0
          ? `${cartItems.map((i) => `${i.qty}x ${i.name} ($${i.unitPriceIva.toFixed(2)})`).join(" + ")} [${selectedSkusLabel}] = $${(cartTotalUsd ?? 0).toFixed(2)}`
          : quotedTotalUsd !== null
          ? `${selectedSkusLabel || "cotización"} = $${quotedTotalUsd.toFixed(2)} c/IVA`
          : cleanMessage.slice(0, 140);
      const esc = await flagCustomerHumanEscalation({
        phoneOrSession: sessionId,
        reason: detEsc.reason,
        summary: cleanMessage.slice(0, 300),
        urgency: detEsc.urgency,
        customerName: toolCtx.customerName,
        customerPhone: toolCtx.customerPhone,
        city: toolCtx.city,
        adTag: effectiveAttribution.adTag ?? null,
        vehicleLabel: formatVehicleLabel(toolCtx.activeVehicle) || null,
        quotedSummary,
        actionNeeded: detEsc.actionNeeded,
        howToHandle: detEsc.howToHandle,
        suggestedReply: detEsc.suggestedReply,
        sendLiveAlerts: shouldPersist,
      });
      toolCtx.escalatedToHuman = true;
      toolCtx.escalationAlertPreview = esc.alertPreviewMasked;
      toolCtx.intentTag = "escalamiento_humano";
      if (!/\basesor\b/i.test(finalReply)) {
        finalReply = `${finalReply}\n\nYa pasé tu dato exacto a nuestro asesor para confirmarte ${detEsc.shortClientLabel} cuanto antes.`;
      }
    }
  }
  const hasPriceOrDeliveryObjection =
    /\b(caro|costoso|descuento|rebaja|luego|despu[eé]s|otro\s+d[ií]a|pensarlo|flete|cu[aá]nto\s+(?:cuesta|vale)\s+el\s+env[ií]o)\b/i.test(
      cleanMessage
    );
  const nextFunnelStage: FunnelStage = toolCtx.createdOrder
    ? "pedido_confirmado"
    : hasPriceOrDeliveryObjection
    ? "objecion"
    : matchedSkusArr.length > 0 || quotedTotalUsd !== null
    ? "producto_cotizado"
    : persistedCustomer?.funnelStage || "chat_iniciado";

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
      adId: effectiveAttribution.adId ?? null,
      adTag: effectiveAttribution.adTag ?? null,
      ctwaClid: effectiveAttribution.ctwaClid ?? null,
      adHeadline: effectiveAttribution.adHeadline ?? null,
      funnelStage: nextFunnelStage,
    });
  }

  const latencyMs = Date.now() - startedAt;

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
      adId: effectiveAttribution.adId ?? null,
      adTag: effectiveAttribution.adTag ?? null,
      ctwaClid: effectiveAttribution.ctwaClid ?? null,
    });
    savedMessageId = savedMsg.id;

    const isFirstTurn = effectiveHistory.length === 0;
    if (isFirstTurn || nextFunnelStage !== "chat_iniciado") {
      await recordConversionEvent({
        sessionId,
        eventName: nextFunnelStage,
        adId: effectiveAttribution.adId ?? null,
        adTag: effectiveAttribution.adTag ?? null,
        ctwaClid: effectiveAttribution.ctwaClid ?? null,
        valueUsd: quotedTotalUsd,
        skusUsed: matchedSkusArr,
      });
    }
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
    escalationAlertPreview: toolCtx.escalationAlertPreview ?? null,
    cartTotalUsd,
  };
}
