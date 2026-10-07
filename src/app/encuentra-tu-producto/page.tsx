import type { Metadata } from "next";
import VehicleFinder from "@/components/VehicleFinder";
import { Search, ShieldAlert, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Buscador de Compatibilidad por Vehículo | LiderPro Ecuador",
  description:
    "Filtra baterías, aceites, filtros y repuestos para tu vehículo por marca, modelo, año y motor. Compatibilidad técnica confirmada con atención por WhatsApp.",
};

export default function FindYourProductPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-soft text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-brand-primary rounded-full text-xs font-bold uppercase tracking-wider">
          <Search className="w-3.5 h-3.5" />
          Herramienta de Compatibilidad Inteligente
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
          Encuentra el Producto Adecuado para tu Vehículo
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Selecciona tu marca, modelo, año y el tipo de repuesto que buscas. Nuestro sistema cruza tolerancias mecánicas verificadas para evitar incompatibilidades.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <VehicleFinder />
      </div>

      {/* Trust Notice regarding zero fabrication */}
      <div className="max-w-3xl mx-auto bg-slate-100 rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-800 block">Compromiso de Honestidad Técnica LiderPro:</strong>
          <p>
            Nunca inventamos datos de compatibilidad ni adivinamos números de parte. Si un modelo no arroja resultado automático, un especialista revisará el manual oficial en nuestra base de datos técnica mediante WhatsApp en tiempo real.
          </p>
        </div>
      </div>
    </div>
  );
}
