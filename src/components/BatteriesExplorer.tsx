"use client";

import { useState, useMemo } from "react";
import { Search, Zap, RotateCcw, MessageCircle, ChevronLeft, ChevronRight, Car, Truck, Tractor, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const ITEMS_PER_PAGE = 24;

const BATTERY_SEGMENTS = [
  { id: "todas", label: "Todas las Baterías", icon: Zap, count: 48, subtitle: "Baterías Ecuador & Bosch" },
  { id: "autos", label: "Autos & SUVs Livianos", icon: Car, count: 20, subtitle: "11-13 Placas • 45 a 70 Amp (42HP, 34HP)" },
  { id: "camionetas", label: "Camionetas 4x4 & Diésel", icon: Truck, count: 16, subtitle: "15-17 Placas • 75 a 95 Amp (27HP, 34R)" },
  { id: "pesado", label: "Pesado & Camaroneras", icon: Tractor, count: 12, subtitle: "21-33 Placas • 100 a 160 Amp (Grupo 31, N150)" },
  { id: "bosch", label: "Línea Bosch S4 Silver", icon: Sparkles, count: 12, subtitle: "Tecnología Alemana PowerFrame" },
];

const POPULAR_BATTERIES = [
  { name: "34 HP I (80 Amp)", vehicle: "Sail, Aveo, Grand Vitara, D-Max Gasolina", brand: "Baterías Ecuador" },
  { name: "42 HP (62 Amp)", vehicle: "Spark, Picanto, Accent, Swift, Alto", brand: "Baterías Ecuador" },
  { name: "27 HP (95 Amp)", vehicle: "D-Max Diésel, Hilux 2.5/2.8, BT-50, Fortuner", brand: "Baterías Ecuador" },
  { name: "Grupo 31 SHD (105 Amp)", vehicle: "Hino 300/500, Camaroneras & Generadores", brand: "Baterías Ecuador" },
  { name: "Bosch S4 27 HP (85 Amp)", vehicle: "Camionetas Alta Gama, Isuzu, Ford F-150", brand: "Bosch" },
  { name: "N150 SHD (160 Amp)", vehicle: "Buses Interprovinciales, Cabezales, Tractores", brand: "Baterías Ecuador" },
];

export default function BatteriesExplorer() {
  const [activeSegment, setActiveSegment] = useState<string>("todas");
  const [selectedBrand, setSelectedBrand] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPolarity, setSelectedPolarity] = useState<string>("todas");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Extract pure batteries
  const allBatteries = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === "baterias");
  }, []);

  // Filtered batteries
  const filteredBatteries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allBatteries.filter((b) => {
      // Segment filter
      if (activeSegment !== "todas") {
        if (activeSegment === "bosch") {
          if (b.brand.toLowerCase() !== "bosch") return false;
        } else if (activeSegment === "autos") {
          if (b.applicationType !== "autos") return false;
        } else if (activeSegment === "camionetas") {
          if (b.applicationType !== "camionetas") return false;
        } else if (activeSegment === "pesado") {
          if (b.applicationType !== "pesado") return false;
        }
      }

      // Brand dropdown
      if (selectedBrand !== "todas") {
        if (b.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      // Polarity filter (I / Izquierda / L vs Derecha / R)
      if (selectedPolarity !== "todas") {
        const text = `${b.name} ${b.shortSpec} ${b.sku}`.toUpperCase();
        if (selectedPolarity === "izquierda") {
          const isLeft = text.includes(" HP I ") || text.includes(" MP I ") || text.includes(" 27 I") || text.includes(" 34 I") || text.includes("IZQ");
          if (!isLeft) return false;
        } else if (selectedPolarity === "derecha") {
          const isLeft = text.includes(" HP I ") || text.includes(" MP I ") || text.includes(" 27 I") || text.includes(" 34 I") || text.includes("IZQ");
          if (isLeft) return false;
        }
      }

      // Search query
      if (q) {
        const matchName = b.name.toLowerCase().includes(q);
        const matchSku = b.sku.toLowerCase().includes(q);
        const matchBrand = b.brand.toLowerCase().includes(q);
        const matchSpec = b.shortSpec.toLowerCase().includes(q);
        const matchPlates = (b.plates || "").toLowerCase().includes(q);
        const matchVehicles = b.compatibleVehicles.some(
          (cv) => cv.make.toLowerCase().includes(q) || cv.model.toLowerCase().includes(q)
        );
        if (!matchName && !matchSku && !matchBrand && !matchSpec && !matchPlates && !matchVehicles) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [allBatteries, activeSegment, selectedBrand, selectedPolarity, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredBatteries.length / ITEMS_PER_PAGE) || 1;
  const paginatedBatteries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBatteries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBatteries, currentPage]);

  const handleSegmentChange = (segId: string) => {
    setActiveSegment(segId);
    setCurrentPage(1);
  };

  const handlePopularClick = (name: string) => {
    setSearchQuery(name.split(" ")[0]); // e.g. "34", "42", "27"
    setActiveSegment("todas");
    setCurrentPage(1);
  };

  const handleReset = () => {
    setActiveSegment("todas");
    setSelectedBrand("todas");
    setSelectedPolarity("todas");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Control Console */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 rounded-full text-[11px] font-black uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              Terminal de Selección Técnica de Baterías • Bodega Pedernales
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Filtrar por Segmento de Vehículo, Amperaje y Polaridad
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Baterías selladas libres de mantenimiento con garantía nacional de 12 a 18 meses. Verifica el amperaje exacto para tu motor.
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
              <option value="todas">Todas las marcas (48)</option>
              <option value="Baterías Ecuador">Baterías Ecuador (36)</option>
              <option value="Bosch">Bosch S4 Silver (12)</option>
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
                placeholder="Buscar (ej: 34 HP, 80 Amp)..."
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

        {/* Tactile Segment Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BATTERY_SEGMENTS.map((seg) => {
            const isSelected = activeSegment === seg.id;
            const Icon = seg.icon;
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => handleSegmentChange(seg.id)}
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
                    {seg.count}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-black leading-tight line-clamp-1">
                    {seg.label}
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 line-clamp-1 ${
                      isSelected ? "text-slate-200" : "text-slate-500"
                    }`}
                  >
                    {seg.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Polarity and Popular References */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1">
              Polaridad:
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedPolarity("todas");
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedPolarity === "todas"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Todas
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedPolarity("derecha");
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedPolarity === "derecha"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Borne Derecho (+) Estándar
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedPolarity("izquierda");
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedPolarity === "izquierda"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Borne Izquierdo (+ I) Invertido
            </button>
          </div>

          {(searchQuery || activeSegment !== "todas" || selectedBrand !== "todas" || selectedPolarity !== "todas") && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Limpiar filtros
            </button>
          )}
        </div>

        {/* Popular Battery Models Quick Click */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1">
            Modelos de Alta Rotación:
          </span>
          {POPULAR_BATTERIES.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handlePopularClick(item.name)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-200/60"
            >
              <span className="text-[#0A3B8C] font-black">{item.name}</span>
              <span className="text-[10px] text-slate-500 font-normal">({item.brand})</span>
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
              {filteredBatteries.length} {filteredBatteries.length === 1 ? "batería encontrada" : "baterías encontradas"}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Página {currentPage} de {totalPages} • Stock sellado de fábrica en Bodega Pedernales con garantía activa
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

      {/* Battery Cards Grid */}
      {paginatedBatteries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {paginatedBatteries.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">
            ⚡
          </div>
          <h4 className="text-base font-black text-slate-900">
            No encontramos una batería con esos filtros específicos
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Manejamos todas las polaridades y capacidades de fábrica en Baterías Ecuador y Bosch. Escríbenos con la marca, año y modelo de tu vehículo para asignarte el amperaje exacto.
          </p>
          <a
            href={buildWhatsAppLink("quick_compatibility", {
              neededItem: searchQuery || "Batería Automotriz",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-white text-xs font-bold py-2.5 px-5 rounded-xl inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar Batería por WhatsApp</span>
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
