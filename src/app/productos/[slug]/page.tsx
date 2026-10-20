import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowLeft,
  HelpCircle,
  Wrench,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductDetailShowcase from "@/components/ProductDetailShowcase";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  // Prerender 100% of the verified catalog (all 366 products) at build time for instant page loads & optimal SEO indexing
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Producto no encontrado | LiderPro Ecuador" };

  const title = `${product.name} (${product.sku}) | ${product.brand} Oficial — LiderPro Ecuador`;
  const description = `${product.shortSpec}. Distribuidor oficial ${product.brand} en Ecuador (SKU: ${product.sku}). ${product.warranty}. Despacho diario desde Bodega Matriz Pedernales a las 24 provincias con facturación SRI.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.sku,
      product.brand,
      `${product.brand} Ecuador`,
      `${product.category} ${product.brand}`,
      `comprar ${product.name} ecuador`,
      "repuestos automotrices ecuador",
      "liderpro pedernales",
    ],
    alternates: {
      canonical: `/productos/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://liderpro-digital.vercel.app/productos/${product.slug}`,
      siteName: "LiderPro Ecuador",
      locale: "es_EC",
      type: "website",
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 800,
          alt: `${product.brand} - ${product.name} (SKU: ${product.sku})`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const categoryRoutes: Record<string, { label: string; href: string }> = {
    baterias: { label: "Baterías", href: "/baterias" },
    lubricantes: { label: "Lubricantes", href: "/lubricantes" },
    filtros: { label: "Filtros", href: "/filtros" },
    refrigerantes: { label: "Refrigerantes", href: "/lubricantes" },
    frenos: { label: "Líquidos de Freno", href: "/lubricantes" },
    bujias: { label: "Bujías", href: "/productos" },
    aditivos: { label: "Aditivos y Químicos", href: "/productos" },
  };
  const catInfo = categoryRoutes[product.category] || { label: "Catálogo", href: "/productos" };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.sku !== product.sku
  ).slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": product.name,
        "image": `https://liderpro-digital.vercel.app${product.imageUrl}`,
        "description": product.description,
        "sku": product.sku,
        "mpn": product.sku,
        "category": catInfo.label,
        "brand": {
          "@type": "Brand",
          "name": product.brand,
        },
        "offers": {
          "@type": "Offer",
          "url": `https://liderpro-digital.vercel.app/productos/${product.slug}`,
          "priceCurrency": "USD",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          "seller": {
            "@type": "AutoPartsStore",
            "name": "LiderPro Ecuador",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://liderpro-digital.vercel.app",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": catInfo.label,
            "item": `https://liderpro-digital.vercel.app${catInfo.href}`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": `https://liderpro-digital.vercel.app/productos/${product.slug}`,
          },
        ],
      },
      ...(product.faqs && product.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "mainEntity": product.faqs.map((f) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0A3B8C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo general</span>
        </Link>
        <ol className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <li>
            <Link href="/" className="hover:text-[#0A3B8C] transition-colors">Inicio</Link>
          </li>
          <li>/</li>
          <li>
            <Link href={catInfo.href} className="hover:text-[#0A3B8C] transition-colors">{catInfo.label}</Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-bold truncate max-w-[220px] sm:max-w-[340px]">{product.sku}</li>
        </ol>
      </nav>

      {/* Main Interactive Product Showcase */}
      <ProductDetailShowcase product={product} />

      {/* Specifications & Verified Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Wrench className="w-4 h-4 text-brand-primary" />
            <h3 className="text-base font-black text-slate-950">
              Ficha Técnica y Certificación de Origen
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

      {/* Related Products for Internal Linking & Cross-Sell */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#0A3B8C] block">
                Alternativas y Complementos Oficiales
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Productos Relacionados en {catInfo.label}
              </h2>
            </div>
            <Link
              href={catInfo.href}
              className="text-xs font-black text-[#0A3B8C] hover:underline uppercase tracking-wider"
            >
              Ver toda la línea →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
