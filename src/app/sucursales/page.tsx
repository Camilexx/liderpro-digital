import type { Metadata } from "next";
import LocationsLogisticsSection from "@/components/LocationsLogisticsSection";
import { MapPin, ShieldCheck } from "lucide-react";
import { BUSINESS_CONFIG } from "@/data/businessConfig";

export const metadata: Metadata = {
  title: "Sede Única en Pedernales y Envíos a Todo el Ecuador (<48h) | LiderPro",
  description:
    "Atención presencial en nuestra sede única en Pedernales (Manabí) con instalación gratuita de baterías a domicilio en Pedernales y envíos a todo el Ecuador en menos de 48h.",
  keywords: [
    "liderpro pedernales direccion",
    "repuestos automotrices pedernales manabi",
    "baterias y lubricantes pedernales envios ecuador",
  ],
  alternates: {
    canonical: "/sucursales",
  },
  openGraph: {
    title: "Sede Única Pedernales y Envíos Nacionales <48h — LiderPro Ecuador",
    description:
      "Bodega Matriz y Centro de Despacho en Pedernales (Manabí) con envíos a todo el Ecuador en menos de 48h.",
    url: "https://www.liderpropedernales.com/sucursales",
    type: "website",
  },
};

export default function BranchesPage() {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-soft text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          Sede Única Pedernales & Cobertura Nacional
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
          LíderPro Pedernales: Atención Local y Envíos a Todo el Ecuador (&lt;48h)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Operamos desde nuestra sede única en Pedernales (Manabí) con instalación gratuita de baterías a domicilio en el cantón y envíos diarios a todo el Ecuador en menos de 48 horas.
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
