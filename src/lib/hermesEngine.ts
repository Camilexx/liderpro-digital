import privatePricing from "@/data/privatePricing.server.json";
import { META_CONFIG } from "@/data/metaConfig";

export interface CatalogPricingItem {
  sku: string;
  brand?: string;
  category?: string;
  name: string;
  presentation?: string;
  base_price_no_iva?: number;
  price_with_iva_raw?: number;
  quoted_pvp_iva?: number;
  excel_code?: string;
  pricing_note?: string;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface HermesResult {
  reply: string;
  model: string;
  usedFallback: boolean;
  latencyMs: number;
  matchedSkus: string[];
  catalogSize: number;
}

const CATALOG = privatePricing as CatalogPricingItem[];
const NVIDIA_CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const HERMES_MODEL = "nvidia/nemotron-3.5-bolt-e4b";
const FREE_SHIPPING_THRESHOLD = 35;

export const HERMES_SYSTEM_PROMPT =
  "Eres HERMES, Especialista Senior en Repuestos, Baterías, Lubricantes MANNOL y Filtros Advance de LíderPro Pedernales (Atención 24/7 al +593 96 748 9002). " +
  "Reglas estrictas:\n" +
  "1) NUNCA digas que un producto no tiene precio: SIEMPRE cotiza con el campo PVP_IVA_INCLUDED del catálogo privado proporcionado (precios ya incluyen IVA 15% y redondeo comercial .00/.50/.90).\n" +
  "2) Si preguntan por envío gratis: indica claramente que en Pedernales el envío es GRATIS desde $35 USD (y calcula exactamente cuánto falta si dan un monto, o usa un Combo de referencia) y que hacemos envíos seguros a todo el Ecuador el mismo día.\n" +
  "3) Si preguntan por cambios de aceite o combos (especialmente Aveo, D-Max, 4x4 Diésel o MANNOL): recomienda el Combo Cambio MANNOL correspondiente e informa que incluye GRATIS el Filtro Advance, Limpiador UV3 Cockpit Care (MANNOL 6145) y Esponja de microfibra.\n" +
  "4) Mantén formato limpio tipo WhatsApp (negritas con *asteriscos*, viñetas cortas, máximo 110 palabras), incluye factura electrónica SRI autorizada y garantía oficial.";

function normalizeText(value: string): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const QUERY_EXPANSIONS: Array<{ test: RegExp; extra: string[] }> = [
  { test: /aveo|sail|corsa|spark|chevrolet/i, extra: ["10w-40", "10w40", "5w-30", "3387", "combo-mannol-1", "mannol"] },
  { test: /d-?max|hilux|l200|4x4|diesel|camioneta/i, extra: ["15w-40", "15w40", "5w-40", "1539", "combo-mannol-2", "bateria", "ecuador", "bosch", "24", "27", "34"] },
  { test: /bateria|bat|amp|arranque/i, extra: ["bateria", "ecuador", "bosch", "hp", "fe", "24", "27", "34", "42"] },
  { test: /combo|regalo|mannol/i, extra: ["combo-mannol", "6145", "regalo", "esponja"] },
  { test: /filtro/i, extra: ["advance", "080aa", "080ao", "078ao", "080ac"] },
];

export function searchCatalogMatches(query: string, limit = 8): CatalogPricingItem[] {
  const qNorm = normalizeText(query);
  const rawTokens = qNorm
    .split(/[^a-z0-9.\-]+/)
    .filter((t) => t.length >= 2 && !["para", "con", "del", "las", "los", "que", "por", "como", "falta", "cuanto", "precio", "cotizar"].includes(t));

  const expandedTokens = [...rawTokens];
  for (const exp of QUERY_EXPANSIONS) {
    if (exp.test.test(qNorm)) {
      expandedTokens.push(...exp.extra);
    }
  }
  const uniqueTokens = Array.from(new Set(expandedTokens));

  const scored: Array<{ score: number; item: CatalogPricingItem }> = [];
  for (const item of CATALOG) {
    const skuNorm = normalizeText(item.sku);
    const nameNorm = normalizeText(item.name);
    const brandNorm = normalizeText(item.brand || "");
    const catNorm = normalizeText(item.category || "");
    const presNorm = normalizeText(item.presentation || "");
    const hay = `${skuNorm} ${nameNorm} ${brandNorm} ${catNorm} ${presNorm}`;

    let score = 0;
    for (const tok of rawTokens) {
      if (skuNorm === tok || skuNorm.includes(tok)) score += 6;
      else if (nameNorm.includes(tok)) score += 4;
      else if (hay.includes(tok)) score += 2;
    }
    for (const tok of uniqueTokens) {
      if (!rawTokens.includes(tok) && hay.includes(tok)) {
        score += 1.5;
      }
    }
    if (item.sku.startsWith("COMBO-") && /combo|regalo|aceite|aveo|4x4|diesel|mannol/.test(qNorm)) {
      score += 3.5;
    }
    if (score > 0) {
      scored.push({ score, item });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, limit).map((x) => x.item);
  if (top.length === 0) {
    // Fallback representativo (Combos MANNOL + Baterías populares)
    return CATALOG.filter(
      (x) =>
        x.sku.startsWith("COMBO-MANNOL-1") ||
        x.sku.startsWith("COMBO-MANNOL-2") ||
        x.sku === "03024-HP-I" ||
        x.sku === "03042-HP"
    ).slice(0, limit);
  }
  return top;
}

export function formatCatalogContext(items: CatalogPricingItem[]): string {
  return items
    .map((item) => {
      const pvp = Number(item.quoted_pvp_iva ?? 0).toFixed(2);
      const base = Number(item.base_price_no_iva ?? 0).toFixed(2);
      return `- SKU:${item.sku} | ${item.name} (${item.presentation || "Unidad"}) | PVP_IVA_INCLUDED=$${pvp} | BaseSinIVA=$${base}`;
    })
    .join("\n");
}

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

export function buildDeterministicHermesReply(query: string, matches: CatalogPricingItem[]): string {
  const qNorm = normalizeText(query);

  // Caso especial: consulta sobre envío gratis
  if (/envio gratis|cuanto falta|delivery|domicilio|flete/.test(qNorm)) {
    const amountMatch = query.match(/(\d+(?:[.,]\d+)?)/);
    if (amountMatch && !/20\d\d|4x4/.test(amountMatch[1])) {
      const current = parseFloat(amountMatch[1].replace(",", "."));
      if (!Number.isNaN(current) && current > 0 && current < FREE_SHIPPING_THRESHOLD) {
        const diff = (FREE_SHIPPING_THRESHOLD - current).toFixed(2);
        return (
          `🚚 *Envío GRATIS en Pedernales* desde *$35.00*\n\n` +
          `Con tu pedido de *$${current.toFixed(2)}*, te faltan solo *$${diff}* para activar *delivery 100% gratis* en Pedernales.\n` +
          `💡 Puedes completarlo con un *Filtro Advance* (desde *$2.50*) o un *Limpiador UV3 MANNOL* (*$5.00*).\n\n` +
          `📦 Envíos nacionales el mismo día vía Servientrega / transporte con factura electrónica SRI.`
        );
      }
    }
    return (
      `🚚 *Política de Envío GRATIS — LíderPro Pedernales*\n\n` +
      `• *Pedernales urbano:* ¡Envío *GRATIS* en pedidos desde *$35.00 USD*! (Por ejemplo, cualquiera de nuestros Combos Cambio MANNOL desde *$38.50* ya califica automático).\n` +
      `• *Todo Ecuador:* Despacho el mismo día desde Bodega Pedernales por Servientrega o encomienda segura.\n\n` +
      `¿De cuánto es tu carrito actual o qué repuesto buscas para calcularlo exacto?`
    );
  }

  const lines = matches.slice(0, 4).map((m) => {
    const pvp = Number(m.quoted_pvp_iva ?? 0).toFixed(2);
    const giftNote = m.sku.startsWith("COMBO-") ? " _(incluye Filtro + MANNOL 6145 + Esponja GRATIS)_" : "";
    return `• *${m.name}*: *$${pvp}* (IVA inc.)${giftNote}`;
  });

  const best = matches[0];
  const qualifiesFree = Number(best?.quoted_pvp_iva ?? 0) >= FREE_SHIPPING_THRESHOLD;
  const shippingLine = qualifiesFree
    ? `✅ Califica para *Envío GRATIS en Pedernales* (+$${FREE_SHIPPING_THRESHOLD}) y factura SRI.`
    : `🚚 Envío GRATIS en Pedernales desde *$${FREE_SHIPPING_THRESHOLD}.00* | Factura electrónica SRI incluida.`;

  return (
    `¡Hola! Te saluda *Hermes de LíderPro Pedernales* (24/7 ${META_CONFIG.line247Display}) 👋\n\n` +
    `Opciones exactas de bodega:\n${lines.join("\n")}\n\n` +
    `${shippingLine}\n` +
    `¿Confirmamos despacho o te verifico la aplicación exacta para tu vehículo?`
  );
}

export async function generateHermesReply(
  userText: string,
  history: ChatTurn[] = [],
  options: { timeoutMs?: number } = {}
): Promise<HermesResult> {
  const startedAt = Date.now();
  const matches = searchCatalogMatches(userText, 7);
  const catalogContext = formatCatalogContext(matches);
  const keys = getNvidiaKeys();
  const timeoutMs = options.timeoutMs ?? 2100;

  if (keys.length === 0) {
    const reply = buildDeterministicHermesReply(userText, matches);
    return {
      reply,
      model: "hermes-catalog-rag-fast",
      usedFallback: true,
      latencyMs: Date.now() - startedAt,
      matchedSkus: matches.map((m) => m.sku),
      catalogSize: CATALOG.length,
    };
  }

  const recentTurns = history
    .slice(-4)
    .filter((h) => h.content.trim().length > 0)
    .map((h) => ({ role: h.role, content: h.content.slice(0, 400) }));

  const userPrompt =
    `Catálogo privado vigente (426/426 SKUs verificados con IVA):\n${catalogContext}\n\n` +
    `Mensaje del cliente:\n${userText}\n\n` +
    `Responde como Hermes en formato WhatsApp corto, cordial y preciso usando únicamente los precios PVP_IVA_INCLUDED del catálogo.`;

  // Try up to 2 rotated NVIDIA keys within strict budget (< 2.5s total)
  for (let i = 0; i < Math.min(2, keys.length); i++) {
    const apiKey = keys[i];
    const remainingBudget = Math.max(800, timeoutMs - (Date.now() - startedAt));
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
          temperature: 0.2,
          max_tokens: 340,
        }),
        signal: AbortSignal.timeout(remainingBudget),
      });

      if (!resp.ok) continue;
      const data = (await resp.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const content = (data.choices?.[0]?.message?.content || "").trim();
      if (content) {
        return {
          reply: content,
          model: HERMES_MODEL,
          usedFallback: false,
          latencyMs: Date.now() - startedAt,
          matchedSkus: matches.map((m) => m.sku),
          catalogSize: CATALOG.length,
        };
      }
    } catch {
      // Fall through cleanly to next key or deterministic <5ms catalog responder
    }
  }

  return {
    reply: buildDeterministicHermesReply(userText, matches),
    model: "hermes-catalog-rag-fast",
    usedFallback: true,
    latencyMs: Date.now() - startedAt,
    matchedSkus: matches.map((m) => m.sku),
    catalogSize: CATALOG.length,
  };
}
