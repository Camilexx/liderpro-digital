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
  Camera,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import VehicleFinder from "@/components/VehicleFinder";
import ProductCard from "@/components/ProductCard";
import EmergencyBanner from "@/components/EmergencyBanner";
import LocationsLogisticsSection from "@/components/LocationsLogisticsSection";
import FAQSection from "@/components/FAQSection";
import { PRODUCTS } from "@/data/products";
import { EDUCATIONAL_ARTICLES } from "@/data/articles";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* 01: HERO SECTION — Premium National Automotive Specialist */}
      <section className="pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: High-Conversion Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-full text-[11px] font-bold tracking-wider uppercase shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>PEDERNALES & QUITO • ASESORÍA EN VIVO • ENVÍOS NACIONALES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight text-slate-950 leading-[1.06]">
              El producto exacto para tu vehículo.
              <br />
              <span className="bg-gradient-to-r from-red-600 via-red-600 to-rose-700 bg-clip-text text-transparent">
                Cero dudas, cero errores.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg font-normal">
              Baterías selladas, lubricantes 100% sintéticos y repuestos con validación técnica previa por modelo o chasis. Despacho coordinado y seguro a todo el Ecuador.
            </p>

            {/* High-Impact CTAs with Interactive Feedback */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#buscador"
                className="btn-primary !py-4 !px-8 text-xs font-black tracking-wider flex items-center justify-center gap-2.5 text-center group"
              >
                <Search className="w-4 h-4" />
                <span>ENCUENTRA TU PRODUCTO</span>
                <span className="text-white/80 group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <a
                href={buildWhatsAppLink("general_quote")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-4 !px-6 text-xs font-black tracking-wider flex items-center justify-center gap-2.5 text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>HABLAR CON UN ASESOR</span>
              </a>
            </div>

            {/* Reassurance Microcopy Badges */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verificación de código antes de enviar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Asistencia técnica humana por WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right: Studio Automotive Photography Stage with Spatial Depth */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 group">
              <Image
                src="/images/hero/automotive-hero.jpg"
                alt="LiderPro Especialista Automotriz Ecuador"
                fill
                priority
                className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
              
              {/* Floating Quality Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40 shadow-lg text-slate-900 flex items-center gap-1.5 text-xs font-bold animate-float-slow">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Calidad de Grado Técnico</span>
              </div>

              {/* Bottom Card Ribbon */}
              <div className="absolute bottom-4 left-5 right-5 text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold tracking-wide">
                    Red de Despacho Pedernales & Quito
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/60">
                  Envíos a todo Ecuador
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02: TRUST STRIP — High-Impact Feature Cards (No bare flat strip) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-primary flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-950 uppercase tracking-tight">Envíos Nacionales</div>
              <div className="text-[11px] text-slate-500">Pedernales & Quito a todo el país</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-950 uppercase tracking-tight">Asesoría Real</div>
              <div className="text-[11px] text-slate-500">Atención técnica sin bots</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-950 uppercase tracking-tight">Costa + Sierra</div>
              <div className="text-[11px] text-slate-500">Puntos físicos estratégicos</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-950 uppercase tracking-tight">Cero Errores</div>
              <div className="text-[11px] text-slate-500">Validación antes del despacho</div>
            </div>
          </div>
        </div>
      </section>

      {/* 02.5: THREE CONVERSION PATHS — High-Retention Intent Routing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Atención Rápida por Necesidad
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            ¿Cómo podemos ayudarte hoy?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Path A: Emergency Battery */}
          <Link
            href="/emergencia-bateria"
            className="p-6 rounded-2xl border border-red-200/90 bg-gradient-to-br from-red-50/60 to-white hover:border-red-400 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-52"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 fill-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800">
                  Urgencia
                </span>
              </div>
              <h3 className="font-black text-base text-slate-950 group-hover:text-red-700 transition-colors">
                ¿Tu carro no prende?
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Diagnóstico guiado de batería vs. alternador en 2 minutos con código y amperaje exacto para tu modelo.
              </p>
            </div>
            <div className="text-xs font-black text-red-600 flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
              <span>Orientación para batería</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Path B: Specific Product */}
          <a
            href="#buscador"
            className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-52"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/30 group-hover:scale-105 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                  Buscador
                </span>
              </div>
              <h3 className="font-black text-base text-slate-950 group-hover:text-brand-primary transition-colors">
                Busco un repuesto específico
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Filtra por marca, modelo, año y motor para encontrar el aceite, filtro o repuesto certificado.
              </p>
            </div>
            <div className="text-xs font-black text-brand-primary flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
              <span>Abrir buscador por vehículo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Path C: Unknown / Guided Assistance */}
          <Link
            href="/asesoria"
            className="p-6 rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/50 to-white hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-52"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Asistencia
                </span>
              </div>
              <h3 className="font-black text-base text-slate-950 group-hover:text-emerald-800 transition-colors">
                No sé exactamente qué necesito
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Cuéntanos el síntoma, ruido o envíanos una foto de la pieza por WhatsApp. Te asesoramos sin costo.
              </p>
            </div>
            <div className="text-xs font-black text-emerald-700 flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
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
        <div className="mb-6 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Líneas de Especialidad Técnica
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Categorías Principales
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. ENERGÍA Y ARRANQUE */}
          <Link
            href="/baterias"
            className="p-6 rounded-2xl border border-red-200/90 bg-white hover:border-red-500 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-56"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-100">
                  Energía & Arranque
                </span>
                <Zap className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-brand-primary transition-colors">
                Baterías
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Alta capacidad de reserva, amperaje CCA comprobado y tecnología calcio-plata sellada.
              </p>
            </div>
            <div className="text-xs font-black text-brand-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explorar baterías</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* 2. PROTECCIÓN DEL MOTOR */}
          <Link
            href="/lubricantes"
            className="p-6 rounded-2xl border border-amber-200/90 bg-white hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-56"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-100">
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
            <div className="text-xs font-black text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver lubricantes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* 3. MANTENIMIENTO */}
          <Link
            href="/filtros"
            className="p-6 rounded-2xl border border-blue-200/90 bg-white hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-56"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
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
            <div className="text-xs font-black text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver mantenimiento</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* 4. SEGURIDAD */}
          <Link
            href="/productos"
            className="p-6 rounded-2xl border border-slate-300/90 bg-white hover:border-slate-800 hover:shadow-xl hover:shadow-slate-500/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-56"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                  Seguridad
                </span>
                <ShieldCheck className="w-5 h-5 text-slate-800" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-slate-900 transition-colors">
                Frenos
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Compuestos cerámicos con coeficiente de fricción estable y cero fade térmico.
              </p>
            </div>
            <div className="text-xs font-black text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver frenos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* 5. REPUESTOS Y SOLUCIONES */}
          <Link
            href="/productos"
            className="p-6 rounded-2xl border border-emerald-200/90 bg-white hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-56"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">
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
            <div className="text-xs font-black text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* 05: FEATURED PRODUCTS — High-Conversion Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Catálogo de Alta Demanda
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Productos Destacados
            </h2>
          </div>
          <Link
            href="/productos"
            className="text-xs font-black text-brand-primary hover:text-red-700 transition-colors flex items-center gap-1 uppercase tracking-wider"
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

      {/* 06: PHOTO REPLACEMENT CONSULTATION HOOK (Complementary to Emergency) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>Identificación por Fotografía</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              ¿Tienes la muestra o el repuesto en mano?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Envíanos una foto de la etiqueta, código o pieza por WhatsApp. Nuestro equipo técnico revisa el despiece y te entrega la opción exacta disponible.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href={buildWhatsAppLink("unknown_need")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !py-3.5 !px-8 text-xs font-black uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ENVIAR FOTO POR WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* 07: EMERGENCY BATTERY COMMAND CENTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmergencyBanner />
      </section>

      {/* 08: LOCATIONS — Pedernales + Quito */}
      <LocationsLogisticsSection />

      {/* 09: GUIDES (Editorial selection) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Criterio Técnico Automotriz
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Guías de Diagnóstico y Consejos
            </h2>
          </div>
          <Link
            href="/guias"
            className="text-xs font-black text-slate-900 hover:text-brand-primary transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Ver todas las guías</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATIONAL_ARTICLES.slice(0, 2).map((art) => (
            <div
              key={art.slug}
              className="card-interactive p-8 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-primary bg-red-50 px-2.5 py-0.5 rounded border border-red-100">
                    {art.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {art.readTime}
                  </span>
                </div>
                <h3 className="font-black text-xl text-slate-950">
                  <Link href={`/guias/${art.slug}`} className="hover:text-brand-primary transition-colors">
                    {art.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {art.subtitle}
                </p>
              </div>

              <Link
                href={`/guias/${art.slug}`}
                className="btn-secondary !w-fit !py-2.5 !px-4 text-xs font-bold flex items-center gap-1.5 group"
              >
                <span>Leer Guía Completa</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 10: FAQ SECTION */}
      <FAQSection />

      {/* 11: FINAL HIGH-CONVERSION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-emerald-500 to-red-600" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-slate-300 uppercase tracking-wider mx-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Atención Personalizada Sin Esperas</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
            ¿Listo para equipar tu vehículo con el producto exacto?
          </h2>
          <p className="text-xs sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
            Escríbenos por WhatsApp. Confirmamos compatibilidad técnica, stock en Pedernales o Quito y opciones de despacho en minutos.
          </p>
          <div className="pt-2">
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !py-4 !px-10 !text-sm font-black uppercase tracking-wider inline-flex items-center gap-2.5 shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/50"
            >
              <MessageCircle className="w-5 h-5" />
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
          className="flex-1 py-3 px-2 bg-gradient-to-r from-emerald-600 to-teal-700 active:from-emerald-700 active:to-teal-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Asesor WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
