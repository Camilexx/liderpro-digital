import { OFFICIAL_BANK_ACCOUNT } from "@/data/businessConfig";
import {
  getCustomer,
  getDbStorageMode,
  getLatestOrderNeedingReceipt,
  insertMessage,
  markOrderReceiptPendingVerification,
  notifyReceiptPendingVerification,
  type ChannelType,
  type OrderRecord,
} from "@/lib/hermesDb";

export interface IncomingReceiptParams {
  sessionId: string;
  channel: ChannelType;
  mediaId?: string | null;
  filename?: string | null;
  caption?: string | null;
  userDisplayText?: string;
}

export interface IncomingReceiptResult {
  handled: boolean;
  reply: string;
  order: OrderRecord | null;
  messageId: number | null;
  notifications?: {
    adminWaSent: boolean;
    counterWaSent: boolean;
    telegramSent: boolean;
  };
  dbStorageMode: "postgres" | "local_fallback";
}

/**
 * Flujo anti-fraude determinístico al recibir un comprobante de transferencia (foto/PDF/simulador):
 * - Jamás confirma el pago ni autoriza despacho/retiro automáticamente.
 * - Cambia la orden a `status = "payment_pending_verification"` y `payment_status = "pending_verification"`.
 * - Dispara doble reporte simultáneo (ADMIN_NOTIFY_PHONE + COUNTER_NOTIFY_PHONE + Telegram).
 */
export async function handleIncomingPaymentReceipt(
  params: IncomingReceiptParams
): Promise<IncomingReceiptResult> {
  const startedAt = Date.now();
  const storageMode = getDbStorageMode();
  const pendingOrder = await getLatestOrderNeedingReceipt(params.sessionId);

  const userLogText =
    params.userDisplayText?.trim() ||
    `[Comprobante adjunto: ${params.filename || params.mediaId || "imagen/PDF"}${
      params.caption ? ` — "${params.caption.slice(0, 120)}"` : ""
    }]`;

  if (!pendingOrder) {
    // No tiene orden abierta esperando comprobante -> guardar mensaje y orientar con honestidad sin inventar pedido
    await insertMessage({
      sessionId: params.sessionId,
      channel: params.channel,
      role: "user",
      content: userLogText,
      intentTag: "comprobante_pendiente_verificacion",
    });

    const customer = await getCustomer(params.sessionId);
    const noOrderReply =
      `¡Recibido${customer?.name ? `, ${customer.name}` : ""}! Veo que enviaste un archivo/comprobante, ` +
      `pero todavía no tengo un pedido por transferencia registrado en este chat.\n\n` +
      `Si ya transferiste a nuestra cuenta oficial de *${OFFICIAL_BANK_ACCOUNT.bank} (${OFFICIAL_BANK_ACCOUNT.accountNumber} — ${OFFICIAL_BANK_ACCOUNT.holderName})*, ` +
      `dime por favor qué productos pediste y tu nombre para ubicar tu pedido y pasarlo a verificación con administración y mostrador (*estado: pendiente por verificar*).`;

    const saved = await insertMessage({
      sessionId: params.sessionId,
      channel: params.channel,
      role: "assistant",
      content: noOrderReply,
      latencyMs: Date.now() - startedAt,
      intentTag: "comprobante_pendiente_verificacion",
    });

    return {
      handled: false,
      reply: noOrderReply,
      order: null,
      messageId: saved.id,
      dbStorageMode: storageMode,
    };
  }

  const refLabel = [params.filename, params.caption, params.mediaId ? `media:${params.mediaId}` : ""]
    .map((s) => (s || "").trim())
    .filter(Boolean)
    .join(" | ") || "Comprobante recibido";

  const updatedOrder =
    (await markOrderReceiptPendingVerification({
      orderId: pendingOrder.id,
      mediaId: params.mediaId ?? null,
      reference: refLabel,
    })) || pendingOrder;

  await insertMessage({
    sessionId: params.sessionId,
    channel: params.channel,
    role: "user",
    content: userLogText,
    intentTag: "comprobante_pendiente_verificacion",
  });

  const notifications = await notifyReceiptPendingVerification(updatedOrder);

  // PROHIBICIÓN ABSOLUTA: Milo NUNCA confirma el pago ni da hora de salida/retiro al recibir el comprobante
  const strictReply =
    `⏳ ¡Gracias${updatedOrder.customerName ? `, ${updatedOrder.customerName}` : ""}! ` +
    `Recibimos el comprobante de tu *Pedido #${updatedOrder.id}* (*$${updatedOrder.totalUsd.toFixed(2)}* con IVA) ` +
    `y ya fue enviado a revisión con administración y mostrador (*estado: pendiente por verificar*).\n\n` +
    `Por seguridad, no se autoriza el despacho ni el retiro hasta confirmar la acreditación real del pago. ` +
    `Apenas sea aprobado, te enviaremos por este mismo chat todos los detalles de tu entrega o retiro en local.`;

  const savedReply = await insertMessage({
    sessionId: params.sessionId,
    channel: params.channel,
    role: "assistant",
    content: strictReply,
    skusUsed: updatedOrder.itemsJson.map((i) => i.sku),
    quotedTotalUsd: updatedOrder.totalUsd,
    latencyMs: Date.now() - startedAt,
    intentTag: "comprobante_pendiente_verificacion",
  });

  return {
    handled: true,
    reply: strictReply,
    order: updatedOrder,
    messageId: savedReply.id,
    notifications,
    dbStorageMode: storageMode,
  };
}
