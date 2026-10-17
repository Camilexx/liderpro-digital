import type { Metadata } from "next";
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  Mail,
  ExternalLink,
  MessageCircle,
  Receipt
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Facturación Electrónica SRI & Cumplimiento Tributario | LiderPro Ecuador",
  description:
    "Comprobantes electrónicos autorizados por el SRI (Facturas XML/RIDE, Guías de Remisión y Retenciones). Respaldo tributario para personas naturales, talleres mecánicos, flotas y empresas camaroneras.",
  keywords: [
    "facturacion electronica sri liderpro",
    "retenciones ruc repuestos automotrices ecuador",
    "factura electronica baterias lubricantes pedernales",
    "comprobantes autorizados sri ecuador",
  ],
  alternates: {
    canonical: "/sri",
  },
};

export default function SriPage() {
  const billingWhatsAppUrl = buildWhatsAppLink("billing", {
    details: "Hola Departamento de Facturación LiderPro, requiero información sobre emisión de factura con RUC / retención electrónica.",
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#061B40] via-[#092352] to-[#04122E] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>CUMPLIMIENTO TRIBUTARIO Y FACTURACIÓN ELECTRÓNICA SRI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
            Facturación Electrónica SRI y Respaldo Legal
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Todas las transacciones en LiderPro cuentan con respaldo legal mediante comprobantes electrónicos válidos ante el Servicio de Rentas Internas (SRI). Emitimos facturas autorizadas para personas naturales y empresas (talleres, cooperativas, flotas de carga y sector camaronero).
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href={billingWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFC500] hover:bg-[#e6b200] text-slate-950 font-bold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-[#FFC500]/20 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>Contactar a Facturación & Contabilidad</span>
            </a>
            <a
              href="https://srienlinea.sri.gob.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-sm border border-white/20 transition-all duration-200"
            >
              <span>Portal SRI en Línea</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. DATOS FISCALES & PROCESO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card: Ficha Fiscal */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-[#0A3B8C] rounded-2xl">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Datos de Identificación Fiscal</h3>
                <p className="text-xs text-slate-500">LiderPro Distribuidor Automotriz</p>
              </div>
            </div>

            <div className="space-y-4 text-xs border-t border-slate-100 pt-4">
              <div>
                <span className="text-slate-400 block font-medium">Nombre Comercial:</span>
                <span className="text-slate-900 font-bold text-sm">LiderPro Ecuador</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Actividad Económica:</span>
                <span className="text-slate-700 leading-relaxed block">
                  Venta al por mayor y menor de repuestos, lubricantes, baterías y accesorios para vehículos automotores.
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Jurisdicción / Domicilio Matriz:</span>
                <span className="text-slate-900 font-semibold block">
                  Pedernales, Provincia de Manabí, Ecuador.
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Régimen Tributario:</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                  General / Sujeto a Retención según Normativa
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Tipo de Comprobantes Emitidos:</span>
                <span className="text-slate-700 font-medium block">
                  Facturas Electrónicas, Guías de Remisión Electrónicas, Notas de Crédito.
                </span>
              </div>
            </div>
          </div>

          {/* Card: Proceso de Emisión */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Flujo de Emisión y Entrega de Comprobantes</h3>
                <p className="text-xs text-slate-500">Totalmente automático en formato XML y RIDE (PDF)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#0A3B8C] text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Recepción de Datos</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Al confirmar tu compra, nos proporcionas tu Cédula o RUC, Razón Social, correo electrónico para facturación y dirección.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#0A3B8C] text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Autorización SRI</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  El sistema genera el comprobante con clave de acceso única de 49 dígitos y es validado en el servidor web del SRI.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#0A3B8C] text-white flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Envío al Correo & Guía</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Recibes los archivos XML y RIDE (PDF) en tu bandeja de entrada y adjuntos a la guía física que viaja con la mercadería.
                </p>
              </div>
            </div>

            {/* Protocolo B2B para Retenciones */}
            <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-[#0A3B8C] font-bold text-xs sm:text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                <span>Protocolo para Retenciones en la Fuente (Empresas y Agentes de Retención)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Si tu empresa o institución es Agente de Retención designado por el SRI, puedes emitir el comprobante de retención correspondiente dentro del plazo legal de 5 días hábiles posteriores a la fecha de la factura.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-800 pt-1">
                <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-200">
                  📧 Correo para recepción: <strong className="text-[#0A3B8C]">facturacion@liderpro.ec</strong>
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-200">
                  📱 WhatsApp Contabilidad: <strong className="text-[#0A3B8C]">+593 96 748 9002</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BENEFICIOS TRIBUTARIOS */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl font-black text-slate-900">Ventajas de Comprar con Facturación Legal</h3>
            <p className="text-xs text-slate-600">
              Garantiza la deducibilidad tributaria y la trazabilidad de los repuestos instalados en tus activos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-slate-900">100% Gasto Deducible</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Permite rebajar el Impuesto a la Renta corporativo o personal con respaldo formal de compraventa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-slate-900">Crédito Tributario de IVA</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Aprovecha el IVA pagado como crédito tributario según tu actividad comercial productiva o de transporte.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-slate-900">Validez para Garantías</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  La factura electrónica es el documento oficial que certifica tu compra y respalda la activación de garantías de fábrica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
