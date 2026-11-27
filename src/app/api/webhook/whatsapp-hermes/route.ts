import crypto from "node:crypto";
import { after, NextRequest, NextResponse } from "next/server";
import { META_CONFIG } from "@/data/metaConfig";
import {
  AUDIO_FALLBACK_REPLY_ES,
  downloadMetaWhatsAppMedia,
  isAudioTranscriptionConfigured,
  transcribeAudioBuffer,
} from "@/lib/audioTranscriber";
import { resolveAdContext } from "@/lib/hermesCatalog";
import { claimWebhookMessageId, type AdAttribution } from "@/lib/hermesDb";
import { generateHermesReply } from "@/lib/hermesEngine";
import { handleIncomingPaymentReceipt } from "@/lib/miloPayments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function verifyMetaSignature(rawBody: string, signatureHeader: string | null): boolean {
  const appSecret = (process.env.META_APP_SECRET || "").trim();
  if (!appSecret) return true;
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) return false;

  const providedHex = signatureHeader.slice("sha256=".length).trim();
  if (!/^[0-9a-fA-F]{64}$/.test(providedHex)) return false;

  const expectedHex = crypto
    .createHmac("sha256", appSecret)
    .update(rawBody, "utf8")
    .digest("hex");

  const providedBuf = Buffer.from(providedHex, "hex");
  const expectedBuf = Buffer.from(expectedHex, "hex");
  if (providedBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(providedBuf, expectedBuf);
}

