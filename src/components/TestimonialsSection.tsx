"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Wrench,
  Building2,
  Tractor,
  Car,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export type TestimonialCategory = "all" | "talleres" | "flotas" | "productivo" | "particulares";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  province: string;
  category: "talleres" | "flotas" | "productivo" | "particulares";
  categoryLabel: string;
  iconType: "wrench" | "truck" | "building" | "tractor" | "car";
  rating: number;
  badge: string;
  verifiedPurchase: string;
  quote: string;
  highlightMetric: string;
  initials: string;
  avatarBg: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "moreira-portoviejo",
    name: "Ing. Marcelo Moreira",
    role: "Director Técnico & Propietario",
    company: "Centro Automotriz Moreira",
    city: "Portoviejo",
    province: "Manabí",
    category: "talleres",
    categoryLabel: "Taller Multimarca",
    iconType: "wrench",
    rating: 5,
    badge: "Cliente Corporativo Recurrente",
    verifiedPurchase: "Baterías Bosch S4 PowerFrame + Mannol Sintético 5W-30",
    quote:
      "Llevamos más de un año abasteciendo nuestro taller con LíderPro. La gran ventaja es el respaldo técnico y que la guía de remisión con factura electrónica autorizada por el SRI nos llega al WhatsApp en minutos. Los pedidos llegan sellados e impecables desde Pedernales al día siguiente.",
    highlightMetric: "100% Cero garantías rechazadas",
    initials: "MM",
    avatarBg: "from-blue-600 to-indigo-800",
  },
  {
    id: "zambrano-santodomingo",
    name: "Carlos Zambrano V.",
    role: "Gerente de Operaciones de Flota",
    company: "Trans-Occidente Carga Pesada",
    city: "Santo Domingo",
    province: "Santo Domingo de los Tsáchilas",
    category: "flotas",
    categoryLabel: "Transporte Pesado & Carga",
    iconType: "truck",
    rating: 5,
    badge: "Flota de 18 Cabezales Hino & Freightliner",
    verifiedPurchase: "Mobil Delvac MX 15W-40 Canecas + Baterías 31 SHD",
    quote:
      "En el transporte de carga una hora de parada cuesta cientos de dólares. Con LíderPro compramos canecas cerradas de Mobil Delvac 15W-40 y baterías Grupo 31 con fecha de fabricación reciente. Precio mayorista directo, facturación electrónica y despacho puntual en el eje Santo Domingo - Quito.",
    highlightMetric: "-14% en costo operativo por km",
    initials: "CZ",
    avatarBg: "from-amber-600 to-orange-800",
  },
  {
    id: "pena-pedernales",
    name: "Ing. Xavier Peña S.",
    role: "Jefe de Mantenimiento de Estaciones de Bombeo",
    company: "Acuícola del Pacífico S.A.",
    city: "Cojimíes / Pedernales",
    province: "Manabí",
    category: "productivo",
    categoryLabel: "Sector Acuícola & Camaronero",
    iconType: "building",
    rating: 5,
    badge: "Operación Crítica de Campo 24/7",
    verifiedPurchase: "Baterías Ecuador Super Heavy Duty N150 + Aceites Hidráulicos ISO 68",
    quote:
      "Nuestras compuertas y motores diésel estacionarios dependen de un arranque certero con cada ciclo de marea. Tener el centro de distribución de LíderPro en Pedernales nos da respuesta inmediata el mismo día. La resistencia de las baterías Ecuador Heavy Duty ante la salinidad marina es insuperable.",
    highlightMetric: "Despacho el mismo día en zona norte",
    initials: "XP",
    avatarBg: "from-emerald-600 to-teal-800",
  },
  {
    id: "robalino-quito",
    name: "Téc. Diego Robalino",
    role: "Jefe de Patio & Diagnóstico",
    company: "Lubricentro Express El Inca",
    city: "Quito Norte",
    province: "Pichincha",
    category: "talleres",
    categoryLabel: "Centro de Lubricación & Frenos",
    iconType: "wrench",
    rating: 5,
    badge: "Distribución Mayorista Mensual",
    verifiedPurchase: "Filtros de Aire y Aceite Advance + Líquido ATE DOT 4",
    quote:
      "La calidad de los filtros Advance y de los fluidos sintéticos que distribuyen es de primer nivel. El soporte técnico por teléfono para cruzar códigos OEM de filtros nos ahorra tiempo en fosa y evita devoluciones de clientes particulares en Quito.",
    highlightMetric: "+450 mantenimientos al mes",
    initials: "DR",
    avatarBg: "from-blue-700 to-cyan-800",
  },
  {
    id: "lasso-guayaquil",
    name: "Lcda. Andrea Lasso",
    role: "Coordinadora Nacional de Mantenimiento",
    company: "Distribuidora L&G Logística",
    city: "Guayaquil / Durán",
    province: "Guayas",
    category: "flotas",
    categoryLabel: "Logística Urbana Comercial",
    iconType: "truck",
    rating: 5,
    badge: "Flota de 32 Furgones y Camionetas",
    verifiedPurchase: "Baterías Ecuador Full Equipo 42 + Valvoline 10W-40",
    quote:
      "Administramos 32 furgones de reparto continuo en Guayaquil y Durán. La facturación electrónica con RUC y retenciones del SRI con LíderPro es impecable para el departamento de contabilidad. Coordinamos los envíos consolidados y llegan al terminal sin demoras.",
    highlightMetric: "Facturación SRI 100% automatizada",
    initials: "AL",
    avatarBg: "from-indigo-600 to-purple-800",
  },
  {
    id: "paredes-losrios",
    name: "Ing. Juan Carlos Paredes",
    role: "Administrador de Maquinaria Agrícola",
    company: "Agro-Servicios del Litoral",
    city: "Babahoyo / Quevedo",
    province: "Los Ríos",
    category: "productivo",
    categoryLabel: "Maquinaria Agrícola & Cosecha",
    iconType: "tractor",
    rating: 5,
    badge: "Tractores John Deere & Cosechadoras",
    verifiedPurchase: "Mobil Delvac 15W-40 Tambores 55 Gal + Baterías 27 HP",
    quote:
      "Durante la zafra la maquinaria trabaja 18 horas diarias sin descanso en condiciones de polvo y humedad. Pedimos tambores sellados de fábrica con precinto de seguridad intacto. Con LíderPro tenemos la certeza absoluta de producto 100% original sin alteraciones.",
    highlightMetric: "Precintos de fábrica 100% originales",
    initials: "JP",
    avatarBg: "from-green-700 to-emerald-900",
  },
  {
    id: "salazar-ambato",
    name: "Mst. Gabriel Salazar",
    role: "Comité de Mantenimiento de Flota",
    company: "Transportes Unidos del Centro",
    city: "Ambato",
    province: "Tungurahua",
    category: "flotas",
    categoryLabel: "Cooperativa de Transporte Interprovincial",
    iconType: "truck",
    rating: 5,
    badge: "Buses Interprovinciales Hino 500 & Mercedes",
    verifiedPurchase: "Baterías Super Heavy Duty 31 SHD + Filtros AAK-102",
    quote:
      "Para cruzar la cordillera en rutas como Alóag o El Cajas se necesita amperaje de arranque en frío real. Las baterías 31 SHD y los filtros de aire de trabajo pesado que nos despacha LíderPro rinden en altitud extrema sobre los 3,500 metros sin caídas de tensión.",
    highlightMetric: "Arranque garantizado en altura >3,500m",
    initials: "GS",
    avatarBg: "from-blue-800 to-slate-900",
  },
  {
    id: "tumbaco-manta",
    name: "Edwin Tumbaco",
    role: "Conductor y Propietario",
    company: "Chevrolet D-Max 3.0 Diésel (Uso Particular y Mixto)",
    city: "Manta",
    province: "Manabí",
    category: "particulares",
    categoryLabel: "Camionetas & Particulares",
    iconType: "car",
    rating: 5,
    badge: "Cliente Particular Verificado",
    verifiedPurchase: "Batería Ecuador 24 HP Tapa Roja + Filtro Sintético 3614",
    quote:
      "Mi camioneta no arrancaba un domingo en la tarde. Me comuniqué al WhatsApp de LíderPro, me asesoraron con el código exacto según la ficha técnica de la D-Max y coordinaron el despacho con prueba de carga. El trato fue sumamente profesional y respetuoso.",
    highlightMetric: "Atención técnica en <3 minutos",
    initials: "ET",
    avatarBg: "from-cyan-700 to-blue-900",
  },
];

