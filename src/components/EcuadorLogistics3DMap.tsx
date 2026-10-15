"use client";

import React, { useState, useId } from "react";
import {
  Clock,
  Truck,
  ShieldCheck,
  Send,
  Compass
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface CityNode {
  id: string;
  name: string;
  province: string;
  region: "costa" | "sierra" | "oriente" | "insular";
  x: number;
  y: number;
  transitTime: "24h" | "24-48h" | "48h";
  transportType: "Encomienda Directa" | "Courier & Encomienda" | "Transporte Aéreo / Encomienda";
  popularProducts: string;
  isHub?: boolean;
}

// Exact geographic locations on an 800x680 coordinate grid
const HUB_NODE: CityNode = {
  id: "pedernales",
  name: "Pedernales",
  province: "Manabí",
  region: "costa",
  x: 200,
  y: 187,
  transitTime: "24h",
  transportType: "Encomienda Directa",
  popularProducts: "Centro de Despacho Matriz Mayorista & Minorista",
  isHub: true
};

const DESTINATION_NODES: CityNode[] = [
  // COSTA
  { id: "quito", name: "Quito", province: "Pichincha", region: "sierra", x: 376, y: 209, transitTime: "24h", transportType: "Courier & Encomienda", popularProducts: "Lubricantes sintéticos, baterías Bosch, filtros" },
  { id: "santo-domingo", name: "Santo Domingo", province: "Sto. Domingo", region: "costa", x: 298, y: 216, transitTime: "24h", transportType: "Encomienda Directa", popularProducts: "Aceites diesel 15W40, baterías pesadas, filtros" },
  { id: "manta", name: "Manta", province: "Manabí", region: "costa", x: 126, y: 278, transitTime: "24h", transportType: "Encomienda Directa", popularProducts: "Aceites marinos, canecas 20L, baterías" },
  { id: "portoviejo", name: "Portoviejo", province: "Manabí", region: "costa", x: 156, y: 287, transitTime: "24h", transportType: "Encomienda Directa", popularProducts: "Lubricantes 20W50, filtros de aceite y aire" },
  { id: "esmeraldas", name: "Esmeraldas", province: "Esmeraldas", region: "costa", x: 243, y: 107, transitTime: "24h", transportType: "Encomienda Directa", popularProducts: "Lubricantes de motor, baterías, refrigerantes" },
  { id: "guayaquil", name: "Guayaquil", province: "Guayas", region: "costa", x: 217, y: 388, transitTime: "24h", transportType: "Courier & Encomienda", popularProducts: "Canecas de aceite, baterías selladas, aditivos" },
  { id: "quevedo", name: "Quevedo", province: "Los Ríos", region: "costa", x: 266, y: 285, transitTime: "24h", transportType: "Encomienda Directa", popularProducts: "Aceites agrícolas, 15W40, baterías heavy-duty" },
  { id: "babahoyo", name: "Babahoyo", province: "Los Ríos", region: "costa", x: 258, y: 355, transitTime: "24h", transportType: "Encomienda Directa", popularProducts: "Lubricantes de camión y camioneta, baterías" },
  { id: "salinas", name: "Salinas / La Libertad", province: "Santa Elena", region: "costa", x: 94, y: 390, transitTime: "24h", transportType: "Courier & Encomienda", popularProducts: "Aceites sintéticos, filtros y refrigerantes" },
  { id: "machala", name: "Machala", province: "El Oro", region: "costa", x: 210, y: 485, transitTime: "24-48h", transportType: "Encomienda Directa", popularProducts: "Lubricantes camaroneros, canecas, baterías Grupo 31" },
  
  // SIERRA
  { id: "latacunga", name: "Latacunga", province: "Cotopaxi", region: "sierra", x: 360, y: 277, transitTime: "24-48h", transportType: "Encomienda Directa", popularProducts: "Aceites para altura, refrigerantes 50/50" },
  { id: "ambato", name: "Ambato", province: "Tungurahua", region: "sierra", x: 358, y: 304, transitTime: "24-48h", transportType: "Encomienda Directa", popularProducts: "Filtros de aceite/aire, baterías, lubricantes" },
  { id: "riobamba", name: "Riobamba", province: "Chimborazo", region: "sierra", x: 356, y: 343, transitTime: "24-48h", transportType: "Encomienda Directa", popularProducts: "Aceites pesados, baterías Ecuador 24/27" },
  { id: "cuenca", name: "Cuenca", province: "Azuay", region: "sierra", x: 317, y: 453, transitTime: "24-48h", transportType: "Courier & Encomienda", popularProducts: "Mannol sintético, baterías Bosch, bujías NGK" },
  { id: "loja", name: "Loja", province: "Loja", region: "sierra", x: 294, y: 552, transitTime: "48h", transportType: "Encomienda Directa", popularProducts: "Lubricantes multigrado, baterías, filtros" },
  { id: "ibarra", name: "Ibarra", province: "Imbabura", region: "sierra", x: 414, y: 162, transitTime: "24-48h", transportType: "Encomienda Directa", popularProducts: "Aceites de motor, baterías, aditivos" },
  { id: "tulcan", name: "Tulcán", province: "Carchi", region: "sierra", x: 459, y: 121, transitTime: "24-48h", transportType: "Encomienda Directa", popularProducts: "Lubricantes pesados, anticongelantes, filtros" },
  
  // ORIENTE / AMAZONIA
  { id: "lago-agrio", name: "Lago Agrio", province: "Sucumbíos", region: "oriente", x: 552, y: 186, transitTime: "48h", transportType: "Encomienda Directa", popularProducts: "Aceites diesel CI-4, canecas, baterías pesadas" },
  { id: "el-coca", name: "El Coca", province: "Orellana", region: "oriente", x: 540, y: 235, transitTime: "48h", transportType: "Encomienda Directa", popularProducts: "Lubricantes industriales y petroleros, filtros" },
  { id: "puyo", name: "Puyo", province: "Pastaza", region: "oriente", x: 428, y: 326, transitTime: "48h", transportType: "Encomienda Directa", popularProducts: "Aceites 4T moto, lubricantes pesados, baterías" },
  { id: "tena", name: "Tena", province: "Napo", region: "oriente", x: 449, y: 282, transitTime: "48h", transportType: "Encomienda Directa", popularProducts: "Lubricantes de trabajo y filtros de aire" },
  { id: "macas", name: "Macas", province: "Morona Santiago", region: "oriente", x: 416, y: 400, transitTime: "48h", transportType: "Encomienda Directa", popularProducts: "Aceites de motor, baterías y filtros" },
  { id: "zamora", name: "Zamora", province: "Zamora Chinchipe", region: "oriente", x: 322, y: 558, transitTime: "48h", transportType: "Encomienda Directa", popularProducts: "Lubricantes para maquinaria y baterías" },
  
  // INSULAR
  { id: "galapagos", name: "Galápagos", province: "Galápagos", region: "insular", x: 80, y: 100, transitTime: "48h", transportType: "Transporte Aéreo / Encomienda", popularProducts: "Filtros livianos, bujías y aditivos autorizados" }
];

export default function EcuadorLogistics3DMap() {
  const [selectedCity, setSelectedCity] = useState<CityNode>(DESTINATION_NODES[0]);
  const [activeRegion, setActiveRegion] = useState<"todas" | "costa" | "sierra" | "oriente" | "insular">("todas");
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<CityNode | null>(null);

  // Generate unique IDs for SVG elements to avoid duplicate ID issues
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const gridPatternId = `grid-pattern-${uid}`;
  const hubGlowId = `hub-glow-${uid}`;
  const routeGradientId = `route-gradient-${uid}`;

  // Filter nodes according to selected region
  const visibleNodes = DESTINATION_NODES.filter((n) => {
    if (activeRegion === "todas") return true;
    return n.region === activeRegion;
  });

  const activeDisplayNode = hoveredNode || selectedCity;

  // Function to create smooth curved bezier path from Pedernales to target city
  const createCurvedArc = (x1: number, y1: number, x2: number, y2: number) => {
    // Control point curved towards top/center to simulate air/highway parabolic arc
    const dx = x2 - x1;
    const dy = y2 - y1;
    const cx = x1 + dx * 0.5 - dy * 0.22;
    const cy = y1 + dy * 0.5 - Math.abs(dx) * 0.18;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  return (
    <div className="w-full bg-[#061B40] text-white rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden relative">
      {/* Top Header Bar / Telemetry */}
      <div className="p-6 sm:p-8 border-b border-slate-800/80 bg-gradient-to-r from-[#061B40] via-[#0A265C] to-[#061B40] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Sede Central de Despacho Activa
            </span>
            <span className="px-2.5 py-0.5 bg-amber-400/20 text-[#FFC500] border border-amber-400/40 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
              24 Provincias del Ecuador
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Mapa Interactivo de Rutas: <span className="text-[#FFC500]">Hub Pedernales</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Haz clic o pasa el cursor sobre cualquier ciudad para conocer los tiempos de entrega, transporte asignado y solicitar tu cotización directa de despacho con guía electrónica SRI.
          </p>
        </div>

        {/* Region & 3D Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-[#04122E] p-1 rounded-xl border border-slate-700 flex items-center text-xs">
            <button
              onClick={() => setActiveRegion("todas")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeRegion === "todas" ? "bg-[#FFC500] text-slate-950 shadow-sm" : "text-slate-300 hover:text-white"
              }`}
            >
              Todas (24)
            </button>
            <button
              onClick={() => setActiveRegion("costa")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeRegion === "costa" ? "bg-[#FFC500] text-slate-950 shadow-sm" : "text-slate-300 hover:text-white"
              }`}
            >
              Costa (24h)
            </button>
            <button
              onClick={() => setActiveRegion("sierra")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeRegion === "sierra" ? "bg-[#FFC500] text-slate-950 shadow-sm" : "text-slate-300 hover:text-white"
              }`}
            >
              Sierra
            </button>
            <button
              onClick={() => setActiveRegion("oriente")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeRegion === "oriente" ? "bg-[#FFC500] text-slate-950 shadow-sm" : "text-slate-300 hover:text-white"
              }`}
            >
              Oriente
            </button>
          </div>

          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/90 hover:bg-slate-700 text-xs font-bold text-white rounded-xl border border-slate-600 transition-all shadow-md active:scale-95"
            title="Alternar perspectiva isométrica 3D"
          >
            <Compass className={`w-4 h-4 text-[#FFC500] transition-transform duration-500 ${is3DMode ? "rotate-45" : ""}`} />
            <span>{is3DMode ? "Vista 3D Isométrica" : "Vista Plana 2D"}</span>
          </button>
        </div>
      </div>

      {/* Main Map Arena */}
      <div className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Holographic Background Grid & Elevation Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_45%,rgba(16,78,160,0.35),rgba(6,27,64,0.95))]" />

        {/* 3D Perspective Wrapper */}
        <div
          className={`w-full max-w-[860px] aspect-[800/680] relative transition-transform duration-700 ease-out ${
            is3DMode
              ? "[transform:perspective(1100px)_rotateX(28deg)_rotateZ(-4deg)_scale(0.96)] origin-center shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              : "[transform:none]"
          }`}
        >
          {/* Base SVG Map of Ecuador */}
          <svg
            viewBox="0 0 800 680"
            className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
            style={{ filter: is3DMode ? "drop-shadow(0 20px 25px rgba(0,0,0,0.85))" : "none" }}
          >
            <defs>
              {/* Technical Grid Pattern */}
              <pattern id={gridPatternId} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              </pattern>

              {/* Radiant Gradients for Ecuador Regions */}
              <linearGradient id="costa-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0E3A75" />
                <stop offset="100%" stopColor="#092552" />
              </linearGradient>

              <linearGradient id="sierra-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D97706" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#B45309" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#78350F" stopOpacity="0.85" />
              </linearGradient>

              <linearGradient id="oriente-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#065F46" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#044734" stopOpacity="0.9" />
              </linearGradient>

              {/* Glowing Hub Radial Filter */}
              <radialGradient id={hubGlowId}>
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#10B981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </radialGradient>

              {/* Glowing Vector Arc Gradient */}
              <linearGradient id={routeGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFC500" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              {/* Drop Shadow for Provinces */}
              <filter id="elev-shadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Background Grid */}
            <rect width="800" height="680" fill={`url(#${gridPatternId})`} />

            {/* Maritime Ocean Shelf Glow */}
            <path
              d="M 60 70 Q 150 50 330 75 Q 240 100 200 187 Q 150 250 120 280 Q 90 380 94 395 Q 160 430 188 440 Q 200 480 180 510 L 150 560 L 50 560 Z"
              fill="rgba(56, 189, 248, 0.04)"
              stroke="rgba(56, 189, 248, 0.15)"
              strokeDasharray="4 4"
            />

            {/* ============================================================ */}
            {/* CONTINENTAL ECUADOR ACCURATE GEOGRAPHIC TOPOGRAPHY */}
            {/* ============================================================ */}

            {/* Region 1: Amazonía / Oriente (East) */}
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
              fill="url(#oriente-grad)"
              stroke="#059669"
              strokeWidth="1.5"
              filter="url(#elev-shadow)"
              className="transition-opacity duration-300"
              style={{ opacity: activeRegion === "todas" || activeRegion === "oriente" ? 1 : 0.25 }}
            />

            {/* Region 2: Sierra / Andes Cordillera (Center Elevated Spine) */}
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
              fill="url(#sierra-grad)"
              stroke="#F59E0B"
              strokeWidth="2"
              filter="url(#elev-shadow)"
              className="transition-opacity duration-300"
              style={{ opacity: activeRegion === "todas" || activeRegion === "sierra" ? 1 : 0.25 }}
            />

            {/* Region 3: Costa / Pacific Coastal Basin (West - Contains Pedernales) */}
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
              fill="url(#costa-grad)"
              stroke="#38BDF8"
              strokeWidth="2.5"
              filter="url(#elev-shadow)"
              className="transition-opacity duration-300"
              style={{ opacity: activeRegion === "todas" || activeRegion === "costa" ? 1 : 0.25 }}
            />

            {/* Gulf of Guayaquil & Isla Puná */}
            <ellipse cx="178" cy="450" rx="14" ry="9" fill="#0B2A59" stroke="#38BDF8" strokeWidth="1.2" />

            {/* Galápagos Inset Box */}
            <g
              transform="translate(45, 55)"
              className="transition-opacity duration-300"
              style={{ opacity: activeRegion === "todas" || activeRegion === "insular" ? 1 : 0.25 }}
            >
              <rect x="0" y="0" width="125" height="95" rx="10" fill="#04122E" stroke="#38BDF8" strokeWidth="1.2" />
              <text x="12" y="18" fill="#38BDF8" fontSize="9" fontWeight="900" letterSpacing="0.08em">
                ARCHIPIÉLAGO GALÁPAGOS
              </text>
              <text x="12" y="30" fill="#94A3B8" fontSize="8">
                Despacho Aéreo & Marítimo
              </text>
              {/* Islands silhouettes: Isabela, Santa Cruz, San Cristóbal */}
              <path d="M 30 45 Q 38 35 44 48 Q 42 68 35 75 Z" fill="#10B981" opacity="0.8" />
              <circle cx="65" cy="55" r="7" fill="#10B981" opacity="0.9" />
              <circle cx="85" cy="62" r="6" fill="#10B981" opacity="0.8" />
            </g>

            {/* Equator Line (Línea Equinoccial 0° 0' 0") */}
            <g opacity="0.45">
              <line x1="60" y1="187" x2="740" y2="187" stroke="#FFC500" strokeWidth="1" strokeDasharray="6 6" />
              <text x="680" y="180" fill="#FFC500" fontSize="9" fontWeight="bold" letterSpacing="0.05em">
                LÍNEA ECUATORIAL 0°00&apos;
              </text>
            </g>

            {/* ============================================================ */}
            {/* DYNAMIC 3D VECTOR ROUTE ARCS (FLOWING FROM PEDERNALES) */}
            {/* ============================================================ */}
            <g>
              {visibleNodes.map((city) => {
                const isSelected = activeDisplayNode.id === city.id;
                const pathD = createCurvedArc(HUB_NODE.x, HUB_NODE.y, city.x, city.y);

                return (
                  <g key={`arc-${city.id}`} className="group">
                    {/* Shadow / Glow Base */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? "rgba(255, 197, 0, 0.4)" : "rgba(56, 189, 248, 0.15)"}
                      strokeWidth={isSelected ? 4 : 2}
                      strokeLinecap="round"
                    />

                    {/* Animated Pulsing Energy Beam */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? "#FFC500" : "url(#route-gradient)"}
                      strokeWidth={isSelected ? 3 : 1.8}
                      strokeDasharray="8 8"
                      strokeLinecap="round"
                      className="animate-[dash_12s_linear_infinite]"
                      style={{
                        animation: `dash ${city.transitTime === "24h" ? "2.5s" : "4s"} linear infinite`
                      }}
                    />
                  </g>
                );
              })}
            </g>

            {/* ============================================================ */}
            {/* DESTINATION CITY NODES */}
            {/* ============================================================ */}
            <g>
              {visibleNodes.map((city) => {
                const isSelected = activeDisplayNode.id === city.id;

                return (
                  <g
                    key={`pin-${city.id}`}
                    transform={`translate(${city.x}, ${city.y})`}
                    onClick={() => {
                      setSelectedCity(city);
                      trackEvent("shipping_city_select", { city: city.name, province: city.province });
                    }}
                    onMouseEnter={() => setHoveredNode(city)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer group"
                  >
                    {/* Ripple on Hover/Select */}
                    {isSelected && (
                      <circle
                        r="14"
                        fill="none"
                        stroke="#FFC500"
                        strokeWidth="1.5"
                        className="animate-ping origin-center opacity-75"
                      />
                    )}

                    {/* Outer Ring */}
                    <circle
                      r={isSelected ? 8 : 5}
                      fill={isSelected ? "#FFC500" : "#0F172A"}
                      stroke={isSelected ? "#FFFFFF" : "#38BDF8"}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="transition-all duration-300 drop-shadow-md"
                    />

                    {/* Inner Core */}
                    <circle
                      r={isSelected ? 4 : 2.5}
                      fill={isSelected ? "#061B40" : "#38BDF8"}
                      className="transition-all duration-300"
                    />

                    {/* City Label */}
                    <text
                      x={city.x > 380 ? -10 : 12}
                      y={4}
                      textAnchor={city.x > 380 ? "end" : "start"}
                      fill={isSelected ? "#FFC500" : "#E2E8F0"}
                      fontSize={isSelected ? "11" : "9"}
                      fontWeight={isSelected ? "900" : "700"}
                      className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-all select-none"
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* ============================================================ */}
            {/* PEDERNALES MASTER LOGISTICS COMMAND BEACON (CENTRAL HUB) */}
            {/* ============================================================ */}
            <g transform={`translate(${HUB_NODE.x}, ${HUB_NODE.y})`}>
              {/* Massive Radar Waves */}
              <circle r="45" fill={`url(#${hubGlowId})`} className="opacity-40" />
              <circle r="30" fill="none" stroke="#10B981" strokeWidth="1" className="animate-ping opacity-60 origin-center" />
              <circle r="18" fill="none" stroke="#FFC500" strokeWidth="1.5" className="animate-pulse opacity-80" />

              {/* Master Beacon Diamond / Pin */}
              <circle r="9" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" className="drop-shadow-[0_0_12px_#10B981]" />
              <circle r="4" fill="#061B40" />

              {/* Pedernales Banner Label */}
              <g transform="translate(-85, -34)" className="pointer-events-none select-none">
                <rect
                  x="0"
                  y="0"
                  width="170"
                  height="26"
                  rx="6"
                  fill="#04122E"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  className="drop-shadow-lg"
                />
                <circle cx="12" cy="13" r="3.5" fill="#10B981" className="animate-ping" />
                <circle cx="12" cy="13" r="3.5" fill="#10B981" />
                <text x="24" y="17" fill="#FFFFFF" fontSize="10" fontWeight="900" letterSpacing="0.04em">
                  HUB PEDERNALES <tspan fill="#FFC500">★ MATRIZ</tspan>
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Floating Telemetry & Selected City Floating HUD */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-[#04122E]/95 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-2xl z-20 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[10px] font-black uppercase tracking-wider">
                  Ruta Directa Activa
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeDisplayNode.province}
                </span>
              </div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>{activeDisplayNode.name}</span>
                <span className="text-sm font-bold text-[#FFC500]">
                  ({activeDisplayNode.transitTime})
                </span>
              </h3>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-400/20 border border-amber-400/40 text-[#FFC500] rounded-lg text-xs font-black">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeDisplayNode.transitTime}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-800 pt-3">
            <div className="space-y-1">
              <span className="text-slate-400 flex items-center gap-1 font-semibold">
                <Truck className="w-3.5 h-3.5 text-[#FFC500]" />
                Modalidad:
              </span>
              <p className="font-bold text-slate-200">{activeDisplayNode.transportType}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Garantía:
              </span>
              <p className="font-bold text-slate-200">Foto Guía + SRI</p>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed border-t border-slate-800/60 pt-2">
            <strong className="text-slate-100">Carga Frecuente:</strong> {activeDisplayNode.popularProducts}. Despacho verificado desde bodega Pedernales.
          </p>

          <a
            href={buildWhatsAppLink("shipping", {
              city: `${activeDisplayNode.name} (${activeDisplayNode.province})`,
              details: `Consulta de despacho a ${activeDisplayNode.name} con tiempo de entrega ${activeDisplayNode.transitTime}`
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
