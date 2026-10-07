"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Truck } from "lucide-react";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export default function LocationsLogisticsSection() {
  const { pedernales, quito } = BUSINESS_CONFIG.locations;

  return (
    <section className="py-16 sm:py-20 border-t border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Presencia Física y Distribución
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Más cerca de ti
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Atención presencial en Manabí y Pichincha con despacho coordinado para todo el territorio nacional.
          </p>
        </div>

        {/* The 3 Core Pillars: Pedernales, Quito, Nacional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pedernales */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                Manabí / Costa
              </span>
              <h3 className="text-xl font-black text-slate-950 mt-4 mb-2">
                Pedernales
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {pedernales.role}
              </p>
              <div className="text-xs text-slate-500 space-y-1 border-t border-slate-200/60 pt-3">
                <p><strong>Ubicación:</strong> {pedernales.address}</p>
                <p><strong>Horarios:</strong> {pedernales.hours}</p>
              </div>
            </div>

            <a
              href={buildWhatsAppLink("branch", { locationChoice: "pedernales" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("branch_view", { branch: "pedernales" })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-brand-primary transition-colors"
            >
              <span>Coordinar en Pedernales</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quito */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100/70 px-2.5 py-1 rounded-md">
                Pichincha / Sierra
              </span>
              <h3 className="text-xl font-black text-slate-950 mt-4 mb-2">
                Quito
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {quito.role}
              </p>
              <div className="text-xs text-slate-500 space-y-1 border-t border-slate-200/60 pt-3">
                <p><strong>Ubicación:</strong> {quito.address}</p>
                <p><strong>Horarios:</strong> {quito.hours}</p>
              </div>
            </div>

            <a
              href={buildWhatsAppLink("branch", { locationChoice: "quito" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("branch_view", { branch: "quito" })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-brand-primary transition-colors"
            >
              <span>Coordinar en Quito</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Nacional */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-200 px-2.5 py-1 rounded-md">
                Ecuador
              </span>
              <h3 className="text-xl font-black text-slate-950 mt-4 mb-2">
                Envíos Nacionales
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                "Seleccionamos la alternativa de despacho más conveniente según disponibilidad, ubicación y cobertura."
              </p>
              <div className="text-xs text-slate-500 space-y-1 border-t border-slate-200/60 pt-3">
                <p><strong>Tiempo estimado:</strong> 24–48 h*</p>
                <p><strong>Transporte:</strong> Cooperativa y Courier</p>
              </div>
            </div>

            <Link
              href="/envios"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-brand-primary transition-colors"
            >
              <span>Ver términos de envío</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
