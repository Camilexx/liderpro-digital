"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  Wrench,
  Search,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Layers,
  Camera,
  CheckCircle2,
  Sparkles,
  Award,
  Car,
  Tractor,
  Bike,
  ShieldCheck,
  FileCheck2,
  MapPin,
  Phone,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import EmergencyBanner from "@/components/EmergencyBanner";
import LocationsLogisticsSection from "@/components/LocationsLogisticsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { PRODUCTS, OFFICIAL_BRANDS, ApplicationType, Product } from "@/data/products";
import { EDUCATIONAL_ARTICLES } from "@/data/articles";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface VehicleSegment {
  id: ApplicationType | "todos";
  icon: typeof Car;
  title: string;
  subtitle: string;
  badge: string;
  examples: string;
}

const VEHICLE_SEGMENTS: VehicleSegment[] = [
  {
    id: "autos",
    icon: Car,
    title: "Autos & SUVs Familiares",
    subtitle: "Sintéticos 5W-30 / Baterías 42HP a 24HP.",
    badge: "Livianos & SUVs",
    examples: "Chevrolet Sail, Aveo, Kia Sportage, Hyundai Tucson, Toyota Yaris",
  },
  {
    id: "camionetas",
    icon: Truck,
    title: "Camionetas 4x4 & Diésel",
    subtitle: "15W-40 CK-4 / Baterías 27R y Reforzadas.",
    badge: "4x4 Trabajo",
    examples: "Chevrolet D-Max, Toyota Hilux, Mazda BT-50, Ford Ranger, VW Amarok",
  },
  {
    id: "pesado",
    icon: Tractor,
    title: "Sector Productivo, Camaroneras & Pesados",
    subtitle: "Canecas 5GL, Tambores 55GL, Baterías Grupo 31.",
    badge: "Mayorista / Flotas",
    examples: "Hino 500/300, Isuzu FTR, Granjas Camaroneras, Motores Estacionarios",
  },
  {
    id: "motos",
    icon: Bike,
    title: "Motos & Delivery",
    subtitle: "Motul 4T Ester, Mannol Moto, Baterías Gel.",
    badge: "4 Tiempos Ester",
    examples: "Bajaj Pulsar, Shineray, Daytona, Honda, Yamaha, Flotas de Reparto",
  },
];

// Top Curated Best Sellers by Category (Verified Active SKUs from Unified Excel)
const BEST_SELLER_SKUS_BY_CATEGORY: Record<string, string[]> = {
  todos: [
    "03024-HP-I",   // Batería Ecuador 24 HP High Power (85A Tapa Roja)
    "LP-LUR-010",   // Mannol Chevrolet/Opel OEM 5W-30 Sintético
    "03042-HP",     // Batería Ecuador 42 HP High Power (62A)
    "LP-LUR-008",   // Mannol Classic 10W-40 Semisintético
    "03027-HP",     // Batería Ecuador 27 HP High Power (95A Diésel)
    "LP-LUR-006",   // Mannol TS-4 SHPD 15W-40 Diésel Pesado
    "03031-SHD",    // Batería Ecuador 31 SHD Pesada / Camaroneras
    "LP-LUR-003",   // Mannol Refrigerante Rojo G12+ 5 Años
  ],
  baterias_ecuador: [
    "03024-HP-I",   // Batería Ecuador 24 HP I High Power 85 Amp (Tapa Roja)
    "03042-HP",     // Batería Ecuador 42 HP High Power 62 Amp
    "03027-HP",     // Batería Ecuador 27 HP High Power 95 Amp (Camionetas)
    "03031-SHD",    // Batería Ecuador 31 SHD Super Heavy Duty 105 Amp
    "03034-HP",     // Batería Ecuador 34 HP High Power 80 Amp
    "030NS40-HP",   // Batería Ecuador NS40 HP High Power 45 Amp (Asiáticos)
    "03024-FE",     // Batería Ecuador 24 FE Full Equipo 65 Amp
    "030N150-SHD",  // Batería Ecuador N150 SHD Super Heavy Duty 160 Amp
  ],
  mannol: [
    "LP-LUR-010",   // Mannol Chevrolet Opel OEM 5W-30 Sintético
    "LP-LUR-008",   // Mannol Classic 10W-40 Semisintético
    "LP-LUR-006",   // Mannol TS-4 SHPD 15W-40 Extra Diésel
    "LP-LUR-007",   // Mannol Safari 20W-50 Alto Rendimiento
    "LP-LUR-011",   // Mannol Toyota Lexus OEM 5W-30 Metálico
    "LP-LUR-003",   // Mannol Refrigerante Rojo G12+ 5 Años
    "LP-LUR-013",   // Mannol Ceramic 5W-30 Sintético Avanzado
    "LP-LUR-020",   // Mannol Diesel TDI 5W-30 Sintético
  ],
};

