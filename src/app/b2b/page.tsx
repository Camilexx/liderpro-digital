import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, Truck, Building2, ShieldCheck, MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Atención B2B para Talleres, Flotas y Empresas | LiderPro Ecuador",
  description:
    "Soluciones automotrices para flotas comerciales, cooperativas, talleres mecánicos y distribuidores. Asesoría técnica, consolidación de pedidos y envíos a todo Ecuador.",
};

const B2B_SEGMENTS = [
  {
    title: "Talleres Mecánicos y Centros de Servicio",
    icon: Wrench,
    desc: "Suministro confiable de baterías, lubricantes por caneca/tambor y filtros con especificación técnica comprobada para evitar garantías y retornos.",
  },
  {
    title: "Flotas Comerciales y Cooperativas",
    icon: Truck,
    desc: "Mantenimiento preventivo programado para camionetas, furgones y camiones. Cotizaciones consolidadas y despacho coordinado.",
  },
  {
    title: "Distribuidores y Almacenes de Repuestos",
    icon: Building2,
    desc: "Precios referenciales por volumen y soporte técnico directo en líneas automotrices de alta rotación en el mercado ecuatoriano.",
  },
];

export default function B2BPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Canal Corporativo e Institucional</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          ¿Compras para taller, flota o negocio?
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Diseñamos soluciones de abastecimiento para profesionales del sector automotriz. Atención técnica directa, verificación de aplicaciones por volumen y logística a todo el Ecuador.
        </p>
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {B2B_SEGMENTS.map((seg, idx) => {
          const Icon = seg.icon;
          return (
            <div
              key={idx}
              className="p-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-950">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-lg text-slate-950 leading-snug">
                  {seg.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {seg.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Atención técnica directa</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Commercial Truth & Action Box */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Solicita atención técnica B2B
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Un especialista comercial revisará tus requerimientos de flota o taller para preparar una propuesta técnica ajustada a tus marcas y volumen.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <a
            href={buildWhatsAppLink("b2b")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 h-13 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>SOLICITAR ATENCIÓN B2B POR WHATSAPP</span>
          </a>
        </div>

        <div className="pt-6 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Condiciones comerciales sujetas a validación</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Cobertura y despacho a nivel nacional</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Emisión de comprobante y coordinación directa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
