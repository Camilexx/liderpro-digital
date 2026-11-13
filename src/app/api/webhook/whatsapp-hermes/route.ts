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
const PRIMARY_MODEL = "nvidia/nemotron-3.5-bolt-e4b";
const FALLBACK_MODEL = "nvidia/nemotron-3-ultra-550b-a55b";

// Deduplicación en memoria de los últimos 200 message.id de WhatsApp para evitar reintentos duplicados de Meta
const PROCESSED_MESSAGE_IDS = new Set<string>();
const CORE_COMBO_SKUS = ["COMBO-MANNOL-1A", "COMBO-MANNOL-2A", "COMBO-MANNOL-3A"];

function markMessageProcessed(messageId: string): boolean {
  if (!messageId) return true;
  if (PROCESSED_MESSAGE_IDS.has(messageId)) return false;
  PROCESSED_MESSAGE_IDS.add(messageId);
  if (PROCESSED_MESSAGE_IDS.size > 200) {
    const oldest = PROCESSED_MESSAGE_IDS.values().next().value;
    if (oldest) PROCESSED_MESSAGE_IDS.delete(oldest);
  }
  return true;
}

function searchCatalogContext(query: string, limit = 6): string {
  const q = query.trim().toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length >= 2);
  const scored: { score: number; item: PrivateCatalogItem }[] = [];

  for (const item of CATALOG) {
    if (item.sku.startsWith("COMBO-")) continue;
    const haystack = `${item.sku || ""} ${item.brand || ""} ${item.name || ""} ${item.category || ""}`.toLowerCase();
    let score = tokens.reduce((acc, t) => (haystack.includes(t) ? acc + 1 : acc), 0);
    if (q && haystack.includes(q)) score += 3;
    if (score > 0) scored.push({ score, item });
  }

  scored.sort((a, b) => b.score - a.score);
  const topProducts = scored.slice(0, limit).map((s) => s.item);
  const coreCombos = CATALOG.filter((c) => CORE_COMBO_SKUS.includes(c.sku));
  const picked = [...topProducts, ...coreCombos];

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
    process.env.NVIDIA_API_KEY_2,
    process.env.NVIDIA_API_KEY_3,
    process.env.NVIDIA_API_KEY_4,
    process.env.NVIDIA_API_KEY,
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
    "Eres Hermes, asesor automotriz IA 24/7 de LíderPro Pedernales (Ecuador) en Línea 2 (+593 96 748 9002).",
    "REGLAS:",
    "1. Responde conciso (máx 4 líneas) para WhatsApp.",
    "2. Pide marca, modelo y año si faltan.",
    "3. Cita SIEMPRE el precio exacto con centavos del contexto (YA incluye IVA 15%; NUNCA redondees ni menciones costos).",
    "4. En ¡Combo Cambio MANNOL! o >= $35 USD incluye regalo MANNOL 6145 Cockpit Care 1L + Esponja y 🚚 Envío Gratis.",
    `\nPRODUCTOS RELEVANTES + COMBOS (IVA 15% INC.):\n${catalogContext}`,
  ].join("\n");

  for (const model of [PRIMARY_MODEL, FALLBACK_MODEL]) {
    for (const apiKey of keys) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7500);
      try {
        const res = await fetch(NVIDIA_ENDPOINT, {
          method: "POST",
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "User-Agent": "LiderPro-Hermes/1.0",
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userText },
            ],
            temperature: 0.15,
            max_tokens: 320,
            chat_template_kwargs: { enable_thinking: false },
          }),
        });
        clearTimeout(timer);
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
            messages?: Array<{ id?: string; from?: string; type?: string; text?: { body?: string } }>;
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
            if (msg.id && !markMessageProcessed(msg.id)) continue;
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
