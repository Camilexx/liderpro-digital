/**
 * Identificadores oficiales de Meta Business / WhatsApp Cloud API / Omnicanal
 * para LíderPro Pedernales (Línea 24/7: +593 96 748 9002).
 * Nota: Los IDs de cuenta y App no son secretos; el Access Token se lee exclusivamente de process.env.
 */
export const META_CONFIG = {
  appId: (process.env.META_APP_ID || "2334120810686388").trim(),
  businessId: (process.env.META_BUSINESS_ID || "1155443773707489").trim(),
  wabaId: (process.env.WHATSAPP_WABA_ID || "1670018878039230").trim(),
  phoneNumberId247: (
    process.env.WHATSAPP_PHONE_NUMBER_ID ||
    process.env.WHATSAPP_PHONE_ID_DESPACHOS ||
    "1496009743586982"
  ).trim(),
  verifyToken: (
    process.env.WHATSAPP_VERIFY_TOKEN || "liderpro_hermes_2026_secure"
  ).trim(),
  graphVersion: "v21.0",
  line247Digits: "593967489002",
  line247Display: "+593 96 748 9002",
  line247WaLink: "https://wa.me/593967489002",
  matrizDigits: "983893231",
} as const;
