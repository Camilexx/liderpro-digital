"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Car,
  Truck,
  Tractor,
  Bike,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

const ITEMS_PER_PAGE = 24;

type SortOption = "destacados" | "nombre-asc" | "marca";

const CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: "todas", label: "Ver Todo (366)", icon: "📦" },
  { id: "lubricantes", label: "Aceites de Motor", icon: "🛢️" },
  { id: "baterias", label: "Baterías", icon: "🔋" },
  { id: "filtros", label: "Filtros", icon: "⚙️" },
  { id: "refrigerantes", label: "Refrigerantes", icon: "❄️" },
  { id: "aditivos", label: "Aditivos y Grasas", icon: "🧪" },
  { id: "bujias", label: "Bujías", icon: "⚡" },
  { id: "frenos", label: "Líquido de Frenos", icon: "🛑" },
];

const ADULT_QUICK_BUTTONS = [
  {
    id: "mannol-promo",
    label: "🇩🇪 Combos & Aceites Mannol",
    category: "todas",
    brand: "MANNOL",
    app: "todos",
    query: "",
  },
  {
    id: "auto-chevrolet",
    label: "🚗 Aveo / Sail / Spark",
    category: "todas",
    brand: "todas",
    app: "autos",
    query: "Chevrolet",
  },
  {
    id: "kia-hyundai",
    label: "🚙 Kia / Hyundai (Sportage, Tucson, Rio)",
    category: "todas",
    brand: "todas",
    app: "autos",
    query: "Kia",
  },
  {
    id: "camioneta-diesel",
    label: "🛻 D-Max / Hilux / Camionetas",
    category: "todas",
    brand: "todas",
    app: "camionetas",
    query: "",
  },
  {
    id: "pesados-camaronera",
    label: "🚛 Camiones / Hino / Camaroneras",
    category: "todas",
    brand: "todas",
    app: "pesado",
    query: "",
  },
  {
    id: "baterias-ecuador",
    label: "🔋 Baterías Ecuador & Bosch",
    category: "baterias",
    brand: "todas",
    app: "todos",
    query: "",
  },
];

// Normalize text for forgiving adult search (strips accents, punctuation, and normalizes common typos like "manol" -> "mannol")
function normalizeForSearch(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\bmanol\b/g, "mannol")
    .replace(/\bdmax\b/g, "d-max")
    .replace(/\bchev\b/g, "chevrolet")
    .replace(/\bhy\b|\bhdy\b/g, "hyundai")
    .replace(/\bty\b/g, "toyota")
    .replace(/\b10w40\b/g, "10w-40")
    .replace(/\b5w30\b/g, "5w-30")
    .replace(/\b15w40\b/g, "15w-40")
    .replace(/\b20w50\b/g, "20w-50")
    .replace(/\b25w60\b/g, "25w-60")
    .replace(/\b5w40\b/g, "5w-40")
    .replace(/\b10w30\b/g, "10w-30");
}

const STOP_WORDS = new Set(["para", "de", "del", "el", "la", "los", "las", "un", "una", "mi", "con", "en", "por", "carro", "auto", "vehiculo"]);

