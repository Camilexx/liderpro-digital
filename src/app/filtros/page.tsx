import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import VehicleFinder from "@/components/VehicleFinder";
import { PRODUCTS } from "@/data/products";
import { Wrench, ShieldCheck, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Filtros de Aceite y Combustible | Blindados y Alta Eficiencia | LiderPro Ecuador",
  description:
    "Filtros de aceite blindados con válvula de retención y sellos de alta temperatura. Compatibilidad garantizada para vehículos en Ecuador.",
};

export default function FiltersPage() {
  const filters = PRODUCTS.filter((p) => p.category === "filtros");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-blue-950 text-white p-6 sm:p-12 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-400/20 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            Retención Microscópica y Flujo Continuo
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Filtros Automotrices Blindados
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Filtros de aceite y combustible diseñados con medios sintéticos resinados de alta capacidad para retener lodos, carbón y micropartículas abrasivas.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-200">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Válvula anti-retorno de silicona</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Empaques resistentes a alta temperatura</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h2 className="text-xl font-black text-brand-dark">
            Busca el filtro exacto por modelo de auto
          </h2>
        </div>
        <VehicleFinder initialCategory="filtros" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-brand-dark">
            Filtros Disponibles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filters.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
