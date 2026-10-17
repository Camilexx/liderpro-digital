"use client";

import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, MapPin, PackageCheck } from "lucide-react";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export default function LocationsLogisticsSection() {
  const { pedernales } = BUSINESS_CONFIG.locations;

  return (
    <section className="py-10 sm:py-14 border-t border-slate-200/80 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-800 uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>🟢 Stock disponible en Pedernales para despacho nacional</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Hub Logístico Estratégico: Desde Pedernales a Todo el Ecuador
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Operamos nuestro centro matriz mayorista y minorista en <strong>Pedernales, Manabí</strong>, conectando diariamente con las 24 provincias mediante rutas directas de encomienda y courier.
            </p>
          </div>

          <Link
            href="/envios"
            className="btn-secondary !py-2.5 !px-4 text-xs font-bold shrink-0 self-start md:self-auto"
          >
            <span>Ver Circuito de Envíos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* The 3 Core Logistics Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Sede Central Pedernales */}
          <div className="card-interactive p-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Sede Central Matriz
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Manabí</span>
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-2">
                Hub Pedernales
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {pedernales.role}
              </p>
              <div className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                <p><strong>Operación:</strong> Venta de mostrador, despacho a camaroneras y bodega mayorista.</p>
                <p><strong>Horario:</strong> {pedernales.hours}</p>
                <p><strong>Facturación:</strong> Facturación electrónica autorizada por el SRI.</p>
              </div>
            </div>

            <a
              href={buildWhatsAppLink("branch", { locationChoice: "pedernales" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("branch_view", { branch: "pedernales" })}
              className="btn-whatsapp !w-full !py-2.5 !text-xs font-bold flex items-center justify-between group"
            >
              <span>Atención Directa Sede Pedernales</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* Card 2: Circuito Diario de Encomiendas y Couriers */}
          <div className="card-interactive p-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  Flujo Interprovincial
                </span>
                <span className="text-[10px] text-slate-400 font-mono">24 Provincias</span>
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-2">
                Entrega al Día Siguiente
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Despacho diario por transporte interprovincial y courier a nivel nacional. La empresa logística se define según tu cantón y destino directamente por WhatsApp.
              </p>
              <div className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                <p><strong>Rutas Express 24h:</strong> Quito, Guayaquil, Santo Domingo, Manta, Portoviejo y Esmeraldas.</p>
                <p><strong>Seguimiento:</strong> Envío de fotografía de guía y paquete sellado por WhatsApp.</p>
              </div>
            </div>

            <a
              href={buildWhatsAppLink("shipping", { city: "Quito / Guayaquil / Santo Domingo / Manta" })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !w-full !py-2.5 !text-xs font-bold flex items-center justify-between group"
            >
              <span>Cotizar Envío a Mi Ciudad</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* Card 3: Protocolo de Seguridad de Embalaje */}
          <div className="card-interactive p-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <PackageCheck className="w-3.5 h-3.5" />
                  Seguridad de Carga
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Embalaje Seguro</span>
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-2">
                Protocolo Antiderrame y Anclaje
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Cada pedido es preparado bajo estándares técnicos de transporte automotriz para llegar intacto a tu taller o domicilio:
              </p>
              <div className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                <p className="flex items-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Líquidos y Canecas:</strong> Embalaje reforzado antiderrame con sellado térmico.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Baterías Selladas:</strong> Anclaje técnico vertical y protección de bornes.</span>
                </p>
              </div>
            </div>

            <Link
              href="/envios"
              className="btn-secondary !w-full !py-2.5 !text-xs font-bold flex items-center justify-between group"
            >
              <span>Ver Protocolo Completo</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* Transit Times by Zone */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 font-black text-slate-950">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Costa Norte & Manabí</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">Pedernales, Cojimíes, Jama, San Vicente, Chone, Manta, Portoviejo.</p>
              <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 mt-1">
                Despacho Mismo Día / 24h
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 font-black text-slate-950">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <span>Eje Troncal Nacional</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">Quito, Santo Domingo, Guayaquil, Quevedo, Esmeraldas.</p>
              <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 mt-1">
                Entrega Express 24h
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 font-black text-slate-950">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span>Sierra Centro & Austro</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">Ambato, Latacunga, Riobamba, Cuenca, Loja, Ibarra.</p>
              <span className="inline-block text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 mt-1">
                Tránsito 24h a 48h
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 font-black text-slate-950">
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <span>Sector Productivo & Flotas</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">Despacho en ruta de canecas 5GL, tambores 55GL y Baterías 31.</p>
              <span className="inline-block text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60 mt-1">
                Rutas Programadas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
