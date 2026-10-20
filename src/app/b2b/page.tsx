import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Truck,
  Building2,
  Container,
  ShieldCheck,
  MessageCircle,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  FileText,
  BadgeCheck,
  ArrowRight,
  PackageCheck
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import B2BQuoteCalculator from "@/components/B2BQuoteCalculator";
import B2BFAQAccordion from "@/components/B2BFAQAccordion";

export const metadata: Metadata = {
  title: "Atención B2B y Precios Mayoristas para Talleres, Flotas y Camaroneras",
  description:
    "Canal mayorista y corporativo desde Bodega Matriz en Pedernales (Manabí). Abastecimiento de canecas de 20L, tambores de 55 galones, baterías Grupo 31 y filtros por volumen con Facturación Electrónica SRI.",
  keywords: [
    "distribuidor mayorista lubricantes ecuador",
    "precios por mayor filtros advance baterias ecuador",
    "proveedores para camaroneras manabi esmeraldas",
    "abastecimiento flotas pesadas ecuador",
  ],
  alternates: {
    canonical: "/b2b",
  },
  openGraph: {
    title: "Atención B2B y Precios Mayoristas para Talleres y Flotas — LiderPro",
    description:
      "Abastecimiento por mayor de lubricantes, baterías y filtros con facturación SRI y entrega directa a operaciones en las 24 provincias.",
    url: "https://liderpro-digital.vercel.app/b2b",
    type: "website",
  },
};

const B2B_SECTORS_DATA = [
  {
    title: "Talleres Mecánicos y Centros de Lubricación",
    icon: Wrench,
    badge: "Servicio Automotriz",
    accentColor: "from-blue-600 to-indigo-700",
    desc: "Suministro confiable de lubricantes sintéticos, cajas master de filtros Advance/Fram y baterías selladas Bosch y Baterías Ecuador con garantía real para proteger la reputación de tu taller.",
    points: [
      "Eliminación de riesgos por aceites adulterados en el mercado",
      "Lotes de baterías con fecha de fabricación reciente y voltaje comprobado",
      "Asesoría técnica para recomendaciones por manual de fabricante",
      "Despacho regular programado para que nunca pares operaciones"
    ],
    whatsappMsg: "Hola LiderPro, soy propietario/administrador de un taller mecánico y requiero abastecimiento de lubricantes, filtros y baterías al por mayor."
  },
  {
    title: "Flotas Comerciales, Cooperativas y Transporte",
    icon: Truck,
    badge: "Transporte Pesado y Comercial",
    accentColor: "from-amber-600 to-amber-700",
    desc: "Programas de mantenimiento preventivo para camiones de carga pesada (Hino, Isuzu, Freightliner), furgones urbanos y flotas de camionetas 4x4 (Chevrolet D-Max, Toyota Hilux).",
    points: [
      "Canecas de 20L y tambores de 55 galones de Mobil Delvac, Mannol y Castrol",
      "Baterías de alta descarga y resistencia a la vibración",
      "Estandarización de referencias para reducir stock ocioso en patio",
      "Facturación electrónica con RUC para deducción tributaria inmediata"
    ],
    whatsappMsg: "Hola LiderPro, administro una flota de vehículos/camiones y requiero cotización consolidada para mantenimiento preventivo."
  },
  {
    title: "Sector Camaronero, Acuícola y Maquinaria",
    icon: Container,
    badge: "Acuícola y Agroindustrial",
    accentColor: "from-emerald-600 to-teal-700",
    desc: "Abastecimiento estratégico desde Pedernales para el sector camaronero y agrícola de Manabí, Guayas, Esmeraldas y El Oro con entrega en ruta.",
    points: [
      "Baterías Grupo 31 (1000 CA) de alto ciclado para generadores y bombas de agua",
      "Aceites diésel de trabajo continuo con reserva alcalina TBN superior",
      "Filtros de combustible con separación de agua para ambientes marinos",
      "Despacho de carga pesada con paletizado y amarre seguro"
    ],
    whatsappMsg: "Hola LiderPro, represento a una camaronera/empresa agrícola y requiero cotizar baterías Grupo 31 y canecas de aceite diésel."
  },
  {
    title: "Distribuidores y Almacenes de Repuestos",
    icon: Building2,
    badge: "Reventa y Mayorista",
    accentColor: "from-purple-600 to-slate-900",
    desc: "Lotes multimarca consolidados con márgenes competitivos para locales comerciales de repuestos que buscan alta rotación y marcas oficiales reconocidas.",
    points: [
      "Portafolio oficial: Mannol, Motul, Mobil, Havoline, Castrol, Bosch, NGK",
      "Escalas de precio progresivas que mejoran tu rentabilidad por unidad",
      "Consolidación de pedidos en un solo envío para abaratar flete",
      "Soporte comercial y material publicitario para tu mostrador"
    ],
    whatsappMsg: "Hola LiderPro, tengo un almacén de repuestos y requiero catálogo mayorista con precios de escala para reventa."
  },
];

