import type { Metadata } from "next";
import { Truck, MapPin, CheckCircle2, MessageCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Políticas de Envíos Nacionales y Cobertura | LiderPro Ecuador",
  description:
    "Envíos a todo el Ecuador coordinados mediante transporte interprovincial y courier. Tiempos transparentes según destino y disponibilidad de producto.",
};

export default function ShippingPage() {
  const { shipping } = BUSINESS_CONFIG;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-soft text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
          <Truck className="w-3.5 h-3.5" />
          Logística Nacional Transparente
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
          {shipping.primaryMessage}
        </h1>
        <p className="text-sm font-semibold text-brand-primary">
          {shipping.subMessage}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Diseñamos nuestro modelo de despacho para que recibas tu repuesto o batería en el menor tiempo posible, coordinando el origen más eficiente entre Pedernales y Quito.
        </p>
      </div>

      {/* Shipping Zones & Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Origin & Routing Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-brand-primary" />
            <span>Multi-Origen Inteligente</span>
          </div>
          <h3 className="text-xl font-black text-brand-dark">
            ¿Cómo decidimos desde dónde enviar?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Aplicamos un criterio logístico seguro:
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 leading-relaxed">
            UBICACIÓN DEL CLIENTE + DISPONIBILIDAD DE PRODUCTO + ORIGEN (PEDERNALES / QUITO) = <strong>MEJOR OPCIÓN DISPONIBLE</strong>
          </div>
          <p className="text-xs text-slate-500 italic">
            *No prometemos despachos automatizados mágicos; un asesor valida la cooperativa o transporte más veloz y te entrega guía de seguimiento por WhatsApp.
          </p>
        </div>

        {/* Zones Covered Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zonas de Cobertura Activa</span>
          </div>
          <h3 className="text-xl font-black text-brand-dark">
            Provincias y Ciudades Atendidas
          </h3>
          <div className="space-y-2.5">
            {shipping.zones.map((zone, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{zone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer Box */}
      <div className="max-w-4xl mx-auto p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <strong className="text-slate-800 block text-sm">Aviso de Responsabilidad Logística:</strong>
        <p className="leading-relaxed">
          {shipping.disclaimer}
        </p>
        <p className="leading-relaxed">
          Los envíos de baterías automotrices que contengan electrolito se transportan cumpliendo normas de sujeción para evitar derrames o inclinaciones.
        </p>
      </div>

      {/* WhatsApp Quote Shipping */}
      <div className="text-center pt-4">
        <a
          href={buildWhatsAppLink("shipping")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 btn-whatsapp font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95"
        >
          <MessageCircle className="w-5 h-5" />
          <span>CONSULTAR FLETE Y TIEMPO A MI CIUDAD</span>
        </a>
      </div>
    </div>
  );
}
