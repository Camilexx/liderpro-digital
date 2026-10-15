"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Clock,
  Truck,
  ShieldCheck,
  Send,
  Search,
  Package,
  Layers
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export interface ProvinceData {
  id: string;
  name: string;
  capital: string;
  mainCities: string[];
  region: "Costa" | "Sierra" | "Oriente" | "Galápagos";
  transitTime: "24h" | "24-48h" | "48h";
  transitLabel: string;
  dispatchFrequency: string;
  modalities: string[];
  recommendedFor: string;
  heavyCargoSupported: boolean; // batteries, canecas, tambores
}

export const ECUADOR_PROVINCES: ProvinceData[] = [
  // COSTA
  {
    id: "manabi",
    name: "Manabí",
    capital: "Portoviejo",
    mainCities: ["Pedernales (Sede Matriz)", "Manta", "Portoviejo", "Chone", "El Carmen", "Bahía", "Jipijapa", "Cojimíes"],
    region: "Costa",
    transitTime: "24h",
    transitLabel: "Entrega Inmediata a 24 Horas",
    dispatchFrequency: "Despacho continuo desde Hub Pedernales (Rutas locales e intercantonales)",
    modalities: ["Retiro directo en bodega matriz", "Transporte intercantonal", "Courier"],
    recommendedFor: "Lubricantes automotrices y marinos, canecas 20L, baterías Grupo 31 para camaroneras",
    heavyCargoSupported: true,
  },
  {
    id: "pichincha",
    name: "Pichincha",
    capital: "Quito",
    mainCities: ["Quito Metropolitano", "Valle de los Chillos", "Cumbayá / Tumbaco", "Cayambe", "Machachi", "Rumiñahui"],
    region: "Sierra",
    transitTime: "24h",
    transitLabel: "24 Horas (Entrega al Día Siguiente)",
    dispatchFrequency: "Corte diario 14:00 y 18:00 por corredor E20 (Santo Domingo - Alóag)",
    modalities: ["Transporte interprovincial directo", "Courier con entrega a domicilio", "Agencia céntrica"],
    recommendedFor: "Lubricantes sintéticos Mannol/Motul, baterías Bosch/Ecuador, bujías NGK y filtros",
    heavyCargoSupported: true,
  },
  {
    id: "guayas",
    name: "Guayas",
    capital: "Guayaquil",
    mainCities: ["Guayaquil", "Durán", "Samborondón", "Milagro", "Daule", "El Empalme", "Balzar"],
    region: "Costa",
    transitTime: "24h",
    transitLabel: "24 Horas (Entrega al Día Siguiente)",
    dispatchFrequency: "Despacho diario nocturno con arribo a primera hora de la mañana",
    modalities: ["Encomienda interprovincial directa", "Courier corporativo", "Terminal terrestre / agencia"],
    recommendedFor: "Canecas de aceite pesado 15W40/40, baterías selladas, aditivos y filtros",
    heavyCargoSupported: true,
  },
  {
    id: "santo-domingo",
    name: "Santo Domingo de los Tsáchilas",
    capital: "Santo Domingo",
    mainCities: ["Santo Domingo", "La Concordia", "Valle Hermoso", "Alluriquín"],
    region: "Costa",
    transitTime: "24h",
    transitLabel: "24 Horas (Conexión Directa)",
    dispatchFrequency: "Conexión vial directa Pedernales - El Carmen - Sto. Domingo (Múltiples frecuencias diarias)",
    modalities: ["Transporte interprovincial directo", "Courier rápido", "Agencia autorizada"],
    recommendedFor: "Aceites para equipo pesado, camionetas 4x4, baterías NS40/NS60/27R",
    heavyCargoSupported: true,
  },
  {
    id: "esmeraldas",
    name: "Esmeraldas",
    capital: "Esmeraldas",
    mainCities: ["Esmeraldas", "Atacames", "Quinindé", "Muisne", "Tonsupa", "San Lorenzo"],
    region: "Costa",
    transitTime: "24h",
    transitLabel: "24 Horas (Troncal del Pacífico)",
    dispatchFrequency: "Despacho diario vía ruta E15 del Pacífico norte",
    modalities: ["Transporte interprovincial costero", "Courier expreso"],
    recommendedFor: "Lubricantes de motor a gasolina y diésel, refrigerantes, baterías marinas y automotrices",
    heavyCargoSupported: true,
  },
  {
    id: "los-rios",
    name: "Los Ríos",
    capital: "Babahoyo",
    mainCities: ["Quevedo", "Babahoyo", "Ventanas", "Vinces", "Buena Fe", "Montalvo"],
    region: "Costa",
    transitTime: "24h",
    transitLabel: "24 Horas (Corredor Central)",
    dispatchFrequency: "Despacho regular hacia bodegas y talleres agrícolas y comerciales",
    modalities: ["Transporte interprovincial", "Courier", "Encomiendas de carga agrícola"],
    recommendedFor: "Aceites agrícolas, 15W40, 20W50, filtros pesados y baterías 27R/Grupo 31",
    heavyCargoSupported: true,
  },
  {
    id: "santa-elena",
    name: "Santa Elena",
    capital: "Santa Elena",
    mainCities: ["Salinas", "La Libertad", "Santa Elena", "Montañita", "Manglaralto"],
    region: "Costa",
    transitTime: "24-48h",
    transitLabel: "24 a 48 Horas",
    dispatchFrequency: "Conexión diaria vía Guayaquil o ruta Spondylus",
    modalities: ["Transporte interprovincial", "Courier nacional"],
    recommendedFor: "Aceites sintéticos, filtros de aceite/aire, aditivos y baterías selladas",
    heavyCargoSupported: true,
  },
  {
    id: "el-oro",
    name: "El Oro",
    capital: "Machala",
    mainCities: ["Machala", "Pasaje", "Santa Rosa", "Huaquillas", "Arenillas", "Piñas"],
    region: "Costa",
    transitTime: "24-48h",
    transitLabel: "24 a 48 Horas",
    dispatchFrequency: "Ruta directa al sur costero con entrega en agencia o taller",
    modalities: ["Transporte interprovincial pesado", "Courier a domicilio"],
    recommendedFor: "Lubricantes para sector camaronero y bananero, canecas y tambores, baterías industriales",
    heavyCargoSupported: true,
  },

  // SIERRA
  {
    id: "tungurahua",
    name: "Tungurahua",
    capital: "Ambato",
    mainCities: ["Ambato", "Baños", "Pelileo", "Píllaro", "Cevallos"],
    region: "Sierra",
    transitTime: "24-48h",
    transitLabel: "24 a 48 Horas",
    dispatchFrequency: "Despacho diario centralizado vía enlace Sierra Centro",
    modalities: ["Transporte interprovincial de encomiendas", "Courier"],
    recommendedFor: "Filtros automotrices Advance/Mann, baterías libres de mantenimiento, lubricantes",
    heavyCargoSupported: true,
  },
  {
    id: "cotopaxi",
    name: "Cotopaxi",
    capital: "Latacunga",
    mainCities: ["Latacunga", "Salcedo", "Pujilí", "Saquisilí", "La Maná"],
    region: "Sierra",
    transitTime: "24-48h",
    transitLabel: "24 a 48 Horas",
    dispatchFrequency: "Conexión directa por la Panamericana Sur",
    modalities: ["Transporte interprovincial", "Courier"],
    recommendedFor: "Lubricantes para climas fríos y altura, anticongelantes 50/50, baterías",
    heavyCargoSupported: true,
  },
  {
    id: "chimborazo",
    name: "Chimborazo",
    capital: "Riobamba",
    mainCities: ["Riobamba", "Guano", "Alausí", "Colta", "Chambo"],
    region: "Sierra",
    transitTime: "24-48h",
    transitLabel: "24 a 48 Horas",
    dispatchFrequency: "Despacho diario con enlace interprovincial",
    modalities: ["Transporte interprovincial directo", "Courier"],
    recommendedFor: "Baterías Ecuador y Bosch, aceites de motor diésel y gasolina, filtros",
    heavyCargoSupported: true,
  },
  {
    id: "azuay",
    name: "Azuay",
    capital: "Cuenca",
    mainCities: ["Cuenca", "Gualaceo", "Paute", "Santa Isabel", "Chordeleg"],
    region: "Sierra",
    transitTime: "24-48h",
    transitLabel: "24 a 48 Horas",
    dispatchFrequency: "Conexión diaria directa Cuenca - Guayaquil / Sierra Sur",
    modalities: ["Courier express", "Transporte interprovincial de encomiendas"],
    recommendedFor: "Gama premium Mannol, bujías NGK Iridium, líquido de frenos ATE, baterías",
    heavyCargoSupported: true,
  },
  {
    id: "loja",
    name: "Loja",
    capital: "Loja",
    mainCities: ["Loja", "Catamayo", "Cariamanga", "Macará", "Vilcabamba"],
    region: "Sierra",
    transitTime: "48h",
    transitLabel: "48 Horas",
    dispatchFrequency: "Ruta austral programada con protección reforzada",
    modalities: ["Transporte interprovincial", "Courier nacional"],
    recommendedFor: "Lubricantes multigrado, filtros y baterías automotrices",
    heavyCargoSupported: true,
  },
  {
    id: "imbabura",
    name: "Imbabura",
    capital: "Ibarra",
    mainCities: ["Ibarra", "Otavalo", "Cotacachi", "Atuntaqui", "Pimampiro"],
    region: "Sierra",
    transitTime: "24-48h",
    transitLabel: "24 a 48 Horas",
    dispatchFrequency: "Conexión diaria norte vía Quito",
    modalities: ["Transporte interprovincial", "Courier"],
    recommendedFor: "Aceites sintéticos y semi-sintéticos, baterías y filtros",
    heavyCargoSupported: true,
  },
  {
    id: "carchi",
    name: "Carchi",
    capital: "Tulcán",
    mainCities: ["Tulcán", "San Gabriel", "Montúfar", "Huaca", "Mira"],
    region: "Sierra",
    transitTime: "48h",
    transitLabel: "48 Horas (Frontera Norte)",
    dispatchFrequency: "Despacho programado hacia la zona fronteriza",
    modalities: ["Transporte interprovincial", "Courier"],
    recommendedFor: "Lubricantes de trabajo pesado, anticongelantes certificados, baterías",
    heavyCargoSupported: true,
  },
  {
    id: "bolivar",
    name: "Bolívar",
    capital: "Guaranda",
    mainCities: ["Guaranda", "San Miguel", "Chimbo", "Caluma", "Echeandía"],
    region: "Sierra",
    transitTime: "24-48h",
    transitLabel: "24 a 48 Horas",
    dispatchFrequency: "Enlace vía Babahoyo o Ambato hacia la provincia",
    modalities: ["Transporte interprovincial", "Courier"],
    recommendedFor: "Lubricantes para camionetas de montaña, filtros y baterías",
    heavyCargoSupported: true,
  },
  {
    id: "canar",
    name: "Cañar",
    capital: "Azogues",
    mainCities: ["Azogues", "Cañar", "La Troncal", "Biblián"],
    region: "Sierra",
    transitTime: "24-48h",
    transitLabel: "24 a 48 Horas",
    dispatchFrequency: "Despacho coordinado vía Austro / Costa enlace",
    modalities: ["Transporte interprovincial", "Courier"],
    recommendedFor: "Baterías automotrices, aceites 10W30/20W50, filtros",
    heavyCargoSupported: true,
  },

  // ORIENTE / AMAZONIA
  {
    id: "sucumbios",
    name: "Sucumbíos",
    capital: "Nueva Loja (Lago Agrio)",
    mainCities: ["Lago Agrio", "Shushufindi", "Cuyabeno", "Cascales"],
    region: "Oriente",
    transitTime: "48h",
    transitLabel: "48 Horas (Nororiente Petrolero)",
    dispatchFrequency: "Ruta directa de transporte de carga e industrial",
    modalities: ["Transporte interprovincial pesado", "Courier"],
    recommendedFor: "Lubricantes industriales y diésel pesado, canecas 20L, baterías Grupo 31",
    heavyCargoSupported: true,
  },
  {
    id: "orellana",
    name: "Orellana",
    capital: "Puerto Francisco de Orellana (El Coca)",
    mainCities: ["El Coca", "Joya de los Sachas", "Loreto"],
    region: "Oriente",
    transitTime: "48h",
    transitLabel: "48 Horas (Sector Petrolero y Flotas)",
    dispatchFrequency: "Despacho especializado para flotas y maquinaria",
    modalities: ["Transporte de carga pesada e interprovincial", "Courier"],
    recommendedFor: "Aceites diésel CI-4/CK-4, tambores y canecas, baterías de alto rendimiento",
    heavyCargoSupported: true,
  },
  {
    id: "pastaza",
    name: "Pastaza",
    capital: "Puyo",
    mainCities: ["Puyo", "Mera", "Santa Clara", "Arajuno"],
    region: "Oriente",
    transitTime: "48h",
    transitLabel: "48 Horas",
    dispatchFrequency: "Conexión vía Baños - Puyo",
    modalities: ["Transporte interprovincial", "Courier"],
    recommendedFor: "Aceites 4T para motocicletas, aceites diésel para camionetas y maquinaria",
    heavyCargoSupported: true,
  },
  {
    id: "napo",
    name: "Napo",
    capital: "Tena",
    mainCities: ["Tena", "Archidona", "Baeza", "El Chaco"],
    region: "Oriente",
    transitTime: "48h",
    transitLabel: "48 Horas",
    dispatchFrequency: "Enlace vía corredor oriental",
    modalities: ["Transporte interprovincial", "Courier"],
    recommendedFor: "Lubricantes automotrices, baterías selladas y filtros",
    heavyCargoSupported: true,
  },
  {
    id: "morona-santiago",
    name: "Morona Santiago",
    capital: "Macas",
    mainCities: ["Macas", "Sucúa", "Gualaquiza", "Limón Indanza"],
    region: "Oriente",
    transitTime: "48h",
    transitLabel: "48 Horas",
    dispatchFrequency: "Ruta suroriental programada",
    modalities: ["Transporte interprovincial", "Courier"],
    recommendedFor: "Baterías, lubricantes para camionetas 4x4 y maquinaria rural",
    heavyCargoSupported: true,
  },
  {
    id: "zamora-chinchipe",
    name: "Zamora Chinchipe",
    capital: "Zamora",
    mainCities: ["Zamora", "Yantzaza", "El Pangui", "Zumba"],
    region: "Oriente",
    transitTime: "48h",
    transitLabel: "48 Horas (Zona Minera y Productiva)",
    dispatchFrequency: "Despacho programado con embalaje reforzado",
    modalities: ["Transporte de carga pesada e interprovincial", "Courier"],
    recommendedFor: "Lubricantes de servicio pesado, grasas especiales, baterías Grupo 31",
    heavyCargoSupported: true,
  },

  // INSULAR
  {
    id: "galapagos",
    name: "Galápagos",
    capital: "Puerto Baquerizo Moreno",
    mainCities: ["Puerto Ayora (Santa Cruz)", "Puerto Baquerizo Moreno (San Cristóbal)", "Puerto Villamil (Isabela)"],
    region: "Galápagos",
    transitTime: "48h",
    transitLabel: "48 Horas aéreo / Marítimo según carga",
    dispatchFrequency: "Embarque coordinado vía terminal aéreo o marítimo autorizado",
    modalities: ["Courier aéreo de carga liviana", "Carga marítima autorizada"],
    recommendedFor: "Filtros automotrices livianos, bujías NGK, aditivos y piezas permitidas por regulación insular",
    heavyCargoSupported: false, // Regulated hazardous cargo requires special maritime booking
  },
];

