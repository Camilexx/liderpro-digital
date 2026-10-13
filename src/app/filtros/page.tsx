import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { Wrench, ShieldCheck, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Filtros de Aceite y Combustible | Blindados y Alta Eficiencia | LiderPro Ecuador",
  description:
    "Filtros de aceite blindados con válvula de retención y sellos de alta temperatura. Verificación técnica de compatibilidad para vehículos en Ecuador.",
};

export default function FiltersPage() {
  const filters = PRODUCTS.filter(
    (p) =>
      p.category === "filtros" ||
      p.category === "refrigerantes" ||
      p.category === "aditivos"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="bg-gradient-to-r from-[#061B40] via-slate-900 to-[#0A3B8C] text-white p-6 sm:p-12 rounded-3xl border border-[#0A3B8C]/40 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            Advance Filters • Mannol • ATE • ABRO
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Filtración Blindada y Químicos Operativos
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Filtros de combustible y aceite <strong>Advance Filters</strong> (D-Max 2025 AFE-297, Aveo AO-3387, Wingle AFP-974, Hino AO-1314), refrigerante orgánico <strong>Mannol AF12+</strong> de 5 años, líquido de frenos <strong>ATE DOT 3 y DOT 4</strong>, y limpiadores de inyección y carburador.
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

      {/* Quick Search & Catalog Link Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A3B8C] flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-950">
              ¿Buscando código específico de filtro (AFE-297, AO-3387, AFP-974, AO-1314)?
            </h3>
            <p className="text-xs text-slate-500">
              Contamos con más de 190 filtros Advance Filters y químicos de mantenimiento con búsqueda instantánea.
            </p>
          </div>
        </div>
        <Link
          href="/productos?cat=filtros"
          className="btn-primary btn-shine text-xs font-black uppercase tracking-wider shrink-0 !py-3 !px-5"
        >
          Filtrar Filtros en Catálogo →
        </Link>
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
