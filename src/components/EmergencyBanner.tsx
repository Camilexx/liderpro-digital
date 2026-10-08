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
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-900 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Problem & Guidance */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500">
            <Zap className="w-4 h-4 fill-red-500" />
            <span>Diagnóstico y Asistencia de Batería</span>
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
                        ? "bg-red-950/60 border-red-500 text-white font-bold"
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
                className="w-full h-10 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
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
                className="w-full h-10 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
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
            className="w-full h-12 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>CONSULTAR ASISTENCIA DE BATERÍA POR WHATSAPP</span>
          </a>
        </div>
      </div>
    </div>
  );
}

