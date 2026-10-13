import type { Metadata } from "next";
import { Truck, MapPin, CheckCircle2, MessageCircle, ShieldCheck, PackageCheck } from "lucide-react";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Despacho Nacional desde Hub Pedernales | Envíos a las 24 Provincias | LiderPro Ecuador",
  description:
    "Despacho diario desde nuestra Sede Central en Pedernales por Reina del Camino, Trans Esmeraldas, Enetsa y couriers autorizados. Embalaje antiderrame y anclaje para baterías.",
};

export default function ShippingPage() {
  const { shipping } = BUSINESS_CONFIG;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>🟢 Stock disponible en Pedernales para despacho nacional</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
          {shipping.primaryMessage}
        </h1>
        <p className="text-sm font-bold text-brand-primary">
          {shipping.subMessage}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Nuestro centro de operaciones mayorista y minorista en <strong>Pedernales, Manabí</strong> despacha diariamente lubricantes, filtros y baterías hacia las 24 provincias del Ecuador con trazabilidad completa por WhatsApp.
        </p>
      </div>

      {/* Shipping Circuit & Security Protocol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Card 1: Circuito de Encomiendas y Couriers */}
        <div className="card-interactive p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-wider">
            <Truck className="w-4 h-4" />
            <span>Circuito Diario de Despacho</span>
          </div>
          <h3 className="text-xl font-black text-slate-950">
            Encomiendas Interprovinciales y Couriers Autorizados
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Aprovechamos la conectividad estratégica de Pedernales con la Sierra y la Costa para realizar embarques diarios mediante:
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-800">
            <p><strong>• Transporte Interprovincial Directo:</strong> Reina del Camino, Trans Esmeraldas, Enetsa y cooperativas aliadas.</p>
            <p><strong>• Couriers Autorizados:</strong> Entrega en agencia o dirección comercial según cobertura provincial.</p>
            <p><strong>• Entrega al Día Siguiente (24h):</strong> Quito, Guayaquil, Santo Domingo, Manta, Portoviejo, Esmeraldas y Quevedo.</p>
          </div>
          <p className="text-xs text-slate-500">
            Tan pronto tu pedido es embarcado en Pedernales, tu asesor te envía por WhatsApp la foto del paquete sellado y el número de guía oficial.
          </p>
        </div>

        {/* Card 2: Protocolo de Seguridad */}
        <div className="card-interactive p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <PackageCheck className="w-4 h-4" />
            <span>Protocolo Técnico de Embalaje</span>
          </div>
          <h3 className="text-xl font-black text-slate-950">
            Protección Antiderrame y Anclaje de Baterías
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sabemos que los lubricantes y baterías requieren manipulación especializada en ruta:
          </p>
          <div className="space-y-3 pt-1">
            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-slate-800 space-y-1">
              <strong className="text-amber-950 block font-black">1. Embalaje Reforzado Antiderrame para Líquidos:</strong>
              <p>Cuartos, galones y canecas de Mannol, Motul, Mobil, Havoline y Castrol viajan con sello de inducción verificado, refuerzo de tapa y cartón de alta densidad.</p>
            </div>
            <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-slate-800 space-y-1">
              <strong className="text-blue-950 block font-black">2. Anclaje Técnico para Baterías Selladas:</strong>
              <p>Las baterías Baterías Ecuador y Bosch (NS40, NS60, 27R y Grupo 31) se despachan con protectores de bornes aislantes, señalización vertical estricta y base estabilizada.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Zones */}
      <div className="max-w-5xl mx-auto card-interactive p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-brand-primary" />
          <span>Cobertura Nacional en las 24 Provincias</span>
        </div>
        <h3 className="text-xl font-black text-slate-950">
          Rutas de Distribución desde Hub Pedernales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {shipping.zones.map((zone, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{zone}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer Box */}
      <div className="max-w-5xl mx-auto p-6 bg-slate-900 text-slate-300 rounded-2xl border border-slate-800 text-xs space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Garantía Logística y Facturación Electrónica SRI</span>
        </div>
        <p className="leading-relaxed">
          {shipping.disclaimer}
        </p>
      </div>

      {/* WhatsApp Quote Shipping */}
      <div className="text-center pt-2">
        <a
          href={buildWhatsAppLink("shipping")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 btn-whatsapp font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95"
        >
          <MessageCircle className="w-5 h-5" />
          <span>COTIZAR ENVÍO DESDE PEDERNALES A MI CIUDAD</span>
        </a>
      </div>
    </div>
  );
}
