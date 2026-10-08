import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, HelpCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Asesoría Técnica y Diagnóstico | LiderPro Ecuador",
  description:
    "¿No sabes qué repuesto, batería o lubricante necesita tu auto? Describe el síntoma o envíanos una foto por WhatsApp. Te ayudamos a identificarlo con precisión.",
};

export default function AsesoriaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
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
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Flujo de Asistencia Guiada</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          ¿No sabes qué necesita tu vehículo?
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
          No compres a ciegas ni arriesgues la compatibilidad. Cuéntanos qué le ocurre a tu vehículo o envíanos una foto de la pieza que deseas cambiar, y un especialista técnico te guiará.
        </p>
      </div>

      {/* 3 Simple Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-black text-sm text-slate-900">
            1
          </div>
          <h3 className="font-bold text-sm text-slate-950">Describe el síntoma</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ej: "Vibra al frenar", "chillido en frío", "humo blanco", o "el motor gira lento".
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-black text-sm text-slate-900">
            2
          </div>
          <h3 className="font-bold text-sm text-slate-950">Envía una foto o código</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Una fotografía de la etiqueta de la batería, de la muestra del filtro o del repuesto desmontado.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-black text-sm text-slate-900">
            3
          </div>
          <h3 className="font-bold text-sm text-slate-950">Confirmamos opción y costo</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Verificamos catálogo técnico, disponibilidad en Pedernales o Quito y tiempo de entrega a tu ciudad.
          </p>
        </div>
      </div>

      {/* Main Action Block */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Chatea con un asesor técnico ahora
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Canal directo por WhatsApp sin bots confusos. Atención personalizada para dueños de vehículos, talleres y flotas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <a
            href={buildWhatsAppLink("unknown_need")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 h-13 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>AYÚDAME A IDENTIFICAR EL PRODUCTO</span>
          </a>

          <a
            href={buildWhatsAppLink("general_quote")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 h-13 border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span>Consultar disponibilidad general</span>
          </a>
        </div>

        <div className="pt-4 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Sin compromiso de compra</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Validación de especificación exacta</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Despacho Pedernales / Quito</span>
          </div>
        </div>
      </div>
    </div>
  );
}
