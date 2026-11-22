import privatePricing from "@/data/privatePricing.server.json";
import { VEHICLE_DATABASE, type VehicleMake, type VehicleModelItem } from "@/data/vehicles";
import type {
  CartItem,
  CommercialState,
  CustomerType,
  LastQuoteSnapshot,
  QuotedOptionSnapshot,
  SalesStage,
  VehicleProfile,
} from "@/lib/hermesDb";
import {
  resolveMulticategoryCatalogQuery,
  type IndexedCatalogEntry,
  type MiloSubCategory,
} from "@/lib/miloCatalogIndex";

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
  retail_hidden?: boolean;
}

export type HermesIntentTag =
  | "cotizacion_vehiculo"
  | "consulta_precio_sin_vehiculo"
  | "bateria_domicilio"
  | "bateria_y_combo"
  | "combo_lubricante"
  | "filtro_refrigerante_aditivo"
  | "milo_multicategoria"
  | "resumen_carrito"
  | "cierre_pedido_pendiente_datos"
  | "pedido_confirmado"
  | "info_operativa"
  | "envio_delivery"
  | "b2b_flota"
  | "escalamiento_humano"
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
  missingRequestedItems: string[];
  matchedSubCategories: MiloSubCategory[];
  multicategoryNote?: string | null;
  multicategoryItems: IndexedCatalogEntry[];
  ilologicalReason?: string;
  hasPriceObjection: boolean;
  batteryTradeInExplicit: boolean | null;
  preferredBatteryBrand?: "ecuador" | "bosch" | null;
  salesStage: SalesStage;
  cartItems: CartItem[];
  lastSuggestedItems: CartItem[];
  discussedCategories: string[];
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
  { make: "Volkswagen / Renault", modelKeyword: "Amarok", regex: /\bamarok\b/i, defaultFuel: "diésel" },
  { make: "Volkswagen / Renault", modelKeyword: "Duster", regex: /\b(duster|logan|sandero)\b/i, defaultFuel: "gasolina" },
  { make: "Dongfeng / Chery / Jetour", modelKeyword: "Rich 6", regex: /\brich\s*6\b/i, defaultFuel: "diésel" },
  { make: "Dongfeng / Chery / Jetour", modelKeyword: "Tiggo 2", regex: /\b(tiggo\s*2|x70)\b/i, defaultFuel: "gasolina" },
  { make: "Hino", modelKeyword: "Dutro", regex: /\b(hino|dutro|serie\s*300)\b/i, defaultFuel: "diésel" },
  { make: "Hino", modelKeyword: "Serie 500", regex: /\b(serie\s*500)\b/i, defaultFuel: "diésel" },
  { make: "Motos Multimarca", modelKeyword: "Pulsar", regex: /\bpulsar\b/i, defaultFuel: "moto" },
  { make: "Motos Multimarca", modelKeyword: "Shineray", regex: /\b(shineray|daytona)\b/i, defaultFuel: "moto" },
  { make: "Motos Multimarca", modelKeyword: "Honda", regex: /\b(cb190|wave|cg125|fz16|ybr|moto)\b/i, defaultFuel: "moto" },
  { make: "Sector Camaronero", modelKeyword: "Bombas", regex: /\b(camaronera|bomba fluvial|estacionario|caterpillar|cummins|perkins|yanmar)\b/i, defaultFuel: "diésel" },
];

