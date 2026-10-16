"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Package } from "lucide-react";
import { Product } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const presentation = product.volume || product.plates;

  const handleWhatsApp = () => {
    trackEvent("whatsapp_product", {
      sku: product.sku,
      brand: product.brand,
      name: product.name,
    });
  };

  return (
    <div className="card-interactive overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Product Image Stage */}
        <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50/90 to-slate-100/50 p-6 flex items-center justify-center border-b border-slate-100 overflow-hidden">
          {!imgError ? (
            <Image
              src={product.imageUrl}
              alt={`${product.brand} - ${product.name}`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={() => setImgError(true)}
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
              <Package className="w-10 h-10 text-slate-300" />
              <span className="text-[11px] font-bold text-slate-500">{product.brand}</span>
              <span className="text-[10px] text-slate-400 line-clamp-1">{product.name}</span>
            </div>
          )}

          {/* Badges: Brand & Best Seller */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className="px-2.5 py-1 bg-[#061B40] backdrop-blur-sm rounded-md text-[10px] font-black text-white uppercase tracking-wider shadow-sm border border-white/10">
              {product.brand}
            </span>
            {product.isBestSeller && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-[#FFC500] to-[#FDB813] text-slate-950 font-black text-[9px] uppercase tracking-wider rounded-md shadow-sm border border-amber-400/80 flex items-center gap-1">
                ⭐ Más Vendido
              </span>
            )}
          </div>

          {presentation && (
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/95 backdrop-blur-sm rounded-md border border-slate-200/90 text-[9.5px] font-bold text-slate-700 tracking-tight shadow-2xs z-10">
              {presentation}
            </div>
          )}
        </div>

        {/* Text Details */}
        <div className="p-5 pb-2 space-y-2">
          <div className="flex items-center justify-between text-[10.5px] font-bold uppercase tracking-wider">
            <span className="text-[#0A3B8C] font-black">{product.category}</span>
            <span className="font-mono text-slate-500 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">
              SKU: {product.sku}
            </span>
          </div>

          <h3 className="text-base font-black text-slate-950 group-hover:text-[#0A3B8C] transition-colors line-clamp-2 leading-snug">
            <Link href={`/productos/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.shortSpec}
          </p>
        </div>
      </div>

      {/* Dispatch Status & CTA */}
      <div className="p-5 pt-3">
        <div className="mb-3.5 pb-2.5 border-b border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Disponible en Bodega Pedernales</span>
            </span>
            {product.isBestSeller ? (
              <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                Alta Demanda
              </span>
            ) : null}
          </div>

          <div className="flex items-center justify-between text-[10.5px] text-slate-500 font-medium px-0.5">
            <span>{product.warranty}</span>
            <span className="font-bold text-slate-800 uppercase">{product.applicationType}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={buildWhatsAppLink("product", {
              brand: product.brand,
              productName: product.name,
              presentation: presentation,
              sku: product.sku,
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="btn-whatsapp !py-2.5 !px-3 !text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Cotizar</span>
          </a>

          <Link
            href={`/productos/${product.slug}`}
            className="btn-secondary !py-2.5 !px-3 !text-xs font-bold text-center flex items-center justify-center hover:border-[#0A3B8C] hover:text-[#0A3B8C]"
          >
            Ver Ficha
          </Link>
        </div>
      </div>
    </div>
  );
}
