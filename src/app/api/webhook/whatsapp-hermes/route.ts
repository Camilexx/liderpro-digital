import { NextRequest, NextResponse } from "next/server";
import privateCatalog from "@/data/privatePricing.server.json";

export const runtime = "nodejs";

interface PrivateCatalogItem {
  sku: string;
  brand?: string;
  category?: string;
  name?: string;
  presentation?: string;
  base_price_no_iva?: number;
  quoted_pvp_iva?: number;
}

const CATALOG = privateCatalog as PrivateCatalogItem[];
const NVIDIA_ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";
const PRIMARY_MODEL = "nvidia/nemotron-3-ultra-550b-a55b";
const FALLBACK_MODEL = "nvidia/nemotron-3.5-lightning-30b-a3b";

function searchCatalogContext(query: string, limit = 6): string {
  const q = query.trim().toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length >= 2);
  const scored: { score: number; item: PrivateCatalogItem }[] = [];

  for (const item of CATALOG) {
    const haystack = `${item.sku || ""} ${item.brand || ""} ${item.name || ""} ${item.category || ""}`.toLowerCase();
    let score = tokens.reduce((acc, t) => (haystack.includes(t) ? acc + 1 : acc), 0);
    if (q && haystack.includes(q)) score += 3;
    if (score > 0) scored.push({ score, item });
  }

  scored.sort((a, b) => b.score - a.score);
  const picked =
    scored.length > 0
      ? scored.slice(0, limit).map((s) => s.item)
      : CATALOG.filter((c) => c.sku.startsWith("COMBO-MANNOL-")).slice(0, 4);

  return picked
    .map((m) => {
      const pvp =
        typeof m.quoted_pvp_iva === "number"
          ? `$${m.quoted_pvp_iva.toFixed(2)} USD (IVA inc.)`
          : "Consultar en mostrador";
      return `- [${m.sku}] ${m.name || ""} (${m.presentation || ""}) | PVP Final: ${pvp}`;
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

async function generateHermesReply(userText: string): Promise<string> {
  const keys = getNvidiaKeys();
  const catalogContext = searchCatalogContext(userText);

  if (keys.length === 0) {
    return (
      "¡Hola! Soy Hermes de LíderPro Pedernales (Atención 24/7). " +
      "Indícame la marca, modelo y año de tu vehículo para recomendarte el ¡Combo Cambio MANNOL! " +
      "con regalo de cortesía (MANNOL 6145 Cockpit Care + Esponja) y Envío Gratis."
    );
  }

  const systemPrompt = [
    "Eres Hermes, el Asesor Técnico Automotriz IA 24/7 oficial de LíderPro Pedernales (Ecuador) en la Línea 2 (+593 96 748 9002).",
    "REGLAS ESTRICTAS:",
    "1. Si el cliente no ha indicado marca, modelo y año de su vehículo, pídelos amablemente.",
    "2. Recomienda exactamente los productos existentes del catálogo (MANNOL, Advance, Baterías Ecuador, Bosch).",
    "3. Los precios en el contexto YA incluyen IVA 15% y redondeo comercial. NUNCA menciones costos ni precios sin IVA.",
    "4. En ¡Combo Cambio MANNOL! o compras >= $35 USD, incluye regalo MANNOL 6145 Cockpit Care 1L + Esponja y Envío Gratis.",
    "5. Responde de forma concisa, clara y profesional para WhatsApp.",
    `\nCONTEXTO INTERNO DE CATÁLOGO (YA CON IVA 15%):\n${catalogContext}`,
  ].join("\n");

  for (const model of [PRIMARY_MODEL, FALLBACK_MODEL]) {
    for (const apiKey of keys) {
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
              { role: "user", content: userText },
            ],
            temperature: 0.15,
            max_tokens: 900,
            chat_template_kwargs: { enable_thinking: false },
          }),
        });
        if (!res.ok) continue;
        const data = (await res.json()) as {
          choices?: { message?: { content?: string; reasoning_content?: string } }[];
        };
        const content = (
          data.choices?.[0]?.message?.content ||
          data.choices?.[0]?.message?.reasoning_content ||
          ""
        ).trim();
        if (content) return content;
      } catch {
        continue;
      }
    }
  }

  return (
    "¡Hola! Recibimos tu mensaje en nuestra Línea 24/7 de LíderPro Pedernales. " +
    "Compártenos marca, modelo y año de tu vehículo para enviarte tu cotización inmediata."
  );
}

async function sendMetaWhatsAppReply(
  phoneNumberId: string,
  to: string,
  text: string
): Promise<void> {
  const token = (process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_TOKEN || "").trim();
  if (!token || !phoneNumberId) return;

  await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    }),
  });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge") || "";
  const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN || "liderpro_hermes_2026_secure";

  if (mode === "subscribe" && token === expectedToken) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      entry?: Array<{
        changes?: Array<{
          value?: {
            metadata?: { phone_number_id?: string; display_phone_number?: string };
            messages?: Array<{ from?: string; type?: string; text?: { body?: string } }>;
          };
        }>;
      }>;
    };

    const configured247Id = (
      process.env.WHATSAPP_PHONE_NUMBER_ID ||
      process.env.WHATSAPP_PHONE_ID_DESPACHOS ||
      ""
    ).trim();

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value;
        const phoneId = value?.metadata?.phone_number_id || "";
        const displayPhone = (value?.metadata?.display_phone_number || "").replace(/\D/g, "");

        // Regla operativa: Hermes NO opera en Línea 1 (Matriz +593 98 389 3231).
        if (displayPhone.endsWith("983893231")) continue;
        if (configured247Id && phoneId && phoneId !== configured247Id) continue;

        for (const msg of value?.messages || []) {
          if (msg.type === "text" && msg.from && msg.text?.body) {
            const reply = await generateHermesReply(msg.text.body);
            await sendMetaWhatsAppReply(phoneId || configured247Id, msg.from, reply);
          }
        }
      }
    }

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "ignored" }, { status: 200 });
  }
}
