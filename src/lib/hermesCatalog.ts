import privatePricing from "@/data/privatePricing.server.json";
import { VEHICLE_DATABASE, type VehicleMake, type VehicleModelItem } from "@/data/vehicles";
import type {
  CustomerType,
  LastQuoteSnapshot,
  QuotedOptionSnapshot,
  VehicleProfile,
} from "@/lib/hermesDb";

export interface CatalogPricingItem {
  sku: string;
  parent_sku?: string;
  slug?: string;
  brand?: string;
  category?: string;
  name: string;
  presentation?: string;
  base_price_no_iva?: number;
  price_with_iva_raw?: number;
  quoted_pvp_iva?: number;
  excel_code?: string;
  pricing_note?: string;
}

export type HermesIntentTag =
  | "cotizacion_vehiculo"
  | "consulta_precio_sin_vehiculo"
  | "bateria_domicilio"
  | "bateria_y_combo"
  | "combo_lubricante"
  | "filtro_refrigerante_aditivo"
  | "cierre_pedido_pendiente_datos"
  | "pedido_confirmado"
  | "info_operativa"
  | "envio_delivery"
  | "b2b_flota"
  | "producto_sin_stock"
  | "pregunta_ilogica"
  | "fuera_de_tema"
  | "saludo"
  | "general";

export interface QuoteOption extends QuotedOptionSnapshot {
  qualifiesFreeShipping: boolean;
}

export interface OrderCaptureExtraction {
  isConfirmingOrder: boolean;
  selectedOptionIndex: number | null;
  batteryTradeIn: boolean | null;
  customerName: string | null;
  deliveryAddress: string | null;
  paymentMethod: string | null;
  missingFields: Array<"Nombre" | "Dirección/Referencia" | "Forma de pago" | "Entrega de batería usada (Sí/No)">;
}

export interface DeterministicQuotePlan {
  intentTag: HermesIntentTag;
  needsVehicleDetails: boolean;
  missingFieldHint?: string;
  detectedVehicle: VehicleProfile | null;
  matchedModelEntry: { make: string; model: VehicleModelItem } | null;
  detectedCity: string | null;
  detectedCustomerType: CustomerType;
  requestedProductWithoutStock?: string;
  ilologicalReason?: string;
  options: QuoteOption[];
  matchedSkus: string[];
  primaryTotalUsd: number | null;
  shippingDeltaUsd: number | null;
  orderCapture: OrderCaptureExtraction | null;
  confirmedOption: QuotedOptionSnapshot | null;
}

const CATALOG = privatePricing as CatalogPricingItem[];
const BY_SKU = new Map<string, CatalogPricingItem>();
for (const item of CATALOG) {
  if (item.sku) BY_SKU.set(item.sku.toUpperCase(), item);
}

export const FREE_SHIPPING_THRESHOLD_USD = 35;

const HUMAN_PRODUCT_NAMES: Record<string, string> = {
  "COMBO-MANNOL-1A": "Combo MANNOL Classic 10W-40 (galón) + filtro Advance + Cockpit Care con esponja de regalo",
  "COMBO-MANNOL-1B": "Combo MANNOL Energy 5W-30 sintético (galón) + filtro Advance + Cockpit Care con esponja de regalo",
  "COMBO-MANNOL-1C": "Combo MANNOL Safari 20W-50 (galón) + filtro Advance + Cockpit Care con esponja de regalo",
  "COMBO-MANNOL-2A": "Combo MANNOL TS-4 15W-40 (7 litros) + filtro Advance + Cockpit Care con esponja de regalo",
  "COMBO-MANNOL-2B": "Combo MANNOL Diesel Turbo 5W-40 sintético (7 litros) + filtro Advance + Cockpit Care con esponja de regalo",
  "COMBO-MANNOL-2C": "Combo MANNOL Classic 10W-40 (6 litros) + filtro Advance + Cockpit Care con esponja de regalo",
  "COMBO-MANNOL-3A": "Combo MANNOL TS-4 15W-40 (caneca 20L) + filtro pesado + Cockpit Care con esponja de regalo",
  "COMBO-MANNOL-3B": "Combo MANNOL TS-5 10W-40 (caneca 20L) + filtro pesado + Cockpit Care con esponja de regalo",
  "COMBO-MANNOL-3C": "Combo MANNOL Hydro HV ISO 68 (caneca 20L) + complemento + Cockpit Care con esponja de regalo",
  "03027-HP": "Batería Ecuador Grupo 27 High Power 95 Amp (Tapa Roja)",
  "03027-HP-I": "Batería Ecuador Grupo 27 High Power I 95 Amp (Tapa Roja)",
  "02727HPS4": "Batería Bosch Grupo 27 S4 88 Amp",
  "02727HPIS4": "Batería Bosch Grupo 27 S4 85 Amp",
  "03024-HP-I": "Batería Ecuador Grupo 24 High Power 85 Amp (Tapa Roja)",
  "03024-FE": "Batería Ecuador Grupo 24 Full Equipo 65 Amp",
  "02724HPIS4": "Batería Bosch Grupo 24 S4 64 Amp",
  "02724HPS4": "Batería Bosch Grupo 24 S4 64 Amp",
  "03034-FE": "Batería Ecuador Grupo 34 Full Equipo 65 Amp",
  "02734HPS4": "Batería Bosch Grupo 34 S4 70 Amp",
  "03042-FE": "Batería Ecuador Grupo 42 Full Equipo 55 Amp",
  "02742HPIS4": "Batería Bosch Grupo 42 S4 55 Amp",
  "03031-SHD": "Batería Ecuador Grupo 31 Super Heavy Duty 105 Amp",
  "030N100-SHD-I": "Batería Ecuador N100 Super Heavy Duty 104 Amp",
  "030N150-SHD": "Batería Ecuador N150 Super Heavy Duty 160 Amp",
};

