"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Wrench, RotateCcw, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const ITEMS_PER_PAGE = 24;

const FILTER_CATEGORIES = [
  { id: "todos", label: "Todos los Filtros", icon: "⚙️", count: 193 },
  { id: "aceite", label: "Filtros de Aceite", icon: "🛢️", count: 57, desc: "Blindados Spin-on con válvula de retención" },
  { id: "combustible", label: "Filtros de Combustible & Diésel", icon: "⛽", count: 52, desc: "Separación de agua y sedimentos Common Rail" },
  { id: "aire", label: "Filtros de Aire de Motor", icon: "💨", count: 59, desc: "Microfibra plisada con sello de poliuretano" },
  { id: "cabina", label: "Filtros de Cabina / Polen", icon: "🌬️", count: 25, desc: "Purificación de aire acondicionado y PM2.5" },
];

const POPULAR_CODES = [
  { code: "AO-3387", vehicle: "Aveo / Sail / Corsa", type: "Aceite" },
  { code: "AFE-297", vehicle: "Chevrolet D-Max 2.5 / 3.0", type: "Combustible Diésel" },
  { code: "AFP-974", vehicle: "Great Wall Wingle 5 / 7", type: "Combustible Diésel" },
  { code: "AO-1314", vehicle: "Hino 300 / 500 Series", type: "Aceite Pesado" },
  { code: "AO-222", vehicle: "Toyota Hilux / Fortuner", type: "Aceite" },
  { code: "AO-1002", vehicle: "Kia Sportage / Hyundai Tucson", type: "Aceite" },
];

export default function FiltersExplorer() {
  const [activeTab, setActiveTab] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Extract all pure filters from products
  const allFilters = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === "filtros");
  }, []);

  // Filter products by active tab and search query
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allFilters.filter((product) => {
      // Tab filter
      if (activeTab !== "todos") {
        const text = `${product.name} ${product.shortSpec} ${product.sku}`.toLowerCase();
        if (activeTab === "aceite") {
          const isOil = text.includes("aceite") || text.includes("oil") || product.sku.startsWith("AO-") || product.sku.startsWith("0368AO");
          if (!isOil) return false;
        } else if (activeTab === "combustible") {
          const isFuel = text.includes("combustible") || text.includes("diesel") || text.includes("gasolina") || text.includes("fuel") || product.sku.startsWith("AFE-") || product.sku.startsWith("AFP-");
          if (!isFuel) return false;
        } else if (activeTab === "cabina") {
          const isCabin = text.includes("cabina") || text.includes("cabin") || text.includes("polen") || text.includes("aire acondicionado");
          if (!isCabin) return false;
        } else if (activeTab === "aire") {
          const isAir = (text.includes("aire") || text.includes("air")) && !text.includes("cabina") && !text.includes("polen");
          if (!isAir) return false;
        }
      }

      // Search query filter
      if (q) {
        const matchName = product.name.toLowerCase().includes(q);
        const matchSku = product.sku.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchSpec = product.shortSpec.toLowerCase().includes(q);
        const matchVehicles = product.compatibleVehicles.some(
          (cv) => cv.make.toLowerCase().includes(q) || cv.model.toLowerCase().includes(q)
        );
        if (!matchName && !matchSku && !matchBrand && !matchSpec && !matchVehicles) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [allFilters, activeTab, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handlePopularCodeClick = (code: string) => {
    setSearchQuery(code);
    setActiveTab("todos");
    setCurrentPage(1);
  };

  const handleReset = () => {
    setActiveTab("todos");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Search & Navigation Console */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#0A3B8C] rounded-full text-[11px] font-black uppercase tracking-wider mb-2">
              <Wrench className="w-3.5 h-3.5" />
              Catálogo Oficial Advance Filters • Stock Físico Pedernales
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Buscador y Clasificador de Filtros por Tipo y Código
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Filtra entre los 193 modelos disponibles de Advance Filters o busca por código OEM, modelo de vehículo o referencia técnica.
            </p>
          </div>

          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar código (ej: AO-3387, AFE-297)..."
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

        {/* Quick Tabs by Filter Type */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {FILTER_CATEGORIES.map((cat) => {
            const isSelected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleTabChange(cat.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? "bg-[#0A3B8C] text-white border-[#0A3B8C] shadow-md ring-2 ring-[#0A3B8C]/20"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{cat.icon}</span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-white/20 text-[#FFC500]"
                        : "bg-white text-slate-700 border border-slate-200/60"
                    }`}
                  >
                    {cat.count}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-black leading-tight line-clamp-1">
                    {cat.label}
                  </div>
                  {cat.desc && (
                    <div
                      className={`text-[10px] mt-0.5 line-clamp-1 ${
                        isSelected ? "text-slate-200" : "text-slate-500"
                      }`}
                    >
                      {cat.desc}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Popular Codes Direct Click Chips */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Códigos de Alta Rotación:
          </span>
          {POPULAR_CODES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handlePopularCodeClick(item.code)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-200/60"
            >
              <span className="font-mono text-[#0A3B8C] font-black">{item.code}</span>
              <span className="text-[10px] text-slate-500 font-normal">({item.vehicle})</span>
            </button>
          ))}
          {(searchQuery || activeTab !== "todos") && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-slate-500 hover:text-red-600 ml-auto flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-lg font-black text-slate-950">
              {filteredProducts.length} {filteredProducts.length === 1 ? "filtro disponible" : "filtros disponibles"}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Página {currentPage} de {totalPages} • Despacho diario desde Bodega Matriz en Pedernales (Manabí)
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

      {/* Grid of Product Cards */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {paginatedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">
            🔍
          </div>
          <h4 className="text-base font-black text-slate-900">
            No encontramos un filtro con ese código exacto
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Contamos con tablas de equivalencia para marcas OEM, Mann, Fram, Baldwin y WIX. Escríbenos por WhatsApp y nuestro equipo de mostrador en Pedernales verificará el cruce en 1 minuto.
          </p>
          <a
            href={buildWhatsAppLink("quick_compatibility", {
              neededItem: searchQuery || "Filtro Advance",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-white text-xs font-bold py-2.5 px-5 rounded-xl inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar Equivalencia por WhatsApp</span>
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
