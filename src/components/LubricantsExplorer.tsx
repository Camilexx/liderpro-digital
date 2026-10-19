"use client";

import { useState, useMemo } from "react";
import { Search, Layers, RotateCcw, MessageCircle, ChevronLeft, ChevronRight, Droplets, Sparkles, Truck, Bike } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const ITEMS_PER_PAGE = 24;

const VISCOSITY_TABS = [
  { id: "todos", label: "Todos los Aceites", icon: Droplets, count: 94, subtitle: "Aroil, Mannol, Mobil, Motul" },
  { id: "5w30_0w20", label: "100% Sintéticos (5W-30 / 0W-20)", icon: Sparkles, count: 30, subtitle: "API SP • Motores Modernos & Turbo" },
  { id: "10w30_10w40", label: "Semisintéticos (10W-30 / 10W-40)", icon: Layers, count: 16, subtitle: "Protección Balanceada y Flotas" },
  { id: "15w40", label: "Diésel Pesado (15W-40 CI-4 / CK-4)", icon: Truck, count: 17, subtitle: "Camiones, Camionetas & Camaroneras" },
  { id: "20w50_super40", label: "Alto Kilometraje & Costa (20W-50 / 40)", icon: Droplets, count: 18, subtitle: "Aroil Super 40 • Alta Temperatura" },
  { id: "motos4t", label: "Motos 4T (JASO MA2 / MA)", icon: Bike, count: 30, subtitle: "Motul 5100 / Mannol 4T Plus" },
];

const POPULAR_LUBRICANTS = [
  { name: "AROIL Super 40", desc: "Top #1 en Ventas Costa", brand: "Aroil" },
  { name: "Mannol 5W-30 Special Plus", desc: "100% Sintético Alemán API SP", brand: "Mannol" },
  { name: "AROIL 15W-40 CI-4", desc: "Diésel Pesado Galón & Caneca", brand: "Aroil" },
  { name: "Motul Moto 5100 15W-50", desc: "Semisintético Éster 4T", brand: "Motul" },
  { name: "Mobil Delvac 1300 15W-40", desc: "Flotas Diésel y Camiones", brand: "Mobil" },
  { name: "AROIL 25W-60 Caneca 5 Gal", desc: "Motores Alto Millaje", brand: "Aroil" },
];

