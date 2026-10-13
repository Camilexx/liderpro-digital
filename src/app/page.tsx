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
  Zap,
  Layers,
  Camera,
  CheckCircle2,
  Sparkles,
  Award,
  Car,
  Tractor,
  Bike,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import EmergencyBanner from "@/components/EmergencyBanner";
import LocationsLogisticsSection from "@/components/LocationsLogisticsSection";
import FAQSection from "@/components/FAQSection";
import { PRODUCTS, OFFICIAL_BRANDS, ApplicationType } from "@/data/products";
import { EDUCATIONAL_ARTICLES } from "@/data/articles";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface VehicleSegment {
  id: ApplicationType | "todos";
  icon: typeof Car;
  title: string;
  subtitle: string;
  badge: string;
}

const VEHICLE_SEGMENTS: VehicleSegment[] = [
  {
    id: "autos",
    icon: Car,
    title: "Autos & SUVs Familiares",
    subtitle: "Sintéticos 5W-30 / Baterías 11-13 Placas.",
    badge: "Livianos & SUVs",
  },
  {
    id: "camionetas",
    icon: Truck,
    title: "Camionetas 4x4 & Diésel",
    subtitle: "15W-40 CK-4 / Baterías 27R y Reforzadas (D-Max, Hilux).",
    badge: "4x4 Trabajo",
  },
  {
    id: "pesado",
    icon: Tractor,
    title: "Sector Productivo, Camaroneras & Pesados",
    subtitle: "Canecas, Tambores, Baterías Grupo 31.",
    badge: "Mayorista / Flotas",
  },
  {
    id: "motos",
    icon: Bike,
    title: "Motos & Delivery",
    subtitle: "Motul 4T, Mannol Moto, Baterías Compactas de Gel.",
    badge: "4 Tiempos Ester",
  },
];

