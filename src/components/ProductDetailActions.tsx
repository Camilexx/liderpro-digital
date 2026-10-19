"use client";

import { useState } from "react";
import { MessageCircle, Plus, Check, ShoppingBag } from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { trackEvent } from "@/lib/analytics";

interface ProductDetailActionsProps {
  product: Product;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem, setIsOpen, items } = useQuoteBasket();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [justAdded, setJustAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const activeSku = selectedVariant ? selectedVariant.sku : product.sku;
  const activeName = selectedVariant ? selectedVariant.name : product.name;
  const presentation = selectedVariant
    ? selectedVariant.presentation
    : (product.volume || product.plates || undefined);
  const inBasketItem = items.find((it) => it.product.sku === activeSku);

  const handleWhatsApp = () => {
    trackEvent("whatsapp_product_detail", {
      sku: activeSku,
      brand: product.brand,
      name: activeName,
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
    <div className="space-y-3 pt-2">
      {/* Interactive Variant Presentation Switcher on Detail Page */}
      {product.variants && product.variants.length > 1 && (
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 mb-2 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-black text-slate-800">
            <span>Seleccionar Tamaño / Presentación:</span>
            <span className="text-[#0A3B8C] font-mono font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              SKU: {activeSku}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {product.variants.slice(0, 3).map((v) => {
              const isSelected = activeSku === v.sku;
              return (
                <button
                  key={v.sku}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#0A3B8C] text-white border-[#0A3B8C] shadow-sm font-black ring-2 ring-[#0A3B8C]/20"
                      : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <div>{v.presentation}</div>
                  <div className={`text-[10px] font-medium ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                    {v.stock > 0 ? `${v.stock} en stock` : "Bajo pedido"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Primary WhatsApp Direct CTA */}
      <a
        href={buildWhatsAppLink("product", {
          brand: product.brand,
          productName: activeName,
          presentation: presentation || undefined,
          sku: activeSku,
        })}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsApp}
        className="w-full h-13 btn-whatsapp font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-lg shadow-emerald-950/20"
      >
        <MessageCircle className="w-5 h-5 fill-black/10" />
        <span>Cotizar Inmediato por WhatsApp</span>
      </a>

      {/* Multi-product B2B Quote Basket Action */}
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden shadow-2xs h-11">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold transition-colors"
            aria-label="Menos unidades"
          >
            -
          </button>
          <span className="px-3 text-xs font-black text-slate-900 min-w-8 text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold transition-colors"
            aria-label="Más unidades"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToBasket}
          className={`flex-1 h-11 px-4 text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            justAdded
              ? "bg-emerald-600 text-white shadow-sm"
              : inBasketItem
              ? "bg-[#061B40] text-[#FFC500] hover:bg-[#0A3B8C] border border-[#FFC500]/40"
              : "bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-2xs"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>¡Añadido a Cotización!</span>
            </>
          ) : inBasketItem ? (
            <>
              <ShoppingBag className="w-4 h-4 text-[#FFC500]" />
              <span>En tu Lista ({inBasketItem.quantity} un.) + Añadir</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 text-[#0A3B8C]" />
              <span>Añadir a Cotización Multiproducto</span>
            </>
          )}
        </button>

        {inBasketItem && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="h-11 px-3.5 bg-[#FFC500] hover:bg-[#e6b200] text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
            title="Ver lista de cotización"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Ver Lista</span>
          </button>
        )}
      </div>
    </div>
  );
}
