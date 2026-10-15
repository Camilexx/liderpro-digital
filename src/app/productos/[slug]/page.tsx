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
  HelpCircle,
  Wrench,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  // Prerender the top 60 highest-demand products at build time for speed, render remainder on-demand
  return PRODUCTS.slice(0, 60).map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Producto no encontrado | LiderPro" };

  return {
    title: `${product.name} | LiderPro Ecuador`,
    description: `${product.shortSpec}. Garantía: ${product.warranty}. Despacho nacional diario desde Bodega Matriz en Pedernales (Manabí) con facturación electrónica SRI.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `https://liderpro-digital.vercel.app${product.imageUrl}`,
    "description": product.description,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand,
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      "seller": {
        "@type": "Organization",
        "name": "LiderPro Ecuador",
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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

            {/* WhatsApp CTA Action — Priority 1 Decision */}
            <div className="pt-4 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{product.dispatchIndicator}</span>
              </div>

              <a
                href={buildWhatsAppLink("product", {
                  brand: product.brand,
                  productName: product.name,
                  presentation: product.volume || product.plates,
                  sku: product.sku,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-14 btn-whatsapp font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>COTIZAR EN SEDE PEDERNALES POR WHATSAPP</span>
              </a>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Distribuidor Autorizado Multimarca:</strong> Producto 100% original con facturación SRI.</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-700 shrink-0" />
                  <span><strong>Hub Logístico Pedernales:</strong> Despacho diario por encomienda interprovincial y courier a las 24 provincias.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-700 shrink-0" />
                  <span><strong>Garantía:</strong> {product.warranty}.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Verified Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Wrench className="w-4 h-4 text-brand-primary" />
            <h3 className="text-base font-black text-slate-950">
              Ficha Técnica y Stock Físico
            </h3>
          </div>
          <div className="space-y-2.5 text-xs">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between py-1.5 border-b border-slate-50 last:border-0">
                <span className="font-semibold text-slate-500">{key}</span>
                <span className="font-bold text-slate-900 text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-black text-slate-950">
              Vehículos Compatibles Verificados ({product.compatibleVehicles.length})
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Compatibilidad mecánica e instalación directa verificada para el parque automotor de Ecuador:
          </p>
          <div className="space-y-2 text-xs max-h-[380px] overflow-y-auto pr-1">
            {product.compatibleVehicles.map((veh, idx) => (
              <div key={idx} className="p-3 bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border border-slate-100">
                <div>
                  <span className="font-bold text-slate-900">{veh.make} {veh.model}</span>
                  {veh.engine && (
                    <span className="block text-[11px] text-slate-500 font-medium">
                      Motorización: {veh.engine}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 self-start sm:self-center">
                  {veh.yearRange}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep Engineering Specs */}
      {product.fullSpecs && Object.keys(product.fullSpecs).length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-black text-slate-950 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span>Especificaciones de Rendimiento y Tolerancia del Fabricante</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            {Object.entries(product.fullSpecs).map(([param, val]) => (
              <div key={param} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10.5px] uppercase font-bold text-slate-500 tracking-wider block">
                  {param}
                </span>
                <span className="font-bold text-slate-900 block text-xs">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQs and Shipping Guarantee */}
      {product.faqs && product.faqs.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <HelpCircle className="w-4 h-4 text-brand-primary" />
            <h3 className="text-base font-black text-slate-950">
              Preguntas Frecuentes y Garantía de Despacho
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {product.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                <h4 className="font-bold text-slate-900">
                  {faq.question}
                </h4>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
