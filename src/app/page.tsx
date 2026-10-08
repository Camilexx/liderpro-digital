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
      {/* 01: HERO SECTION — Premium National Automotive Specialist */}
      <section className="pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-[11px] font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span>COBERTURA NACIONAL • ASESORÍA ESPECIALIZADA</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.08]">
              El producto correcto para tu vehículo.
              <br />
              <span className="text-brand-primary">Sin adivinar.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              Encuentra baterías, lubricantes y repuestos automotrices de calidad especializada, con asesoría técnica real y envíos a todo Ecuador.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#buscador"
                className="px-8 h-13 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <Search className="w-4 h-4" />
                <span>ENCUENTRA MI PRODUCTO</span>
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

            {/* Reassurance Microcopy */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verificamos compatibilidad antes de comprar para que evites errores.</span>
            </div>
          </div>

          {/* Right: Studio Automotive Photography Stage */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-950">
              <Image
                src="/images/hero/automotive-hero.jpg"
                alt="LiderPro Especialista Automotriz Ecuador"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 text-white flex items-center justify-between text-xs">
                <span className="font-semibold tracking-wide">
                  Calidad Especializada & Asesoría Técnica
                </span>
                <span className="text-[11px] font-mono text-slate-300">
                  Envíos a todo Ecuador
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

      {/* 02.5: THREE CONVERSION PATHS — Explicit Intent Routing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            ¿Cómo podemos ayudarte hoy?
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            Selecciona tu punto de partida
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Path A: Emergency Battery */}
          <Link
            href="/emergencia-bateria"
            className="p-6 rounded-2xl border-2 border-red-100 bg-red-50/30 hover:border-red-300 hover:bg-red-50/60 transition-all flex flex-col justify-between group h-52"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-red-600" />
              </div>
              <h3 className="font-black text-base text-slate-950 group-hover:text-red-700 transition-colors">
                Necesito una batería
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ¿El auto no prende o hace clic? Despacho urgente y diagnóstico técnico de batería vs. alternador.
              </p>
            </div>
            <div className="text-xs font-bold text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Auxilio inmediato de batería</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Path B: Specific Product */}
          <a
            href="#buscador"
            className="p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-400 transition-all flex flex-col justify-between group h-52"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-slate-950 group-hover:text-brand-primary transition-colors">
                Busco un producto específico
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Filtra por marca, modelo, año y motor para encontrar el aceite, filtro o repuesto compatible.
              </p>
            </div>
            <div className="text-xs font-bold text-brand-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Abrir buscador por vehículo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Path C: Unknown / Guided Assistance */}
          <Link
            href="/asesoria"
            className="p-6 rounded-2xl border-2 border-amber-100 bg-amber-50/20 hover:border-amber-300 hover:bg-amber-50/50 transition-all flex flex-col justify-between group h-52"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-slate-950 group-hover:text-amber-900 transition-colors">
                No sé qué necesito
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Cuéntanos el síntoma, ruido o envíanos una foto de la pieza. Un asesor te asiste sin compromiso.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Asistencia guiada por WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* 03: VEHICLE FINDER (Hero Tool Asset) */}
      <section id="buscador" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VehicleFinder />
      </section>

      {/* 04: CATEGORÍAS CONCEPTUALES — Identidad Visual Propia */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Líneas de Especialidad Técnica
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Categorías
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. ENERGÍA Y ARRANQUE */}
          <Link
            href="/baterias"
            className="p-6 rounded-2xl border-2 border-red-100 bg-white hover:border-red-500 hover:shadow-md transition-all group flex flex-col justify-between h-56"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-50 text-red-700">
                  Energía & Arranque
                </span>
                <Zap className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-brand-primary transition-colors">
                Baterías
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Alta capacidad de reserva, amperaje CCA comprobado y aleación calcio-plata sellada.
              </p>
            </div>
            <div className="text-xs font-bold text-brand-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explorar baterías</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* 2. PROTECCIÓN DEL MOTOR */}
          <Link
            href="/lubricantes"
            className="p-6 rounded-2xl border-2 border-amber-100 bg-white hover:border-amber-500 hover:shadow-md transition-all group flex flex-col justify-between h-56"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                  Protección Motor
                </span>
                <Layers className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-amber-800 transition-colors">
                Lubricantes
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Sintéticos avanzados API SP e ILSAC GF-6A para control de fricción y temperatura.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver lubricantes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* 3. MANTENIMIENTO */}
          <Link
            href="/filtros"
            className="p-6 rounded-2xl border-2 border-blue-100 bg-white hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between h-56"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  Mantenimiento
                </span>
                <Wrench className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-blue-700 transition-colors">
                Filtros y Fluidos
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Retención de micras certificada, refrigerantes OAT 50/50 y elementos de protección.
              </p>
            </div>
            <div className="text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver mantenimiento</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* 4. SEGURIDAD */}
          <Link
            href="/productos"
            className="p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-800 hover:shadow-md transition-all group flex flex-col justify-between h-56"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                  Seguridad
                </span>
                <ShieldCheck className="w-5 h-5 text-slate-800" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-slate-900 transition-colors">
                Frenos
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Compuestos semi-metálicos con coeficiente de fricción estable y cero fade térmico.
              </p>
            </div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver frenos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* 5. REPUESTOS Y SOLUCIONES */}
          <Link
            href="/productos"
            className="p-6 rounded-2xl border-2 border-emerald-100 bg-white hover:border-emerald-600 hover:shadow-md transition-all group flex flex-col justify-between h-56"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                  Soluciones
                </span>
                <Search className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-emerald-800 transition-colors">
                Catálogo Total
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Acceso general a componentes, bujías y soluciones bajo pedido con asesoría.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
