import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  MessageCircle,
  CheckCircle,
  HelpCircle,
  ArrowLeft,
  Zap,
  MapPin,
  Clock,
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { BUSINESS_CONFIG } from "@/data/businessConfig";

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

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb / Back button */}
      <div>
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo de Productos</span>
        </Link>
      </div>

      {/* Main Product Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Visual & Specs Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-square bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden border border-slate-800">
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-primary text-white">
                  {product.brand}
                </span>
              </div>
              <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-amber-400">
                <Zap className="w-12 h-12" />
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                CÓDIGO: {product.sku}
              </span>
              <span className="text-sm font-bold text-slate-200 mt-1 max-w-xs">
                {product.name}
              </span>
              <div className="absolute bottom-4 right-4 text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                {product.stockStatusText}
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Garantía:</strong> {product.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Despacho:</strong> Pedernales (Manabí) y Quito (Pichincha)</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Cobertura:</strong> Envíos a todo el Ecuador (24–48 h*)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Price, Description, WhatsApp Commerce Action */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>{product.brand}</span>
                <span>•</span>
                <span>SKU: {product.sku}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-brand-primary mt-2">
                {product.shortSpec}
              </p>
            </div>

            {/* Pricing block */}
            {product.priceEstimate && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-2xl font-black text-brand-dark">
                  {product.priceEstimate}{" "}
                  <span className="text-xs font-normal text-slate-500">
                    (Precio de referencia con despacho)
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {product.priceNote}
                </p>
              </div>
            )}

            {/* Description */}
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
              <p>{product.description}</p>
            </div>

            {/* Features checkmarks */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Características Destacadas:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PRIMARY WHATSAPP ACTION */}
            <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Comprar o Consultar Disponibilidad
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Un asesor técnico te confirmará precio final con envío y compatibilidad exacta.
                  </p>
                </div>
              </div>

              <a
                href={buildWhatsAppLink("product", {
                  productName: product.name,
                  sku: product.sku,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-95 text-center"
              >
                <MessageCircle className="w-5 h-5 fill-white text-brand-whatsapp" />
                <span>CONSULTAR / COMPRAR POR WHATSAPP</span>
              </a>

              <p className="text-[11px] text-emerald-800 text-center font-mono">
                Mensaje precargado con SKU {product.sku} para atención inmediata.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Verified Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Full Specifications Table */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft">
          <h3 className="text-lg font-black text-brand-dark mb-4 pb-2 border-b border-slate-100">
            Ficha Técnica Detallada
          </h3>
          <div className="space-y-3">
            {Object.entries(product.fullSpecs).map(([key, val]) => (
              <div
                key={key}
                className="flex items-center justify-between text-xs py-2 border-b border-slate-50 last:border-0"
              >
                <span className="font-bold text-slate-500">{key}</span>
                <span className="font-semibold text-slate-800 text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compatible Vehicles */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft">
          <h3 className="text-lg font-black text-brand-dark mb-4 pb-2 border-b border-slate-100">
            Aplicaciones Verificadas
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Compatibilidad técnica comprobada para los siguientes modelos en Ecuador:
          </p>
          <div className="space-y-2">
            {product.compatibleVehicles.map((veh, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
              >
                <span className="font-bold text-slate-800">
                  {veh.make} {veh.model}
                </span>
                <span className="text-slate-500 font-mono">
                  {veh.yearRange} {veh.engine ? `• ${veh.engine}` : ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>¿Tu vehículo no aparece en la lista?</strong>
              <p className="text-[11px] mt-0.5">
                No inventamos compatibilidades. Escríbenos por WhatsApp y confirmamos la aplicación técnica con tu modelo exacto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
