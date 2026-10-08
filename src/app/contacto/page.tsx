"use client";

import { useState } from "react";
import { MessageCircle, Building2 } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_CONFIG } from "@/data/businessConfig";

export default function ContactPage() {
  const [clientType, setClientType] = useState<"particular" | "taller" | "flota">("particular");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("quote_request", { clientType, city });

    const link = buildWhatsAppLink(clientType === "particular" ? "general_quote" : "b2b", {
      city,
      b2bNotes: `Nombre: ${name || "Cliente"} | Tipo: ${clientType.toUpperCase()} | Requerimiento: ${notes || "Cotización general"}`,
    });

    window.open(link, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-soft text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-bold uppercase tracking-wider">
          Canal de Atención Directa
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
          Contacto y Cotizaciones Especializadas
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Atención personalizada para particulares, talleres mecánicos y flotas comerciales con cobertura desde Pedernales y Quito.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Tipo de Cliente
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["particular", "taller", "flota"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setClientType(type)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all uppercase ${
                      clientType === type
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nombre o Razón Social
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Ing. Juan Pérez / Taller AutoFix"
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Ciudad / Ubicación en Ecuador
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej. Pedernales, Quito, Santo Domingo, etc."
                className="w-full h-11 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                ¿Qué productos o servicios requieres cotizar?
              </label>
              <textarea
                rows={3}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Indica marcas, modelos de autos, o si buscas precios por caja/cuñete..."
                className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 btn-whatsapp font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>ENVIAR COTIZACIÓN A WHATSAPP</span>
            </button>
          </form>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2 text-amber-400">
              <Building2 className="w-5 h-5" />
              <span>Canal Corporativo y Talleres</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ofrecemos condiciones comerciales especiales y despacho programado para:
            </p>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Talleres de mecánica y lubricadoras
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Flotas de transporte pesado e interprovincial
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Cooperativas de taxis y camionetas en Manabí y Pichincha
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft text-xs text-slate-600 space-y-3">
            <strong className="text-slate-800 block text-sm">Puntos de Atención:</strong>
            <p>
              <strong>Pedernales:</strong> {BUSINESS_CONFIG.locations.pedernales.address}
            </p>
            <p>
              <strong>Quito:</strong> {BUSINESS_CONFIG.locations.quito.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