export default function HomePage() {
  const [selectedSegment, setSelectedSegment] = useState<ApplicationType | "todos">("todos");

  const filteredProducts =
    selectedSegment === "todos"
      ? PRODUCTS.slice(0, 8)
      : PRODUCTS.filter((p) => p.applicationType === selectedSegment);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* 01: HERO SECTION — Distribuidor Autorizado Multimarca desde Hub Pedernales */}
      <section className="pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: High-Conversion Value Proposition */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-950 text-white rounded-full text-[11px] font-bold tracking-wider uppercase shadow-sm border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>🟢 Stock disponible en Pedernales para despacho nacional</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-slate-950 leading-[1.06]">
              Distribuidor Autorizado Multimarca.
              <br />
              <span className="bg-gradient-to-r from-[#0A3B8C] via-[#0D47A1] to-[#0A3B8C] bg-clip-text text-transparent">
                Desde Pedernales a todo el Ecuador.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
              Centro de operaciones y despacho mayorista/minorista en <strong>Pedernales, Manabí</strong>. Abastecemos autos, camionetas 4x4, camaroneras, transporte pesado y motos con las marcas líderes del mercado y alcance logístico a las 24 provincias.
            </p>

            {/* High-Impact CTAs with Satin Shine */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#buscador"
                className="btn-primary btn-shine !py-4 !px-7 text-xs font-black tracking-wider flex items-center justify-center gap-2.5 text-center group"
              >
                <Search className="w-4 h-4" />
                <span>BUSCAR POR MI VEHÍCULO</span>
                <span className="text-white/80 group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <a
                href={buildWhatsAppLink("quick_compatibility")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-4 !px-6 text-xs font-black tracking-wider flex items-center justify-center gap-2.5 text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>COTIZAR EN SEDE PEDERNALES</span>
              </a>
            </div>

            {/* Reassurance Microcopy Badges */}
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garantía de Fábrica y Facturación SRI</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Envíos diarios por Reina del Camino, Trans Esmeraldas y Enetsa</span>
              </div>
            </div>
          </div>

          {/* Right: Studio Automotive Photography Stage */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 group">
              <Image
                src="/images/hero/automotive-hero.jpg"
                alt="LiderPro Distribuidor Autorizado Multimarca Pedernales Ecuador"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

              {/* Floating Quality Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/40 shadow-lg text-slate-900 flex items-center gap-1.5 text-xs font-black animate-float-slow">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Mostrador Técnico Multimarca</span>
              </div>

              {/* Bottom Card Ribbon */}
              <div className="absolute bottom-4 left-5 right-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold tracking-wide">
                    Hub Central: Pedernales, Manabí
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-200 bg-slate-900/75 px-2.5 py-1 rounded-md border border-slate-700/70 w-fit">
                  Despacho a las 24 Provincias
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02: FRANJA DE CONFIANZA DE MARCAS OFICIALES (Brand Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up delay-100">
        <div className="bg-slate-100/80 border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
              <Award className="w-4 h-4 text-brand-primary" />
              <span>Respaldo de Marcas Oficiales de Alta Rotación en Ecuador</span>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              Lotes 100% Originales • Sellados de Fábrica
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {OFFICIAL_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="border border-slate-200/80 bg-white shadow-sm rounded-lg py-2.5 px-3 font-semibold text-slate-800 flex flex-col items-center justify-center text-center hover:border-slate-400 hover:-translate-y-0.5 transition-all"
              >
                <span className="text-xs font-black tracking-tight text-slate-950">
                  {brand.name}
                </span>
                <span className="text-[9.5px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                  {brand.specialty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02.5: PRODUCTOS CON MAYOR ROTACIÓN Y MÁS VENDIDOS EN BODEGA PEDERNALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up">
        <div className="bg-gradient-to-br from-blue-50/80 via-white to-amber-50/50 border border-blue-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#061B40] text-[#FFC500] rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm mb-2">
                <span>⭐ ALTA ROTACIÓN & MÁS VENDIDOS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Productos con Mayor Demanda en Mostrador Pedernales
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Los artículos con mayor rotación diaria en lubricantes, baterías y aditivos de alta demanda. Stock físico verificado para retiro en local o despacho express interprovincial.
              </p>
            </div>
            <a
              href={buildWhatsAppLink("fleet_bulk", {
                neededItem: "Productos Más Vendidos en Pedernales",
                city: "Pedernales / Despacho Nacional",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold !py-2.5 !px-5 text-xs font-black self-start md:self-auto shrink-0 shadow-md"
            >
              <span>Consultar Stock de Mayor Salida</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 03: SELECTOR TÁCTIL POR TIPO DE VEHÍCULO (Segmentación en 1 Clic) + CATÁLOGO MULTIMARCA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-fade-up delay-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
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
              Ver todas las líneas ({PRODUCTS.length})
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
                </div>
                <div className="text-[11px] font-black text-[#0A3B8C] flex items-center gap-1 pt-1">
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
                  ? "Catálogo Multimarca de Alta Rotación"
                  : `Productos para ${
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

      {/* 04: TERMINAL DE COMPATIBILIDAD INTELIGENTE (Acceso Rápido al Buscador) */}
      <section id="buscador" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-[#061B40] to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-[#0A3B8C]/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-[#FFC500] rounded-full text-xs font-black uppercase tracking-wider">
              <Search className="w-3.5 h-3.5" />
              <span>Buscador Oficial de Compatibilidad Vehicular</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              ¿Quieres saber qué batería o lubricante exacto usa tu modelo?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Cruza más de 30 marcas de vehículos en Ecuador (Chevrolet D-Max, Kia Sportage, Toyota Hilux, Hyundai Tucson, Hino, motos) con nuestro motor de compatibilidad técnica verificado en bodega.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <Link
              href="/encuentra-tu-producto"
              className="btn-primary btn-shine !py-4 !px-6 text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <Search className="w-4 h-4" />
              <span>ABRIR BUSCADOR POR VEHÍCULO</span>
            </Link>
            <Link
              href="/productos"
              className="btn-gold !py-4 !px-6 text-xs font-black uppercase tracking-wider text-center shadow-lg"
            >
              <span>EXPLORAR TODO EL CATÁLOGO (507)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 05: B2B / CAMARONERAS / FLOTAS / CANECAS BANNER */}
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
              Despachamos canecas de 5 galones, tambores de 55 galones (Mannol / Mobil 15W-40 CK-4) y baterías de servicio pesado Baterías Ecuador Grupo 31 para camaroneras, maquinaria, cooperativas y talleres mecánicos.
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

      {/* 06: CATEGORÍAS PRINCIPALES */}
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
                NS40 (11 Placas), 34 HP I (80 Amp), 42 HP (62 Amp), 27R Reforzada y Grupo 31 Heavy Duty.
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
                  Fram • Bosch • Mannol
                </span>
                <Wrench className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-blue-700 transition-colors">
                Filtración y Químicos
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Filtros blindados de aceite y diésel, Refrigerante Mannol Pro Cool OAT 50/50 y Ceramo Ester.
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
                  Identificación por Foto
                </span>
                <Camera className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-black text-lg text-slate-950 group-hover:text-emerald-800 transition-colors">
                Asesoría por Muestra o Manual
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Envíanos foto de tu batería actual, etiqueta de aceite o matrícula para validación inmediata.
              </p>
            </div>
            <div className="text-xs font-black text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Solicitar asistencia</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* 07: EMERGENCY BATTERY COMMAND CENTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmergencyBanner />
      </section>

      {/* 08: HUB LOGÍSTICO PEDERNALES — Despacho Nacional */}
      <LocationsLogisticsSection />

      {/* 09: GUIDES (Editorial selection) */}
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

      {/* 10: FAQ SECTION */}
      <FAQSection />

      {/* 11: FINAL HIGH-CONVERSION CTA BANNER */}
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
            Baterías Ecuador, Bosch, Mannol, Motul, Mobil, Havoline, Castrol y Fram con facturación SRI y envío diario a las 24 provincias.
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
