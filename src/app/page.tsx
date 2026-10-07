import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  ShieldCheck,
  Wrench,
  MapPin,
  Search,
  MessageCircle,
  ArrowRight,
  Zap,
  Layers,
} from "lucide-react";
import VehicleFinder from "@/components/VehicleFinder";
import ProductCard from "@/components/ProductCard";
import EmergencyBanner from "@/components/EmergencyBanner";
import LocationsLogisticsSection from "@/components/LocationsLogisticsSection";
import FAQSection from "@/components/FAQSection";
import { PRODUCTS } from "@/data/products";
import { EDUCATIONAL_ARTICLES } from "@/data/articles";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 01: HERO SECTION — Clean Minimal & Premium Automotive */}
      <section className="pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
              ATENCIÓN COSTA + SIERRA
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.08]">
              Tu vehículo.
              <br />
              <span className="text-brand-primary">Nuestra experiencia.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              Encuentra el repuesto, batería o lubricante exacto para tu auto. Asesoría técnica humana directa, despacho prioritario desde Pedernales y Quito, y envíos a todo el Ecuador.
            </p>

            {/* CTAs: Level 1 (Find Product) + Level 2 (WhatsApp Specialist) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#buscador"
                className="px-8 h-13 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <Search className="w-4 h-4" />
                <span>ENCONTRAR MI PRODUCTO</span>
              </a>

              <a
                href={buildWhatsAppLink("general_quote")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 h-13 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>HABLAR CON UN ASESOR</span>
              </a>
            </div>

            {/* Level 3: Emergency Shortcut (High Intent) */}
            <div className="pt-2 flex items-center gap-2.5 text-xs">
              <span className="text-slate-500 font-medium">¿Tu vehículo no enciende?</span>
              <Link
                href="/emergencia-bateria"
                className="font-bold text-red-600 hover:text-red-700 underline underline-offset-4 flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 fill-red-600" />
                <span>Necesito una batería urgente →</span>
              </Link>
            </div>
          </div>

          {/* Right: Studio Automotive Photography Stage */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-950">
              <Image
                src="/images/hero/automotive-hero.jpg"
                alt="LiderPro Ingeniería y Repuestos Automotrices"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 text-white flex items-center justify-between text-xs">
                <span className="font-semibold tracking-wide">
                  Ingeniería & Repuestos Certificados
                </span>
                <span className="text-[11px] font-mono text-slate-300">
                  Pedernales • Quito
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02: TRUST STRIP — Minimal 4 elements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 px-6 sm:px-10 rounded-2xl border border-slate-200/80 bg-white grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-slate-950 shrink-0" />
            <span className="font-bold tracking-tight">ENVÍOS NACIONALES</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Wrench className="w-4 h-4 text-slate-950 shrink-0" />
            <span className="font-bold tracking-tight">ASESORÍA ESPECIALIZADA</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-slate-950 shrink-0" />
            <span className="font-bold tracking-tight">ATENCIÓN COSTA + SIERRA</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-slate-950 shrink-0" />
            <span className="font-bold tracking-tight">COMPATIBILIDAD VERIFICADA*</span>
          </div>
        </div>
      </section>

      {/* 03: VEHICLE FINDER (Hero Tool Asset) */}
      <section id="buscador" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VehicleFinder />
      </section>

      {/* 04: CATEGORIES — Editorial & Minimal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Líneas Principales
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Categorías
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
            href="/baterias"
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 transition-all group flex flex-col justify-between h-44"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-950 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-950 group-hover:text-brand-primary transition-colors">
                Baterías
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                15 a 18 meses garantía.
              </p>
            </div>
            <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1 group-hover:text-brand-primary">
              <span>Ver</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>

          <Link
            href="/lubricantes"
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 transition-all group flex flex-col justify-between h-44"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-950 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-950 group-hover:text-brand-primary transition-colors">
                Lubricantes
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Sintéticos 5W-30 y 15W-40.
              </p>
            </div>
            <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1 group-hover:text-brand-primary">
              <span>Ver</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>

          <Link
            href="/filtros"
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 transition-all group flex flex-col justify-between h-44"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-950 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-950 group-hover:text-brand-primary transition-colors">
                Filtros
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Blindados alta retención.
              </p>
            </div>
            <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1 group-hover:text-brand-primary">
              <span>Ver</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>

          <Link
            href="/productos"
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 transition-all group flex flex-col justify-between h-44"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-950 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-950 group-hover:text-brand-primary transition-colors">
                Frenos
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Pastillas cerámicas OEM.
              </p>
            </div>
            <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1 group-hover:text-brand-primary">
              <span>Ver</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>

          <Link
            href="/productos"
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 transition-all group flex flex-col justify-between h-44"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-950 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-950 group-hover:text-brand-primary transition-colors">
                Refrigerantes
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Orgánico OAT 50/50.
              </p>
            </div>
            <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1 group-hover:text-brand-primary">
              <span>Ver</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>

          <Link
            href="/productos"
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 transition-all group flex flex-col justify-between h-44"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-950 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-950 group-hover:text-brand-primary transition-colors">
                Catálogo Total
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Aditivos y repuestos.
              </p>
            </div>
            <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1 group-hover:text-brand-primary">
              <span>Explorar</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        </div>
      </section>

      {/* 05: FEATURED PRODUCTS — Scannable Commercial Powerhouse */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Catálogo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Productos Destacados
            </h2>
          </div>
          <Link
            href="/productos"
            className="text-xs font-bold text-slate-900 hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            <span>Ver todos ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 06: AUTOMOTIVE EDITORIAL — Problem -> Solution Hook */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Asesoría Técnica
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              ¿No sabes qué batería necesita tu vehículo?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Te ayudamos a identificar el amperaje, la polaridad y las medidas exactas antes de comprar. Sin margen de error.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/baterias"
              className="px-6 py-3.5 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center"
            >
              ENCONTRAR MI BATERÍA
            </Link>
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-slate-300 hover:border-slate-400 bg-white text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>CONSULTAR POR FOTO</span>
            </a>
          </div>
        </div>
      </section>

      {/* 07: EMERGENCY BATTERY PATH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmergencyBanner />
      </section>

      {/* 08: LOCATIONS — Pedernales + Quito */}
      <LocationsLogisticsSection />

      {/* 09: GUIDES (Editorial selection) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Conocimiento
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Guías Técnicas
            </h2>
          </div>
          <Link
            href="/guias"
            className="text-xs font-bold text-slate-900 hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATIONAL_ARTICLES.slice(0, 2).map((art) => (
            <div
              key={art.slug}
              className="p-8 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">
                  {art.category}
                </span>
                <h3 className="font-black text-xl text-slate-950">
                  <Link href={`/guias/${art.slug}`} className="hover:text-brand-primary transition-colors">
                    {art.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {art.subtitle}
                </p>
              </div>

              <Link
                href={`/guias/${art.slug}`}
                className="text-xs font-bold text-slate-900 hover:text-brand-primary flex items-center gap-1 pt-2"
              >
                <span>Leer guía</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 10: FAQ SECTION */}
      <FAQSection />

      {/* 11: FINAL CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 text-center space-y-5 border border-slate-900">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight max-w-xl mx-auto">
            ¿Listo para equipar tu vehículo con el producto exacto?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Escríbenos por WhatsApp. Confirmamos compatibilidad, stock en Pedernales o Quito y opciones de despacho en minutos.
          </p>
          <div className="pt-2">
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>HABLAR CON UN ASESOR POR WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Mobile WhatsApp CTA Bar (Mobile 375/390/430px optimized) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-2.5 sm:hidden shadow-2xl flex items-center gap-2">
        <a
          href="#buscador"
          className="flex-1 py-3 px-2 text-center bg-slate-900 active:bg-slate-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Buscar Producto</span>
        </a>
        <a
          href={buildWhatsAppLink("general_quote")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-2 bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Asesor WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
