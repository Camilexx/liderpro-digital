"use client";

import React, { useState, useId } from "react";
import {
  Truck,
  ShieldCheck,
  Send,
  Navigation,
  Compass,
  MapPin
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import {
  ECUADOR_PROVINCES,
  ECUADOR_MAP_CONFIG,
  HUB_NODE,
  DESTINATION_NODES,
  MapCityNode,
  ProvincePath,
  RegionType
} from "@/data/ecuadorMapData";

type RegionFilter = "todas" | RegionType;

export default function EcuadorLogistics2DMap() {
  const [selectedCity, setSelectedCity] = useState<MapCityNode>(DESTINATION_NODES[0]); // Default: Quito
  const [activeRegion, setActiveRegion] = useState<RegionFilter>("todas");
  const [hoveredNode, setHoveredNode] = useState<MapCityNode | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<ProvincePath | null>(null);

  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const gridPatternId = `grid-pattern-2d-${uid}`;
  const routeGradientId = `route-gradient-2d-${uid}`;
  const oceanGradId = `ocean-grad-2d-${uid}`;

  const visibleNodes = DESTINATION_NODES.filter((n) => {
    if (activeRegion === "todas") return true;
    return n.region === activeRegion;
  });

  const activeDisplayNode = hoveredNode || selectedCity;

  // Calculates a high-precision curved 2D vector arc
  const createCurvedArc = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    // Elegant slight curvature towards the north-west
    const cx = x1 + dx * 0.5 - dy * 0.14;
    const cy = y1 + dy * 0.5 - Math.abs(dx) * 0.12;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  // Color palette by region
  const getProvinceColors = (region: RegionType, isHighlighted: boolean, isDimmed: boolean) => {
    if (isDimmed) {
      return {
        fill: "#061A3A",
        stroke: "rgba(148, 163, 184, 0.2)",
        strokeWidth: 0.8,
        opacity: 0.25
      };
    }

    if (isHighlighted) {
      return {
        fill: region === "costa" ? "#1E40AF" : region === "sierra" ? "#B45309" : region === "oriente" ? "#047857" : "#0891B2",
        stroke: "#FFC500",
        strokeWidth: 2.2,
        opacity: 1
      };
    }

    switch (region) {
      case "costa":
        return { fill: "#0F3870", stroke: "#38BDF8", strokeWidth: 1.2, opacity: 0.95 };
      case "sierra":
        return { fill: "#78350F", stroke: "#F59E0B", strokeWidth: 1.2, opacity: 0.95 };
      case "oriente":
        return { fill: "#064E3B", stroke: "#10B981", strokeWidth: 1.2, opacity: 0.95 };
      case "insular":
        return { fill: "#0E7490", stroke: "#22D3EE", strokeWidth: 1.4, opacity: 0.95 };
    }
  };

  const { galapagosInset, svgWidth, svgHeight, equatorY } = ECUADOR_MAP_CONFIG;

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
            <span className="px-2.5 py-0.5 bg-amber-400/20 text-[#FFC500] border border-amber-400/40 rounded-full text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1">
              <Navigation className="w-3 h-3 text-[#FFC500]" />
              Cartografía Oficial de Cobertura
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
            { id: "todas", label: "Todas (24 Provincias)" },
            { id: "costa", label: "Costa (24h)" },
            { id: "sierra", label: "Sierra (24-48h)" },
            { id: "oriente", label: "Oriente (48h)" },
            { id: "insular", label: "Galápagos" },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setActiveRegion(r.id as RegionFilter);
                trackEvent("shipping_region_filter", { region: r.id });
              }}
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

      {/* Main Map Arena (High-Precision 2D Vector Canvas) */}
      <div className="relative min-h-[600px] sm:min-h-[700px] flex items-center justify-center p-2 sm:p-6 bg-[#04122E]">
        {/* Subtle Radial Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_48%_45%,rgba(14,58,117,0.35),rgba(4,18,46,0.98))]" />

        {/* 2D Responsive SVG Wrapper (Native Aspect Ratio 960/720) */}
        <div className="w-full max-w-[960px] aspect-[960/720] relative">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full drop-shadow-2xl select-none">
            <defs>
              {/* Technical 2D Grid Pattern */}
              <pattern id={gridPatternId} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>

              {/* Glowing Vector Arc Gradient */}
              <linearGradient id={routeGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFC500" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>

              {/* Ocean Subtle Radial Depth */}
              <radialGradient id={oceanGradId} cx="25%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#0A224A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#04122E" stopOpacity="0.9" />
              </radialGradient>
            </defs>

            {/* Background Grid & Ocean */}
            <rect width={svgWidth} height={svgHeight} fill={`url(#${oceanGradId})`} />
            <rect width={svgWidth} height={svgHeight} fill={`url(#${gridPatternId})`} />

            {/* Pacific Maritime Label & Compass Rose */}
            <g transform="translate(45, 630)" opacity="0.35">
              <Compass className="w-8 h-8 text-sky-400" />
              <text x="28" y="14" fill="#38BDF8" fontSize="10" fontWeight="900" letterSpacing="0.1em">
                OCÉANO PACÍFICO
              </text>
              <text x="28" y="24" fill="#94A3B8" fontSize="8" letterSpacing="0.05em">
                Litoral Ecuatoriano • 24 Provincias
              </text>
            </g>

            {/* Línea Equinoccial 0° 0' 0" (Latitud Cero - Pasa por Pedernales y norte de Quito) */}
            <g opacity="0.45">
              <line
                x1="20"
                y1={equatorY}
                x2={svgWidth - 20}
                y2={equatorY}
                stroke="#FFC500"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              <text
                x={svgWidth - 190}
                y={equatorY - 6}
                fill="#FFC500"
                fontSize="8.5"
                fontWeight="bold"
                letterSpacing="0.06em"
              >
                LÍNEA EQUATORIAL 0°00&apos;00&quot;
              </text>
            </g>

            {/* ============================================================ */}
            {/* INSET BOX FOR GALÁPAGOS ARCHIPELAGO */}
            {/* ============================================================ */}
            <g
              className="transition-opacity duration-300"
              style={{
                opacity: activeRegion === "todas" || activeRegion === "insular" ? 1 : 0.25
              }}
            >
              <rect
                x={galapagosInset.x}
                y={galapagosInset.y}
                width={galapagosInset.width}
                height={galapagosInset.height}
                rx="14"
                fill="#051636"
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))"
              />
              <rect
                x={galapagosInset.x + 8}
                y={galapagosInset.y + 8}
                width={galapagosInset.width - 16}
                height="22"
                rx="6"
                fill="#061B40"
                stroke="rgba(56, 189, 248, 0.3)"
                strokeWidth="1"
              />
              <text
                x={galapagosInset.x + 16}
                y={galapagosInset.y + 22}
                fill="#38BDF8"
                fontSize="9"
                fontWeight="900"
                letterSpacing="0.05em"
              >
                ARCHIPIÉLAGO DE GALÁPAGOS
              </text>
              <text
                x={galapagosInset.x + 16}
                y={galapagosInset.y + 40}
                fill="#94A3B8"
                fontSize="8"
                fontWeight="bold"
              >
                Despacho Aéreo & Marítimo
              </text>
            </g>

            {/* ============================================================ */}
            {/* OFFICIAL GEOGRAPHIC PROVINCES (24 PROVINCES OF ECUADOR) */}
            {/* ============================================================ */}
            <g id="provinces-layer">
              {ECUADOR_PROVINCES.map((prov) => {
                const isRegionActive = activeRegion === "todas" || activeRegion === prov.region;
                const isSelectedCityProv = activeDisplayNode.province.toLowerCase().includes(prov.name.toLowerCase()) ||
                  prov.name.toLowerCase().includes(activeDisplayNode.province.toLowerCase());
                const isHovered = hoveredProvince?.id === prov.id;
                const isHighlighted = isSelectedCityProv || isHovered;

                const styling = getProvinceColors(prov.region, isHighlighted, !isRegionActive);

                return (
                  <path
                    key={`prov-${prov.id}`}
                    id={`prov-${prov.id}`}
                    d={prov.path}
                    fill={styling.fill}
                    stroke={styling.stroke}
                    strokeWidth={styling.strokeWidth}
                    opacity={styling.opacity}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredProvince(prov)}
                    onMouseLeave={() => setHoveredProvince(null)}
                  >
                    <title>{prov.name} ({prov.region.toUpperCase()})</title>
                  </path>
                );
              })}
            </g>

            {/* ============================================================ */}
            {/* LOGISTICS ROUTE ARCS (CONNECTING PEDERNALES TO DESTINATIONS) */}
            {/* ============================================================ */}
            <g id="routes-layer">
              {visibleNodes.map((city) => {
                const isSelected = activeDisplayNode.id === city.id;
                const pathD = createCurvedArc(HUB_NODE.x, HUB_NODE.y, city.x, city.y);

                return (
                  <g key={`arc-${city.id}`}>
                    {/* Shadow / Base Arc */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? "rgba(255, 197, 0, 0.45)" : "rgba(56, 189, 248, 0.12)"}
                      strokeWidth={isSelected ? 4 : 1.2}
                      strokeLinecap="round"
                    />

                    {/* Animated Energy Flow */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? "#FFC500" : "url(#route-gradient-2d)"}
                      strokeWidth={isSelected ? 2.8 : 1.4}
                      strokeDasharray={isSelected ? "8 6" : "4 8"}
                      strokeLinecap="round"
                      style={{
                        animation: `dash ${city.transitTime === "24h" ? "2.2s" : "3.6s"} linear infinite`
                      }}
                    />
                  </g>
                );
              })}
            </g>

            {/* ============================================================ */}
            {/* DESTINATION CITY NODES */}
            {/* ============================================================ */}
            <g id="cities-layer">
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

                    {/* Outer Pulse Ring When Selected */}
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
                      r={isSelected ? 6 : 4}
                      fill={
                        isSelected
                          ? "#FFC500"
                          : city.transitTime === "24h"
                          ? "#34D399"
                          : "#38BDF8"
                      }
                      stroke="#04122E"
                      strokeWidth={1.8}
                    />

                    {/* City Label Badge With Dynamic Positioning */}
                    <g transform={`translate(${city.x + city.labelDx}, ${city.y + city.labelDy})`}>
                      {city.labelAnchor === "middle" ? (
                        <g>
                          <rect
                            x={-city.name.length * 4 - 18}
                            y="-9"
                            width={city.name.length * 8 + 36}
                            height="18"
                            rx="5"
                            fill={isSelected ? "#0A2662" : "#061B40"}
                            stroke={isSelected ? "#FFC500" : "rgba(255,255,255,0.22)"}
                            strokeWidth={isSelected ? 1.5 : 0.8}
                          />
                          <text
                            x="0"
                            y="3"
                            textAnchor="middle"
                            fill={isSelected ? "#FFFFFF" : "#E2E8F0"}
                            fontSize="9"
                            fontWeight={isSelected ? "900" : "bold"}
                          >
                            {city.name} ({city.transitTime})
                          </text>
                        </g>
                      ) : city.labelAnchor === "end" ? (
                        <g>
                          <rect
                            x={-city.name.length * 6.5 - (isSelected ? 38 : 30)}
                            y="-9"
                            width={city.name.length * 6.5 + (isSelected ? 36 : 28)}
                            height="17"
                            rx="4"
                            fill={isSelected ? "#0A2662" : "#061B40"}
                            stroke={isSelected ? "#FFC500" : "rgba(255,255,255,0.22)"}
                            strokeWidth={isSelected ? 1.5 : 0.8}
                          />
                          <text
                            x={-city.name.length * 6.5 - (isSelected ? 34 : 26)}
                            y="2"
                            fill={city.transitTime === "24h" ? "#34D399" : "#FFC500"}
                            fontSize="8"
                            fontWeight="900"
                          >
                            {city.transitTime}
                          </text>
                          <text
                            x="-6"
                            y="2"
                            textAnchor="end"
                            fill={isSelected ? "#FFFFFF" : "#E2E8F0"}
                            fontSize="9"
                            fontWeight={isSelected ? "900" : "bold"}
                          >
                            {city.name}
                          </text>
                        </g>
                      ) : (
                        <g>
                          <rect
                            x="-2"
                            y="-9"
                            width={city.name.length * 6.5 + (isSelected ? 36 : 28)}
                            height="17"
                            rx="4"
                            fill={isSelected ? "#0A2662" : "#061B40"}
                            stroke={isSelected ? "#FFC500" : "rgba(255,255,255,0.22)"}
                            strokeWidth={isSelected ? 1.5 : 0.8}
                          />
                          <text
                            x="3"
                            y="2"
                            fill={isSelected ? "#FFFFFF" : "#E2E8F0"}
                            fontSize="9"
                            fontWeight={isSelected ? "900" : "bold"}
                          >
                            {city.name}
                          </text>
                          <text
                            x={city.name.length * 6.5 + 5}
                            y="2"
                            fill={city.transitTime === "24h" ? "#34D399" : "#FFC500"}
                            fontSize="8"
                            fontWeight="900"
                          >
                            {city.transitTime}
                          </text>
                        </g>
                      )}
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
              <circle cx={HUB_NODE.x} cy={HUB_NODE.y} r={34} fill="none" stroke="#10B981" strokeWidth="1" opacity="0.35" className="animate-ping" />
              <circle cx={HUB_NODE.x} cy={HUB_NODE.y} r={22} fill="none" stroke="#10B981" strokeWidth="1.5" opacity="0.6" />
              <circle cx={HUB_NODE.x} cy={HUB_NODE.y} r={12} fill="rgba(16, 185, 129, 0.25)" stroke="#10B981" strokeWidth="2" />
              <circle cx={HUB_NODE.x} cy={HUB_NODE.y} r={6.5} fill="#FFC500" stroke="#04122E" strokeWidth="2.2" />

              {/* Hub Badge Floating Callout */}
              <g transform={`translate(${HUB_NODE.x + HUB_NODE.labelDx}, ${HUB_NODE.y + HUB_NODE.labelDy})`}>
                <rect
                  x="0"
                  y="0"
                  width="156"
                  height="28"
                  rx="7"
                  fill="#04122E"
                  stroke="#10B981"
                  strokeWidth="2"
                  filter="drop-shadow(0 4px 10px rgba(0,0,0,0.6))"
                />
                <circle cx="13" cy="14" r="4.5" fill="#10B981" className="animate-pulse" />
                <text x="24" y="13" fill="#FFFFFF" fontSize="9.5" fontWeight="900">
                  ★ HUB PEDERNALES
                </text>
                <text x="24" y="22" fill="#34D399" fontSize="8" fontWeight="bold">
                  BODEGA MATRIZ NACIONAL
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Floating City Telemetry Card (Right Overlay) */}
        <div className="absolute bottom-4 right-4 max-w-xs w-full bg-[#061B40]/95 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 shadow-2xl text-xs space-y-3 z-10">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
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
              details: `Hola LiderPro Pedernales, deseo cotizar el despacho hacia ${activeDisplayNode.name} (${activeDisplayNode.province}) con tiempo garantizado ${activeDisplayNode.transitTime}.`
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
