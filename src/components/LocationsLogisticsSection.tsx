"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export default function LocationsLogisticsSection() {
  const { pedernales, quito } = BUSINESS_CONFIG.locations;

  return (
    <section className="py-10 sm:py-14 border-t border-slate-200/80 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-2xl mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 uppercase tracking-wider shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Red de Atención y Despacho Físico</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Presencia Estratégica en Ecuador
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Atención presencial en Manabí y Pichincha con despacho coordinado para todo el territorio nacional.
          </p>
        </div>

        {/* The 3 Core Pillars: Pedernales, Quito, Nacional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pedernales */}
          <div className="card-interactive p-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  Manabí / Costa
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Sede Costa</span>
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-2">
                Pedernales
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {pedernales.role}
              </p>
              <div className="text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
                <p><strong>Ubicación:</strong> {pedernales.address}</p>
                <p><strong>Horarios:</strong> {pedernales.hours}</p>
              </div>
            </div>

            <a
              href={buildWhatsAppLink("branch", { locationChoice: "pedernales" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("branch_view", { branch: "pedernales" })}
              className="btn-secondary !w-full !py-2.5 !text-xs font-bold flex items-center justify-between group"
            >
              <span>Coordinar en Pedernales</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* Quito */}
          <div className="card-interactive p-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                  Pichincha / Sierra
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Sede Sierra</span>
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-2">
                Quito
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {quito.role}
              </p>
              <div className="text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
                <p><strong>Ubicación:</strong> {quito.address}</p>
                <p><strong>Horarios:</strong> {quito.hours}</p>
              </div>
            </div>

            <a
              href={buildWhatsAppLink("branch", { locationChoice: "quito" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("branch_view", { branch: "quito" })}
              className="btn-secondary !w-full !py-2.5 !text-xs font-bold flex items-center justify-between group"
            >
              <span>Coordinar en Quito</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* Nacional */}
          <div className="card-interactive p-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                  Cobertura Nacional
                </span>
                <span className="text-[10px] text-slate-400 font-mono">24 Provincias</span>
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-2">
                Envíos a Todo Ecuador
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Coordinación logística inteligente desde el punto más cercano para reducir tiempos de flete y entrega.
              </p>
              <div className="text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
                <p><strong>Tiempo estimado:</strong> Sujeto a destino y transportadora*</p>
                <p><strong>Operador:</strong> Cooperativa interprovincial y Encomienda</p>
              </div>
            </div>

            <Link
              href="/envios"
              className="btn-secondary !w-full !py-2.5 !text-xs font-bold flex items-center justify-between group"
            >
              <span>Ver Políticas de Envío</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