export default function LubricantsExplorer() {
  const [activeTab, setActiveTab] = useState<string>("todos");
  const [selectedBrand, setSelectedBrand] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedVolume, setSelectedVolume] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Extract all pure lubricants
  const allLubricants = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === "lubricantes");
  }, []);

  // Filtered lubricants
  const filteredLubricants = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allLubricants.filter((l) => {
      const text = `${l.name} ${l.shortSpec} ${l.sku}`.toLowerCase();

      // Tab filter
      if (activeTab !== "todos") {
        if (activeTab === "5w30_0w20") {
          const match = text.includes("5w-30") || text.includes("5w30") || text.includes("0w-20") || text.includes("0w20") || text.includes("5w-40") || text.includes("5w40");
          if (!match) return false;
        } else if (activeTab === "10w30_10w40") {
          const match = text.includes("10w-30") || text.includes("10w30") || text.includes("10w-40") || text.includes("10w40");
          if (!match) return false;
        } else if (activeTab === "15w40") {
          const match = text.includes("15w-40") || text.includes("15w40") || text.includes("15w-50") || text.includes("15w50");
          if (!match) return false;
        } else if (activeTab === "20w50_super40") {
          const match = text.includes("20w-50") || text.includes("20w50") || text.includes("25w-60") || text.includes("25w60") || text.includes("super 40") || text.includes("super 50") || text.includes("sae 40") || text.includes("sae 50") || text.includes("sae40");
          if (!match) return false;
        } else if (activeTab === "motos4t") {
          const match = text.includes("4t") || text.includes("moto") || text.includes("jaso") || l.applicationType === "motos";
          if (!match) return false;
        }
      }

      // Brand dropdown
      if (selectedBrand !== "todas") {
        if (l.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      // Volume filter (Cuarto / Litro vs Galón vs Caneca)
      if (selectedVolume !== "todos") {
        if (selectedVolume === "caneca") {
          const isCaneca = text.includes("caneca") || text.includes("5 gal") || text.includes("19 lt") || text.includes("20 lt") || text.includes("can 10") || text.includes("can 20");
          if (!isCaneca) return false;
        } else if (selectedVolume === "galon") {
          const isGalon = text.includes("galon") || text.includes("galón") || text.includes("4 lt") || text.includes("5 lt") || text.includes("3.785");
          if (!isGalon) return false;
        } else if (selectedVolume === "litro") {
          const isLitro = text.includes("1 lt") || text.includes("1lt") || text.includes("cuarto") || text.includes("946 ml");
          if (!isLitro) return false;
        }
      }

      // Search query
      if (q) {
        const matchName = l.name.toLowerCase().includes(q);
        const matchSku = l.sku.toLowerCase().includes(q);
        const matchBrand = l.brand.toLowerCase().includes(q);
        const matchSpec = l.shortSpec.toLowerCase().includes(q);
        const matchVolume = (l.volume || "").toLowerCase().includes(q);
        const matchVehicles = l.compatibleVehicles.some(
          (cv) => cv.make.toLowerCase().includes(q) || cv.model.toLowerCase().includes(q)
        );
        if (!matchName && !matchSku && !matchBrand && !matchSpec && !matchVolume && !matchVehicles) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [allLubricants, activeTab, selectedBrand, selectedVolume, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredLubricants.length / ITEMS_PER_PAGE) || 1;
  const paginatedLubricants = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLubricants.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLubricants, currentPage]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handlePopularClick = (name: string) => {
    setSearchQuery(name);
    setActiveTab("todos");
    setCurrentPage(1);
  };

  const handleReset = () => {
    setActiveTab("todos");
    setSelectedBrand("todas");
    setSelectedVolume("todos");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Search & Control Console */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#0A3B8C] rounded-full text-[11px] font-black uppercase tracking-wider mb-2">
              <Droplets className="w-3.5 h-3.5" />
              Catálogo Multimarca Autorizado • Aroil, Mannol, Mobil, Motul
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Buscador por Viscosidad SAE, Norma API y Formato
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              94 fórmulas de lubricación automotriz e industrial en cuartos, galones y canecas de 5 galones en Bodega Pedernales.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-auto px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C] cursor-pointer"
            >
              <option value="todas">Todas las marcas (94)</option>
              <option value="Aroil">AROIL (38)</option>
              <option value="Mannol">Mannol Germany</option>
              <option value="Mobil">Mobil Delvac / 1</option>
              <option value="Motul">Motul France</option>
              <option value="Valvoline">Valvoline</option>
            </select>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Viscosidad (ej: 5W-30, 15W-40)..."
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A3B8C]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Viscosity Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {VISCOSITY_TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? "bg-[#0A3B8C] text-white border-[#0A3B8C] shadow-md ring-2 ring-[#0A3B8C]/20"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isSelected ? "bg-white/10 text-[#FFC500]" : "bg-blue-50 text-[#0A3B8C]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-white/20 text-[#FFC500]"
                        : "bg-white text-slate-700 border border-slate-200/60"
                    }`}
                  >
                    {tab.count}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-black leading-tight line-clamp-1">
                    {tab.label}
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 line-clamp-1 ${
                      isSelected ? "text-slate-200" : "text-slate-500"
                    }`}
                  >
                    {tab.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Formats and Popular Viscosities */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1">
              Presentación:
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedVolume("todos");
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedVolume === "todos"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Todos los Formatos
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedVolume("litro");
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedVolume === "litro"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Cuartos / Litros (1L)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedVolume("galon");
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedVolume === "galon"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Galones (4L / 5L)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedVolume("caneca");
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedVolume === "caneca"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Canecas (5 Galones / 19L)
            </button>
          </div>

          {(searchQuery || activeTab !== "todos" || selectedBrand !== "todas" || selectedVolume !== "todos") && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Limpiar filtros
            </button>
          )}
        </div>

        {/* Popular References Quick Clicks */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1">
            Líneas Más Solicitadas:
          </span>
          {POPULAR_LUBRICANTS.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handlePopularClick(item.name)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-200/60"
            >
              <span className="text-[#0A3B8C] font-black">{item.name}</span>
              <span className="text-[10px] text-slate-500 font-normal">({item.desc})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-lg font-black text-slate-950">
              {filteredLubricants.length} {filteredLubricants.length === 1 ? "aceite encontrado" : "aceites encontrados"}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Página {currentPage} de {totalPages} • Sellado original de fábrica con despacho diario a las 24 provincias
          </p>
        </div>

        {/* Pagination in header */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <span className="text-xs font-bold text-slate-700 px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {paginatedLubricants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {paginatedLubricants.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">
            🛢️
          </div>
          <h4 className="text-base font-black text-slate-900">
            No encontramos un lubricante con esos filtros exactos
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Manejamos todas las viscosidades en tambores, canecas y cuartos. Consúltanos por WhatsApp con la viscosidad recomendada en el manual de tu vehículo.
          </p>
          <a
            href={buildWhatsAppLink("quick_compatibility", {
              neededItem: searchQuery || "Aceite de Motor",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-white text-xs font-bold py-2.5 px-5 rounded-xl inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar Viscosidad por WhatsApp</span>
          </a>
        </div>
      )}

      {/* Bottom Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 transition-colors"
          >
            ← Anterior
          </button>
          <span className="text-xs font-bold text-slate-700 px-3">
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 transition-colors"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