const BEST_SELLER_TABS = [
  { id: "todos", label: "⭐ Selección Insignia (Ambas Marcas)", count: 8 },
  { id: "baterias_ecuador", label: "🔋 Baterías Ecuador (Línea Oficial)", count: 8 },
  { id: "mannol", label: "🇩🇪 Mannol Alemania (Lubricantes & Químicos)", count: 8 },
] as const;

// Curated 8-Product Showcase representing all distributor categories
const CURATED_SHOWCASE_SKUS = [
  "03024-HP-I",   // Batería Ecuador 24 HP High Power
  "42HPS4",       // Batería Bosch 42 HP S4 55AMP
  "LP-LUR-010",   // Mannol Chevrolet/Opel OEM 5W-30
  "LP-LUR-002-2", // Mobil Delvac MX 15W-40 Galón
  "LP-FIL-002",   // Filtro Advance Aire Hilux / Fortuner
  "LP-LUR-002-4", // Motul Moto 5000 10W-40 4T
  "078AO-1539",   // Filtro Aceite Chevrolet D-Max 3.0 / 2.5
  "03031-SHD",    // Batería Ecuador 31 SHD Super Heavy Duty 105 Amp
];

// Popular Vehicle Quick-Access Pills for Ecuador Market
const POPULAR_VEHICLES = [
  { label: "Chevrolet D-Max 3.0 / 2.5 Diésel", query: "Chevrolet D-Max" },
  { label: "Toyota Hilux 2.7 Gas. / 2.4 Diésel", query: "Toyota Hilux" },
  { label: "Chevrolet Sail / Aveo Family", query: "Chevrolet Sail" },
  { label: "Kia Sportage Active / Revolution", query: "Kia Sportage" },
  { label: "Hyundai Tucson / Santa Fe", query: "Hyundai Tucson" },
  { label: "Hino 500 Series / Pesados", query: "Hino 500" },
  { label: "Motos 4T (150cc - 250cc)", query: "Motul Moto 4T" },
  { label: "Sector Camaronero / Motores Estacionarios", query: "Canecas y Baterías 31" },
];

