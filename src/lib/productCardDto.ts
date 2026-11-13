import type { Product } from "@/data/products";

/**
 * Proyección ligera para tarjetas de catálogo: reduce el payload RSC serializado
 * en el HTML inicial conservando solo los campos necesarios para ProductCard.
 */
export function toCardProduct(p: Product): Product {
  return {
    ...p,
    specifications: {},
    fullSpecs: {},
    description: "",
    compatibleVehicles: [],
    features: [],
    faqs: [],
    variants: p.variants?.slice(0, 3),
  };
}
