import { NextRequest, NextResponse } from "next/server";
import privateCatalog from "@/data/privatePricing.server.json";

const NVIDIA_ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";
const PRIMARY_MODEL = "nousresearch/hermes-3-llama-3.1-70b";
const FALLBACK_MODEL = "nvidia/nemotron-3-ultra-550b-a55b";

const IVA_RATE = 1.15;
const FREE_SHIPPING_THRESHOLD = 35.0;
const INTERNAL_SHIPPING_MARGIN = 6.5;
const GIFT_NAME = "MANNOL 6145 Cockpit Care 1L + Esponja Original";

interface PrivateCatalogItem {
  sku: string;
  brand: string;
  category: string;
  name: string;
  presentation?: string;
  base_price_no_iva: number | null;
}

function ceilTo50Or90(amount: number): number {
  if (amount <= 0) return 0;
  const cents = Math.ceil(Math.round(amount * 10000) / 100);
  const dollars = Math.floor(cents / 100);
  const rem = cents % 100;
  if (rem === 0) return Number((dollars + 0.5).toFixed(2));
  if (rem <= 50) return Number((dollars + 0.5).toFixed(2));
  if (rem <= 90) return Number((dollars + 0.9).toFixed(2));
  return Number((dollars + 1.5).toFixed(2));
}

function quotePrivateItem(baseNoIva: number, isCombo: boolean) {
  const withIva = baseNoIva * IVA_RATE;
  const qualifiesFreeShipping = isCombo || withIva >= FREE_SHIPPING_THRESHOLD;
  const finalTotal = qualifiesFreeShipping
    ? ceilTo50Or90(withIva + INTERNAL_SHIPPING_MARGIN)
    : ceilTo50Or90(withIva);

  return {
    finalTotal,
    qualifiesFreeShipping,
    shippingBadge: qualifiesFreeShipping
      ? "🚚 ENVÍO GRATIS"
      : "Envío gratis desde $35 USD o llevando el Combo completo",
  };
}

function getRotatingKeys(): string[] {
  const candidates = [
    process.env.NVIDIA_API_KEY,
    process.env.NVIDIA_API_KEY_2,
    process.env.NVIDIA_API_KEY_3,
    process.env.NVIDIA_API_KEY_4,
    process.env.NVIDIA_API_KEY_5,
  ];
  return candidates.map((k) => (k || "").trim()).filter(Boolean);
}

let keyRotationPointer = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = String(body?.message || "").trim();
    const history = Array.isArray(body?.history) ? body.history.slice(-6) : [];

    if (!message) {
      return NextResponse.json(
        { error: "Mensaje vacío" },
        { status: 400 }
      );
    }

    const qLower = message.toLowerCase();
    const tokens = qLower.split(/\s+/).filter((t) => t.length >= 2);
    const catalog = privateCatalog as PrivateCatalogItem[];

    const scored = catalog
      .map((item) => {
        const hay = `${item.sku} ${item.brand} ${item.name} ${item.category}`.toLowerCase();
        let score = tokens.reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
        if (hay.includes("combo")) score += 0.5;
        return { item, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((x) => x.item);

    const contextItems =
      scored.length > 0
        ? scored
        : catalog.filter((i) => i.category === "combos").slice(0, 4);

    const contextText = contextItems
      .map((it) => {
        if (typeof it.base_price_no_iva === "number" && it.base_price_no_iva > 0) {
          const isCombo = it.category === "combos" || it.name.toLowerCase().includes("combo");
          const q = quotePrivateItem(it.base_price_no_iva, isCombo);
          return `- [${it.sku}] ${it.name} (${it.presentation || "Unidad"}) | PVP Final (IVA 15% inc.): $${q.finalTotal.toFixed(2)} USD | ${q.shippingBadge}`;
        }
        return `- [${it.sku}] ${it.name} | Consultar disponibilidad en mostrador`;
      })
      .join("\n");

    const systemPrompt = `Eres Hermes, el Asesor Técnico Automotriz IA 24/7 de LíderPro Pedernales (Ecuador).
REGLAS OBLIGATORIAS:
1. Si el usuario aún no indica marca, modelo y año del vehículo, pídelos brevemente para confirmar compatibilidad exacta.
2. Los precios en el contexto ya tienen +15% IVA y redondeo comercial aplicado. NUNCA menciones costos internos ni precios sin IVA.
3. En cada ¡Combo Cambio MANNOL! o compra >= $35 USD ofrece el regalo oficial: ${GIFT_NAME} y 🚚 ENVÍO GRATIS.
4. En productos menores a $35 USD, indica su precio con IVA y aclara que el envío gratis aplica desde $35 USD o llevando el Combo completo.
5. Cierra invitando al cliente a pulsar uno de los 2 botones de WhatsApp abajo (Línea 1 Matriz Pedernales 0983893231 o Línea 2 Despachos 0967489002).
6. Sé conciso, amable y claro para público adulto en Ecuador.

CATÁLOGO PRIVADO AUTORIZADO (YA CON IVA 15%):
${contextText}`;

    const apiKeys = getRotatingKeys();
    if (apiKeys.length === 0) {
      return NextResponse.json({
        reply:
          "¡Hola! Soy Hermes de LíderPro Pedernales. Indícame la marca, modelo y año de tu vehículo para recomendarte el ¡Combo Cambio MANNOL! exacto con tu regalo (MANNOL 6145 Cockpit Care + Esponja) y Envío Gratis. También puedes elegir cualquiera de nuestras 2 líneas de WhatsApp abajo.",
        fallback: true,
      });
    }

    const startIdx = keyRotationPointer % apiKeys.length;
    keyRotationPointer = (keyRotationPointer + 1) % apiKeys.length;

    for (let i = 0; i < apiKeys.length; i++) {
      const apiKey = apiKeys[(startIdx + i) % apiKeys.length];
      for (const model of [PRIMARY_MODEL, FALLBACK_MODEL]) {
        try {
          const res = await fetch(NVIDIA_ENDPOINT, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: systemPrompt },
                ...history,
                { role: "user", content: message },
              ],
              temperature: 0.35,
              max_tokens: 500,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            const reply = data?.choices?.[0]?.message?.content;
            if (reply) {
              return NextResponse.json({ reply, model });
            }
          }
          if ([401, 402, 403, 429].includes(res.status)) {
            break; // Rotate to next NVIDIA API key
          }
        } catch {
          // Try fallback model or rotate key
        }
      }
    }

    return NextResponse.json({
      reply:
        "¡Hola! Para darte atención inmediata con nuestro equipo técnico en Pedernales, selecciona una de nuestras 2 líneas oficiales de WhatsApp aquí abajo y recibe tu cotización con IVA y regalo de cortesía.",
      fallback: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Error procesando consulta" },
      { status: 500 }
    );
  }
}