const UNMAPPED_VEHICLE_REGEX =
  /\b((?:chery\s+)?tiggo\s*[3478](?:\s*pro(?:\s*max)?)?|(?:volkswagen|vw)\s+(?:gol|polo|jetta|bora|virtus|t-?cross|taos)|\bgol\b(?:\s+sedan)?|jetta|bora|polo|virtus|prado|land\s*cruiser|rush|agya|raize|captiva|groove|trailblazer|blazer|sorento|sonata|elantra|creta|santa\s*fe|tucson\s*ix|changan\s*(?:cs\d+|alsvin|hunter)?|cs35|cs55|geely\s*(?:coolray|gx3)?|coolray|dfsk\s*(?:glory\s*\d*)?|glory\s*\d*|l200|montero|asx|outlander|kicks|note|pathfinder|kwid|koleos|cx[-\s]?30|arrizo\s*\d*|jetour\s*(?:dashing|x70|t2)?)\b/i;

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
  else if (/\bgasolina\b/.test(norm) && !/\b(traga|tragando|gasta|ahorra|limpia\s+inyector|inyector)\w*\s+gasolina\b/.test(norm)) {
    fuel = "gasolina";
  } else if (/\b(moto|motocicleta)\b/.test(norm)) fuel = "moto";
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
  const isWorkshopSprayOrAdditive = /\b(limpiador|limpia\s+frenos|tratamiento|aditivo|spray|espuma|llanta\s+doctor|sellador|tapa\s*fugas?|refrigerante|coolant)\b/.test(norm);

  if (!isWorkshopSprayOrAdditive && /\b(llantas?|neumaticos?|cauchos?|rin(?:es)?\s*\d*|aros?)\b/.test(norm)) {
    return "llantas / neumáticos";
  }
  if (!isWorkshopSprayOrAdditive && /\b(pastillas?|balatas?|discos?\s+de\s+freno|tambores?)\b/.test(norm)) {
    return "pastillas / discos de freno";
  }
  if (!isWorkshopSprayOrAdditive && /\b(zapatas?)\b/.test(norm)) {
    return "zapatas de freno";
  }
  if (!isWorkshopSprayOrAdditive && /\b(parabrisas?|vidrios?|plumillas?|limpiaparabrisas?)\b/.test(norm)) {
    return "parabrisas / plumillas";
  }
  if (/\b(amortiguador(?:es)?|terminales?|rotulas?|bujes?|mesas?|cremallera|suspension)\b/.test(norm)) {
    return "amortiguadores / suspensión";
  }
  if (/\b(bujias?|bobinas?|cables?\s+de\s+bujia)\b/.test(norm)) {
    return "bujías / encendido";
  }
  if (!isWorkshopSprayOrAdditive && /\b(kit\s+de\s+clutch|clutch|prensa|collarin)\b/.test(norm)) {
    return "kit de embrague";
  }
  if (!isWorkshopSprayOrAdditive && /\b(correas?\s+de\s+distribucion|tensores?|alternador|arranque|faros?|retrovisor(?:es)?)\b/.test(norm)) {
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
  if (!item || item.sku === "ECOVLBAT" || item.retail_hidden) return null;
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

export function pickMaxTwoLubricantCombos(
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

export function pickMaxTwoBatteries(
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
    candidateSkus = /\b(n150|160\s*amp|8d|4d)\b/.test(norm)
      ? ["030N150-SHD", "030N100-SHD-I"]
      : ["03031-SHD", "030N100-SHD-I"];
  } else if (segment === "pickup_4x4_diesel_large_suv") {
    const wantsGroup24Hp = /\bgrupo\s*24\b|\b24\s*hp\b/.test(norm);
    candidateSkus = wantsGroup24Hp ? ["03024-HP-I", "02727HPIS4"] : ["03027-HP", "02727HPS4"];
  } else {
    const isCompact42 = /\b(spark|beat|aveo|sail|corsa|picanto|rio|accent|grand\s*i10|yaris|swift|onix|gol|polo|jetta|bora|virtus|tiggo\s*[2347]|groove|coolray|kicks|kwid|soluto)\b/.test(
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

export function extractOrderDetailsFromText(
  userText: string,
  lastQuote: LastQuoteSnapshot | null
): OrderCaptureExtraction | null {
  const qNorm = normalizeText(userText);
  const hasPendingOption =
    typeof lastQuote?.selectedOptionIndex === "number" && lastQuote.selectedOptionIndex >= 0;

  // No disparar cierre cuando el cliente pregunta precio ("cuánto me queda", "cuánto sale", "qué precio") sin dar dirección/pago
  const isPriceInquiryOnly =
    /\b(cuant[oa]\s+(?:me\s+)?(?:queda|sale|salen|cuesta|vale|seria)|que\s+precio|cuanto\s+con)\b/i.test(qNorm) &&
    !/\b(mandame|enviame|envia|despachame|listo|confirmo|pago|transferencia|efectivo|vivo\s+en|calle|avenida|malecon|sector)\b/i.test(
      qNorm
    );
  if (isPriceInquiryOnly) {
    return null;
  }

  const confirmRegex =
    /\b(mandame|enviame|envia|despachame|quiero la|me quedo con|tomo la|confirmo|acept[oa]|perfecto|listo|agendame|traeme|pido la|elijo la)\b/i;
  const optionExplicitRegex =
    /\b(opcion\s*[12]|primera\s+opcion|segunda\s+opcion|la\s+1\b|la\s+2\b|el\s+primero|el\s+segundo|semisintetico|sintetico|bateria\s+ecuador|bateria\s+bosch)\b/i;

  const isConfirming = confirmRegex.test(qNorm) || (Boolean(lastQuote?.options?.length) && optionExplicitRegex.test(qNorm));

  let customerName: string | null = null;
  const nameMatch = userText.match(
    /(?:soy|me llamo|mi nombre es|a nombre de|nombre\s*:?)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+){0,2})/i
  );
  if (nameMatch?.[1]) {
    customerName = nameMatch[1]
      .replace(/\b(y|con|en|por|para|vivo|pago|transferencia|efectivo)\b.*$/i, "")
      .trim();
  }

  let deliveryAddress: string | null = null;
  const addrMatch = userText.match(
    /(?:vivo en(?:\s+el|\s+la)?|en la|a la|en el|al sector|direccion\s*:?|calle|avenida|av\.?|barrio|sector|cdla\.?|ciudadela|malecon|malec[oó]n|frente a|km\s*\d+)\s+([^,;\n]{4,90})/i
  );
  if (addrMatch?.[0]) {
    deliveryAddress = addrMatch[0]
      .replace(/^(vivo en(?:\s+el|\s+la)?|a la|en la|en el)\s+/i, "")
      .replace(/\b(pago\s+(en|por|con)|soy\s+).*$/i, "")
      .trim();
  }

  let paymentMethod: string | null = null;
  if (/transferencia/i.test(qNorm)) {
    const bankMatch = userText.match(
      /(transferencia(?:\s+(?:a|al|por|en))?(?:\s+banco)?\s+(?:pichincha|guayaquil|pac[ií]fico|produbanco))/i
    );
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

  // Require at least an explicit confirm cue OR explicit option selection OR 2 order fields so shipping questions don't falsely lock into order pending
  if (!isConfirming && !providedOrderFields) {
    return null;
  }

  let selectedIdx: number | null =
    typeof lastQuote.selectedOptionIndex === "number" ? lastQuote.selectedOptionIndex : null;

  if (/\b(opcion\s*2|segunda|la\s*2|el\s*segundo|sintetico|bosch)\b/.test(qNorm) && lastQuote.options.length > 1) {
    selectedIdx = 1;
  } else if (/\b(opcion\s*1|primera|la\s*1|el\s*primero|semisintetico|ecuador)\b/.test(qNorm)) {
    selectedIdx = 0;
  } else if (selectedIdx === null) {
    selectedIdx = 0;
  }

  const chosenForMissing = lastQuote.options[selectedIdx] || lastQuote.options[0];
  const chosenHasBattery = Boolean(chosenForMissing?.hasBattery || chosenForMissing?.items.some((i) => i.isBattery));

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

function mergeDistinctCartItems(existing: CartItem[], additions: CartItem[]): CartItem[] {
  const out = [...existing.map((i) => ({ ...i }))];
  for (const add of additions) {
    const idx = out.findIndex((x) => x.sku.toUpperCase() === add.sku.toUpperCase());
    if (idx < 0) {
      out.push({ ...add, qty: add.qty || 1 });
    }
  }
  return out;
}

function entryToCartItem(entry: IndexedCatalogEntry): CartItem {
  return {
    sku: entry.sku,
    name: formatHumanProductName(entry.sku, entry.name),
    brand: entry.brand,
    presentation: entry.presentation,
    unitPriceIva: entry.priceIva,
    qty: 1,
    subCategory: entry.subCategory,
  };
}

function indexedEntryToOption(entry: IndexedCatalogEntry, idx: number, normCity: string | null): QuoteOption {
  const isPed = !normCity || normCity === "pedernales";
  const batPrice = computeBatteryDiscountPricing({
    sku: entry.sku,
    brand: entry.brand,
    category: entry.rawCategory,
    name: entry.name,
    presentation: entry.presentation,
    quoted_pvp_iva: entry.priceIva,
  });
  const unitPrice = batPrice ? batPrice.priceWithTradeIn : entry.priceIva;
  return {
    label: idx === 0 ? "Opción 1" : `Opción ${idx + 1}`,
    items: [
      {
        sku: entry.sku,
        name: formatHumanProductName(entry.sku, entry.name),
        brand: entry.brand,
        presentation: entry.presentation,
        unitPriceIva: unitPrice,
        ...(batPrice
          ? {
              listPriceIva: batPrice.listPriceIva,
              isBattery: true,
              batteryBrand: batPrice.batteryBrand,
              priceWithTradeIn: batPrice.priceWithTradeIn,
              priceWithoutTradeIn: batPrice.priceWithoutTradeIn,
              discountPctWithTradeIn: batPrice.discountPctWithTradeIn,
              discountPctWithoutTradeIn: batPrice.discountPctWithoutTradeIn,
            }
          : {}),
      },
    ],
    totalUsd: unitPrice,
    ...(batPrice
      ? {
          hasBattery: true,
          totalWithTradeInUsd: batPrice.priceWithTradeIn,
          totalWithoutTradeInUsd: batPrice.priceWithoutTradeIn,
        }
      : {}),
    includesMannolGift: entry.subCategory === "combos_mannol",
    includesFreeBatteryInstallPedernales: Boolean(batPrice) && isPed,
    qualifiesFreeShipping: unitPrice >= FREE_SHIPPING_THRESHOLD_USD,
  };
}

export function buildDeterministicQuotePlan(params: {
  userText: string;
  persistedVehicle: VehicleProfile | null;
  persistedCity: string | null;
  persistedCustomerType: CustomerType;
  persistedLastQuote: LastQuoteSnapshot | null;
  persistedCommercialState?: CommercialState | null;
  recentHistoryText?: string;
}): DeterministicQuotePlan {
  const {
    userText,
    persistedVehicle,
    persistedCity,
    persistedCustomerType,
    persistedLastQuote,
    persistedCommercialState,
    recentHistoryText = "",
  } = params;

  const qNorm = normalizeText(userText);
  const prevState: CommercialState = persistedCommercialState || {
    cartItems: [],
    discussedCategories: [],
    batteryTradeIn: persistedLastQuote?.batteryTradeIn ?? null,
    salesStage: "descubrimiento",
    lastSuggestedItems: [],
  };

  const cityFound = extractCityFromText(userText);
  const detectedCity = cityFound || persistedCity;
  const detectedCustomerType = extractCustomerType(userText, persistedCustomerType);

  const { profile: turnVehicle, matchedEntry: turnDbEntry } = extractVehicleFromText(userText);
  const effectiveVehicle = mergeVehicleProfiles(persistedVehicle, turnVehicle);
  const effectiveDbEntry = turnDbEntry || resolveDbEntryForProfile(effectiveVehicle);

  const explicitTradeIn = extractBatteryTradeInFromText(userText);
  const effectiveTradeIn = explicitTradeIn ?? prevState.batteryTradeIn ?? persistedLastQuote?.batteryTradeIn ?? null;

  const hasKnownVehicle = Boolean(effectiveVehicle?.model || effectiveVehicle?.unmappedLabel);
  const hasAutoTerm =
    hasKnownVehicle ||
    /\b(aceite|lubricante|bateria|filtro|refrigerante|coolant|aditivo|grasa|rodamiento|cruceta|tablero|cockpit|carburador|aceleracion|inyector|flush|hidraulico|iso\s*\d+|transmision|caja|diferencial|combo|mannol|abro|simoniz|areon|bosch|ecuador|motor|carro|camioneta|vehiculo|auto|moto|diesel|gasolina|viscosidad|10w|5w|15w|20w|envio|domicilio|pedernales|jama|sri|factura|pago|transferencia|efectivo)\b/.test(
      qNorm
    );

  const baseStateOut = {
    detectedVehicle: effectiveVehicle,
    matchedModelEntry: effectiveDbEntry,
    detectedCity,
    detectedCustomerType,
    hasPriceObjection: /\b(un\s+poco\s+car[ao]|muy\s+car[ao]|carisim[ao]|caro\b|costos[oa]|rebaja|descuento\s+extra)\b/.test(qNorm),
    batteryTradeInExplicit: explicitTradeIn,
    preferredBatteryBrand: /\becuador\b/.test(qNorm) ? ("ecuador" as const) : /\bbosch\b/.test(qNorm) ? ("bosch" as const) : null,
    discussedCategories: [...(prevState.discussedCategories || [])],
    cartItems: [...(prevState.cartItems || [])],
    lastSuggestedItems: [...(prevState.lastSuggestedItems || [])],
    missingRequestedItems: [] as string[],
    matchedSubCategories: [] as MiloSubCategory[],
    multicategoryItems: [] as IndexedCatalogEntry[],
    multicategoryNote: null as string | null,
  };

  // 0. Priority checkout / order confirmation over active cart or last quote
  const orderCapture = extractOrderDetailsFromText(userText, persistedLastQuote);
  if (orderCapture && persistedLastQuote) {
    const idx = Math.max(0, Math.min(persistedLastQuote.options.length - 1, orderCapture.selectedOptionIndex ?? 0));
    const rawChosen = persistedLastQuote.options[idx];
    const resolvedItems = rawChosen.items.map((it) => {
      if (it.isBattery && orderCapture.batteryTradeIn !== null) {
        const appliedPrice = orderCapture.batteryTradeIn
          ? it.priceWithTradeIn ?? it.unitPriceIva
          : it.priceWithoutTradeIn ?? it.unitPriceIva;
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
    const nextStage: SalesStage = orderCapture.missingFields.length === 0 ? "pedido_confirmado" : "cierre";
    return {
      ...baseStateOut,
      intentTag: orderCapture.missingFields.length === 0 ? "pedido_confirmado" : "cierre_pedido_pendiente_datos",
      needsVehicleDetails: false,
      salesStage: nextStage,
      options: [{ ...chosen, qualifiesFreeShipping: chosen.totalUsd >= FREE_SHIPPING_THRESHOLD_USD }],
      matchedSkus: chosen.items.map((i) => i.sku),
      primaryTotalUsd: chosen.totalUsd,
      shippingDeltaUsd: null,
      orderCapture,
      confirmedOption: chosen,
    };
  }

  // 1. Escudo anti-preguntas ilógicas
  const illogicalReason = detectIllogicalQuestion(qNorm);
  if (illogicalReason) {
    return {
      ...baseStateOut,
      intentTag: "pregunta_ilogica",
      needsVehicleDetails: false,
      salesStage: prevState.salesStage,
      ilologicalReason: illogicalReason,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 2. Productos puramente fuera de inventario (pastillas, llantas, parabrisas, etc.)
  const oosTerm = detectOutOfStockRequest(qNorm);
  if (oosTerm) {
    return {
      ...baseStateOut,
      intentTag: "producto_sin_stock",
      needsVehicleDetails: false,
      salesStage: prevState.salesStage,
      requestedProductWithoutStock: oosTerm,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 3. Temas ajenos al negocio automotriz
  if (detectOffTopic(qNorm, hasAutoTerm)) {
    return {
      ...baseStateOut,
      intentTag: "fuera_de_tema",
      needsVehicleDetails: false,
      salesStage: prevState.salesStage,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 4. Señales de intención comercial
  const isAddToCartCue = /\b(sumale|sumalo|agregale|agrega|anadele|anade|ponle\s+tambien)\b/.test(qNorm);
  const isCombinedTotalQuery =
    /\b(cuant[oa]\s+(?:sale|salen|cuesta|cuestan|seria)\s+(?:todo\s+eso|los\s+dos|los\s+tres|ambos|eso)?\s*junt[oa]s?|cuant[oa]\s+(?:sale|es)\s+todo\s*(?:eso)?(?:\s+junto)?|los\s+dos\s+juntos|total\s+de\s+todo|juntos\s+con\s+iva)\b/.test(
      qNorm
    );

  const wantsOperationalInfo =
    /\b(ubicados|ubicacion|donde quedan|direccion|horario|abiertos|retirar|atienden|pagos|transferencia|pichincha|guayaquil|pacifico|aceptan|efectivo|sri|factura)\b/.test(
      qNorm
    );
  const wantsShipping =
    /\b(envio\s+gratis|cuanto\s+falta|delivery|envian|envio\s+a|hoy\s+mismo|cooperativa|courier)\b/.test(qNorm);

  const wantsBattery = /\b(bateria|baterias|bat|arranque|amperaje|amp)\b/.test(qNorm) || (explicitTradeIn !== null && Boolean(persistedLastQuote?.options.some((o) => o.hasBattery)));
  const mentionsNonEngineOil =
    /\b(aceite\s+(?:de\s+|para\s+)?(?:caja|transmision|diferencial|corona|cocina|comestible|vegetal|hidraulic[oa])|hidraulic[oa]|iso\s*(?:32|46|68)|atf|cvt|dexron|75w-?90|80w-?90|85w-?140)\b/.test(
      qNorm
    );
  const wantsEngineOilOrCombo =
    !mentionsNonEngineOil &&
    /\b(aceite\s+de\s+motor|aceite\s+para\s+motor|cambio\s+de\s+aceite|combo\s+mannol|lubricante|5w-?30|10w-?40|15w-?40|5w-?40|20w-?50)\b/.test(
      qNorm
    );
  const asksPlainOilWord = !mentionsNonEngineOil && /\baceite\b/.test(qNorm);

  // 5. Suma de carrito combinado ("¿Cuánto sale todo eso junto?", "¿Cuánto salen los dos juntos con IVA?")
  if (isCombinedTotalQuery && !isAddToCartCue) {
    const activeBasket =
      baseStateOut.cartItems.length >= 2
        ? baseStateOut.cartItems
        : mergeDistinctCartItems(baseStateOut.cartItems, baseStateOut.lastSuggestedItems);

    if (activeBasket.length > 0) {
      const exactTotal = sumExactPricesIva(activeBasket.map((i) => i.unitPriceIva * (i.qty || 1)));
      const cartOption: QuoteOption = {
        label: "Resumen de Tu Pedido",
        items: activeBasket.map((i) => ({
          sku: i.sku,
          name: i.name,
          brand: i.brand,
          presentation: i.presentation,
          unitPriceIva: i.unitPriceIva,
        })),
        totalUsd: exactTotal,
        includesMannolGift: false,
        includesFreeBatteryInstallPedernales: false,
        qualifiesFreeShipping: exactTotal >= FREE_SHIPPING_THRESHOLD_USD,
      };
      return {
        ...baseStateOut,
        cartItems: activeBasket,
        intentTag: "resumen_carrito",
        needsVehicleDetails: false,
        salesStage: "cotizacion",
        options: [cartOption],
        matchedSkus: activeBasket.map((i) => i.sku),
        primaryTotalUsd: exactTotal,
        shippingDeltaUsd: exactTotal < FREE_SHIPPING_THRESHOLD_USD ? Number((FREE_SHIPPING_THRESHOLD_USD - exactTotal).toFixed(2)) : 0,
        orderCapture: null,
        confirmedOption: null,
      };
    }
  }

  // 6. Consulta multicategoría / producto específico sobre los 426 SKUs (CERO SESGO A ACEITE DE MOTOR)
  const isPureVehicleIntro =
    Boolean(turnVehicle?.model || turnVehicle?.unmappedLabel) &&
    !/\b(filtro|filtros|aditivo|grasa|refrigerante|coolant|caja|transmision|diferencial|atf|cvt|tablero|cockpit|carburador|flush|inyector|hidraulic|iso|spray|frenos)\b/.test(
      qNorm
    );
  const multiResRaw = wantsBattery || isPureVehicleIntro ? null : resolveMulticategoryCatalogQuery(userText, effectiveVehicle);
  const multiRes =
    multiResRaw && multiResRaw.matchedSubCategories.every((c) => c === "baterias") ? null : multiResRaw;
  if (multiRes) {
    // Pure single missing request with zero in-stock products (e.g. "¿tienen líquido de frenos?" alone)
    if (multiRes.items.length === 0 && multiRes.missingItems.length > 0) {
      return {
        ...baseStateOut,
        missingRequestedItems: multiRes.missingItems,
        requestedProductWithoutStock: multiRes.missingItems.join(", "),
        intentTag: "producto_sin_stock",
        needsVehicleDetails: false,
        salesStage: prevState.salesStage,
        options: [],
        matchedSkus: [],
        primaryTotalUsd: null,
        shippingDeltaUsd: null,
        orderCapture: null,
        confirmedOption: null,
      };
    }

    const normCity = detectedCity ? normalizeText(detectedCity) : null;
    const options = multiRes.items.map((entry, idx) => indexedEntryToOption(entry, idx, normCity));
    const primaryItem = multiRes.items[0];
    const primaryCartEntry = primaryItem ? entryToCartItem(primaryItem) : null;

    let nextSuggested = [...baseStateOut.lastSuggestedItems];
    if (primaryCartEntry) {
      // Avoid replacing another category; keep accumulating top suggested item per distinct subcategory/product
      const existingSameSku = nextSuggested.findIndex((x) => x.sku.toUpperCase() === primaryCartEntry.sku.toUpperCase());
      if (existingSameSku < 0) {
        nextSuggested.push(primaryCartEntry);
        if (nextSuggested.length > 6) nextSuggested = nextSuggested.slice(-6);
      }
    }

    let nextCart = [...baseStateOut.cartItems];
    let combinedCartOption: QuoteOption | null = null;
    if (isAddToCartCue && primaryCartEntry) {
      nextCart = mergeDistinctCartItems(
        nextCart.length > 0 ? nextCart : baseStateOut.lastSuggestedItems,
        [primaryCartEntry]
      );
      if (nextCart.length >= 2) {
        const runningTotal = sumExactPricesIva(nextCart.map((i) => i.unitPriceIva * (i.qty || 1)));
        combinedCartOption = {
          label: "Carrito Acumulado",
          items: nextCart.map((i) => ({
            sku: i.sku,
            name: i.name,
            brand: i.brand,
            presentation: i.presentation,
            unitPriceIva: i.unitPriceIva,
          })),
          totalUsd: runningTotal,
          includesMannolGift: false,
          includesFreeBatteryInstallPedernales: false,
          qualifiesFreeShipping: runningTotal >= FREE_SHIPPING_THRESHOLD_USD,
        };
      }
    }

    const nextDiscussed = Array.from(
      new Set([...baseStateOut.discussedCategories, ...multiRes.matchedSubCategories])
    );
    const primaryTotal = combinedCartOption ? combinedCartOption.totalUsd : options[0]?.totalUsd ?? null;

    return {
      ...baseStateOut,
      intentTag: "milo_multicategoria",
      needsVehicleDetails: false,
      salesStage: baseStateOut.hasPriceObjection ? "objecion" : "cotizacion",
      missingRequestedItems: multiRes.missingItems,
      matchedSubCategories: multiRes.matchedSubCategories,
      multicategoryNote: multiRes.note,
      multicategoryItems: multiRes.items,
      cartItems: nextCart,
      lastSuggestedItems: nextSuggested,
      discussedCategories: nextDiscussed,
      options: combinedCartOption ? [...options.slice(0, 2), combinedCartOption] : options.slice(0, 3),
      matchedSkus: Array.from(new Set([...multiRes.items.map((i) => i.sku), ...nextCart.map((i) => i.sku)])),
      primaryTotalUsd: primaryTotal,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 7. Info operativa / logística / horarios / factura SRI / bancos / envíos (NO desviar a aceites incluso con vehículo guardado!)
  if (wantsOperationalInfo && !wantsBattery && !wantsEngineOilOrCombo) {
    return {
      ...baseStateOut,
      intentTag: "info_operativa",
      needsVehicleDetails: false,
      salesStage: prevState.salesStage,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  if (wantsShipping && !wantsBattery && !wantsEngineOilOrCombo) {
    const amtMatch = userText.match(/(\d+(?:[.,]\d+)?)/);
    let primaryVal: number | null = null;
    let deltaVal: number | null = null;
    if (amtMatch && !/20\d\d|4x4/.test(amtMatch[1])) {
      const val = parseFloat(amtMatch[1].replace(",", "."));
      if (!Number.isNaN(val) && val > 0 && val < FREE_SHIPPING_THRESHOLD_USD) {
        primaryVal = Number(val.toFixed(2));
        deltaVal = Number((FREE_SHIPPING_THRESHOLD_USD - val).toFixed(2));
      }
    }
    return {
      ...baseStateOut,
      intentTag: "envio_delivery",
      needsVehicleDetails: false,
      salesStage: prevState.salesStage,
      options: [],
      matchedSkus: [],
      primaryTotalUsd: primaryVal,
      shippingDeltaUsd: deltaVal,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 8. Filtro embudado SOLO cuando falta vehículo para lubricante de motor, filtro específico de motor o batería
  const wantsFilterByVehicle = /\b(filtro|filtros)\b/.test(qNorm);
  if (!hasKnownVehicle && (wantsEngineOilOrCombo || asksPlainOilWord || wantsBattery || wantsFilterByVehicle)) {
    const missingHint = wantsBattery
      ? "la marca, modelo y año de tu vehículo"
      : "la marca, modelo, año y si es gasolina o diésel";
    return {
      ...baseStateOut,
      intentTag: "consulta_precio_sin_vehiculo",
      needsVehicleDetails: true,
      missingFieldHint: missingHint,
      matchedModelEntry: null,
      salesStage: "descubrimiento",
      options: [],
      matchedSkus: [],
      primaryTotalUsd: null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 9. Consulta combinada explícita (Combo MANNOL + Batería)
  const wantsExplicitComboWithBattery =
    /\b(con\s+(?:la\s+)?bateria|mas\s+(?:la\s+)?bateria|junto\s+con\s+(?:la\s+)?bateria|combo.{0,15}bateria)\b/.test(
      qNorm
    ) && /\b(combo|mannol|aceite|y con bateria)\b/.test(`${qNorm} ${recentHistoryText}`);

  if (hasKnownVehicle && wantsBattery && (wantsEngineOilOrCombo || wantsExplicitComboWithBattery)) {
    const oilOptions = pickMaxTwoLubricantCombos(effectiveVehicle, detectedCustomerType, qNorm);
    const batOptions = pickMaxTwoBatteries(effectiveVehicle, effectiveDbEntry, detectedCity, detectedCustomerType, qNorm);

    const combinedOptions: QuoteOption[] = [];
    if (oilOptions.length > 0 && batOptions.length > 0) {
      const opt1Items = [...oilOptions[0].items, ...batOptions[0].items];
      const opt1With = sumExactPricesIva(
        opt1Items.map((i) => (i.isBattery ? i.priceWithTradeIn ?? i.unitPriceIva : i.unitPriceIva))
      );
      const opt1Without = sumExactPricesIva(
        opt1Items.map((i) => (i.isBattery ? i.priceWithoutTradeIn ?? i.unitPriceIva : i.unitPriceIva))
      );
      combinedOptions.push({
        label: "Opción 1 (Combo Semisintético + Batería Ecuador)",
        items: opt1Items,
        totalUsd: effectiveTradeIn === false ? opt1Without : opt1With,
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
        opt2Items.map((i) => (i.isBattery ? i.priceWithTradeIn ?? i.unitPriceIva : i.unitPriceIva))
      );
      const opt2Without = sumExactPricesIva(
        opt2Items.map((i) => (i.isBattery ? i.priceWithoutTradeIn ?? i.unitPriceIva : i.unitPriceIva))
      );
      combinedOptions.push({
        label: "Opción 2 (Combo Full Sintético + Batería Bosch)",
        items: opt2Items,
        totalUsd: effectiveTradeIn === false ? opt2Without : opt2With,
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
      ...baseStateOut,
      intentTag: "bateria_y_combo",
      needsVehicleDetails: false,
      salesStage: baseStateOut.hasPriceObjection ? "objecion" : "cotizacion",
      discussedCategories: Array.from(new Set([...baseStateOut.discussedCategories, "baterias", "combos_mannol"])),
      options: finalOptions,
      matchedSkus: skus,
      primaryTotalUsd: finalOptions[0]?.totalUsd ?? null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 10. Solo Batería (con vehículo conocido o persistido, incluye manejo de objeción o canje explícito)
  if (wantsBattery && hasKnownVehicle) {
    let batOptions = pickMaxTwoBatteries(effectiveVehicle, effectiveDbEntry, detectedCity, detectedCustomerType, qNorm);
    if (baseStateOut.preferredBatteryBrand === "ecuador") {
      batOptions = batOptions.filter((o) => o.items.some((i) => i.batteryBrand === "ecuador"));
    } else if (baseStateOut.preferredBatteryBrand === "bosch") {
      batOptions = batOptions.filter((o) => o.items.some((i) => i.batteryBrand === "bosch"));
    }
    if (explicitTradeIn !== null) {
      batOptions = batOptions.map((o) => ({
        ...o,
        totalUsd: explicitTradeIn ? (o.totalWithTradeInUsd ?? o.totalUsd) : (o.totalWithoutTradeInUsd ?? o.totalUsd),
      }));
    }
    const skus = Array.from(new Set(batOptions.flatMap((o) => o.items.map((i) => i.sku))));
    return {
      ...baseStateOut,
      intentTag: "bateria_domicilio",
      needsVehicleDetails: false,
      salesStage: baseStateOut.hasPriceObjection ? "objecion" : "cotizacion",
      discussedCategories: Array.from(new Set([...baseStateOut.discussedCategories, "baterias"])),
      options: batOptions,
      matchedSkus: skus,
      primaryTotalUsd: batOptions[0]?.totalUsd ?? null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 11. Vehículo identificado + pide aceite/combo o primera presentación del vehículo -> máximo 2 Combos MANNOL
  if (hasKnownVehicle && (wantsEngineOilOrCombo || asksPlainOilWord || Boolean(turnVehicle?.model || turnVehicle?.unmappedLabel))) {
    const oilOptions = pickMaxTwoLubricantCombos(effectiveVehicle, detectedCustomerType, qNorm);
    const skus = Array.from(new Set(oilOptions.flatMap((o) => o.items.map((i) => i.sku))));
    return {
      ...baseStateOut,
      intentTag: wantsEngineOilOrCombo || asksPlainOilWord ? "combo_lubricante" : "cotizacion_vehiculo",
      needsVehicleDetails: false,
      salesStage: "cotizacion",
      discussedCategories: Array.from(new Set([...baseStateOut.discussedCategories, "combos_mannol"])),
      options: oilOptions,
      matchedSkus: skus,
      primaryTotalUsd: oilOptions[0]?.totalUsd ?? null,
      shippingDeltaUsd: null,
      orderCapture: null,
      confirmedOption: null,
    };
  }

  // 12. Saludo / general
  const isGreeting = /^(hola|buenos dias|buenas tardes|buenas noches|saludos|que tal|hey)\b/.test(qNorm) && qNorm.length < 40;
  return {
    ...baseStateOut,
    intentTag: isGreeting ? "saludo" : "general",
    needsVehicleDetails: !hasKnownVehicle,
    missingFieldHint: "la marca, modelo y año de tu vehículo",
    salesStage: prevState.salesStage || "descubrimiento",
    options: [],
    matchedSkus: [],
    primaryTotalUsd: null,
    shippingDeltaUsd: null,
    orderCapture: null,
    confirmedOption: null,
  };
}
