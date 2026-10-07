"use client";

import Link from "next/link";
import { MessageCircle, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleWhatsApp = () => {
    trackEvent("whatsapp_product", {
      sku: product.sku,
      name: product.name,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Card Header & Badge */}
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
              {product.brand}
            </span>
            <span className="text-[11px] font-mono font-medium text-slate-600">
              {product.sku}
            </span>
          </div>

          <h3 className="text-base font-black text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-2">
            <Link href={`/productos/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 mt-2 font-medium line-clamp-2">
            {product.shortSpec}
          </p>
        </div>

        {/* Technical cues & Stock */}
        <div className="px-5 py-3 bg-slate-50/70 border-y border-slate-100 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-slate-500">Garantía:</span>
            <span className="font-bold text-slate-800">{product.warranty}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold text-slate-500">Disponibilidad:</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {product.stockStatusText}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer / Pricing & Actions */}
      <div className="p-5 pt-4">
        {product.priceEstimate && (
          <div className="mb-4">
            <div className="text-xl font-black text-brand-dark tracking-tight">
              {product.priceEstimate}
              <span className="text-[10px] font-normal text-slate-600 ml-1.5">
                (Ref. con despacho)
              </span>
            </div>
            <p className="text-[10px] text-slate-600 leading-tight">
              {product.priceNote}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/productos/${product.slug}`}
            className="py-2.5 px-3 text-center border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 rounded-xl transition-all"
          >
            Ficha Técnica
          </Link>

          <a
            href={buildWhatsAppLink("product", {
              productName: product.name,
              sku: product.sku,
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="py-2.5 px-3 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white text-xs font-bold rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-1.5 transition-all active:scale-95 text-center"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Consultar</span>
          </a>
        </div>
      </div>
    </div>
  );
}
