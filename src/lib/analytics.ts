export type AnalyticsEventName =
  | "page_view"
  | "product_view"
  | "vehicle_finder_start"
  | "vehicle_finder_complete"
  | "whatsapp_click"
  | "whatsapp_product"
  | "whatsapp_vehicle"
  | "whatsapp_emergency"
  | "quote_request"
  | "branch_view"
  | "shipping_view"
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

  // Meta Pixel safe trackCustom hook
  const fb = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (typeof fb.fbq === "function") {
    fb.fbq("trackCustom", eventName, payload);
  }
}
