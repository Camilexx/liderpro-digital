"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, CheckCircle2, MessageCircle, RotateCcw, Car, Truck, Tractor, Bike } from "lucide-react";
import { VEHICLE_DATABASE } from "@/data/vehicles";
import { PRODUCTS, Product, ApplicationType } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface VehicleFinderProps {
  initialCategory?: string;
  initialSegment?: ApplicationType;
  isCompact?: boolean;
}

const SEGMENT_PRESETS: {
  id: ApplicationType;
  icon: typeof Car;
  title: string;
  subtitle: string;
  defaultMake: string;
  defaultNeed: string;
}[] = [
  {
    id: "autos",
    icon: Car,
    title: "Autos & SUVs Familiares",
    subtitle: "Sintéticos 5W-30 / Baterías 11-13 Placas",
    defaultMake: "Chevrolet",
    defaultNeed: "lubricantes",
  },
  {
    id: "camionetas",
    icon: Truck,
    title: "Camionetas 4x4 & Diésel",
    subtitle: "15W-40 CK-4 / Baterías 27R y Reforzadas (D-Max, Hilux)",
    defaultMake: "Chevrolet",
    defaultNeed: "baterias",
  },
  {
    id: "pesado",
    icon: Tractor,
    title: "Sector Productivo, Camaroneras & Pesados",
    subtitle: "Canecas, Tambores, Baterías Grupo 31",
    defaultMake: "Sector Camaronero / Maquinaria Pesada",
    defaultNeed: "lubricantes",
  },
  {
    id: "motos",
    icon: Bike,
    title: "Motos & Delivery",
    subtitle: "Motul 4T, Mannol Moto, Baterías Compactas de Gel",
    defaultMake: "Motos Multimarca (Bajaj / Shineray / Daytona / Honda / Yamaha)",
    defaultNeed: "lubricantes",
  },
];

