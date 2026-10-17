import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Clock,
  ArrowRight,
  MessageCircle,
  BadgeCheck,
  Award
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Políticas de Garantía Oficial de Fábrica | LiderPro Ecuador",
  description:
    "Garantía oficial directa de 12 meses en baterías Bosch y Baterías Ecuador. Centro de diagnóstico computarizado en Pedernales (Manabí) y protocolo de respaldo técnico nacional.",
  keywords: [
    "garantia baterias ecuador",
    "garantia baterias bosch pedernales",
    "centro de diagnostico baterias manabi",
    "repuestos originales garantia ecuador",
  ],
  alternates: {
    canonical: "/garantias",
  },
};

const WARRANTY_TERMS = [
  {
    category: "Baterías Automotrices (Baterías Ecuador & Bosch)",
    duration: "12 Meses de Garantía Oficial",
    coverage: "Defectos internos de fabricación, corte de celdas internas o pérdida prematura de conductancia.",
    requirements: "Factura electrónica SRI o certificado de garantía sellado, bornes sin deformación por golpe.",
    badge: "1 Año Completo",
    icon: Award,
  },
  {
    category: "Baterías Pesadas (Grupo 31 & N150 Flotas / Camaroneras)",
    duration: "12 Meses para Servicio Pesado",
    coverage: "Resistencia de placas al ciclado severo y vibración en motores estacionarios y camiones.",
    requirements: "Registro de instalación con alternador regulado a 13.8V - 14.4V.",
    badge: "Servicio Severo",
    icon: ShieldCheck,
  },
  {
    category: "Lubricantes Oficiales (Mannol, Motul, Mobil, Havoline)",
    duration: "Certificación de Origen 100% Original",
    coverage: "Pureza garantizada contra adulteración. Envases sellados con precinto térmico de fábrica.",
    requirements: "Sello de seguridad intacto al momento de la entrega.",
    badge: "Precinto Inviolable",
    icon: BadgeCheck,
  },
  {
    category: "Filtros Automotrices e Industriales (Advance & Fram)",
    duration: "Garantía de Micraje y Flujo OEM",
    coverage: "Integridad del medio filtrante sintético y válvula bypass bajo presión especificada.",
    requirements: "Instalación con par de apriete correcto y junta lubricada.",
    badge: "Calidad OEM",
    icon: Wrench,
  },
];

const STEPS_TO_CLAIM = [
  {
    step: "01",
    title: "Contacto Técnico y Envío de Evidencias",
    desc: "Escribe a nuestra línea oficial de soporte (+593 96 748 9002) indicando tu número de factura electrónica o foto de la póliza de garantía y video/foto del acumulador instalado.",
  },
  {
    step: "02",
    title: "Diagnóstico Computarizado de Carga",
    desc: "En nuestro Hub Central de Pedernales realizamos test con analizador digital de conductancia (CCA real, resistencia interna) y revisión del alternador de tu vehículo.",
  },
  {
    step: "03",
    title: "Resolución Inmediata",
    desc: "Si se confirma fallo interno de fábrica, se procede al reemplazo inmediato por una unidad nueva bajo los términos de la marca fabricante.",
  },
];

export default function GarantiasPage() {
  const whatsappUrl = buildWhatsAppLink("warranty", {
    details: "Hola LiderPro, requiero asesoría técnica sobre la garantía de un producto adquirido con ustedes.",
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#061B40] via-[#092352] to-[#04122E] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>RESPALDO OFICIAL DE FÁBRICA — CERO RIESGO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
            Políticas de Garantía Oficial y Respaldo Técnico
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            En LiderPro distribuimos exclusivamente repuestos 100% legítimos provenientes de importadores y fabricantes autorizados en Ecuador. Todas nuestras baterías cuentan con 12 meses de garantía real y soporte técnico directo en nuestro Hub Central de Pedernales.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFC500] hover:bg-[#e6b200] text-slate-950 font-bold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-[#FFC500]/20 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>Consultar Estado de Garantía</span>
            </a>
            <Link
              href="/sucursales"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-sm border border-white/20 transition-all duration-200"
            >
              <span>Ver Ubicación del Hub Pedernales</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TABLA DE COBERTURAS POR CATEGORÍA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Cobertura por Línea de Producto
          </h2>
          <p className="text-sm text-slate-600">
            Conoce los periodos de validez y requisitos de cada marca distribuida por LiderPro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WARRANTY_TERMS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4 hover:border-blue-400 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{item.category}</h3>
                  <p className="text-xs font-bold text-[#0A3B8C] mt-0.5">{item.duration}</p>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <p>
                    <strong className="text-slate-800">Qué cubre:</strong> {item.coverage}
                  </p>
                  <p>
                    <strong className="text-slate-800">Requisito técnico:</strong> {item.requirements}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. CENTRO DE DIAGNÓSTICO EN PEDERNALES */}
        <div className="bg-[#0A3B8C] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-slate-200">
              <Clock className="w-3.5 h-3.5 text-[#FFC500]" />
              <span>Diagnóstico Computarizado Gratuito en Pedernales</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              ¿Dudas sobre el estado de tu batería o alternador?
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Visítanos en nuestro Hub Central de Pedernales. Contamos con analizadores digitales de conductancia que miden en 30 segundos el porcentaje de vida útil restante de tu batería, el estado del motor de arranque y el regulador de voltaje del alternador.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#FFC500]" /> Test de CCA en Frío
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#FFC500]" /> Test de Fuga Parásita
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#FFC500]" /> Certificado Impreso
              </span>
            </div>
          </div>
        </div>

        {/* 4. PASO A PASO PARA RECLAMOS */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              ¿Cómo tramitar una garantía?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Proceso ágil y transparente sin trabas burocráticas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS_TO_CLAIM.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 relative hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-black text-[#FFC500] font-mono">{item.step}</div>
                <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. EXCLUSIONES */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Condiciones no cubiertas por las garantías de fábrica</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Sobrecarga:</strong> Baterías infladas o secas por alternador descalibrado (&gt; 14.8V).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Descarga profunda:</strong> Baterías con voltaje &lt; 10.5V por consumo de accesorios con el motor apagado.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Daño físico:</strong> Bornes derretidos por falso contacto, fisuras en la caja o golpes mecánicos.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Aplicación indebida:</strong> Uso de batería liviana en camión de carga o maquinaria industrial.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