export default function HomePage() {
  const [selectedSegment, setSelectedSegment] = useState<ApplicationType | "todos">("todos");
  const [bestSellerCategory, setBestSellerCategory] = useState<"todos" | "baterias_ecuador" | "mannol">("todos");

  // Retrieve curated products safely
  const displayedBestSellers = (
    BEST_SELLER_SKUS_BY_CATEGORY[bestSellerCategory] || BEST_SELLER_SKUS_BY_CATEGORY.todos
  )
    .map((sku) => PRODUCTS.find((p) => p.sku === sku))
    .filter(Boolean) as Product[];

  const defaultShowcaseProducts = CURATED_SHOWCASE_SKUS.map((sku) =>
    PRODUCTS.find((p) => p.sku === sku)
  ).filter(Boolean) as Product[];

  const filteredProducts =
    selectedSegment === "todos"
      ? defaultShowcaseProducts
      : PRODUCTS.filter((p) => p.applicationType === selectedSegment)
          .sort((a, b) => {
            if (a.isBestSeller && !b.isBestSeller) return -1;
            if (!a.isBestSeller && b.isBestSeller) return 1;
            return a.name.localeCompare(b.name);
          })
          .slice(0, 8);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 01: HERO SECTION — Distribuidor Autorizado Multimarca desde Hub Pedernales */}
      <section className="pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: High-Conversion Value Proposition */}
          <div className="lg:col-span-6 space-y-5 text-left">
            {/* Live Operational Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-950 text-white rounded-full text-[11px] font-bold tracking-wider uppercase shadow-sm border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>🟢 Stock disponible en Pedernales para despacho nacional</span>
            </div>

            {/* Main Headline with Satin Brand Gradient */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3rem] font-black tracking-tight text-slate-950 leading-[1.08]">
              Distribuidor Autorizado Multimarca.
              <br />
              <span className="bg-gradient-to-r from-[#0A3B8C] via-[#0D47A1] to-[#0A3B8C] bg-clip-text text-transparent">
                Baterías, Lubricantes y Filtros en Ecuador.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Centro de acopio matriz y mostrador técnico en <strong>Pedernales, Manabí</strong>. Abastecemos con despacho diario a nivel nacional a vehículos livianos, camionetas 4x4, flotas comerciales, cooperativas de transporte y sector camaronero con marcas originales y garantía de fábrica.
            </p>

            {/* Quick Metrics Bar: 4 Institutional Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3 text-center shadow-2xs hover:bg-white transition-colors">
                <span className="block text-lg sm:text-xl font-black text-[#0A3B8C]">+500</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Referencias</span>
              </div>
              <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3 text-center shadow-2xs hover:bg-white transition-colors">
                <span className="block text-lg sm:text-xl font-black text-emerald-600">24 Provincias</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Despacho Diario</span>
              </div>
              <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3 text-center shadow-2xs hover:bg-white transition-colors">
                <span className="block text-lg sm:text-xl font-black text-slate-900">100% SRI</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lote Original</span>
              </div>
              <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3 text-center shadow-2xs hover:bg-white transition-colors">
                <span className="block text-lg sm:text-xl font-black text-amber-600">Mayorista</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">& Mostrador</span>
              </div>
            </div>

            {/* High-Impact CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#buscador"
                className="btn-primary btn-shine !py-3.5 !px-6 text-xs font-black tracking-wider flex items-center justify-center gap-2.5 text-center group"
              >
                <Search className="w-4 h-4" />
                <span>BUSCAR POR MI VEHÍCULO</span>
                <span className="text-white/80 group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <a
                href={buildWhatsAppLink("quick_compatibility")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-3.5 !px-6 text-xs font-black tracking-wider flex items-center justify-center gap-2.5 text-center shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>COTIZAR EN SEDE PEDERNALES</span>
              </a>
            </div>

            {/* Reassurance Microcopy Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garantía de Fábrica Baterías Ecuador & Bosch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Facturación Electrónica SRI Inmediata</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Despacho Express 24h a Nivel Nacional</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Protagonism Physical Store Showcase (Clean & Unblocked) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative aspect-[1024/837] rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-2xl bg-slate-950 group">
              <Image
                src="/images/hero/local-pedernales.jpg"
                alt="Sede Central y Local Comercial LiderPro en Pedernales Manabí - Distribuidor Multimarca"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Minimal Top Sky Badges (Only in sky area, zero overlap on store) */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-lg text-white flex items-center gap-2 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sede Matriz Física • Pedernales, Manabí</span>
              </div>

              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-lg text-slate-950 flex items-center gap-1.5 text-[11px] font-black">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Punto de Venta & Bodega</span>
              </div>
            </div>

            {/* Information & Quick Access Strip (Placed OUTSIDE image to ensure 100% photo visibility) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-sm space-y-2.5">
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 px-1 gap-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mostrador Comercial & Bodega Pedernales</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+593983893231"
                    className="inline-flex items-center gap-1.5 text-[11px] font-black text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                    title="Llamar directo al local en Pedernales"
                  >
                    <Phone className="w-3 h-3 text-blue-700" />
                    <span>Directo: 098 389 3231</span>
                  </a>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 hidden sm:inline">
                    📦 Stock Físico
                  </span>
                </div>
              </div>

              {/* Clean Quick Category Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                <Link
                  href="/baterias"
                  className="px-2.5 py-2 bg-slate-50 hover:bg-[#0A3B8C] hover:text-white text-slate-800 rounded-xl text-center text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>⚡ Baterías</span>
                </Link>
                <Link
                  href="/lubricantes"
                  className="px-2.5 py-2 bg-slate-50 hover:bg-amber-600 hover:text-white text-slate-800 rounded-xl text-center text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>🛢️ Lubricantes</span>
                </Link>
                <Link
                  href="/filtros"
                  className="px-2.5 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-800 rounded-xl text-center text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>🛡️ Filtros</span>
                </Link>
                <Link
                  href="/b2b"
                  className="px-2.5 py-2 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-800 rounded-xl text-center text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>📦 Flotas / B2B</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02: FRANJA INSTITUCIONAL DE MARCAS OFICIALES (Brand Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm">
          {/* Institutional Heading */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-[10.5px] font-black uppercase tracking-wider text-[#0A3B8C]">
                <Award className="w-3.5 h-3.5" />
                <span>Distribuidor Autorizado Multimarca • Sede Pedernales</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Marcas Oficiales con Respaldo y Garantía de Fábrica
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Abastecimiento directo 100% original con respaldo técnico de los fabricantes líderes mundiales y facturación legal SRI.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Sellado de Fábrica</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Facturación SRI Inmediata</span>
              </div>
            </div>
          </div>

          {/* Official Brands Grid — Prominent Institutional Showcase */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
            {OFFICIAL_BRANDS.map((brand) => (
              <Link
                key={brand.name}
                href={`/productos?marca=${encodeURIComponent(brand.name)}`}
                title={`Ver catálogo oficial de ${brand.name}`}
                className="group relative bg-white border border-slate-200/90 hover:border-[#0A3B8C]/60 rounded-2xl p-4 sm:p-5 flex items-center justify-center transition-all duration-300 shadow-2xs hover:shadow-lg hover:-translate-y-1 overflow-hidden min-h-[96px] sm:min-h-[112px]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative w-full h-12 sm:h-14 flex items-center justify-center">
                  <Image
                    src={brand.logoUrl}
                    alt={`Logo oficial ${brand.name} Ecuador`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-contain p-1 filter drop-shadow-2xs group-hover:scale-110 transition-transform duration-300 ease-out"
                  />
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0A3B8C]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03: PRODUCTOS FLAGSHIP CON MAYOR ROTACIÓN EN MOSTRADOR PEDERNALES: MANNOL Y BATERÍAS ECUADOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up">
        <div className="bg-gradient-to-br from-white via-slate-50/70 to-blue-50/30 border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-sm">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-5 border-b border-slate-200/70">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#061B40] text-[#FFC500] rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MARCAS INSIGNIA OFICIALES · BODEGA MATRIZ PEDERNALES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                Selección Más Vendida: Baterías Ecuador & Mannol
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Las dos líneas líderes con mayor salida y demanda diaria en nuestro mostrador físico y despachos interprovinciales. Baterías de arranque pesado con garantía escrita y lubricación sintética alemana certificada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="tel:+593983893231"
                className="btn-secondary !py-2.5 !px-4 text-xs font-black shadow-sm flex items-center justify-center gap-2 border-slate-300 hover:border-slate-400"
                title="Llamar directo al local en Pedernales"
              >
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span>Local: 098 389 3231</span>
              </a>
              <a
                href="https://wa.me/593983893231?text=Hola%20LiderPro%20Pedernales%2C%20deseo%20consultar%20disponibilidad%20de%20Bater%C3%ADas%20Ecuador%20y%20aceites%20Mannol."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-2.5 !px-4 text-xs font-black shadow-md flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Mostrador WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Dual Brand Institutional Presentation Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pillar A: Baterías Ecuador */}
            <div className="bg-gradient-to-br from-[#061B40] to-[#0A3B8C] text-white p-5 sm:p-6 rounded-2xl border border-[#FFC500]/30 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#FFC500] bg-white/10 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                    🔋 Baterías Ecuador Oficial
                  </span>
                  <span className="text-[10px] font-bold bg-[#FFC500] text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Sponsor Oficial La Tri (FEF)
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Líder Nacional en Arranque y Trabajo Pesado
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Tecnología Calcio-Plata 100% libre de mantenimiento. Modelos High Power Tapa Roja (24HP, 42HP, 27HP) y Super Heavy Duty 31 SHD para camaroneras y flotas de transporte.
                </p>
                <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-amber-300 font-semibold">
                  <span>✓ 18 a 24 Meses de Garantía</span>
                  <span>•</span>
                  <span>✓ Diagnóstico Previo en Local</span>
                  <span>•</span>
                  <span>✓ Entrega a Nivel Nacional</span>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setBestSellerCategory("baterias_ecuador")}
                  className="font-bold text-[#FFC500] hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Ver Modelos Baterías Ecuador</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/baterias"
                  className="text-[11px] text-slate-300 hover:text-white underline decoration-slate-400"
                >
                  Línea completa baterías
                </Link>
              </div>
            </div>

            {/* Pillar B: Mannol Alemania */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-[#061B40] text-white p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-white/10 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                    🇩🇪 Mannol · Made in Germany
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Certificación OEM Alemania
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Lubricación Sintética de Alta Tecnología
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Homologaciones directas Mercedes-Benz, BMW, VW y GM Dexos. Aceites 5W-30 OEM, 10W-40 Classic, 15W-40 TS-4 Diésel Pesado y Refrigerantes Orgánicos OAT G12+.
                </p>
                <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-emerald-300 font-semibold">
                  <span>✓ 100% Sellado de Fábrica</span>
                  <span>•</span>
                  <span>✓ Litros, Galones y Canecas</span>
                  <span>•</span>
                  <span>✓ Máxima Durabilidad del Motor</span>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setBestSellerCategory("mannol")}
                  className="font-bold text-emerald-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Ver Catálogo Mannol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/lubricantes"
                  className="text-[11px] text-slate-300 hover:text-white underline decoration-slate-400"
                >
                  Línea completa lubricantes
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Category Tabs for the Two Brands */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
            {BEST_SELLER_TABS.map((tab) => {
              const isActive = bestSellerCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setBestSellerCategory(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 border flex items-center gap-2 ${
                    isActive
                      ? "bg-[#061B40] text-white border-[#061B40] shadow-sm scale-102"
                      : "bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isActive ? "bg-white/20 text-[#FFC500]" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {displayedBestSellers.map((prod, idx) => (
              <ProductCard key={prod.id} product={prod} priority={idx < 4} />
            ))}
          </div>

          {/* Bottom Reassurance Institutional Footer Strip */}
          <div className="mt-6 pt-5 border-t border-slate-200/70 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-600 bg-white/70 p-4 rounded-2xl border border-slate-200/60">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garantía Oficial Directa (18-24 Meses)</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-700 shrink-0" />
                <span>Despacho Diario Interprovincial a 24 Provincias</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-slate-700 shrink-0" />
                <span>Facturación Legal SRI Inmediata</span>
              </div>
            </div>
            <Link
              href="/productos"
              className="text-xs font-black text-[#0A3B8C] hover:text-[#061B40] transition-colors flex items-center gap-1.5 uppercase tracking-wider shrink-0"
            >
              <span>Ver catálogo completo ({PRODUCTS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 04: SELECTOR TÁCTIL POR TIPO DE VEHÍCULO + CATÁLOGO MULTIMARCA CURADO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#0A3B8C]">
              Segmentación Táctil en 1 Clic
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Selecciona tu Tipo de Vehículo u Operación
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Filtra al instante baterías, lubricantes y filtros según el requerimiento real de tu motor o flota.
            </p>
          </div>

          {selectedSegment !== "todos" && (
            <button
              type="button"
              onClick={() => setSelectedSegment("todos")}
              className="btn-secondary !py-2 !px-4 !text-xs self-start md:self-auto"
            >
              Ver selección destacada multimarca ({PRODUCTS.length} totales)
            </button>
          )}
        </div>

        {/* 4 Tactile Vehicle Segment Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VEHICLE_SEGMENTS.map((seg) => {
            const isActive = selectedSegment === seg.id;
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() =>
                  setSelectedSegment(isActive ? "todos" : (seg.id as ApplicationType))
                }
                className={`card-interactive p-5 text-left flex flex-col justify-between gap-3 cursor-pointer ${
                  isActive
                    ? "!border-[#0A3B8C] !bg-blue-50/50 ring-2 ring-[#0A3B8C]/20"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`p-2.5 rounded-xl ${
                      isActive
                        ? "bg-[#0A3B8C] text-[#FFC500]"
                        : "bg-blue-50 text-[#0A3B8C] group-hover:bg-[#0A3B8C] group-hover:text-white"
                    } transition-colors`}
                  >
                    <seg.icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                      isActive
                        ? "bg-[#0A3B8C] text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {seg.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-950 leading-snug">
                    {seg.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {seg.subtitle}
                  </p>
                  <p className="text-[10.5px] text-slate-500 mt-1.5 font-medium line-clamp-1">
                    {seg.examples}
                  </p>
                </div>
                <div className="text-[11px] font-black text-[#0A3B8C] flex items-center gap-1 pt-1 border-t border-slate-100">
                  <span>{isActive ? "Mostrando selección" : "Filtrar catálogo"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Multi-Brand Product Grid */}
        <div className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-base sm:text-lg font-black text-slate-950">
                {selectedSegment === "todos"
                  ? "Catálogo Multimarca de Alta Rotación (Baterías, Aceites y Filtros)"
                  : `Productos Especializados para ${
                      VEHICLE_SEGMENTS.find((s) => s.id === selectedSegment)?.title
                    }`}
              </h3>
            </div>
            <Link
              href="/productos"
              className="text-xs font-black text-[#0A3B8C] hover:text-blue-900 transition-colors flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Ver catálogo completo ({PRODUCTS.length} referencias)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 05: TERMINAL DE COMPATIBILIDAD VEHICULAR & BUSCADOR RÁPIDO */}
      <section id="buscador" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-[#061B40] to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-[#0A3B8C]/40 shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-[#FFC500] rounded-full text-xs font-black uppercase tracking-wider">
                <Search className="w-3.5 h-3.5" />
                <span>Buscador Oficial de Compatibilidad Vehicular</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                ¿Buscas la batería, aceite o filtro exacto para tu modelo?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Cruza más de 30 marcas vehiculares en Ecuador (Chevrolet, Toyota, Kia, Hyundai, Hino, Suzuki, motos) con verificación de polaridad, amperaje CCA y viscosidad de fábrica.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <Link
                href="/encuentra-tu-producto"
                className="btn-primary btn-shine !py-3.5 !px-6 text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <Search className="w-4 h-4" />
                <span>ABRIR BUSCADOR POR VEHÍCULO</span>
              </Link>
              <Link
                href="/productos"
                className="btn-gold !py-3.5 !px-6 text-xs font-black uppercase tracking-wider text-center shadow-lg"
              >
                <span>EXPLORAR CATÁLOGO (366)</span>
              </Link>
            </div>
          </div>

          {/* Quick-Access Popular Vehicle Tags for Instant WhatsApp Pre-fill */}
          <div className="pt-4 border-t border-slate-800 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Consultas Frecuentes en Mostrador Pedernales (Haz clic para cotizar al instante):
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_VEHICLES.map((v) => (
                <a
                  key={v.label}
                  href={buildWhatsAppLink("vehicle", {
                    vehicleMake: v.label,
                    neededItem: "Batería / Lubricante recomendado",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-slate-800/90 hover:bg-[#0A3B8C] active:bg-[#0A3B8C] text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700/80 transition-all flex items-center gap-1.5 active:scale-95 touch-manipulation shadow-xs"
                >
                  <span>{v.label}</span>
                  <span className="text-emerald-400 text-[10px]">WhatsApp →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06: PILARES INSTITUCIONALES LIDERPRO — ¿Por qué elegirnos? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
              Confianza & Respaldo Oficial
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              ¿Por qué confiar en LiderPro para tu vehículo o flota?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Operamos con estándares técnicos que garantizan la máxima vida útil de tu motor y la tranquilidad de una compra segura.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-[#0A3B8C] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-950 text-base">Garantía Real de Fábrica</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Productos sellados con trazabilidad y garantía de procedencia en marcas como Baterías Ecuador, Bosch, Mannol, Motul y Mobil.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-950 text-base">Facturación Electrónica SRI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprobantes electrónicos autorizados por el SRI, válidos para deducción de gastos y crédito tributario de empresas y personas naturales.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-950 text-base">Embalaje Antiderrame</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Protocolo estricto de transporte: sellado térmico en lubricantes y canecas; anclaje técnico vertical y aislamiento de bornes en baterías.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-800 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-950 text-base">Asesoría Técnica Previa</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Validamos manual de fabricante, amperaje CCA, polaridad y viscosidad SAE por WhatsApp antes de enviar para garantizar compatibilidad exacta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 07: B2B / CAMARONERAS / FLOTAS / CANECAS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-7 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/15 border border-amber-400/30 rounded-full text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>Abastecimiento Mayorista, Camaroneras y Flotas</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black tracking-tight">
              ¿Requieres Aceites en Caneca/Tambor o Baterías Grupo 31?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Despachamos canecas de 5 galones, tambores de 55 galones (Mannol / Mobil 15W-40 CK-4, Aroil Hidráulico ISO 68) y baterías pesadas Baterías Ecuador Grupo 31 para camaroneras, maquinaria agrícola y flotas de transporte.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <a
              href={buildWhatsAppLink("fleet_bulk", {
                neededItem: "Aceites en Caneca/Tambor o Baterías Grupo 31",
                city: "Pedernales / Envío Nacional",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !py-4 !px-7 text-xs font-black uppercase tracking-wider text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>COTIZAR POR MAYOR / FLOTAS</span>
            </a>
            <Link
              href="/b2b"
              className="btn-ghost-dark !py-4 !px-5 text-xs font-bold text-center"
            >
              <span>Canal B2B</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 08: EXPLORA POR CATEGORÍA TÉCNICA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Líneas Oficiales en Stock
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Explora por Categoría Técnica
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/baterias"
            className="card-interactive p-6 flex flex-col justify-between h-52 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-[#0A3B8C] border border-blue-200/80">
                  Baterías Ecuador & Bosch
                </span>
                <Zap className="w-5 h-5 text-[#0A3B8C]" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-[#0A3B8C] transition-colors">
                Baterías Automotrices e Industriales
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                NS40 (11 Placas), 34 HP (80 Amp), 42 HP (62 Amp), 27R Reforzada y Grupo 31 Heavy Duty.
              </p>
            </div>
            <div className="text-xs font-black text-[#0A3B8C] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver baterías</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/lubricantes"
            className="card-interactive p-6 flex flex-col justify-between h-52 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-100">
                  Mannol • Motul • Mobil • Havoline • Castrol
                </span>
                <Layers className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-amber-800 transition-colors">
                Aceites y Lubricantes
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Sintéticos 5W-30 API SP, Diésel 15W-40 CK-4 (Galón, Caneca, Tambor) y Motul 4T Ester.
              </p>
            </div>
            <div className="text-xs font-black text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver lubricantes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/filtros"
            className="card-interactive p-6 flex flex-col justify-between h-52 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                  Advance Filters • Bosch • ATE
                </span>
                <Wrench className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-blue-700 transition-colors">
                Filtración, Frenos y Químicos
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Filtros sintéticos 15.000 km, kits industriales para camiones, líquido de frenos ATE DOT 4 y refrigerantes.
              </p>
            </div>
            <div className="text-xs font-black text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver filtros y químicos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/asesoria"
            className="card-interactive p-6 flex flex-col justify-between h-52 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">
                  Validación Técnica Inmediata
                </span>
                <Camera className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-emerald-800 transition-colors">
                Asesoría por Muestra o Manual
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Envíanos foto de tu batería actual, etiqueta de aceite o matrícula para validación directa antes de comprar.
              </p>
            </div>
            <div className="text-xs font-black text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Solicitar asistencia</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* 09: EMERGENCY BATTERY COMMAND CENTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmergencyBanner />
      </section>

      {/* 10: HUB LOGÍSTICO PEDERNALES — Despacho a 24 Provincias */}
      <LocationsLogisticsSection />

      {/* 11: TESTIMONIOS & CASOS DE ÉXITO VERIFICADOS (Rotatorio Animado Institucional) */}
      <TestimonialsSection />

      {/* 12: GUIDES (Editorial selection) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Criterio Técnico Automotriz
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Guías de Diagnóstico y Mantenimiento
            </h2>
          </div>
          <Link
            href="/guias"
            className="text-xs font-black text-slate-900 hover:text-brand-primary transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Ver todas las guías</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATIONAL_ARTICLES.slice(0, 2).map((art) => (
            <div
              key={art.slug}
              className="card-interactive p-7 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0A3B8C] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200/80">
                    {art.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {art.readTime}
                  </span>
                </div>
                <h3 className="font-black text-xl text-slate-950">
                  <Link href={`/guias/${art.slug}`} className="hover:text-brand-primary transition-colors">
                    {art.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {art.subtitle}
                </p>
              </div>

              <Link
                href={`/guias/${art.slug}`}
                className="btn-secondary !w-fit !py-2.5 !px-4 text-xs font-bold flex items-center gap-1.5 group"
              >
                <span>Leer Guía Completa</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 13: FAQ SECTION */}
      <FAQSection />

      {/* 14: FINAL HIGH-CONVERSION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#061B40] via-slate-950 to-black text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 border border-[#0A3B8C]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A3B8C] via-[#FFC500] to-[#0A3B8C]" />

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-slate-200 uppercase tracking-wider mx-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>🟢 Stock disponible en Pedernales para despacho nacional</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
            Cotiza directo con nuestro mostrador técnico en Pedernales
          </h2>
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Baterías Ecuador, Bosch, Mannol, Motul, Mobil, Havoline, Castrol, Advance y ATE con facturación SRI y despacho diario a las 24 provincias.
          </p>
          <div className="pt-2">
            <a
              href={buildWhatsAppLink("quick_compatibility")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !py-4 !px-10 !text-sm font-black uppercase tracking-wider inline-flex items-center gap-2.5 shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/50"
            >
              <MessageCircle className="w-5 h-5" />
              <span>HABLAR CON UN ASESOR POR WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Mobile WhatsApp CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-2.5 sm:hidden shadow-2xl flex items-center gap-2">
        <a
          href="#buscador"
          className="flex-1 py-3 px-2 text-center bg-slate-900 active:bg-slate-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Buscar Producto</span>
        </a>
        <a
          href={buildWhatsAppLink("quick_compatibility")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-2 btn-whatsapp font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Asesor WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