export default function VehicleFinder({
  initialCategory = "baterias",
  initialSegment,
}: VehicleFinderProps) {
  const [activeSegment, setActiveSegment] = useState<ApplicationType | null>(initialSegment || null);
  const [selectedIntent, setSelectedIntent] = useState<string>("repuesto");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedEngine, setSelectedEngine] = useState<string>("");
  const [selectedNeed, setSelectedNeed] = useState<string>(initialCategory);
  const [hasSearched, setHasSearched] = useState<boolean>(Boolean(initialSegment));

  const currentMakeData = VEHICLE_DATABASE.find((v) => v.make === selectedMake);
  const availableModels = currentMakeData ? currentMakeData.models : [];

  const currentModelData = availableModels.find((m) => m.model === selectedModel);
  const availableYears = currentModelData ? currentModelData.years : [];
  const availableEngines = currentModelData ? currentModelData.engines : [];

  const handleSegmentSelect = (seg: (typeof SEGMENT_PRESETS)[number]) => {
    setActiveSegment(seg.id);
    setSelectedNeed(seg.defaultNeed);
    setHasSearched(true);
    trackEvent("vehicle_finder_start", { segment: seg.id });
  };

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedYear("");
    setSelectedEngine("");
    setActiveSegment(null);
    setHasSearched(false);
    trackEvent("vehicle_finder_start", { make });
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedYear("");
    setSelectedEngine("");
    setActiveSegment(null);
    setHasSearched(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSegment(null);
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
    setActiveSegment(null);
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
  let matchLabel = "";

  if (hasSearched) {
    if (activeSegment) {
      matchedProducts = PRODUCTS.filter((p) => p.applicationType === activeSegment);
      isExactMatch = matchedProducts.length > 0;
      const segObj = SEGMENT_PRESETS.find((s) => s.id === activeSegment);
      matchLabel = segObj ? `Segmento activo: ${segObj.title}` : "Productos recomendados";
    } else if (selectedMake && selectedModel) {
      if (currentModelData && currentModelData.recommendedCategories) {
        if (selectedNeed === "todas") {
          const allSkus = Object.values(currentModelData.recommendedCategories).flat();
          matchedProducts = PRODUCTS.filter((p) => allSkus.includes(p.sku));
        } else {
          const categoryKey = selectedNeed as keyof typeof currentModelData.recommendedCategories;
          const skus = currentModelData.recommendedCategories[categoryKey];
          if (skus && skus.length > 0) {
            matchedProducts = PRODUCTS.filter((p) => skus.includes(p.sku));
          }
        }
      }

      // Supplementary search from p.compatibleVehicles if more products match this make/model
      const supplementary = PRODUCTS.filter((p) => {
        if (matchedProducts.some((m) => m.id === p.id)) return false;
        if (selectedNeed !== "todas" && p.category !== selectedNeed) return false;
        return p.compatibleVehicles.some(
          (cv) =>
            cv.make.toLowerCase() === selectedMake.toLowerCase() ||
            selectedMake.toLowerCase().includes(cv.make.toLowerCase())
        );
      });

      if (matchedProducts.length > 0) {
        isExactMatch = true;
        matchLabel = `Compatibilidad técnica verificada para ${selectedMake} ${selectedModel} ${selectedYear ? `(${selectedYear})` : ""}`;
        if (supplementary.length > 0 && matchedProducts.length < 6) {
          matchedProducts = [...matchedProducts, ...supplementary.slice(0, 6 - matchedProducts.length)];
        }
      } else if (supplementary.length > 0) {
        matchedProducts = supplementary.slice(0, 8);
        isExactMatch = true;
        matchLabel = `Productos recomendados para ${selectedMake} ${selectedModel}`;
      }
    }
  }

  // Progressive Step Calculator (1 to 5)
  let currentStep = 1;
  if (selectedMake || activeSegment) currentStep = 2;
  if (selectedMake && selectedModel) currentStep = 3;
  if (selectedMake && selectedModel && selectedYear) currentStep = 4;
  if ((selectedMake && selectedModel && selectedYear && selectedEngine) || activeSegment) currentStep = 5;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-10 animate-fade-up relative overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

      {/* Editorial Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-[10.5px] font-black uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>🟢 Stock disponible en Pedernales para despacho nacional</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            Terminal de Compatibilidad Multimarca LiderPro
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Selecciona tu segmento en 1 clic o ingresa los datos exactos de tu vehículo para verificar amperaje CCA, viscosidad SAE y filtros recomendados por manual.
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

      {/* 1-CLICK TACTILE SEGMENT SELECTOR */}
      <div className="mt-6">
        <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-2.5">
          Segmentación Rápida en 1 Clic por Tipo de Vehículo / Operación:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SEGMENT_PRESETS.map((seg) => {
            const isSelected = activeSegment === seg.id;
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => handleSegmentSelect(seg)}
                className={`card-interactive p-4 text-left flex flex-col justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? "!border-brand-primary !bg-red-50/40 ring-2 ring-brand-primary/20"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? "bg-[#0A3B8C] text-[#FFC500]"
                        : "bg-blue-50 text-[#0A3B8C]"
                    }`}
                  >
                    <seg.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected
                        ? "bg-[#0A3B8C] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {isSelected ? "Activo" : "Filtrar 1-Clic"}
                  </span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black text-slate-950 leading-snug">
                    {seg.title}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    {seg.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Exhaustive Selectors Grid */}
      <form onSubmit={handleSearch} className="mt-6 pt-6 border-t border-slate-100 space-y-5">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
            O busca específicamente por Marca, Modelo y Año:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            {[
              { id: "no_enciende", label: "Mi auto no prende", category: "baterias" },
              { id: "bateria", label: "Batería nueva", category: "baterias" },
              { id: "aceite", label: "Cambio de aceite", category: "lubricantes" },
              { id: "mantenimiento", label: "Filtros Fram/Bosch", category: "filtros" },
              { id: "refrigerante", label: "Refrigerante OAT", category: "refrigerantes" },
              { id: "no_se", label: "Asesoría por manual", category: "otro" },
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
              <option value="todas">Ver Todos los Repuestos Compatibles</option>
              <option value="baterias">Baterías (Baterías Ecuador / Bosch)</option>
              <option value="lubricantes">Aceites (Mannol / Aroil / Mobil / Valvoline / Motul)</option>
              <option value="filtros">Filtros Originales (Advance Filters)</option>
              <option value="bujias">Bujías de Encendido (NGK / Denso)</option>
              <option value="refrigerantes">Refrigerantes OAT AF12+ / Dexcoolant</option>
              <option value="frenos">Líquidos de Freno (ATE Original)</option>
              <option value="aditivos">Aditivos Ceramo Ester & Tratamientos Bardahl</option>
            </select>
          </div>

          {/* Ciudad */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              Ciudad (Entrega)
            </label>
            <input
              type="text"
              placeholder="Ej. Pedernales, Quito, Manta..."
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full h-12 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>
        </div>

        {/* Action Button & Subtext */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600 flex items-center gap-1.5">
            <span>¿Deseas confirmar qué aceite y batería recomienda el manual?</span>
            <a
              href={buildWhatsAppLink("quick_compatibility", {
                vehicleMake: selectedMake,
                vehicleModel: selectedModel,
                vehicleYear: selectedYear,
                city: selectedCity,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 font-black underline hover:text-brand-primary"
            >
              Consultar por WhatsApp
            </a>
          </div>

          <button
            type="submit"
            className="btn-primary btn-shine w-full sm:w-auto !py-3.5 !px-8 text-xs font-black tracking-wider flex items-center justify-center gap-2 group"
          >
            <Search className="w-4 h-4" />
            <span>VER PRODUCTOS COMPATIBLES</span>
            <span className="text-white/80 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </form>

      {/* Results presentation */}
      {hasSearched && (
        <div className="mt-8 pt-8 border-t border-slate-100 animate-fade-up">
          {isExactMatch ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-200/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{matchLabel}</span>
                </div>
                <span className="text-[11px] text-emerald-700">
                  🟢 Despacho inmediato desde Sede Pedernales
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="card-interactive p-5 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-4 justify-between"
                  >
                    <div className="w-20 h-20 relative shrink-0 bg-white rounded-lg border border-slate-200 p-2">
                      <Image
                        src={prod.imageUrl}
                        alt={prod.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="space-y-1 flex-grow text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-slate-900 text-white rounded">
                          {prod.brand}
                        </span>
                        {(prod.volume || prod.plates) && (
                          <span className="text-[10px] font-bold text-slate-600">
                            {prod.volume || prod.plates}
                          </span>
                        )}
                      </div>
                      <h4 className="font-black text-slate-950 text-sm">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium">
                        {prod.shortSpec}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                      <a
                        href={buildWhatsAppLink("product", {
                          brand: prod.brand,
                          productName: prod.name,
                          presentation: prod.volume || prod.plates,
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
                        <span>Cotizar</span>
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
                  Verificación directa de manual para {selectedMake} {selectedModel} ({selectedYear || "tu vehículo"})
                </h4>
                <p className="text-xs text-slate-600">
                  Un asesor técnico en Sede Pedernales confirmará la referencia exacta en Baterías Ecuador, Bosch, Mannol, Motul, Mobil, Havoline o Castrol.
                </p>
              </div>

              <a
                href={buildWhatsAppLink("quick_compatibility", {
                  vehicleMake: selectedMake,
                  vehicleModel: selectedModel,
                  vehicleYear: selectedYear,
                  vehicleEngine: selectedEngine,
                  neededItem: selectedNeed,
                  city: selectedCity,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 btn-whatsapp text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shrink-0 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONFIRMAR CON ASESOR PEDERNALES</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