export default function ProvinceShippingCalculator() {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("pichincha");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("todas");

  // Filtered provinces list
  const filteredProvinces = useMemo(() => {
    return ECUADOR_PROVINCES.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.mainCities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion =
        regionFilter === "todas" || p.region.toLowerCase() === regionFilter.toLowerCase();

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, regionFilter]);

  const activeProvince = useMemo(() => {
    const found = ECUADOR_PROVINCES.find((p) => p.id === selectedProvinceId);
    return found || ECUADOR_PROVINCES[0];
  }, [selectedProvinceId]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-100">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#061B40] via-[#0A2662] to-[#04122E] border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Calculador Logístico Nacional — 24 Provincias</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Consulta Tiempos y Frecuencias para tu Provincia y Cantón
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Selecciona tu provincia o busca tu cantón para conocer el tiempo de tránsito exacto, modalidad recomendada y coordinar el despacho seguro desde la bodega matriz en Pedernales.
          </p>
        </div>
      </div>

      {/* Main Container: Left Selector & Right Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Search & Province List (5 Cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/60 flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar provincia o cantón (ej: Quito, Manta, Cuenca)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC500] focus:ring-1 focus:ring-[#FFC500] transition-colors"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
            {[
              { id: "todas", label: "Todas (24)" },
              { id: "costa", label: "Costa (8)" },
              { id: "sierra", label: "Sierra (9)" },
              { id: "oriente", label: "Oriente (6)" },
              { id: "galapagos", label: "Galápagos (1)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRegionFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  regionFilter === tab.id
                    ? "bg-[#FFC500] text-slate-950 font-black shadow-sm"
                    : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable Province List */}
          <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
            {filteredProvinces.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No encontramos resultados para tu búsqueda. Intenta con otra palabra.
              </div>
            ) : (
              filteredProvinces.map((prov) => {
                const isSelected = prov.id === activeProvince.id;
                return (
                  <button
                    key={prov.id}
                    onClick={() => {
                      setSelectedProvinceId(prov.id);
                      trackEvent("shipping_province_select", { province: prov.name });
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                      isSelected
                        ? "bg-[#0A2662] border-[#FFC500] text-white shadow-md shadow-blue-900/30 ring-1 ring-[#FFC500]/50"
                        : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs">{prov.name}</span>
                        {prov.id === "manabi" && (
                          <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-black rounded uppercase">
                            HUB MATRIZ
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[210px]">
                        {prov.mainCities.slice(0, 3).join(", ")}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          prov.transitTime === "24h"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : prov.transitTime === "24-48h"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {prov.transitTime}
                      </span>
                      <span className="block text-[9px] text-slate-400 font-mono mt-0.5">
                        {prov.region}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Logistics Sheet for Selected Province (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-900/90 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Header of Active Province */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Provincia de {activeProvince.name} • Región {activeProvince.region}</span>
                </div>
                <h4 className="text-2xl font-black text-white tracking-tight">
                  Destino: {activeProvince.name}
                </h4>
              </div>

              {/* Transit Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                <Clock className="w-4 h-4 animate-pulse" />
                <div className="text-left">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400/80">Tiempo Estimado</span>
                  <span className="block text-xs font-black">{activeProvince.transitLabel}</span>
                </div>
              </div>
            </div>

            {/* Cantones & Ciudades Principales */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Cobertura Cantonal y Ciudades Principales:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProvince.mainCities.map((city, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-800 border border-slate-700/80 rounded-lg text-xs text-slate-200 font-medium"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Logistics Breakdown 3-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Box 1: Frecuencia de Embarque */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFC500]">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Frecuencia de Embarque</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeProvince.dispatchFrequency}
                </p>
              </div>

              {/* Box 2: Modalidad */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Modalidades Disponibles</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeProvince.modalities.join(" • ")}
                </p>
              </div>
            </div>

            {/* Box 3: Cargas Frecuentes y Aptas */}
            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Package className="w-3.5 h-3.5" />
                  <span>Carga Habitual Despachada a esta Zona</span>
                </div>
                {activeProvince.heavyCargoSupported ? (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    ✓ Apto para Baterías y Canecas
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                    ⚠ Carga Liviana / Restricción Aérea
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeProvince.recommendedFor}
              </p>
            </div>

            {/* Protocol Guarantee Note */}
            <div className="p-3 bg-blue-950/40 border border-blue-900/60 rounded-xl flex items-start gap-2.5 text-xs text-blue-200">
              <ShieldCheck className="w-4 h-4 text-[#FFC500] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Garantía de Despacho LiderPro:</strong> Se define la empresa de transporte o courier más conveniente según tu cantón. Recibes fotografía previa del embalaje y la guía de remisión oficial por WhatsApp.
              </p>
            </div>
          </div>

          {/* Action WhatsApp Button for Active Province */}
          <div className="pt-2">
            <a
              href={buildWhatsAppLink("shipping", {
                city: `${activeProvince.name} (${activeProvince.capital})`,
                details: `Hola LiderPro, deseo cotizar el envío hacia la provincia de ${activeProvince.name} (${activeProvince.capital}). Por favor indíquenme costos y empresa de transporte disponible.`
              })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("shipping_whatsapp_calc_click", { province: activeProvince.name })}
              className="btn-whatsapp !w-full !py-3.5 !text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl shadow-lg transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Cotizar Despacho a {activeProvince.name} por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