export default function CatalogExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [selectedBrand, setSelectedBrand] = useState<string>("todas");
  const [selectedApp, setSelectedApp] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<SortOption>("destacados");
  const [onlyBestSeller, setOnlyBestSeller] = useState<boolean>(false);
  const [activeQuickId, setActiveQuickId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Read URL query params (?marca=MANNOL or ?q=...) on mount so brand links from homepage work seamlessly
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const marcaParam = params.get("marca");
      const qParam = params.get("q");
      if (marcaParam) {
        setSelectedBrand(marcaParam);
      }
      if (qParam) {
        setSearchTerm(qParam);
      }
    }
  }, []);

  // Extract unique brands list
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, []);

  // Forgiving Multi-Token Search + Filters
  const filteredProducts = useMemo(() => {
    const cleanQuery = normalizeForSearch(searchTerm.trim());
    const tokens = cleanQuery
      .split(/\s+/)
      .filter((t) => t.length > 1 && !STOP_WORDS.has(t));

    const list = PRODUCTS.filter((product) => {
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

      // Multi-token forgiving search
      if (tokens.length > 0) {
        const vehicleText = product.compatibleVehicles
          .map((cv) => `${cv.make} ${cv.model} ${cv.engine || ""}`)
          .join(" ");
        const variantText = (product.variants || [])
          .map((v) => `${v.sku} ${v.officialSku || ""} ${v.presentation}`)
          .join(" ");
        const haystack = normalizeForSearch(
          `${product.name} ${product.rawErpName || ""} ${product.sku} ${product.brand} ${product.category} ${product.shortSpec} ${product.volume || ""} ${product.plates || ""} ${vehicleText} ${variantText}`
        );

        const allTokensMatch = tokens.every((tok) => haystack.includes(tok));
        if (!allTokensMatch) {
          return false;
        }
      }

      return true;
    });

    // Institutional sorting including Official Price sorting
    return list.sort((a, b) => {
      if (sortBy === "destacados") {
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "nombre-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "marca") {
        const brandComp = a.brand.localeCompare(b.brand);
        return brandComp !== 0 ? brandComp : a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedBrand, selectedApp, onlyBestSeller, sortBy]);

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
    setOnlyBestSeller(false);
    setActiveQuickId(null);
    setCurrentPage(1);
  };

  const handleQuickButton = (btn: (typeof ADULT_QUICK_BUTTONS)[number]) => {
    if (activeQuickId === btn.id) {
      handleResetFilters();
      return;
    }
    setActiveQuickId(btn.id);
    setSelectedCategory(btn.category);
    setSelectedBrand(btn.brand);
    setSelectedApp(btn.app);
    setSearchTerm(btn.query);
    setCurrentPage(1);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setActiveQuickId(null);
    setCurrentPage(1);
  };

  const activeContextDescription = [
    searchTerm ? `"${searchTerm}"` : "",
    selectedBrand !== "todas" ? `Marca ${selectedBrand}` : "",
    selectedCategory !== "todas" ? `Categoría ${selectedCategory}` : "",
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="space-y-8">
      {/* Adult-Friendly Search & 1-Click Filter Console */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 sm:p-8 shadow-md space-y-6">
        {/* Step 1: 1-Click Friendly Buttons for Adults */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0A3B8C] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>1. Botones Rápidos (Toca lo que buscas sin complicarte):</span>
            </span>
            {(searchTerm || selectedCategory !== "todas" || selectedBrand !== "todas" || selectedApp !== "todos" || onlyBestSeller) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-black text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ver todos los productos (Limpiar)</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {ADULT_QUICK_BUTTONS.map((btn) => {
              const isSelected = activeQuickId === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => handleQuickButton(btn)}
                  className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-black text-left transition-all cursor-pointer border-2 flex items-center justify-between gap-2 min-h-[48px] ${
                    isSelected
                      ? "bg-[#061B40] text-[#FFC500] border-[#061B40] shadow-md scale-[1.01]"
                      : "bg-slate-50 hover:bg-blue-50/70 text-slate-900 border-slate-200 hover:border-[#0A3B8C]/50"
                  }`}
                >
                  <span>{btn.label}</span>
                  <span
                    className={`text-[10.5px] px-2 py-0.5 rounded-lg font-extrabold shrink-0 ${
                      isSelected ? "bg-[#FFC500] text-slate-950" : "bg-white text-[#0A3B8C] border border-slate-200"
                    }`}
                  >
                    {isSelected ? "Activo ✓" : "Ver →"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Large, Forgiving Search Bar + Clear Selectors */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <label
            htmlFor="catalog-main-search"
            className="block text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider"
          >
            2. O escribe aquí tu carro, aceite, batería o código (Ej: &ldquo;Aveo&rdquo;, &ldquo;D-Max&rdquo;, &ldquo;10W-40&rdquo;, &ldquo;Mannol&rdquo;):
          </label>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
            {/* Main Instant Search Input */}
            <div className="lg:col-span-6 relative">
              <Search className="w-5 h-5 text-[#0A3B8C] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="catalog-main-search"
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setActiveQuickId(null);
                  setCurrentPage(1);
                }}
                placeholder="Escribe aquí: ej. aceite para Sail, batería D-Max, Mannol 10W-40..."
                className="w-full pl-12 pr-10 py-4 bg-slate-50 border-2 border-slate-300 rounded-2xl text-sm sm:text-base font-bold text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C] focus:border-[#0A3B8C] focus:bg-white transition-all shadow-inner"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-600 hover:text-slate-950 bg-slate-200 hover:bg-slate-300 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
                  aria-label="Borrar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Brand Selector Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setActiveQuickId(null);
                  setCurrentPage(1);
                }}
                aria-label="Filtrar por marca"
                className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xs sm:text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C] focus:bg-white transition-all cursor-pointer"
              >
                <option value="todas">🏷️ Todas las Marcas ({availableBrands.length})</option>
                {availableBrands.map((b) => (
                  <option key={b} value={b}>
                    Marca: {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Institutional Sort Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortOption);
                  setCurrentPage(1);
                }}
                aria-label="Ordenar productos"
                className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xs sm:text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C] focus:bg-white transition-all cursor-pointer"
              >
                <option value="destacados">⭐ Más Vendidos Primero</option>
                <option value="nombre-asc">🔤 Nombre: A a la Z</option>
                <option value="marca">🏷️ Ordenar por Marca</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Bar (Large Interactive Buttons) */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#0A3B8C]" />
            Categoría:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-[#0A3B8C] text-white border-[#0A3B8C] shadow-sm ring-2 ring-[#0A3B8C]/20"
                    : "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Vehicle Segment Interactive Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mr-1">
              Tipo de Vehículo:
            </span>
            {[
              { id: "todos", label: "Todos", icon: null },
              { id: "autos", label: "Autos y SUVs", icon: Car },
              { id: "camionetas", label: "Camionetas 4x4", icon: Truck },
              { id: "pesado", label: "Camiones y Camaroneras", icon: Tractor },
              { id: "motos", label: "Motos 4T", icon: Bike },
            ].map((seg) => {
              const Icon = seg.icon;
              const isSelected = selectedApp === seg.id;
              return (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => {
                    setSelectedApp(seg.id);
                    setActiveQuickId(null);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer border transition-all ${
                    isSelected
                      ? "bg-slate-900 text-[#FFC500] border-slate-900"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{seg.label}</span>
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-black text-slate-800 select-none bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
            <input
              type="checkbox"
              checked={onlyBestSeller}
              onChange={(e) => {
                setOnlyBestSeller(e.target.checked);
                setCurrentPage(1);
              }}
              className="w-4 h-4 rounded text-[#0A3B8C] focus:ring-[#0A3B8C] border-slate-300"
            />
            <span>⭐ Mostrar solo los más vendidos</span>
          </label>
        </div>
      </div>

      {/* Dynamic Smart Combo Callout Banner (Matches current search/filter & invites user to write on WhatsApp) */}
      <div className="bg-gradient-to-r from-[#061B40] via-[#0A3B8C] to-[#061B40] text-white rounded-2xl p-4 sm:p-5 border border-[#FFC500]/40 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#FFC500] text-slate-950 flex items-center justify-center shrink-0 font-black shadow-sm">
            <Sparkles className="w-6 h-6 fill-slate-950" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#FFC500] block">
              ¡COMBO CAMBIO MANNOL! • Galón de aceite + Filtro y llévate un regalo de cortesía
            </span>
            <h3 className="text-sm sm:text-base font-black text-white leading-snug">
              {activeContextDescription
                ? `¿Buscas el Combo exacto para ${activeContextDescription}?`
                : "¿Quieres que te armemos el Combo exacto con el filtro de tu vehículo?"}
            </h3>
            <p className="text-xs text-slate-200">
              Escríbenos el modelo y año de tu carro y recibe precio oficial + <strong>¡Envío Gratis en Pedernales!</strong>
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/593983893231?text=${encodeURIComponent(
            `Hola LiderPro Pedernales, estoy buscando en el catálogo (${activeContextDescription || "Aceite y Filtro"}) y quiero saber exactamente qué Combo Cambio Mannol necesita mi vehículo.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto py-3 px-5 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shrink-0 shadow-lg transition-transform hover:scale-102"
        >
          <MessageCircle className="w-4 h-4 fill-black/10" />
          <span>Escribir para Saber Mi Combo</span>
        </a>
      </div>

      {/* Catalog Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
            Mostrando página {currentPage} de {totalPages} • Precios oficiales actualizados en Sede Pedernales
          </p>
        </div>

        {/* Quick Jump Pagination in header */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-black text-slate-800 flex items-center gap-1 cursor-pointer"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
            <span className="text-xs sm:text-sm font-black text-slate-900 px-2">
              Pág. {currentPage} de {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-black text-slate-800 flex items-center gap-1 cursor-pointer"
              aria-label="Página siguiente"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {paginatedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border-2 border-amber-300 p-8 sm:p-12 text-center space-y-5 max-w-2xl mx-auto shadow-md">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-3xl font-bold">
            💬
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-950">
            ¿No apareció &ldquo;{searchTerm}&rdquo; con esos filtros? ¡Te atendemos al instante por WhatsApp!
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            En nuestra bodega de <strong>Vía al Carmen (Frente a gasolinera Pedernales)</strong> tenemos más de 500 productos y equivalencias exactas. Escríbenos el modelo de tu vehículo y te damos el precio y combo exacto en 1 minuto.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/593983893231?text=${encodeURIComponent(
                `Hola LiderPro Pedernales, busqué "${searchTerm}" en la página web y necesito saber el producto o Combo Cambio Mannol exacto para mi vehículo.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-whatsapp !py-4 !px-6 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Consultar &ldquo;{searchTerm || "Mi Vehículo"}&rdquo; por WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full sm:w-auto btn-secondary !py-4 !px-6 text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer"
            >
              Ver Todo el Catálogo (366)
            </button>
          </div>
        </div>
      )}

      {/* Bottom Pagination Bar */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-slate-600 font-bold order-2 sm:order-1">
            Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} de{" "}
            {filteredProducts.length} productos
          </span>

          <div className="flex items-center gap-1.5 order-1 sm:order-2 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-black text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Primera
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4 text-slate-800" />
            </button>

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
                      className={`min-w-[38px] h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-[#0A3B8C] text-white shadow-sm ring-2 ring-[#0A3B8C]/20"
                          : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
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
              className="p-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Página siguiente"
            >
              <ChevronRight className="w-4 h-4 text-slate-800" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-black text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Última ({totalPages})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
