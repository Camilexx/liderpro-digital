"use client";

import Link from "next/link";
import { MapPin, Navigation, Clock, Phone, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export default function LocationsLogisticsSection() {
  const { pedernales, quito } = BUSINESS_CONFIG.locations;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Infraestructura Estratégica Real
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Estamos más cerca de lo que imaginas.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            LiderPro cuenta con puntos estratégicos de atención en <strong>Pedernales (Manabí)</strong> y <strong>Quito (Pichincha)</strong>, permitiendo atender clientes de la Costa y Sierra y facilitar la distribución a nivel nacional.
          </p>
        </div>

        {/* The Two Operating Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hub 1: Pedernales (Manabí) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card hover:border-slate-300 transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Base Costa / Manabí
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  HUB PEDERNALES
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-brand-dark mb-2">
                Pedernales, Manabí
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                {pedernales.role}
              </p>

              <div className="space-y-3 text-xs border-t border-slate-100 pt-4 mb-6">
                <div className="flex items-start gap-2.5 text-slate-700">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Ubicación:</strong> {pedernales.address}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-700">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Horarios:</strong> {pedernales.hours}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Servicios en este punto:
                </p>
                {pedernales.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={buildWhatsAppLink("branch", { locationChoice: "pedernales" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("branch_view", { branch: "pedernales" })}
                className="w-full py-3 px-4 bg-brand-dark hover:bg-slate-800 text-white font-bold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-2"
              >
                <span>Coordinar en Pedernales</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hub 2: Quito (Pichincha) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card hover:border-slate-300 transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-100/80 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Red Sierra / Pichincha
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  HUB QUITO
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-brand-dark mb-2">
                Quito, Pichincha
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                {quito.role}
              </p>

              <div className="space-y-3 text-xs border-t border-slate-100 pt-4 mb-6">
                <div className="flex items-start gap-2.5 text-slate-700">
                  <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span><strong>Ubicación:</strong> {quito.address}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-700">
                  <Clock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span><strong>Horarios:</strong> {quito.hours}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Servicios en este punto:
                </p>
                {quito.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={buildWhatsAppLink("branch", { locationChoice: "quito" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("branch_view", { branch: "quito" })}
                className="w-full py-3 px-4 bg-brand-dark hover:bg-slate-800 text-white font-bold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-2"
              >
                <span>Coordinar en Quito</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Multi-origin fulfillment logic card */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                Lógica de Despacho Inteligente
              </div>
              <h4 className="text-lg sm:text-xl font-bold">
                "Seleccionamos la alternativa de despacho más conveniente según disponibilidad, ubicación y cobertura."
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluamos si tu pedido se despacha con mayor agilidad desde nuestro centro de Pedernales (para la Costa y Manabí) o desde Quito (para la Sierra e interprovincial), optimizando tiempos de tránsito.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/envios"
                className="py-3 px-5 text-center bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Conocer Cobertura y Tiempos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
