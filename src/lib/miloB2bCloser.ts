/**
 * MILO B2B Closer — Motor determinístico anti-trabas, pre-cierre real con catálogo
 * y escalamiento verificado (Orden Ejecutiva #66-MILO-B2B-CLOSER).
 *
 * Sin dependencias de Next.js: 100% testeable directamente con `node --test`.
 *
 * Implementa las 5 reglas duras:
 *  1. Higienización de Nombre Humano (`sanitizeCustomerName` + `buildWarmEcuadorianGreeting`)
 *  2. Investigación Previa Obligatoria en Catálogo + aritmética exacta en centavos (`parseBulkCanecaOrder` + `quoteBulkCanecaOrderFromCatalog`)
 *  3. Respuesta Humana Pre-Cierre en Vivo (`buildLiveBulkPreCloseReply`)
 *  4. Escalamiento Verificado y Honesto a Telegram/WhatsApp (`buildVerifiedEscalationPayload` + `formatVerifiedEscalationAlert`)
 *  5. Des-trabe Conversacional Anti-Loop post-escalamiento (`processPostEscalationPartialData`)
 */

export interface BulkCatalogSku {
  sku: string;
  name: string;
  brand?: string;
  presentation?: string;
  quoted_pvp_iva?: number;
  priceIva?: number;
}

export interface ParsedBulkItem {
  qty: number;
  specKey: string; // e.g. "15W-40", "10W-40", "ISO-68"
  specLabel: string; // e.g. "15W-40 (20L)"
  brandHint: string | null;
  containerType: "caneca_20l" | "tambor_55gl";
}

export interface ParsedBulkOrder {
  totalUnits: number;
  containerType: "caneca_20l" | "tambor_55gl";
  brandHint: string | null;
  soloAceite: boolean;
  items: ParsedBulkItem[];
}

export interface BulkQuoteLine {
  sku: string;
  name: string;
  brand: string;
  specKey: string;
  specLabel: string;
  qty: number;
  unitPriceIva: number;
  lineSubtotalUsd: number;
  formattedLine: string;
}

export interface BulkCatalogQuote {
  totalUnits: number;
  containerType: "caneca_20l" | "tambor_55gl";
  lines: BulkQuoteLine[];
  unmatchedSpecs: string[];
  subtotalUsd: number;
  compactLabel: string; // e.g. "4 × 15W-40 (20L) + 1 × 10W-40 (20L)"
  arithmeticBreakdown: string; // e.g. "4 × $125.00 + 1 × $128.50 = $628.50"
}

export interface EscalationContextSnapshot {
  confirmedLines: BulkQuoteLine[];
  confirmedSummary: string;
  confirmedSubtotalUsd: number | null;
  clientMentionedFilters: boolean;
  askedMissingFields: string[];
  collectedFields: Record<string, string>;
  postEscalationReplyCount: number;
  lastRefreshedAt?: string | null;
  lastHumanInterventionAt?: string | null;
}

export interface VerifiedEscalationPayload {
  reason: string;
  urgency: "alta" | "media" | "baja";
  confirmedByClient: string;
  missingFieldsAsked: string;
  missingFieldKeys: string[];
  suggestedReply: string;
  howToHandle: string;
  actionNeeded: string;
  shortClientLabel: string;
  clientMentionedFilters: boolean;
}

export interface PostEscalationUpdateResult {
  hasNewData: boolean;
  newFieldKeys: string[];
  updatedCity: string | null;
  updatedName: string | null;
  updatedRuc: string | null;
  updatedVehicleText: string | null;
  clientMentionedFilters: boolean;
  remainingMissingKeys: string[];
  shouldReplyToClient: boolean;
  clientAckReply: string | null;
  updatedContext: EscalationContextSnapshot;
  updatedEscalation: VerifiedEscalationPayload;
}

/** Catálogo canónico de respaldo (espejo exacto de src/data/privatePricing.server.json). */
export const CANONICAL_BULK_CATALOG_FALLBACK: BulkCatalogSku[] = [
  {
    sku: "COMBO-MANNOL-3A",
    name: "MANNOL TS-4 15W-40 (Caneca 20L)",
    brand: "MANNOL",
    presentation: "Caneca 20L + Filtro + MANNOL 6145 + Esponja",
    quoted_pvp_iva: 125.0,
  },
  {
    sku: "COMBO-MANNOL-3B",
    name: "MANNOL TS-5 UHPD 10W-40 (Caneca 20L)",
    brand: "MANNOL",
    presentation: "Caneca 20L + Filtro + MANNOL 6145 + Esponja",
    quoted_pvp_iva: 128.5,
  },
  {
    sku: "LP-LUR-038",
    name: "MANNOL TS-5 UHPD 10W-40 (Caneca 5 GL)",
    brand: "MANNOL",
    presentation: "Caneca 5 GL",
    quoted_pvp_iva: 121.0,
  },
  {
    sku: "COMBO-MANNOL-3C",
    name: "MANNOL Hydro HV ISO 68 (Caneca 20L)",
    brand: "MANNOL",
    presentation: "Caneca 20L + Complemento + MANNOL 6145 + Esponja",
    quoted_pvp_iva: 106.5,
  },
  {
    sku: "LP-LUR-039",
    name: "MANNOL Hydro HV ISO 68 (Caneca 5 GL)",
    brand: "MANNOL",
    presentation: "Caneca 5 GL",
    quoted_pvp_iva: 100.0,
  },
  {
    sku: "LP-LUR-035",
    name: "MANNOL Hydro HV ISO 46 Longlife (Caneca 5 GL)",
    brand: "MANNOL",
    presentation: "Caneca 5 GL",
    quoted_pvp_iva: 100.0,
  },
  {
    sku: "LP-LUR-034",
    name: "MANNOL Hydro HV ISO 32 Longlife (Caneca 5 GL)",
    brand: "MANNOL",
    presentation: "Caneca 5 GL",
    quoted_pvp_iva: 100.0,
  },
  {
    sku: "LP-LUR-036",
    name: "MANNOL Multifarm STOU 10W-30 (Caneca 5 GL)",
    brand: "MANNOL",
    presentation: "Caneca 5 GL",
    quoted_pvp_iva: 116.5,
  },
  {
    sku: "012MN8107-20",
    name: "MANNOL Universal Getriebeoel 80W-90 GL-4 (Caneca 5 GL)",
    brand: "MANNOL",
    presentation: "Caneca 5 GL",
    quoted_pvp_iva: 103.9,
  },
  {
    sku: "012MN8105-20",
    name: "MANNOL Hypoid LSD 85W-140 GL-5 (Caneca 5 GL)",
    brand: "MANNOL",
    presentation: "Caneca 5 GL",
    quoted_pvp_iva: 128.9,
  },
  {
    sku: "015MD5-15W40",
    name: "MOBIL Delvac MX 15W-40 (Caneca 5 GL)",
    brand: "MOBIL",
    presentation: "Caneca 5 GL",
    quoted_pvp_iva: 108.5,
  },
  {
    sku: "0368AR10003",
    name: "AROIL 15W-40 CI-4 (Caneca 5 GL)",
    brand: "AROIL",
    presentation: "Caneca 5 GL",
    quoted_pvp_iva: 72.0,
  },
];

