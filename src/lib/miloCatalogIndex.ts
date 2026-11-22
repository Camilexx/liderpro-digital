import privatePricing from "@/data/privatePricing.server.json";
import type { VehicleProfile } from "@/lib/hermesDb";

export type MiloSubCategory =
  | "lubricantes_motor"
  | "transmision_caja"
  | "hidraulicos_industrial"
  | "aditivos_combustible"
  | "aditivos_motor"
  | "aditivos_radiador"
  | "refrigerantes"
  | "grasas"
  | "sprays_taller"
  | "estetica_limpieza"
  | "filtros"
  | "baterias"
  | "combos_mannol"
  | "internal_fee";

export interface RawPricingEntry {
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

export interface IndexedCatalogEntry {
  sku: string;
  parentSku?: string;
  brand: string;
  rawCategory: string;
  subCategory: MiloSubCategory;
  name: string;
  presentation: string;
  priceIva: number;
  functionSummary: string;
  synonyms: string[];
  searchNorm: string;
  isRetail: boolean;
}

export interface MulticategoryMatchResult {
  matchedSubCategories: MiloSubCategory[];
  items: IndexedCatalogEntry[];
  missingItems: string[];
  note: string | null;
}

function normalizeStr(value: string): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function commercialCeilLocal(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  const cents = Math.round(value * 100);
  const dollars = Math.floor(cents / 100);
  const rem = cents % 100;
  if (rem === 0) return dollars;
  if (rem <= 50) return Number((dollars + 0.5).toFixed(2));
  if (rem <= 90) return Number((dollars + 0.9).toFixed(2));
  return dollars + 1;
}

function resolvePrice(item: RawPricingEntry): number {
  if (typeof item.quoted_pvp_iva === "number" && item.quoted_pvp_iva > 0) {
    return commercialCeilLocal(item.quoted_pvp_iva);
  }
  const base = Number(item.base_price_no_iva || 0);
  return base > 0 ? commercialCeilLocal(base * 1.15) : 0;
}

const SPECIFIC_SYNONYMS_AND_FUNCTIONS: Array<{
  regex: RegExp;
  subCategory?: MiloSubCategory;
  functionSummary: string;
  synonyms: string[];
}> = [
  {
    regex: /limpia inyectores gasolina|injector cleaner gasolina/i,
    subCategory: "aditivos_combustible",
    functionSummary: "Limpia inyectores de gasolina, estabiliza el ralentí, reduce humo negro y mejora el consumo de combustible",
    synonyms: ["humo negro", "traga gasolina", "gasta gasolina", "inyectores gasolina", "consumo gasolina", "cascabeleo"],
  },
  {
    regex: /limpiador inyectores diesel|diesel jet cleaner/i,
    subCategory: "aditivos_combustible",
    functionSummary: "Limpia inyectores diésel Common Rail, reduce humo negro por escape y recupera potencia de inyección",
    synonyms: ["humo negro diesel", "inyectores diesel", "common rail", "gasta diesel"],
  },
  {
    regex: /burning booster|mejorador de combustion/i,
    subCategory: "aditivos_combustible",
    functionSummary: "Aumenta la eficiencia de quemado en cámara, reduce emisiones de hollín/humo negro y mejora el rendimiento",
    synonyms: ["humo negro", "traga gasolina", "optimizar combustion", "bajar consumo"],
  },
  {
    regex: /octane plus|benzin ester/i,
    subCategory: "aditivos_combustible",
    functionSummary: "Eleva el octanaje de la gasolina, evita detonación/pistoneo y lubrica bomba e inyectores",
    synonyms: ["subir octanaje", "pistoneo", "cascabeleo", "gasolina ecopais"],
  },
  {
    regex: /cetane plus|super diesel/i,
    subCategory: "aditivos_combustible",
    functionSummary: "Sube el índice de cetano del diésel, facilita el encendido y reduce ruido y humo negro",
    synonyms: ["cetano", "diesel pesado", "arranque diesel"],
  },
  {
    regex: /dpf cleaner/i,
    subCategory: "aditivos_combustible",
    functionSummary: "Regenera y destapa filtros de partículas DPF en vehículos diésel modernos sin desmontar",
    synonyms: ["filtro de particulas", "dpf tapado", "check engine diesel"],
  },
  {
    regex: /catalizador/i,
    subCategory: "aditivos_combustible",
    functionSummary: "Descarboniza el convertidor catalítico y sensores de oxígeno eliminando residuos de hollín",
    synonyms: ["catalizador tapado", "p0420", "emisiones"],
  },
  {
    regex: /motor flush/i,
    subCategory: "aditivos_motor",
    functionSummary: "Lavado interno del motor en 10 minutos antes del cambio de aceite; disuelve lodos, carbón y gomas",
    synonyms: ["limpiar el motor por dentro", "lavado interno motor", "lodo", "antes del cambio de aceite", "flush"],
  },
  {
    regex: /oil leak stop/i,
    subCategory: "aditivos_motor",
    functionSummary: "Regenera sellos y retenedores de caucho del motor para frenar fugas leves y goteos de aceite",
    synonyms: ["tapa fugas aceite", "gotea aceite", "retenedores resecos"],
  },
  {
    regex: /ceramo ester|ester additive|motor life|motor dr|molibdeno/i,
    subCategory: "aditivos_motor",
    functionSummary: "Refuerza la película antifricción del aceite, reduce consumo por anillos y protege arranques en calor extremo",
    synonyms: ["humo azul", "consume aceite", "proteccion extra motor", "elevadores", "suenan taques"],
  },
  {
    regex: /sellador de blocks/i,
    subCategory: "aditivos_radiador",
    functionSummary: "Sella fisuras permanentes en block, empaque de cabezote y circuito metálico de enfriamiento",
    synonyms: ["cabezote fisurado", "sellar block", "mezcla agua aceite"],
  },
  {
    regex: /limpiador radiador/i,
    subCategory: "aditivos_radiador",
    functionSummary: "Desincrusta óxido, sarro y sedimentos calcáreos dentro del radiador y conductos del motor",
    synonyms: ["lavar radiador", "quitar oxido radiador", "agua oxidada"],
  },
  {
    regex: /sellador.*radiador|polvo radiador/i,
    subCategory: "aditivos_radiador",
    functionSummary: "Tapa fugas y microperforaciones en radiadores, mangueras y bombas de agua sin taponar el panal",
    synonyms: ["tapa fugas radiador", "radiador goteando", "pierde refrigerante"],
  },
  {
    regex: /grasa lc-2|grasa de litio|grasa # 3/i,
    subCategory: "grasas",
    functionSummary: "Grasa automotriz e industrial de extrema presión y alta temperatura para rodamientos, roles, crucetas y chasis",
    synonyms: ["grasa para rodamientos", "grasa para roles", "crucetas", "alta temperatura", "chasis", "puntas de eje", "balde grasa"],
  },
  {
    regex: /grasa blanca spray|grasa chain lube/i,
    subCategory: "grasas",
    functionSummary: "Lubricación adherente en spray para cadenas, bisagras, rieles y mecanismos expuestos",
    synonyms: ["spray cadena", "lubricante bisagras", "grasa spray"],
  },
  {
    regex: /cockpit care|simoniz uv3/i,
    subCategory: "estetica_limpieza",
    functionSummary: "Limpia y protege tablero, plásticos y vinilos contra rayos UV con acabado seco mate que NO deja sensación grasosa ni atrae polvo",
    synonyms: ["tablero", "no deje grasoso", "sin grasa", "protector tablero", "plastico interior", "uv3"],
  },
  {
    regex: /limpiador de tapiceria|limpiador de cuero|cera|shampoo cera|limpia parabrisas|limpia vidrios|neumaticos en espuma|areon/i,
    subCategory: "estetica_limpieza",
    functionSummary: "Cuidado estético automotriz: limpieza profunda de tapicería, cuero, vidrios, carrocería y fragancia",
    synonyms: ["asientos", "tapiceria", "cuero", "vidrios", "llantas brillo", "perfume", "cera", "shampoo"],
  },
  {
    regex: /zapatas embragues cadenas/i,
    subCategory: "sprays_taller",
    functionSummary: "Spray desengrasante de secado rápido (600 ml) para limpiar tambores, pastillas, discos de freno, embragues y cadenas (no es líquido hidráulico DOT)",
    synonyms: ["spray limpia frenos", "limpiador de frenos", "limpia zapatas", "desengrasante frenos", "chirrian frenos"],
  },
  {
    regex: /limpiador carburador/i,
    subCategory: "sprays_taller",
    functionSummary: "Spray solvente de alta presión (600 ml) que remueve barnices y carbón en carburadores y válvulas",
    synonyms: ["limpia carburador", "carburador sucio", "spray carburador"],
  },
  {
    regex: /cuerpo de aceleracion|mariposa/i,
    subCategory: "sprays_taller",
    functionSummary: "Limpiador específico (400 ml) para cuerpo de aceleración, mariposa e IAC sin dañar recubrimientos ni sensores",
    synonyms: ["cuerpo de aceleracion", "mariposa sucia", "ralenti inestable"],
  },
  {
    regex: /contactos electronico/i,
    subCategory: "sprays_taller",
    functionSummary: "Limpia sensores MAF/MAP, conectores eléctricos y fusibles eliminando humedad sin dejar residuo",
    synonyms: ["limpia contactos", "sensor maf", "conectores"],
  },
  {
    regex: /penetrante|multiuso anticorrosivo|tratamiento de bandas/i,
    subCategory: "sprays_taller",
    functionSummary: "Afloja pernos oxidados, protege contra salinidad costera o elimina chirrido en bandas de accesorios",
    synonyms: ["afloja todo", "pernos oxidados", "chirria la banda", "correa"],
  },
  {
    regex: /hydro|iso\s*(32|46|68)|stou/i,
    subCategory: "hidraulicos_industrial",
    functionSummary: "Aceite hidráulico antidesgaste de alto índice de viscosidad para sistemas hidráulicos, bombas de camaroneras y maquinaria",
    synonyms: ["hidraulico iso 68", "iso 68", "iso 46", "iso 32", "camaronera caneca", "bomba hidraulica", "tomas hidraulicas"],
  },
  {
    regex: /getriebe|hypoid|fwd 75w|mtf|basic plus 75w-90|sellador de fugas caja|caja manual/i,
    subCategory: "transmision_caja",
    functionSummary: "Aceite de engranajes GL-4 / GL-5 / LSD para caja manual, corona y diferencial de camionetas 4x4, autos y camiones",
    synonyms: ["aceite de caja", "caja de cambios", "transmision manual", "diferencial", "corona", "80w-90", "75w-90", "85w-140"],
  },
  {
    regex: /atf|cvt|dexron|caja automatica/i,
    subCategory: "transmision_caja",
    functionSummary: "Fluido para transmisión automática ATF Dexron III / VI / ULV o CVT de cambios suaves",
    synonyms: ["aceite caja automatica", "atf", "cvt", "dexron iii", "dexron vi"],
  },
  {
    regex: /refrigerante/i,
    subCategory: "refrigerantes",
    functionSummary: "Coolant refrigerante anticorrosivo listo para usar; evita ebullición en clima cálido costero, protege aluminio y bomba de agua",
    synonyms: ["refrigerante", "coolant", "agua roja", "agua verde", "recalienta", "radiador calor"],
  },
];

function classifySubCategory(raw: RawPricingEntry): MiloSubCategory {
  if (raw.sku === "ECOVLBAT" || raw.category === "internal_fee" || raw.retail_hidden) {
    return "internal_fee";
  }
  const cat = normalizeStr(raw.category || "");
  const name = normalizeStr(raw.name || "");

  if (cat === "combos") return "combos_mannol";
  if (cat === "baterias") return "baterias";
  if (cat === "filtros") return "filtros";
  if (cat === "refrigerantes" || /refrigerante/.test(name)) return "refrigerantes";

  for (const rule of SPECIFIC_SYNONYMS_AND_FUNCTIONS) {
    if (rule.subCategory && rule.regex.test(name)) {
      return rule.subCategory;
    }
  }

  if (cat === "lubricantes") {
    if (/hydro|iso\s*(32|46|68)|stou/.test(name)) return "hidraulicos_industrial";
    if (/atf|cvt|mtf|dexron|getriebe|hypoid|75w|80w-90|85w-140/.test(name)) return "transmision_caja";
    return "lubricantes_motor";
  }

  if (/grasa/.test(name)) return "grasas";
  if (/flush|leak stop|ceramo|ester|motor life|motor dr|molibdeno|ether|anticor/.test(name)) return "aditivos_motor";
  if (/inyector|injector|octane|cetane|dpf|catalizador|burning booster/.test(name)) return "aditivos_combustible";
  if (/radiador|blocks/.test(name)) return "aditivos_radiador";
  if (/cockpit|uv3|tapiceria|cuero|cera|shampoo|vidrio|espuma|areon|perfume/.test(name)) return "estetica_limpieza";
  return "sprays_taller";
}

function buildEntryDetails(raw: RawPricingEntry, subCategory: MiloSubCategory): { functionSummary: string; synonyms: string[] } {
  const nameNorm = normalizeStr(raw.name || "");
  for (const rule of SPECIFIC_SYNONYMS_AND_FUNCTIONS) {
    if (rule.regex.test(nameNorm)) {
      return { functionSummary: rule.functionSummary, synonyms: rule.synonyms };
    }
  }
  const defaults: Record<MiloSubCategory, { functionSummary: string; synonyms: string[] }> = {
    lubricantes_motor: { functionSummary: "Lubricante de motor original certificado con norma API/ACEA", synonyms: ["aceite motor"] },
    transmision_caja: { functionSummary: "Lubricante de transmisión, caja o diferencial", synonyms: ["aceite de caja", "transmision"] },
    hidraulicos_industrial: { functionSummary: "Fluido hidráulico industrial y agrícola/camaronero", synonyms: ["hidraulico", "camaronera"] },
    aditivos_combustible: { functionSummary: "Aditivo limpiador y mejorador de sistema de combustible", synonyms: ["aditivo combustible", "inyectores"] },
    aditivos_motor: { functionSummary: "Aditivo protector y limpiador interno para motor", synonyms: ["aditivo motor"] },
    aditivos_radiador: { functionSummary: "Aditivo de limpieza y sellado para radiador", synonyms: ["radiador"] },
    refrigerantes: { functionSummary: "Refrigerante automotriz anticorrosivo de alto punto de ebullición", synonyms: ["coolant", "refrigerante"] },
    grasas: { functionSummary: "Grasa automotriz e industrial de alta resistencia mecánica", synonyms: ["grasa"] },
    sprays_taller: { functionSummary: "Químico técnico de mantenimiento para taller automotriz", synonyms: ["spray taller"] },
    estetica_limpieza: { functionSummary: "Producto de limpieza y protección estética vehicular", synonyms: ["limpieza interior", "tablero"] },
    filtros: { functionSummary: "Filtro automotriz Advance original (aceite, aire o combustible)", synonyms: ["filtro"] },
    baterias: { functionSummary: "Batería automotriz libre de mantenimiento con garantía de fábrica", synonyms: ["bateria"] },
    combos_mannol: { functionSummary: "Combo oficial cambio de aceite MANNOL + filtro Advance + regalo", synonyms: ["combo mannol"] },
    internal_fee: { functionSummary: "Cargo interno ecovalor no minorista", synonyms: [] },
  };
  return defaults[subCategory];
}

export const MILO_FULL_CATALOG_INDEX: IndexedCatalogEntry[] = (privatePricing as RawPricingEntry[]).map((raw) => {
  const subCategory = classifySubCategory(raw);
  const details = buildEntryDetails(raw, subCategory);
  const brand = raw.brand || "LíderPro";
  const presentation = raw.presentation || "Unidad";
  const priceIva = resolvePrice(raw);
  const searchNorm = normalizeStr(
    `${raw.sku} ${raw.parent_sku || ""} ${brand} ${raw.category || ""} ${subCategory} ${raw.name} ${presentation} ${details.functionSummary} ${details.synonyms.join(" ")}`
  );
  return {
    sku: raw.sku,
    parentSku: raw.parent_sku,
    brand,
    rawCategory: raw.category || "",
    subCategory,
    name: raw.name,
    presentation,
    priceIva,
    functionSummary: details.functionSummary,
    synonyms: details.synonyms,
    searchNorm,
    isRetail: subCategory !== "internal_fee",
  };
});

const BY_SKU_INDEX = new Map<string, IndexedCatalogEntry>();
for (const e of MILO_FULL_CATALOG_INDEX) {
  BY_SKU_INDEX.set(e.sku.toUpperCase(), e);
}

export function getIndexedCatalogEntry(sku: string): IndexedCatalogEntry | undefined {
  return BY_SKU_INDEX.get(sku.trim().toUpperCase());
}

export function getCatalogSubcategoryCounts(): Record<MiloSubCategory, number> {
  const counts = {} as Record<MiloSubCategory, number>;
  for (const e of MILO_FULL_CATALOG_INDEX) {
    counts[e.subCategory] = (counts[e.subCategory] || 0) + 1;
  }
  return counts;
}

/**
 * Busca coincidencia puntual de un producto específico por nombre/SKU/marca del catálogo web (365 fichas / 425 SKUs).
 */
export function findSpecificProductMatches(query: string, limit = 3): IndexedCatalogEntry[] {
  const norm = normalizeStr(query);
  const stopWords = new Set([
    "hola", "buenas", "buenos", "dias", "tardes", "tienen", "tienes", "venden", "vende",
    "cuanto", "cuesta", "vale", "precio", "cual", "para", "como", "con", "del", "las", "los",
    "una", "uno", "que", "esta", "este", "por", "favor", "quiero", "necesito", "saber", "el", "la",
  ]);
  const tokens = norm
    .split(/[^a-z0-9.+-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && !stopWords.has(t));

  if (tokens.length === 0) return [];

  const scored: Array<{ score: number; entry: IndexedCatalogEntry }> = [];
  for (const entry of MILO_FULL_CATALOG_INDEX) {
    if (!entry.isRetail) continue;
    const nameNorm = normalizeStr(`${entry.name} ${entry.presentation}`);
    const skuNorm = normalizeStr(entry.sku);
    let score = 0;
    let hits = 0;

    for (const tok of tokens) {
      if (skuNorm === tok || (entry.parentSku && normalizeStr(entry.parentSku) === tok)) {
        score += 30;
        hits++;
      } else if (nameNorm.includes(tok)) {
        score += tok.length >= 5 ? 8 : 5;
        hits++;
      } else if (entry.searchNorm.includes(tok)) {
        score += 2;
        hits++;
      }
    }

    // Bonus exact multi-word product phrases
    if (tokens.length >= 3 && hits >= Math.min(tokens.length, 3)) {
      score += 14;
    }
    if (/ab-?80/.test(norm) && skuNorm === "lp-abr-003") score += 40;
    if (/motor\s+flush\s+professional/.test(norm) && skuNorm === "lp-man-011") score += 45;
    if (/mariposa|cuerpo\s+de\s+aceleracion/.test(norm) && skuNorm === "lp-man-021") score += 35;

    if (hits >= 2 || score >= 16) {
      scored.push({ score, entry });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.entry.priceIva - b.entry.priceIva);
  return scored.slice(0, limit).map((s) => s.entry);
}

/**
 * Resuelve consultas multicategoría y síntomas mecánicos directamente sobre los 425 SKUs reales
 * SIN desviar a aceites de motor salvo que se pida aceite de motor explícitamente.
 */
export function resolveMulticategoryCatalogQuery(
  userText: string,
  activeVehicle: VehicleProfile | null
): MulticategoryMatchResult | null {
  const norm = normalizeStr(userText);
  const items: IndexedCatalogEntry[] = [];
  const matchedSubCategories: MiloSubCategory[] = [];
  const missingItems: string[] = [];
  const notes: string[] = [];

  const pickBySkus = (skus: string[]) =>
    skus
      .map((s) => getIndexedCatalogEntry(s))
      .filter((x): x is IndexedCatalogEntry => Boolean(x && x.isRetail));

  const pushUnique = (entries: IndexedCatalogEntry[], subCat: MiloSubCategory) => {
    if (!matchedSubCategories.includes(subCat)) matchedSubCategories.push(subCat);
    for (const e of entries) {
      if (!items.some((x) => x.sku === e.sku)) items.push(e);
    }
  };

  const vehicleIsDiesel =
    activeVehicle?.fuel === "diésel" || /\b(diesel|crdi|tdci|d-max|hilux|hino|camaronera|dpf)\b/.test(norm);

  // Check missing liquid brake fluid (0 SKUs in all 426 pricing items) unless asking specifically for brake CLEANER spray
  const asksBrakeCleanerSpray = /\b(spray|limpiador|limpia\s+frenos)\b/.test(norm);
  const asksHydraulicBrakeFluid = /\b(liquido\s+de\s+frenos?|dot\s*[345])\b/.test(norm) && !asksBrakeCleanerSpray;
  if (asksHydraulicBrakeFluid) {
    missingItems.push("líquido de frenos (DOT 3 / DOT 4)");
  }

  // 1. Hidráulico Industrial / Camaronera (ISO 32 / 46 / 68)
  if (/\b(hidraulic[oa]s?|iso\s*(32|46|68)|stou)\b/.test(norm)) {
    const skus = /\biso\s*32\b/.test(norm)
      ? ["LP-LUR-034", "LP-LUR-035"]
      : /\biso\s*46\b/.test(norm)
      ? ["LP-LUR-035", "LP-LUR-039"]
      : ["LP-LUR-039", "LP-LUR-016-2", "LP-LUR-018-2"]; // ISO 68 Canecas 5GL/20L
    pushUnique(pickBySkus(skus), "hidraulicos_industrial");
  }

  // 2. Transmisión / Caja / Diferencial / Corona / ATF / CVT
  if (
    /\b(aceite\s+de\s+caja|aceite\s+para\s+caja|transmision|caja\s+(?:de\s+cambios|manual|automatica)|diferencial|corona|atf|cvt|dexron|80w-?90|75w-?90|75w-?85|85w-?140)\b/.test(
      norm
    )
  ) {
    const isAuto = /\b(automatica|atf|cvt|dexron)\b/.test(norm);
    const skus = isAuto
      ? ["LP-LUR-030", "LP-LUR-031", "LP-LUR-032"]
      : ["012MN8108-1", "012MN8106-1", "012MN8106-4"];
    pushUnique(pickBySkus(skus), "transmision_caja");
  }

  // 3. Grasas (rodamientos, roles, crucetas, alta temperatura, balde grande)
  if (/\b(grasa|grasas|rodamientos?|roles|crucetas|chasis)\b/.test(norm)) {
    const wantsBigPail = /\b(balde|caneca|grande|18\s*kg|4\.5\s*kg|industrial|camaronera|taller)\b/.test(norm);
    const skus = wantsBigPail
      ? ["012MN8116", "012MN8029", "012MN8028-08"]
      : ["LP-MAN-007", "012MN8028-08", "LP-ABR-006"];
    pushUnique(pickBySkus(skus), "grasas");
  }

  // 4. Refrigerantes / Coolants (rojo, verde, azul, naranja, recalienta, agua para radiador)
  if (/\b(refrigerante|coolant|anticongelante|agua\s+(?:roja|verde|azul)|recalienta|recalentamiento)\b/.test(norm)) {
    let skus: string[] = ["012MN4012-5", "012MN4012-1", "102EC-502"]; // Rojo por defecto si pide rojo o calor
    if (/\bverde\b/.test(norm)) {
      skus = ["012MN4013-5", "012MN4013-1", "102EC-503"];
    } else if (/\bazul\b/.test(norm)) {
      skus = ["012MN4011-5", "012MN4011-1"];
    } else if (/\bnaranja\b/.test(norm)) {
      skus = ["012MN4016-5", "012MN4016-1"];
    } else if (/\brojo\b/.test(norm)) {
      skus = ["012MN4012-5", "102EC-502", "012MN4012-1"];
    }
    pushUnique(pickBySkus(skus), "refrigerantes");
  }

  // 5. Aditivos de Limpieza Interna del Motor (Motor Flush) / Selladores / Fugas
  if (
    /\b(limpiar\s+el\s+motor\s+por\s+dentro|lavado\s+interno|motor\s+flush|flush|lodos?\s+del\s+motor|antes\s+del\s+cambio|consume\s+aceite|fuga\s+de\s+aceite|oil\s+leak|ceramo|molibdeno|motor\s+life|motor\s+dr)\b/.test(
      norm
    )
  ) {
    let skus = ["LP-MAN-011", "LP-MAN-025"];
    if (/\bfuga\b|leak|goteo/.test(norm)) skus = ["LP-MAN-014", "LP-MAN-031"];
    else if (/\bhumea\s+azul|consume\s+aceite|desgaste|reparador|ceramo|molibdeno/.test(norm))
      skus = ["LP-MAN-037", "LP-MAN-020", "LP-MAN-054"];
    pushUnique(pickBySkus(skus), "aditivos_motor");
  }

  // 6. Aditivos de Combustible / Humo Negro / Traga Gasolina / Inyectores / Octanaje / DPF
  if (
    /\b(humo\s+negro|traga\s+gasolina|traga\s+combustible|gasta\s+(?:mucha\s+)?gasolina|inyector(?:es)?|limpia\s*inyector|octan|cetane|combustion|catalizador|dpf|aditivo)\b/.test(
      norm
    )
  ) {
    // Only trigger aditivos_combustible if they specifically asked for fuel/symptom/aditivo generic and didn't ALREADY only match radiador/motor flush/tablero
    const alreadyMatchedSpecificOther =
      matchedSubCategories.includes("aditivos_motor") ||
      matchedSubCategories.includes("refrigerantes") ||
      /\b(limpiar\s+el\s+motor\s+por\s+dentro|flush)\b/.test(norm);

    if (!alreadyMatchedSpecificOther || /\b(humo\s+negro|inyector|gasolina|octan|dpf|combustion|catalizador)\b/.test(norm)) {
      const skus = vehicleIsDiesel
        ? ["LP-MAN-051", "LP-MAN-042", "LP-MAN-041"]
        : ["LP-MAN-052", "LP-MAN-036", "LP-MAN-043"];
      pushUnique(pickBySkus(skus), "aditivos_combustible");
      if (!vehicleIsDiesel && /\bhumo\s+negro\b/.test(norm)) {
        notes.push("Para gasolina recomendamos Limpia Inyectores Gasolina (LP-MAN-052 $4.50) o Burning Booster (LP-MAN-036 $7.90); si el vehículo es diésel también tenemos Limpiador Inyectores Diésel (LP-MAN-051 $4.50).");
      }
    }
  }

  // 7. Aditivos de Radiador (tapa fugas / limpiador radiador)
  if (/\b(tapa\s*fugas?|sellador).{0,20}radiador|limpiador.{0,12}radiador|sellar\s+radiador/.test(norm)) {
    pushUnique(pickBySkus(["LP-MAN-045", "LP-MAN-046", "LP-ABR-002"]), "aditivos_radiador");
  }

  // 8. Estética y Tablero (no deje grasoso, cockpit care, UV3, cuero, tapiceria, cera, shampoo)
  if (/\b(tablero|cockpit|uv3|no\s+deje\s+grasos|sin\s+grasa|plastico\s+interior|tapiceria|cuero|cera|shampoo|vidrios|perfume|areon)\b/.test(norm)) {
    let skus = ["LP-MAN-003", "LP-MAN-004", "LP-PER-002"];
    if (/\btapiceria|asientos\b/.test(norm)) skus = ["LP-MAN-035", "LP-MAN-038"];
    else if (/\bcuero\b/.test(norm)) skus = ["LP-MAN-038", "LP-MAN-035"];
    else if (/\bcera|shampoo\b/.test(norm)) skus = ["LP-PER-007", "LP-PER-011"];
    pushUnique(pickBySkus(skus), "estetica_limpieza");
  }

  // 9. Sprays de Taller (limpia frenos, carburador, cuerpo de aceleración, contactos, penetrante, bandas)
  if (
    asksBrakeCleanerSpray ||
    /\b(limpia\s*carburador|carburador|cuerpo\s+de\s+aceleracion|mariposa|contactos|afloja\s*todo|penetrante|ab-?80|tratamiento\s+de\s+bandas|bandas?\s+chirri|llanta\s+doctor)\b/.test(
      norm
    )
  ) {
    const skus: string[] = [];
    if (asksBrakeCleanerSpray || /\b(frenos?|zapatas?|embragues?)\b/.test(norm)) skus.push("LP-MAN-016");
    if (/\bcarburador\b/.test(norm)) skus.push("LP-MAN-018");
    if (/\b(aceleracion|mariposa)\b/.test(norm)) skus.push("LP-MAN-021");
    if (/\bcontactos\b/.test(norm)) skus.push("LP-MAN-023");
    if (/\b(penetrante|afloja|ab-?80)\b/.test(norm)) skus.push("LP-ABR-003");
    if (/\bbandas?\b/.test(norm)) skus.push("LP-MAN-024");
    if (/\bllanta\s+doctor\b/.test(norm)) skus.push("LP-MAN-028");
    if (skus.length > 0) {
      pushUnique(pickBySkus(skus.slice(0, 3)), "sprays_taller");
    }
  }

  // 10. Si preguntó por nombre exacto de producto (ej: Motor Flush Professional + Ester, Penetrante AB-80)
  const exactMatches = findSpecificProductMatches(userText, 3);
  if (exactMatches.length > 0 && items.length === 0) {
    pushUnique(exactMatches, exactMatches[0].subCategory);
  } else if (exactMatches.length > 0) {
    // Reorder so exact match is #1 in its category
    const topExact = exactMatches[0];
    if (matchedSubCategories.includes(topExact.subCategory)) {
      const filtered = items.filter((i) => i.sku !== topExact.sku);
      items.length = 0;
      items.push(topExact, ...filtered);
    }
  }

  if (items.length === 0 && missingItems.length === 0) {
    return null;
  }

  return {
    matchedSubCategories,
    items: items.slice(0, 3),
    missingItems,
    note: notes.length > 0 ? notes.join(" ") : null,
  };
}
