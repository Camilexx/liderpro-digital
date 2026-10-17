"use client";

import { useState, useMemo } from "react";
import { Search, Filter, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

const ITEMS_PER_PAGE = 24;

type SortOption = "destacados" | "nombre-asc" | "nombre-desc" | "marca";

const CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: "todas", label: "Todas las categorías", icon: "📦" },
  { id: "baterias", label: "Baterías (48)", icon: "🔋" },
  { id: "lubricantes", label: "Aceites & Lubricantes (119)", icon: "🛢️" },
  { id: "filtros", label: "Filtros (193)", icon: "⚙️" },
  { id: "refrigerantes", label: "Refrigerantes (15)", icon: "❄️" },
  { id: "aditivos", label: "Aditivos & Químicos (109)", icon: "🧪" },
  { id: "bujias", label: "Bujías (20)", icon: "⚡" },
  { id: "frenos", label: "Líquidos de Freno (4)", icon: "🛑" },
];

export default function CatalogExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [selectedBrand, setSelectedBrand] = useState<string>("todas");
  const [selectedApp, setSelectedApp] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<SortOption>("destacados");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyBestSeller, setOnlyBestSeller] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Extract unique brands list
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, []);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    const list = PRODUCTS.filter((product) => {
      // Search term filter (matches name, SKU, brand, shortSpec)
      if (query) {
        const matchName = product.name.toLowerCase().includes(query);
        const matchSku = product.sku.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchSpec = product.shortSpec.toLowerCase().includes(query);
        if (!matchName && !matchSku && !matchBrand && !matchSpec) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "todas" && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== "todas" && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // Application type filter
      if (selectedApp !== "todos" && product.applicationType !== selectedApp) {
        return false;
      }

      // Best sellers filter
      if (onlyBestSeller && !product.isBestSeller) {
        return false;
      }

      // Stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }

      return true;
    });

    // Institutional sorting
    return list.sort((a, b) => {
      if (sortBy === "destacados") {
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "nombre-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "nombre-desc") {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === "marca") {
        const brandComp = a.brand.localeCompare(b.brand);
        return brandComp !== 0 ? brandComp : a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedBrand, selectedApp, onlyInStock, onlyBestSeller, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("todas");
    setSelectedBrand("todas");
    setSelectedApp("todos");
    setSortBy("destacados");
    setOnlyInStock(false);
    setOnlyBestSeller(false);
    setCurrentPage(1);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Control Station */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Main Instant Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar por código SKU, producto, marca (ej: 0368AR, Mannol, Bosch 34HP)..."
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C] focus:bg-white transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200/80 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Brand Selector Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C] focus:bg-white transition-all cursor-pointer"
            >
              <option value="todas">Marcas ({availableBrands.length})</option>
              {availableBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Segment Selector Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedApp}
              onChange={(e) => {
                setSelectedApp(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C] focus:bg-white transition-all cursor-pointer"
            >
              <option value="todos">Segmentos</option>
              <option value="autos">Autos & Sedanes</option>
              <option value="camionetas">Camionetas 4x4 & Diésel</option>
              <option value="pesado">Pesado & Flotas</option>
              <option value="motos">Motos 4T</option>
            </select>
          </div>

          {/* Institutional Sort Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortOption);
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C] focus:bg-white transition-all cursor-pointer"
            >
              <option value="destacados">⭐ Más vendidos primero</option>
              <option value="nombre-asc">🔤 Nombre: A a la Z</option>
              <option value="nombre-desc">🔤 Nombre: Z a la A</option>
              <option value="marca">🏷️ Agrupar por Marca</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Categoría:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#0A3B8C] text-white shadow-sm ring-2 ring-[#0A3B8C]/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Toggles & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlyBestSeller}
                onChange={(e) => {
                  setOnlyBestSeller(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 rounded text-[#0A3B8C] focus:ring-[#0A3B8C] border-slate-300"
              />
              <span>⭐ Solo más vendidos / alta rotación</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => {
                  setOnlyInStock(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span>🟢 Con stock verificado en Pedernales</span>
            </label>
          </div>

          {(searchTerm || selectedCategory !== "todas" || selectedBrand !== "todas" || selectedApp !== "todos" || onlyBestSeller || onlyInStock) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Catalog Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-black text-slate-950">
              {filteredProducts.length} {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Mostrando página {currentPage} de {totalPages} (24 productos por página) • Bodega Pedernales
          </p>
        </div>

        {/* Quick Jump Pagination in header */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Página anterior"
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
              aria-label="Página siguiente"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl font-bold">
            🔍
          </div>
          <h3 className="text-lg font-black text-slate-900">
            No se encontraron productos con estos criterios
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Intenta borrar los términos de búsqueda o cambiar de categoría. Nuestro mostrador en Pedernales cuenta con más de 500 ítems físicos disponibles para despacho inmediato.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="btn-primary btn-shine text-xs font-black uppercase tracking-wider !py-3 !px-6"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}

      {/* Bottom Pagination Bar */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-medium order-2 sm:order-1">
            Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} de {filteredProducts.length} productos
          </span>

          <div className="flex items-center gap-1.5 order-1 sm:order-2 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Primera
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>

            {/* Page buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 2
                );
              })
              .map((page, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && page - prev > 1;
                return (
                  <div key={page} className="flex items-center">
                    {showEllipsis && (
                      <span className="px-1 text-slate-400 text-xs font-bold">...</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[32px] h-8 rounded-lg text-xs font-bold transition-all ${
                        currentPage === page
                          ? "bg-[#0A3B8C] text-white shadow-sm ring-2 ring-[#0A3B8C]/20"
                          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Página siguiente"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Última ({totalPages})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
