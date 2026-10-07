"use client";

import { useState } from "react";
import { Zap, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export default function EmergencyBanner() {
  const [vehicle, setVehicle] = useState("");
  const [city, setCity] = useState("");

  const handleEmergencyClick = () => {
    trackEvent("whatsapp_emergency", { vehicle, city, source: "homepage_emergency_banner" });
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-900 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Problem & Urgency */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500">
            <Zap className="w-4 h-4 fill-red-500" />
            <span>Servicio de Batería Urgente</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            ¿Tu vehículo no enciende?
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed">
            Te ayudamos a encontrar la batería adecuada y coordinamos el despacho inmediato en Pedernales, Quito y cobertura nacional.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
            <span>• Diagnóstico de batería vs alternador</span>
            <span>• Garantía técnica 15 a 18 meses</span>
            <span>• Libre de mantenimiento</span>
          </div>
        </div>

        {/* Right Column: Clean Form */}
        <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Vehículo (Marca, Modelo, Año)
            </label>
            <input
              type="text"
              placeholder="Ej. Chevrolet Sail 2018"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full h-11 px-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Ciudad
            </label>
            <input
              type="text"
              placeholder="Ej. Pedernales, Quito, Manta..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-11 px-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <a
            href={buildWhatsAppLink("emergency", {
              productName: "Batería Automotriz Urgente",
              vehicleMake: vehicle || "Vehículo sin encendido",
              city: city || "Ecuador",
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleEmergencyClick}
            className="w-full h-12 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>NECESITO UNA BATERÍA</span>
          </a>
        </div>
      </div>
    </div>
  );
}
