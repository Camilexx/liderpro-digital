import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  MessageCircle,
  ArrowLeft,
  MapPin,
  Check,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Producto no encontrado | LiderPro" };

  return {
    title: `${product.name} | LiderPro Ecuador`,
    description: `${product.shortSpec}. Garantía: ${product.warranty}. Despacho desde Pedernales y Quito a nivel nacional.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div>
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo</span>
        </Link>
      </div>

      {/* Main Product Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Studio Product Photography */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl bg-slate-50 border border-slate-100 p-8 flex items-center justify-center overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                className="object-contain p-6"
              />
            </div>
          </div>

          {/* Right: Technical Details & Direct WhatsApp Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                <span>{product.brand}</span>
                <span>•</span>
                <span>SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-sm font-semibold text-brand-primary">
                {product.shortSpec}
              </p>
            </div>

            {/* Price */}
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

            {/* WhatsApp CTA Action */}
            <div className="pt-4 space-y-3">
              <a
                href={buildWhatsAppLink("product", {
                  productName: product.name,
                  sku: product.sku,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-13 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONSULTAR / COMPRAR POR WHATSAPP</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                <span>Garantía: {product.warranty}</span>
                <span>Despacho: Pedernales & Quito</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Verified Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-black text-slate-950 border-b border-slate-100 pb-3">
            Ficha Técnica
          </h3>
          <div className="space-y-2.5 text-xs">
            {Object.entries(product.fullSpecs).map(([key, val]) => (
              <div key={key} className="flex justify-between py-1.5 border-b border-slate-50 last:border-0">
                <span className="font-semibold text-slate-500">{key}</span>
                <span className="font-bold text-slate-900">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-black text-slate-950 border-b border-slate-100 pb-3">
            Aplicaciones Verificadas
          </h3>
          <p className="text-xs text-slate-500">
            Compatibilidad técnica comprobada para los siguientes modelos en Ecuador:
          </p>
          <div className="space-y-2 text-xs">
            {product.compatibleVehicles.map((veh, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                <span className="font-bold text-slate-900">{veh.make} {veh.model}</span>
                <span className="text-slate-500 font-mono">{veh.yearRange}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
