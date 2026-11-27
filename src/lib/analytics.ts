export type AnalyticsEventName =
  | "page_view"
  | "product_view"
  | "vehicle_finder_start"
  | "vehicle_finder_complete"
  | "whatsapp_click"
  | "whatsapp_selector_open"
  | "whatsapp_product"
  | "whatsapp_vehicle"
  | "whatsapp_emergency"
  | "quote_request"
  | "branch_view"
  | "shipping_view"
  | "shipping_city_select"
  | "shipping_province_select"
  | "shipping_region_filter"
  | "shipping_product_type_select"
  | "shipping_whatsapp_click"
  | "shipping_whatsapp_calc_click"
  | "b2b_view"
  | "b2b_whatsapp_click"
  | "b2b_calculator_use"
  | "call_click"
  | "whatsapp_product_detail"
  | "select_variant"
  | "basket_add"
  | "basket_view"
  | "basket_whatsapp_quote"
  | "add_mannol_combo"
  | "whatsapp_mannol_combo"
  | "purchase"
  | "lead_created";

export interface AnalyticsPayload {
  [key: string]: unknown;
}

export function trackEvent(eventName: AnalyticsEventName, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;

  // Log in development for audit & verification
  if (process.env.NODE_ENV !== "production") {
    // Development audit log
    // console.log(`[LiderPro Analytics] ${eventName}:`, payload);
  }

  // Google Analytics 4 (gtag.js) safe hook
  if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", eventName, payload);
  }

  // Google Tag Manager dataLayer safe push
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({
      event: eventName,
      ...payload,
      timestamp: new Date().toISOString(),
    });
  }

  // Meta Pixel safe standard + custom events with deterministic eventID for CAPI dedup
  const fb = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (typeof fb.fbq === "function") {
    const eventId = `lp_${eventName}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    fb.fbq("trackCustom", eventName, payload, { eventID: eventId });

    if (eventName === "product_view") {
      fb.fbq(
        "track",
        "ViewContent",
        {
          content_name: String(payload.item || payload.content_name || "Producto LiderPro"),
          content_category: String(payload.category || payload.content_category || "Automotriz"),
          content_ids: payload.sku ? [String(payload.sku)] : undefined,
          value: typeof payload.price === "number" ? payload.price : undefined,
          currency: "USD",
        },
        { eventID: `${eventId}_vc` }
      );
    }

    const contactLeadEvents = new Set<AnalyticsEventName>([
      "whatsapp_click",
      "whatsapp_product",
      "whatsapp_vehicle",
      "whatsapp_emergency",
      "whatsapp_product_detail",
      "whatsapp_mannol_combo",
      "shipping_whatsapp_click",
      "shipping_whatsapp_calc_click",
      "b2b_whatsapp_click",
      "basket_whatsapp_quote",
      "quote_request",
      "lead_created",
      "call_click",
    ]);
    if (contactLeadEvents.has(eventName)) {
      const stdPayload = {
        content_name: String(payload.item || payload.location || eventName),
        content_category: String(payload.line || payload.category || "WhatsApp_LiderPro"),
        currency: "USD",
      };
      fb.fbq("track", "Contact", stdPayload, { eventID: `${eventId}_ct` });
      fb.fbq("track", "Lead", stdPayload, { eventID: `${eventId}_ld` });
    }
  }
}
