import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, ShieldCheck, Trash2 } from "lucide-react";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { META_CONFIG } from "@/data/metaConfig";

export const metadata: Metadata = {
  title: "Eliminación de Datos Personales (LOPDP & Meta) | LiderPro Pedernales",
  description:
    "Instrucciones oficiales para solicitar la eliminación de datos personales registrados en los canales digitales y WhatsApp Business de LiderPro Pedernales, conforme a la LOPDP de Ecuador y políticas de Meta.",
  alternates: {
    canonical: "/eliminacion-datos",
  },
};

export default function EliminacionDatosPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-b from-[#061B40] via-[#092352] to-[#04122E] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Trash2 className="w-3.5 h-3.5 text-amber-300" />
            <span>ELIMINACIÓN DE DATOS — LOPDP ECUADOR & META PLATFORM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Instrucciones para Eliminación de Datos de Usuario
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            En <strong>LiderPro Pedernales</strong> ({BUSINESS_CONFIG.legalName}) garantizamos tu derecho a solicitar
            la supresión de tus datos personales recopilados mediante WhatsApp Business, Instagram, Facebook Messenger o
            nuestro portal web.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              1. Qué datos podemos eliminar
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Historial de conversaciones y cotizaciones en WhatsApp Business, Instagram DM y Messenger.</li>
              <li>Perfil del vehículo (marca, modelo, año) y preferencias de contacto.</li>
              <li>Nombre, teléfono y dirección de entrega guardados para cotizaciones sin facturación tributaria activa.</li>
            </ul>
            <p className="text-xs text-slate-500">
              Nota legal: Los comprobantes electrónicos ya emitidos y autorizados ante el Servicio de Rentas Internas
              (SRI) se conservan exclusivamente durante el plazo tributario obligatorio exigido por la ley ecuatoriana.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              2. Cómo solicitar la eliminación de tus datos (Plazo máximo: 5 días hábiles)
            </h2>
            <p>Puedes enviar tu solicitud indicando tu nombre completo y el número de WhatsApp o usuario asociado por cualquiera de estos canales directos:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                href={`${META_CONFIG.line247WaLink}?text=${encodeURIComponent(
                  "Hola LiderPro, solicito la eliminación de mis datos personales asociados a este número conforme a la LOPDP."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">WhatsApp Oficial 24/7</p>
                  <p className="text-xs text-slate-600">{META_CONFIG.line247Display}</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">Enviar solicitud ahora &rarr;</p>
                </div>
              </a>
              <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <Mail className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Atención Directa Matriz</p>
                  <p className="text-xs text-slate-600">
                    {BUSINESS_CONFIG.locations.pedernales.directPhone} · {BUSINESS_CONFIG.locations.pedernales.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Asunto: Eliminación de Datos Personales (LOPDP)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>3. Confirmación de Eliminación</span>
            </h2>
            <p>
              Una vez verificada tu identidad como titular de la línea o cuenta, procederemos a purgar tu registro y
              conversaciones de nuestra base de datos y te enviaremos un código de confirmación por el mismo canal
              solicitado en un máximo de 5 días hábiles.
            </p>
            <p className="pt-2">
              Consulta también nuestra{" "}
              <Link href="/privacidad" className="text-blue-700 font-semibold underline">
                Política de Privacidad (LOPDP)
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
