"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Package, Plus, Check, Sparkles } from "lucide-react";
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
  const isMannolOil =
    product.brand.toUpperCase() === "MANNOL" && product.category === "lubricantes";
  const isGiftEligible =
    isMannolOil && /gal[oó]n|caneca|20\s?l/i.test(presentation || "");

  const primaryCtaLabel = isGiftEligible ? "🎁 Cotizar Combo" : "💬 Cotizar";

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
      ? product.variants.slice(0, 3)
      : [];

  // Línea única limpia de metadatos técnicos
  const metaLine =
    product.shortSpec?.split("•").slice(0, 3).join(" • ") ||
    [product.brand, presentation].filter(Boolean).join(" • ");

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#0A3B8C] shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-250 flex flex-col justify-between h-full overflow-hidden group">
      <div>
        {/* A. Imagen Clickeable con Badge Flotante ✓ Stock Activo */}
        <Link
          href={`/productos/${product.slug}`}
          className="relative block aspect-square w-full bg-gradient-to-b from-white via-slate-50/40 to-slate-100/30 p-3 flex items-center justify-center border-b border-slate-100 overflow-hidden"
        >
          {!imgError ? (
            <Image
              key={activeImage}
              src={activeImage}
              alt={`${product.brand} - ${product.name}`}
              fill
              priority={priority}
              loading={priority ? undefined : "lazy"}
              quality={85}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
              onError={() => setImgError(true)}
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-300 ease-out"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-1 p-4 text-center">
              <Package className="w-10 h-10 text-slate-300" />
              <span className="text-xs font-bold text-slate-500">{product.brand}</span>
            </div>
          )}

          {/* Top Left: Marca & Combo badge */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1 z-10 pointer-events-none">
            <span className="px-2 py-0.5 bg-[#061B40]/90 text-white text-[10px] font-black uppercase tracking-wider rounded-md">
              {product.brand}
            </span>
            {isGiftEligible && (
              <span className="px-1.5 py-0.5 bg-emerald-600/95 text-white font-black text-[9.5px] uppercase rounded-md flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-[#FFC500]" />
                Combo
              </span>
            )}
          </div>

          {/* Top Right: ✓ Stock Activo */}
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-emerald-50/95 backdrop-blur-xs text-emerald-700 border border-emerald-200 text-[10px] font-black rounded-md z-10 pointer-events-none shadow-2xs">
            ✓ Stock Activo
          </span>
        </Link>

        {/* B. Título Clickeable + 1 Línea Limpia de Metadatos (Sin Cajón Negro) */}
        <div className="p-3.5 pb-2 space-y-1.5">
          <h3 className="text-sm font-black text-slate-950 group-hover:text-[#0A3B8C] transition-colors line-clamp-2 leading-snug min-h-[2.4rem]">
            <Link href={`/productos/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-[11.5px] text-slate-600 font-semibold line-clamp-1">
            {metaLine}
          </p>

          {/* C. Selector de Presentación Compacto (32px, solo si >1 tamaño) */}
          {variantsList.length > 1 && (
            <div className="pt-1.5 flex items-center gap-1.5">
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
                    className={`flex-1 h-8 px-2 rounded-lg text-[11px] font-black transition-all cursor-pointer border truncate ${
                      isSelected
                        ? "bg-[#0A3B8C] text-white border-[#0A3B8C] shadow-2xs"
                        : "bg-slate-50 hover:bg-blue-50/60 text-slate-700 border-slate-200"
                    }`}
                  >
                    {cleanPres}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* D. Solo 2 Botones en Fila Inferior: 75% Cotizar + 25% Lista */}
      <div className="p-3.5 pt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            handleWhatsApp();
            openSelector({
              itemTitle: `${product.name}${presentation ? ` (${presentation})` : ""}`,
              sku: activeSku,
              sourceLocation: "product_card",
              isComboGift: isGiftEligible,
            });
          }}
          className="flex-[3] btn-whatsapp !py-2 !px-2.5 !text-xs font-black rounded-xl flex items-center justify-center gap-1.5 shadow-xs h-10 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
          <span className="truncate">{primaryCtaLabel}</span>
        </button>

        <button
          type="button"
          onClick={handleAddToBasket}
          className={`flex-1 h-10 px-2 text-[11px] font-black rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0 ${
            justAdded || inBasket
              ? "bg-[#061B40] text-[#FFC500] border border-[#FFC500]/50"
              : "bg-slate-100 hover:bg-[#061B40] text-slate-800 hover:text-white border border-slate-200"
          }`}
          title="Añadir a Mi Lista de Cotización"
        >
          {justAdded || inBasket ? (
            <>
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{inBasket ? `(${inBasket.quantity})` : "En Lista"}</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span>Lista</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
