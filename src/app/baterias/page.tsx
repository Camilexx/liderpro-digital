import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import VehicleFinder from "@/components/VehicleFinder";
import EmergencyBanner from "@/components/EmergencyBanner";
import { PRODUCTS } from "@/data/products";
import { Zap, ShieldCheck, Clock, CheckCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Baterías Automotrices Selladas en Ecuador | Pedernales y Quito | LiderPro",
  description:
    "Baterías selladas libres de mantenimiento con 15 a 18 meses de garantía. Servicio de entrega e instalación en Pedernales y Quito, y envíos a todo el Ecuador.",
};

export default function BatteriesPage() {
  const batteries = PRODUCTS.filter((p) => p.category === "baterias");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-brand-dark via-slate-900 to-red-950 text-white p-6 sm:p-12 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Línea de Alta Potencia y Arranque en Frío
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Baterías Automotrices Selladas
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Formulaciones plomo-calcio-plata resistentes a la vibración y a ciclos climáticos extremos tanto a nivel del mar (Manabí) como en altura (Pichincha).
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-200">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de 15 a 18 meses</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Libre de mantenimiento</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Prueba de carga y diagnóstico</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency fast CTA strip */}
      <EmergencyBanner />

      {/* Progressive Vehicle Finder focused on batteries */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-black text-brand-dark">
            Encuentra la batería exacta para tu modelo
          </h2>
        </div>
        <VehicleFinder initialCategory="baterias" />
      </div>

      {/* Products list */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-brand-dark">
            Modelos de Batería Disponibles
          </h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Despacho Pedernales / Quito
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {batteries.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
