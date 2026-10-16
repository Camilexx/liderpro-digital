import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Layers,
  ArrowRight,
  Sparkles,
  BadgeCheck
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import EcuadorLogistics2DMap from "@/components/EcuadorLogistics2DMap";
import QuickDispatchAssistant from "@/components/QuickDispatchAssistant";
import ShippingFAQAccordion from "@/components/ShippingFAQAccordion";

export const metadata: Metadata = {
  title: "Despacho Nacional desde Hub Pedernales | Envíos a las 24 Provincias",
  description:
    "Despacho diario a nivel nacional a las 24 provincias desde nuestra Sede Central en Pedernales por transporte interprovincial y courier según destino. Mapa 2D de rutas directas, tiempos de entrega de 24h a 48h, protocolo técnico de embalaje antiderrame y facturación electrónica SRI.",
  keywords: [
    "envios repuestos automotrices ecuador",
    "despacho baterias lubricantes pedernales manabi",
    "encomienda repuestos quito guayaquil manta",
    "logistica automotriz 24 provincias ecuador",
  ],
  alternates: {
    canonical: "/envios",
  },
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO COMMAND SECTION */}
      <section className="bg-gradient-to-b from-[#061B40] via-[#092352] to-[#04122E] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Glow ambient background lights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Breadcrumb / Top Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>🟢 HUB LOGÍSTICO MATRIZ PEDERNALES — DESPACHO DIARIO ACTIVO</span>
            </div>

            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span>LAT: 0.07° N • LON: -80.05° W</span>
              <span className="text-slate-600">|</span>
              <span className="text-[#FFC500] font-bold">ZONA COMERCIAL PEDERNALES, MANABÍ</span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Red Logística y Despacho Nacional hacia las 24 Provincias
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 font-medium leading-relaxed max-w-3xl">
              Desde nuestra Bodega Matriz y Centro de Operaciones en <strong className="text-white">Pedernales (Manabí)</strong>, despachamos diariamente lubricantes, baterías y filtros con tiempos de tránsito certificados de 24h a 48h, protocolo técnico de embalaje antiderrame y facturación electrónica autorizada por el SRI.
            </p>
          </div>

          {/* 4-KPI Institutional Metric Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#FFC500] font-mono">
                24 Prov.
              </div>
              <span className="text-xs font-bold text-slate-200 block">
                Cobertura Integral
              </span>
              <span className="text-[11px] text-slate-400 block">
                Costa, Sierra, Oriente y Galápagos
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                24h - 48h
              </div>
              <span className="text-xs font-bold text-slate-200 block">
                Tiempos de Tránsito
              </span>
              <span className="text-[11px] text-slate-400 block">
                Embarques diarios con doble corte
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">
                100% Seguro
              </div>
              <span className="text-xs font-bold text-slate-200 block">
                Sello Antiderrame
              </span>
              <span className="text-[11px] text-slate-400 block">
                Anclaje dieléctrico de baterías
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                SRI Legal
              </div>
              <span className="text-xs font-bold text-slate-200 block">
                Factura Electrónica
              </span>
              <span className="text-[11px] text-slate-400 block">
                Con guía de remisión oficial
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 2D INTERACTIVE ECUADOR LOGISTICS MAP */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-brand-primary uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visualizador Logístico 2D Oficial</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Mapa de Cobertura y Rutas desde Hub Pedernales
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explora en proyección plana 2D la conectividad directa de nuestra bodega matriz con los principales centros urbanos e industriales del país. Toca cualquier ciudad para consultar tiempos y rutas.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFC500] animate-pulse" />
            <span>Frecuencias en vivo coordinadas según cantón de destino</span>
          </div>
        </div>

        {/* The 2D Map Component */}
        <EcuadorLogistics2DMap />
      </section>

      {/* 3. QUICK DISPATCH ASSISTANT & ARTERIAL TRUNK CORRIDORS */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <QuickDispatchAssistant />
      </section>

      {/* 4. INDUSTRIAL PACKAGING & SECURITY STANDARDS */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Garantía de Integridad en Tránsito</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Protocolo Técnico de Embalaje y Carga Segura
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Los lubricantes, baterías automotrices y filtros requieren una manipulación técnica especializada. Diseñamos un estándar de seguridad de 4 niveles para garantizar que tu producto llegue intacto a su destino.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="card-interactive p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-black text-lg">
                  01
                </div>
                <h3 className="text-lg font-black text-slate-950">
                  Sellado Térmico Antiderrame
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cuartos, galones y canecas de Mannol, Motul, Mobil, Castrol y Havoline se inspeccionan en bodega: se verifica el sello de inducción de fábrica, se refuerza la tapa con precinto termocontraíble y se enfunda en polietileno de alta densidad.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-900 bg-amber-50/70 p-2.5 rounded-xl">
                ✓ 0% filtración en trayectos curvos o de montaña
              </div>
            </div>

            {/* Step 2 */}
            <div className="card-interactive p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 font-black text-lg">
                  02
                </div>
                <h3 className="text-lg font-black text-slate-950">
                  Anclaje Dieléctrico de Baterías
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Para baterías Bosch y Baterías Ecuador (NS40, NS60, 24, 27R y Grupo 31), instalamos protectores plásticos aislantes en ambos bornes para evitar arcos eléctricos accidentales, base nivelada y flejes de soporte vertical rígido.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-blue-900 bg-blue-50/70 p-2.5 rounded-xl">
                ✓ Rotulación obligatoria &quot;Este Lado Arriba&quot;
              </div>
            </div>

            {/* Step 3 */}
            <div className="card-interactive p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600 font-black text-lg">
                  03
                </div>
                <h3 className="text-lg font-black text-slate-950">
                  Cartón Triple Onda Reforzado
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Los filtros de aire, aceite, cabina y bujías NGK se embalan en cajas de cartón corrugado de triple onda con amortiguación perimetral y cinta de seguridad industrial para proteger los pliegues microscópicos de filtración.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-purple-900 bg-purple-50/70 p-2.5 rounded-xl">
                ✓ Protección contra aplastamiento en bodega
              </div>
            </div>

            {/* Step 4 */}
            <div className="card-interactive p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 font-black text-lg">
                  04
                </div>
                <h3 className="text-lg font-black text-slate-950">
                  Foto-Verificación y Guía SRI
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Antes de entregar al transportista o courier, el equipo toma una fotografía en báscula del bulto rotulado y te envía por WhatsApp la foto del paquete junto con la Factura Electrónica legal y el comprobante de guía para tu rastreo.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-900 bg-emerald-50/70 p-2.5 rounded-xl">
                ✓ Trazabilidad total de origen a destino
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MODALIDAD DE ENVÍO PROFESIONAL Y NEUTRAL */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#061B40] to-[#0A2662] rounded-3xl p-8 sm:p-12 text-white border border-blue-900/60 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC500]/15 text-[#FFC500] border border-[#FFC500]/30 rounded-full text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Modalidad Logística Adaptada a Tu Cantón</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Alianzas con Transporte Interprovincial y Courier Nacional
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Para brindarte siempre la opción más conveniente, rápida y económica, no te obligamos a trabajar con una única empresa. Según tu cantón y el volumen de tu compra, coordinamos contigo directamente por WhatsApp:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <strong className="text-white block font-black">Transporte Interprovincial y Encomiendas:</strong>
                  <p className="text-slate-300">Ideal para canecas de 20L, tambores, cajas de lubricantes y baterías de gran peso. Retiro ágil en terminales terrestres o agencias autorizadas de tu ciudad.</p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                  <strong className="text-white block font-black">Servicio de Courier Especializado:</strong>
                  <p className="text-slate-300">Ideal para filtros de aire/aceite/cabina, bujías, aditivos y paquetes livianos con opción de entrega directa a tu domicilio, taller mecánico o negocio.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-700/80 space-y-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-white">
                Coordinación Inmediata por WhatsApp
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Indícanos tu cantón y qué repuestos necesitas. Nuestro asesor logístico te indicará la empresa con el menor tiempo de tránsito y costo más bajo.
              </p>
              <a
                href={buildWhatsAppLink("shipping")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !w-full !py-3 !text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl shadow-lg transition-transform active:scale-95"
              >
                <span>Cotizar Flete por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LOGISTICS FAQ ACCORDION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-brand-primary uppercase tracking-wider">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Resolución de Dudas Frecuentes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Preguntas Frecuentes sobre Despachos y Facturación
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Todo lo que necesitas saber sobre garantías de transporte, seguros de carga, tiempos de entrega y comprobantes legales SRI.
          </p>
        </div>

        <ShippingFAQAccordion />
      </section>

      {/* 7. HIGH-CONVERTING BOTTOM DISPATCH CTA */}
      <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Despachos Diarios con Salidas a las 14:00 y 18:00</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
            ¿Listo para recibir tus repuestos y lubricantes originales en tu ciudad?
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Atendemos pedidos al por menor y al por mayor para talleres mecánicos, cooperativas de transporte, flotas comerciales y camaroneras de todo el Ecuador con factura electrónica inmediata.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={buildWhatsAppLink("shipping")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !px-8 !py-4 text-xs font-black uppercase tracking-wider rounded-xl shadow-xl transition-all active:scale-95 flex items-center gap-2.5 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Cotizar Envío Inmediato a Mi Ciudad</span>
            </a>

            <Link
              href="/catalogo"
              className="btn-secondary !px-8 !py-4 text-xs font-black uppercase tracking-wider rounded-xl border border-slate-700 hover:border-slate-500 text-white w-full sm:w-auto justify-center"
            >
              <span>Explorar Catálogo de 508 Productos</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Stock 100% verificado en Pedernales
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Facturación electrónica SRI autorizada
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Garantía de fábrica en todas las marcas
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
