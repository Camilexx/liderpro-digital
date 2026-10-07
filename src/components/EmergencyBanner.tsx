"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, MessageCircle, AlertCircle, ArrowRight, ShieldAlert, Check } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export default function EmergencyBanner() {
  const [vehicle, setVehicle] = useState("");
  const [city, setCity] = useState("");

  const handleEmergencyClick = () => {
    trackEvent("whatsapp_emergency", { vehicle, city, source: "homepage_emergency_banner" });
  };

  return (
    <div className="bg-gradient-to-r from-red-950 via-brand-dark to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-red-800/40 shadow-2xl relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Problem & Emotional urgency */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-black tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            Canal Prioritario de Asistencia
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            ¿Tu vehículo no enciende?{" "}
            <span className="text-amber-400 block sm:inline">
              Te ayudamos de inmediato.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            No pierdas tiempo adivinando si es la batería o el alternador. Identificamos el código exacto de tu auto y coordinamos la entrega e instalación en Pedernales, Quito o despacho urgente nacional.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Diagnóstico rápido</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Baterías 100% selladas</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantía de 15 a 18 meses</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive urgent friction-free box */}
        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            Ruta Rápida: Auxilio Batería
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Tu Vehículo (Marca, Modelo, Año)
              </label>
              <input
                type="text"
                placeholder="Ej. Chevrolet Sail 2018 / Kia Rio"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                ¿En qué ciudad te encuentras?
              </label>
              <input
                type="text"
                placeholder="Ej. Pedernales, Quito, Manta, etc."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <a
            href={buildWhatsAppLink("emergency", {
              productName: "Batería Automotriz Urgente",
              vehicleMake: vehicle || "Vehículo del cliente",
              city: city || "Ecuador",
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleEmergencyClick}
            className="w-full py-3.5 px-4 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 text-center mt-2"
          >
            <MessageCircle className="w-5 h-5 fill-white text-brand-whatsapp" />
            <span>SOLICITAR ASISTENCIA AHORA</span>
          </a>

          <p className="text-[11px] text-slate-300 text-center">
            Respuesta humana directa con un técnico de LiderPro.
          </p>
        </div>
      </div>
    </div>
  );
}
