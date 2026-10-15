"use client";

import React, { useState } from "react";
import {
  BatteryCharging,
  Droplets,
  Wrench,
  Container,
  MapPin,
  Clock,
  Truck,
  ShieldCheck,
  Send,
  CheckCircle2,
  Sparkles,
  PackageCheck
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface ProductTypeOption {
  id: string;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  packagingProtocol: string;
  popularBrands: string;
}

const PRODUCT_TYPES: ProductTypeOption[] = [
  {
    id: "bateria",
    name: "Batería Automotriz o Camión",
    badge: "Carga Pesada Sellada",
    icon: BatteryCharging,
    description: "Baterías selladas 12V libres de mantenimiento para autos, camionetas y equipo pesado.",
    packagingProtocol: "Capuchones plásticos aislantes en ambos bornes, base estabilizada y anclaje vertical rígido.",
    popularBrands: "Baterías Ecuador (Full Equipo) y Bosch (S4 Silver)",
  },
  {
    id: "aceite",
    name: "Aceites y Lubricantes de Motor",
    badge: "Líquidos Antiderrame",
    icon: Droplets,
    description: "Cuartos y galones sintéticos, semisintéticos y minerales para gasolina y diésel.",
    packagingProtocol: "Sello de inducción térmico verificado, precinto en tapas y bolsa de contención hermética.",
    popularBrands: "Mannol, Motul, Mobil, Havoline, Castrol",
  },
  {
    id: "filtros",
    name: "Filtros de Motor y Bujías",
    badge: "Piezas de Precisión",
    icon: Wrench,
    description: "Filtros de aceite, aire de motor, combustible, cabina y bujías de encendido.",
    packagingProtocol: "Cartón corrugado triple onda con amortiguación perimetral contra aplastamiento.",
    popularBrands: "Advance, Fram, Mann Filter, Bujías NGK Iridium/G-Power",
  },
  {
    id: "canecas",
    name: "Canecas 20L y Tambores 55 Gal",
    badge: "Mayorista e Industrial",
    icon: Container,
    description: "Lubricantes industriales y diésel pesado para sector camaronero, flotas y maquinaria.",
    packagingProtocol: "Paletizado rígido, precinto de seguridad industrial en boquilla y guía de carga pesada.",
    popularBrands: "Mobil Delvac, Mannol TS-7, Havoline SuperDiesel, Castrol",
  },
];

interface QuickCityOption {
  id: string;
  name: string;
  province: string;
  transitTime: "24h" | "24-48h" | "48h";
  transitLabel: string;
  transportType: string;
  cutoff: string;
}

const POPULAR_CITIES: QuickCityOption[] = [
  { id: "quito", name: "Quito", province: "Pichincha", transitTime: "24h", transitLabel: "24 Horas (Entrega al día siguiente)", transportType: "Courier a Domicilio o Transporte Interprovincial", cutoff: "Corte diario: 14:00 y 18:00" },
  { id: "guayaquil", name: "Guayaquil", province: "Guayas", transitTime: "24h", transitLabel: "24 Horas (Entrega al día siguiente)", transportType: "Encomienda Interprovincial Directa o Courier", cutoff: "Corte diario: 14:00 y 18:00" },
  { id: "santo-domingo", name: "Santo Domingo", province: "Sto. Domingo", transitTime: "24h", transitLabel: "24 Horas (Conexión Directa)", transportType: "Transporte Interprovincial Directo", cutoff: "Múltiples salidas diarias continuas" },
  { id: "manta", name: "Manta / Portoviejo", province: "Manabí", transitTime: "24h", transitLabel: "24 Horas (Ruta Costera Directa)", transportType: "Transporte Intercantonal Inmediato", cutoff: "Salidas directas por E382" },
  { id: "cuenca", name: "Cuenca", province: "Azuay", transitTime: "24-48h", transitLabel: "24 a 48 Horas", transportType: "Courier Express o Transporte de Carga", cutoff: "Corte diario: 14:00" },
  { id: "ambato", name: "Ambato", province: "Tungurahua", transitTime: "24-48h", transitLabel: "24 a 48 Horas", transportType: "Transporte Interprovincial Sierra Centro", cutoff: "Corte diario: 14:00" },
  { id: "machala", name: "Machala", province: "El Oro", transitTime: "24-48h", transitLabel: "24 a 48 Horas", transportType: "Transporte Directo de Carga y Encomiendas", cutoff: "Corte diario: 14:00" },
  { id: "esmeraldas", name: "Esmeraldas", province: "Esmeraldas", transitTime: "24h", transitLabel: "24 Horas (Troncal del Pacífico)", transportType: "Encomienda Directa Costa Norte", cutoff: "Corte diario: 14:00" },
  { id: "quevedo", name: "Quevedo / Babahoyo", province: "Los Ríos", transitTime: "24h", transitLabel: "24 Horas (Corredor Central)", transportType: "Transporte Interprovincial", cutoff: "Corte diario: 14:00" },
  { id: "lago-agrio", name: "Lago Agrio / El Coca", province: "Oriente", transitTime: "48h", transitLabel: "48 Horas (Sector Petrolero)", transportType: "Transporte de Carga Pesada e Industrial", cutoff: "Embarques diarios programados" },
  { id: "loja", name: "Loja", province: "Loja", transitTime: "48h", transitLabel: "48 Horas (Austro Sur)", transportType: "Transporte Interprovincial de Encomiendas", cutoff: "Corte diario: 14:00" },
];

export default function QuickDispatchAssistant() {
  const [selectedProduct, setSelectedProduct] = useState<ProductTypeOption>(PRODUCT_TYPES[0]);
  const [selectedCity, setSelectedCity] = useState<QuickCityOption>(POPULAR_CITIES[0]);
  const [customCityText, setCustomCityText] = useState<string>("");

  const effectiveCityName = customCityText.trim() ? customCityText.trim() : selectedCity.name;
  const effectiveProvince = customCityText.trim() ? "Ecuador" : selectedCity.province;
  const isCustomCity = Boolean(customCityText.trim());

  return (
    <div className="space-y-12">
      {/* 1. INTERACTIVE 3-STEP DISPATCH HELPER */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#061B40] via-[#092352] to-[#04122E] text-white space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-[#FFC500] border border-amber-400/40 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Asistente de Despacho Inmediato</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Cotiza tu Envío desde Bodega Pedernales en 3 Clics
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Selecciona el tipo de producto que necesitas y tu ciudad de destino para obtener la ficha logística exacta y solicitar tu cotización directa por WhatsApp.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* STEP 1: SELECT PRODUCT TYPE */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#061B40] text-[#FFC500] font-black text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wider">
                ¿Qué tipo de repuesto o lubricante necesitas enviar?
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRODUCT_TYPES.map((prod) => {
                const IconComponent = prod.icon;
                const isSelected = selectedProduct.id === prod.id;

                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      setSelectedProduct(prod);
                      trackEvent("shipping_product_type_select", { productType: prod.name });
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? "bg-[#061B40] text-white border-[#FFC500] ring-2 ring-[#FFC500]/40 shadow-lg -translate-y-0.5"
                        : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? "bg-white/10 text-[#FFC500]" : "bg-white text-brand-primary border border-slate-200"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          isSelected
                            ? "bg-amber-400/20 text-[#FFC500]"
                            : "bg-slate-200/70 text-slate-700"
                        }`}
                      >
                        {prod.badge}
                      </span>
                    </div>

                    <div>
                      <strong className={`block text-xs font-black leading-tight ${isSelected ? "text-white" : "text-slate-950"}`}>
                        {prod.name}
                      </strong>
                      <span className={`block text-[11px] leading-snug mt-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                        {prod.popularBrands}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SELECT DESTINATION */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#061B40] text-[#FFC500] font-black text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wider">
                ¿A qué ciudad o cantón va dirigido el paquete?
              </h4>
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-2">
              {POPULAR_CITIES.map((city) => {
                const isSelected = !isCustomCity && selectedCity.id === city.id;

                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => {
                      setSelectedCity(city);
                      setCustomCityText("");
                      trackEvent("shipping_city_select", { city: city.name });
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-[#0A2662] text-white border-[#FFC500] ring-1 ring-[#FFC500] shadow-sm font-black"
                        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/70"
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-[#FFC500]" : "text-slate-400"}`} />
                    <span>{city.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                        city.transitTime === "24h"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {city.transitTime}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Input for Any other Canton */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <span className="text-xs text-slate-500 font-bold shrink-0">
                ¿Otro cantón o provincia?
              </span>
              <input
                type="text"
                value={customCityText}
                onChange={(e) => setCustomCityText(e.target.value)}
                placeholder="Escribe tu cantón (ej: Chone, Salinas, Tulcán, Puyo, Pasaje)..."
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* STEP 3: LIVE LOGISTICS DISPATCH SHEET (RESULT CARD) */}
          <div className="p-6 sm:p-7 bg-gradient-to-br from-slate-900 via-[#061B40] to-slate-950 rounded-2xl text-white border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#FFC500] font-black uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ficha Técnica de Despacho Verificado</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  {selectedProduct.name} ➔ {effectiveCityName}
                </h4>
              </div>

              {/* Transit Time Callout */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300">
                <Clock className="w-5 h-5 text-emerald-400 animate-pulse" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">Tiempo de Tránsito</span>
                  <span className="text-sm font-black text-white">
                    {isCustomCity ? "24 a 48 Horas según Cantón" : selectedCity.transitLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Detail Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Card 1: Horarios de Salida */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Truck className="w-4 h-4" />
                  <span>Embarques Diarios</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {isCustomCity ? "Doble corte diario: 14:00 y 18:00 desde Bodega Pedernales" : selectedCity.cutoff}
                </p>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Coordinación personalizada por WhatsApp
                </span>
              </div>

              {/* Card 2: Protocolo Técnico */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <PackageCheck className="w-4 h-4" />
                  <span>Protocolo de Embalaje</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedProduct.packagingProtocol}
                </p>
                <span className="text-[10px] text-emerald-400 block pt-1">
                  ✓ 100% verificado antes de salir
                </span>
              </div>

              {/* Card 3: Garantía y Factura */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Garantía y Facturación</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Factura Electrónica legal autorizada por el SRI + Fotografía del paquete y guía de remisión oficial.
                </p>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Válido para crédito tributario y talleres
                </span>
              </div>
            </div>

            {/* WhatsApp Direct Action Button */}
            <div className="pt-2">
              <a
                href={buildWhatsAppLink("shipping", {
                  city: effectiveCityName,
                  productName: selectedProduct.name,
                  details: `Hola LiderPro Pedernales, requiero cotizar el despacho de ${selectedProduct.name} hacia ${effectiveCityName} (${effectiveProvince}). Por favor indíquenme opciones de envío y costo del flete.`
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("shipping_whatsapp_calc_click", {
                    city: effectiveCityName,
                    product: selectedProduct.name
                  })
                }
                className="btn-whatsapp !w-full !py-4 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl shadow-xl transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Cotizar Despacho de {selectedProduct.name} a {effectiveCityName} por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE 4 ARTERIAL TRUNK CORRIDORS (CORREDORES TRONCALES DIRECTOS) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-brand-primary uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>Rutas Estratégicas Terrestres</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Los 4 Corredores Logísticos Troncales desde Pedernales
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            La posición geográfica de Pedernales permite un enlace expedito con la Sierra Norte, Centro, el Perfil Costero y el Austro ecuatoriano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Trunk 1 */}
          <div className="card-interactive p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  Corredor E20
                </span>
                <span className="text-xs font-black text-emerald-700 font-mono">
                  24 Horas
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-950">
                Eje Sierra Capital
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Pedernales ➔ El Carmen ➔ Santo Domingo ➔ Alóag ➔ Quito</strong>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Salida diaria con arribo en la mañana para talleres mecánicos, flotas y clientes particulares en Quito y valles.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-700">
              Lubricantes Mannol/Motul, baterías Bosch y filtros
            </div>
          </div>

          {/* Trunk 2 */}
          <div className="card-interactive p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  Rutas E382 & E48
                </span>
                <span className="text-xs font-black text-emerald-700 font-mono">
                  24 Horas
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-950">
                Troncal del Pacífico Sur
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Pedernales ➔ Bahía ➔ Manta ➔ Portoviejo ➔ Guayaquil</strong>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Abastecimiento constante al perfil costero y al puerto principal en terminales terrestres o couriers.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-700">
              Canecas 20L, aceites marinos y baterías 27R/Grupo 31
            </div>
          </div>

          {/* Trunk 3 */}
          <div className="card-interactive p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-purple-900 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                  Corredor E35
                </span>
                <span className="text-xs font-black text-blue-700 font-mono">
                  24 a 48 Horas
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-950">
                Sierra Centro y Austro
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Pedernales ➔ Quevedo ➔ Latacunga ➔ Ambato ➔ Cuenca</strong>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Distribución ágil hacia la Sierra central y austral con protección térmica reforzada para aceites de alta viscosidad.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-700">
              Baterías selladas Ecuador/Bosch y lubricantes multigrado
            </div>
          </div>

          {/* Trunk 4 */}
          <div className="card-interactive p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Enlace Oriental
                </span>
                <span className="text-xs font-black text-amber-700 font-mono">
                  48 Horas
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-950">
                Nororiente Petrolero y Fronteras
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Pedernales ➔ Lago Agrio ➔ El Coca ➔ Machala ➔ Loja</strong>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Carga pesada para maquinaria pesada, sector camaronero sureño y flotas industriales con trazabilidad continua.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-700">
              Aceites diésel CI-4/CK-4, tambores y acumuladores
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
