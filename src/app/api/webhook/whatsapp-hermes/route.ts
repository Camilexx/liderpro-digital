import { NextRequest, NextResponse } from "next/server";
import { META_CONFIG } from "@/data/metaConfig";
import { generateHermesReply } from "@/lib/hermesEngine";

// Deduplicación simple en memoria para evitar reintentos duplicados de Meta en instancias cálidas
const processedIds = new Set<string>();

function markProcessed(id: string): boolean {
  if (!id) return true;
  if (processedIds.has(id)) return false;
  processedIds.add(id);
  if (processedIds.size > 1500) {
    const first = processedIds.values().next().value;
    if (first) processedIds.delete(first);
  }
  return true;
}

async function postMetaGraph(path: string, token: string, payload: Record<string, unknown>): Promise<void> {
  if (!token) return;
  try {
    await fetch(`https://graph.facebook.com/${META_CONFIG.graphVersion}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4500),
    });
  } catch {
    // Nunca romper el ACK 200 al webhook de Meta
  }
}

async function sendMetaWhatsAppReply(phoneNumberId: string, to: string, text: string): Promise<void> {
  const token = (process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_TOKEN || "").trim();
  if (!token || !phoneNumberId) return;
  await postMetaGraph(`${phoneNumberId}/messages`, token, {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text },
  });
}

function buildPublicCommentAck(channel: "Instagram" | "Facebook"): string {
  return (
    `¡Hola! Gracias por escribir a LíderPro Pedernales 🚗⚡ ` +
    `Te enviamos por mensaje privado (${channel === "Instagram" ? "DM" : "Messenger"}) la cotización exacta con IVA y stock de bodega. ` +
    `También atendemos 24/7 por WhatsApp: ${META_CONFIG.line247WaLink}`
  );
}

/** Verificación oficial de Webhook Meta Graph API v21.0 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === META_CONFIG.verifyToken && challenge) {
    return new NextResponse(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

interface MetaMessagingEvent {
  sender?: { id?: string };
  recipient?: { id?: string };
  message?: { mid?: string; text?: string; is_echo?: boolean };
}

interface MetaChangeItem {
  field?: string;
  value?: {
    id?: string;
    comment_id?: string;
    item?: string;
    verb?: string;
    text?: string;
    message?: string;
    from?: { id?: string; username?: string; name?: string };
    metadata?: { phone_number_id?: string; display_phone_number?: string };
    messages?: Array<{ id?: string; from?: string; type?: string; text?: { body?: string } }>;
  };
}

interface MetaWebhookEntry {
  id?: string;
  messaging?: MetaMessagingEvent[];
  changes?: MetaChangeItem[];
}

/**
 * Webhook Omnicanal Meta Graph API v21.0:
 *  - object === "whatsapp_business_account": WhatsApp Línea 24/7 (+593 96 748 9002)
 *  - object === "instagram": Instagram DMs + Comentarios (respuesta pública + DM privado)
 *  - object === "page": Facebook Page Messenger + Comentarios en pauta/feed (respuesta pública + Private Reply con wa.me/593967489002)
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      object?: string;
      entry?: MetaWebhookEntry[];
    };

    const objType = (body.object || "whatsapp_business_account").toLowerCase();
    const waToken = (process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_TOKEN || "").trim();
    const igToken = (process.env.IG_ACCESS_TOKEN || waToken).trim();
    const fbToken = (process.env.FB_PAGE_ACCESS_TOKEN || waToken).trim();

    for (const entry of body.entry || []) {
      const entryId = entry.id || "";

      // 1. INSTAGRAM (DMs + Comentarios públicos con DM privado automático)
      if (objType === "instagram") {
        for (const ev of entry.messaging || []) {
          if (ev.message?.is_echo) continue;
          const senderId = ev.sender?.id || "";
          const text = ev.message?.text?.trim() || "";
          if (!senderId || !text) continue;
          if (!markProcessed(`ig_dm:${ev.message?.mid || senderId + text}`)) continue;

          const hermes = await generateHermesReply(text);
          const dmText = `${hermes.reply}\n\n📲 Cierre directo 24/7 por WhatsApp: ${META_CONFIG.line247WaLink}`;
          await postMetaGraph("me/messages", igToken, {
            recipient: { id: senderId },
            message: { text: dmText },
          });
        }

        for (const change of entry.changes || []) {
          if (change.field !== "comments") continue;
          const v = change.value;
          const commentId = v?.id || "";
          const text = (v?.text || "").trim();
          const fromId = v?.from?.id || "";
          if (!commentId || !text || (entryId && fromId === entryId)) continue;
          if (!markProcessed(`ig_comment:${commentId}`)) continue;

          const hermes = await generateHermesReply(text);
          await postMetaGraph(`${commentId}/replies`, igToken, {
            message: buildPublicCommentAck("Instagram"),
          });
          await postMetaGraph("me/messages", igToken, {
            recipient: { comment_id: commentId },
            message: {
              text: `${hermes.reply}\n\n📲 WhatsApp Pedernales 24/7: ${META_CONFIG.line247WaLink}`,
            },
          });
        }
        continue;
      }

      // 2. FACEBOOK PAGE (Messenger + Comentarios en pauta/feed con Private Reply)
      if (objType === "page") {
        for (const ev of entry.messaging || []) {
          if (ev.message?.is_echo) continue;
          const senderId = ev.sender?.id || "";
          const text = ev.message?.text?.trim() || "";
          if (!senderId || !text) continue;
          if (!markProcessed(`fb_dm:${ev.message?.mid || senderId + text}`)) continue;

          const hermes = await generateHermesReply(text);
          const dmText = `${hermes.reply}\n\n📲 Atención directa 24/7: ${META_CONFIG.line247WaLink}`;
          await postMetaGraph("me/messages", fbToken, {
            recipient: { id: senderId },
            message: { text: dmText },
          });
        }

        for (const change of entry.changes || []) {
          if (change.field !== "feed") continue;
          const v = change.value;
          if (v?.item !== "comment" || v?.verb === "remove") continue;
          const commentId = v?.comment_id || v?.id || "";
          const text = (v?.message || v?.text || "").trim();
          const fromId = v?.from?.id || "";
          if (!commentId || !text || (entryId && fromId === entryId)) continue;
          if (!markProcessed(`fb_comment:${commentId}`)) continue;

          const hermes = await generateHermesReply(text);
          await postMetaGraph(`${commentId}/comments`, fbToken, {
            message: buildPublicCommentAck("Facebook"),
          });
          await postMetaGraph("me/messages", fbToken, {
            recipient: { comment_id: commentId },
            message: {
              text: `${hermes.reply}\n\n📲 Pedidos y despachos 24/7 por WhatsApp: ${META_CONFIG.line247WaLink}`,
            },
          });
        }
        continue;
      }

      // 3. WHATSAPP BUSINESS ACCOUNT (Exclusivamente Línea 24/7 +593 96 748 9002 / Phone ID 1496009743586982)
      for (const change of entry.changes || []) {
        const value = change.value;
        const phoneId = (value?.metadata?.phone_number_id || "").trim();
        const displayPhone = (value?.metadata?.display_phone_number || "").replace(/\D/g, "");

        // Regla operativa: Hermes NO opera en Línea 1 (Matriz +593 98 389 3231).
        if (displayPhone.endsWith(META_CONFIG.matrizDigits)) continue;
        if (META_CONFIG.phoneNumberId247 && phoneId && phoneId !== META_CONFIG.phoneNumberId247) continue;

        for (const msg of value?.messages || []) {
          if (msg.type === "text" && msg.from && msg.text?.body) {
            if (msg.id && !markProcessed(`wa:${msg.id}`)) continue;
            const hermes = await generateHermesReply(msg.text.body);
            await sendMetaWhatsAppReply(phoneId || META_CONFIG.phoneNumberId247, msg.from, hermes.reply);
          }
        }
      }
    }

    return NextResponse.json({ status: "ok", object: objType }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "ignored" }, { status: 200 });
  }
}
