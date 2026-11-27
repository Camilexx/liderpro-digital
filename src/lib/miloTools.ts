import { formatOfficialBankTransferDetails, OFFICIAL_BANK_ACCOUNT } from "@/data/businessConfig";
import {
  computeBatteryDiscountPricing,
  extractCityFromText,
  extractCustomerType,
  extractVehicleFromText,
  formatHumanProductName,
  formatVehicleLabel,
  FREE_SHIPPING_THRESHOLD_USD,
  getCatalogItemBySku,
  mergeVehicleProfiles,
  normalizeText,
  pickMaxTwoBatteries,
  pickMaxTwoLubricantCombos,
  resolveCatalogPriceIva,
  resolveDbEntryForProfile,
  sumExactPricesIva,
  type HermesIntentTag,
} from "@/lib/hermesCatalog";
import {
  flagCustomerHumanEscalation,
  getCachedVehicleSpec,
  insertOrder,
  setCachedVehicleSpec,
  type AdAttribution,
  type CartItem,
  type CommercialState,
  type CustomerType,
  type EscalationUrgency,
  type OrderRecord,
  type VehicleProfile,
} from "@/lib/hermesDb";
import {
  getIndexedCatalogEntry,
  MILO_FULL_CATALOG_INDEX,
  resolveMulticategoryCatalogQuery,
  type IndexedCatalogEntry,
} from "@/lib/miloCatalogIndex";

export interface MiloToolExecutionContext {
  sessionId: string;
  customerName: string | null;
  customerPhone: string | null;
  activeVehicle: VehicleProfile | null;
  city: string | null;
  customerType: CustomerType;
  commercialState: CommercialState;
  observedPricesUsd: Set<number>;
  primaryRecommendedPriceUsd: number | null;
  adAttribution?: AdAttribution | null;
  matchedSkus: Set<string>;
  primaryQuotedItems?: Array<{ sku: string; qty: number }>;
  createdOrder: OrderRecord | null;
  escalatedToHuman: boolean;
  escalationAlertPreview?: string | null;
  sendLiveAlerts?: boolean;
  intentTag: HermesIntentTag;
  toolsUsed: string[];
}

