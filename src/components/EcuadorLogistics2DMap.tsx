"use client";

import React, { useState, useId } from "react";
import {
  Truck,
  ShieldCheck,
  Send
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

type RegionFilter = "todas" | "costa" | "sierra" | "oriente" | "insular";

interface CityNode {
  id: string;
  name: string;
  province: string;
  region: "costa" | "sierra" | "oriente" | "insular";
  x: number;
  y: number;
  transitTime: "24h" | "24-48h" | "48h";
  transportType: string;
  popularProducts: string;
  isHub?: boolean;
}

// Exact geographic locations on an 800x680 2D coordinate grid
const HUB_NODE: CityNode = {
  id: "pedernales",
  name: "Pedernales",
  province: "Manabí",
  region: "costa",
  x: 200,
  y: 187,
  transitTime: "24h",
  transportType: "Bodega Matriz y Centro de Despacho",
  popularProducts: "Acopio y despacho nacional mayorista y minorista",
  isHub: true
};

const DESTINATION_NODES: CityNode[] = [
  // COSTA
  { id: "quito", name: "Quito", province: "Pichincha", region: "sierra", x: 376, y: 209, transitTime: "24h", transportType: "Courier & Encomienda Directa", popularProducts: "Lubricantes sintéticos Mannol/Motul, baterías Bosch, filtros" },
  { id: "santo-domingo", name: "Santo Domingo", province: "Sto. Domingo", region: "costa", x: 298, y: 216, transitTime: "24h", transportType: "Encomienda Interprovincial Directa", popularProducts: "Aceites diésel 15W40, baterías pesadas, filtros" },
  { id: "manta", name: "Manta", province: "Manabí", region: "costa", x: 126, y: 278, transitTime: "24h", transportType: "Transporte Intercantonal Directo", popularProducts: "Aceites marinos, canecas 20L, baterías" },
  { id: "portoviejo", name: "Portoviejo", province: "Manabí", region: "costa", x: 156, y: 287, transitTime: "24h", transportType: "Transporte Intercantonal Directo", popularProducts: "Lubricantes 20W50, filtros de aceite y aire" },
  { id: "esmeraldas", name: "Esmeraldas", province: "Esmeraldas", region: "costa", x: 243, y: 107, transitTime: "24h", transportType: "Encomienda Directa Costa Norte", popularProducts: "Lubricantes de motor, baterías, refrigerantes" },
  { id: "guayaquil", name: "Guayaquil", province: "Guayas", region: "costa", x: 217, y: 388, transitTime: "24h", transportType: "Courier Express & Encomienda", popularProducts: "Canecas de aceite, baterías selladas, aditivos" },
  { id: "quevedo", name: "Quevedo", province: "Los Ríos", region: "costa", x: 266, y: 285, transitTime: "24h", transportType: "Encomienda Directa Central", popularProducts: "Aceites agrícolas, 15W40, baterías heavy-duty" },
  { id: "babahoyo", name: "Babahoyo", province: "Los Ríos", region: "costa", x: 258, y: 355, transitTime: "24h", transportType: "Encomienda Interprovincial", popularProducts: "Lubricantes de camión y camioneta, baterías" },
  { id: "salinas", name: "Salinas", province: "Santa Elena", region: "costa", x: 94, y: 390, transitTime: "24-48h", transportType: "Courier & Encomienda", popularProducts: "Aceites sintéticos, filtros y refrigerantes" },
  { id: "machala", name: "Machala", province: "El Oro", region: "costa", x: 210, y: 485, transitTime: "24-48h", transportType: "Transporte de Carga Pesada", popularProducts: "Lubricantes camaroneros, canecas, baterías Grupo 31" },
  
  // SIERRA
  { id: "latacunga", name: "Latacunga", province: "Cotopaxi", region: "sierra", x: 360, y: 277, transitTime: "24-48h", transportType: "Encomienda Directa Sierra", popularProducts: "Aceites para altura, refrigerantes 50/50" },
  { id: "ambato", name: "Ambato", province: "Tungurahua", region: "sierra", x: 358, y: 304, transitTime: "24-48h", transportType: "Encomienda Interprovincial", popularProducts: "Filtros de aceite/aire, baterías, lubricantes" },
  { id: "riobamba", name: "Riobamba", province: "Chimborazo", region: "sierra", x: 356, y: 343, transitTime: "24-48h", transportType: "Encomienda Directa", popularProducts: "Aceites pesados, baterías Ecuador 24/27" },
  { id: "cuenca", name: "Cuenca", province: "Azuay", region: "sierra", x: 317, y: 453, transitTime: "24-48h", transportType: "Courier Express & Encomienda", popularProducts: "Mannol sintético, baterías Bosch, bujías NGK" },
  { id: "loja", name: "Loja", province: "Loja", region: "sierra", x: 294, y: 552, transitTime: "48h", transportType: "Transporte Interprovincial Sur", popularProducts: "Lubricantes multigrado, baterías, filtros" },
  { id: "ibarra", name: "Ibarra", province: "Imbabura", region: "sierra", x: 414, y: 162, transitTime: "24-48h", transportType: "Encomienda Directa Norte", popularProducts: "Aceites de motor, baterías, aditivos" },
  { id: "tulcan", name: "Tulcán", province: "Carchi", region: "sierra", x: 459, y: 121, transitTime: "48h", transportType: "Encomienda Interprovincial Frontera", popularProducts: "Lubricantes pesados, anticongelantes, filtros" },
  
  // ORIENTE / AMAZONIA
  { id: "lago-agrio", name: "Lago Agrio", province: "Sucumbíos", region: "oriente", x: 552, y: 186, transitTime: "48h", transportType: "Transporte Carga Nororiente", popularProducts: "Aceites diésel CI-4, canecas, baterías pesadas" },
  { id: "el-coca", name: "El Coca", province: "Orellana", region: "oriente", x: 540, y: 235, transitTime: "48h", transportType: "Transporte de Carga Petrolera", popularProducts: "Lubricantes industriales y petroleros, filtros" },
  { id: "puyo", name: "Puyo", province: "Pastaza", region: "oriente", x: 428, y: 326, transitTime: "48h", transportType: "Encomienda Interprovincial", popularProducts: "Aceites 4T moto, lubricantes pesados, baterías" },
  { id: "tena", name: "Tena", province: "Napo", region: "oriente", x: 449, y: 282, transitTime: "48h", transportType: "Encomienda Directa", popularProducts: "Lubricantes de trabajo y filtros de aire" },
  { id: "macas", name: "Macas", province: "Morona Santiago", region: "oriente", x: 416, y: 400, transitTime: "48h", transportType: "Transporte Interprovincial", popularProducts: "Aceites de motor, baterías y filtros" },
  { id: "zamora", name: "Zamora", province: "Zamora Chinchipe", region: "oriente", x: 322, y: 558, transitTime: "48h", transportType: "Transporte Suroriental", popularProducts: "Lubricantes para maquinaria y baterías" },
  
  // INSULAR
  { id: "galapagos", name: "Galápagos", province: "Galápagos", region: "insular", x: 80, y: 100, transitTime: "48h", transportType: "Courier Aéreo / Carga Autorizada", popularProducts: "Filtros livianos, bujías y aditivos permitidos" }
];

export default function EcuadorLogistics2DMap() {
  const [selectedCity, setSelectedCity] = useState<CityNode>(DESTINATION_NODES[0]);
  const [activeRegion, setActiveRegion] = useState<RegionFilter>("todas");
  const [hoveredNode, setHoveredNode] = useState<CityNode | null>(null);

  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const gridPatternId = `grid-pattern-2d-${uid}`;
  const routeGradientId = `route-gradient-2d-${uid}`;

  const visibleNodes = DESTINATION_NODES.filter((n) => {
    if (activeRegion === "todas") return true;
    return n.region === activeRegion;
  });

  const activeDisplayNode = hoveredNode || selectedCity;

  // Calculates a clean curved 2D vector arc
  const createCurvedArc = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const cx = x1 + dx * 0.5 - dy * 0.18;
    const cy = y1 + dy * 0.5 - Math.abs(dx) * 0.15;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  return (
    <div className="w-full bg-[#061B40] text-white rounded-3xl border border-slate-700/70 shadow-2xl overflow-hidden relative">
      {/* Top Header Bar / Status Bar */}
      <div className="p-6 sm:p-8 border-b border-slate-800 bg-gradient-to-r from-[#061B40] via-[#0A2662] to-[#04122E] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Sede Matriz de Despacho Activa
            </span>
            <span className="px-2.5 py-0.5 bg-amber-400/20 text-[#FFC500] border border-amber-400/40 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
              Vista Vectorial 2D Oficial
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Mapa de Cobertura Nacional desde <span className="text-[#FFC500]">Hub Pedernales</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Toca o haz clic sobre cualquier ciudad del mapa para visualizar la ruta directa, el tiempo de tránsito garantizado y cotizar tu despacho por WhatsApp con comprobante legal del SRI.
          </p>
        </div>

        {/* Region Filters (Pure 2D) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#04122E] p-1.5 rounded-xl border border-slate-700 text-xs">
          {[
            { id: "todas", label: "Todas (24)" },
            { id: "costa", label: "Costa (24h)" },
            { id: "sierra", label: "Sierra" },
            { id: "oriente", label: "Oriente" },
            { id: "insular", label: "Galápagos" },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRegion(r.id as RegionFilter)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeRegion === r.id
                  ? "bg-[#FFC500] text-slate-950 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Arena (Crisp 2D Vector Canvas) */}
      <div className="relative min-h-[580px] sm:min-h-[660px] flex items-center justify-center p-3 sm:p-6 bg-[#04122E]">
        {/* Subtle Radial Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_45%,rgba(14,58,117,0.3),rgba(4,18,46,0.95))]" />

        {/* 2D Responsive SVG Wrapper (Zero tilt, pure horizontal planimetry) */}
        <div className="w-full max-w-[880px] aspect-[800/660] relative">
          <svg viewBox="0 0 800 660" className="w-full h-full drop-shadow-xl">
            <defs>
              {/* Technical 2D Grid Pattern */}
              <pattern id={gridPatternId} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
              </pattern>

              {/* High-Contrast Corporate 2D Gradients */}
              <linearGradient id="costa-2d-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F3870" />
                <stop offset="100%" stopColor="#0A254D" />
              </linearGradient>

              <linearGradient id="sierra-2d-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B45309" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#78350F" stopOpacity="0.85" />
              </linearGradient>

              <linearGradient id="oriente-2d-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#047857" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#064E3B" stopOpacity="0.85" />
              </linearGradient>

              {/* Glowing Vector Arc Gradient */}
              <linearGradient id={routeGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFC500" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>

            {/* Background Grid */}
            <rect width="800" height="660" fill={`url(#${gridPatternId})`} />

            {/* Pacific Maritime Edge */}
            <path
              d="M 60 70 Q 150 50 330 75 Q 240 100 200 187 Q 150 250 120 278 Q 90 380 94 390 Q 160 430 188 440 Q 200 480 180 505 L 150 560 L 40 560 Z"
              fill="rgba(56, 189, 248, 0.03)"
              stroke="rgba(56, 189, 248, 0.15)"
              strokeDasharray="4 4"
            />

            {/* ============================================================ */}
            {/* GEOGRAPHIC PROFILE OF ECUADOR (COSTA, SIERRA, ORIENTE, GALÁPAGOS) */}
            {/* ============================================================ */}

            {/* Region: Oriente / Amazonía */}
            <path
              d="M 370 120 
                 L 460 120 
                 L 555 184 
                 L 672 206 
                 L 733 275 
                 L 616 417 
                 L 483 462 
                 L 372 533 
                 L 330 560 
                 L 360 450 
                 L 390 330 
                 L 400 210 
                 Z"
              fill="url(#oriente-2d-grad)"
              stroke="#059669"
              strokeWidth="1.5"
              className="transition-opacity duration-300"
              style={{ opacity: activeRegion === "todas" || activeRegion === "oriente" ? 1 : 0.2 }}
            />

            {/* Region: Sierra / Cordillera Central */}
            <path
              d="M 460 120 
                 L 370 120 
                 L 320 180 
                 L 290 220 
                 L 260 285 
                 L 255 355 
                 L 270 420 
                 L 290 550 
                 L 330 560 
                 L 372 533 
                 L 360 450 
                 L 390 330 
                 L 400 210 
                 Z"
              fill="url(#sierra-2d-grad)"
              stroke="#F59E0B"
              strokeWidth="2"
              className="transition-opacity duration-300"
              style={{ opacity: activeRegion === "todas" || activeRegion === "sierra" ? 1 : 0.2 }}
            />

            {/* Region: Costa / Cuenca del Pacífico */}
            <path
              d="M 333 78 
                 L 241 105 
                 L 203 138 
                 L 200 187 
                 L 155 247 
                 L 122 278 
                 L 116 323 
                 L 122 359 
                 L 94 390 
                 L 163 428 
                 L 188 440 
                 L 207 486 
                 L 180 505 
                 L 211 585 
                 L 268 603 
                 L 290 550 
                 L 270 420 
                 L 255 355 
                 L 260 285 
                 L 290 220 
                 L 320 180 
                 L 370 120 
                 L 333 78 
                 Z"
              fill="url(#costa-2d-grad)"
              stroke="#38BDF8"
              strokeWidth="2.5"
              className="transition-opacity duration-300"
              style={{ opacity: activeRegion === "todas" || activeRegion === "costa" ? 1 : 0.2 }}
            />

            {/* Golfo de Guayaquil e Isla Puná */}
            <ellipse cx="178" cy="450" rx="14" ry="9" fill="#0B2A59" stroke="#38BDF8" strokeWidth="1.2" />

            {/* Inset Galápagos */}
            <g
              transform="translate(45, 50)"
              className="transition-opacity duration-300"
              style={{ opacity: activeRegion === "todas" || activeRegion === "insular" ? 1 : 0.2 }}
            >
              <rect x="0" y="0" width="130" height="92" rx="10" fill="#030E24" stroke="#38BDF8" strokeWidth="1.2" />
              <text x="12" y="18" fill="#38BDF8" fontSize="8.5" fontWeight="900" letterSpacing="0.06em">
                ARCHIPIÉLAGO GALÁPAGOS
              </text>
              <text x="12" y="30" fill="#94A3B8" fontSize="8">
                Despacho Aéreo & Marítimo
              </text>
              {/* Islands silhouettes: Isabela, Santa Cruz, San Cristóbal */}
              <path d="M 32 45 Q 40 35 46 48 Q 44 68 37 75 Z" fill="#10B981" opacity="0.85" />
              <circle cx="68" cy="55" r="7" fill="#10B981" opacity="0.9" />
              <circle cx="90" cy="62" r="6" fill="#10B981" opacity="0.85" />
            </g>

            {/* Línea Equinoccial 0° 0' 0" */}
            <g opacity="0.4">
              <line x1="60" y1="187" x2="740" y2="187" stroke="#FFC500" strokeWidth="1" strokeDasharray="6 6" />
              <text x="660" y="181" fill="#FFC500" fontSize="8.5" fontWeight="bold" letterSpacing="0.05em">
                LÍNEA EQUATORIAL 0°00&apos;
              </text>
            </g>

            {/* ============================================================ */}
            {/* 2D ROUTE ARCS (CONNECTING PEDERNALES TO CITIES) */}
            {/* ============================================================ */}
            <g>
              {visibleNodes.map((city) => {
                const isSelected = activeDisplayNode.id === city.id;
                const pathD = createCurvedArc(HUB_NODE.x, HUB_NODE.y, city.x, city.y);

                return (
                  <g key={`arc-${city.id}`}>
                    {/* Shadow / Base Arc */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? "rgba(255, 197, 0, 0.5)" : "rgba(56, 189, 248, 0.15)"}
                      strokeWidth={isSelected ? 4 : 1.5}
                      strokeLinecap="round"
                    />

                    {/* Animated Energy Flow */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? "#FFC500" : "url(#route-gradient-2d)"}
                      strokeWidth={isSelected ? 3 : 1.8}
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                      style={{
                        animation: `dash ${city.transitTime === "24h" ? "2.5s" : "4s"} linear infinite`
                      }}
                    />
                  </g>
                );
              })}
            </g>

            {/* ============================================================ */}
            {/* DESTINATION NODES (CITIES) */}
            {/* ============================================================ */}
            <g>
              {visibleNodes.map((city) => {
                const isSelected = activeDisplayNode.id === city.id;

                return (
                  <g
                    key={`node-${city.id}`}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedCity(city);
                      trackEvent("shipping_city_select", { city: city.name, transitTime: city.transitTime });
                    }}
                    onMouseEnter={() => setHoveredNode(city)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Outer Target Hit Area */}
                    <circle cx={city.x} cy={city.y} r={18} fill="transparent" />

                    {/* Outer Pulse Ring */}
                    {isSelected && (
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={14}
                        fill="none"
                        stroke="#FFC500"
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}

                    {/* City Dot */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={isSelected ? 6 : 4.5}
                      fill={
                        isSelected
                          ? "#FFC500"
                          : city.transitTime === "24h"
                          ? "#34D399"
                          : "#38BDF8"
                      }
                      stroke="#04122E"
                      strokeWidth={2}
                    />

                    {/* City Label Badge */}
                    <g transform={`translate(${city.x + 8}, ${city.y - 4})`}>
                      <rect
                        x="-2"
                        y="-10"
                        width={city.name.length * 6.5 + (isSelected ? 34 : 26)}
                        height="16"
                        rx="4"
                        fill={isSelected ? "#0A2662" : "#061B40"}
                        stroke={isSelected ? "#FFC500" : "rgba(255,255,255,0.2)"}
                        strokeWidth={isSelected ? 1.5 : 0.8}
                      />
                      <text
                        x="3"
                        y="1"
                        fill={isSelected ? "#FFFFFF" : "#E2E8F0"}
                        fontSize="9"
                        fontWeight={isSelected ? "900" : "bold"}
                      >
                        {city.name}
                      </text>
                      <text
                        x={city.name.length * 6.5 + 5}
                        y="1"
                        fill={city.transitTime === "24h" ? "#34D399" : "#FFC500"}
                        fontSize="8"
                        fontWeight="900"
                      >
                        {city.transitTime}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>

            {/* ============================================================ */}
            {/* PEDERNALES MATRIZ HUB BEACON (CENTER OF OPERATIONS) */}
            {/* ============================================================ */}
            <g className="cursor-pointer" onClick={() => setSelectedCity(HUB_NODE)}>
              {/* Multi-tier radar rings */}
              <circle cx={HUB_NODE.x} cy={HUB_NODE.y} r={32} fill="none" stroke="#10B981" strokeWidth="1" opacity="0.35" className="animate-ping" />
              <circle cx={HUB_NODE.x} cy={HUB_NODE.y} r={22} fill="none" stroke="#10B981" strokeWidth="1.5" opacity="0.6" />
              <circle cx={HUB_NODE.x} cy={HUB_NODE.y} r={12} fill="rgba(16, 185, 129, 0.25)" stroke="#10B981" strokeWidth="2" />
              <circle cx={HUB_NODE.x} cy={HUB_NODE.y} r={6} fill="#FFC500" stroke="#04122E" strokeWidth="2" />

              {/* Hub Badge Floating Callout */}
              <g transform={`translate(${HUB_NODE.x - 70}, ${HUB_NODE.y - 40})`}>
                <rect x="0" y="0" width="145" height="26" rx="6" fill="#04122E" stroke="#10B981" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))" />
                <circle cx="12" cy="13" r="4" fill="#10B981" className="animate-pulse" />
                <text x="22" y="12" fill="#FFFFFF" fontSize="9" fontWeight="900">
                  ★ HUB PEDERNALES
                </text>
                <text x="22" y="21" fill="#34D399" fontSize="7.5" fontWeight="bold">
                  BODEGA MATRIZ NACIONAL
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Floating City Telemetry Card (Right Overlay) */}
        <div className="absolute bottom-4 right-4 max-w-xs w-full bg-[#061B40]/95 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 shadow-2xl text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                Destino Seleccionado
              </span>
              <h4 className="text-base font-black text-white">
                {activeDisplayNode.name}
              </h4>
              <span className="text-[11px] text-slate-300 font-medium">
                Provincia de {activeDisplayNode.province}
              </span>
            </div>

            <div className="text-right">
              <span
                className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  activeDisplayNode.transitTime === "24h"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                }`}
              >
                {activeDisplayNode.transitTime}
              </span>
              <span className="block text-[9px] text-slate-400 font-mono mt-0.5">
                Región {activeDisplayNode.region.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-200">
              <Truck className="w-3.5 h-3.5 text-[#FFC500] shrink-0" />
              <span><strong>Transporte:</strong> {activeDisplayNode.transportType}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span><strong>Garantía:</strong> Factura SRI + Guía oficial</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed border-t border-slate-700/60 pt-2">
            <strong className="text-slate-100">Carga Habitual:</strong> {activeDisplayNode.popularProducts}.
          </p>

          <a
            href={buildWhatsAppLink("shipping", {
              city: `${activeDisplayNode.name} (${activeDisplayNode.province})`,
              details: `Hola LiderPro, deseo cotizar el despacho hacia ${activeDisplayNode.name} (${activeDisplayNode.province}) con tiempo estimado ${activeDisplayNode.transitTime}.`
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("shipping_whatsapp_click", { city: activeDisplayNode.name })}
            className="btn-whatsapp !w-full !py-2.5 !text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Cotizar Despacho a {activeDisplayNode.name}</span>
          </a>
        </div>
      </div>

      {/* Bottom Dispatch Protocol Badges */}
      <div className="p-4 sm:p-6 bg-[#04122E] border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400 font-bold">
            01
          </div>
          <div>
            <strong className="block text-slate-100 font-bold">Corte Diario 14:00 y 18:00</strong>
            <span className="text-[11px] text-slate-400">Embarques programados</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-[#FFC500] font-bold">
            02
          </div>
          <div>
            <strong className="block text-slate-100 font-bold">Sellado Antiderrame</strong>
            <span className="text-[11px] text-slate-400">Tapas con precinto térmico</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400 font-bold">
            03
          </div>
          <div>
            <strong className="block text-slate-100 font-bold">Anclaje de Baterías</strong>
            <span className="text-[11px] text-slate-400">Bornes aislados y base fija</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400 font-bold">
            04
          </div>
          <div>
            <strong className="block text-slate-100 font-bold">Trazabilidad WhatsApp</strong>
            <span className="text-[11px] text-slate-400">Foto de guía y remisión SRI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
