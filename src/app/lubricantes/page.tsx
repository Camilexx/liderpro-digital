import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import VehicleFinder from "@/components/VehicleFinder";
import { PRODUCTS } from "@/data/products";
import { Layers, ShieldCheck, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Aceites y Lubricantes para Motor | Sintéticos 5W-30 y Diésel 15W-40 | LiderPro Ecuador",
  description:
    "Lubricantes 100% sintéticos API SP y aceites diésel heavy duty. Protección térmica avanzada para el clima ecuatoriano con envíos a nivel nacional.",
};

export default function LubricantsPage() {
  const lubricants = PRODUCTS.filter((p) => p.category === "lubricantes");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Category Hero */}
      <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-amber-950 text-white p-6 sm:p-12 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Máxima Protección Térmica y Reducción de Fricción
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Aceites y Lubricantes de Motor
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Formulaciones 100% sintéticas con especificación API SP / ILSAC GF-6A para motores a gasolina modernos y 15W-40 Heavy Duty para camionetas y trabajo pesado diésel en Ecuador.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-200">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de originalidad certificada</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Protección LSPI en motores turbo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Finder focused on lubricants */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-black text-brand-dark">
            Verifica la viscosidad recomendada por el fabricante
          </h2>
        </div>
        <VehicleFinder initialCategory="lubricantes" />
      </div>

      {/* Products list */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-brand-dark">
            Lubricantes Disponibles
          </h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Envíos a Nivel Nacional
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lubricants.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
