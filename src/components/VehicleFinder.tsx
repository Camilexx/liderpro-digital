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
      make: selectedMake,
      model: selectedModel,
      year: selectedYear,
      engine: selectedEngine,
      need: selectedNeed,
    });
  };

  const handleReset = () => {
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
      {/* Editorial Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-slate-100 gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            Encuentra lo que tu vehículo necesita
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            No necesitas saber de mecánica. Nosotros te ayudamos a encontrar el producto exacto.
          </p>
        </div>

        {hasSearched && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar selector
          </button>
        )}
      </div>

      {/* Selectors Grid */}
      <form onSubmit={handleSearch} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
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
                {selectedMake ? "Selecciona Modelo" : "Elige marca primero"}
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
              ¿Qué necesitas?
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
              <option value="otro">Otro repuesto</option>
            </select>
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
            className="w-full sm:w-auto px-8 h-12 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>VER PRODUCTOS COMPATIBLES</span>
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
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Consultar</span>
                      </a>
                      <Link
                        href={`/productos/${prod.slug}`}
                        className="px-3 py-1.5 text-slate-600 hover:text-slate-950 text-xs font-semibold text-center"
                      >
                        Ficha técnica
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-slate-900">
                  No encontramos una coincidencia automática para {selectedMake} {selectedModel} ({selectedYear})
                </h4>
                <p className="text-xs text-slate-500">
                  No inventamos compatibilidades. Envíanos el número de parte o foto por WhatsApp y un asesor técnico confirmará la pieza exacta.
                </p>
              </div>

              <a
                href={buildWhatsAppLink("vehicle", {
                  vehicleMake: selectedMake,
                  vehicleModel: selectedModel,
                  vehicleYear: selectedYear,
                  vehicleEngine: selectedEngine,
                  neededItem: selectedNeed,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shrink-0 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONFIRMAR POR WHATSAPP</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
