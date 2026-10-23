"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  MapPin,
  Check,
  MessageCircle,
  Plus,
  Minus,
  ShoppingBag,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { trackEvent } from "@/lib/analytics";

interface ProductDetailShowcaseProps {
  product: Product;
}

export default function ProductDetailShowcase({ product }: ProductDetailShowcaseProps) {
  const { addItem, setIsOpen, items } = useQuoteBasket();
  
  // Initialize with first variant if exists, or null
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const activeSku = selectedVariant ? selectedVariant.sku : product.sku;
  const activeName = selectedVariant ? selectedVariant.name : product.name;
  const activeImage = selectedVariant?.imageUrl || product.imageUrl;
  const activePresentation = selectedVariant
    ? selectedVariant.presentation
    : (product.volume || product.plates || undefined);

  const inBasketItem = items.find((it) => it.product.sku === activeSku);
  const variantsList = product.variants && product.variants.length > 1
    ? product.variants.slice(0, 3)
    : [];

  const handleSelectVariant = (v: ProductVariant) => {
    setSelectedVariant(v);
    setImgError(false);
    trackEvent("select_variant", {
      parentSku: product.sku,
      variantSku: v.sku,
      presentation: v.presentation,
    });
  };

  const handleWhatsApp = () => {
    trackEvent("whatsapp_product_detail", {
      sku: activeSku,
      brand: product.brand,
      name: activeName,
      presentation: activePresentation,
    });
  };

  const handleAddToBasket = () => {
    const productToAdd: Product = selectedVariant
      ? {
          ...product,
          sku: selectedVariant.sku,
          name: selectedVariant.name,
          volume: selectedVariant.presentation,
          imageUrl: selectedVariant.imageUrl,
        }
      : product;
    addItem(productToAdd, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2200);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-10 lg:p-12 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* ================= LEFT: Interactive Image Stage ================= */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-white via-slate-50/60 to-slate-100/40 border border-slate-200/80 p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-xs">
            {!imgError ? (
              <Image
                key={activeImage}
                src={activeImage}
                alt={`${product.brand} - ${activeName}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => setImgError(true)}
                className="object-contain p-4 sm:p-6 drop-shadow-md transition-all duration-300"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 gap-2 p-6 text-center">
                <Package className="w-16 h-16 text-slate-300" />
                <span className="text-sm font-bold text-slate-600">{product.brand}</span>
                <span className="text-xs text-slate-400">{activeName}</span>
              </div>
            )}

            {/* Badges: Brand & Best Seller */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10 pointer-events-none">
              <span className="px-3 py-1 bg-[#061B40]/95 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm border border-white/10">
                {product.brand}
              </span>
              {product.isBestSeller && (
                <span className="px-2.5 py-1 bg-gradient-to-r from-[#FFC500] to-[#FDB813] text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-lg shadow-sm border border-amber-400/80 flex items-center gap-1">
                  ⭐ Top Ventas
                </span>
              )}
            </div>

            {/* Active Presentation Tag */}
            {activePresentation && (
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 text-slate-900 font-extrabold text-xs rounded-xl border border-slate-200 shadow-sm backdrop-blur-xs z-10 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#0A3B8C]" />
                <span>{activePresentation}</span>
              </div>
            )}
          </div>

          {/* Interactive Variant Thumbnails Gallery (when product has multiple size variants) */}
          {variantsList.length > 1 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0A3B8C]" />
                  Variantes de tamaño disponibles:
                </span>
                <span className="text-[11px] text-slate-400">Click en la foto para cambiar</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {variantsList.map((v) => {
                  const isSelected = activeSku === v.sku;
                  return (
                    <button
                      key={v.sku}
                      type="button"
                      onClick={() => handleSelectVariant(v)}
                      className={`relative aspect-square rounded-xl p-2 bg-slate-50 border transition-all cursor-pointer flex flex-col items-center justify-between text-center overflow-hidden ${
                        isSelected
                          ? "border-[#0A3B8C] ring-2 ring-[#0A3B8C]/30 bg-blue-50/40 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-100/60"
                      }`}
                    >
                      <div className="relative w-full flex-1">
                        <Image
                          src={v.imageUrl}
                          alt={v.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="w-full pt-1 border-t border-slate-200/60">
                        <span className={`text-[11px] font-black block truncate ${
                          isSelected ? "text-[#0A3B8C]" : "text-slate-700"
                        }`}>
                          {v.presentation}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT: Technical Details & Actions ================= */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
              <span className="text-[#0A3B8C] font-black">{product.brand}</span>
              <span>•</span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-mono font-bold border border-slate-200">
                SKU: {activeSku}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
              {activeName}
            </h1>

            <p className="text-sm font-semibold text-[#0A3B8C]">
              {product.shortSpec}
            </p>
          </div>

          {/* Price Estimate */}
          {product.priceEstimate && (
            <div className="py-3 border-y border-slate-100 flex items-baseline gap-3">
              <span className="text-2xl font-black text-slate-950">
                {product.priceEstimate}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {product.priceNote}
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Features checkmarks */}
          <div className="space-y-2 pt-1 text-xs text-slate-700">
            {product.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Interactive Variant Size Selector (Segmented buttons) */}
          {variantsList.length > 1 && (
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-black text-slate-800">
                <span>Seleccionar Presentación / Envase:</span>
                <span className="text-[#0A3B8C] font-mono font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  SKU: {activeSku}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {variantsList.map((v) => {
                  const isSelected = activeSku === v.sku;
                  return (
                    <button
                      key={v.sku}
                      type="button"
                      onClick={() => handleSelectVariant(v)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#0A3B8C] text-white border-[#0A3B8C] shadow-sm font-black ring-2 ring-[#0A3B8C]/20"
                          : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      <div className="font-black">{v.presentation}</div>
                      <div className={`text-[10.5px] font-medium ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                        {v.stock > 0 ? `${v.stock} disponibles` : "Bajo pedido"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions Block */}
          <div className="pt-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{product.dispatchIndicator}</span>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600">Cantidad:</span>
                <div className="inline-flex items-center border border-slate-300 rounded-xl bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-slate-100 text-slate-600 rounded-l-xl transition-colors cursor-pointer"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-1 text-sm font-black text-slate-900 min-w-[2.5rem] text-center font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-slate-100 text-slate-600 rounded-r-xl transition-colors cursor-pointer"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Primary WhatsApp Direct CTA */}
              <a
                href={buildWhatsAppLink("product", {
                  brand: product.brand,
                  productName: activeName,
                  presentation: activePresentation,
                  sku: activeSku,
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsApp}
                className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-black text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer text-center"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Consultar Disponibilidad por WhatsApp</span>
              </a>

              {/* Secondary Add-to-Quote-Basket */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddToBasket}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    justAdded
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Agregado a Cotización ({quantity})</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-slate-600" />
                      <span>Agregar a Lista de Cotización</span>
                    </>
                  )}
                </button>

                {inBasketItem && (
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center gap-1.5 py-3 px-3.5 rounded-xl bg-[#0A3B8C] text-white text-xs font-bold hover:bg-[#061B40] transition-colors cursor-pointer"
                    title="Ver canasta de cotización"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ver ({items.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Reassurance Institutional Badges */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Distribuidor Autorizado Multimarca:</strong> Producto 100% original con facturación legal SRI.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-700 shrink-0" />
                <span><strong>Hub Logístico Pedernales:</strong> Despacho diario por encomienda interprovincial a las 24 provincias.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-slate-700 shrink-0" />
                <span><strong>Garantía Oficial:</strong> {product.warranty}.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
