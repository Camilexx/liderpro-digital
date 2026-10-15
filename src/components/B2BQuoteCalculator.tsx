"use client";

import React, { useState } from "react";
import {
  Wrench,
  Truck,
  Building2,
  Container,
  Droplets,
  BatteryCharging,
  ShieldCheck,
  Send,
  CheckCircle2,
  Sparkles,
  MapPin,
  TrendingUp
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface SectorOption {
  id: string;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  typicalNeeds: string;
}

const B2B_SECTORS: SectorOption[] = [
  {
    id: "taller",
    name: "Taller Mecánico o Lubricadora",
    badge: "Servicio Automotriz",
    icon: Wrench,
    description: "Centros de mantenimiento que buscan eliminar retornos por lubricantes de dudosa procedencia y asegurar baterías con garantía real.",
    typicalNeeds: "Aceites sintéticos en cuartos/galones, cajas master de filtros y baterías 24/NS60/NS40.",
  },
  {
    id: "flota",
    name: "Flota de Transporte o Cooperativa",
    badge: "Transporte Pesado y Comercial",
    icon: Truck,
    description: "Cooperativas interprovinciales, camiones de carga pesada (Hino, Isuzu), furgones y flotas corporativas de camionetas 4x4.",
    typicalNeeds: "Canecas de 15W40 CI-4/CK-4, tambores de 55 galones y baterías de alta descarga.",
  },
  {
    id: "camaronera",
    name: "Sector Camaronero e Industrial",
    badge: "Acuícola y Agroindustrial",
    icon: Container,
    description: "Camaroneras y fincas en Manabí, Guayas y El Oro que operan generadores, bombas de agua y motores estacionarios diésel de trabajo continuo.",
    typicalNeeds: "Baterías Grupo 31 (1000 CA), canecas 20L de Mobil Delvac / Mannol y filtros pesados.",
  },
  {
    id: "distribuidor",
    name: "Distribuidor o Almacén de Repuestos",
    badge: "Reventa y Mayorista",
    icon: Building2,
    description: "Negocios de autopartes que desean ampliar su inventario con marcas de alta rotación (Bosch, Baterías Ecuador, Mannol, Motul, NGK).",
    typicalNeeds: "Lotes consolidados multimarca con precios de escala y entrega periódica.",
  },
];

interface ProductLineOption {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  formats: string;
}

const PRODUCT_LINES: ProductLineOption[] = [
  {
    id: "canecas_tambores",
    name: "Canecas 20L y Tambores 55 Galones",
    icon: Container,
    formats: "Mobil Delvac 15W40, Mannol TS-7, Havoline SuperDiesel, Castrol CRB",
  },
  {
    id: "baterias_lote",
    name: "Baterías por Lote (Ecuador & Bosch)",
    icon: BatteryCharging,
    formats: "Grupo 31, 27R, 24, NS60, NS40 (Selladas 12V libres de mantenimiento)",
  },
  {
    id: "aceites_cajas",
    name: "Cajas de Aceite en Galones / Cuartos",
    icon: Droplets,
    formats: "Mannol, Motul, Mobil, Havoline, Castrol (Sintéticos 5W30, 10W40, 20W50)",
  },
  {
    id: "filtros_master",
    name: "Cajas Master de Filtros y Bujías NGK",
    icon: Wrench,
    formats: "Advance y Fram (Aceite, aire, diésel, cabina) + Bujías NGK Iridium/G-Power",
  },
];

const VOLUME_TIERS = [
  {
    id: "inicial",
    label: "Escala 1: Taller o Finca Local",
    range: "5 a 15 Canecas / Baterías mensuales",
    discountBadge: "Precios Mayoristas de Base",
    deliveryNote: "Despacho inmediato desde bodega Pedernales",
  },
  {
    id: "mediano",
    label: "Escala 2: Flota Mediana o Lubricadora",
    range: "16 a 45 Canecas / Baterías mensuales",
    discountBadge: "Descuento Escalonado Preferencial",
    deliveryNote: "Tarifa preferencial de flete interprovincial",
  },
  {
    id: "pesado",
    label: "Escala 3: Gran Flota o Complejo Camaronero",
    range: "+45 Unidades / Tambores de 55 Galones",
    discountBadge: "Condición Máxima Distribuidor",
    deliveryNote: "Paletizado y logística dedicada en ruta",
  },
];

export default function B2BQuoteCalculator() {
  const [selectedSector, setSelectedSector] = useState<SectorOption>(B2B_SECTORS[0]);
  const [selectedLines, setSelectedLines] = useState<string[]>([PRODUCT_LINES[0].id, PRODUCT_LINES[1].id]);
  const [selectedVolume, setSelectedVolume] = useState(VOLUME_TIERS[1]);
  const [deliveryLocation, setDeliveryLocation] = useState<string>("");

  const toggleLine = (lineId: string) => {
    setSelectedLines((prev) => {
      if (prev.includes(lineId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((id) => id !== lineId);
      } else {
        return [...prev, lineId];
      }
    });
  };

  const selectedLinesNames = PRODUCT_LINES.filter((pl) => selectedLines.includes(pl.id))
    .map((pl) => pl.name)
    .join(" + ");

  const cityLabel = deliveryLocation.trim() ? deliveryLocation.trim() : "Ecuador (a coordinar)";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-100">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#061B40] via-[#092352] to-[#04122E] border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC500]/20 text-[#FFC500] border border-[#FFC500]/40 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Herramienta Interactiva para Empresas</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Cotizador Rápido de Volumen y Cuentas Corporativas B2B
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Configura el perfil de tu empresa y requerimientos para obtener una estimación de escala mayorista y solicitar atención técnica prioritaria por WhatsApp con facturación legal SRI.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* STEP 1: SECTOR SELECTION */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#FFC500] text-slate-950 font-black text-xs flex items-center justify-center">
              1
            </span>
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Selecciona el Sector o Tipo de Negocio:
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {B2B_SECTORS.map((sector) => {
              const IconComp = sector.icon;
              const isSelected = selectedSector.id === sector.id;

              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => {
                    setSelectedSector(sector);
                    trackEvent("b2b_calculator_use", { sector: sector.name });
                  }}
                  className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? "bg-[#0A2662] text-white border-[#FFC500] ring-1 ring-[#FFC500] shadow-md shadow-blue-900/30"
                      : "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-[#FFC500] text-slate-950 font-bold" : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        isSelected ? "bg-amber-400/20 text-[#FFC500]" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {sector.badge}
                    </span>
                  </div>

                  <div>
                    <strong className="block text-xs font-black leading-tight text-white">
                      {sector.name}
                    </strong>
                    <span className="block text-[11px] text-slate-400 leading-snug mt-1">
                      {sector.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: PRODUCT LINES MULTI-SELECT */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#FFC500] text-slate-950 font-black text-xs flex items-center justify-center">
              2
            </span>
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Líneas de Producto Requeridas (Puedes marcar varias):
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRODUCT_LINES.map((line) => {
              const Icon = line.icon;
              const isChecked = selectedLines.includes(line.id);

              return (
                <button
                  key={line.id}
                  type="button"
                  onClick={() => toggleLine(line.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isChecked
                      ? "bg-[#0A2662]/80 border-[#FFC500] text-white"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 ${
                      isChecked ? "bg-[#FFC500] text-slate-950" : "border border-slate-700 bg-slate-800"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-xs font-black text-white flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#FFC500] shrink-0" />
                      <span>{line.name}</span>
                    </span>
                    <span className="block text-[11px] text-slate-400">{line.formats}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3: VOLUME ESTIMATION & LOCATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Volume Scale (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC500] text-slate-950 font-black text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="text-sm font-black text-white uppercase tracking-wider">
                Volumen Estimado de Consumo Mensual:
              </h4>
            </div>

            <div className="space-y-2">
              {VOLUME_TIERS.map((tier) => {
                const isSelected = selectedVolume.id === tier.id;

                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedVolume(tier)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#0A2662] border-[#FFC500] text-white shadow-md ring-1 ring-[#FFC500]/50"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-black text-white">{tier.label}</span>
                      <span className="block text-[11px] text-slate-400">{tier.range}</span>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {tier.discountBadge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: City/Canton Input (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFC500] text-slate-950 font-black text-xs flex items-center justify-center">
                4
              </span>
              <h4 className="text-sm font-black text-white uppercase tracking-wider">
                Cantón / Ciudad de Operación:
              </h4>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="Ej: Pedernales, Quito, Manta, Machala..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC500]"
                />
              </div>

              <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
                <span>Rutas Frecuentes:</span>
                {["Pedernales", "Quito", "Guayaquil", "Manta", "Machala", "Santo Domingo"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setDeliveryLocation(c)}
                    className="hover:text-[#FFC500] underline"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 4: DYNAMIC SUMMARY CARD & 1-CLICK WHATSAPP PROPOSAL */}
        <div className="p-6 bg-gradient-to-br from-slate-950 via-[#061B40] to-slate-950 rounded-2xl border border-slate-700 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#FFC500] font-black uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Propuesta Técnica y Comercial Personalizada</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {selectedSector.name} ➔ Destino: {cityLabel}
              </h4>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">Condición Aplicada</span>
                <span className="text-xs font-black text-white">{selectedVolume.discountBadge}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
              <strong className="text-amber-400 block font-bold">Líneas en Consulta:</strong>
              <p className="text-slate-300">{selectedLinesNames}</p>
            </div>

            <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
              <strong className="text-blue-400 block font-bold">Logística y Despacho:</strong>
              <p className="text-slate-300">{selectedVolume.deliveryNote} desde Bodega Matriz Pedernales.</p>
            </div>

            <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
              <strong className="text-emerald-400 block font-bold">Facturación SRI:</strong>
              <p className="text-slate-300">Comprobante electrónico inmediato con RUC para crédito tributario.</p>
            </div>
          </div>

          <div>
            <a
              href={buildWhatsAppLink("b2b", {
                city: cityLabel,
                details: `Hola LiderPro Pedernales, requiero cotización formal B2B al por mayor para ${selectedSector.name}. Líneas requeridas: ${selectedLinesNames}. Volumen estimado: ${selectedVolume.range}. Ciudad de entrega: ${cityLabel}. Por favor comunicarse con asesor comercial.`
              })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("b2b_whatsapp_click", {
                  sector: selectedSector.name,
                  city: cityLabel,
                  volume: selectedVolume.label
                })
              }
              className="btn-whatsapp !w-full !py-4 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl shadow-xl transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Solicitar Cotización Formal para {selectedSector.name} por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
