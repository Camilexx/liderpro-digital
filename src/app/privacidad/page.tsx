import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad y Protección de Datos Personales (LOPDP) | LiderPro Ecuador",
  description:
    "Aviso de privacidad y protección de datos conforme a la Ley Orgánica de Protección de Datos Personales (LOPDP) de la República del Ecuador. Tratamiento seguro de datos para cotizaciones y facturación SRI.",
  alternates: {
    canonical: "/privacidad",
  },
  openGraph: {
    title: "Política de Privacidad y Protección de Datos Personales — LiderPro",
    description:
      "Aviso de privacidad conforme a la LOPDP del Ecuador para cotizaciones y facturación SRI.",
    url: "https://liderpro-digital.vercel.app/privacidad",
    type: "website",
  },
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#061B40] via-[#092352] to-[#04122E] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>CUMPLIMIENTO LEY ORGÁNICA DE PROTECCIÓN DE DATOS (LOPDP)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Política de Privacidad y Tratamiento de Datos
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            En LiderPro Ecuador respetamos y salvaguardamos la privacidad de tu información personal y comercial en estricto cumplimiento del marco legal ecuatoriano.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              1. Responsable del Tratamiento de los Datos
            </h2>
            <p>
              El responsable del tratamiento de los datos personales recopilados es <strong>LiderPro Ecuador</strong>, con domicilio principal y Hub de Operaciones en la ciudad de Pedernales, Provincia de Manabí, República del Ecuador.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              2. Datos Personales Recopilados
            </h2>
            <p>
              Para gestionar cotizaciones, despachos nacionales y la emisión de comprobantes autorizados por el SRI, recopilamos únicamente los datos necesarios:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Nombres y apellidos completos o Razón Social corporativa.</li>
              <li>Número de Cédula de Identidad o RUC.</li>
              <li>Número de teléfono celular / WhatsApp para coordinación logística.</li>
              <li>Dirección de correo electrónico para envío de facturas electrónicas (XML y RIDE).</li>
              <li>Ciudad y dirección de destino para la entrega o retiro de encomiendas.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              3. Finalidad del Tratamiento
            </h2>
            <p>Tus datos se utilizan exclusivamente para:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Emisión y autorización de comprobantes tributarios ante el SRI.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Generación de guías de remisión y coordinación con couriers de transporte.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Atención técnica personalizada y registro de pólizas de garantía de 12 meses.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Respuesta inmediata a cotizaciones del cotizador multiproducto.</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              4. No Comercialización y Seguridad de Datos
            </h2>
            <p>
              LiderPro Ecuador <strong>no comercializa, arrienda ni transfiere bajo ninguna circunstancia</strong> tus datos personales a empresas de publicidad o terceros no autorizados. La información de despacho únicamente se comparte con las empresas de transporte interprovincial contratadas con el único fin de completar la entrega física de tu pedido.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              5. Ejercicio de Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
            </h2>
            <p>
              Conforme a la Ley Orgánica de Protección de Datos Personales (LOPDP), tienes derecho a conocer qué datos tuyos almacenamos, solicitar correcciones o requerir su eliminación de nuestras bases de datos comerciales cuando no contravenga obligaciones tributarias legales con el SRI.
            </p>
            <p className="pt-1">
              Para ejercer cualquiera de estos derechos, contáctanos a:
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold pt-2">
              <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                📧 Correo: privacidad@liderpro.ec
              </span>
              <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                📱 WhatsApp Oficial: +593 96 748 9002
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
