import type { Metadata } from "next";
import LocationsLogisticsSection from "@/components/LocationsLogisticsSection";
import { MapPin, ShieldCheck } from "lucide-react";
import { BUSINESS_CONFIG } from "@/data/businessConfig";

export const metadata: Metadata = {
  title: "Puntos de Atención en Pedernales y Quito | LiderPro Ecuador",
  description:
    "Presencia física en Pedernales (Manabí) y Quito (Pichincha). Atención directa, retiro de repuestos y logística de despacho nacional.",
};

export default function BranchesPage() {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-soft text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          Presencia Física y Puntos de Retiro
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
          Nuestros Puntos de Atención: Pedernales & Quito
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Para brindarte seguridad total y agilidad de entrega, combinamos nuestra base estratégica en Pedernales (Manabí) con la cobertura de la red en Quito (Pichincha).
        </p>
      </div>

      <LocationsLogisticsSection />

      {/* Corporate Position Clarification */}
      <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Declaración de Identidad y Transparencia Operativa</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {BUSINESS_CONFIG.legalNotice}
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          No nos presentamos como sede corporativa central ni casa matriz nacional; somos una operación ágil, técnica y orientada al cliente con stock real, respuesta humana ágil y personalizada por WhatsApp y despacho confiable a todo el Ecuador.
        </p>
      </div>
    </div>
  );
}
