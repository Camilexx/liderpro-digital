import type { Metadata } from "next";
import CatalogExplorer from "@/components/CatalogExplorer";
import { OFFICIAL_BRANDS } from "@/data/products";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catálogo Multimarca Autorizado (500+ Productos) | Baterías, Aceites, Filtros | LiderPro",
  description:
    "Catálogo oficial multimarca con más de 500 productos verificados en Bodega Pedernales: Baterías Ecuador, Bosch, Aroil, Mannol, Mobil, Motul, Advance Filters y ATE. Despacho a las 24 provincias.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>🟢 507 productos en inventario físico • Bodega Pedernales</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Catálogo Oficial Multimarca LiderPro
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Distribuidor autorizado multimarca con centro logístico y de despacho mayorista/minorista en <strong>Pedernales, Manabí</strong>. Productos 100% legítimos con garantía de fábrica, facturación electrónica SRI y envíos diarios a las 24 provincias de Ecuador.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <Link
              href="/baterias"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors"
            >
              🔋 Baterías Ecuador & Bosch (48)
            </Link>
            <Link
              href="/lubricantes"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors"
            >
              🛢️ Aroil, Mannol, Mobil & Motul (89)
            </Link>
            <Link
              href="/filtros"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition-colors"
            >
              ⚙️ Advance Filters & Químicos ATE (250+)
            </Link>
            <Link
              href="/encuentra-tu-producto"
              className="px-3.5 py-2 btn-primary btn-shine text-white rounded-lg font-bold text-xs"
            >
              🔍 Buscador por Vehículo
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

      {/* Interactive Catalog Explorer with Instant Filter, Search & Pagination */}
      <CatalogExplorer />
    </div>
  );
}
