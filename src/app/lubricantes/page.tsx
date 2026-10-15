import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
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
      <div className="bg-gradient-to-r from-[#061B40] via-slate-900 to-[#0A3B8C] text-white p-6 sm:p-12 rounded-3xl border border-[#0A3B8C]/40 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Aroil • Mannol • Mobil • Motul
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Aceites y Lubricantes Multimarca
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Las fórmulas de mayor rotación y salida en el mercado: <strong>AROIL Super 40</strong> (Top #1 en ventas), <strong>Mannol Special Plus 10W-30</strong>, <strong>AROIL 15W-40 CI-4</strong>, <strong>AROIL 25W-60 en Caneca de 5 Galones</strong>, <strong>Mobil Delvac 1300 Super</strong> en Caneca, y <strong>Motul 4T / Mannol Motorbike</strong> para motocicletas.
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

      {/* Quick Search & Catalog Link Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A3B8C] flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-950">
              ¿Buscando la viscosidad exacta (5W-30, 10W-30, 15W-40, 20W-50)?
            </h3>
            <p className="text-xs text-slate-500">
              Explora los 94 lubricantes disponibles o filtra por marca y tipo de motor en nuestro catálogo oficial.
            </p>
          </div>
        </div>
        <Link
          href="/productos?cat=lubricantes"
          className="btn-primary btn-shine text-xs font-black uppercase tracking-wider shrink-0 !py-3 !px-5"
        >
          Filtrar Lubricantes en Catálogo →
        </Link>
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