export function formatHumanProductName(sku: string, rawName: string): string {
  const mapped = HUMAN_PRODUCT_NAMES[sku.toUpperCase()];
  if (mapped) return mapped;
  return rawName
    .replace(/[¡!]/g, "")
    .replace(/\s*—\s*/g, " ")
    .replace(/\s*\(HEREDADO\)/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Redondeo comercial oficial hacia arriba: .00 / .50 / .90 / siguiente entero */
export function commercialCeil(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  const cents = Math.round(value * 100);
  const dollars = Math.floor(cents / 100);
  const rem = cents % 100;
  if (rem === 0) return dollars;
  if (rem <= 50) return Number((dollars + 0.5).toFixed(2));
  if (rem <= 90) return Number((dollars + 0.9).toFixed(2));
  return dollars + 1;
}

export function resolveCatalogPriceIva(item: CatalogPricingItem): number {
  if (typeof item.quoted_pvp_iva === "number" && item.quoted_pvp_iva > 0) {
    return commercialCeil(item.quoted_pvp_iva);
  }
  const base = Number(item.base_price_no_iva || 0);
  if (base <= 0) return 0;
  return commercialCeil(base * 1.15);
}

export function sumExactPricesIva(prices: number[]): number {
  const totalCents = prices.reduce((acc, p) => acc + Math.round(p * 100), 0);
  return Number((totalCents / 100).toFixed(2));
}

export function normalizeText(value: string): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function getCatalogItemBySku(sku: string): CatalogPricingItem | undefined {
  return BY_SKU.get(sku.trim().toUpperCase());
}

export function formatVehicleLabel(v: VehicleProfile | null): string {
  if (!v) return "";
  if (v.unmappedLabel && !v.model) return v.unmappedLabel;
  return [v.make, v.model, v.year ? String(v.year) : "", v.engine, v.fuel]
    .filter(Boolean)
    .join(" ");
}

const CITY_PATTERNS: Array<{ city: string; regex: RegExp }> = [
  { city: "Pedernales", regex: /\bpedernales\b/i },
  { city: "Jama", regex: /\bjama\b/i },
  { city: "Cojimíes", regex: /\bcojimies\b/i },
  { city: "San Vicente", regex: /\bsan vicente\b/i },
  { city: "Bahía de Caráquez", regex: /\bbahia\b/i },
  { city: "Chone", regex: /\bchone\b/i },
  { city: "El Carmen", regex: /\bel carmen\b/i },
  { city: "Santo Domingo", regex: /\bsanto domingo\b/i },
  { city: "Quito", regex: /\bquito\b/i },
  { city: "Guayaquil", regex: /\bguayaquil|gye\b/i },
  { city: "Manta", regex: /\bmanta\b/i },
  { city: "Portoviejo", regex: /\bportoviejo\b/i },
  { city: "Esmeraldas", regex: /\besmeraldas\b/i },
  { city: "Cuenca", regex: /\bcuenca\b/i },
  { city: "Ambato", regex: /\bambato\b/i },
  { city: "Machala", regex: /\bmachala\b/i },
  { city: "Loja", regex: /\bloja\b/i },
  { city: "Quevedo", regex: /\bquevedo\b/i },
  { city: "Babahoyo", regex: /\bbabahoyo\b/i },
  { city: "Ibarra", regex: /\bibarra\b/i },
  { city: "Riobamba", regex: /\briobamba\b/i },
  { city: "Latacunga", regex: /\blatacunga\b/i },
];

export function extractCityFromText(text: string): string | null {
  const norm = normalizeText(text);
  for (const entry of CITY_PATTERNS) {
    if (entry.regex.test(norm)) return entry.city;
  }
  return null;
}

export function extractCustomerType(text: string, prevType: CustomerType = "particular"): CustomerType {
  const norm = normalizeText(text);
  if (/\b(camaronera|piscina|bomba fluvial|estacionario|caneca|tambor|grupo 31|n150|n100)\b/.test(norm)) {
    return "camaronera";
  }
  if (/\b(taller|mecanica|mecanico|lubricadora|al por mayor|mayorista|flota)\b/.test(norm)) {
    return "taller";
  }
  return prevType;
}

interface VehicleAliasRule {
  make: string;
  modelKeyword: string;
  regex: RegExp;
  defaultFuel?: "diésel" | "gasolina" | "moto";
}

const VEHICLE_ALIAS_RULES: VehicleAliasRule[] = [
  { make: "Chevrolet", modelKeyword: "D-Max", regex: /\b(d[-\s]?max|luv\s*d[-\s]?max)\b/i },
  { make: "Chevrolet", modelKeyword: "Sail", regex: /\bsail\b/i, defaultFuel: "gasolina" },
  { make: "Chevrolet", modelKeyword: "Spark", regex: /\b(spark|beat)\b/i, defaultFuel: "gasolina" },
  { make: "Chevrolet", modelKeyword: "Aveo", regex: /\baveo\b/i, defaultFuel: "gasolina" },
  { make: "Chevrolet", modelKeyword: "Tracker", regex: /\b(tracker|cruze|orlando)\b/i, defaultFuel: "gasolina" },
  { make: "Chevrolet", modelKeyword: "Onix", regex: /\b(onix|prisma)\b/i, defaultFuel: "gasolina" },
  { make: "Chevrolet", modelKeyword: "Camiones Isuzu", regex: /\b(nhr|npr|nqr|ftr|fvr|isuzu)\b/i, defaultFuel: "diésel" },
  { make: "Toyota", modelKeyword: "Hilux", regex: /\bhi[-\s]?lux\b/i },
  { make: "Toyota", modelKeyword: "Fortuner", regex: /\bfortuner\b/i },
  { make: "Toyota", modelKeyword: "Yaris", regex: /\byaris\b/i, defaultFuel: "gasolina" },
  { make: "Toyota", modelKeyword: "Corolla", regex: /\b(corolla|rav4|rav\s*4)\b/i, defaultFuel: "gasolina" },
  { make: "Kia", modelKeyword: "Sportage", regex: /\bsportage\b/i },
  { make: "Kia", modelKeyword: "Picanto", regex: /\bpicanto\b/i, defaultFuel: "gasolina" },
  { make: "Kia", modelKeyword: "Rio", regex: /\b(kia\s+)?rio\b/i, defaultFuel: "gasolina" },
  { make: "Kia", modelKeyword: "Soluto", regex: /\b(soluto|seltos|cerato)\b/i, defaultFuel: "gasolina" },
  { make: "Hyundai", modelKeyword: "Tucson", regex: /\btucson\b/i },
  { make: "Hyundai", modelKeyword: "Accent", regex: /\baccent\b/i, defaultFuel: "gasolina" },
  { make: "Hyundai", modelKeyword: "Grand i10", regex: /\b(grand\s*i10|i10|atos)\b/i, defaultFuel: "gasolina" },
  { make: "Hyundai", modelKeyword: "H-100", regex: /\b(h[-\s]?100|porter|hd65|hd72|county)\b/i, defaultFuel: "diésel" },
  { make: "Great Wall / Haval", modelKeyword: "Wingle", regex: /\bwingle\b/i },
  { make: "Great Wall / Haval", modelKeyword: "Poer", regex: /\bpoer\b/i, defaultFuel: "diésel" },
  { make: "Great Wall / Haval", modelKeyword: "Haval", regex: /\b(haval|tank\s*300)\b/i },
  { make: "JAC", modelKeyword: "T6", regex: /\bjac\s*t6|\bt6\b/i },
  { make: "JAC", modelKeyword: "T8", regex: /\b(t8|t9)\b/i, defaultFuel: "diésel" },
  { make: "JAC", modelKeyword: "Camiones HFC", regex: /\bhfc\b/i, defaultFuel: "diésel" },
  { make: "Nissan", modelKeyword: "Frontier", regex: /\b(frontier|np300|navara)\b/i },
  { make: "Nissan", modelKeyword: "X-Trail", regex: /\b(x[-\s]?trail|qashqai)\b/i, defaultFuel: "gasolina" },
  { make: "Nissan", modelKeyword: "Versa", regex: /\b(versa|sentra|tiida)\b/i, defaultFuel: "gasolina" },
  { make: "Ford", modelKeyword: "F-150", regex: /\b(f[-\s]?150)\b/i, defaultFuel: "gasolina" },
  { make: "Ford", modelKeyword: "Ranger", regex: /\branger\b/i },
  { make: "Mazda", modelKeyword: "BT-50", regex: /\b(bt[-\s]?50)\b/i },
  { make: "Mazda", modelKeyword: "Mazda 3", regex: /\b(mazda\s*[23]|cx[-\s]?5)\b/i, defaultFuel: "gasolina" },
  { make: "Suzuki", modelKeyword: "Grand Vitara", regex: /\b(grand\s*vitara|vitara\s*sz)\b/i, defaultFuel: "gasolina" },
  { make: "Suzuki", modelKeyword: "Swift", regex: /\b(swift|jimny)\b/i, defaultFuel: "gasolina" },
  { make: "Volkswagen / Renault", modelKeyword: "Amarok", regex: /\b(amarok|gol|jetta|bora)\b/i },
  { make: "Volkswagen / Renault", modelKeyword: "Duster", regex: /\b(duster|logan|sandero)\b/i, defaultFuel: "gasolina" },
  { make: "Dongfeng / Chery / Jetour", modelKeyword: "Rich 6", regex: /\brich\s*6\b/i, defaultFuel: "diésel" },
  { make: "Dongfeng / Chery / Jetour", modelKeyword: "Tiggo 2", regex: /\b(tiggo\s*2|x70|jetour)\b/i, defaultFuel: "gasolina" },
  { make: "Hino", modelKeyword: "Dutro", regex: /\b(hino|dutro|serie\s*300)\b/i, defaultFuel: "diésel" },
  { make: "Hino", modelKeyword: "Serie 500", regex: /\b(serie\s*500)\b/i, defaultFuel: "diésel" },
  { make: "Motos Multimarca", modelKeyword: "Pulsar", regex: /\bpulsar\b/i, defaultFuel: "moto" },
  { make: "Motos Multimarca", modelKeyword: "Shineray", regex: /\b(shineray|daytona)\b/i, defaultFuel: "moto" },
  { make: "Motos Multimarca", modelKeyword: "Honda", regex: /\b(cb190|wave|cg125|fz16|ybr|moto)\b/i, defaultFuel: "moto" },
  { make: "Sector Camaronero", modelKeyword: "Bombas", regex: /\b(camaronera|bomba fluvial|estacionario|caterpillar|cummins|perkins|yanmar)\b/i, defaultFuel: "diésel" },
];

const UNMAPPED_VEHICLE_REGEX =
  /\b(prado|land\s*cruiser|rush|agya|raize|captiva|groove|trailblazer|blazer|sorento|sonata|elantra|creta|santa\s*fe|tucson\s*ix|changan|cs35|cs55|geely|coolray|dfsk|glory|l200|montero|asx|outlander|kicks|note|pathfinder|kwid|koleos|cx[-\s]?30|tiggo\s*[3478]|arrizzo|jetour\s*dashing)\b/i;

function findVehicleDbEntry(makeHint: string, modelKeyword: string): { make: string; model: VehicleModelItem } | null {
  const mNorm = normalizeText(makeHint);
  const kNorm = normalizeText(modelKeyword);
  for (const mk of VEHICLE_DATABASE as VehicleMake[]) {
    if (!normalizeText(mk.make).includes(mNorm) && !mNorm.includes(normalizeText(mk.make))) continue;
    for (const mdl of mk.models) {
      if (normalizeText(mdl.model).includes(kNorm)) {
        return { make: mk.make, model: mdl };
      }
    }
  }
  return null;
}

export function resolveDbEntryForProfile(profile: VehicleProfile | null): { make: string; model: VehicleModelItem } | null {
  if (!profile?.model) return null;
  const makeHint = profile.make || "";
  const mdlNorm = normalizeText(profile.model);
  for (const mk of VEHICLE_DATABASE as VehicleMake[]) {
    if (makeHint && !normalizeText(mk.make).includes(normalizeText(makeHint))) continue;
    for (const mdl of mk.models) {
      if (normalizeText(mdl.model).includes(mdlNorm) || mdlNorm.includes(normalizeText(mdl.model).split("(")[0].trim())) {
        return { make: mk.make, model: mdl };
      }
    }
  }
  return null;
}

export function extractVehicleFromText(text: string): {
  profile: VehicleProfile | null;
  matchedEntry: { make: string; model: VehicleModelItem } | null;
} {
  const norm = normalizeText(text);
  const yearMatch = norm.match(/\b(199\d|20[0-2]\d)\b/);
  const year = yearMatch ? Number(yearMatch[1]) : undefined;

  let fuel: VehicleProfile["fuel"] | undefined;
  if (/\b(diesel|turbo\s*diesel|crdi|tdci|tdi)\b/.test(norm)) fuel = "diésel";
  else if (/\bgasolina\b/.test(norm)) fuel = "gasolina";
  else if (/\b(moto|motocicleta)\b/.test(norm)) fuel = "moto";
  else if (/\b(hibrid[oa]|e-power)\b/.test(norm)) fuel = "híbrido";

  const engineMatch = norm.match(/\b([1-6]\.\d)\s*(l|t|td|crdi|cc)?\b|\b(1\d\d|2\d\d|250|150)\s*cc\b/);
  const engine = engineMatch ? engineMatch[0].toUpperCase() : undefined;

  for (const rule of VEHICLE_ALIAS_RULES) {
    if (rule.regex.test(norm)) {
      const entry = findVehicleDbEntry(rule.make, rule.modelKeyword);
      const shortModel = entry ? entry.model.model.split("(")[0].trim() : rule.modelKeyword;
      const inferredFuel = fuel || rule.defaultFuel;
      const profile: VehicleProfile = {
        make: entry ? entry.make : rule.make,
        model: shortModel,
        ...(year ? { year } : {}),
        ...(engine ? { engine } : {}),
        ...(inferredFuel ? { fuel: inferredFuel } : {}),
      };
      return { profile, matchedEntry: entry };
    }
  }

  const unmappedMatch = norm.match(UNMAPPED_VEHICLE_REGEX);
  if (unmappedMatch) {
    const label = [unmappedMatch[0].toUpperCase(), year ? String(year) : "", fuel || ""].filter(Boolean).join(" ");
    return {
      profile: {
        unmappedLabel: label,
        ...(year ? { year } : {}),
        ...(engine ? { engine } : {}),
        ...(fuel ? { fuel } : {}),
      },
      matchedEntry: null,
    };
  }

  if (year || fuel || engine) {
    return {
      profile: {
        ...(year ? { year } : {}),
        ...(engine ? { engine } : {}),
        ...(fuel ? { fuel } : {}),
      },
      matchedEntry: null,
    };
  }

  return { profile: null, matchedEntry: null };
}

export function mergeVehicleProfiles(
  previous: VehicleProfile | null,
  incoming: VehicleProfile | null
): VehicleProfile | null {
  if (!incoming) return previous;
  if (incoming.model && previous?.model && incoming.model !== previous.model) {
    return incoming;
  }
  if (incoming.unmappedLabel && previous?.model) {
    return incoming;
  }
  return {
    ...(previous || {}),
    ...incoming,
    make: incoming.make || previous?.make,
    model: incoming.model || previous?.model,
    year: incoming.year || previous?.year,
    engine: incoming.engine || previous?.engine,
    fuel: incoming.fuel || previous?.fuel,
    batteryGroup: incoming.batteryGroup || previous?.batteryGroup,
    unmappedLabel: incoming.model ? undefined : incoming.unmappedLabel || previous?.unmappedLabel,
  };
}

function detectOutOfStockRequest(norm: string): string | null {
  const isCleaningSpray = /\b(limpiador|aditivo|spray|liquido|liquido de frenos)\b/.test(norm);
  if (!isCleaningSpray && /\b(llantas?|neumaticos?|cauchos?|rin(?:es)?\s*\d*|aros?)\b/.test(norm)) {
    return "llantas / neumáticos";
  }
  if (!isCleaningSpray && /\b(pastillas?|balatas?|zapatas?|discos?\s+de\s+freno|tambores?)\b/.test(norm)) {
    return "pastillas / componentes de freno";
  }
  if (!isCleaningSpray && /\b(parabrisas?|vidrios?|plumillas?|limpiaparabrisas?)\b/.test(norm)) {
    return "parabrisas / plumillas";
  }
  if (/\b(amortiguador(?:es)?|terminales?|rotulas?|bujes?|mesas?|cremallera|suspension)\b/.test(norm)) {
    return "amortiguadores / suspensión";
  }
  if (/\b(bujias?|bobinas?|cables?\s+de\s+bujia)\b/.test(norm)) {
    return "bujías / encendido";
  }
  if (/\b(embrague|kit\s+de\s+clutch|clutch|prensa|collarin)\b/.test(norm)) {
    return "kit de embrague";
  }
  if (/\b(bandas?|correas?\s+de\s+distribucion|tensores?|alternador|arranque|faros?|retrovisor(?:es)?|radiador(?:es)?)\b/.test(norm)) {
    return "repuestos mecánicos / carrocería";
  }
  return null;
}

function detectIllogicalQuestion(norm: string): string | null {
  if (/aceite\s+(de\s+)?(cocina|comestible|vegetal|oliva|girasol|soya|maiz|palma|frituras?)/.test(norm) || /manteca/.test(norm)) {
    return "El aceite de cocina pierde su película lubricante sobre los 90 °C, se carboniza y funde cojinetes y anillos en minutos.";
  }
  if (/(mezclar|echar|poner|usar).*(agua\s+(normal|de\s+llave|salada)|coca\s?cola|cerveza|jugo|vinagre).*(motor|aceite|radiador|bateria)/.test(norm)) {
    return "Mezclar líquidos domésticos con lubricantes o refrigerantes genera lodos, cavitación y corrosión interna severa.";
  }
  if (/(gasolina.*(en\s+motor\s+diesel|carro\s+diesel)|diesel.*(en\s+carro\s+(a\s+)?gasolina|motor\s+gasolina))/.test(norm)) {
    return "Cruzar gasolina y diésel daña de inmediato inyectores, bomba de alta presión y cámara.";
  }
  if (/(orina|acido\s+de\s+limon|sal).*bateria/.test(norm)) {
    return "Agregar soluciones caseras destruye las placas de plomo y sulfata irreversiblemente la batería.";
  }
  return null;
}

function detectOffTopic(norm: string, hasVehicleOrAutoTerm: boolean): boolean {
  if (hasVehicleOrAutoTerm) return false;
  return /\b(pizza|hamburguesa|encebollado|ceviche|sushi|almuerzo|comida|futbol|barcelona|emelec|liga\s+de\s+quito|partido|gol|chiste|bitcoin|cripto|tarea|deber|novia|novio|horoscopo|politica|presidente|novela|netflix)\b/.test(norm);
}

function buildSingleItemQuoteOption(
  item: CatalogPricingItem | undefined,
  label: string,
  includesMannolGift: boolean,
  includesFreeBatteryInstallPedernales: boolean
): QuoteOption | null {
  if (!item || item.sku === "ECOVLBAT") return null;
  const batteryPricing = computeBatteryDiscountPricing(item);
  const price = batteryPricing ? batteryPricing.priceWithTradeIn : resolveCatalogPriceIva(item);
  return {
    label,
    items: [
      {
        sku: item.sku,
        name: formatHumanProductName(item.sku, item.name),
        brand: item.brand,
        presentation: item.presentation,
        unitPriceIva: price,
        ...(batteryPricing
          ? {
              listPriceIva: batteryPricing.listPriceIva,
              isBattery: true,
              batteryBrand: batteryPricing.batteryBrand,
              priceWithTradeIn: batteryPricing.priceWithTradeIn,
              priceWithoutTradeIn: batteryPricing.priceWithoutTradeIn,
              discountPctWithTradeIn: batteryPricing.discountPctWithTradeIn,
              discountPctWithoutTradeIn: batteryPricing.discountPctWithoutTradeIn,
            }
          : {}),
      },
    ],
    totalUsd: price,
    ...(batteryPricing
      ? {
          hasBattery: true,
          totalWithTradeInUsd: batteryPricing.priceWithTradeIn,
          totalWithoutTradeInUsd: batteryPricing.priceWithoutTradeIn,
        }
      : {}),
    includesMannolGift,
    includesFreeBatteryInstallPedernales,
    qualifiesFreeShipping: price >= FREE_SHIPPING_THRESHOLD_USD,
  };
}

export interface BatteryDiscountPricing {
  listPriceIva: number;
  batteryBrand: "ecuador" | "bosch";
  discountPctWithTradeIn: number;
  discountPctWithoutTradeIn: number;
  priceWithTradeIn: number;
  priceWithoutTradeIn: number;
}

export function computeBatteryDiscountPricing(item: CatalogPricingItem): BatteryDiscountPricing | null {
  if (!item || !item.sku || item.sku === "ECOVLBAT") return null;
  const skuUpper = item.sku.toUpperCase();
  const brandNorm = normalizeText(item.brand || "");
  const catNorm = normalizeText(item.category || "");
  const nameNorm = normalizeText(item.name || "");
  const isBattery =
    catNorm === "baterias" ||
    /\bbateria\b/.test(nameNorm) ||
    skuUpper.startsWith("030") ||
    skuUpper.startsWith("027") ||
    skuUpper === "42HPS4";
  if (!isBattery) return null;

  const isEcuador = brandNorm.includes("ecuador") || skuUpper.startsWith("030");
  const isBosch = brandNorm.includes("bosch") || skuUpper.startsWith("027") || skuUpper === "42HPS4";
  if (!isEcuador && !isBosch) return null;

  const listPriceIva = resolveCatalogPriceIva(item);
  if (listPriceIva <= 0) return null;

  const batteryBrand: "ecuador" | "bosch" = isEcuador ? "ecuador" : "bosch";
  const discountPctWithTradeIn = isEcuador ? 35 : 25;
  const discountPctWithoutTradeIn = isEcuador ? 30 : 20;

  return {
    listPriceIva,
    batteryBrand,
    discountPctWithTradeIn,
    discountPctWithoutTradeIn,
    priceWithTradeIn: commercialCeil(listPriceIva * (1 - discountPctWithTradeIn / 100)),
    priceWithoutTradeIn: commercialCeil(listPriceIva * (1 - discountPctWithoutTradeIn / 100)),
  };
}

export function extractBatteryTradeInFromText(text: string): boolean | null {
  const qNorm = normalizeText(text);
  if (
    /\b(no\s+(?:tengo|entrego|voy\s+a\s+entregar|llevo|dejo|doy).{0,24}(?:usada|vieja|bateria)|sin\s+(?:entregar|dejar|dar)?\s*(?:la\s+)?(?:bateria\s+)?(?:usada|vieja)|no\s+entrego\b|sin\s+usada\b|no\s+tengo\s+bateria\s+usada|sin\s+entregar\s+bateria)\b/.test(
      qNorm
    )
  ) {
    return false;
  }
  if (
    /\b((?:si|s[ií])\s+(?:tengo|entrego|voy\s+a\s+entregar|llevo|dejo|doy)|entrego\s+(?:la\s+|mi\s+)?(?:bateria\s+)?(?:usada|vieja)|con\s+(?:entrega\s+de\s+)?(?:bateria\s+)?(?:usada|vieja)|a\s+cambio\s+de\s+(?:la\s+)?usada)\b/.test(
      qNorm
    )
  ) {
    return true;
  }
  return null;
}

function pickMaxTwoLubricantCombos(
  vehicle: VehicleProfile | null,
  customerType: CustomerType,
  norm: string
): QuoteOption[] {
  const isDiesel =
    vehicle?.fuel === "diésel" ||
    /d-?max|hilux|wingle|poer|h-?100|dutro|hino|camaronera|diesel|turbo diesel/.test(norm);
  const isFleet = customerType === "camaronera" || /\b(caneca|20\s*l|20l|flota|hino|camion|camaronera)\b/.test(norm);

  let skus: [string, string];
  let labels: [string, string];

  if (isFleet) {
    skus = ["COMBO-MANNOL-3A", "COMBO-MANNOL-3B"];
    labels = [
      "Opción 1 (Trabajo Pesado 15W-40 Caneca 20L)",
      "Opción 2 (Semisintético UHPD 10W-40 Caneca 20L)",
    ];
  } else if (isDiesel) {
    skus = ["COMBO-MANNOL-2A", "COMBO-MANNOL-2B"];
    labels = [
      "Opción 1 (Trabajo Diésel 15W-40 Semisintético)",
      "Opción 2 (Full Sintético 5W-40 Turbo Diésel)",
    ];
  } else if (vehicle?.year && vehicle.year <= 2012) {
    skus = ["COMBO-MANNOL-1A", "COMBO-MANNOL-1C"];
    labels = [
      "Opción 1 (Semisintético 10W-40)",
      "Opción 2 (Alto Kilometraje 20W-50)",
    ];
  } else {
    skus = ["COMBO-MANNOL-1A", "COMBO-MANNOL-1B"];
    labels = [
      "Opción 1 (Semisintético 10W-40)",
      "Opción 2 (100% Sintético 5W-30)",
    ];
  }

  return skus
    .map((sku, idx): QuoteOption | null =>
      buildSingleItemQuoteOption(getCatalogItemBySku(sku), labels[idx], true, false)
    )
    .filter((x): x is QuoteOption => x !== null);
}

type BatterySegment = "heavy_commercial" | "pickup_4x4_diesel_large_suv" | "compact_sedan";

function classifyBatterySegment(
  vehicle: VehicleProfile | null,
  customerType: CustomerType,
  norm: string
): BatterySegment {
  const combined = normalizeText(`${formatVehicleLabel(vehicle)} ${norm}`);

  if (
    customerType === "camaronera" ||
    /\b(hino|dutro|serie\s*300|serie\s*500|nhr|npr|nqr|ftr|fvr|hfc|camion|furgon|camaronera|maquinaria|caterpillar|cummins|perkins|yanmar|bomba|grupo\s*31|n100|n150|4d|8d)\b/.test(
      combined
    )
  ) {
    return "heavy_commercial";
  }

  if (
    vehicle?.fuel === "diésel" ||
    /\b(d-?max|hilux|fortuner|frontier|np300|navara|bt-?50|ranger|f-?150|l200|montero|prado|land\s*cruiser|sorento|santa\s*fe|wingle|poer|rich\s*6|amarok|h-?100|porter|4x4|pickup|camioneta|suv\s*grande|diesel|turbo\s*diesel)\b/.test(
      combined
    )
  ) {
    return "pickup_4x4_diesel_large_suv";
  }

  return "compact_sedan";
}

function pickMaxTwoBatteries(
  vehicle: VehicleProfile | null,
  matchedEntry: { make: string; model: VehicleModelItem } | null,
  city: string | null,
  customerType: CustomerType,
  norm: string
): QuoteOption[] {
  const isPedernales = !city || normalizeText(city) === "pedernales";
  const segment = classifyBatterySegment(vehicle, customerType, norm);

  let candidateSkus: string[] = [];

  if (segment === "heavy_commercial") {
    // Camiones / Maquinaria / Camaroneras: Grupo 31 / N100 / N150 Heavy Duty
    candidateSkus = /\b(n150|160\s*amp|8d|4d)\b/.test(norm)
      ? ["030N150-SHD", "030N100-SHD-I"]
      : ["03031-SHD", "030N100-SHD-I"];
  } else if (segment === "pickup_4x4_diesel_large_suv") {
    // Pickups / 4x4 Diésel / SUVs grandes: ESTRICTAMENTE 85-95 Amp (Grupo 27 o mínimo 24 High Power 85A), NUNCA 64-65 Amp
    const wantsGroup24Hp = /\bgrupo\s*24\b|\b24\s*hp\b/.test(norm);
    candidateSkus = wantsGroup24Hp
      ? ["03024-HP-I", "02727HPIS4"]
      : ["03027-HP", "02727HPS4"];
  } else {
    // Autos sedán / compactos gasolina (55-65 Amp)
    const isCompact42 = /\b(spark|beat|aveo|sail|corsa|picanto|rio|accent|grand\s*i10|yaris|swift|onix)\b/.test(
      normalizeText(`${formatVehicleLabel(vehicle)} ${norm}`)
    );
    if (isCompact42 && BY_SKU.has("03042-FE") && BY_SKU.has("02742HPIS4")) {
      candidateSkus = ["03042-FE", "02742HPIS4"];
    } else {
      const recSkus = (matchedEntry?.model.recommendedCategories.baterias || []).filter((s) => s !== "ECOVLBAT");
      const smallPreferred = recSkus.filter((s) =>
        ["03042-FE", "03034-FE", "03024-FE", "02742HPIS4", "02724HPS4", "02724HPIS4", "02734HPS4"].includes(s)
      );
      const ecBat = smallPreferred.find((s) => s.startsWith("030") && BY_SKU.has(s));
      const boschBat = smallPreferred.find((s) => !s.startsWith("030") && BY_SKU.has(s));
      if (ecBat) candidateSkus.push(ecBat);
      if (boschBat) candidateSkus.push(boschBat);
      if (candidateSkus.length < 2) {
        candidateSkus = isCompact42 ? ["03042-FE", "02742HPIS4"] : ["03024-FE", "02724HPS4"];
      }
    }
  }

  return candidateSkus
    .slice(0, 2)
    .map((sku, idx): QuoteOption | null =>
      buildSingleItemQuoteOption(
        getCatalogItemBySku(sku),
        idx === 0 ? "Opción 1 (Baterías Ecuador)" : "Opción 2 (Bosch)",
        false,
        isPedernales
      )
    )
    .filter((x): x is QuoteOption => x !== null);
}

function searchFreeformCatalog(query: string, limit = 2): CatalogPricingItem[] {
  const qNorm = normalizeText(query);
  const tokens = qNorm
    .split(/[^a-z0-9.-]+/)
    .filter(
      (t) =>
        t.length >= 2 &&
        !["para", "con", "del", "las", "los", "que", "por", "como", "tienen", "precio", "cuanto", "vale", "cuesta"].includes(
          t
        )
    );

  const scored: Array<{ score: number; item: CatalogPricingItem }> = [];
  for (const item of CATALOG) {
    if (item.sku === "ECOVLBAT") continue;
    const hay = normalizeText(`${item.sku} ${item.name} ${item.brand || ""} ${item.category || ""} ${item.presentation || ""}`);
    let score = 0;
    for (const t of tokens) {
      if (normalizeText(item.sku) === t) score += 8;
      else if (hay.includes(t)) score += 3;
    }
    if (score > 0) scored.push({ score, item });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}

export function extractOrderDetailsFromText(
  userText: string,
  lastQuote: LastQuoteSnapshot | null
): OrderCaptureExtraction | null {
  const qNorm = normalizeText(userText);
  const hasPendingOption =
    typeof lastQuote?.selectedOptionIndex === "number" && lastQuote.selectedOptionIndex >= 0;

  const confirmRegex =
    /\b(mandame|enviame|envia|despachame|quiero la|me quedo con|tomo la|confirmo|acept[oa]|perfecto|listo|agendame|traeme|pido la|elijo la)\b/i;
  const optionExplicitRegex =
    /\b(opcion\s*[12]|primera\s+opcion|segunda\s+opcion|la\s+1\b|la\s+2\b|el\s+primero|el\s+segundo|semisintetico|sintetico|bateria\s+ecuador|bateria\s+bosch)\b/i;

  const isConfirming = confirmRegex.test(qNorm) || (Boolean(lastQuote?.options?.length) && optionExplicitRegex.test(qNorm));

  // Extraer nombre, dirección y forma de pago
  let customerName: string | null = null;
  const nameMatch = userText.match(
    /(?:soy|me llamo|mi nombre es|a nombre de|nombre\s*:?)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+){0,2})/i
  );
  if (nameMatch?.[1]) {
    customerName = nameMatch[1]
      .replace(/\b(y|con|en|por|para|pago|transferencia|efectivo)\b.*$/i, "")
      .trim();
  }

  let deliveryAddress: string | null = null;
  const addrMatch = userText.match(
    /(?:en la|a la|en el|al sector|direccion\s*:?|calle|avenida|av\.?|barrio|sector|cdla\.?|ciudadela|frente a|km\s*\d+)\s+([^,;\n]{4,90})/i
  );
  if (addrMatch?.[0]) {
    deliveryAddress = addrMatch[0]
      .replace(/^(a la|en la|en el)\s+/i, "")
      .replace(/\b(pago\s+(en|por|con)|soy\s+).*$/i, "")
      .trim();
  }

  let paymentMethod: string | null = null;
  if (/transferencia/i.test(qNorm)) {
    const bankMatch = userText.match(/(transferencia(?:\s+(?:a|al|por|en))?(?:\s+banco)?\s+(?:pichincha|guayaquil|pac[ií]fico|produbanco))/i);
    paymentMethod = bankMatch ? bankMatch[1].trim() : "Transferencia bancaria";
  } else if (/efectivo|contra\s*entrega|en\s+mano/i.test(qNorm)) {
    paymentMethod = "Efectivo contra entrega";
  } else if (/tarjeta|deuna|de una/i.test(qNorm)) {
    paymentMethod = /deuna|de una/i.test(qNorm) ? "Deuna / Transferencia" : "Tarjeta / Transferencia";
  }

  const providedOrderFields = Boolean(customerName || deliveryAddress || paymentMethod);
  const batteryTradeIn = extractBatteryTradeInFromText(userText) ?? lastQuote?.batteryTradeIn ?? null;
  const quoteHasBattery = Boolean(lastQuote?.options?.some((o) => o.hasBattery || o.items.some((i) => i.isBattery)));

  if (!isConfirming && !(hasPendingOption && (providedOrderFields || (quoteHasBattery && batteryTradeIn !== null)))) {
    return null;
  }

  if (!lastQuote || !Array.isArray(lastQuote.options) || lastQuote.options.length === 0) {
    return null;
  }

  let selectedIdx: number | null =
    typeof lastQuote.selectedOptionIndex === "number" ? lastQuote.selectedOptionIndex : null;

  if (/\b(opcion\s*2|segunda|la\s*2|el\s*segundo|sintetico|bosch)\b/.test(qNorm) && lastQuote.options.length > 1) {
    selectedIdx = 1;
  } else if (/\b(opcion\s*1|primera|la\s*1|el\s*primero|semisintetico|ecuador)\b/.test(qNorm)) {
    selectedIdx = 0;
  } else if (selectedIdx === null && lastQuote.options.length === 1) {
    selectedIdx = 0;
  } else if (selectedIdx === null && isConfirming) {
    selectedIdx = 0;
  }

  const chosenForMissing = selectedIdx !== null ? lastQuote.options[selectedIdx] : lastQuote.options[0];
  const chosenHasBattery = Boolean(
    chosenForMissing?.hasBattery || chosenForMissing?.items.some((i) => i.isBattery)
  );

  const missingFields: OrderCaptureExtraction["missingFields"] = [];
  if (chosenHasBattery && batteryTradeIn === null) missingFields.push("Entrega de batería usada (Sí/No)");
  if (!customerName) missingFields.push("Nombre");
  if (!deliveryAddress) missingFields.push("Dirección/Referencia");
  if (!paymentMethod) missingFields.push("Forma de pago");

  return {
    isConfirmingOrder: true,
    selectedOptionIndex: selectedIdx,
    batteryTradeIn,
    customerName,
    deliveryAddress,
    paymentMethod,
    missingFields,
  };
}

export function buildDeterministicQuotePlan(params: {
  userText: string;
  persistedVehicle: VehicleProfile | null;
  persistedCity: string | null;
  persistedCustomerType: CustomerType;
  persistedLastQuote: LastQuoteSnapshot | null;
  recentHistoryText?: string;
}): DeterministicQuotePlan {
  const {
    userText,
    persistedVehicle,
    persistedCity,
    persistedCustomerType,
    persistedLastQuote,
    recentHistoryText = "",
  } = params;
  const qNorm = normalizeText(userText);

  const cityFound = extractCityFromText(userText);
  const detectedCity = cityFound || persistedCity;
  const detectedCustomerType = extractCustomerType(userText, persistedCustomerType);

  const { profile: turnVehicle, matchedEntry: turnDbEntry } = extractVehicleFromText(userText);
  const effectiveVehicle = mergeVehicleProfiles(persistedVehicle, turnVehicle);
  const effectiveDbEntry = turnDbEntry || resolveDbEntryForProfile(effectiveVehicle);

  const hasKnownVehicle = Boolean(effectiveVehicle?.model || effectiveVehicle?.unmappedLabel);
  const hasAutoTerm =
    hasKnownVehicle ||
    /\b(aceite|lubricante|bateria|filtro|refrigerante|coolant|aditivo|combo|mannol|bosch|ecuador|motor|carro|camioneta|vehiculo|auto|moto|diesel|gasolina|viscosidad|10w|5w|15w|20w|envio|domicilio|pedernales|sri|factura|pago|transferencia|efectivo)\b/.test(
      qNorm
    );

  // 0. Detección prioritaria de confirmación / cierre de venta sobre la cotización previa
  const orderCapture = extractOrderDetailsFromText(userText, persistedLastQuote);
  if (orderCapture && persistedLastQuote) {
    const idx = Math.max(0, Math.min(persistedLastQuote.options.length - 1, orderCapture.selectedOptionIndex ?? 0));
    const rawChosen = persistedLastQuote.options[idx];
    const resolvedItems = rawChosen.items.map((it) => {
      if (it.isBattery && orderCapture.batteryTradeIn !== null) {
        const appliedPrice = orderCapture.batteryTradeIn
          ? (it.priceWithTradeIn ?? it.unitPriceIva)
          : (it.priceWithoutTradeIn ?? it.unitPriceIva);
        const tradeSuffix = orderCapture.batteryTradeIn
          ? " (entregando batería usada)"
          : " (sin entregar batería usada)";
        return {
          ...it,
          name: it.name.includes("batería usada") ? it.name : `${it.name}${tradeSuffix}`,
          unitPriceIva: appliedPrice,
        };
      }
      return it;
    });
    const resolvedTotal = sumExactPricesIva(resolvedItems.map((i) => i.unitPriceIva));
    const chosen: QuotedOptionSnapshot = {
      ...rawChosen,
      items: resolvedItems,
      totalUsd: resolvedTotal,
    };
    if (orderCapture.missingFields.length === 0) {
      return {
        intentTag: "pedido_confirmado",
        needsVehicleDetails: false,
        detectedVehicle: effectiveVehicle,
        matchedModelEntry: effectiveDbEntry,
        detectedCity,
        detectedCustomerType,
        options: [{ ...chosen, qualifiesFreeShipping: chosen.totalUsd >= FREE_SHIPPING_THRESHOLD_USD }],
        matchedSkus: chosen.items.map((i) => i.sku),
        primaryTotalUsd: chosen.totalUsd,
        shippingDeltaUsd: null,
        orderCapture,
        confirmedOption: chosen,
      };
    }
    return {
      intentTag: "cierre_pedido_pendiente_datos",
      needsVehicleDetails: false,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: effectiveDbEntry,
      detectedCity,
      detectedCustomerType,
      options: [{ ...chosen, qualifiesFreeShipping: chosen.totalUsd >= FREE_SHIPPING_THRESHOLD_USD }],
      matchedSkus: chosen.items.map((i) => i.sku),
      primaryTotalUsd: chosen.totalUsd,
      shippingDeltaUsd: null,
      orderCapture,
      confirmedOption: chosen,
    };
  }

  // 1. Escudo anti-preguntas ilógicas (prioritario incluso si menciona 5W-30)
  const illogicalReason = detectIllogicalQuestion(qNorm);
  if (illogicalReason) {
    return {
      intentTag: "pregunta_ilogica",
      needsVehicleDetails: false,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: effectiveDbEntry,
      detectedCity,
      detectedCustomerType,
      ilologicalReason: illogicalReason,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 2. Productos fuera de inventario
  const oosTerm = detectOutOfStockRequest(qNorm);
  if (oosTerm) {
    return {
      intentTag: "producto_sin_stock",
      needsVehicleDetails: false,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: effectiveDbEntry,
      detectedCity,
      detectedCustomerType,
      requestedProductWithoutStock: oosTerm,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 3. Bromas / temas ajenos
  if (detectOffTopic(qNorm, hasAutoTerm)) {
    return {
      intentTag: "fuera_de_tema",
      needsVehicleDetails: false,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: effectiveDbEntry,
      detectedCity,
      detectedCustomerType,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  const wantsBattery = /\b(bateria|baterias|bat|arranque|amperaje|amp)\b/.test(qNorm);
  const wantsOilOrCombo =
    /\b(aceite|lubricante|cambio de aceite|combo|mannol|sintetic[oa]|semisintetic[oa]|mineral|5w-?30|10w-?40|15w-?40|5w-?40|20w-?50|caneca)\b/.test(
      qNorm
    );
  const wantsFilterOrFluid = /\b(filtro|refrigerante|coolant|aditivo|limpiador|liquido de frenos)\b/.test(qNorm);
  const wantsOperationalInfo =
    /\b(ubicados|ubicacion|donde quedan|direccion|horario|atienden|pagos|transferencia|pichincha|guayaquil|pacifico|efectivo|sri|factura)\b/.test(
      qNorm
    );
  const wantsShipping = /\b(envio gratis|cuanto falta|delivery|domicilio|flete|envian|envio a|cooperativa|courier)\b/.test(
    qNorm
  );
  const isAdditiveJoin =
    /\b(y cuanto seria con|y con bateria|mas bateria|junto con|agregar|sumale|con la bateria|con bateria|tambien una bateria)\b/.test(
      qNorm
    );
  const historyHadComboOrOil = /\b(combo|mannol|15w-40|5w-40|10w-40|5w-30|20w-50|cockpit care)\b/i.test(
    recentHistoryText
  );

  // 4. Info operativa (ubicación, formas de pago, horario) cuando no está cotizando producto puntual
  if (wantsOperationalInfo && !wantsBattery && !wantsOilOrCombo && !hasKnownVehicle) {
    return {
      intentTag: "info_operativa",
      needsVehicleDetails: false,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: effectiveDbEntry,
      detectedCity,
      detectedCustomerType,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 5. Envío gratis / cuánto falta con monto explícito
  if (wantsShipping && !wantsBattery && !wantsOilOrCombo && !hasKnownVehicle) {
    const amtMatch = userText.match(/(\d+(?:[.,]\d+)?)/);
    if (amtMatch && !/20\d\d|4x4/.test(amtMatch[1])) {
      const val = parseFloat(amtMatch[1].replace(",", "."));
      if (!Number.isNaN(val) && val > 0 && val < FREE_SHIPPING_THRESHOLD_USD) {
        return {
          intentTag: "envio_delivery",
          needsVehicleDetails: false,
          detectedVehicle: effectiveVehicle,
          matchedModelEntry: effectiveDbEntry,
          detectedCity,
          detectedCustomerType,
          options: [],
          matchedSkus: [],
          primaryTotalUsd: Number(val.toFixed(2)),
          shippingDeltaUsd: Number((FREE_SHIPPING_THRESHOLD_USD - val).toFixed(2)),
          orderCapture: null,
          confirmedOption: null,
        };
      }
    }
    return {
      intentTag: "envio_delivery",
      needsVehicleDetails: false,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: effectiveDbEntry,
      detectedCity,
      detectedCustomerType,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 6. Filtro embudado si falta el vehículo
  if (!hasKnownVehicle && (wantsOilOrCombo || wantsBattery || wantsFilterOrFluid)) {
    const missingHint = wantsBattery
      ? "la marca, modelo y año de tu vehículo"
      : "la marca, modelo, año y si es gasolina o diésel";
    return {
      intentTag: "consulta_precio_sin_vehiculo",
      needsVehicleDetails: true,
      missingFieldHint: missingHint,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: null,
      detectedCity,
      detectedCustomerType,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 7. Consulta combinada (Combo MANNOL + Batería)
  if (hasKnownVehicle && wantsBattery && (wantsOilOrCombo || isAdditiveJoin || historyHadComboOrOil)) {
    const oilOptions = pickMaxTwoLubricantCombos(effectiveVehicle, detectedCustomerType, qNorm);
    const batOptions = pickMaxTwoBatteries(effectiveVehicle, effectiveDbEntry, detectedCity, detectedCustomerType, qNorm);

    const combinedOptions: QuoteOption[] = [];
    if (oilOptions.length > 0 && batOptions.length > 0) {
      const opt1Items = [...oilOptions[0].items, ...batOptions[0].items];
      const opt1With = sumExactPricesIva(
        opt1Items.map((i) => (i.isBattery ? (i.priceWithTradeIn ?? i.unitPriceIva) : i.unitPriceIva))
      );
      const opt1Without = sumExactPricesIva(
        opt1Items.map((i) => (i.isBattery ? (i.priceWithoutTradeIn ?? i.unitPriceIva) : i.unitPriceIva))
      );
      combinedOptions.push({
        label: "Opción 1 (Combo Semisintético + Batería Ecuador)",
        items: opt1Items,
        totalUsd: opt1With,
        hasBattery: true,
        totalWithTradeInUsd: opt1With,
        totalWithoutTradeInUsd: opt1Without,
        includesMannolGift: true,
        includesFreeBatteryInstallPedernales: !detectedCity || normalizeText(detectedCity) === "pedernales",
        qualifiesFreeShipping: opt1With >= FREE_SHIPPING_THRESHOLD_USD,
      });

      const bat2 = batOptions[1] || batOptions[0];
      const oil2 = oilOptions[1] || oilOptions[0];
      const opt2Items = [...oil2.items, ...bat2.items];
      const opt2With = sumExactPricesIva(
        opt2Items.map((i) => (i.isBattery ? (i.priceWithTradeIn ?? i.unitPriceIva) : i.unitPriceIva))
      );
      const opt2Without = sumExactPricesIva(
        opt2Items.map((i) => (i.isBattery ? (i.priceWithoutTradeIn ?? i.unitPriceIva) : i.unitPriceIva))
      );
      combinedOptions.push({
        label: "Opción 2 (Combo Full Sintético + Batería Bosch)",
        items: opt2Items,
        totalUsd: opt2With,
        hasBattery: true,
        totalWithTradeInUsd: opt2With,
        totalWithoutTradeInUsd: opt2Without,
        includesMannolGift: true,
        includesFreeBatteryInstallPedernales: !detectedCity || normalizeText(detectedCity) === "pedernales",
        qualifiesFreeShipping: opt2With >= FREE_SHIPPING_THRESHOLD_USD,
      });
    }

    const finalOptions = combinedOptions.slice(0, 2);
    const skus = Array.from(new Set(finalOptions.flatMap((o) => o.items.map((i) => i.sku))));
    return {
      intentTag: "bateria_y_combo",
      needsVehicleDetails: false,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: effectiveDbEntry,
      detectedCity,
      detectedCustomerType,
      options: finalOptions,
      matchedSkus: skus,
      primaryTotalUsd: finalOptions[0]?.totalUsd ?? null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 8. Solo Batería (con vehículo conocido o persistido)
  if (wantsBattery && hasKnownVehicle) {
    const batOptions = pickMaxTwoBatteries(effectiveVehicle, effectiveDbEntry, detectedCity, detectedCustomerType, qNorm);
    const skus = Array.from(new Set(batOptions.flatMap((o) => o.items.map((i) => i.sku))));
    return {
      intentTag: "bateria_domicilio",
      needsVehicleDetails: false,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: effectiveDbEntry,
      detectedCity,
      detectedCustomerType,
      options: batOptions,
      matchedSkus: skus,
      primaryTotalUsd: batOptions[0]?.totalUsd ?? null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 9. Vehículo identificado: máximo 2 Combos MANNOL
  if (hasKnownVehicle && (!wantsFilterOrFluid || wantsOilOrCombo)) {
    const oilOptions = pickMaxTwoLubricantCombos(effectiveVehicle, detectedCustomerType, qNorm);
    const skus = Array.from(new Set(oilOptions.flatMap((o) => o.items.map((i) => i.sku))));
    return {
      intentTag: wantsOilOrCombo ? "combo_lubricante" : "cotizacion_vehiculo",
      needsVehicleDetails: false,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: effectiveDbEntry,
      detectedCity,
      detectedCustomerType,
      options: oilOptions,
      matchedSkus: skus,
      primaryTotalUsd: oilOptions[0]?.totalUsd ?? null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 10. Filtros / Refrigerantes / Aditivos específicos
  if (wantsFilterOrFluid) {
    const matches = searchFreeformCatalog(userText, 2);
    const options: QuoteOption[] = matches.map((m, idx) => {
      const price = resolveCatalogPriceIva(m);
      return {
        label: idx === 0 ? "Opción 1" : "Opción 2",
        items: [
          {
            sku: m.sku,
            name: formatHumanProductName(m.sku, m.name),
            brand: m.brand,
            presentation: m.presentation,
            unitPriceIva: price,
          },
        ],
        totalUsd: price,
        includesMannolGift: false,
        includesFreeBatteryInstallPedernales: false,
        qualifiesFreeShipping: price >= FREE_SHIPPING_THRESHOLD_USD,
      };
    });
    return {
      intentTag: "filtro_refrigerante_aditivo",
      needsVehicleDetails: false,
      detectedVehicle: effectiveVehicle,
      matchedModelEntry: effectiveDbEntry,
      detectedCity,
      detectedCustomerType,
      options,
      matchedSkus: matches.map((m) => m.sku),
      primaryTotalUsd: options[0]?.totalUsd ?? null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 11. Saludo / general
  const isGreeting = /^(hola|buenos dias|buenas tardes|buenas noches|saludos|que tal|hey)\b/.test(qNorm) && qNorm.length < 40;
  return {
    intentTag: isGreeting ? "saludo" : "general",
    needsVehicleDetails: !hasKnownVehicle,
    missingFieldHint: "la marca, modelo y año de tu vehículo",
    detectedVehicle: effectiveVehicle,
    matchedModelEntry: effectiveDbEntry,
    detectedCity,
    detectedCustomerType,
    options: [],
    matchedSkus: [],
    primaryTotalUsd: null,
    shippingDeltaUsd: null,
    orderCapture: null,
    confirmedOption: null,
  };
}
