"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, CheckCircle2, AlertTriangle, ArrowRight, MessageCircle, RotateCcw } from "lucide-react";
import { VEHICLE_DATABASE } from "@/data/vehicles";
import { PRODUCTS, Product } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface VehicleFinderProps {
  initialCategory?: string;
  isCompact?: boolean;
}

export default function VehicleFinder({ initialCategory = "baterias", isCompact = false }: VehicleFinderProps) {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedEngine, setSelectedEngine] = useState<string>("");
  const [selectedNeed, setSelectedNeed] = useState<string>(initialCategory);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Available models based on selected make
  const currentMakeData = VEHICLE_DATABASE.find((v) => v.make === selectedMake);
  const availableModels = currentMakeData ? currentMakeData.models : [];

  // Available years based on model
  const currentModelData = availableModels.find((m) => m.model === selectedModel);
  const availableYears = currentModelData ? currentModelData.years : [];

  // Available engines based on model
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

  // Find exact products matching compatibility
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
    <div className={`bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden ${isCompact ? "p-4" : "p-6 sm:p-8"}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-brand-primary rounded-full text-xs font-bold tracking-wide uppercase mb-2">
            <Search className="w-3.5 h-3.5" />
            Buscador Técnico de Compatibilidad
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight">
            ¿Qué repuesto necesita tu vehículo?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Filtra por marca, modelo, año y motor para encontrar el producto exacto con respaldo técnico.
          </p>
        </div>

        {hasSearched && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors self-start md:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Nueva búsqueda
          </button>
        )}
      </div>

      <form onSubmit={handleSearch} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Step 1: Marca */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              1. Marca
            </label>
            <select
              value={selectedMake}
              onChange={(e) => handleMakeChange(e.target.value)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
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

          {/* Step 2: Modelo */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              2. Modelo
            </label>
            <select
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              disabled={!selectedMake}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 disabled:opacity-50 disabled:bg-slate-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
              required
            >
              <option value="">
                {selectedMake ? "Selecciona Modelo" : "Primero elige marca"}
              </option>
              {availableModels.map((item) => (
                <option key={item.model} value={item.model}>
                  {item.model}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Año */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              3. Año
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              disabled={!selectedModel}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 disabled:opacity-50 disabled:bg-slate-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
              required
            >
              <option value="">
                {selectedModel ? "Selecciona Año" : "Primero elige modelo"}
              </option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Step 4: Motor */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              4. Motor
            </label>
            <select
              value={selectedEngine}
              onChange={(e) => setSelectedEngine(e.target.value)}
              disabled={!selectedModel}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 disabled:opacity-50 disabled:bg-slate-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
            >
              <option value="">Todos / Cilindraje</option>
              {availableEngines.map((eng) => (
                <option key={eng} value={eng}>
                  {eng}
                </option>
              ))}
            </select>
          </div>

          {/* Step 5: ¿Qué necesitas? */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              5. ¿Qué necesitas?
            </label>
            <select
              value={selectedNeed}
              onChange={(e) => setSelectedNeed(e.target.value)}
              className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
            >
              <option value="baterias">Batería Automotriz</option>
              <option value="lubricantes">Aceite / Lubricante</option>
              <option value="filtros">Filtros (Aceite/Aire)</option>
              <option value="refrigerantes">Refrigerante / Coolant</option>
              <option value="frenos">Pastillas de Freno</option>
              <option value="otro">Otro repuesto / Asesoría</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            *Base de datos con especificaciones técnicas reales para el parque automotor ecuatoriano.
          </p>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 h-12 bg-brand-primary hover:bg-brand-primaryHover text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Consultar Compatibilidad</span>
          </button>
        </div>
      </form>

      {/* Results Box */}
      {hasSearched && (
        <div className="mt-8 pt-8 border-t border-slate-200">
          {isExactMatch ? (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Compatibilidad Técnica Confirmada para {selectedMake} {selectedModel} ({selectedYear})
                  </h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Se han identificado los siguientes productos verificados en nuestro catálogo para tu configuración.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-5 border border-slate-200 rounded-xl bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-navy text-white">
                          {prod.brand}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-600">
                          SKU: {prod.sku}
                        </span>
                      </div>
                      <h4 className="font-black text-base text-brand-dark mb-1">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-slate-600 mb-3 font-medium">
                        {prod.shortSpec}
                      </p>
                      <div className="text-xs text-slate-500 mb-2">
                        <strong>Garantía:</strong> {prod.warranty}
                      </div>
                      {prod.priceEstimate && (
                        <div className="text-base font-black text-brand-primary">
                          {prod.priceEstimate}{" "}
                          <span className="text-[10px] font-normal text-slate-500">
                            (Referencial)
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2">
                      <Link
                        href={`/productos/${prod.slug}`}
                        className="w-full sm:w-1/2 py-2.5 px-3 text-center border border-slate-300 hover:border-slate-400 bg-white text-xs font-bold text-slate-700 rounded-lg transition-colors"
                      >
                        Ver Ficha Técnica
                      </Link>
                      <a
                        href={buildWhatsAppLink("product", {
                          productName: prod.name,
                          sku: prod.sku,
                          vehicleMake: selectedMake,
                          vehicleModel: selectedModel,
                          vehicleYear: selectedYear,
                          vehicleEngine: selectedEngine,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent("whatsapp_product", {
                            product: prod.name,
                            sku: prod.sku,
                          })
                        }
                        className="w-full sm:w-1/2 py-2.5 px-3 text-center bg-brand-whatsapp hover:bg-brand-whatsappHover text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Confirmar WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Safe Fallback: NEVER fabricate compatibility */
            <div className="p-6 bg-amber-50/80 border border-amber-200 rounded-xl space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-amber-950">
                    No encontramos una coincidencia automática exacta para {selectedMake} {selectedModel} ({selectedYear})
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                    Para evitar darte una especificación incorrecta o que compres el producto equivocado, un asesor técnico de LiderPro verificará el manual y catálogo del fabricante directamente.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">
                    ¿Deseas confirmarlo con nuestro equipo en 2 minutos?
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Te pediremos una foto de tu producto actual o el número de chasis para garantizar 100% de compatibilidad.
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
                  onClick={() =>
                    trackEvent("whatsapp_vehicle", {
                      make: selectedMake,
                      model: selectedModel,
                    })
                  }
                  className="w-full sm:w-auto px-6 py-3 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-2 shrink-0 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>CONFIRMAR POR WHATSAPP</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
