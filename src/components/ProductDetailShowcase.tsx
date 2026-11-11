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

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0
      ? product.variants.find((v) => v.price !== null && v.price !== undefined) || product.variants[0]
      : null
  );
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const activeSku = selectedVariant ? (selectedVariant.officialSku || selectedVariant.sku) : product.sku;
  const activeName = (selectedVariant ? selectedVariant.name : product.name).replace("1 Galón / 5L", "1 Galón");
  const activeImage = selectedVariant?.imageUrl || product.imageUrl;
  const rawPresentation = selectedVariant
    ? selectedVariant.presentation
    : (product.volume || product.plates || undefined);
  const activePresentation = rawPresentation?.replace("1 Galón / 5L", "1 Galón");

  const activePrice = selectedVariant
    ? (selectedVariant.priceEstimate !== undefined ? selectedVariant.priceEstimate : product.priceEstimate)
    : product.priceEstimate;
  const activeNumericPrice = selectedVariant
    ? (selectedVariant.price !== undefined ? selectedVariant.price : product.price)
    : product.price;
  const isPriced = Boolean(
    activePrice &&
    activePrice.includes("$") &&
    activeNumericPrice !== null
  );

  const inBasketItem = items.find((it) => it.product.sku === activeSku);
  const variantsList =
    product.variants && product.variants.length > 1
      ? product.variants.slice(0, 4)
      : [];

  const handleSelectVariant = (v: ProductVariant) => {
    setSelectedVariant(v);
    setImgError(false);
    trackEvent("select_variant", {
      parentSku: product.sku,
      variantSku: v.officialSku || v.sku,
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
          sku: activeSku,
          name: activeName,
          volume: activePresentation,
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

          {/* Interactive Variant Thumbnails Gallery */}
          {variantsList.length > 1 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0A3B8C]" />
                  Variantes de tamaño disponibles:
                </span>
                <span className="text-[11px] text-slate-500">Haz clic para ver su precio</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {variantsList.map((v) => {
                  const vSku = v.officialSku || v.sku;
                  const isSelected = activeSku === vSku || selectedVariant?.sku === v.sku;
                  const cleanPres = v.presentation.replace("1 Galón / 5L", "1 Galón");
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
                        <span
                          className={`text-[11px] font-black block truncate ${
                            isSelected ? "text-[#0A3B8C]" : "text-slate-800"
                          }`}
                        >
                          {cleanPres}
                        </span>
                        {v.priceEstimate && (
                          <span className="text-[11px] font-black text-emerald-700 block">
                            {v.price !== null ? v.priceEstimate : "Consultar"}
                          </span>
                        )}
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
              <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md font-mono font-bold border border-slate-200">
                Código: {activeSku}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
              {activeName}
            </h1>

            <p className="text-sm font-semibold text-[#0A3B8C]">
              {product.shortSpec}
            </p>
          </div>

          {/* Official Price Block */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/40 to-emerald-50/30 border-2 border-slate-200/90 flex flex-wrap items-center justify-between gap-4">
            {isPriced ? (
              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-slate-500">
                  Precio Oficial de Venta ({activePresentation || "Unidad"})
                </span>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#061B40] tracking-tight">
                    {activePrice}
                  </span>
                  {quantity > 1 && activeNumericPrice && (
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200">
                      Total x{quantity}: ${(activeNumericPrice * quantity).toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="block text-[11px] text-slate-500 font-medium mt-1">
                  ✓ {product.priceNote}
                </span>
              </div>
            ) : (
              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-slate-500">
                  Disponibilidad en Mostrador Pedernales
                </span>
                <span className="text-xl font-black text-[#0A3B8C]">
                  Consultar Disponibilidad y Precio en Mostrador
                </span>
                <span className="block text-[11px] text-slate-500 font-medium mt-1">
                  ✓ Producto bajo pedido especial o rotación alta en almacén
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-700 leading-relaxed">
            {product.description}
          </p>

          {/* Features checkmarks */}
          <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-800">
            {product.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Interactive Variant Size Selector */}
          {variantsList.length > 1 && (
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-black text-slate-800">
                <span>Seleccionar Presentación / Envase:</span>
                <span className="text-[#0A3B8C] font-mono font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  Cód: {activeSku}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {variantsList.map((v) => {
                  const vSku = v.officialSku || v.sku;
                  const isSelected = activeSku === vSku || selectedVariant?.sku === v.sku;
                  const cleanPres = v.presentation.replace("1 Galón / 5L", "1 Galón");
                  return (
                    <button
                      key={v.sku}
                      type="button"
                      onClick={() => handleSelectVariant(v)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#0A3B8C] text-white border-[#0A3B8C] shadow-sm font-black ring-2 ring-[#0A3B8C]/20"
                          : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
                      }`}
                    >
                      <div className="font-black">{cleanPres}</div>
                      {v.priceEstimate ? (
                        <div
                          className={`text-xs font-black mt-0.5 ${
                            isSelected ? "text-[#FFC500]" : "text-emerald-700"
                          }`}
                        >
                          {v.priceEstimate}
                        </div>
                      ) : (
                        <div className={`text-[10.5px] font-medium ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                          En Stock
                        </div>
                      )}
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
              <span>{product.dispatchIndicator} • Vía al Carmen (Frente a gasolinera Pedernales)</span>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-slate-700">Cantidad:</span>
                <div className="inline-flex items-center border-2 border-slate-300 rounded-xl bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-slate-100 text-slate-700 rounded-l-xl transition-colors cursor-pointer"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 py-1.5 text-base font-black text-slate-950 min-w-[3rem] text-center font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 hover:bg-slate-100 text-slate-700 rounded-r-xl transition-colors cursor-pointer"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Primary WhatsApp Direct CTA */}
              <a
                href={buildWhatsAppLink(
                  "product",
                  {
                    brand: product.brand,
                    productName: `${activeName}${activePrice ? ` (${activePrice})` : ""}`,
                    presentation: activePresentation,
                    sku: activeSku,
                  },
                  true
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsApp}
                className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer text-center"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Pedir por WhatsApp Directo (098 389 3231)</span>
              </a>

              {/* Secondary Add-to-Quote-Basket + Combo Inquiry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToBasket}
                  className={`inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    justAdded
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-900"
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Agregado a tu Lista ({quantity})</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-[#0A3B8C]" />
                      <span>Agregar a Lista de Pedido</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/593983893231?text=${encodeURIComponent(
                    `Hola LiderPro Pedernales, estoy viendo ${activeName} (Cód: ${activeSku}${activePrice ? `, Precio: ${activePrice}` : ""}). Deseo saber qué Combo Cambio Mannol completo me recomiendan para mi vehículo.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-50 hover:bg-[#FFC500] text-amber-950 hover:text-slate-950 border-2 border-amber-300 text-xs font-black uppercase tracking-wider transition-all text-center"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Armar Combo con Filtro</span>
                </a>
              </div>

              {inBasketItem && (
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0A3B8C] text-white text-xs font-black uppercase tracking-wider hover:bg-[#061B40] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#FFC500]" />
                  <span>Ver Mi Lista de Cotización ({items.length} productos)</span>
                </button>
              )}
            </div>

            {/* Reassurance Institutional Badges */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Distribuidor Autorizado Multimarca:</strong> Producto 100% original con facturación legal SRI.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-700 shrink-0" />
                <span><strong>Local Matriz Pedernales:</strong> Vía al Carmen (Frente a gasolinera Pedernales) • Envío Gratis en Pedernales en Combos Mannol.</span>
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
