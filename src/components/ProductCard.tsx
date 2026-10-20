"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Package, Plus, Check, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useQuoteBasket } from "@/context/QuoteBasketContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, items } = useQuoteBasket();

  const activeSku = selectedVariant ? selectedVariant.sku : product.sku;
  const activeImage = selectedVariant?.imageUrl || product.imageUrl;
  const presentation = selectedVariant
    ? selectedVariant.presentation
    : (product.volume || product.plates || undefined);
  const inBasket = items.find((it) => it.product.sku === activeSku);

  const handleWhatsApp = () => {
    trackEvent("whatsapp_product", {
      sku: activeSku,
      brand: product.brand,
      name: selectedVariant ? selectedVariant.name : product.name,
    });
  };

  const handleAddToBasket = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productToAdd: Product = selectedVariant
      ? {
          ...product,
          sku: selectedVariant.sku,
          name: selectedVariant.name,
          volume: selectedVariant.presentation,
          imageUrl: selectedVariant.imageUrl,
        }
      : product;
    addItem(productToAdd, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const variantsList = product.variants && product.variants.length > 1
    ? product.variants.slice(0, 3)
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#0A3B8C]/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Large Institutional Product Image Stage */}
        <div className="relative aspect-square w-full min-h-[250px] sm:min-h-[270px] bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 p-3 sm:p-4 flex items-center justify-center border-b border-slate-100/90 overflow-hidden">
          {!imgError ? (
            <Image
              key={activeImage}
              src={activeImage}
              alt={`${product.brand} - ${product.name}`}
              fill
              priority={priority}
              loading={priority ? undefined : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
              className="object-contain p-2 sm:p-3 group-hover:scale-108 transition-transform duration-500 ease-out drop-shadow-sm"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
              <Package className="w-12 h-12 text-slate-300" />
              <span className="text-xs font-bold text-slate-500">{product.brand}</span>
              <span className="text-[11px] text-slate-400 line-clamp-1">{product.name}</span>
            </div>
          )}

          {/* Badges: Brand & Best Seller */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            <span className="px-2.5 py-1 bg-[#061B40] text-white text-[10.5px] font-black uppercase tracking-wider rounded-lg shadow-sm border border-white/10 backdrop-blur-xs">
              {product.brand}
            </span>
            {product.isBestSeller && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-[#FFC500] to-[#FDB813] text-slate-950 font-black text-[9.5px] uppercase tracking-wider rounded-lg shadow-sm border border-amber-400/80 flex items-center gap-1">
                ⭐ Más Vendido
              </span>
            )}
          </div>

          {/* Presentation Pill */}
          {presentation && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 text-slate-800 font-extrabold text-[10.5px] rounded-lg border border-slate-200/90 shadow-2xs backdrop-blur-xs z-10">
              {presentation}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 sm:p-5 pb-2 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
            <span className="text-[#0A3B8C] font-black">{product.category}</span>
            <span className="font-mono text-slate-500 text-[10px] bg-slate-100 px-2 py-0.5 rounded-md font-bold border border-slate-200/60">
              SKU: {activeSku}
            </span>
          </div>

          <h3 className="text-base font-black text-slate-950 group-hover:text-[#0A3B8C] transition-colors line-clamp-2 leading-snug min-h-[2.6rem]">
            <Link href={`/productos/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed min-h-[2rem]">
            {product.shortSpec}
          </p>

          {/* Single-Row Segmented Size Selector (Maximum 3 clean options) */}
          {variantsList.length > 1 && (
            <div className="pt-2.5 pb-1 border-t border-slate-100/90 flex items-center justify-between gap-1.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider shrink-0">
                Tamaño:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {variantsList.map((v) => {
                  const isSelected = activeSku === v.sku;
                  return (
                    <button
                      key={v.sku}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedVariant(v);
                        setImgError(false);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10.5px] font-black tracking-tight transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#0A3B8C] text-white border-[#0A3B8C] shadow-2xs scale-102"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {v.presentation}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dispatch Status & Action Buttons */}
      <div className="p-4 sm:p-5 pt-2">
        <div className="mb-3 pb-2 border-b border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-800 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-200/60">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Disponible en Bodega Pedernales</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-extrabold uppercase">
              Despacho Inmediato
            </span>
          </div>

          <div className="flex items-center justify-between text-[10.5px] text-slate-500 font-medium px-0.5">
            <span>{product.warranty}</span>
            <span className="font-bold text-slate-800 uppercase tracking-tight">{product.applicationType}</span>
          </div>
        </div>

        {/* WhatsApp & Ficha Grid */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <a
            href={buildWhatsAppLink("product", {
              brand: product.brand,
              productName: selectedVariant ? selectedVariant.name : product.name,
              presentation: presentation || undefined,
              sku: activeSku,
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="btn-whatsapp !py-2.5 !px-2.5 !text-[11.5px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>WhatsApp</span>
          </a>

          <Link
            href={`/productos/${product.slug}`}
            className="btn-secondary !py-2.5 !px-2.5 !text-[11.5px] font-bold text-center flex items-center justify-center gap-1 hover:border-[#0A3B8C] hover:text-[#0A3B8C] rounded-xl"
          >
            <span>Ver Ficha</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>

        {/* Quick Add to Quote Basket */}
        <button
          type="button"
          onClick={handleAddToBasket}
          className={`w-full py-2.5 px-3 text-[11px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            justAdded
              ? "bg-emerald-600 text-white shadow-xs"
              : inBasket
              ? "bg-[#061B40] text-[#FFC500] hover:bg-[#0A3B8C] border border-[#FFC500]/40"
              : "bg-slate-100 hover:bg-[#061B40] text-slate-700 hover:text-white border border-slate-200/90"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>✓ Añadido a Cotización</span>
            </>
          ) : inBasket ? (
            <>
              <ShoppingBag className="w-4 h-4 text-[#FFC500]" />
              <span>En tu lista ({inBasket.quantity}) • Añadir +</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 text-[#0A3B8C] group-hover:text-[#FFC500]" />
              <span>+ Añadir a Cotización</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
