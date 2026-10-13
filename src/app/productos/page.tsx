import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, OFFICIAL_BRANDS } from "@/data/products";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catálogo Multimarca Autorizado | Baterías Ecuador, Bosch, Mannol, Motul | LiderPro",
  description:
    "Catálogo oficial multimarca: Baterías Ecuador, Bosch, Mannol, Motul, Mobil, Havoline, Castrol y Fram. Despacho inmediato desde Sede Pedernales a todo el Ecuador.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>🟢 Stock disponible en Pedernales para despacho nacional</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Catálogo Oficial Multimarca LiderPro
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Distribuidor autorizado con centro de operaciones mayorista y minorista en <strong>Pedernales, Manabí</strong>. Productos 100% originales con garantía de fábrica, facturación SRI y envíos diarios a las 24 provincias.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <Link
              href="/baterias"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors"
            >
              🔋 Baterías Ecuador & Bosch
            </Link>
            <Link
              href="/lubricantes"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors"
            >
              🛢️ Aroil, Mannol, Mobil & Motul
            </Link>
            <Link
              href="/filtros"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors"
            >
              ⚙️ Advance Filters & Químicos ATE/ABRO
            </Link>
            <Link
              href="/encuentra-tu-producto"
              className="px-3.5 py-2 btn-primary btn-shine text-white rounded-lg font-bold text-xs"
            >
              🔍 Filtrar por mi vehículo
            </Link>
          </div>
        </div>

        {/* Official Brands Strip */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
          {OFFICIAL_BRANDS.map((b) => (
            <span
              key={b.name}
              className="border border-slate-200/80 bg-slate-50 shadow-2xs rounded-lg py-1.5 px-3 text-[11px] font-black text-slate-800"
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>

      {/* Grid of Verified Products */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Mostrando {PRODUCTS.length} líneas multimarca en stock
          </span>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
            Despacho inmediato desde Sede Pedernales
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
