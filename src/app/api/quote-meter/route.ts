import { NextRequest, NextResponse } from "next/server";
import privateCatalog from "@/data/privatePricing.server.json";

/**
 * Medidor de Envío Gratis (privado).
 * Recibe SKUs + cantidades y devuelve solo agregados (porcentaje, faltante, flags).
 * NUNCA devuelve precios unitarios ni costos.
 */
export const runtime = "nodejs";

const FREE_SHIPPING_THRESHOLD = 35.0;
const IVA = 1.15;

interface PrivateRecord {
  sku: string;
  parent_sku?: string;
  base_price_no_iva?: number;
}

const BY_SKU = new Map<string, PrivateRecord>();
for (const r of privateCatalog as PrivateRecord[]) {
  if (r.sku) BY_SKU.set(r.sku.toLowerCase(), r);
}

/** Redondeo comercial alcista al siguiente .50 o .90 */
function commercialCeil(x: number): number {
  const base = Math.floor(x);
  for (const c of [base + 0.5, base + 0.9, base + 1.5]) {
    if (c + 1e-9 >= x) return Math.round(c * 100) / 100;
  }
  return Math.round((base + 1.9) * 100) / 100;
}

function internalValue(sku: string): number | null {
  const r =
    BY_SKU.get(sku.toLowerCase()) ||
    BY_SKU.get(sku.toLowerCase().replace(/-c\d+$/, ""));
  if (!r || typeof r.base_price_no_iva !== "number") return null;
  return commercialCeil(r.base_price_no_iva * IVA);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { items?: { sku: string; qty: number }[] };
    const items = Array.isArray(body.items) ? body.items.slice(0, 100) : [];
    let total = 0;
    let hasCombo = false;
    for (const it of items) {
      const sku = String(it.sku || "");
      const qty = Math.max(1, Math.min(999, Number(it.qty) || 1));
      if (sku.startsWith("COMBO-")) {
        hasCombo = true;
        continue;
      }
      const v = internalValue(sku);
      if (v !== null) total += v * qty;
    }
    const unlocked = hasCombo || total >= FREE_SHIPPING_THRESHOLD;
    const percent = unlocked
      ? 100
      : Math.min(99, Math.floor((total / FREE_SHIPPING_THRESHOLD) * 100));
    const missing = unlocked ? 0 : Math.max(0, FREE_SHIPPING_THRESHOLD - total);
    return NextResponse.json({
      unlocked,
      hasCombo,
      percent,
      missing: Math.round(missing * 100) / 100,
    });
  } catch {
    return NextResponse.json({ unlocked: false, hasCombo: false, percent: 0, missing: FREE_SHIPPING_THRESHOLD });
  }
}
