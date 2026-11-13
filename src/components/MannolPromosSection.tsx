"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Gift,
  Truck,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Car,
  Tractor,
  ShieldCheck,
  ShoppingBag,
  Check,
  Phone,
} from "lucide-react";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { useWhatsAppSelector } from "@/context/WhatsAppSelectorContext";
import { PRODUCTS } from "@/data/products";
import { trackEvent } from "@/lib/analytics";

interface ComboVariant {
  id: string;
  badge: string;
  title: string;
  vehicles: string;
  oilName: string;
  oilSku: string;
  oilPrice: number;
  filterName: string;
  filterPrice: number;
  courtesyGift: string;
  totalPrice: number;
  imageUrl: string;
}

interface MannolCombo {
  id: string;
  comboNumber: string;
  segmentTitle: string;
  headline: string;
  offerSubtitle: string;
  extraBenefit: string;
  icon: typeof Car;
  accentColor: string;
  variants: ComboVariant[];
}

const MANNOL_COMBOS: MannolCombo[] = [
  {
    id: "combo-autos",
    comboNumber: "COMBO 1 • AUTOS, SUVs & TAXIS",
    segmentTitle: "Autos Livianos por Marca Específica",
    headline: "¡COMBO CAMBIO MANNOL!",
    offerSubtitle: "Galón de aceite + Filtro y llévate un regalo de cortesía",
    extraBenefit: "¡Envío Gratis en Pedernales!",
    icon: Car,
    accentColor: "from-amber-400 via-[#FFC500] to-amber-500",
    variants: [
      {
        id: "1A",
        badge: "Opción 1A • Semisintético 10W-40",
        title: "Mannol Classic 10W-40 (Galón) + Filtro",
        vehicles: "Chevrolet Aveo, Sail, Corsa, Kia Sportage, Hyundai Accent, Tucson, Nissan Sentra",
        oilName: "Galón Aceite Mannol Classic 10W-40 Semisintético",
        oilSku: "012MN7501-4",
        oilPrice: 34.57,
        filterName: "Filtro de Aceite Blindado Advance (AO-1051 / AO-3387)",
        filterPrice: 2.17,
        courtesyGift: "Regalo de Cortesía: Aditivo Limpiaparabrisas Mannol o Ambientador Areon",
        totalPrice: 36.74,
        imageUrl: "/images/combos/combo-1A.jpg",
      },
      {
        id: "1B",
        badge: "Opción 1B • 100% Sintético 5W-30 Metálico",
        title: "Mannol Energy Formula JP 5W-30 (Galón) + Filtro",
        vehicles: "Chevrolet Onix, Tracker, Captiva, Sail Nuevo, Kia Rio, Picanto, Soluto, Toyota Yaris",
        oilName: "Galón Aceite Sintético Mannol Energy Formula JP 5W-30",
        oilSku: "012MN7914-4A",
        oilPrice: 38.09,
        filterName: "Filtro de Aceite Original Advance (AO-3387 / AO-2807)",
        filterPrice: 2.17,
        courtesyGift: "Regalo de Cortesía: Silicona Tablero Mannol o Ambientador Europeo",
        totalPrice: 40.26,
        imageUrl: "/images/combos/combo-1B.jpg",
      },
      {
        id: "1C",
        badge: "Opción 1C • Taxis & Alto Kilometraje 20W-50",
        title: "Mannol Safari 20W-50 (Galón) + Filtro",
        vehicles: "Taxis en servicio continuo, Chevrolet Corsa, Vitara, Suzuki Forza y motores +150.000 km",
        oilName: "Galón Aceite Mannol Safari 20W-50 Alto Rendimiento",
        oilSku: "012MN7404-4A",
        oilPrice: 31.13,
        filterName: "Filtro de Aceite Blindado Advance",
        filterPrice: 2.17,
        courtesyGift: "Regalo de Cortesía: Limpiador Automotriz o Ambientador de Cortesía",
        totalPrice: 33.30,
        imageUrl: "/images/combos/combo-1C.jpg",
      },
    ],
  },
  {
    id: "combo-camionetas",
    comboNumber: "COMBO 2 • CAMIONETAS 4X4 & DIÉSEL",
    segmentTitle: "Camionetas de Trabajo y Doble Cabina (Capacidad 7L)",
    headline: "¡COMBO CAMBIO MANNOL!",
    offerSubtitle: "Kit 7 Litros de aceite + Filtro y llévate un regalo de cortesía",
    extraBenefit: "¡Envío Gratis en Pedernales!",
    icon: Truck,
    accentColor: "from-emerald-400 via-emerald-500 to-teal-500",
    variants: [
      {
        id: "2A",
        badge: "Opción 2A • Diésel Pesado 15W-40 SHPD",
        title: "Kit Lubricación Mannol TS-4 15W-40 (Galón + 2 Litros) + Filtro",
        vehicles: "Chevrolet Luv D-Max 2.5 / 3.0 Diésel, Toyota Hilux 2.5 / 3.0, Mazda BT-50, Great Wall Wingle",
        oilName: "Kit Lubricación Camioneta Mannol TS-4 Extra SHPD 15W-40 (Galón + Litros adicionales sellados)",
        oilSku: "012MN7104-5A",
        oilPrice: 57.96,
        filterName: "Filtro de Aceite Camioneta Diésel Advance (AO-1539 / AO-222)",
        filterPrice: 4.13,
        courtesyGift: "Regalo de Cortesía: Aditivo Diésel o Limpiador de Inyectores de Cortesía",
        totalPrice: 62.09,
        imageUrl: "/images/combos/combo-2A.jpg",
      },
      {
        id: "2B",
        badge: "Opción 2B • Common Rail Sintético 5W-40",
        title: "7 Litros Mannol Diesel Turbo 5W-40 + Filtro",
        vehicles: "Chevrolet D-Max CRDi Moderna, Toyota Hilux Revo / Fortuner, VW Amarok, Great Wall Poer",
        oilName: "Kit Lubricación Camioneta Mannol Diesel Turbo 5W-40 Sintético (Galón + Litros adicionales sellados)",
        oilSku: "012MN7904-5",
        oilPrice: 77.47,
        filterName: "Filtro de Aceite Blindado Advance Alta Presión",
        filterPrice: 4.13,
        courtesyGift: "Regalo de Cortesía: Tratamiento Diésel Ester Mannol de Cortesía",
        totalPrice: 81.60,
        imageUrl: "/images/combos/combo-2B.jpg",
      },
      {
        id: "2C",
        badge: "Opción 2C • Camionetas a Gasolina 10W-40",
        title: "6 Litros Mannol Classic 10W-40 (Galón + 2L) + Filtro",
        vehicles: "Chevrolet Luv D-Max 2.4 / 3.5 Gasolina, Toyota Hilux 2.7 Gasolina, Wingle Gasolina",
        oilName: "Kit Lubricación Camioneta Mannol Classic 10W-40 Semisintético (Galón + Litros adicionales sellados)",
        oilSku: "012MN7501-4",
        oilPrice: 53.79,
        filterName: "Filtro de Aceite Camioneta Gasolina Advance (AO-3614ST)",
        filterPrice: 2.61,
        courtesyGift: "Regalo de Cortesía: Silicona Protectora Mannol Cockpit Care",
        totalPrice: 56.40,
        imageUrl: "/images/combos/combo-2C.jpg",
      },
    ],
  },
  {
    id: "combo-pesados",
    comboNumber: "COMBO 3 • PESADOS, CAMIONES & CAMARONERAS",
    segmentTitle: "Canecas de 20 Litros para Flotas y Maquinaria",
    headline: "¡COMBO CAMBIO MANNOL!",
    offerSubtitle: "Caneca 20L de aceite + Filtro y llévate un regalo de cortesía",
    extraBenefit: "¡Envío Gratis en Pedernales!",
    icon: Tractor,
    accentColor: "from-blue-400 via-[#0A3B8C] to-indigo-500",
    variants: [
      {
        id: "3A",
        badge: "Opción 3A • Caneca 20L Diésel 15W-40 SHPD",
        title: "Caneca 20L Mannol TS-4 15W-40 + Filtro Pesado",
        vehicles: "Camiones Hino 300/500, Isuzu FTR/NLR, Volquetas, Motores y Bombas de Camaroneras",
        oilName: "Caneca 20 Litros Mannol TS-4 Extra SHPD 15W-40 API CI-4",
        oilSku: "012MN7104-20A",
        oilPrice: 102.17,
        filterName: "Filtro de Servicio Pesado Advance",
        filterPrice: 6.52,
        courtesyGift: "Regalo de Cortesía: Grasa de Litio Mannol 800g o Refrigerante 1L",
        totalPrice: 108.69,
        imageUrl: "/images/combos/combo-3A.jpg",
      },
      {
        id: "3B",
        badge: "Opción 3B • Caneca 20L Semisintético 10W-40 UHPD",
        title: "Caneca 20L Mannol TS-5 UHPD 10W-40 + Filtro",
        vehicles: "Cabezales de Ruta Larga, Flotas Modernas Euro IV/V, Buses Interprovinciales",
        oilName: "Caneca 20 Litros Mannol TS-5 UHPD 10W-40 Semisintético",
        oilSku: "012MN7105-20",
        oilPrice: 105.22,
        filterName: "Filtro de Aceite Heavy Duty Advance",
        filterPrice: 6.52,
        courtesyGift: "Regalo de Cortesía: Grasa Alta Temperatura Mannol LC-2 o Aditivo Diésel",
        totalPrice: 111.74,
        imageUrl: "/images/combos/combo-3B.jpg",
      },
      {
        id: "3C",
        badge: "Opción 3C • Caneca 20L Hidráulico ISO 68",
        title: "Caneca 20L Mannol Hydro HV ISO 68 + Complemento",
        vehicles: "Retroexcavadoras, Tractores Agrícolas, Sistemas Hidráulicos y Equipos Camaroneros",
        oilName: "Caneca 20 Litros Mannol Hydro HV ISO 68 Hidráulico",
        oilSku: "012MN2203-20",
        oilPrice: 86.96,
        filterName: "Filtro / Sellador Industrial Advance",
        filterPrice: 4.91,
        courtesyGift: "Regalo de Cortesía: Grasa Multiuso Mannol o Limpiador Industrial",
        totalPrice: 91.87,
        imageUrl: "/images/combos/combo-3C.jpg",
      },
    ],
  },
];

