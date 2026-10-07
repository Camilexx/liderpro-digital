"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
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
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Product Image Stage */}
        <div className="relative aspect-[4/3] bg-slate-50/60 p-6 flex items-center justify-center border-b border-slate-100 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-md border border-slate-200/80 text-[9.5px] font-mono text-slate-500 uppercase tracking-tight">
            Ref. Visual
          </div>
        </div>

        {/* Text Details */}
        <div className="p-5 pb-2 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>{product.brand}</span>
            <span className="font-mono text-slate-400">{product.sku}</span>
          </div>

          <h3 className="text-base font-bold text-slate-950 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
            <Link href={`/productos/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1">
            {product.shortSpec}
          </p>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-5 pt-3">
        {product.priceEstimate && (
          <div className="mb-3">
            <div className="text-lg font-black text-slate-950">
              {product.priceEstimate}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Garantía: {product.warranty}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <a
            href={buildWhatsAppLink("product", {
              productName: product.name,
              sku: product.sku,
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Consultar</span>
          </a>

          <Link
            href={`/productos/${product.slug}`}
            className="py-2.5 px-3 text-center border border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-white text-xs font-semibold text-slate-800 rounded-xl transition-colors flex items-center justify-center"
          >
            Ver ficha
          </Link>
        </div>
      </div>
    </div>
  );
}