function normalizeAscii(value: string): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function roundUsd(cents: number): number {
  return Math.round(cents) / 100;
}

function formatUsd(val: number): string {
  return `$${val.toFixed(2)}`;
}

// ---------------------------------------------------------------------------
// REGLA 1 — HIGIENIZACIÓN DE NOMBRE HUMANO
// ---------------------------------------------------------------------------

const GENERIC_NON_NAMES = new Set([
  "sin nombre",
  "sin nombre confirmado",
  "desconocido",
  "cliente",
  "usuario",
  "whatsapp",
  "unknown",
  "null",
  "undefined",
  "none",
  "admin",
  "test",
  "hola",
  "buenas",
  "info",
  "precio",
  "user",
  "guest",
  "anon",
]);

const CODE_PREFIX_REGEX = /^(?:ad|user|usr|lead|cli|client|cust|wa|ig|fb|id|test|bot|anon|guest|sku|ord)[-_:.]/i;
const HEX_HASH_REGEX = /^[a-f0-9]{6,}$/i;

/**
 * Valida y limpia el nombre del cliente para uso como vocativo humano.
 * Retorna `null` si está vacío, coincide con hex/hash (`^[a-f0-9]{6,}$`),
 * contiene dígitos/guiones de código (`AD-`, `user_`, teléfono) o tiene < 2 letras reales.
 */
