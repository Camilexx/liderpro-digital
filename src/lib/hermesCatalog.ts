import privatePricing from "@/data/privatePricing.server.json";
import { VEHICLE_DATABASE, type VehicleMake, type VehicleModelItem } from "@/data/vehicles";
import type { CustomerType, VehicleProfile } from "@/lib/hermesDb";

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
  | "envio_delivery"
  | "b2b_flota"
  | "producto_sin_stock"
  | "pregunta_ilogica"
  | "fuera_de_tema"
  | "saludo"
  | "general";

export interface QuoteOption {
  label: string;
  items: Array<{
    sku: string;
    name: string;
    brand?: string;
    presentation?: string;
    unitPriceIva: number;
  }>;
  totalUsd: number;
  includesMannolGift: boolean;
  includesFreeBatteryInstallPedernales: boolean;
  qualifiesFreeShipping: boolean;
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
}

const CATALOG = privatePricing as CatalogPricingItem[];
const BY_SKU = new Map<string, CatalogPricingItem>();
for (const item of CATALOG) {
  if (item.sku) BY_SKU.set(item.sku.toUpperCase(), item);
}

export const FREE_SHIPPING_THRESHOLD_USD = 35;

/**
 * Redondeo comercial oficial hacia arriba de LíderPro Pedernales:
 * .00 / .50 / .90 / siguiente entero.
 */
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
  /\b(prado|land\s*cruiser|rush|agya|raize|captiva|groove|trailblazer|blazer|sorento|sonata|elantra|creta|santa\s*fe|tucson\s*ix|changan|cs35|cs55|geely|coolray|dfsk|glory|l200|montero|asx|outlander|kicks|note|pathfinder|kwid|koleos|cx[-\s]?30|tiggo\s*[3478]|arr[iz]zo|jetour\s*dashing)\b/i;

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

  // Año 1995 - 2026 (evita confundir 10w40, 20w50, etc.)
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

  // Si solo dio año o combustible para actualizar un vehículo previo
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
  // Si el usuario nombró explícitamente otro modelo distinto, reemplazamos la ficha
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
  // Excluir aditivos/líquidos que SÍ vendemos antes de marcar fuera de stock
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
    return "El aceite de cocina pierde toda película lubricante sobre los 90 °C, se carboniza y funde cojinetes y anillos en minutos.";
  }
  if (/(mezclar|echar|poner|usar).*(agua\s+(normal|de\s+llave|salada)|coca\s?cola|cerveza|jugo|vinagre).*(motor|aceite|radiador|bateria)/.test(norm)) {
    return "Mezclar líquidos domésticos con lubricantes o refrigerantes genera lodos, cavitación y corrosión interna severa.";
  }
  if (/(gasolina.*(en\s+motor\s+diesel|carro\s+diesel)|diesel.*(en\s+carro\s+(a\s+)?gasolina|motor\s+gasolina))/.test(norm)) {
    return "Cruzar gasolina y diésel daña de inmediato inyectores, bomba de alta presión y detonación de cámara.";
  }
  if (/(orina|acido\s+de\s+limon|sal).*bateria/.test(norm)) {
    return "Agregar soluciones caseras destruye las placas de plomo y sulfata irreversiblemente las celdas de la batería.";
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
  const price = resolveCatalogPriceIva(item);
  return {
    label,
    items: [
      {
        sku: item.sku,
        name: item.name,
        brand: item.brand,
        presentation: item.presentation,
        unitPriceIva: price,
      },
    ],
    totalUsd: price,
    includesMannolGift,
    includesFreeBatteryInstallPedernales,
    qualifiesFreeShipping: price >= FREE_SHIPPING_THRESHOLD_USD,
  };
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
      "Opción 1 (Trabajo Diésel 15W-40 Semisintético/Mineral)",
      "Opción 2 (Full Sintético 5W-40 Turbo Diésel)",
    ];
  } else if (vehicle?.year && vehicle.year <= 2012) {
    skus = ["COMBO-MANNOL-1A", "COMBO-MANNOL-1C"];
    labels = [
      "Opción 1 (Semisintético 10W-40)",
      "Opción 2 (Alto Kilometraje / Mineral 20W-50)",
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

function pickMaxTwoBatteries(
  vehicle: VehicleProfile | null,
  matchedEntry: { make: string; model: VehicleModelItem } | null,
  city: string | null,
  norm: string
): QuoteOption[] {
  const recSkus = (matchedEntry?.model.recommendedCategories.baterias || []).filter((s) => s !== "ECOVLBAT");
  const isPedernales = !city || normalizeText(city) === "pedernales";

  let candidateSkus: string[] = [];
  if (recSkus.length > 0) {
    const ecBat = recSkus.find((s) => s.startsWith("030") && BY_SKU.has(s));
    const boschBat = recSkus.find((s) => !s.startsWith("030") && BY_SKU.has(s));
    if (ecBat) candidateSkus.push(ecBat);
    if (boschBat && boschBat !== ecBat) candidateSkus.push(boschBat);
  }

  if (candidateSkus.length === 0) {
    const isSmallCar =
      /yaris|picanto|grand i10|swift|jimny|spark|aveo|sail|rio|accent/.test(
        normalizeText(formatVehicleLabel(vehicle) + " " + norm)
      );
    candidateSkus = isSmallCar ? ["03034-FE", "02742HPIS4"] : ["03024-FE", "02724HPIS4"];
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
    .filter((t) => t.length >= 2 && !["para", "con", "del", "las", "los", "que", "por", "como", "tienen", "precio", "cuanto", "vale", "cuesta"].includes(t));

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

export function buildDeterministicQuotePlan(params: {
  userText: string;
  persistedVehicle: VehicleProfile | null;
  persistedCity: string | null;
  persistedCustomerType: CustomerType;
  recentHistoryText?: string;
}): DeterministicQuotePlan {
  const { userText, persistedVehicle, persistedCity, persistedCustomerType, recentHistoryText = "" } = params;
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
    /\b(aceite|lubricante|bateria|filtro|refrigerante|coolant|aditivo|combo|mannol|bosch|ecuador|motor|carro|camioneta|vehiculo|auto|moto|diesel|gasolina|viscosidad|10w|5w|15w|20w|envio|domicilio|pedernales|sri|factura)\b/.test(qNorm);

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
    };
  }

  // 2. Productos fuera de inventario (llantas, pastillas, parabrisas, amortiguadores, etc.)
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
    };
  }

  const wantsBattery = /\b(bateria|baterias|bat|arranque|amperaje|amp)\b/.test(qNorm);
  const wantsOilOrCombo =
    /\b(aceite|lubricante|cambio de aceite|combo|mannol|sintetic[oa]|semisintetic[oa]|mineral|5w-?30|10w-?40|15w-?40|5w-?40|20w-?50|caneca)\b/.test(qNorm);
  const wantsFilterOrFluid = /\b(filtro|refrigerante|coolant|aditivo|limpiador|liquido de frenos)\b/.test(qNorm);
  const wantsShipping = /\b(envio gratis|cuanto falta|delivery|domicilio|flete|envian|envio a)\b/.test(qNorm);
  const isAdditiveJoin = /\b(y cuanto seria con|mas bateria|junto con|agregar|sumale|con la bateria|con bateria|tambien una bateria)\b/.test(qNorm);
  const historyHadComboOrOil = /\b(combo-mannol|combo cambio|15w-40|5w-40|10w-40|5w-30|20w-50|cockpit care)\b/i.test(recentHistoryText);

  // 4. Envío gratis / cuánto falta con monto explícito
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
    };
  }

  // 5. Filtro embudado: cliente pide aceite, combo, batería o filtro SIN dar vehículo ni tener vehículo guardado
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
    };
  }

  // 6. Consulta combinada (Combo MANNOL + Batería) — ej. Turno 2 "¿y cuánto sería con batería a domicilio en Pedernales?"
  if (hasKnownVehicle && wantsBattery && (wantsOilOrCombo || isAdditiveJoin || historyHadComboOrOil)) {
    const oilOptions = pickMaxTwoLubricantCombos(effectiveVehicle, detectedCustomerType, qNorm);
    const batOptions = pickMaxTwoBatteries(effectiveVehicle, effectiveDbEntry, detectedCity, qNorm);

    const combinedOptions: QuoteOption[] = [];
    if (oilOptions.length > 0 && batOptions.length > 0) {
      const opt1Items = [...oilOptions[0].items, ...batOptions[0].items];
      const opt1Total = sumExactPricesIva(opt1Items.map((i) => i.unitPriceIva));
      combinedOptions.push({
        label: "Opción 1 (Combo Semisintético/Trabajo + Batería Ecuador)",
        items: opt1Items,
        totalUsd: opt1Total,
        includesMannolGift: true,
        includesFreeBatteryInstallPedernales: !detectedCity || normalizeText(detectedCity) === "pedernales",
        qualifiesFreeShipping: opt1Total >= FREE_SHIPPING_THRESHOLD_USD,
      });

      const bat2 = batOptions[1] || batOptions[0];
      const oil2 = oilOptions[1] || oilOptions[0];
      const opt2Items = [...oil2.items, ...bat2.items];
      const opt2Total = sumExactPricesIva(opt2Items.map((i) => i.unitPriceIva));
      combinedOptions.push({
        label: "Opción 2 (Combo Full Sintético + Batería Bosch)",
        items: opt2Items,
        totalUsd: opt2Total,
        includesMannolGift: true,
        includesFreeBatteryInstallPedernales: !detectedCity || normalizeText(detectedCity) === "pedernales",
        qualifiesFreeShipping: opt2Total >= FREE_SHIPPING_THRESHOLD_USD,
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
    };
  }

  // 7. Solo Batería (con vehículo conocido o persistido)
  if (wantsBattery && hasKnownVehicle) {
    const batOptions = pickMaxTwoBatteries(effectiveVehicle, effectiveDbEntry, detectedCity, qNorm);
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
    };
  }

  // 8. Vehículo identificado (con o sin palabra "aceite"): recomienda máx. 2 combos MANNOL exactos
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
    };
  }

  // 9. Filtros / Refrigerantes / Aditivos con búsqueda específica (máx. 2 opciones)
  if (wantsFilterOrFluid) {
    const matches = searchFreeformCatalog(userText, 2);
    const options: QuoteOption[] = matches.map((m, idx) => {
      const price = resolveCatalogPriceIva(m);
      return {
        label: idx === 0 ? "Opción 1" : "Opción 2",
        items: [{ sku: m.sku, name: m.name, brand: m.brand, presentation: m.presentation, unitPriceIva: price }],
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
    };
  }

  // 10. Saludo inicial o consulta abierta
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
  };
}