async function postMetaGraph(
  path: string,
  token: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; status: number }> {
  if (!token) {
    console.error("[MiloWebhook] missing_token", { path });
    return { ok: false, status: 0 };
  }
  try {
    const res = await fetch(`https://graph.facebook.com/${META_CONFIG.graphVersion}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      const safeErr = (await res.text().catch(() => "")).slice(0, 300);
      console.error("[MiloWebhook] graph_error", { path, status: res.status, body: safeErr });
      return { ok: false, status: res.status };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    console.error(
      "[MiloWebhook] graph_fetch_exception",
      path,
      err instanceof Error ? err.message : String(err)
    );
    return { ok: false, status: 0 };
  }
}

async function sendMetaWhatsAppReply(
  phoneNumberId: string,
  to: string,
  text: string
): Promise<{ ok: boolean; status: number }> {
  const token = (process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_TOKEN || "").trim();
  if (!token || !phoneNumberId) {
    console.error("[MiloWebhook] missing_wa_credentials", { hasToken: Boolean(token), phoneNumberId });
    return { ok: false, status: 0 };
  }
  return postMetaGraph(`${phoneNumberId}/messages`, token, {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text },
  });
}

async function sendWhatsAppTypingIndicator(
  phoneNumberId: string,
  messageId: string | undefined,
  token: string
): Promise<void> {
  if (!token || !phoneNumberId || !messageId) return;
  try {
    await postMetaGraph(`${phoneNumberId}/messages`, token, {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
      typing_indicator: { type: "text" },
    });
  } catch (err) {
    console.warn(
      "[MiloWebhook] typing_indicator_error",
      err instanceof Error ? err.message : String(err)
    );
  }
}

async function withWhatsAppTypingIndicator<T>(
  phoneNumberId: string,
  messageId: string | undefined,
  token: string,
  work: () => Promise<T>
): Promise<T> {
  if (messageId && token && phoneNumberId) {
    void sendWhatsAppTypingIndicator(phoneNumberId, messageId, token);
  }
  const intervalId =
    messageId && token && phoneNumberId
      ? setInterval(() => {
          void sendWhatsAppTypingIndicator(phoneNumberId, messageId, token);
        }, 10000)
      : null;

  try {
    return await work();
  } finally {
    if (intervalId) clearInterval(intervalId);
  }
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
    messages?: Array<{
      id?: string;
      from?: string;
      type?: string;
      text?: { body?: string };
      interactive?: {
        type?: string;
        button_reply?: { id?: string; title?: string };
        list_reply?: { id?: string; title?: string; description?: string };
      };
      button?: { text?: string; payload?: string };
      referral?: {
        source_url?: string;
        source_id?: string;
        source_type?: string;
        headline?: string;
        body?: string;
        ctwa_clid?: string;
      };
      audio?: { id?: string; mime_type?: string };
      image?: { id?: string; mime_type?: string; caption?: string };
      document?: { id?: string; mime_type?: string; filename?: string; caption?: string };
    }>;
    contacts?: Array<{ wa_id?: string; profile?: { name?: string } }>;
  };
}

type InboundWhatsAppMessage = NonNullable<NonNullable<MetaChangeItem["value"]>["messages"]>[number];

function extractInboundText(msg: InboundWhatsAppMessage): string {
  if (msg.type === "text" && msg.text?.body) {
    return msg.text.body.trim();
  }
  if (msg.type === "interactive") {
    return (
      msg.interactive?.button_reply?.title ||
      msg.interactive?.list_reply?.title ||
      msg.interactive?.button_reply?.id ||
      msg.interactive?.list_reply?.id ||
      ""
    ).trim();
  }
  if (msg.type === "button") {
    return (msg.button?.text || msg.button?.payload || "").trim();
  }
  return "";
}

function extractAdAttribution(msg: InboundWhatsAppMessage, inboundText: string): AdAttribution | null {
  const adId = msg.referral?.source_id?.trim() || null;
  const ctwaClid = msg.referral?.ctwa_clid?.trim() || null;
  const adHeadline = msg.referral?.headline?.trim() || null;
  const adSourceUrl = msg.referral?.source_url?.trim() || null;
  const ctx = resolveAdContext(inboundText, adId, null);
  if (!adId && !ctwaClid && !ctx && !adHeadline) return null;
  return {
    adId: adId ?? ctx?.adIds[0] ?? null,
    adTag: ctx?.adTag ?? null,
    ctwaClid,
    adHeadline,
    adSourceUrl,
  };
}

interface MetaWebhookEntry {
  id?: string;
  messaging?: MetaMessagingEvent[];
  changes?: MetaChangeItem[];
}

/**
 * Webhook Omnicanal Meta Graph API v21.0 con:
 *  - Idempotencia persistente en Postgres (`claimWebhookMessageId`) contra reintentos y ráfagas de Meta
 *  - Respuesta HTTP 200 inmediata + ejecución controlada vía Next.js `after()` para tool calling 120B sin timeouts
 *  - Canales: WhatsApp Línea 24/7 (+593 96 748 9002), Instagram DMs/Comentarios y Facebook Messenger/Comentarios
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signatureHeader = req.headers.get("x-hub-signature-256");
    if (!verifyMetaSignature(rawBody, signatureHeader)) {
      console.warn("[MiloWebhook] invalid_signature", {
        hasSignatureHeader: Boolean(signatureHeader),
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let body: {
      object?: string;
      entry?: MetaWebhookEntry[];
    };
    try {
      body = JSON.parse(rawBody) as {
        object?: string;
        entry?: MetaWebhookEntry[];
      };
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const objType = (body.object || "whatsapp_business_account").toLowerCase();
    const waToken = (process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_TOKEN || "").trim();
    const igToken = (process.env.IG_ACCESS_TOKEN || waToken).trim();
    const fbToken = (process.env.FB_PAGE_ACCESS_TOKEN || waToken).trim();

    const queuedJobs: Array<() => Promise<void>> = [];

    for (const entry of body.entry || []) {
      const entryId = entry.id || "";

      // 1. INSTAGRAM (DMs + Comentarios públicos con DM privado automático)
      if (objType === "instagram") {
        for (const ev of entry.messaging || []) {
          if (ev.message?.is_echo) continue;
          const senderId = ev.sender?.id || "";
          const text = ev.message?.text?.trim() || "";
          if (!senderId || !text) continue;
          const dedupKey = `ig_dm:${ev.message?.mid || `${senderId}:${text.slice(0, 60)}`}`;
          if (!(await claimWebhookMessageId(dedupKey))) continue;

          queuedJobs.push(async () => {
            const hermes = await generateHermesReply(text, [], {
              sessionId: `ig:${senderId}`,
              channel: "instagram",
              timeoutMs: 14000,
            });
            const dmText = `${hermes.reply}\n\n📲 Cierre directo 24/7 por WhatsApp: ${META_CONFIG.line247WaLink}`;
            await postMetaGraph("me/messages", igToken, {
              recipient: { id: senderId },
              message: { text: dmText },
            });
          });
        }

        for (const change of entry.changes || []) {
          if (change.field !== "comments") continue;
          const v = change.value;
          const commentId = v?.id || "";
          const text = (v?.text || "").trim();
          const fromId = v?.from?.id || "";
          if (!commentId || !text || (entryId && fromId === entryId)) continue;
          if (!(await claimWebhookMessageId(`ig_comment:${commentId}`))) continue;

          const username = v?.from?.username || null;
          queuedJobs.push(async () => {
            const hermes = await generateHermesReply(text, [], {
              sessionId: `ig:${fromId || commentId}`,
              channel: "instagram",
              customerName: username,
              timeoutMs: 14000,
            });
            await postMetaGraph(`${commentId}/replies`, igToken, {
              message: buildPublicCommentAck("Instagram"),
            });
            await postMetaGraph("me/messages", igToken, {
              recipient: { comment_id: commentId },
              message: {
                text: `${hermes.reply}\n\n📲 WhatsApp Pedernales 24/7: ${META_CONFIG.line247WaLink}`,
              },
            });
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
          const dedupKey = `fb_dm:${ev.message?.mid || `${senderId}:${text.slice(0, 60)}`}`;
          if (!(await claimWebhookMessageId(dedupKey))) continue;

          queuedJobs.push(async () => {
            const hermes = await generateHermesReply(text, [], {
              sessionId: `fb:${senderId}`,
              channel: "messenger",
              timeoutMs: 14000,
            });
            const dmText = `${hermes.reply}\n\n📲 Atención directa 24/7: ${META_CONFIG.line247WaLink}`;
            await postMetaGraph("me/messages", fbToken, {
              recipient: { id: senderId },
              message: { text: dmText },
            });
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
          if (!(await claimWebhookMessageId(`fb_comment:${commentId}`))) continue;

          const fromName = v?.from?.name || null;
          queuedJobs.push(async () => {
            const hermes = await generateHermesReply(text, [], {
              sessionId: `fb:${fromId || commentId}`,
              channel: "messenger",
              customerName: fromName,
              timeoutMs: 14000,
            });
            await postMetaGraph(`${commentId}/comments`, fbToken, {
              message: buildPublicCommentAck("Facebook"),
            });
            await postMetaGraph("me/messages", fbToken, {
              recipient: { comment_id: commentId },
              message: {
                text: `${hermes.reply}\n\n📲 Pedidos y despachos 24/7 por WhatsApp: ${META_CONFIG.line247WaLink}`,
              },
            });
          });
        }
        continue;
      }

      // 3. WHATSAPP BUSINESS ACCOUNT (Exclusivamente Línea 24/7 +593 96 748 9002 / Phone ID 1496009743586982)
      for (const change of entry.changes || []) {
        const value = change.value;
        const phoneId = (value?.metadata?.phone_number_id || "").trim();
        const displayPhone = (value?.metadata?.display_phone_number || "").replace(/\D/g, "");

        // Regla operativa: Milo NO opera en Línea 1 (Matriz +593 98 389 3231).
        if (displayPhone.endsWith(META_CONFIG.matrizDigits)) continue;
        if (META_CONFIG.phoneNumberId247 && phoneId && phoneId !== META_CONFIG.phoneNumberId247) continue;

        const contactNameByWaId = new Map<string, string>();
        for (const c of value?.contacts || []) {
          if (c.wa_id && c.profile?.name) {
            contactNameByWaId.set(c.wa_id, c.profile.name);
          }
        }

        for (const msg of value?.messages || []) {
          if (!msg.from) continue;
          const from = msg.from;
          const targetPhoneId = phoneId || META_CONFIG.phoneNumberId247;
          const contactName = contactNameByWaId.get(from) || null;

          const textBody = extractInboundText(msg);
          const adAttribution = extractAdAttribution(msg, textBody);

          if (textBody) {
            const dedupKey = msg.id ? `wa:${msg.id}` : `wa_txt:${from}:${textBody.slice(0, 60)}`;
            if (!(await claimWebhookMessageId(dedupKey))) continue;

            queuedJobs.push(async () => {
              await withWhatsAppTypingIndicator(targetPhoneId, msg.id, waToken, async () => {
                const hermes = await generateHermesReply(textBody, [], {
                  sessionId: `wa:${from}`,
                  channel: "whatsapp",
                  customerName: contactName,
                  customerPhone: from,
                  adAttribution,
                  timeoutMs: 11000,
                });
                const sendRes = await sendMetaWhatsAppReply(targetPhoneId, from, hermes.reply);
                console.log("[MiloWebhook] wa_reply_result", {
                  targetPhoneId,
                  toSuffix: from.slice(-4),
                  ok: sendRes.ok,
                  status: sendRes.status,
                  model: hermes.model,
                  usedFallback: hermes.usedFallback,
                });
              });
            });
            continue;
          }

          if (msg.type === "audio") {
            const audioId = msg.audio?.id || "";
            const audioMime = msg.audio?.mime_type || "audio/ogg";
            const dedupKey = msg.id ? `wa:${msg.id}` : `wa_aud:${from}:${audioId}`;
            if (!(await claimWebhookMessageId(dedupKey))) continue;

            queuedJobs.push(async () => {
              await withWhatsAppTypingIndicator(targetPhoneId, msg.id, waToken, async () => {
                let replyText = AUDIO_FALLBACK_REPLY_ES;
                if (audioId && waToken && isAudioTranscriptionConfigured()) {
                  const dl = await downloadMetaWhatsAppMedia(audioId, waToken);
                  if (dl.ok && dl.buffer) {
                    const tr = await transcribeAudioBuffer({
                      buffer: dl.buffer,
                      mimeType: dl.mimeType || audioMime,
                    });
                    if (tr.ok && tr.text) {
                      const hermes = await generateHermesReply(tr.text, [], {
                        sessionId: `wa:${from}`,
                        channel: "whatsapp",
                        customerName: contactName,
                        customerPhone: from,
                        adAttribution,
                        timeoutMs: 11000,
                      });
                      replyText = hermes.reply;
                    }
                  }
                }
                await sendMetaWhatsAppReply(targetPhoneId, from, replyText);
              });
            });
            continue;
          }

          if (msg.type === "image" || msg.type === "document") {
            const mediaId = msg.type === "image" ? msg.image?.id || "" : msg.document?.id || "";
            const filename = msg.type === "document" ? msg.document?.filename || "comprobante.pdf" : "comprobante.jpg";
            const caption = msg.type === "image" ? msg.image?.caption || "" : msg.document?.caption || "";
            const dedupKey = msg.id ? `wa:${msg.id}` : `wa_doc:${from}:${mediaId}`;
            if (!(await claimWebhookMessageId(dedupKey))) continue;

            queuedJobs.push(async () => {
              await withWhatsAppTypingIndicator(targetPhoneId, msg.id, waToken, async () => {
                const receiptRes = await handleIncomingPaymentReceipt({
                  sessionId: `wa:${from}`,
                  channel: "whatsapp",
                  mediaId,
                  filename,
                  caption,
                });
                await sendMetaWhatsAppReply(targetPhoneId, from, receiptRes.reply);
              });
            });
          }
        }
      }
    }

    if (queuedJobs.length > 0) {
      after(async () => {
        const results = await Promise.allSettled(queuedJobs.map((job) => job()));
        for (const res of results) {
          if (res.status === "rejected") {
            console.error(
              "[MiloWebhook] background_job_error",
              res.reason instanceof Error ? res.reason.message : String(res.reason)
            );
          }
        }
      });
    }

    return NextResponse.json({ status: "ok", object: objType, queued: queuedJobs.length }, { status: 200 });
  } catch (err) {
    console.error("[MiloWebhook] route_exception", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ status: "ignored" }, { status: 200 });
  }
}