const QUICK_VEHICLE_MATCHES = [
  { label: "🚗 Chevrolet Aveo / Sail / Spark", comboIdx: 0, varIdx: 0 },
  { label: "🚙 Kia Sportage / Hyundai Tucson", comboIdx: 0, varIdx: 1 },
  { label: "🚕 Taxi / Auto Alto Kilometraje", comboIdx: 0, varIdx: 2 },
  { label: "🛻 D-Max / Hilux Diésel Trabajo", comboIdx: 1, varIdx: 0 },
  { label: "⚡ D-Max CRDi / Hilux Revo Moderna", comboIdx: 1, varIdx: 1 },
  { label: "🚛 Camión Hino / Isuzu / Camaronera", comboIdx: 2, varIdx: 0 },
];

export default function MannolPromosSection() {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({
    "combo-autos": 0,
    "combo-camionetas": 0,
    "combo-pesados": 0,
  });
  const [highlightedCombo, setHighlightedCombo] = useState<string | null>(null);
  const [addedComboId, setAddedComboId] = useState<string | null>(null);
  const { addItem } = useQuoteBasket();
  const { openSelector } = useWhatsAppSelector();

  const handleQuickVehicleClick = (comboIdx: number, varIdx: number) => {
    const combo = MANNOL_COMBOS[comboIdx];
    setSelectedVariants((prev) => ({ ...prev, [combo.id]: varIdx }));
    setHighlightedCombo(combo.id);
    setTimeout(() => setHighlightedCombo(null), 2600);
    const el = document.getElementById(combo.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleAddComboToBasket = (combo: MannolCombo, variant: ComboVariant) => {
    const baseProd = PRODUCTS.find((p) => p.brand.toUpperCase() === "MANNOL") || PRODUCTS[0];
    addItem(
      {
        ...baseProd,
        id: `combo-${combo.id}-${variant.id}`,
        sku: `COMBO-${variant.id}-${variant.oilSku}`,
        name: `¡COMBO CAMBIO MANNOL! ${variant.title} (+ Regalo MANNOL 6145 Cockpit Care + Esponja)`,
        brand: "MANNOL",
        volume: variant.badge.split("•")[1]?.trim() || "Combo Completo",
        imageUrl: variant.imageUrl,
        price: null,
        priceEstimate: undefined,
      },
      1
    );
    setAddedComboId(`${combo.id}-${variant.id}`);
    trackEvent("add_mannol_combo", { combo: combo.id, variant: variant.id });
    setTimeout(() => setAddedComboId(null), 2200);
  };

  return (
    <section
      id="promociones-mannol"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 animate-fade-up"
    >
      {/* Dark Automotive Real Aesthetic Container */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#040D21] via-[#071636] to-[#0B1F47] text-white border-2 border-[#FFC500]/40 shadow-2xl p-6 sm:p-10 lg:p-12 space-y-8">
        {/* Ambient Golden Backlight Glows (Estética Taller Nocturno / Contraluz Dorado) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFC500]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Banner */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/15">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 bg-[#FFC500] text-slate-950 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>PROMOCIÓN EXCLUSIVA MANNOL ALEMANIA • SEDE PEDERNALES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.08]">
              ¡COMBO CAMBIO <span className="text-[#FFC500]">MANNOL!</span>
            </h2>

            <p className="text-base sm:text-lg font-extrabold text-amber-200 leading-snug">
              Galón de aceite + Filtro y llévate un regalo de cortesía •{" "}
              <span className="text-emerald-400 underline decoration-emerald-400/60">
                ¡Envío Gratis en Pedernales!
              </span>
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Lubricantes alemanes 100% originales sellados de fábrica + Filtro blindado Advance con precios oficiales actualizados de mostrador. Selecciona tu vehículo aquí abajo o elige entre las 3 variantes de cada combo.
            </p>
          </div>

          {/* Official Location & Direct Phone Box */}
          <div className="bg-slate-950/80 backdrop-blur-md border border-[#FFC500]/30 rounded-2xl p-4 sm:p-5 space-y-2.5 shrink-0 lg:w-80">
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-[#FFC500] shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-white block uppercase tracking-wide">
                  Dirección Oficial Pedernales:
                </span>
                <span className="text-slate-300 font-semibold">
                  Vía al Carmen (Frente a gasolinera Pedernales)
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <a
                href="tel:+593983893231"
                className="flex items-center gap-1.5 text-xs font-black text-[#FFC500] hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>098 389 3231</span>
              </a>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10.5px] font-black uppercase">
                🚚 Envío Gratis Local
              </span>
            </div>
          </div>
        </div>

        {/* Interactive 1-Click Vehicle Selector for Adults */}
        <div className="relative z-10 bg-white/5 border border-white/15 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-black text-[#FFC500] uppercase tracking-wider flex items-center gap-2">
              <span>👇 ¿Qué vehículo tienes? Toca tu modelo para ver tu Combo exacto:</span>
            </span>
            <span className="text-[11px] text-slate-300 font-medium">
              Botones interactivos de selección rápida
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {QUICK_VEHICLE_MATCHES.map((m) => (
              <button
                key={m.label}
                type="button"
                onClick={() => handleQuickVehicleClick(m.comboIdx, m.varIdx)}
                className="py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-[#FFC500] text-white hover:text-slate-950 font-black text-xs sm:text-sm border border-white/15 hover:border-[#FFC500] text-left flex items-center justify-between transition-all cursor-pointer shadow-sm active:scale-98"
              >
                <span>{m.label}</span>
                <span className="text-[11px] font-extrabold text-[#FFC500] group-hover:text-slate-950 shrink-0 ml-2">
                  Ver Combo →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Main Combo Cards (Each with 3 Interactive Variants) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MANNOL_COMBOS.map((combo) => {
            const activeVarIdx = selectedVariants[combo.id] ?? 0;
            const currentVar = combo.variants[activeVarIdx];
            const Icon = combo.icon;
            const isHighlighted = highlightedCombo === combo.id;
            const isAdded = addedComboId === `${combo.id}-${currentVar.id}`;

            const whatsappMessage = `¡Hola LiderPro! Vengo de la web y deseo cotizar el *${combo.headline}* (${currentVar.title}) que incluye *Galón/Aceite + Filtro + Regalo de Cortesía (MANNOL 6145 Cockpit Care 1L + Esponja Original)* y *Envío Gratis en Pedernales*. Mi vehículo es: `;

            return (
              <div
                key={combo.id}
                id={combo.id}
                className={`rounded-3xl bg-slate-950/90 border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
                  isHighlighted
                    ? "border-[#FFC500] ring-4 ring-[#FFC500]/40 scale-[1.01]"
                    : "border-slate-700/90 hover:border-[#FFC500]/70"
                }`}
              >
                <div>
                  {/* Top Metallic Header Bar */}
                  <div className={`bg-gradient-to-r ${combo.accentColor} px-5 py-3 text-slate-950 flex items-center justify-between`}>
                    <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                      <Icon className="w-4 h-4 stroke-[2.5]" />
                      <span>{combo.comboNumber}</span>
                    </span>
                    <span className="px-2 py-0.5 bg-slate-950 text-[#FFC500] text-[10px] font-black rounded-md uppercase">
                      3 Variantes
                    </span>
                  </div>

                  {/* Combo Offer Header & Image Preview */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                        <Image
                          src={currentVar.imageUrl}
                          alt={currentVar.title}
                          fill
                          sizes="112px"
                          className="object-contain p-1.5 drop-shadow-md"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#FFC500]">
                          {combo.headline}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                          {combo.offerSubtitle}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-400">
                          <Truck className="w-3.5 h-3.5" />
                          <span>{combo.extraBenefit}</span>
                        </span>
                      </div>
                    </div>

                    {/* 3 Interactive Variant Buttons */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-300 block">
                        Elige la variante para tu motor (clic para cambiar):
                      </span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {combo.variants.map((v, idx) => {
                          const isSelected = idx === activeVarIdx;
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() =>
                                setSelectedVariants((prev) => ({
                                  ...prev,
                                  [combo.id]: idx,
                                }))
                              }
                              className={`w-full py-2.5 px-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer border flex items-center justify-between gap-2 ${
                                isSelected
                                  ? "bg-[#0A3B8C] text-white border-[#FFC500] shadow-md"
                                  : "bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-800"
                              }`}
                            >
                              <div className="truncate">
                                <span
                                  className={`font-black block ${
                                    isSelected ? "text-[#FFC500]" : "text-white"
                                  }`}
                                >
                                  {v.badge}
                                </span>
                                <span className="text-[11px] text-slate-300 block truncate">
                                  {v.title}
                                </span>
                              </div>
                              <span
                                className={`text-[10.5px] font-black shrink-0 px-2 py-1 rounded-lg ${
                                  isSelected
                                    ? "bg-[#FFC500] text-slate-950"
                                    : "bg-slate-800 text-emerald-400"
                                }`}
                              >
                                {isSelected ? "✓ Elegido" : "Elegir"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Selected Variant Detailed Breakdown */}
                    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-black text-amber-300 uppercase tracking-wider text-[11px]">
                          ¿Qué incluye esta variante?
                        </span>
                        <span className="font-mono text-[10.5px] text-slate-400">
                          Cód: {currentVar.oilSku}
                        </span>
                      </div>

                      <div className="space-y-2 text-slate-200">
                        <div className="flex items-start justify-between gap-2">
                          <span className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{currentVar.oilName}</span>
                          </span>
                          <span className="text-[10px] font-black text-emerald-400 uppercase shrink-0">
                            Incluido
                          </span>
                        </div>

                        <div className="flex items-start justify-between gap-2">
                          <span className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{currentVar.filterName}</span>
                          </span>
                          <span className="text-[10px] font-black text-emerald-400 uppercase shrink-0">
                            Incluido
                          </span>
                        </div>

                        <div className="flex items-start justify-between gap-2 text-amber-300 font-bold bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                          <span className="flex items-start gap-1.5">
                            <Gift className="w-4 h-4 text-[#FFC500] shrink-0 mt-0.5" />
                            <span>Regalo: MANNOL 6145 Cockpit Care 1L + Esponja Original</span>
                          </span>
                          <span className="px-1.5 py-0.5 bg-[#FFC500] text-slate-950 text-[10px] font-black rounded uppercase shrink-0">
                            CORTESÍA
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <span className="text-[11px] font-bold text-slate-400 block">
                          Ideal para vehículos:
                        </span>
                        <p className="text-xs text-white font-semibold mt-0.5 leading-snug">
                          {currentVar.vehicles}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gift & Action Footer — Zero Public Prices */}
                <div className="p-5 sm:p-6 pt-0 space-y-3">
                  <div className="bg-gradient-to-r from-slate-900 to-[#061B40] border border-[#FFC500]/40 rounded-2xl p-3.5 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-300 block">
                        Cotización Inmediata + Regalo
                      </span>
                      <span className="text-sm sm:text-base font-black text-[#FFC500]">
                        🎁 Cotizar + Reclamar Regalo
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg text-[10.5px] font-black block">
                        🚚 ¡Envío Gratis!
                      </span>
                      <span className="text-[10px] text-slate-300 font-medium block mt-1">
                        Factura SRI Incluida
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        trackEvent("whatsapp_mannol_combo", {
                          combo: combo.id,
                          variant: currentVar.id,
                        });
                        openSelector({
                          itemTitle: `${combo.headline} — ${currentVar.title}`,
                          customMessage: whatsappMessage,
                          sku: currentVar.oilSku,
                          sourceLocation: "mannol_promo_card",
                        });
                      }}
                      className="btn-whatsapp !py-3.5 !px-4 !text-xs sm:!text-sm font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>🎁 Cotizar + Reclamar Regalo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddComboToBasket(combo, currentVar)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isAdded
                          ? "bg-emerald-600 text-white border-emerald-400"
                          : "bg-white/10 hover:bg-[#FFC500] text-white hover:text-slate-950 border-white/20 hover:border-[#FFC500]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>✓ Combo Añadido a Tu Lista</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-[#FFC500]" />
                          <span>+ Agregar Combo a Mi Lista</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call-To-Action Banner: "¿No estás seguro qué combo usa tu vehículo?" */}
        <div className="relative z-10 bg-gradient-to-r from-[#FFC500] via-amber-400 to-[#FDB813] text-slate-950 rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-slate-950 text-[#FFC500] px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Asesoría Gratuita para Gente Adulta y Conductores</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black tracking-tight text-slate-950">
              ¿No sabes qué aceite o filtro exacto lleva tu carro? ¡Nosotros te ayudamos!
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-800">
              Solo escríbenos qué carro tienes (ejemplo: &ldquo;Tengo un Aveo 2015&rdquo; o &ldquo;Tengo una D-Max&rdquo;) y te armamos el combo exacto al instante.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              openSelector({
                itemTitle: "Asesoría Combo Cambio MANNOL Exacto",
                customMessage:
                  "¡Hola LiderPro! Vengo de la web y necesito ayuda para saber qué ¡Combo Cambio MANNOL! (Galón de aceite + Filtro + Regalo MANNOL 6145 Cockpit Care + Esponja) necesita mi vehículo. Mi carro es: ",
                sourceLocation: "mannol_promo_bottom_cta",
              })
            }
            className="w-full lg:w-auto py-4 px-7 bg-slate-950 hover:bg-slate-900 text-[#FFC500] font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 shadow-xl shrink-0 transition-transform hover:scale-102 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] fill-current" />
            <span>Escribir para Saber Mi Combo Exacto</span>
          </button>
        </div>
      </div>
    </section>
  );
}