const INDUSTRIAL_FORMATS = [
  {
    title: "Canecas de 20 Litros (5 Galones)",
    subtitle: "El estándar para flotas y talleres de alta rotación",
    description: "Presentación ideal para cambios de aceite de camiones y maquinaria pesada. Selladas con precinto de fábrica inviolable.",
    popularBrands: "Mobil Delvac 15W40, Mannol TS-7 10W40, Havoline SuperDiesel, Castrol CRB",
    icon: Container,
    badge: "Formato Industrial Líder"
  },
  {
    title: "Tambores Industriales de 55 Galones (208L)",
    subtitle: "Máxima economía para camaroneras y complejos industriales",
    description: "Suministro a granel con precios preferenciales por volumen para empresas que operan motores estacionarios continuos o flotas.",
    popularBrands: "Mobil Delvac MX 15W40, Mannol TS-4, Castrol CRB Turbomax",
    icon: Container,
    badge: "Eficiencia por Volumen"
  },
  {
    title: "Baterías Grupo 31 & Cargas Pesadas",
    subtitle: "Potencia de arranque extrema para generadores y camiones",
    description: "Acumuladores sellados de 1000 Amperios de arranque (CA), placas de plomo-calcio reforzadas y bornes de alta conductividad.",
    popularBrands: "Baterías Ecuador Grupo 31 (Poste/Perno) y Bosch S4 Heavy Duty",
    icon: Truck,
    badge: "1000 CA Arranque en Frío"
  },
  {
    title: "Cajas Master de Filtros y Bujías",
    subtitle: "Paquetes cerrados de fábrica para inventario continuo",
    description: "Cajas de 12 y 24 unidades de filtros de aceite, aire y cabina con cartón corrugado triple onda antipresión.",
    popularBrands: "Advance, Fram, Mann Filter y Bujías NGK Iridium / G-Power",
    icon: Wrench,
    badge: "Embalaje Sellado Master"
  }
];