const CATEGORIES = [
  { id: "all", label: "Todos los Sectores", count: TESTIMONIALS.length },
  { id: "talleres", label: "Talleres & Lubricadoras", count: 2 },
  { id: "flotas", label: "Flotas & Transporte", count: 3 },
  { id: "productivo", label: "Sector Acuícola & Agro", count: 2 },
  { id: "particulares", label: "Camionetas & Particulares", count: 1 },
] as const;

export default function TestimonialsSection() {
  const [activeCategory, setActiveCategory] = useState<TestimonialCategory>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter items according to active category
  const filteredTestimonials = activeCategory === "all"
    ? TESTIMONIALS
    : TESTIMONIALS.filter((item) => item.category === activeCategory);

  // Responsive itemsPerPage calculation
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet: 2 cards
      } else {
        setItemsPerPage(3); // Desktop: 3 cards
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerPage);

  // Reset index when changing category
  const handleCategoryChange = (cat: TestimonialCategory) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play timer (every 5.5 seconds)
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, maxIndex, handleNext]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
    setIsPaused(false);
  };

  const renderSectorIcon = (iconType: TestimonialItem["iconType"]) => {
    switch (iconType) {
      case "wrench":
        return <Wrench className="w-3.5 h-3.5" />;
      case "truck":
        return <Truck className="w-3.5 h-3.5" />;
      case "building":
        return <Building2 className="w-3.5 h-3.5" />;
      case "tractor":
        return <Tractor className="w-3.5 h-3.5" />;
      case "car":
        return <Car className="w-3.5 h-3.5" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5" />;
    }
  };

  const wholesaleWhatsAppUrl = buildWhatsAppLink("fleet_bulk", {
    neededItem: "Portafolio Institucional y Despachos para Flotas/Talleres",
    details: "Hola LíderPro Ecuador, vi los testimonios de flotas y talleres en su página web y deseo solicitar una cotización institucional / lista de precios mayorista para mi negocio.",
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50/80 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-soft relative overflow-hidden space-y-8">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* 1. Header with Trust Credentials */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A3B8C]/10 border border-[#0A3B8C]/20 text-[#0A3B8C] rounded-full text-xs font-black tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0A3B8C]" />
              <span>Respaldo Institucional Comprobado en Ecuador</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Lo que dicen talleres, flotas y sectores productivos
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Experiencias reales de ingenieros, jefes de mantenimiento y operadores comerciales que confían en nuestro suministro de baterías, lubricantes y filtros con factura electrónica SRI y entrega nacional.
            </p>
          </div>

          {/* Institutional KPI Strip */}
          <div className="grid grid-cols-3 sm:flex sm:flex-nowrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2 bg-white p-2.5 sm:px-4 sm:py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs text-center sm:text-left">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1">
                  <span className="text-sm sm:text-base font-black text-slate-950 leading-none">4.9</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400">/ 5.0</span>
                </div>
                <span className="text-[8.5px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Calificación
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2 bg-white p-2.5 sm:px-4 sm:py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs text-center sm:text-left">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xs">
                24
              </div>
              <div>
                <span className="text-sm sm:text-base font-black text-slate-950 leading-none block">Provincias</span>
                <span className="text-[8.5px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Cobertura
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2 bg-emerald-50 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl border border-emerald-200/80 shadow-2xs text-center sm:text-left">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="text-xs sm:text-xs font-black text-emerald-950 leading-none block">Factura SRI</span>
                <span className="text-[8.5px] sm:text-[10px] font-bold text-emerald-700 tracking-wider block">
                  100% Legal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Filter Pills + Rotator Controls */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Sector Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar sm:flex-wrap w-full sm:w-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id as TestimonialCategory)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? "bg-[#0A3B8C] text-white shadow-sm shadow-[#0A3B8C]/30 ring-2 ring-[#0A3B8C]/20"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Rotator Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-mono font-bold text-slate-400 mr-1 hidden sm:inline">
              {String(currentIndex + 1).padStart(2, "0")} / {String(Math.max(1, maxIndex + 1)).padStart(2, "0")}
            </span>

            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? "Reanudar rotación automática" : "Pausar rotación automática"}
              className="w-9 h-9 sm:w-8.5 sm:h-8.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all hover:border-slate-300 shadow-2xs active:scale-95 touch-manipulation"
              title={isPaused ? "Reanudar reproducción automática" : "Pausar rotación automática"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              onClick={handlePrev}
              disabled={filteredTestimonials.length <= itemsPerPage}
              aria-label="Testimonio anterior"
              className="w-9 h-9 sm:w-8.5 sm:h-8.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:border-slate-300 shadow-2xs hover:-translate-x-0.5 active:scale-95 touch-manipulation"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              disabled={filteredTestimonials.length <= itemsPerPage}
              aria-label="Siguiente testimonio"
              className="w-9 h-9 sm:w-8.5 sm:h-8.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:border-slate-300 shadow-2xs hover:translate-x-0.5 active:scale-95 touch-manipulation"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. Animated Testimonials Rotator Carousel */}
        <div
          className="relative z-10 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {filteredTestimonials.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3"
              >
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 h-full flex flex-col justify-between space-y-4 shadow-sm hover:shadow-card hover:border-[#0A3B8C]/40 transition-all duration-300 relative group">
                  {/* Top Row: Sector Badge + Verified Check */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-800 transition-colors">
                      {renderSectorIcon(item.iconType)}
                      <span>{item.categoryLabel}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verificado SRI</span>
                    </span>
                  </div>

                  {/* Rating Stars & Key Metric */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-extrabold text-blue-900 bg-blue-50/80 px-2 py-0.5 rounded-full border border-blue-100">
                      {item.highlightMetric}
                    </span>
                  </div>

                  {/* Quote Body with Quote Icon */}
                  <div className="relative flex-1">
                    <Quote className="w-6 h-6 text-slate-200 absolute -top-1 -left-1 -z-0 opacity-60" />
                    <p className="text-xs text-slate-700 leading-relaxed relative z-10 font-normal">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Verified Purchase Tag */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 flex items-start gap-2">
                    <span className="text-xs">📦</span>
                    <div className="leading-tight">
                      <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider">
                        Suministro Comprobado:
                      </span>
                      <span className="text-slate-600 line-clamp-1">{item.verifiedPurchase}</span>
                    </div>
                  </div>

                  {/* Client Info & Geolocation */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                    {/* Avatar Initials with Gradient */}
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.avatarBg} text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0`}
                    >
                      {item.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-black text-slate-950 truncate">
                        {item.name}
                      </span>
                      <span className="block text-[11px] font-medium text-slate-600 truncate">
                        {item.role} • {item.company}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{item.city}, {item.province}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Slide Indicator Dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center items-center gap-1.5 pt-2">
            {[...Array(maxIndex + 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir al grupo de testimonios ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentIndex === idx ? "w-6 bg-[#0A3B8C]" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}

        {/* 5. Institutional Bottom Banner CTA */}
        <div className="relative z-10 bg-gradient-to-r from-[#061B40] via-[#0A3B8C] to-[#061B40] rounded-2xl p-4 sm:p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 flex-shrink-0">
              <Sparkles className="w-5 h-5 fill-amber-300 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                ¿Administras una flota, taller o instalación productiva en Ecuador?
              </h3>
              <p className="text-xs text-blue-100">
                Accede a tarifas mayoristas por volumen, crédito comercial calificado y despacho prioritario.
              </p>
            </div>
          </div>

          <a
            href={wholesaleWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("b2b_whatsapp_click", { source: "testimonials_section_cta" })}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FFC500] via-[#FDB813] to-[#FFC500] text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Cotizar Flota o Taller por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