export interface OpenAIToolDefinition {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export const MILO_OPENAI_TOOLS: OpenAIToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "buscar_en_catalogo",
      description:
        "Busca uno o MÚLTIPLES productos en el mismo turno dentro del catálogo real de LíderPro Pedernales (426 SKUs). " +
        "Devuelve SKUs exactos, descripción técnica, precios exactos con IVA (y descuentos de batería Ecuador 35%/30% y Bosch 25%/20%) y productos fuera de stock.",
      parameters: {
        type: "object",
        properties: {
          consultas: {
            type: "array",
            items: { type: "string" },
            description:
              "Lista de consultas a buscar en paralelo (ej. ['limpia inyectores gasolina', 'combo aceite y filtro Aveo 2015'] o ['bateria Chery Tiggo 7 Pro', 'aceite 5W-30']).",
          },
          vehiculo: {
            type: "string",
            description: "Opcional: marca, modelo, año y combustible del vehículo mencionado.",
          },
        },
        required: ["consultas"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "gestionar_carrito",
      description:
        "Mantiene el carrito real multi-producto del cliente y calcula el desglose y total EXACTO con IVA en TypeScript. " +
        "Úsalo cuando el cliente pida armar un combo completo, sumar productos, quitar algo o saber el total consolidado.",
      parameters: {
        type: "object",
        properties: {
          accion: {
            type: "string",
            enum: ["add", "remove", "set", "clear", "summary"],
            description:
              "'add' suma ítems al carrito actual; 'set' reemplaza el carrito con la lista exacta; 'remove' quita SKUs; 'clear' vacía; 'summary' devuelve el resumen actual.",
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                sku: { type: "string", description: "SKU exacto devuelto por buscar_en_catalogo" },
                qty: { type: "number", description: "Cantidad (default 1)" },
                battery_trade_in: {
                  type: "boolean",
                  description: "Solo para baterías: true si entrega batería usada, false si NO entrega usada.",
                },
              },
              required: ["sku"],
            },
          },
        },
        required: ["accion"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "consultar_especificacion_vehiculo_web",
      description:
        "Consulta técnica controlada (base local + búsqueda web ligera cacheada en Postgres) ÚNICAMENTE para confirmar viscosidad de aceite, litros de cárter o grupo de batería de un vehículo poco común que no esté detallado aún. PROHIBIDO consultar precios o tiendas externas.",
      parameters: {
        type: "object",
        properties: {
          vehiculo: { type: "string", description: "Ej: 'Chery Tiggo 7 Pro 2023' o 'Volkswagen Gol 2010'" },
          consulta_tecnica: {
            type: "string",
            description: "Ej: 'viscosidad aceite motor litros y grupo bateria'",
          },
        },
        required: ["vehiculo", "consulta_tecnica"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "registrar_pedido",
      description:
        "Registra un pedido confirmado en Postgres usando el carrito real del cliente. " +
        "Úsalo SOLO cuando el cliente confirme que quiere pedir y ya dio su nombre, dirección/ciudad/retiro y forma de pago.",
      parameters: {
        type: "object",
        properties: {
          nombre_cliente: { type: "string", description: "Nombre del cliente" },
          telefono: { type: "string", description: "Teléfono de contacto si lo indicó" },
          ciudad: { type: "string", description: "Ciudad de entrega (default Pedernales si es local)" },
          tipo_entrega: {
            type: "string",
            enum: ["domicilio_pedernales", "retiro_tienda_pedernales", "envio_cooperativa_nacional"],
            description: "Modalidad de entrega",
          },
          direccion_o_terminal: {
            type: "string",
            description: "Dirección exacta en Pedernales, 'Retiro en tienda Vía al Carmen', o cooperativa/terminal/Servientrega/Tramaco",
          },
          cedula_o_ruc: { type: "string", description: "Cédula o RUC si el cliente la dio (para envío nacional o factura)" },
          metodo_pago: {
            type: "string",
            description: "Efectivo (solo Pedernales) o transferencia bancaria a Banco Pichincha (cuenta única 2216090525; interbancarias solo desde bancos con convenio directo)",
          },
          items: {
            type: "array",
            description: "Opcional si el carrito ya tiene los ítems; lista de {sku, qty, battery_trade_in?} para confirmar.",
            items: {
              type: "object",
              properties: {
                sku: { type: "string" },
                qty: { type: "number" },
                battery_trade_in: { type: "boolean" },
              },
              required: ["sku"],
            },
          },
        },
        required: ["nombre_cliente", "tipo_entrega", "direccion_o_terminal", "metodo_pago"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "escalar_a_asesor_humano",
      description:
        "Marca el chat con alerta prioritaria en /admin-hermes y notifica a un asesor humano en Pedernales (y Telegram). " +
        "Úsalo cuando el cliente pida hablar con un encargado/persona, pida crédito a 30 días o descuento mayorista fuera de tabla (ej. 20-40 canecas), muestre frustración o haga una consulta técnica incierta.",
      parameters: {
        type: "object",
        properties: {
          motivo: { type: "string", description: "Motivo corto (ej. 'Cotización mayorista 40 canecas + crédito 30 días')" },
          resumen_corto: { type: "string", description: "Resumen claro de lo que necesita el cliente para el asesor humano" },
          urgencia: { type: "string", enum: ["alta", "media", "baja"] },
        },
        required: ["motivo", "resumen_corto", "urgencia"],
      },
    },
  },
];

/** Normaliza jerga, typos de viscosidad y faltas ortográficas comunes de Ecuador */
export function expandEcuadorianColloquialisms(text: string): string {
  return normalizeText(text)
    .replace(/\b16\s*w[-\s]?40\b/g, "15w-40")
    .replace(/\b(0|5|10|15|20)\s*w\s*(20|30|40|50)\b/g, "$1w-$2")
    .replace(/\b(votando|botando|echando)\s+umo\b/g, "botando humo")
    .replace(/\bumo\b/g, "humo")
    .replace(/\bfull\s+gaso(?:lina)?\b/g, "mucha gasolina traga gasolina")
    .replace(/\bgaso\b/g, "gasolina")
    .replace(/\baceitada\b/g, "cambio de aceite")
    .replace(/\b(?:bajada|descargada|muerta|sin\s+carga)\b/g, "bateria bajada")
    .replace(/\bahogado\b/g, "inyectores cuerpo de aceleracion")
    .replace(/\bcascabelea|pistonea\b/g, "cascabeleo octanaje gasolina")
    .replace(/\broles\b/g, "rodamientos roles")
    .replace(/\bcanekas?\b/g, "caneca 20 litros");
}

function recordPrice(ctx: MiloToolExecutionContext, price: number | null | undefined): void {
  if (typeof price === "number" && Number.isFinite(price) && price > 0) {
    ctx.observedPricesUsd.add(Number(price.toFixed(2)));
  }
}

interface CatalogCandidatePayload {
  sku: string;
  name: string;
  brand: string;
  presentation: string;
  subCategory: string;
  priceIva: number;
  functionSummary: string;
  isBattery?: boolean;
  batteryBrand?: "ecuador" | "bosch";
  listPriceIva?: number;
  priceWithTradeIn?: number;
  discountPctWithTradeIn?: number;
  priceWithoutTradeIn?: number;
  discountPctWithoutTradeIn?: number;
  freeInstallPedernales?: boolean;
  includesAdvanceFilterAndGift?: boolean;
}

function toCandidatePayload(entry: IndexedCatalogEntry): CatalogCandidatePayload {
  const raw = getCatalogItemBySku(entry.sku);
  const bat = raw ? computeBatteryDiscountPricing(raw) : null;
  const humanName = formatHumanProductName(entry.sku, entry.name);
  const isCombo = entry.subCategory === "combos_mannol" || entry.sku.toUpperCase().startsWith("COMBO-MANNOL-");
  return {
    sku: entry.sku,
    name: humanName,
    brand: entry.brand,
    presentation: entry.presentation,
    subCategory: entry.subCategory,
    priceIva: bat ? bat.priceWithTradeIn : entry.priceIva,
    functionSummary: entry.functionSummary,
    ...(bat
      ? {
          isBattery: true,
          batteryBrand: bat.batteryBrand,
          listPriceIva: bat.listPriceIva,
          priceWithTradeIn: bat.priceWithTradeIn,
          discountPctWithTradeIn: bat.discountPctWithTradeIn,
          priceWithoutTradeIn: bat.priceWithoutTradeIn,
          discountPctWithoutTradeIn: bat.discountPctWithoutTradeIn,
          freeInstallPedernales: true,
        }
      : {}),
    ...(isCombo ? { includesAdvanceFilterAndGift: true } : {}),
  };
}

function detectOutOfStockForSingleQuery(norm: string): string | null {
  const isSprayOrAdditive = /\b(spray|limpiador|limpia\s+frenos|aditivo|espuma|tratamiento|sellador|refrigerante)\b/.test(norm);
  if (/\bliquido\s+de\s+frenos?\b|\bdot\s*[34]\b|\baceite\s+de\s+frenos?\b/.test(norm)) {
    return "líquido de frenos (DOT 3 / DOT 4)";
  }
  if (!isSprayOrAdditive && /\b(pastillas?|balatas?|discos?\s+de\s+freno)\b/.test(norm)) {
    return "pastillas / discos de freno";
  }
  if (!isSprayOrAdditive && /\b(llantas?|neumaticos?|cauchos?|aros?|rines?)\b/.test(norm)) {
    return "llantas / neumáticos";
  }
  if (/\b(bujias?|bobinas?|cables?\s+de\s+bujia)\b/.test(norm)) {
    return "bujías / encendido";
  }
  if (/\b(amortiguador(?:es)?|rotulas?|terminales?|suspension)\b/.test(norm)) {
    return "amortiguadores / suspensión";
  }
  if (!isSprayOrAdditive && /\b(clutch|embrague|collarin|prensa)\b/.test(norm)) {
    return "kit de embrague";
  }
  return null;
}

function searchFreeTextRetailCatalog(query: string, limit = 5, activeVehicle?: VehicleProfile | null): IndexedCatalogEntry[] {
  const expanded = expandEcuadorianColloquialisms(query);
  const stop = new Set([
    "para", "con", "sin", "del", "las", "los", "una", "uno", "unos", "unas", "que", "como", "cual", "mejor",
    "carro", "auto", "vehiculo", "motor", "precio", "cuesta", "tienen", "necesito", "quiero", "bueno", "buena",
    "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025",
  ]);
  const tokens = expanded
    .replace(/[^a-z0-9.\-\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !stop.has(t));

  const wantsViscosity = expanded.match(/\b(\d{1,2}w[-\s]?\d{2})\b/i)?.[1]?.replace(/\s+/g, "-") || null;
  const wantsIso = expanded.match(/\biso\s*(32|46|68)\b/i)?.[1] || null;
  const wantsCaneca = /\b(caneca|20\s*l|20l|balde|18\s*kg)\b/.test(expanded);
  const wantsGalon = /\b(galon|4\s*l|5\s*l|4l|5l)\b/.test(expanded);
  const wantsAirFilter = /\bfiltro\s*(?:de\s*)?aire\b/.test(expanded);
  const activeModelNorm = normalizeText(activeVehicle?.model || activeVehicle?.unmappedLabel || "").trim();

  const scored: Array<{ entry: IndexedCatalogEntry; score: number }> = [];
  for (const entry of MILO_FULL_CATALOG_INDEX) {
    if (!entry.isRetail) continue;
    // Evitar SKU LP-FIL-024 en búsquedas de filtro de aire (excel_code 078AO-50710 corresponde a filtro de aceite)
    if (entry.sku.toUpperCase() === "LP-FIL-024" && wantsAirFilter) continue;

    let score = 0;
    const nameNorm = normalizeText(entry.name);
    const presNorm = normalizeText(entry.presentation);

    // Para filtros específicos, exigir coincidencia de modelo de vehículo o SKU explícito (jamás cruzar Ranger con Aveo)
    if (entry.subCategory === "filtros" && activeModelNorm.length >= 3) {
      const modelWords = activeModelNorm.split(/\s+/).filter((w) => w.length >= 3);
      const matchesVehicle = modelWords.some((w) => nameNorm.includes(w));
      const explicitSku = tokens.some((t) => entry.sku.toLowerCase() === t);
      if (!matchesVehicle && !explicitSku) continue;
      if (matchesVehicle) score += 16;
    }

    if (wantsViscosity) {
      if (nameNorm.includes(wantsViscosity.toLowerCase())) score += 24;
      else if (entry.subCategory === "lubricantes_motor" || entry.subCategory === "transmision_caja") score -= 6;
    }
    if (wantsIso) {
      if (nameNorm.includes(`iso ${wantsIso}`) || nameNorm.includes(`iso${wantsIso}`) || nameNorm.includes(wantsIso)) {
        score += 26;
      }
    }
    if (wantsCaneca && /20\s*l|18\s*kg|caneca|balde/.test(`${nameNorm} ${presNorm}`)) score += 10;
    if (wantsGalon && /galon|4\s*l|5\s*l|3\.78/.test(`${nameNorm} ${presNorm}`)) score += 8;

    for (const tok of tokens) {
      if (entry.sku.toLowerCase() === tok) score += 30;
      else if (nameNorm.includes(tok)) score += 9;
      else if (entry.searchNorm.includes(tok)) score += 4;
    }

    if (score >= 8) {
      if (entry.brand.toUpperCase() === "MANNOL") score += 2;
      scored.push({ entry, score });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score || a.entry.priceIva - b.entry.priceIva)
    .slice(0, limit)
    .map((s) => s.entry);
}

interface OilCapacityTopUpInfo {
  litersLabel: string;
  comboLiters: number;
  targetLiters: number;
  needsExtraLiters: number;
  preferred1LSkus: string[];
}

function findMatchingOneLiterOil(
  primary: Pick<CatalogCandidatePayload, "sku" | "name" | "brand">,
  fallbackSkus: string[]
): IndexedCatalogEntry | null {
  const primaryNorm = normalizeText(`${primary.brand} ${primary.name}`);
  const primaryBrand = normalizeText(primary.brand);
  const viscMatch = primaryNorm.match(/\b(\d{1,2}w[-\s]?\d{2})\b/i);
  const targetVisc = viscMatch ? viscMatch[1].replace(/\s+/g, "-") : null;

  // Extract distinctive product line keywords (e.g., "energy formula jp", "classic", "safari", "for chinese cars", "ceramic", "delvac", "diesel turbo")
  const lineTokens = primaryNorm
    .replace(/\b(combo|cambio|mannol|filtro|advance|regalo|galon|litros?|1a|1b|1c|2a|2b|2c|sae|api|aceite|motor|metalico|synt|blend|semi|sintetico)\b/g, " ")
    .replace(/\b\d{1,2}w[-\s]?\d{2}\b/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2 && t !== primaryBrand);

  const oneLiterOils = MILO_FULL_CATALOG_INDEX.filter((e) => {
    if (!e.isRetail || e.subCategory !== "lubricantes_motor") return false;
    const pres = normalizeText(`${e.presentation} ${e.name}`);
    return /\b(1\s*litro|1\s*lt|1l|946\s*ml|1\s*cuarto)\b/.test(pres) && !/\b(4\s*l|5\s*l|20\s*l|galon|caneca)\b/.test(pres);
  });

  let bestEntry: IndexedCatalogEntry | null = null;
  let bestScore = -1;

  for (const cand of oneLiterOils) {
    const cNorm = normalizeText(`${cand.brand} ${cand.name}`);
    const cBrand = normalizeText(cand.brand);
    let score = 0;

    // 1. Same viscosity is highest priority
    if (targetVisc) {
      if (cNorm.includes(targetVisc)) score += 50;
      else continue; // Never mismatch viscosity (e.g. never pair 5W-30 1L with 20W-50)
    }

    // 2. Same brand
    if (primaryBrand && cBrand === primaryBrand) {
      score += 35;
    }

    // 3. Same product line tokens
    let lineMatches = 0;
    for (const tok of lineTokens) {
      if (cNorm.includes(tok)) {
        lineMatches += 1;
        score += 18;
      }
    }

    // Small bonus for curated fallback order on ties
    const fbIdx = fallbackSkus.findIndex((s) => s.toUpperCase() === cand.sku.toUpperCase());
    if (fbIdx >= 0) score += Math.max(1, 6 - fbIdx);

    if (score > bestScore && (score >= 85 || (targetVisc && lineMatches > 0))) {
      bestScore = score;
      bestEntry = cand;
    }
  }

  if (bestEntry) return bestEntry;

  for (const sku of fallbackSkus) {
    const entry = getIndexedCatalogEntry(sku);
    if (entry) return entry;
  }
  return null;
}

function resolveVehicleOilCapacityTopUp(
  vehicle: VehicleProfile | null,
  queryNorm: string,
  primary: Pick<CatalogCandidatePayload, "sku" | "name" | "brand"> & { presentation?: string }
): OilCapacityTopUpInfo | null {
  const skuUpper = primary.sku.toUpperCase();
  const presNorm = normalizeText(`${primary.presentation || ""} ${primary.name}`);
  // Canecas de 20L / tambores ya cubren uso pesado/flota
  if (/^COMBO-MANNOL-3[ABC]$/.test(skuUpper)) return null;
  if (/\b(20\s*l|caneca|balde|tambor)\b/.test(presNorm)) return null;

  let comboLiters = 0;
  if (/^COMBO-MANNOL-2[AB]$/.test(skuUpper) || /\b7\s*litros?\b|\b7l\b/.test(presNorm)) {
    comboLiters = 7;
  } else if (/^COMBO-MANNOL-2C$/.test(skuUpper) || /\b6\s*litros?\b|\b6l\b/.test(presNorm)) {
    comboLiters = 6;
  } else if (/^012MN(7709-4|7909-5|7904-5|7104-5A)$/.test(skuUpper) || /\b5\s*l\b/.test(presNorm)) {
    comboLiters = 5;
  } else if (/^COMBO-MANNOL-1[ABC]$/.test(skuUpper) || /\b(galon|4\s*l|4\s*litros?|3\.78|3\.785)\b/.test(presNorm)) {
    comboLiters = 4;
  }
  if (comboLiters <= 0) return null;

  const combined = normalizeText(`${formatVehicleLabel(vehicle)} ${queryNorm}`);
  const primaryNorm = normalizeText(`${primary.name}`);
  const fallbackByVisc = /20w-?50|1c$/i.test(`${primaryNorm} ${skuUpper}`)
    ? ["012MN7404-1A"]
    : /10w-?40|1a$|2c$/i.test(`${primaryNorm} ${skuUpper}`)
    ? ["012MN7501-1"]
    : /5w-?40|2b$/i.test(`${primaryNorm} ${skuUpper}`)
    ? ["012MN7904-1"]
    : /15w-?40|2a$/i.test(`${primaryNorm} ${skuUpper}`)
    ? ["012MN7104-1"]
    : /diesel.*5w-?30|5w-?30.*diesel/i.test(`${primaryNorm} ${combined}`)
    ? ["012MN7909-1"]
    : /toyota/i.test(primaryNorm)
    ? ["012MN7709-1", "012MN7914-1A"]
    : ["012MN7914-1A", "012MN7924-1"];

  const matched1L = findMatchingOneLiterOil(primary, fallbackByVisc);
  const preferred1LSkus = matched1L
    ? [matched1L.sku, ...fallbackByVisc.filter((s) => s.toUpperCase() !== matched1L.sku.toUpperCase())]
    : fallbackByVisc;

  let targetLiters = 0;
  let litersLabel = "";

  const explicitCapacityMatch =
    queryNorm.match(/\b(?:lleva|necesita|requiere|son|capacidad(?:\s+de)?|kit(?:\s+de)?)\s*(\d{1,2}(?:[.,]\d)?)\s*(?:litros?|lts?|l)\b/i) ||
    queryNorm.match(/\b([5-9]|1[0-6])(?:[.,]\d)?\s*(?:litros?|lts?|l)\b/i);

  if (/\bdos\s+galones\b/i.test(combined)) {
    targetLiters = 8;
    litersLabel = "8 litros (2 galones)";
  } else if (explicitCapacityMatch) {
    const parsed = Number(explicitCapacityMatch[1].replace(",", "."));
    if (Number.isFinite(parsed) && parsed >= 4.2 && parsed <= 18) {
      targetLiters = parsed;
      litersLabel = `${parsed} litros`;
    }
  }

  if (targetLiters <= 0) {
    if (/\branger\b/.test(combined) && /\b3\.2\b/.test(combined)) {
      targetLiters = 9;
      litersLabel = "9 litros con filtro";
    } else if (/\bhi[-\s]?lux\b/.test(combined) && (/\b2\.7\b/.test(combined) || vehicle?.fuel === "gasolina")) {
      targetLiters = 6;
      litersLabel = "5.5 a 6.0 litros con filtro";
    } else if (/\b(tiggo\s*7|tiggo\s*8|coolray|geely|jetour\s*dashing|changan\s*cs55)\b/.test(combined)) {
      targetLiters = 5;
      litersLabel = "4.5 a 4.7 litros con filtro";
    } else if (/\b(fortuner|prado|land\s*cruiser|f-?150|trailblazer|blazer|pathfinder|santa\s*fe|sorento|outlander)\b/.test(combined)) {
      targetLiters = 6;
      litersLabel = "5.0 a 6.0 litros con filtro";
    } else if (/\b(x-?trail|rav\s*4|cx-?5|captiva|tiggo\s*4|grand\s*vitara)\b/.test(combined)) {
      targetLiters = 5;
      litersLabel = "4.3 a 4.7 litros con filtro";
    }
  }

  if (targetLiters <= 0) return null;
  const needsExtraLiters = Math.max(0, Math.ceil(targetLiters - comboLiters));
  if (needsExtraLiters <= 0) return null;

  return {
    litersLabel,
    comboLiters,
    targetLiters,
    needsExtraLiters,
    preferred1LSkus,
  };
}

function searchSingleQuery(
  rawQuery: string,
  ctx: MiloToolExecutionContext
): {
  consulta: string;
  enStock: boolean;
  requiereVehiculo?: boolean;
  requiereCombustible?: boolean;
  vehiculoYaResuelto?: boolean;
  notaTecnica?: string;
  nota?: string;
  alertaLitraje?: string;
  litroAdicionalRecomendado?: CatalogCandidatePayload | null;
  recomendacionPrincipal?: CatalogCandidatePayload | null;
  candidatos: CatalogCandidatePayload[];
} {
  const expanded = expandEcuadorianColloquialisms(rawQuery);
  const oos = detectOutOfStockForSingleQuery(expanded);
  if (oos) {
    return {
      consulta: rawQuery,
      enStock: false,
      nota: `Actualmente NO manejamos ${oos} en bodega. Dilo con honestidad sin inventar productos.`,
      candidatos: [],
    };
  }

  // Update vehicle if mentioned inside query
  const extracted = extractVehicleFromText(rawQuery);
  if (extracted.profile) {
    ctx.activeVehicle = mergeVehicleProfiles(ctx.activeVehicle, extracted.profile);
  }
  const matchedEntry = extracted.matchedEntry || resolveDbEntryForProfile(ctx.activeVehicle);
  const hasKnownVehicle = Boolean(ctx.activeVehicle?.model || ctx.activeVehicle?.unmappedLabel);

  const asksBattery = /\b(bateria|acumulador|amperios?|grupo\s*(24|27|31|34|42)|n100|n150|bajada)\b/.test(expanded);
  const asksHydraulic = /\b(hidraulic|iso\s*(32|46|68)|stou)\b/.test(expanded);
  const asksTransmission = /\b(caja|transmision|atf|cvt|dexron|diferencial|corona|75w|80w-90|85w-140)\b/.test(expanded);
  const asksOilOrCombo =
    !asksHydraulic &&
    !asksTransmission &&
    (/\b(combo|cambio\s+de\s+aceite|aceite\s+(?:de\s+)?motor|aceite\s+y\s+filtro|lubricante)\b/.test(expanded) ||
      (/\baceite\b/.test(expanded) && !/\b(frenos?|cocina|oliva|caja|transmision|hidraulic)\b/.test(expanded)));
  const asksUniversalAdditive =
    /\b(aditivo|limpia\s*inyector|inyector|flush|motor\s*flush|octanaje|humo\s+(?:negro|azul)|tratamiento|radiador|refrigerante|coolant|sellador|limpiador|spray|ceratec|molibdeno)\b/.test(
      expanded
    );
  const wantsExplicitViscosity = Boolean(
    expanded.match(/\b(0w-20|5w-20|5w-30|5w-40|10w-30|10w-40|15w-40|20w-50)\b/i)
  );
  const asksFilterOnly =
    /\bfiltro\b/.test(expanded) && !asksOilOrCombo && !asksBattery && !asksUniversalAdditive && !/\bparticulas|dpf\b/.test(expanded);

  // REGLA DURA V4.2: Prohibido cotizar filtros o aceites de motor genéricos sin conocer vehículo
  // (Los aditivos universales SÍ se cotizan directo en Turno 1 sin pedir marca/modelo/año)
  if (asksFilterOnly && !hasKnownVehicle) {
    return {
      consulta: rawQuery,
      enStock: false,
      requiereVehiculo: true,
      nota:
        "BLOQUEADO: Todavía NO conoces marca, modelo ni año del vehículo del cliente. " +
        "PROHIBIDO cotizar un filtro específico o mencionar un precio de filtro antes de saber qué vehículo es. " +
        "Pregunta primero marca, modelo y año del carro.",
      candidatos: [],
    };
  }

  if (asksOilOrCombo && !hasKnownVehicle && !wantsExplicitViscosity && !asksUniversalAdditive && !/\b(caneca|20\s*l|combo-mannol)\b/.test(expanded)) {
    return {
      consulta: rawQuery,
      enStock: false,
      requiereVehiculo: true,
      nota:
        "BLOQUEADO: Todavía NO conoces marca, modelo ni año del vehículo ni la viscosidad exacta. " +
        "PROHIBIDO cotizar un aceite de motor o combo sin saber qué vehículo es. " +
        "Pregunta primero marca, modelo y año del carro para recomendar la viscosidad y litraje exactos.",
      candidatos: [],
    };
  }

  const candidates: CatalogCandidatePayload[] = [];
  const seenSkus = new Set<string>();
  const pushCandidate = (c: CatalogCandidatePayload) => {
    const key = c.sku.toUpperCase();
    if (seenSkus.has(key) || key === "ECOVLBAT") return;
    seenSkus.add(key);
    candidates.push(c);
    ctx.matchedSkus.add(c.sku);
    recordPrice(ctx, c.priceIva);
    if (c.listPriceIva) recordPrice(ctx, c.listPriceIva);
    if (c.priceWithTradeIn) recordPrice(ctx, c.priceWithTradeIn);
    if (c.priceWithoutTradeIn) recordPrice(ctx, c.priceWithoutTradeIn);
  };

  if (asksBattery) {
    const batOptions = pickMaxTwoBatteries(ctx.activeVehicle, matchedEntry, ctx.city, ctx.customerType, expanded);
    for (const opt of batOptions) {
      const it = opt.items[0];
      if (!it) continue;
      const idx = getIndexedCatalogEntry(it.sku);
      if (idx) pushCandidate(toCandidatePayload(idx));
    }
    const primary = candidates[0] || null;
    if (primary) {
      ctx.primaryRecommendedPriceUsd = primary.priceWithTradeIn ?? primary.priceIva;
    }
    const vehicleResolved = Boolean(ctx.activeVehicle?.make || ctx.activeVehicle?.model || ctx.activeVehicle?.unmappedLabel);
    return {
      consulta: rawQuery,
      enStock: candidates.length > 0,
      vehiculoYaResuelto: vehicleResolved,
      ...(vehicleResolved
        ? {
            notaTecnica:
              "Grupo y opciones de batería ya resueltos para el vehículo del cliente. Cotiza directamente SIN volver a pedir grupo de batería y SIN confundir amperaje (ej. 55 Amp) con número de grupo (ej. Grupo 42).",
          }
        : {}),
      nota:
        "Descuentos oficiales vigentes sobre PVP con IVA: Baterías Ecuador 35% entregando usada / 30% sin usada; Bosch 25% entregando usada / 20% sin usada. Instalación + revisión de alternador 100% GRATIS a domicilio en Pedernales.",
      recomendacionPrincipal: primary,
      candidatos: candidates,
    };
  }

  if (asksOilOrCombo) {
    const isExplicitGasoline =
      ctx.activeVehicle?.fuel === "gasolina" || /\b(gasolina|nafta|2\.7)\b/i.test(expanded);
    // 1. Official MANNOL combos (already include Advance oil filter + Cockpit Care gift!)
    const wantsSpecificViscosity = expanded.match(/\b(0w-20|5w-20|5w-30|5w-40|10w-30|10w-40|15w-40|20w-50)\b/i)?.[1];
    const combos = pickMaxTwoLubricantCombos(
      ctx.activeVehicle,
      ctx.customerType,
      expanded,
      ctx.adAttribution?.adTag
    );
    if (combos.length === 0 && !wantsSpecificViscosity && hasKnownVehicle) {
      return {
        consulta: rawQuery,
        enStock: false,
        requiereCombustible: true,
        nota:
          "Vehículo dual (gasolina o diésel) sin combustible confirmado todavía. " +
          "Pregunta en 1 sola línea amable si el motor es a gasolina o diésel para darle la viscosidad y precio exactos.",
        candidatos: [],
      };
    }
    for (const opt of combos) {
      const it = opt.items[0];
      if (!it) continue;
      const idx = getIndexedCatalogEntry(it.sku);
      if (idx) pushCandidate(toCandidatePayload(idx));
    }
    // 2. If user asked a specific viscosity/brand or modern turbo engine (e.g. 5W-30 / 0W-20 / Tiggo 7 Pro), also include standalone matches
    const freeMatches = searchFreeTextRetailCatalog(expanded, 5, ctx.activeVehicle).filter((e) => {
      if (e.subCategory !== "lubricantes_motor" && e.subCategory !== "combos_mannol") return false;
      if (isExplicitGasoline && /\b(15w-?40|5w-?40|diesel|tdi|ts-4)\b/i.test(`${e.sku} ${e.name}`)) {
        return false;
      }
      return true;
    });
    for (const m of freeMatches) {
      if (candidates.length >= 5) break;
      pushCandidate(toCandidatePayload(m));
    }
    // Pick best winner: respect explicit gasoline + 5W-30, else newer cars/5W-40 diesel
    const preferGas5w30 =
      isExplicitGasoline && Boolean(wantsSpecificViscosity && /5w-30/i.test(wantsSpecificViscosity));
    const preferSynthetic =
      (ctx.activeVehicle?.year && ctx.activeVehicle.year >= 2016) ||
      Boolean(wantsSpecificViscosity && /5w-30|5w-40|0w-20/i.test(wantsSpecificViscosity)) ||
      /tiggo\s*[478]|turbo|sintetic/i.test(`${formatVehicleLabel(ctx.activeVehicle)} ${expanded}`);
    const primary =
      (preferGas5w30
        ? candidates.find((c) => /^COMBO-MANNOL-1B$/i.test(c.sku)) ||
          candidates.find((c) => /5W-30/i.test(c.name) && !/diesel|tdi/i.test(c.name))
        : preferSynthetic
        ? candidates.find((c) => /1B|2B|5W-30|5W-40|0W-20/i.test(`${c.sku} ${c.name}`))
        : candidates[0]) ||
      candidates[0] ||
      null;
    if (primary) {
      ctx.primaryRecommendedPriceUsd = primary.priceIva;
      ctx.primaryQuotedItems = [{ sku: primary.sku, qty: 1 }];
    }

    // VERIFICACIÓN DE LITRAJE (> 4.0L / > 7.0L): detectar si falta 1L o 2L adicionales y registrar total exacto
    let alertaLitraje: string | undefined;
    let litroAdicionalRecomendado: CatalogCandidatePayload | null = null;
    if (primary) {
      const cap = resolveVehicleOilCapacityTopUp(ctx.activeVehicle, expanded, primary);
      if (cap && cap.needsExtraLiters > 0) {
        for (const topSku of cap.preferred1LSkus) {
          const entry1L = getIndexedCatalogEntry(topSku);
          if (entry1L) {
            litroAdicionalRecomendado = toCandidatePayload(entry1L);
            pushCandidate(litroAdicionalRecomendado);
            break;
          }
        }
        if (litroAdicionalRecomendado) {
          const combinedTotalUsd = sumExactPricesIva([
            primary.priceIva,
            ...Array(cap.needsExtraLiters).fill(litroAdicionalRecomendado.priceIva),
          ]);
          recordPrice(ctx, combinedTotalUsd);
          ctx.primaryRecommendedPriceUsd = combinedTotalUsd;
          ctx.primaryQuotedItems = [
            { sku: primary.sku, qty: 1 },
            { sku: litroAdicionalRecomendado.sku, qty: cap.needsExtraLiters },
          ];
          alertaLitraje =
            `ATENCIÓN LITRAJE (${cap.comboLiters}L -> ${cap.targetLiters}L): Este motor lleva ${cap.litersLabel}. ` +
            `El paquete base trae ${cap.comboLiters}L, así que faltan EXACTAMENTE ${cap.needsExtraLiters} litro(s) adicional(es) para completar ${cap.comboLiters + cap.needsExtraLiters}L sin quedarse corto. ` +
            `DEBES sumar ${cap.needsExtraLiters}x ${litroAdicionalRecomendado.name} [SKU: ${litroAdicionalRecomendado.sku}] ($${litroAdicionalRecomendado.priceIva.toFixed(2)} c/u) => TOTAL EXACTO DEL KIT COMPLETO: $${combinedTotalUsd.toFixed(2)} c/IVA (inclúyelo así en gestionar_carrito).`;
        }
      }
    }

    return {
      consulta: rawQuery,
      enStock: candidates.length > 0,
      nota:
        "Dato de catálogo: cada Combo MANNOL incluye aceite, filtro de aceite Advance y Cockpit Care con esponja de regalo (no requiere filtro de aceite adicional). Vendemos kits y productos completos; no realizamos mano de obra de taller mecánico.",
      ...(alertaLitraje ? { alertaLitraje, litroAdicionalRecomendado } : {}),
      recomendacionPrincipal: primary,
      candidatos: candidates,
    };
  }

  // Multicategory + free text search across all 425 retail SKUs (ocultar filtros si aún no se conoce vehículo)
  const multi = resolveMulticategoryCatalogQuery(expanded, ctx.activeVehicle);
  for (const item of (multi?.items || []).slice(0, 4)) {
    if (!hasKnownVehicle && item.subCategory === "filtros") continue;
    pushCandidate(toCandidatePayload(item));
  }
  for (const item of searchFreeTextRetailCatalog(rawQuery, 4, ctx.activeVehicle)) {
    if (!hasKnownVehicle && item.subCategory === "filtros") continue;
    if (candidates.length >= 5) break;
    pushCandidate(toCandidatePayload(item));
  }

  // Best single recommendation heuristic (e.g., LP-MAN-052 for injector cleaner gasolina, LP-MAN-011 for motor flush)
  let primary = candidates[0] || null;
  if (/inyector|humo\s+negro|traga\s+gasolina|ahogado/.test(expanded) && !/diesel/.test(expanded)) {
    primary =
      candidates.find((c) => c.sku.toUpperCase() === "LP-MAN-052") ||
      candidates.find((c) => c.sku.toUpperCase() === "LP-MAN-036") ||
      primary;
  } else if (/flush|limpiar.*motor|lavado\s+interno/.test(expanded)) {
    primary = candidates.find((c) => c.sku.toUpperCase() === "LP-MAN-011") || primary;
  }

  if (primary && ctx.primaryRecommendedPriceUsd === null) {
    ctx.primaryRecommendedPriceUsd = primary.priceIva;
  }

  return {
    consulta: rawQuery,
    enStock: candidates.length > 0,
    nota: asksFilterOnly
      ? "Si el cliente ya lleva un Combo MANNOL de aceite, el filtro de aceite Advance ya viene incluido gratis dentro del combo."
      : multi?.note || undefined,
    recomendacionPrincipal: primary,
    candidatos: candidates,
  };
}

function computeCartTotals(cartItems: CartItem[], defaultTradeIn: boolean | null) {
  let hasBattery = false;
  let batteryTradeInPending = false;
  const pricesNormal: number[] = [];
  const pricesWithTradeIn: number[] = [];
  const pricesWithoutTradeIn: number[] = [];

  for (const item of cartItems) {
    const qty = Math.max(1, Math.round(item.qty || 1));
    if (item.isBattery && item.priceWithTradeIn && item.priceWithoutTradeIn) {
      hasBattery = true;
      const ti = item.batteryTradeIn !== undefined && item.batteryTradeIn !== null ? item.batteryTradeIn : defaultTradeIn;
      if (ti === null) batteryTradeInPending = true;
      const chosen = ti === false ? item.priceWithoutTradeIn : item.priceWithTradeIn;
      for (let i = 0; i < qty; i++) {
        pricesNormal.push(chosen);
        pricesWithTradeIn.push(item.priceWithTradeIn);
        pricesWithoutTradeIn.push(item.priceWithoutTradeIn);
      }
    } else {
      for (let i = 0; i < qty; i++) {
        pricesNormal.push(item.unitPriceIva);
        pricesWithTradeIn.push(item.unitPriceIva);
        pricesWithoutTradeIn.push(item.unitPriceIva);
      }
    }
  }

  const totalUsd = sumExactPricesIva(pricesNormal);
  const totalWithTradeInUsd = hasBattery ? sumExactPricesIva(pricesWithTradeIn) : totalUsd;
  const totalWithoutTradeInUsd = hasBattery ? sumExactPricesIva(pricesWithoutTradeIn) : totalUsd;
  const qualifiesFreeShipping = hasBattery || totalUsd >= FREE_SHIPPING_THRESHOLD_USD;
  const missingForFreeShipping = qualifiesFreeShipping
    ? 0
    : Number((FREE_SHIPPING_THRESHOLD_USD - totalUsd).toFixed(2));

  return {
    totalUsd,
    hasBattery,
    batteryTradeInPending,
    totalWithTradeInUsd,
    totalWithoutTradeInUsd,
    qualifiesFreeShipping,
    missingForFreeShipping,
  };
}

function buildValidatedCartItem(
  sku: string,
  qty = 1,
  batteryTradeIn?: boolean | null
): CartItem | null {
  const cleanSku = (sku || "").trim().toUpperCase();
  if (!cleanSku || cleanSku === "ECOVLBAT") return null;
  const raw = getCatalogItemBySku(cleanSku);
  const idx = getIndexedCatalogEntry(cleanSku);
  if (!raw || raw.retail_hidden) return null;

  const bat = computeBatteryDiscountPricing(raw);
  const safeQty = Math.max(1, Math.min(200, Math.round(Number(qty) || 1)));
  const unitPriceIva = bat
    ? batteryTradeIn === false
      ? bat.priceWithoutTradeIn
      : bat.priceWithTradeIn
    : resolveCatalogPriceIva(raw);

  return {
    sku: raw.sku,
    name: formatHumanProductName(raw.sku, raw.name),
    brand: raw.brand || idx?.brand,
    presentation: raw.presentation || idx?.presentation,
    unitPriceIva,
    qty: safeQty,
    subCategory: idx?.subCategory,
    ...(bat
      ? {
          isBattery: true,
          batteryTradeIn: batteryTradeIn ?? null,
          listPriceIva: bat.listPriceIva,
          priceWithTradeIn: bat.priceWithTradeIn,
          priceWithoutTradeIn: bat.priceWithoutTradeIn,
        }
      : {}),
  };
}

const CURATED_ECUADOR_VEHICLE_SPECS: Array<{
  regex: RegExp;
  label: string;
  specSummary: string;
}> = [
  {
    regex: /tiggo\s*7(?:\s*pro)?/i,
    label: "Chery Tiggo 7 / Tiggo 7 Pro (1.5T Gasolina)",
    specSummary:
      "Aceite motor recomendado: 5W-30 100% Sintético (norma API SP / ACEA C2/C3), capacidad ~4.5 a 4.7 litros con filtro (SUPERIOR AL GALÓN DE 4L: requiere sumar 1 litro adicional de 5W-30 para completar el cambio sin quedarse corto). " +
      "Batería habitual: Grupo 42 / DIN55 (55–65 Ah, 12V — verificar polaridad de bornes al instalar).",
  },
  {
    regex: /tiggo\s*[348]/i,
    label: "Chery Tiggo 3 / 4 / 8 (Gasolina / Turbo)",
    specSummary:
      "Aceite motor recomendado: 5W-30 100% Sintético (o 10W-40 semisintético en motores aspirados >100.000 km), ~4.3 a 4.7 litros con filtro (supera el galón de 4L en versiones 1.5T/2.0: ofrecer 1 litro adicional de 5W-30). " +
      "Batería habitual: Grupo 42 o Grupo 24 (55–65 Ah, 12V — verificar polaridad al instalar).",
  },
  {
    regex: /\b(volkswagen|vw)?\s*gol\b/i,
    label: "Volkswagen Gol (1.6 Gasolina)",
    specSummary:
      "Aceite motor recomendado: 10W-40 Semisintético o 5W-40 Sintético (norma VW 502.00 / API SN), capacidad ~4.0 litros con filtro. " +
      "Batería habitual: Grupo 42 (55–60 Ah, 12V).",
  },
  {
    regex: /coolray|geely/i,
    label: "Geely Coolray (1.5T Gasolina)",
    specSummary:
      "Aceite motor recomendado: 5W-30 o 0W-20 100% Sintético API SP, capacidad ~4.5 a 5.5 litros según versión (supera el galón de 4L: ofrecer 1 a 2 litros adicionales). " +
      "Batería habitual: Grupo 42 / DIN60 (60 Ah, 12V).",
  },
  {
    regex: /jetour\s*dashing/i,
    label: "Jetour Dashing (1.5T / 1.6T Gasolina)",
    specSummary:
      "Aceite motor recomendado: 5W-30 100% Sintético API SP, capacidad ~4.5 a 4.8 litros con filtro (supera el galón de 4L: ofrecer 1 litro adicional de 5W-30). " +
      "Batería habitual: Grupo 42 / DIN60 (60 Ah, 12V).",
  },
  {
    regex: /changan\s*(cs35|cs55|alsvin)/i,
    label: "Changan CS35 / CS55 / Alsvin (Gasolina)",
    specSummary:
      "Aceite motor recomendado: 5W-30 100% Sintético API SP (4.0 a 4.5 litros con filtro). " +
      "Batería habitual: Grupo 42 (55–60 Ah, 12V).",
  },
  {
    regex: /prado|land\s*cruiser/i,
    label: "Toyota Land Cruiser Prado",
    specSummary:
      "Aceite motor: Diésel 3.0/2.8 -> 15W-40 o 5W-40 Turbo Diésel (~7.0–7.5 L); Gasolina 4.0 V6 -> 5W-30 Sintético (~6.0 L). " +
      "Batería habitual: Grupo 27 (85–95 Ah, 12V).",
  },
  {
    regex: /l200|montero/i,
    label: "Mitsubishi L200 / Montero Sport (Diésel)",
    specSummary:
      "Aceite motor recomendado: 15W-40 Semisintético o 5W-40 Full Sintético Diésel (~6.5 a 7.5 L con filtro). " +
      "Batería habitual: Grupo 27 (85–95 Ah, 12V).",
  },
];

function scrubWebSnippet(raw: string): string {
  return raw
    .replace(/\$?\s*\d+(?:[.,]\d+)?\s*(?:usd|eur|pesos|dolares|\$)/gi, "")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, 380);
}

async function runControlledWebSpecLookup(vehiculo: string, consulta: string): Promise<{
  snippet: string | null;
  source: string | null;
}> {
  const cleanVeh = vehiculo.replace(/[^\w\s.\-]/g, " ").trim().slice(0, 80);
  const cleanQ = consulta
    .replace(/\b(precio|valor|costo|tienda|comprar|mercado\s*libre|amazon|ebay)\b/gi, "")
    .replace(/[^\w\s.\-]/g, " ")
    .trim()
    .slice(0, 80);
  const query = `${cleanVeh} ${cleanQ || "engine oil viscosity battery group"}`.trim();

  try {
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const ddgResp = await fetch(ddgUrl, { signal: AbortSignal.timeout(2400) });
    if (ddgResp.ok) {
      const ddg = (await ddgResp.json()) as {
        AbstractText?: string;
        RelatedTopics?: Array<{ Text?: string }>;
      };
      const combined = [ddg.AbstractText || "", ...(ddg.RelatedTopics || []).slice(0, 2).map((t) => t.Text || "")]
        .join(" ")
        .trim();
      const scrubbed = scrubWebSnippet(combined);
      if (scrubbed.length >= 40 && /\b(0w|5w|10w|15w|liter|litro|engine|motor|turbo|battery|bateria|ah)\b/i.test(scrubbed)) {
        return { snippet: scrubbed, source: "duckduckgo_tecnico" };
      }
    }
  } catch {
    // Strict 2.4s timeout guard
  }

  try {
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      cleanVeh
    )}&srlimit=1&format=json&utf8=1`;
    const wikiResp = await fetch(wikiUrl, { signal: AbortSignal.timeout(2200) });
    if (wikiResp.ok) {
      const wj = (await wikiResp.json()) as {
        query?: { search?: Array<{ title?: string; snippet?: string }> };
      };
      const first = wj.query?.search?.[0];
      if (first?.snippet) {
        const plain = scrubWebSnippet(first.snippet.replace(/<[^>]+>/g, " "));
        if (plain.length >= 30) {
          return { snippet: `${first.title || cleanVeh}: ${plain}`, source: "wikipedia_tecnico" };
        }
      }
    }
  } catch {
    // Strict 2.2s timeout guard
  }

  return { snippet: null, source: null };
}

export async function executeMiloToolCall(
  toolName: string,
  rawArgs: Record<string, unknown>,
  ctx: MiloToolExecutionContext
): Promise<Record<string, unknown>> {
  ctx.toolsUsed.push(toolName);

  // 1. buscar_en_catalogo
  if (toolName === "buscar_en_catalogo") {
    const vehArg = typeof rawArgs.vehiculo === "string" ? rawArgs.vehiculo.trim() : "";
    if (vehArg) {
      const ex = extractVehicleFromText(vehArg);
      if (ex.profile) ctx.activeVehicle = mergeVehicleProfiles(ctx.activeVehicle, ex.profile);
    }

    const rawConsultas = Array.isArray(rawArgs.consultas)
      ? rawArgs.consultas.map((q) => String(q || "").trim()).filter(Boolean).slice(0, 6)
      : typeof rawArgs.consulta === "string" && rawArgs.consulta.trim()
      ? [rawArgs.consulta.trim()]
      : [];

    if (rawConsultas.length === 0) {
      return { ok: false, error: "Debes pasar al menos una consulta en 'consultas'." };
    }

    const resultados = rawConsultas.map((q) => searchSingleQuery(q, ctx));
    const allSkus = resultados.flatMap((r) => r.candidatos.map((c) => c.sku));
    if (allSkus.length > 0) {
      ctx.commercialState.lastRecommendedSkus = Array.from(new Set(allSkus)).slice(0, 12);
    }

    const anyBattery = resultados.some((r) => r.candidatos.some((c) => c.isBattery));
    const anyCombo = resultados.some((r) => r.candidatos.some((c) => c.includesAdvanceFilterAndGift));
    if (anyBattery && anyCombo) ctx.intentTag = "bateria_y_combo";
    else if (anyBattery) ctx.intentTag = "bateria_domicilio";
    else if (anyCombo) ctx.intentTag = "combo_lubricante";
    else if (resultados.every((r) => !r.enStock)) ctx.intentTag = "producto_sin_stock";
    else ctx.intentTag = "milo_multicategoria";

    return {
      ok: true,
      vehiculoActivo: formatVehicleLabel(ctx.activeVehicle) || null,
      resultados,
    };
  }

  // 2. gestionar_carrito
  if (toolName === "gestionar_carrito") {
    const accion = String(rawArgs.accion || "summary").toLowerCase();
    const rawItems = Array.isArray(rawArgs.items)
      ? (rawArgs.items as Array<{ sku?: string; qty?: number; battery_trade_in?: boolean }>)
      : [];

    let nextCart = [...(ctx.commercialState.cartItems || [])];
    const warnings: string[] = [];

    if (accion === "clear") {
      nextCart = [];
    } else if (accion === "remove") {
      const toRemove = new Set(rawItems.map((i) => String(i.sku || "").trim().toUpperCase()));
      nextCart = nextCart.filter((c) => !toRemove.has(c.sku.toUpperCase()));
    } else if (accion === "set" || accion === "add") {
      if (accion === "set") nextCart = [];
      for (const reqItem of rawItems) {
        const ti = typeof reqItem.battery_trade_in === "boolean" ? reqItem.battery_trade_in : ctx.commercialState.batteryTradeIn;
        if (typeof reqItem.battery_trade_in === "boolean") {
          ctx.commercialState.batteryTradeIn = reqItem.battery_trade_in;
        }
        const validated = buildValidatedCartItem(String(reqItem.sku || ""), reqItem.qty ?? 1, ti);
        if (!validated) {
          warnings.push(`SKU inválido o no disponible: ${String(reqItem.sku || "")}`);
          continue;
        }
        const existingIdx = nextCart.findIndex((c) => c.sku.toUpperCase() === validated.sku.toUpperCase());
        if (existingIdx >= 0) {
          nextCart[existingIdx] = {
            ...validated,
            qty: accion === "add" ? nextCart[existingIdx].qty + validated.qty : validated.qty,
          };
        } else {
          nextCart.push(validated);
        }
      }

      // Evitar doble cobro de filtro de aceite si ya lleva un Combo MANNOL que lo incluye
      const hasMannolCombo = nextCart.some((i) => i.sku.toUpperCase().startsWith("COMBO-MANNOL-"));
      if (hasMannolCombo) {
        const beforeLen = nextCart.length;
        nextCart = nextCart.filter((i) => {
          const isOilFilter = i.subCategory === "filtros" && /aceite|^078ao-|^080ao-/i.test(`${i.sku} ${i.name}`);
          return !isOilFilter;
        });
        if (nextCart.length < beforeLen) {
          warnings.push("Se omitió el filtro de aceite suelto porque el Combo MANNOL ya incluye filtro Advance + Cockpit Care.");
        }
      }

      // Aviso de litraje (> 4.0L / > 7.0L) si el carrito lleva aceite sin el complemento de 1L suficiente
      const oilBaseItem = nextCart.find(
        (i) =>
          /^COMBO-MANNOL-[12][ABC]$/i.test(i.sku) ||
          (i.subCategory === "lubricantes_motor" && /\b(galon|4\s*l|5\s*l|4\s*litros?|3\.78)\b/i.test(`${i.presentation || ""} ${i.name}`))
      );
      const extra1LQty = nextCart
        .filter((i) => /1\s*litro|1\s*lt|\b1l\b/i.test(`${i.presentation || ""} ${i.name}`))
        .reduce((acc, i) => acc + Math.max(1, i.qty || 1), 0);
      if (oilBaseItem) {
        const cap = resolveVehicleOilCapacityTopUp(ctx.activeVehicle, "", {
          sku: oilBaseItem.sku,
          name: oilBaseItem.name,
          brand: oilBaseItem.brand || "",
          presentation: oilBaseItem.presentation,
        });
        if (cap && cap.needsExtraLiters > extra1LQty) {
          const remainingExtra = cap.needsExtraLiters - extra1LQty;
          const topEntry = cap.preferred1LSkus.map((s) => getIndexedCatalogEntry(s)).find(Boolean);
          if (topEntry) {
            recordPrice(ctx, topEntry.priceIva);
            ctx.matchedSkus.add(topEntry.sku);
            warnings.push(
              `ALERTA LITRAJE: Este vehículo requiere ${cap.litersLabel}. Para completar sin quedarse corto faltan ${remainingExtra}x ${formatHumanProductName(topEntry.sku, topEntry.name)} [SKU: ${topEntry.sku}] ($${topEntry.priceIva.toFixed(2)} c/u c/IVA).`
            );
          }
        }
      }
    }

    ctx.commercialState.cartItems = nextCart;
    const totals = computeCartTotals(nextCart, ctx.commercialState.batteryTradeIn);
    for (const item of nextCart) {
      ctx.matchedSkus.add(item.sku);
      recordPrice(ctx, item.unitPriceIva);
      if (item.priceWithTradeIn) recordPrice(ctx, item.priceWithTradeIn);
      if (item.priceWithoutTradeIn) recordPrice(ctx, item.priceWithoutTradeIn);
    }
    recordPrice(ctx, totals.totalUsd);
    recordPrice(ctx, totals.totalWithTradeInUsd);
    recordPrice(ctx, totals.totalWithoutTradeInUsd);
    if (totals.missingForFreeShipping > 0) recordPrice(ctx, totals.missingForFreeShipping);
    ctx.intentTag = "resumen_carrito";

    return {
      ok: true,
      accion,
      carrito: nextCart.map((i) => ({
        sku: i.sku,
        name: i.name,
        qty: i.qty,
        unitPriceIva: i.unitPriceIva,
        subtotalIva: Number((i.unitPriceIva * i.qty).toFixed(2)),
        ...(i.isBattery
          ? {
              isBattery: true,
              priceWithTradeIn: i.priceWithTradeIn,
              priceWithoutTradeIn: i.priceWithoutTradeIn,
              batteryTradeIn: i.batteryTradeIn ?? ctx.commercialState.batteryTradeIn,
            }
          : {}),
      })),
      totalUsd: totals.totalUsd,
      hasBattery: totals.hasBattery,
      batteryTradeInConfirmado: !totals.batteryTradeInPending,
      ...(totals.hasBattery
        ? {
            totalConBateriaUsadaUsd: totals.totalWithTradeInUsd,
            totalSinBateriaUsadaUsd: totals.totalWithoutTradeInUsd,
          }
        : {}),
      envioGratisPedernales: totals.qualifiesFreeShipping,
      faltanteParaEnvioGratisUsd: totals.missingForFreeShipping,
      ...(warnings.length > 0 ? { notas: warnings } : {}),
    };
  }

  // 3. consultar_especificacion_vehiculo_web
  if (toolName === "consultar_especificacion_vehiculo_web") {
    const vehiculo = String(rawArgs.vehiculo || formatVehicleLabel(ctx.activeVehicle) || "").trim();
    const consulta = String(rawArgs.consulta_tecnica || "viscosidad aceite litros bateria").trim();
    if (!vehiculo) {
      return { ok: false, error: "Indica marca y modelo del vehículo." };
    }

    const extracted = extractVehicleFromText(vehiculo);
    if (extracted.profile) {
      ctx.activeVehicle = mergeVehicleProfiles(ctx.activeVehicle, extracted.profile);
    }
    if (extracted.matchedEntry) {
      const m = extracted.matchedEntry.model;
      const enginesText = Array.isArray(m.engines) ? m.engines.join(", ") : "";
      const lubText = (m.recommendedCategories.lubricantes || []).join(", ");
      const batText = (m.recommendedCategories.baterias || []).join(", ");
      return {
        ok: true,
        source: "base_local_liderpro",
        vehiculo: `${extracted.matchedEntry.make} ${m.model}`,
        especificacion: `Motores: ${enginesText || "estándar"}. Aceite/mantenimiento: ${lubText || "consultar catálogo"}. Baterías sugeridas: ${batText || "consultar catálogo"}.`,
      };
    }

    const cacheKey = normalizeText(`${vehiculo}|${consulta}`).replace(/\s+/g, " ").trim();
    const cached = await getCachedVehicleSpec(cacheKey);
    if (cached) {
      return {
        ok: true,
        source: `cache_postgres:${cached.sourceLabel || "tecnico"}`,
        vehiculo: cached.vehicleLabel,
        especificacion: cached.specSummary,
      };
    }

    const curated = CURATED_ECUADOR_VEHICLE_SPECS.find((c) => c.regex.test(vehiculo));
    const webRes = await runControlledWebSpecLookup(vehiculo, consulta);

    const specSummary = curated
      ? `${curated.specSummary}${webRes.snippet ? ` (Referencia web: ${webRes.snippet})` : ""}`
      : webRes.snippet ||
        `No se obtuvo ficha exacta de fábrica en línea para ${vehiculo}. Como guía segura: confirmar en el manual o tapa de llenado la viscosidad (habitualmente 5W-30 sintético en motores modernos a gasolina o 15W-40/5W-40 en diésel) y verificar polaridad y tamaño de la bandeja de batería antes de instalar.`;

    const sourceLabel = curated
      ? webRes.source
        ? `referencia_ecuador+${webRes.source}`
        : "referencia_tecnica_ecuador"
      : webRes.source || "guia_segura_taller";

    await setCachedVehicleSpec({
      cacheKey,
      vehicleLabel: curated?.label || vehiculo,
      queryText: consulta,
      specSummary,
      sourceLabel,
    });

    return {
      ok: true,
      source: sourceLabel,
      vehiculo: curated?.label || vehiculo,
      especificacion: specSummary,
    };
  }

  // 4. registrar_pedido
  if (toolName === "registrar_pedido") {
    const nombre = String(rawArgs.nombre_cliente || ctx.customerName || "").trim();
    const telefono = String(rawArgs.telefono || ctx.customerPhone || "").trim() || null;
    const ciudad = String(rawArgs.ciudad || ctx.city || "").trim() || extractCityFromText(String(rawArgs.direccion_o_terminal || "")) || "Pedernales";
    const tipoEntrega = String(rawArgs.tipo_entrega || "domicilio_pedernales").trim();
    const direccionRaw = String(rawArgs.direccion_o_terminal || "").trim();
    const cedula = String(rawArgs.cedula_o_ruc || "").trim();
    const metodoPago = String(rawArgs.metodo_pago || "").trim();

    if (Array.isArray(rawArgs.items) && rawArgs.items.length > 0 && ctx.commercialState.cartItems.length === 0) {
      await executeMiloToolCall("gestionar_carrito", { accion: "set", items: rawArgs.items }, ctx);
    }

    const cart = ctx.commercialState.cartItems || [];
    const missing: string[] = [];
    if (cart.length === 0) missing.push("Productos en el carrito (usa gestionar_carrito primero)");
    if (!nombre) missing.push("Nombre completo del cliente");
    if (!direccionRaw && tipoEntrega !== "retiro_tienda_pedernales") missing.push("Dirección exacta o terminal/cooperativa");
    if (!metodoPago) missing.push("Forma de pago (efectivo en Pedernales o transferencia a Banco Pichincha)");

    const totals = computeCartTotals(cart, ctx.commercialState.batteryTradeIn);
    if (totals.batteryTradeInPending) {
      missing.push("Confirmar si entrega la batería usada (Sí/No)");
    }

    if (missing.length > 0) {
      ctx.intentTag = "cierre_pedido_pendiente_datos";
      return {
        ok: false,
        camposFaltantes: missing,
        totalActualUsd: totals.totalUsd,
      };
    }

    const metodoNorm = normalizeText(metodoPago);
    const isTransfer =
      /transferencia|pichincha|deposito|banco|interbancari|deuna/.test(metodoNorm) ||
      tipoEntrega === "envio_cooperativa_nacional";
    const orderStatus = isTransfer ? "awaiting_payment" : "pending_dispatch";
    const paymentStatus = isTransfer ? "awaiting_receipt" : "not_applicable";
    const cleanPaymentLabel = isTransfer
      ? `Transferencia ${OFFICIAL_BANK_ACCOUNT.bank} (Cuenta ${OFFICIAL_BANK_ACCOUNT.accountNumber})`
      : metodoPago;

    const deliveryLabel =
      tipoEntrega === "retiro_tienda_pedernales"
        ? `Retiro en bodega Pedernales (Vía al Carmen)${cedula ? ` | CI/RUC: ${cedula}` : ""}`
        : tipoEntrega === "envio_cooperativa_nacional"
        ? `Envío nacional a ${ciudad}: ${direccionRaw}${cedula ? ` | CI/RUC: ${cedula}` : ""}`
        : `${direccionRaw}${normalizeText(direccionRaw).includes(normalizeText(ciudad)) ? "" : `, ${ciudad}`}${cedula ? ` | CI/RUC: ${cedula}` : ""}`;

    const { order } = await insertOrder({
      sessionId: ctx.sessionId,
      customerName: nombre,
      phone: telefono,
      vehicle: ctx.activeVehicle,
      itemsJson: cart.map((i) => ({
        sku: i.sku,
        name: i.name,
        unitPriceIva: i.unitPriceIva,
        qty: i.qty,
      })),
      totalUsd: totals.totalUsd,
      deliveryAddress: deliveryLabel,
      paymentMethod: cleanPaymentLabel,
      status: orderStatus,
      paymentStatus,
      adId: ctx.adAttribution?.adId ?? null,
      adTag: ctx.adAttribution?.adTag ?? null,
      ctwaClid: ctx.adAttribution?.ctwaClid ?? null,
    });

    ctx.customerName = nombre;
    ctx.city = ciudad;
    ctx.commercialState.salesStage = "pedido_confirmado";
    ctx.createdOrder = order;
    ctx.intentTag = "pedido_confirmado";
    recordPrice(ctx, order.totalUsd);

    return {
      ok: true,
      orderId: order.id,
      customerName: nombre,
      ciudad,
      deliveryAddress: deliveryLabel,
      paymentMethod: cleanPaymentLabel,
      status: order.status,
      paymentStatus: order.paymentStatus,
      totalUsd: order.totalUsd,
      items: order.itemsJson,
      ...(isTransfer
        ? {
            datosBancariosOficiales: formatOfficialBankTransferDetails(),
            instruccionObligatoria:
              "ENTREGA al cliente los datos EXACTOS de nuestra única cuenta en Banco Pichincha (Cuenta de Ahorros 2216090525, C.I. 1308068814, Titular ADRIAN MOSQUERA), aclara que interbancarias solo desde bancos con convenio directo, y solicita que envíe el COMPROBANTE COMPLETO (fecha, monto, número de comprobante y titular visible) para verificación. PROHIBIDO prometer hora de despacho o autorizar retiro antes de verificar el pago.",
          }
        : {}),
    };
  }

  // 5. escalar_a_asesor_humano
  if (toolName === "escalar_a_asesor_humano") {
    const motivo = String(rawArgs.motivo || "Atención de asesor humano solicitada").trim();
    const resumen = String(rawArgs.resumen_corto || motivo).trim();
    const rawUrg = String(rawArgs.urgencia || "alta").toLowerCase();
    const urgency: EscalationUrgency = rawUrg === "media" || rawUrg === "baja" ? rawUrg : "alta";

    ctx.customerType = extractCustomerType(`${motivo} ${resumen}`, ctx.customerType);
    const quotedItemsSummary =
      ctx.commercialState.cartItems.length > 0
        ? ctx.commercialState.cartItems.map((i) => `${i.qty}x ${i.name} ($${i.unitPriceIva.toFixed(2)})`).join(" + ")
        : ctx.primaryQuotedItems && ctx.primaryQuotedItems.length > 0
        ? ctx.primaryQuotedItems.map((i) => (i.qty > 1 ? `${i.qty}× ${i.sku}` : i.sku)).join(" + ")
        : Array.from(ctx.matchedSkus).slice(0, 2).join(", ") || null;
    const esc = await flagCustomerHumanEscalation({
      phoneOrSession: ctx.sessionId,
      reason: motivo,
      summary: resumen,
      urgency,
      customerName: ctx.customerName,
      customerPhone: ctx.customerPhone,
      city: ctx.city,
      adTag: ctx.adAttribution?.adTag ?? null,
      vehicleLabel: formatVehicleLabel(ctx.activeVehicle) || null,
      quotedSummary: quotedItemsSummary,
      sendLiveAlerts: ctx.sendLiveAlerts !== false,
    });

    ctx.escalatedToHuman = true;
    ctx.escalationAlertPreview = esc.alertPreviewMasked;
    ctx.intentTag = "escalamiento_humano";

    return {
      ok: true,
      escalated: true,
      adminWaNotified: esc.adminWaSent,
      telegramNotified: esc.telegramSent,
      debounced: esc.debounced,
      urgencia: urgency,
      instrucciones:
        "Responde en máximo 2 líneas directas avisando que ya pasaste el dato exacto al asesor para confirmarle ese punto cuanto antes. PROHIBIDO inventar fletes, precios mayoristas, plazos de crédito o descuentos no autorizados.",
    };
  }

  return { ok: false, error: `Herramienta desconocida: ${toolName}` };
}
