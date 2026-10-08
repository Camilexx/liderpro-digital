"use client";

import { useState } from "react";
import { Zap, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

const EMERGENCY_SYMPTOMS = [
  { id: "clic_no_enciende", label: "Hace 'clic' y no enciende", note: "Batería sin amperaje CCA" },
  { id: "sin_respuesta", label: "No hace nada / muerto", note: "Batería descargada o borne suelto" },
  { id: "luces_debiles", label: "Tablero parpadea / luces tenues", note: "Voltaje crítico" },
  { id: "apagado_marcha", label: "Se apagó mientras manejaba", note: "Revisar alternador" },
  { id: "no_seguro", label: "No sé cuál es el problema", note: "Asesoría de diagnóstico" },
];

export default function EmergencyBanner() {
  const [vehicle, setVehicle] = useState("");
  const [city, setCity] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState(EMERGENCY_SYMPTOMS[0].label);

  const handleEmergencyClick = () => {
    trackEvent("whatsapp_emergency", { vehicle, city, symptom: selectedSymptom, source: "homepage_emergency_banner" });
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white rounded-3xl p-6 sm:p-10 border border-red-900/30 shadow-2xl shadow-red-950/20 relative overflow-hidden">
      {/* Top Accent Neon Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Problem & Guidance */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/80 border border-red-500/40 text-red-400 rounded-full text-[11px] font-black uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <Zap className="w-3.5 h-3.5 fill-red-500" />
            <span>Centro de Emergencia Automotriz</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            ¿Tu vehículo no enciende?
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed">
            Diagnóstico de batería vs. alternador, verificación de polaridad y amperaje exacto para tu auto. Coordinación de despacho y atención a todo Ecuador.
          </p>

          <div className="pt-2 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Garantía técnica de fábrica según marca y modelo (sujeta a términos del fabricante).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Prueba de carga y diagnóstico de alternador antes del cambio.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Diagnostic Selector */}
        <div className="lg:col-span-6 bg-slate-900/90 p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              ¿Qué síntoma presenta tu auto?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EMERGENCY_SYMPTOMS.map((sym) => {
                const isSelected = selectedSymptom === sym.label;
                return (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => setSelectedSymptom(sym.label)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? "bg-red-950/80 border-red-500 text-white font-bold shadow-md shadow-red-950"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div>{sym.label}</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">{sym.note}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Vehículo (Marca, Modelo, Año)
              </label>
              <input
                type="text"
                placeholder="Ej. Chevrolet Sail 2018"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full h-11 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Ciudad o Sector
              </label>
              <input
                type="text"
                placeholder="Ej. Pedernales, Quito..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-11 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <a
            href={buildWhatsAppLink("emergency", {
              productName: "Batería Automotriz Asistencia Urgente",
              vehicleMake: vehicle || "Vehículo sin encendido",
              city: city || "Ecuador",
              symptom: selectedSymptom,
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleEmergencyClick}
            className="btn-primary !w-full !h-13 !text-xs !font-black !tracking-wider flex items-center justify-center gap-2.5 mt-2 animate-pulse-glow-red"
          >
            <MessageCircle className="w-4 h-4" />
            <span>CONSULTAR ASISTENCIA DE BATERÍA POR WHATSAPP</span>
          </a>
        </div>
      </div>
    </div>
  );
}

