"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, CheckCircle2, MessageCircle, RotateCcw } from "lucide-react";
import { VEHICLE_DATABASE } from "@/data/vehicles";
import { PRODUCTS, Product } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface VehicleFinderProps {
  initialCategory?: string;
  isCompact?: boolean;
}

export default function VehicleFinder({ initialCategory = "baterias" }: VehicleFinderProps) {
  const [selectedIntent, setSelectedIntent] = useState<string>("repuesto");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedEngine, setSelectedEngine] = useState<string>("");
  const [selectedNeed, setSelectedNeed] = useState<string>(initialCategory);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const currentMakeData = VEHICLE_DATABASE.find((v) => v.make === selectedMake);
  const availableModels = currentMakeData ? currentMakeData.models : [];

  const currentModelData = availableModels.find((m) => m.model === selectedModel);
  const availableYears = currentModelData ? currentModelData.years : [];
  const availableEngines = currentModelData ? currentModelData.engines : [];

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedYear("");
    setSelectedEngine("");
    setHasSearched(false);
    trackEvent("vehicle_finder_start", { make });
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedYear("");
    setSelectedEngine("");
    setHasSearched(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    trackEvent("vehicle_finder_complete", {
      intent: selectedIntent,
      city: selectedCity,
      make: selectedMake,
      model: selectedModel,
      year: selectedYear,
      engine: selectedEngine,
      need: selectedNeed,
    });
  };

  const handleReset = () => {
    setSelectedIntent("repuesto");
    setSelectedCity("");
    setSelectedMake("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedEngine("");
    setSelectedNeed("baterias");
    setHasSearched(false);
  };

  let matchedProducts: Product[] = [];
  let isExactMatch = false;

  if (hasSearched && selectedMake && selectedModel) {
    if (currentModelData && currentModelData.recommendedCategories) {
      const categoryKey = selectedNeed as keyof typeof currentModelData.recommendedCategories;
      const skus = currentModelData.recommendedCategories[categoryKey];
      if (skus && skus.length > 0) {
        matchedProducts = PRODUCTS.filter((p) => skus.includes(p.sku));
        if (matchedProducts.length > 0) {
          isExactMatch = true;
        }
      }
    }
  }

  // Progressive Step Calculator (1 to 5)
  let currentStep = 1;
  if (selectedMake) currentStep = 2;
  if (selectedMake && selectedModel) currentStep = 3;
  if (selectedMake && selectedModel && selectedYear) currentStep = 4;
  if (selectedMake && selectedModel && selectedYear && selectedEngine) currentStep = 5;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-10 animate-fade-up relative overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

      {/* Editorial Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-[10.5px] font-black uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span>Terminal de Compatibilidad LiderPro</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            Encuentra el producto exacto para tu vehículo
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Ingresa tu vehículo o síntoma. Cotejamos código, polaridad y especificación técnica antes de comprar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Paso {currentStep} de 5
            </span>
            <div className="flex gap-1 ml-1">
              {[1, 2, 3, 4, 5].map((step) => (
                <span
                  key={step}
                  className={`w-2 h-2 rounded-full transition-all ${
                    step <= currentStep ? "bg-brand-primary" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {hasSearched && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar
            </button>
          )}
        </div>
      </div>

      {/* Selectors Grid */}
      <form onSubmit={handleSearch} className="mt-8 space-y-6">
        {/* Step 1: Intention / Goal */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
            Paso 1: ¿Qué quieres resolver?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            {[
              { id: "no_enciende", label: "Mi auto no prende", category: "baterias" },
              { id: "bateria", label: "Necesito batería", category: "baterias" },
              { id: "aceite", label: "Cambio de aceite", category: "lubricantes" },
              { id: "mantenimiento", label: "Filtros / Servicio", category: "filtros" },
              { id: "frenos", label: "Frenos / Pastillas", category: "frenos" },
              { id: "no_se", label: "No sé qué necesito", category: "otro" },
            ].map((intent) => (
              <button
                key={intent.id}
                type="button"
                onClick={() => {
                  setSelectedIntent(intent.id);
                  if (intent.category !== "otro") setSelectedNeed(intent.category);
                }}
                className={`py-2 px-3 rounded-xl border text-center font-bold transition-all ${
                  selectedIntent === intent.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {intent.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2-5: Vehicle Specs + Step 6: City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {/* Marca */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              Marca
            </label>
            <select
              value={selectedMake}
              onChange={(e) => handleMakeChange(e.target.value)}
              className="w-full h-12 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 transition-colors"
              required
            >
              <option value="">Selecciona Marca</option>
              {VEHICLE_DATABASE.map((item) => (
                <option key={item.make} value={item.make}>
                  {item.make}
                </option>
              ))}
            </select>
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              Modelo
            </label>
            <select
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              disabled={!selectedMake}
              className="w-full h-12 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 disabled:opacity-40 disabled:bg-slate-100 focus:bg-white focus:outline-none focus:border-slate-400 transition-colors"
              required
            >
              <option value="">
                {selectedMake ? "Selecciona Modelo" : "Elige marca"}
              </option>
              {availableModels.map((item) => (
                <option key={item.model} value={item.model}>
                  {item.model}
                </option>
              ))}
            </select>
          </div>

          {/* Año */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              Año
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              disabled={!selectedModel}
              className="w-full h-12 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 disabled:opacity-40 disabled:bg-slate-100 focus:bg-white focus:outline-none focus:border-slate-400 transition-colors"
              required
            >
              <option value="">
                {selectedModel ? "Selecciona Año" : "Elige modelo"}
              </option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Motor */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              Motor / Cilindraje
            </label>
            <select
              value={selectedEngine}
              onChange={(e) => setSelectedEngine(e.target.value)}
              disabled={!selectedModel}
              className="w-full h-12 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 disabled:opacity-40 disabled:bg-slate-100 focus:bg-white focus:outline-none focus:border-slate-400 transition-colors"
            >
              <option value="">Cualquier motor</option>
              {availableEngines.map((eng) => (
                <option key={eng} value={eng}>
                  {eng}
                </option>
              ))}
            </select>
          </div>

          {/* Necesidad */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              Línea Requerida
            </label>
            <select
              value={selectedNeed}
              onChange={(e) => setSelectedNeed(e.target.value)}
              className="w-full h-12 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 transition-colors"
            >
              <option value="baterias">Batería</option>
              <option value="lubricantes">Lubricante</option>
              <option value="filtros">Filtro</option>
              <option value="refrigerantes">Refrigerante</option>
              <option value="frenos">Pastillas de Freno</option>
              <option value="bujias">Bujías</option>
              <option value="aditivos">Aditivos</option>
              <option value="otro">Otro repuesto</option>
            </select>
          </div>

          {/* Ciudad */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              Ciudad (Entrega)
            </label>
            <input
              type="text"
              placeholder="Ej. Pedernales, Quito..."
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full h-12 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>
        </div>

        {/* Action Button & Subtext */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span>¿No estás seguro de los datos de tu auto?</span>
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 font-bold underline hover:text-brand-primary"
            >
              Habla con un asesor
            </a>
          </div>

          <button
            type="submit"
            className="btn-primary w-full sm:w-auto !py-3.5 !px-8 text-xs font-black tracking-wider flex items-center justify-center gap-2 group"
          >
            <Search className="w-4 h-4" />
            <span>VER PRODUCTOS COMPATIBLES</span>
            <span className="text-white/80 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </form>

      {/* Results presentation */}
      {hasSearched && (
        <div className="mt-8 pt-8 border-t border-slate-100">
          {isExactMatch ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2.5 rounded-xl border border-emerald-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Compatibilidad verificada para {selectedMake} {selectedModel} ({selectedYear})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col sm:flex-row items-center gap-4 justify-between"
                  >
                    <div className="w-20 h-20 relative shrink-0 bg-white rounded-lg border border-slate-200 p-2">
                      <Image
                        src={prod.imageUrl}
                        alt={prod.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="flex-grow space-y-1 text-center sm:text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {prod.brand} • {prod.sku}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {prod.shortSpec}
                      </p>
                      {prod.priceEstimate && (
                        <div className="text-sm font-bold text-slate-950 pt-1">
                          {prod.priceEstimate}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                      <a
                        href={buildWhatsAppLink("product", {
                          productName: prod.name,
                          sku: prod.sku,
                          vehicleMake: selectedMake,
                          vehicleModel: selectedModel,
                          vehicleYear: selectedYear,
                          city: selectedCity,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 btn-whatsapp text-white text-xs font-bold rounded-lg text-center flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Consultar</span>
                      </a>
                      <Link
                        href={`/productos/${prod.slug}`}
                        className="px-3 py-1.5 text-slate-600 hover:text-slate-950 text-xs font-semibold text-center"
                      >
                        Ver ficha
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-black text-slate-900">
                  Necesitamos una validación adicional para {selectedMake} {selectedModel} ({selectedYear || "tu vehículo"})
                </h4>
                <p className="text-xs text-slate-600">
                  No adivinamos compatibilidad. Un especialista técnico verificará el catálogo de fábrica por WhatsApp en menos de 2 minutos.
                </p>
              </div>

              <a
                href={
                  selectedIntent === "no_se"
                    ? buildWhatsAppLink("unknown_need", {
                        vehicleMake: selectedMake,
                        vehicleModel: selectedModel,
                        vehicleYear: selectedYear,
                        city: selectedCity,
                        issueDescription: "No sé qué repuesto necesito, requiero ayuda para identificarlo",
                      })
                    : buildWhatsAppLink("vehicle", {
                        vehicleMake: selectedMake,
                        vehicleModel: selectedModel,
                        vehicleYear: selectedYear,
                        vehicleEngine: selectedEngine,
                        neededItem: selectedNeed,
                        city: selectedCity,
                      })
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 btn-whatsapp text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shrink-0 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONFIRMAR CON UN ASESOR</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