export default function B2BPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO COMMAND SECTION */}
      <section className="bg-gradient-to-b from-[#061B40] via-[#092352] to-[#04122E] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Breadcrumb / Top Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#FFC500] transition-colors bg-white/5 border border-white/10 px-3 py-1 rounded-full"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la portada principal</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CANAL CORPORATIVO & MAYORISTA B2B — ATENCIÓN DIRECTA</span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Abastecimiento Automotriz Mayorista para Talleres, Flotas y Sector Camaronero
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 font-medium leading-relaxed max-w-3xl">
              Diseñamos soluciones de suministro continuo con precios escalonados por volumen en canecas de 20L, tambores de 55 galones, baterías Grupo 31 y cajas master de filtros. Despacho directo desde nuestra Bodega Matriz en <strong className="text-white">Pedernales (Manabí)</strong> con Facturación Electrónica SRI autorizada.
            </p>
          </div>

          {/* 4-KPI Institutional Metric Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#FFC500] font-mono">
                Por Escala
              </div>
              <span className="text-xs font-bold text-slate-200 block">
                Precios Diferenciados
              </span>
              <span className="text-[11px] text-slate-400 block">
                Desde 5 unidades hasta tambores
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                20L & 55 Gal
              </div>
              <span className="text-xs font-bold text-slate-200 block">
                Formatos Industriales
              </span>
              <span className="text-[11px] text-slate-400 block">
                Mobil, Mannol, Havoline, Castrol
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">
                100% SRI
              </div>
              <span className="text-xs font-bold text-slate-200 block">
                Crédito Tributario
              </span>
              <span className="text-[11px] text-slate-400 block">
                Factura legal + retenciones
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                OEM Asesoría
              </div>
              <span className="text-xs font-bold text-slate-200 block">
                Soporte por Manual
              </span>
              <span className="text-[11px] text-slate-400 block">
                Unificación de referencias para flotas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 SPECIALIZED PRODUCTIVE SECTORS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-brand-primary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sectores Productivos Atendidos</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Soluciones a la Medida de Tu Negocio
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Entendemos que cada sector tiene requerimientos técnicos y logísticos diferentes. Selecciona tu área para conocer nuestras condiciones específicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {B2B_SECTORS_DATA.map((sector, idx) => {
            const Icon = sector.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#061B40] text-[#FFC500] flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg border border-slate-200">
                      {sector.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-950">
                    {sector.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sector.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-black uppercase text-slate-400 block tracking-wider">
                      Beneficios Clave del Servicio:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {sector.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={buildWhatsAppLink("b2b", {
                      details: sector.whatsappMsg
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp !w-full !py-3 !text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl shadow-md transition-transform active:scale-95"
                  >
                    <span>Cotizar para {sector.title.split(" ")[0]} por WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE B2B QUOTATION CALCULATOR */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <B2BQuoteCalculator />
      </section>

      {/* 4. INDUSTRIAL FORMATS & WHOLESALE LINES */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Formatos de Gran Escala</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Presentaciones Industriales y Lotes de Distribución
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Disponemos de stock físico permanente en nuestra Bodega Matriz en Pedernales para atender requerimientos de alto volumen con entrega programada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIAL_FORMATS.map((fmt, idx) => {
              const Icon = fmt.icon;

              return (
                <div
                  key={idx}
                  className="card-interactive p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 border border-slate-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-brand-primary bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {fmt.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-950">
                      {fmt.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {fmt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Marcas Frecuentes:
                    </span>
                    <span className="text-[11px] font-bold text-slate-800 block">
                      {fmt.popularBrands}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LEGAL & TAX GUARANTEES FOR ENTERPRISE CLIENTS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#061B40] to-[#0A2662] rounded-3xl p-8 sm:p-12 text-white border border-blue-900/60 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC500]/15 text-[#FFC500] border border-[#FFC500]/30 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transparencia y Respaldo Legal</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Facturación Electrónica SRI y Cumplimiento Tributario
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              En LiderPro operamos con absoluta formalidad. Todas las compras corporativas se respaldan con comprobantes electrónicos autorizados por el SRI, permitiéndote registrar gastos legítimos y aprovechar el crédito tributario de IVA sin contratiempos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                <FileText className="w-5 h-5 text-[#FFC500] mb-1" />
                <strong className="text-white block font-black">Factura con RUC:</strong>
                <p className="text-slate-300">Emisión automática enviada a tu correo institucional al momento del despacho.</p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                <BadgeCheck className="w-5 h-5 text-emerald-400 mb-1" />
                <strong className="text-white block font-black">Retenciones SRI:</strong>
                <p className="text-slate-300">Aceptamos comprobantes de retención electrónica según los porcentajes de ley.</p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                <Truck className="w-5 h-5 text-blue-400 mb-1" />
                <strong className="text-white block font-black">Guía de Remisión:</strong>
                <p className="text-slate-300">Trazabilidad oficial de carga con transportistas y couriers autorizados.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. B2B FAQ ACCORDION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-brand-primary uppercase tracking-wider">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Resolución de Dudas Corporativas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Preguntas Frecuentes sobre Compras al por Mayor
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Requisitos de compra, crédito tributario, tiempos de despacho para canecas y tambores pesados, y garantías de fábrica.
          </p>
        </div>

        <B2BFAQAccordion />
      </section>

      {/* 7. BOTTOM ENTERPRISE CTA */}
      <section className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Asesoría Comercial Directa por WhatsApp</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
            ¿Listo para optimizar los costos de lubricantes y baterías en tu empresa?
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Conversa con uno de nuestros especialistas de cuentas corporativas. Te presentaremos una propuesta técnica y económica adaptada al tamaño de tu taller, flota o camaronera.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={buildWhatsAppLink("b2b", {
                details: "Hola LiderPro Pedernales, deseo solicitar atención de cuenta corporativa para mi empresa/taller. Por favor comuníquenme con un asesor comercial."
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !px-8 !py-4 text-xs font-black uppercase tracking-wider rounded-xl shadow-xl transition-all active:scale-95 flex items-center gap-2.5 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Solicitar Atención B2B por WhatsApp</span>
            </a>

            <Link
              href="/productos"
              className="btn-secondary !px-8 !py-4 text-xs font-black uppercase tracking-wider rounded-xl border border-slate-700 hover:border-slate-500 text-white w-full sm:w-auto justify-center"
            >
              <span>Ver Catálogo Completo (366 Ítems)</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Bodega Matriz Mayorista en Pedernales
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Facturación electrónica SRI inmediata
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Garantía de fábrica en cada lote
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
