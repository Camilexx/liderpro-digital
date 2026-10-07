import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
  MessageCircle,
  Search,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Layers,
  MapPin,
  Clock,
  ChevronRight,
  BookOpen,
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
    <div className="space-y-16 sm:space-y-24">
      {/* 01 & 02: HERO SECTION */}
      <section className="relative bg-gradient-to-b from-brand-navy via-slate-900 to-brand-dark text-white pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle grid background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Core Positioning Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Atención Costa y Sierra • Pedernales & Quito</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {BUSINESS_CONFIG.slogan}
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {BUSINESS_CONFIG.supportingProposition}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href="#buscador"
                  className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-brand-primaryHover text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-glow transition-all flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <Search className="w-5 h-5" />
                  <span>ENCONTRAR MI PRODUCTO</span>
                </a>

                <a
                  href={buildWhatsAppLink("general_quote")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2.5 backdrop-blur-sm"
                >
                  <MessageCircle className="w-5 h-5 text-brand-whatsapp" />
                  <span>HABLAR CON UN ASESOR</span>
                </a>
              </div>

              {/* Trust Strip */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Envíos a nivel nacional</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Entrega estimada 24–48 h*</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Asesoría especializada</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Atención Costa y Sierra</span>
                </div>
              </div>

              {/* Shipping disclaimer */}
              <p className="text-[11px] text-slate-400 italic">
                {BUSINESS_CONFIG.shipping.disclaimer}
              </p>
            </div>

            {/* Right Column: Visual Value Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Ecosistema LiderPro
                  </span>
                  <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full font-bold">
                    Operación Activa
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700/60 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 text-brand-primary flex items-center justify-center shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Identificación y Compatibilidad</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Filtramos el producto exacto para tu modelo, año y motor sin margen de error.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700/60 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-brand-whatsapp flex items-center justify-center shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Asesoría Humana en WhatsApp</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Confirmamos stock en tiempo real, fotos reales y especificación técnica.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700/60 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Despacho Pedernales / Quito</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Seleccionamos el punto de envío más conveniente para entrega rápida en tu ciudad.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/sucursales"
                    className="block text-center text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Conoce nuestros puntos en Pedernales y Quito →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04: VEHICLE / PRODUCT FINDER (Interactive) */}
      <section id="buscador" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-20">
        <VehicleFinder />
      </section>

      {/* 05: MAIN CATEGORIES (Clean automotive grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-bold text-brand-primary uppercase tracking-wider">
            Líneas Especializadas
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark">
            Categorías Principales
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Productos formulados y probados para alta exigencia mecánica.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Link
            href="/baterias"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-card hover:border-brand-primary transition-all group text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all flex items-center justify-center mb-4">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-black text-brand-dark text-base group-hover:text-brand-primary transition-colors">
              Baterías
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Libres de mantenimiento • 15 a 18 meses
            </p>
          </Link>

          <Link
            href="/lubricantes"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-card hover:border-brand-primary transition-all group text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all flex items-center justify-center mb-4">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="font-black text-brand-dark text-base group-hover:text-brand-primary transition-colors">
              Lubricantes
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Sintéticos 5W-30 y Diésel 15W-40
            </p>
          </Link>

          <Link
            href="/filtros"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-card hover:border-brand-primary transition-all group text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center mb-4">
              <Wrench className="w-7 h-7" />
            </div>
            <h3 className="font-black text-brand-dark text-base group-hover:text-brand-primary transition-colors">
              Filtros
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Aceite, aire y combustible blindados
            </p>
          </Link>

          <Link
            href="/productos"
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-card hover:border-brand-primary transition-all group text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-black text-brand-dark text-base group-hover:text-brand-primary transition-colors">
              Refrigerantes y Frenos
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              OAT 50/50 y pastillas cerámicas
            </p>
          </Link>
        </div>
      </section>

      {/* 06: FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-brand-primary uppercase tracking-wider">
              Disponibilidad Inmediata
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark">
              Productos Destacados
            </h2>
          </div>
          <Link
            href="/productos"
            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
          >
            <span>Ver catálogo completo ({PRODUCTS.length} referencias verificadas)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 07: ¿NO SABES CUÁL NECESITAS? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              Asesoría Técnica Gratuita
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              ¿No sabes exactamente qué repuesto o batería necesitas?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No tienes que ser mecánico. Envíanos una foto de tu producto actual, la tarjeta de matrícula o indícanos marca y modelo por WhatsApp. Te decimos con certeza matemática cuál es el correcto.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>CONSULTAR CON UN ASESOR</span>
            </a>
          </div>
        </div>
      </section>

      {/* 08: EMERGENCY PATH (¿Tu carro no enciende?) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmergencyBanner />
      </section>

      {/* 09: PEDERNALES + QUITO LOGISTICS & FULFILLMENT */}
      <LocationsLogisticsSection />

      {/* 10: TRUST SYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-bold text-brand-primary uppercase tracking-wider">
            Seguridad Comercial
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark">
            ¿Por qué comprar en LiderPro con total tranquilidad?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Eliminamos la incertidumbre y el riesgo de recibir productos incompatibles o de dudosa procedencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-black text-base text-brand-dark mb-2">
              Cero Falsificaciones
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Todos nuestros lubricantes, baterías y componentes proceden de formulaciones certificadas y cuentan con trazabilidad de lote y empaque sellado.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-black text-base text-brand-dark mb-2">
              Presencia Física Real
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No somos una tienda virtual sin dirección. Puedes visitarnos o retirar tu producto en nuestros puntos de Pedernales (Manabí) y Quito (Pichincha).
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-black text-base text-brand-dark mb-2">
              Garantía Técnica Escrita
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Baterías con respaldo de 15 a 18 meses ante cualquier defecto de fábrica con atención y chequeo de sistema eléctrico.
            </p>
          </div>
        </div>
      </section>

      {/* 11: AUTOMOTIVE GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-brand-primary uppercase tracking-wider">
              Contenido Técnico Educativo
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark">
              Guías Automotrices
            </h2>
          </div>
          <Link
            href="/guias"
            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
          >
            <span>Ver todas las guías</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATIONAL_ARTICLES.slice(0, 2).map((art) => (
            <div
              key={art.slug}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-bold text-brand-primary uppercase tracking-wider">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-black text-lg text-brand-dark mb-2">
                  <Link href={`/guias/${art.slug}`} className="hover:text-brand-primary transition-colors">
                    {art.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {art.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/guias/${art.slug}`}
                  className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
                >
                  <span>Leer solución completa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12: FAQ SECTION */}
      <FAQSection />

      {/* 13: FINAL CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-brand-primary to-red-700 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            ¿Listo para equipar tu vehículo con el producto exacto?
          </h2>
          <p className="text-xs sm:text-base text-red-100 max-w-xl mx-auto">
            Escríbenos directamente por WhatsApp. Te confirmamos compatibilidad, stock en Pedernales o Quito y opciones de despacho nacional en minutos.
          </p>
          <div className="pt-2">
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white hover:bg-slate-100 text-brand-dark font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-brand-whatsapp" />
              <span>INICIAR CONVERSACIÓN POR WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
