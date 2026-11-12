"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Package, Plus, Check, ShoppingBag, ArrowUpRight, Sparkles } from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { trackEvent } from "@/lib/analytics";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { useWhatsAppSelector } from "@/context/WhatsAppSelectorContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0
      ? product.variants.find((v) => v.price !== null && v.price !== undefined) || product.variants[0]
      : null
  );
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, items } = useQuoteBasket();
  const { openSelector } = useWhatsAppSelector();

  const activeSku = selectedVariant ? (selectedVariant.officialSku || selectedVariant.sku) : product.sku;
  const activeImage = selectedVariant?.imageUrl || product.imageUrl;
  const rawPresentation = selectedVariant
    ? selectedVariant.presentation
    : (product.volume || product.plates || undefined);
  const presentation = rawPresentation?.replace("1 Galón / 5L", "1 Galón");

  const activePrice = selectedVariant
    ? (selectedVariant.priceEstimate !== undefined ? selectedVariant.priceEstimate : product.priceEstimate)
    : product.priceEstimate;
  const activeNumericPrice = selectedVariant
    ? (selectedVariant.price !== undefined ? selectedVariant.price : product.price)
    : product.price;

  const inBasket = items.find((it) => it.product.sku === activeSku);
  const isMannolPromoEligible =
    product.brand.toUpperCase() === "MANNOL" &&
    (product.category === "lubricantes" || product.category === "aditivos");

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
          sku: activeSku,
          name: selectedVariant.name.replace("1 Galón / 5L", "1 Galón"),
          volume: presentation,
          imageUrl: selectedVariant.imageUrl,
          price: activeNumericPrice,
          priceEstimate: activePrice,
        }
      : {
          ...product,
          sku: activeSku,
          price: activeNumericPrice,
          priceEstimate: activePrice,
        };
    addItem(productToAdd, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const variantsList =
    product.variants && product.variants.length > 1
      ? product.variants.slice(0, 4)
      : [];

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200/90 hover:border-[#0A3B8C] shadow-xs hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Large Institutional Product Image Stage */}
        <div className="relative aspect-square w-full min-h-[245px] sm:min-h-[265px] bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40 p-3 sm:p-4 flex items-center justify-center border-b border-slate-100 overflow-hidden">
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

          {/* Top Left Badges: Brand, Best Seller & Mannol Combo Eligible */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none max-w-[72%]">
            <span className="px-2.5 py-1 bg-[#061B40]/95 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm border border-white/15">
              {product.brand}
            </span>
            {product.isBestSeller && (
              <span className="px-2 py-1 bg-gradient-to-r from-[#FFC500] to-[#FDB813] text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-lg shadow-sm border border-amber-300 flex items-center gap-1">
                ⭐ Top Ventas
              </span>
            )}
            {isMannolPromoEligible && (
              <span className="px-2 py-0.5 bg-emerald-600/95 text-white font-black text-[9.5px] uppercase tracking-wider rounded-md shadow-xs flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#FFC500]" />
                Aplica Combo Mannol
              </span>
            )}
          </div>

          {/* Presentation Pill */}
          {presentation && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-[11px] rounded-lg border border-slate-300 shadow-2xs z-10">
              {presentation}
            </div>
          )}
        </div>

        {/* Product Details — Adult-Friendly High-Contrast Typography */}
        <div className="p-4 sm:p-5 pb-2 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
            <span className="text-[#0A3B8C] font-black">{product.category}</span>
            <span className="font-mono text-slate-600 text-[11px] bg-slate-100 px-2 py-0.5 rounded-md font-bold border border-slate-200">
              Cód: {activeSku}
            </span>
          </div>

          <h3 className="text-base sm:text-[17px] font-black text-slate-950 group-hover:text-[#0A3B8C] transition-colors line-clamp-2 leading-snug min-h-[2.75rem]">
            <Link href={`/productos/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Official Gift & Stock Block — 100% Zero Public Prices */}
          <div className="bg-[#09152B] border border-[#FACC15]/40 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2 text-white">
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#FACC15]">
                🎁 Cotizar + Reclamar Regalo
              </span>
              <span className="text-xs sm:text-sm font-black text-white tracking-tight">
                {presentation ? `Presentación: ${presentation}` : "Disponible en Bodega"}
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block px-2 py-0.5 bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-black rounded-md border border-[#22C55E]/40">
                ✓ Stock Activo
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-2 leading-relaxed min-h-[2.2rem]">
            {product.shortSpec}
          </p>

          {/* Interactive Size Selector (Large Touch Buttons with Price Preview) */}
          {variantsList.length > 1 && (
            <div className="pt-2.5 pb-1 border-t border-slate-100 space-y-1.5">
              <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider block">
                Elige el tamaño (clic para ver precio):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {variantsList.map((v) => {
                  const vSku = v.officialSku || v.sku;
                  const isSelected = activeSku === vSku || selectedVariant?.sku === v.sku;
                  const cleanPres = v.presentation.replace("1 Galón / 5L", "1 Galón");
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
                      className={`py-2 px-2 rounded-xl text-[11px] font-black tracking-tight transition-all cursor-pointer border text-center flex flex-col items-center justify-center min-h-[42px] ${
                        isSelected
                          ? "bg-[#0A3B8C] text-white border-[#0A3B8C] shadow-sm ring-2 ring-[#0A3B8C]/20"
                          : "bg-slate-50 hover:bg-blue-50/60 text-slate-800 border-slate-200 hover:border-[#0A3B8C]/40"
                      }`}
                    >
                      <span className="leading-tight">{cleanPres}</span>
                      <span
                        className={`text-[9.5px] font-extrabold ${
                          isSelected ? "text-[#FACC15]" : "text-emerald-700"
                        }`}
                      >
                        ✓ Disponible
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons — Adult-Friendly High Touch Targets */}
      <div className="p-4 sm:p-5 pt-2 space-y-2">
        {/* Primary Row: Pedir por WhatsApp & Ver Ficha */}
        <div className="grid grid-cols-12 gap-2">
          <button
            type="button"
            onClick={() => {
              handleWhatsApp();
              openSelector({
                itemTitle: `${product.name}${presentation ? ` (${presentation})` : ""}`,
                sku: activeSku,
                sourceLocation: "product_card",
              });
            }}
            className="col-span-7 btn-whatsapp !py-3 !px-2.5 !text-[11px] font-black uppercase tracking-tight rounded-xl flex items-center justify-center gap-1.5 shadow-sm min-h-[44px] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>🎁 Cotizar + Regalo</span>
          </button>

          <Link
            href={`/productos/${product.slug}`}
            className="col-span-5 btn-secondary !py-3 !px-2.5 !text-xs font-black text-center flex items-center justify-center gap-1 hover:border-[#0A3B8C] hover:text-[#0A3B8C] rounded-xl min-h-[44px]"
          >
            <span>Ver Ficha</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Link>
        </div>

        {/* Secondary Row: Add to Basket + Direct Combo Consultation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={handleAddToBasket}
            className={`w-full py-2.5 px-2.5 text-[11px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[40px] ${
              justAdded
                ? "bg-emerald-600 text-white shadow-xs"
                : inBasket
                ? "bg-[#061B40] text-[#FFC500] hover:bg-[#0A3B8C] border border-[#FFC500]/40"
                : "bg-slate-100 hover:bg-[#061B40] text-slate-800 hover:text-white border border-slate-200"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white shrink-0" />
                <span>✓ En tu Lista</span>
              </>
            ) : inBasket ? (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#FFC500] shrink-0" />
                <span>Lista ({inBasket.quantity}) +</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-[#0A3B8C] group-hover:text-[#FFC500] shrink-0" />
                <span>Añadir a Lista</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              openSelector({
                itemTitle: `${product.name} (${presentation || activeSku})`,
                customMessage: `¡Hola LiderPro! Vengo de la web y estoy viendo ${product.name} (${presentation || activeSku}). ¿Me ayudan confirmando si aplica a mi vehículo y cómo reclamar mi regalo de cortesía?`,
                sku: activeSku,
                sourceLocation: "product_card_compatibility",
              })
            }
            className="w-full py-2.5 px-2.5 text-[11px] font-black uppercase tracking-tight rounded-xl bg-amber-50 hover:bg-[#FFC500] text-amber-950 hover:text-slate-950 border border-amber-300/90 flex items-center justify-center gap-1 transition-all min-h-[40px] cursor-pointer"
            title="Consultar si este producto aplica para tu vehículo o combo"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>¿Aplica a mi auto?</span>
          </button>
        </div>
      </div>
    </div>
  );
}
