import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catálogo de Productos Automotrices | LiderPro Ecuador",
  description:
    "Catálogo técnico de baterías automotrices, aceites 100% sintéticos, filtros y refrigerantes con asesoría y envíos a todo el Ecuador.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-soft">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-brand-primary rounded-full text-xs font-bold uppercase tracking-wider">
            Catálogo Verificado
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Productos y Repuestos Automotrices
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Explora nuestro catálogo con especificaciones técnicas reales para vehículos en Ecuador. Si tienes dudas sobre compatibilidad, consulta con nuestros técnicos por WhatsApp antes de comprar.
          </p>

          <div className="pt-4 flex flex-wrap gap-2 text-xs">
            <Link
              href="/baterias"
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors"
            >
              Baterías (15-18 Meses)
            </Link>
            <Link
              href="/lubricantes"
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors"
            >
              Aceites y Lubricantes
            </Link>
            <Link
              href="/filtros"
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors"
            >
              Filtros Blindados
            </Link>
            <Link
              href="/encuentra-tu-producto"
              className="px-3.5 py-1.5 bg-brand-primary text-white rounded-lg font-bold hover:bg-brand-primaryHover transition-colors"
            >
              🔍 Filtrar por mi vehículo
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of Verified Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Mostrando {PRODUCTS.length} productos verificados
          </span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Stock en Pedernales y Quito
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