export function sanitizeCustomerName(rawName: string | null | undefined): string | null {
  if (typeof rawName !== "string") return null;
  const trimmed = rawName.trim();
  if (!trimmed || trimmed.length > 48) return null;

  const lowered = normalizeAscii(trimmed);
  if (GENERIC_NON_NAMES.has(lowered)) return null;

  // Rechazar URLs, handles, correos, teléfonos o códigos con dígitos/underscores
  if (/@|https?:\/\/|\.com\b|\.ec\b|_/i.test(trimmed)) return null;
  if (HEX_HASH_REGEX.test(trimmed.replace(/\s+/g, ""))) return null;
  if (CODE_PREFIX_REGEX.test(trimmed)) return null;
  if (/\d/.test(trimmed)) return null;

  // Quitar emojis / símbolos sueltos conservando letras latinas, espacios, apóstrofes y guiones de nombre compuesto
  const cleaned = trimmed
    .replace(/[^\p{L}\s'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return null;

  // Rechazar guiones tipo código (ej. "A-B", "-algo", "algo-")
  if (/^-|-$|--/.test(cleaned)) return null;
  if (cleaned.includes("-")) {
    const parts = cleaned.split("-").map((p) => p.trim());
    if (parts.some((p) => p.length < 2)) return null;
  }

  const lettersOnly = cleaned.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, "");
  if (lettersOnly.length < 2) return null;

  if (GENERIC_NON_NAMES.has(normalizeAscii(cleaned))) return null;

  // Si viene TODO EN MAYÚSCULAS (ej. "JUAN AVILES"), convertir a Title Case natural
  if (cleaned === cleaned.toUpperCase() && cleaned !== cleaned.toLowerCase()) {
    return cleaned
      .split(" ")
      .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
      .join(" ");
  }

  return cleaned;
}

/**
 * Construye saludo cálido ecuatoriano sin jamás usar hashes/códigos como vocativo.
 */
export function buildWarmEcuadorianGreeting(rawName?: string | null): string {
  const safe = sanitizeCustomerName(rawName);
  if (!safe) return "¡Hola! Qué gusto saludarte";
  const firstWord = safe.split(" ")[0] || safe;
  return `¡Hola ${firstWord}! Qué gusto saludarte`;
}

// ---------------------------------------------------------------------------
// REGLA 2 — PARSER ROBUSTO Y COTIZADOR DETERMINÍSTICO DE CANECAS / TAMBORES
// ---------------------------------------------------------------------------

/**
 * Normaliza errores típicos de tipeo en WhatsApp:
 * - "4 de 15w401 de 10w40" -> "4 de 15w-40 1 de 10w-40"
 * - "16w40" -> "15w-40"
 * - "15w40" -> "15w-40", "10w40" -> "10w-40", "80w90" -> "80w-90"
 */
export function normalizeBulkOrderText(raw: string): string {
  let s = normalizeAscii(raw);
  // Separar dígito pegado justo después de la viscosidad: "15w401" -> "15w-40 1"
  s = s.replace(/\b(0|5|10|15|16|20|25|75|80|85)\s*w[-\s]?(20|30|40|50|60|85|90|140)(\d{1,2})\b/g, "$1w-$2 $3");
  // Corregir typo frecuente "16w-40" -> "15w-40"
  s = s.replace(/\b16\s*w[-\s]?40\b/g, "15w-40");
  // Estandarizar viscosidades SAE
  s = s.replace(/\b(0|5|10|15|20|25|75|80|85)\s*w[-\s]?(20|30|40|50|60|85|90|140)\b/g, "$1w-$2");
  // Estandarizar ISO hidráulico
  s = s.replace(/\b(?:hidraulic[oa]\s+)?iso[-\s]?(32|46|68)\b/g, "iso-$1");
  return s.replace(/\s+/g, " ").trim();
}

const SPEC_PATTERNS: Array<{ specKey: string; label: string; tokenRegex: RegExp }> = [
  { specKey: "15W-40", label: "15W-40", tokenRegex: /\b15w-40\b/g },
  { specKey: "10W-40", label: "10W-40", tokenRegex: /\b10w-40\b/g },
  { specKey: "10W-30", label: "10W-30", tokenRegex: /\b10w-30\b/g },
  { specKey: "80W-90", label: "80W-90", tokenRegex: /\b80w-90\b/g },
  { specKey: "85W-140", label: "85W-140", tokenRegex: /\b85w-140\b/g },
  { specKey: "ISO-68", label: "ISO 68", tokenRegex: /\biso-68\b/g },
  { specKey: "ISO-46", label: "ISO 46", tokenRegex: /\biso-46\b/g },
  { specKey: "ISO-32", label: "ISO 32", tokenRegex: /\biso-32\b/g },
];

function detectBrandHint(normText: string): string | null {
  if (/\bmobil\b|\bdelvac\b/.test(normText)) return "MOBIL";
  if (/\baroil\b/.test(normText)) return "AROIL";
  if (/\bmannol\b/.test(normText)) return "MANNOL";
  return null;
}

export function parseBulkCanecaOrder(rawText: string, historyUserTexts: string[] = []): ParsedBulkOrder | null {
  const norm = normalizeBulkOrderText(rawText);
  const combinedHistory = normalizeBulkOrderText([...historyUserTexts.slice(-6), rawText].join(" "));

  const mentionsCanecaNow = /\b(canecas?|baldes?|20\s*l(?:itros?)?|5\s*g(?:al(?:ones?)?|l))\b/.test(norm);
  const mentionsTamborNow = /\b(tambores?|55\s*g(?:al(?:ones?)?|l))\b/.test(norm);
  const mentionsBulkInHistory = /\b(canecas?|baldes?|tambores?|20\s*l(?:itros?)?|5\s*g(?:al(?:ones?)?|l))\b/.test(combinedHistory);

  if (!mentionsCanecaNow && !mentionsTamborNow && !mentionsBulkInHistory) {
    return null;
  }

  const containerType: "caneca_20l" | "tambor_55gl" = mentionsTamborNow && !mentionsCanecaNow ? "tambor_55gl" : "caneca_20l";
  const unitSuffix = containerType === "tambor_55gl" ? "Tambor 55 GL" : "20L";
  const brandHint = detectBrandHint(norm) || detectBrandHint(combinedHistory);
  const soloAceite = /\bsolo\s+(?:el\s+)?aceite\b|\bsin\s+filtro\b/.test(norm);

  // Quitar encabezado total si precede al desglose: "5 canecas: 4 de 15w-40 y 1 de 10w-40"
  let headerTotal = 0;
  const headerMatch = norm.match(/\b(\d{1,3})\s*(?:canecas?|baldes?|tambores?)\b/);
  if (headerMatch) {
    headerTotal = Number(headerMatch[1]);
  }

  // Extraer pares (cantidad, especificación) explícitos:
  // Soporta: "4 de 15w-40", "4 15w-40", "4x 15w-40", "4 canecas de 15w-40", "1 de 10w-40"
  const pairRegex =
    /\b(\d{1,3})\s*(?:x\s*|×\s*)?(?:(?:canecas?|baldes?|tambores?|unidades?)\s*)?(?:de\s+)?(?:(?:aceite|mannol|mobil|aroil|hidraulico)\s+)*?(15w-40|10w-40|10w-30|80w-90|85w-140|iso-68|iso-46|iso-32)\b/g;

  const qtyBySpec = new Map<string, number>();
  const specOrder: string[] = [];

  // Para evitar que "5 canecas 4 de 15w-40" capture "5 ... 15w-40", eliminamos el prefijo "<N> canecas" si luego hay otro número antes de la viscosidad
  const bodyForPairs = norm.replace(
    /\b\d{1,3}\s*(?:canecas?|baldes?|tambores?)\s*(?:[:,-]|mezcladas?)?\s*(?=\d{1,3}\s*(?:x|×|de\s+)?(?:(?:canecas?|baldes?|tambores?)\s*)?(?:de\s+)?(?:15w-40|10w-40|10w-30|80w-90|85w-140|iso-68|iso-46|iso-32)\b)/g,
    ""
  );

  let m: RegExpExecArray | null;
  while ((m = pairRegex.exec(bodyForPairs)) !== null) {
    const qty = Number(m[1]);
    const rawSpec = m[2].toUpperCase();
    if (!Number.isFinite(qty) || qty <= 0) continue;
    if (!qtyBySpec.has(rawSpec)) specOrder.push(rawSpec);
    qtyBySpec.set(rawSpec, (qtyBySpec.get(rawSpec) || 0) + qty);
  }

  // Caso: "15w-40: 4 canecas" (especificación antes que cantidad)
  if (specOrder.length === 0) {
    const revRegex =
      /\b(15w-40|10w-40|10w-30|80w-90|85w-140|iso-68|iso-46|iso-32)\s*(?:[:=-]|\s+de|\s+x|\s+)\s*(\d{1,3})\b/g;
    while ((m = revRegex.exec(bodyForPairs)) !== null) {
      const rawSpec = m[1].toUpperCase();
      const qty = Number(m[2]);
      if (!Number.isFinite(qty) || qty <= 0) continue;
      if (!qtyBySpec.has(rawSpec)) specOrder.push(rawSpec);
      qtyBySpec.set(rawSpec, (qtyBySpec.get(rawSpec) || 0) + qty);
    }
  }

  // Caso: "<N> canecas" en este turno y una única viscosidad mencionada en el mismo mensaje o historial reciente
  if (specOrder.length === 0 && headerTotal > 0) {
    const foundSpecsNow = SPEC_PATTERNS.filter((sp) => new RegExp(sp.tokenRegex.source).test(norm));
    const foundSpecsHist =
      foundSpecsNow.length > 0
        ? foundSpecsNow
        : SPEC_PATTERNS.filter((sp) => new RegExp(sp.tokenRegex.source).test(combinedHistory));
    if (foundSpecsHist.length === 1) {
      const only = foundSpecsHist[0];
      specOrder.push(only.specKey);
      qtyBySpec.set(only.specKey, headerTotal);
    }
  }

  if (specOrder.length === 0) return null;

  const items: ParsedBulkItem[] = specOrder.map((specKey) => {
    const meta = SPEC_PATTERNS.find((p) => p.specKey === specKey);
    const labelBase = meta ? meta.label : specKey;
    return {
      qty: qtyBySpec.get(specKey) || 1,
      specKey,
      specLabel: `${labelBase} (${unitSuffix})`,
      brandHint,
      containerType,
    };
  });

  const sumItems = items.reduce((acc, i) => acc + i.qty, 0);
  const totalUnits = Math.max(sumItems, headerTotal === sumItems ? headerTotal : sumItems);

  return {
    totalUnits,
    containerType,
    brandHint,
    soloAceite,
    items,
  };
}

function getCatalogUnitPrice(entry: BulkCatalogSku): number {
  const raw = typeof entry.quoted_pvp_iva === "number" ? entry.quoted_pvp_iva : entry.priceIva ?? 0;
  return Number(Number(raw).toFixed(2));
}

function resolveCatalogSkuForBulkItem(
  item: ParsedBulkItem,
  catalog: BulkCatalogSku[],
  opts: { soloAceite?: boolean; defaultBrand?: string }
): BulkCatalogSku | null {
  if (item.containerType === "tambor_55gl") {
    // Tambores 55 GL no están en el catálogo de canecas 20L -> retornar null para reportar honestamente
    return null;
  }

  const brand = (item.brandHint || opts.defaultBrand || "MANNOL").toUpperCase();
  const findBySku = (sku: string): BulkCatalogSku | undefined =>
    catalog.find((c) => c.sku.toUpperCase() === sku.toUpperCase());

  if (item.specKey === "15W-40") {
    if (brand === "MOBIL") return findBySku("015MD5-15W40") || null;
    if (brand === "AROIL") return findBySku("0368AR10003") || null;
    return findBySku("COMBO-MANNOL-3A") || findBySku("015MD5-15W40") || null;
  }
  if (item.specKey === "10W-40") {
    if (opts.soloAceite) {
      return findBySku("LP-LUR-038") || findBySku("COMBO-MANNOL-3B") || null;
    }
    return findBySku("COMBO-MANNOL-3B") || findBySku("LP-LUR-038") || null;
  }
  if (item.specKey === "ISO-68") {
    if (opts.soloAceite) {
      return findBySku("LP-LUR-039") || findBySku("COMBO-MANNOL-3C") || null;
    }
    return findBySku("COMBO-MANNOL-3C") || findBySku("LP-LUR-039") || null;
  }
  if (item.specKey === "ISO-46") return findBySku("LP-LUR-035") || null;
  if (item.specKey === "ISO-32") return findBySku("LP-LUR-034") || null;
  if (item.specKey === "10W-30") return findBySku("LP-LUR-036") || null;
  if (item.specKey === "80W-90") return findBySku("012MN8107-20") || null;
  if (item.specKey === "85W-140") return findBySku("012MN8105-20") || null;

  return null;
}

/**
 * Busca en el catálogo real los SKUs vigentes y calcula aritméticamente en código
 * (centavos enteros, cero alucinación LLM) cada línea y el subtotal exacto c/IVA.
 */
export function quoteBulkCanecaOrderFromCatalog(
  rawText: string,
  catalogEntries?: BulkCatalogSku[],
  opts?: { historyUserTexts?: string[]; defaultBrand?: string }
): BulkCatalogQuote | null {
  const parsed = parseBulkCanecaOrder(rawText, opts?.historyUserTexts || []);
  if (!parsed) return null;

  const catalog = catalogEntries && catalogEntries.length > 0 ? catalogEntries : CANONICAL_BULK_CATALOG_FALLBACK;
  const lines: BulkQuoteLine[] = [];
  const unmatchedSpecs: string[] = [];
  let subtotalCents = 0;

  for (const item of parsed.items) {
    const matched = resolveCatalogSkuForBulkItem(item, catalog, {
      soloAceite: parsed.soloAceite,
      defaultBrand: opts?.defaultBrand || "MANNOL",
    });
    if (!matched) {
      unmatchedSpecs.push(`${item.qty} × ${item.specLabel}`);
      continue;
    }
    const unitPriceIva = getCatalogUnitPrice(matched);
    const unitCents = Math.round(unitPriceIva * 100);
    const lineCents = unitCents * item.qty;
    subtotalCents += lineCents;
    const lineSubtotalUsd = roundUsd(lineCents);
    const brand = (matched.brand || "MANNOL").toUpperCase();
    const shortName = `${brand} ${item.specLabel}`;

    lines.push({
      sku: matched.sku,
      name: matched.name,
      brand,
      specKey: item.specKey,
      specLabel: item.specLabel,
      qty: item.qty,
      unitPriceIva,
      lineSubtotalUsd,
      formattedLine: `${item.qty} × ${shortName} × ${formatUsd(unitPriceIva)} = ${formatUsd(lineSubtotalUsd)}`,
    });
  }

  if (lines.length === 0) return null;

  const subtotalUsd = roundUsd(subtotalCents);
  const compactLabel = lines.map((l) => `${l.qty} × ${l.specLabel}`).join(" + ");
  const arithmeticBreakdown =
    lines.map((l) => `${l.qty} × ${formatUsd(l.unitPriceIva)}`).join(" + ") + ` = ${formatUsd(subtotalUsd)}`;

  return {
    totalUnits: lines.reduce((acc, l) => acc + l.qty, 0),
    containerType: parsed.containerType,
    lines,
    unmatchedSpecs,
    subtotalUsd,
    compactLabel,
    arithmeticBreakdown,
  };
}

// ---------------------------------------------------------------------------
// DETECCIÓN HONESTA DE FILTROS, CIUDAD, RUC Y DATOS DE CLIENTE
// ---------------------------------------------------------------------------

/**
 * Verifica si el CLIENTE (exclusivamente en sus propios mensajes, ignorando el texto
 * prellenado del anuncio CTWA `[AD-B12]`) realmente solicitó o mencionó filtros.
 */
export function didClientMentionFilters(userTexts: string[]): boolean {
  for (const raw of userTexts) {
    const stripped = (raw || "").replace(/^\[AD-[A-Z0-9-]+\][^\n]*/i, "").trim();
    if (!stripped) continue;
    if (/\b(filtro|filtros|filter|aceite\s+y\s+filtro)\b/i.test(normalizeAscii(stripped))) {
      return true;
    }
  }
  return false;
}

const EC_CITY_PATTERNS: Array<{ city: string; regex: RegExp }> = [
  { city: "Pedernales", regex: /\bpedernales\b/i },
  { city: "Cuenca", regex: /\bcuenca\b/i },
  { city: "Quito", regex: /\bquito\b|\btumbaco\b|\bcumbaya\b|\bsangolqui\b/i },
  { city: "Guayaquil", regex: /\bguayaquil\b|\bsamborondon\b|\bduran\b/i },
  { city: "Manta", regex: /\bmanta\b/i },
  { city: "Portoviejo", regex: /\bportoviejo\b/i },
  { city: "Santo Domingo", regex: /\bsanto\s+domingo\b/i },
  { city: "Esmeraldas", regex: /\besmeraldas\b|\batacames\b|\bquininde\b/i },
  { city: "Ambato", regex: /\bambato\b/i },
  { city: "Machala", regex: /\bmachala\b/i },
  { city: "Loja", regex: /\bloja\b/i },
  { city: "Quevedo", regex: /\bquevedo\b/i },
  { city: "Babahoyo", regex: /\bbabahoyo\b/i },
  { city: "Ibarra", regex: /\bibarra\b/i },
  { city: "Riobamba", regex: /\briobamba\b/i },
  { city: "Latacunga", regex: /\blatacunga\b/i },
  { city: "Chone", regex: /\bchone\b/i },
  { city: "El Carmen", regex: /\bel\s+carmen\b/i },
  { city: "Jama", regex: /\bjama\b/i },
  { city: "San Vicente", regex: /\bsan\s+vicente\b/i },
  { city: "Bahía de Caráquez", regex: /\bbahia\b/i },
  { city: "Milagro", regex: /\bmilagro\b/i },
  { city: "Lago Agrio", regex: /\blago\s+agrio\b/i },
  { city: "Tena", regex: /\btena\b/i },
  { city: "Puyo", regex: /\bpuyo\b/i },
  { city: "Macas", regex: /\bmacas\b/i },
  { city: "Tulcán", regex: /\btulcan\b/i },
  { city: "Santa Elena", regex: /\bsanta\s+elena\b|\bsalinas\b|\bla\s+libertad\b/i },
];

export function extractEcuadorCity(rawText: string): string | null {
  const norm = normalizeAscii(rawText);
  for (const item of EC_CITY_PATTERNS) {
    if (item.regex.test(norm)) return item.city;
  }
  return null;
}

export function extractRucOrCedula(rawText: string): string | null {
  const cleaned = (rawText || "").replace(/[-\s]/g, " ");
  const withLabel = cleaned.match(/\b(?:ruc|cedula|ci|c\.i\.)\s*[:#]?\s*(\d{10}(?:001)?)\b/i);
  if (withLabel) return withLabel[1];
  const ruc13 = cleaned.match(/\b(\d{10}001)\b/);
  if (ruc13) return ruc13[1];
  return null;
}

export function extractExplicitHumanName(rawText: string): string | null {
  const m = (rawText || "").match(
    /\b(?:mi\s+nombre\s+es|me\s+llamo|soy|a\s+nombre\s+de|nombre\s*:)\s+([A-Za-zÁÉÍÓÚáéíóúÑñ]{2,20}(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,20}){0,2})/i
  );
  if (!m) return null;
  return sanitizeCustomerName(m[1]);
}

// ---------------------------------------------------------------------------
// REGLA 3 — RESPUESTA HUMANA PRE-CIERRE EN VIVO (PROHIBIDO ENFRIAR LA VENTA)
// ---------------------------------------------------------------------------

/**
 * Genera la respuesta en vivo que Milo envía al cliente cuando detecta un pedido
 * de volumen/flota: confirma stock + subtotal aritmético exacto desde el catálogo
 * y hace 1 sola pregunta ágil y humana para destrabar el cierre.
 */
export function buildLiveBulkPreCloseReply(params: {
  bulkQuote: BulkCatalogQuote;
  customerName?: string | null;
  city?: string | null;
  hasRuc?: boolean;
  clientMentionedFilters?: boolean;
  isFirstGreeting?: boolean;
}): string {
  const safeName = sanitizeCustomerName(params.customerName);
  const greeting =
    params.isFirstGreeting === false
      ? safeName
        ? `¡Perfecto, ${safeName.split(" ")[0]}!`
        : "¡Perfecto!"
      : `${buildWarmEcuadorianGreeting(safeName)}.`;

  const linesBlock = params.bulkQuote.lines
    .map((l) => `• ${l.qty} × ${l.brand} ${l.specLabel} — ${formatUsd(l.unitPriceIva)} c/u = *${formatUsd(l.lineSubtotalUsd)}*`)
    .join("\n");

  const cityNote = params.city
    ? `Para despacho a *${params.city}*, ya estoy pasando tu detalle exacto a nuestro asesor comercial para confirmarte la mejor escala mayorista y el valor exacto del envío.`
    : `Ya estoy pasando tu detalle exacto a nuestro asesor comercial para confirmarte la mejor escala mayorista y el envío coordinado <48h.`;

  // 1 sola pregunta conversacional ágil que pide únicamente lo faltante
  const missingPrompts: string[] = [];
  if (!params.city) missingPrompts.push("la *ciudad y sector exacto* de entrega");
  if (!safeName && !params.hasRuc) missingPrompts.push("tu *nombre o RUC*");
  else if (!params.hasRuc) missingPrompts.push("tu *RUC/cédula* para factura SRI");
  if (params.clientMentionedFilters) {
    missingPrompts.push("la *marca, modelo y año* de los vehículos para sumarte los filtros exactos");
  }

  let closingQuestion: string;
  if (missingPrompts.length === 0) {
    closingQuestion =
      "¿Deseas agregar algún otro producto o te enviamos la proforma oficial con estos datos?";
  } else if (missingPrompts.length === 1) {
    closingQuestion = `Para agilizar tu proforma y envío, ¿me ayudas confirmando ${missingPrompts[0]}?`;
  } else {
    const last = missingPrompts.pop();
    closingQuestion = `Para dejarte lista la proforma y cotizar el envío exacto, ¿me ayudas con ${missingPrompts.join(", ")} y ${last}?`;
  }

  return (
    `${greeting} Sí tenemos stock inmediato de tus *${params.bulkQuote.totalUnits} canecas MANNOL 20L* (${params.bulkQuote.compactLabel}):\n` +
    `${linesBlock}\n` +
    `*Subtotal referencial c/IVA:* *${formatUsd(params.bulkQuote.subtotalUsd)}*\n\n` +
    `${cityNote}\n` +
    `${closingQuestion}`
  );
}

// ---------------------------------------------------------------------------
// REGLA 4 — ESCALAMIENTO VERIFICADO Y HONESTO PARA EDWIN (TELEGRAM / WHATSAPP)
// ---------------------------------------------------------------------------

function describeMissingFieldKeys(keys: string[]): string {
  const labels: Record<string, string> = {
    ciudad: "Ciudad/sector exacto de entrega",
    nombre_ruc: "Nombre y/o RUC para proforma SRI",
    filtros_vehiculos: "Marca, modelo y año de vehículos (para cotizar filtros)",
    cantidades: "Cantidades y viscosidades exactas",
    flete: "Valor exacto de flete según destino y peso",
  };
  return keys.map((k) => labels[k] || k).join(" · ");
}

export function buildVerifiedEscalationPayload(params: {
  bulkQuote?: BulkCatalogQuote | null;
  cleanMessage: string;
  customerName?: string | null;
  city?: string | null;
  rucCedula?: string | null;
  vehicleLabel?: string | null;
  quotedTotalUsd?: number | null;
  selectedSkusLabel?: string | null;
  clientMentionedFilters: boolean;
  hasUnmappedHeavy?: boolean;
  reasonOverride?: string;
  urgency?: "alta" | "media" | "baja";
  dispatchTimingPhrase?: string;
}): VerifiedEscalationPayload {
  const safeName = sanitizeCustomerName(params.customerName);
  const greetingPrefix = buildWarmEcuadorianGreeting(safeName);
  const timing =
    params.dispatchTimingPhrase ||
    "dejarlo separado hoy en bodega y despacharlo en el primer turno hábil con foto de tu guía apenas salga a ruta";

  // 1. Qué confirmó realmente el cliente (aritmética en código)
  const confirmedParts: string[] = [];
  if (params.bulkQuote) {
    for (const l of params.bulkQuote.lines) {
      confirmedParts.push(`• ${l.formattedLine} [${l.sku}]`);
    }
    confirmedParts.push(
      `• Resumen: ${params.bulkQuote.compactLabel} → Subtotal referencial c/IVA: *${formatUsd(params.bulkQuote.subtotalUsd)}* (${params.bulkQuote.arithmeticBreakdown})`
    );
  } else if (params.quotedTotalUsd !== null && params.quotedTotalUsd !== undefined) {
    confirmedParts.push(
      `• ${params.selectedSkusLabel || "Cotización catálogo"} — Total c/IVA: *${formatUsd(params.quotedTotalUsd)}*`
    );
  } else {
    confirmedParts.push(`• Solicitud cliente: "${normalizeBulkOrderText(params.cleanMessage).slice(0, 180)}"`);
  }
  if (params.city) confirmedParts.push(`• Destino confirmado: *${params.city}*`);
  if (params.vehicleLabel) confirmedParts.push(`• Vehículo(s): *${params.vehicleLabel}*`);
  if (params.rucCedula) confirmedParts.push(`• RUC/CI: *${params.rucCedula}*`);
  if (safeName) confirmedParts.push(`• Nombre confirmado: *${safeName}*`);

  // 2. Qué dato falta realmente (NO repetir cantidades si ya están en bulkQuote)
  const missingKeys: string[] = [];
  if (!params.city) missingKeys.push("ciudad");
  if (!safeName && !params.rucCedula) missingKeys.push("nombre_ruc");
  if ((params.clientMentionedFilters || params.hasUnmappedHeavy) && !params.vehicleLabel) {
    missingKeys.push("filtros_vehiculos");
  }
  if (!params.bulkQuote && params.quotedTotalUsd == null) {
    missingKeys.push("cantidades");
  }

  const missingFieldsAsked =
    missingKeys.length > 0
      ? describeMissingFieldKeys(missingKeys)
      : "Ningún dato comercial pendiente del cliente — listo para confirmar flete/escala mayorista y cerrar.";

  // 3. Motivo honesto y concreto
  const reason =
    params.reasonOverride ||
    (params.hasUnmappedHeavy
      ? "Flota B2B / vehículos pesados sin filtros mapeados"
      : params.bulkQuote
      ? `Pedido mayorista (${params.bulkQuote.totalUnits} canecas 20L: ${params.bulkQuote.compactLabel})`
      : params.city && normalizeAscii(params.city) !== "pedernales"
      ? `Confirmar flete exacto a ${params.city}`
      : "Atención comercial de asesor");

  // 4. Mensaje humano sugerido 100% verificado contra lo que dijo el cliente
  // PROHIBIDO mencionar filtros si el cliente NO mencionó filtros, y PROHIBIDO usar hashes como nombre.
  let suggestedReply: string;
  if (params.bulkQuote) {
    const orderDesc = `${params.bulkQuote.totalUnits} canecas MANNOL 20L (${params.bulkQuote.compactLabel}, subtotal referencial ${formatUsd(params.bulkQuote.subtotalUsd)} c/IVA)`;
    const destClause = params.city
      ? ` con envío coordinado a ${params.city}`
      : "";
    const filterClause = params.clientMentionedFilters
      ? params.vehicleLabel
        ? ` y reviso también los filtros exactos para ${params.vehicleLabel}`
        : " y si me indicas marca, modelo y año de tus vehículos te sumo los filtros exactos"
      : "";

    const askParts: string[] = [];
    if (!params.city) askParts.push("la ciudad y sector exacto de entrega");
    if (!safeName && !params.rucCedula) askParts.push("tu nombre o RUC");

    const closingClause =
      askParts.length > 0
        ? ` ¿Me confirmas ${askParts.join(" y ")} para enviarte la proforma oficial?`
        : ` Enseguida te confirmo la mejor escala mayorista${params.city ? ` + valor exacto del envío a ${params.city}` : ""} para ${timing}.`;

    suggestedReply =
      `${greetingPrefix}, soy el asesor comercial de LíderPro Pedernales. ` +
      `Ya tengo tu pedido de ${orderDesc}${destClause}${filterClause} listo para revisarte precio mayorista.${closingClause}`;
  } else {
    const cityTxt = params.city || "tu ciudad";
    const totalTxt =
      params.quotedTotalUsd !== null && params.quotedTotalUsd !== undefined
        ? `${formatUsd(params.quotedTotalUsd)} c/IVA`
        : "confirmado en catálogo";
    const filterNote =
      params.clientMentionedFilters || params.hasUnmappedHeavy
        ? " Estoy revisando los filtros exactos para tus unidades."
        : "";
    suggestedReply =
      `${greetingPrefix}, soy el asesor de LíderPro Pedernales. ` +
      `Tu pedido (${totalTxt}) ya está listo${filterNote} y enseguida te confirmo el valor exacto del envío a ${cityTxt} para ${timing}.`;
  }

  const howToHandle = params.bulkQuote
    ? `1) Verifica stock y aplica la escala mayorista real sobre ${params.bulkQuote.compactLabel} (base PVP c/IVA ${formatUsd(params.bulkQuote.subtotalUsd)}).\n` +
      `2) ${params.city ? `Cotiza flete exacto a ${params.city} (sin nombrar flotas) y` : "Al recibir la ciudad de entrega,"} envía proforma oficial con factura SRI.`
    : `1) Revisa el resumen verificado sin contradecir precios de catálogo.\n` +
      `2) Confirma el punto pendiente al cliente (envío a tu ciudad / dirección acordada sin nombrar flotas) y cierra con factura SRI.`;

  const actionNeeded = params.bulkQuote
    ? `Validar escala mayorista sobre ${params.bulkQuote.compactLabel} (${formatUsd(params.bulkQuote.subtotalUsd)} base c/IVA)${
        params.city ? ` y cotizar flete exacto a ${params.city}` : " y esperar ciudad/RUC para proforma"
      }.`
    : `Atender ${reason}.`;

  return {
    reason,
    urgency: params.urgency || "alta",
    confirmedByClient: confirmedParts.join("\n"),
    missingFieldsAsked,
    missingFieldKeys: missingKeys,
    suggestedReply,
    howToHandle,
    actionNeeded,
    shortClientLabel: params.bulkQuote
      ? `la mejor escala mayorista y proforma para tus ${params.bulkQuote.totalUnits} canecas`
      : params.city
      ? `el valor exacto del envío a ${params.city}`
      : "los detalles de tu pedido",
    clientMentionedFilters: params.clientMentionedFilters,
  };
}

/**
 * Formatea el bloque oficial `🚨 ESCALAMIENTO MILO` con las 3 secciones obligatorias:
 *   ✅ CONFIRMADO POR CLIENTE:
 *   ❓ DATO FALTANTE QUE MILO YA LE PREGUNTÓ:
 *   💬 MENSAJE HUMANO SUGERIDO:
 */
export function formatVerifiedEscalationAlert(params: {
  urgency: "alta" | "media" | "baja";
  customerName?: string | null;
  contactRef: string;
  city?: string | null;
  adTag?: string | null;
  reason: string;
  confirmedByClient: string;
  missingFieldsAsked: string;
  suggestedReply: string;
  isUpdate?: boolean;
}): string {
  const safeName = sanitizeCustomerName(params.customerName) || "Sin nombre confirmado";
  const cityLabel = params.city || "Por confirmar";
  const adTagLabel = params.adTag || "Orgánico";
  const header = params.isUpdate
    ? `🔄 *ACTUALIZACIÓN ESCALAMIENTO MILO — [URGENCIA: ${params.urgency.toUpperCase()}]*`
    : `🚨 *ESCALAMIENTO MILO — [URGENCIA: ${params.urgency.toUpperCase()}]*`;

  return (
    `${header}\n` +
    `*Cliente:* ${safeName} | ${params.contactRef} | ${cityLabel} | ${adTagLabel}\n` +
    `*Motivo:* ${params.reason}\n` +
    `✅ *CONFIRMADO POR CLIENTE:*\n${params.confirmedByClient}\n` +
    `❓ *DATO FALTANTE QUE MILO YA LE PREGUNTÓ:*\n• ${params.missingFieldsAsked}\n` +
    `💬 *MENSAJE HUMANO SUGERIDO:*\n"${params.suggestedReply}"`
  );
}

// ---------------------------------------------------------------------------
// REGLA 5 — DES-TRABE CONVERSACIONAL POST-ESCALAMIENTO (ANTI-LOOP)
// ---------------------------------------------------------------------------

/**
 * Cuando el cliente responde con datos parciales tras un escalamiento (ej. "Envío a cuenca",
 * su RUC, su nombre o modelos de vehículos), actualiza el contexto, refresca el resumen
 * ejecutivo para Edwin y genera una confirmación natural sin repetir preguntas ya contestadas.
 *
 * Respeta anti-loop:
 * - Si el cliente no aporta datos nuevos (ej. "ok", "gracias"), no responde (silencio limpio).
 * - Si ya hubo intervención manual de un asesor humano, solo actualiza el resumen interno y no pisa el chat.
 * - Máximo 2 respuestas breves de confirmación de datos post-escalamiento.
 */
export function processPostEscalationPartialData(params: {
  inboundText: string;
  existingCity?: string | null;
  existingName?: string | null;
  existingVehicleLabel?: string | null;
  existingContext?: Partial<EscalationContextSnapshot> | null;
  catalogEntries?: BulkCatalogSku[];
  dispatchTimingPhrase?: string;
}): PostEscalationUpdateResult {
  const text = (params.inboundText || "").trim();
  const prevCtx: EscalationContextSnapshot = {
    confirmedLines: Array.isArray(params.existingContext?.confirmedLines)
      ? [...params.existingContext!.confirmedLines]
      : [],
    confirmedSummary: params.existingContext?.confirmedSummary || "",
    confirmedSubtotalUsd: params.existingContext?.confirmedSubtotalUsd ?? null,
    clientMentionedFilters: Boolean(params.existingContext?.clientMentionedFilters),
    askedMissingFields: Array.isArray(params.existingContext?.askedMissingFields)
      ? [...params.existingContext!.askedMissingFields]
      : ["ciudad", "nombre_ruc"],
    collectedFields: { ...(params.existingContext?.collectedFields || {}) },
    postEscalationReplyCount: Number(params.existingContext?.postEscalationReplyCount || 0),
    lastRefreshedAt: params.existingContext?.lastRefreshedAt ?? null,
    lastHumanInterventionAt: params.existingContext?.lastHumanInterventionAt ?? null,
  };

  const newFieldKeys: string[] = [];

  // 1. Ciudad
  const detectedCity = extractEcuadorCity(text);
  let updatedCity = params.existingCity || prevCtx.collectedFields.ciudad || null;
  if (detectedCity && normalizeAscii(detectedCity) !== normalizeAscii(updatedCity || "")) {
    updatedCity = detectedCity;
    prevCtx.collectedFields.ciudad = detectedCity;
    newFieldKeys.push("ciudad");
  }

  // 2. RUC / Cédula
  const detectedRuc = extractRucOrCedula(text);
  let updatedRuc = prevCtx.collectedFields.ruc || null;
  if (detectedRuc && detectedRuc !== updatedRuc) {
    updatedRuc = detectedRuc;
    prevCtx.collectedFields.ruc = detectedRuc;
    newFieldKeys.push("ruc");
  }

  // 3. Nombre humano explícito
  const existingSafeName = sanitizeCustomerName(params.existingName);
  const detectedName = extractExplicitHumanName(text);
  let updatedName = existingSafeName;
  if (detectedName && normalizeAscii(detectedName) !== normalizeAscii(existingSafeName || "")) {
    updatedName = detectedName;
    prevCtx.collectedFields.nombre = detectedName;
    newFieldKeys.push("nombre");
  }

  // 4. ¿Mencionó filtros ahora?
  const mentionedFiltersNow = didClientMentionFilters([text]);
  const clientMentionedFilters = prevCtx.clientMentionedFilters || mentionedFiltersNow;
  if (mentionedFiltersNow && !prevCtx.clientMentionedFilters) {
    prevCtx.clientMentionedFilters = true;
    newFieldKeys.push("filtros");
  }

  // 5. ¿Actualizó pedido de canecas?
  const newBulk = quoteBulkCanecaOrderFromCatalog(text, params.catalogEntries);
  let activeBulkQuote: BulkCatalogQuote | null = null;
  if (newBulk) {
    prevCtx.confirmedLines = newBulk.lines;
    prevCtx.confirmedSummary = newBulk.compactLabel;
    prevCtx.confirmedSubtotalUsd = newBulk.subtotalUsd;
    activeBulkQuote = newBulk;
    newFieldKeys.push("pedido_canecas");
  } else if (prevCtx.confirmedLines.length > 0) {
    const subtotalCents = prevCtx.confirmedLines.reduce(
      (acc, l) => acc + Math.round(l.unitPriceIva * 100) * l.qty,
      0
    );
    const subtotalUsd = roundUsd(subtotalCents);
    activeBulkQuote = {
      totalUnits: prevCtx.confirmedLines.reduce((acc, l) => acc + l.qty, 0),
      containerType: "caneca_20l",
      lines: prevCtx.confirmedLines,
      unmatchedSpecs: [],
      subtotalUsd,
      compactLabel: prevCtx.confirmedLines.map((l) => `${l.qty} × ${l.specLabel}`).join(" + "),
      arithmeticBreakdown:
        prevCtx.confirmedLines.map((l) => `${l.qty} × ${formatUsd(l.unitPriceIva)}`).join(" + ") +
        ` = ${formatUsd(subtotalUsd)}`,
    };
  }

  // 6. Vehículo mencionado ahora (simple detector de marcas comunes)
  const vehicleMatch = text.match(
    /\b(d[-\s]?max|hilux|ranger|bt[-\s]?50|hino|isuzu|npr|nhr|foton|jac|poer|sinotruk|weichai|kia|hyundai|toyota|chevrolet|nissan|ford|mazda)\b[^\n,.]{0,30}/i
  );
  let updatedVehicleText = params.existingVehicleLabel || prevCtx.collectedFields.vehiculo || null;
  if (vehicleMatch) {
    const candidateVeh = vehicleMatch[0].trim();
    if (normalizeAscii(candidateVeh) !== normalizeAscii(updatedVehicleText || "")) {
      updatedVehicleText = candidateVeh;
      prevCtx.collectedFields.vehiculo = candidateVeh;
      newFieldKeys.push("vehiculo");
    }
  }

  const hasNewData = newFieldKeys.length > 0;

  const updatedEscalation = buildVerifiedEscalationPayload({
    bulkQuote: activeBulkQuote,
    cleanMessage: text,
    customerName: updatedName,
    city: updatedCity,
    rucCedula: updatedRuc,
    vehicleLabel: updatedVehicleText,
    quotedTotalUsd: activeBulkQuote?.subtotalUsd ?? prevCtx.confirmedSubtotalUsd,
    selectedSkusLabel: activeBulkQuote?.compactLabel ?? prevCtx.confirmedSummary,
    clientMentionedFilters,
    dispatchTimingPhrase: params.dispatchTimingPhrase,
  });

  prevCtx.askedMissingFields = updatedEscalation.missingFieldKeys;
  if (hasNewData) {
    prevCtx.lastRefreshedAt = new Date().toISOString();
  }

  const humanAlreadyIntervened = Boolean(prevCtx.lastHumanInterventionAt);
  const shouldReplyToClient =
    hasNewData && !humanAlreadyIntervened && prevCtx.postEscalationReplyCount < 2;

  let clientAckReply: string | null = null;
  if (shouldReplyToClient) {
    prevCtx.postEscalationReplyCount += 1;
    const ackItems: string[] = [];
    if (newFieldKeys.includes("ciudad") && updatedCity) ackItems.push(`envío a *${updatedCity}*`);
    if (newFieldKeys.includes("ruc") && updatedRuc) ackItems.push(`RUC/CI *${updatedRuc}*`);
    if (newFieldKeys.includes("nombre") && updatedName) ackItems.push(`nombre *${updatedName}*`);
    if (newFieldKeys.includes("vehiculo") && updatedVehicleText) ackItems.push(`vehículo *${updatedVehicleText}*`);
    if (newFieldKeys.includes("pedido_canecas") && activeBulkQuote) {
      ackItems.push(`${activeBulkQuote.compactLabel} (ref. *${formatUsd(activeBulkQuote.subtotalUsd)}* c/IVA)`);
    }

    const orderRef = activeBulkQuote
      ? ` junto con tus *${activeBulkQuote.totalUnits} canecas* (${activeBulkQuote.compactLabel}, subtotal ref. *${formatUsd(activeBulkQuote.subtotalUsd)}* c/IVA)`
      : "";

    // Jamás repetir preguntas ya contestadas: solo ofrecer de paso lo que siga pendiente
    const nextHintParts: string[] = [];
    if (updatedEscalation.missingFieldKeys.includes("ciudad")) {
      nextHintParts.push("la ciudad de entrega");
    }
    if (updatedEscalation.missingFieldKeys.includes("nombre_ruc")) {
      nextHintParts.push("tu nombre o RUC para la proforma");
    }
    if (updatedEscalation.missingFieldKeys.includes("filtros_vehiculos")) {
      nextHintParts.push("marca, modelo y año para los filtros");
    }

    const tail =
      nextHintParts.length > 0
        ? ` Si deseas adelantar ${nextHintParts.join(" o ")}, me lo dejas por aquí.`
        : " Enseguida nuestro asesor te envía la proforma final y el valor exacto del envío.";

    clientAckReply =
      `¡Anotado: ${ackItems.join(" y ")}! Ya actualicé este dato con nuestro asesor${orderRef}.${tail}`;
  }

  return {
    hasNewData,
    newFieldKeys,
    updatedCity,
    updatedName,
    updatedRuc,
    updatedVehicleText,
    clientMentionedFilters,
    remainingMissingKeys: updatedEscalation.missingFieldKeys,
    shouldReplyToClient,
    clientAckReply,
    updatedContext: prevCtx,
    updatedEscalation,
  };
}
