import type { Metadata } from "next";
import { Zap, ShieldCheck, Award, Truck, Gauge, Factory } from "lucide-react";
import BatteriesExplorer from "@/components/BatteriesExplorer";
import EmergencyBanner from "@/components/EmergencyBanner";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Baterías Automotrices Selladas 12V | Baterías Ecuador & Bosch S4",
  description:
    "Distribuidor autorizado multimarca con 48 modelos de baterías selladas libres de mantenimiento: Baterías Ecuador Full Equipo y Bosch S4 PowerFrame con garantía oficial de 12 a 18 meses. Despacho nacional desde Bodega Matriz Pedernales.",
  keywords: [
    "baterias ecuador full equipo",
    "baterias bosch s4 ecuador",
    "bateria grupo 24 34 42 31 n150 n200",
    "baterias para camiones y camaroneras ecuador",
    "comprar bateria auto pedernales manabi",
  ],
  alternates: {
    canonical: "/baterias",
  },
  openGraph: {
    title: "Baterías Automotrices Selladas | Baterías Ecuador & Bosch S4 — LiderPro",
    description:
      "48 referencias de baterías automotrices y de servicio pesado con garantía oficial de fábrica y despacho seguro a las 24 provincias del Ecuador.",
    url: "https://liderpro-digital.vercel.app/baterias",
    type: "website",
    images: [{ url: "/images/products/baterias-ecuador-fe.png", width: 800, height: 800 }],
  },
};

export default function BatteriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-[#061B40] via-slate-900 to-[#0A3B8C] text-white p-6 sm:p-12 rounded-3xl border border-[#0A3B8C]/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Distribuidor Autorizado Oficial • Baterías Ecuador & Bosch
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Baterías Automotrices Selladas con Garantía Nacional de Fábrica
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Catálogo completo de <strong>48 modelos certificados</strong> para autos, camionetas 4x4, transporte pesado y sector camaronero. Tecnología 100% libre de mantenimiento, aleación Calcio-Plata y diagnóstico computarizado previo desde nuestra Bodega Matriz en Pedernales (Manabí).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-amber-400 font-black text-sm">12 a 18 Meses</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Póliza de garantía sellada</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-emerald-400 font-black text-sm">100% Selladas</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Libres de mantenimiento</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-blue-400 font-black text-sm">Hasta 1.200 CCA</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Potencia arranque en frío</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-purple-400 font-black text-sm">24 Provincias</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Despacho vertical seguro</div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Fast Banner */}
      <EmergencyBanner />

      {/* Technical Value: Capacities & BCI Groups */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Guía de Selección Técnica
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Matriz de Capacidad y Grupos BCI para Ecuador
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Compara los grupos de baterías y selecciona la capacidad adecuada para no sobrecargar el alternador ni sufrir arranques lentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Livianos */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0A3B8C] flex items-center justify-center text-xl font-bold">
              🚗
            </div>
            <div className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
              Grupo 42 / 24 / 34
            </div>
            <h3 className="text-base font-black text-slate-900">
              Autos & Sedanes Familiares
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              De <strong>11 a 13 placas (45 a 70 Amp)</strong> con CCA entre 450A y 580A. Dimensiones compactas diseñadas para bandejas originales sin modificar anclajes ni bornes.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Modelos: 42 HP (62A), 34 HP (80A), Bosch 24 HP S4
            </div>
          </div>

          {/* Card 2: Camionetas */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold">
              🛻
            </div>
            <div className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
              Grupo 27 / 27R / 34R
            </div>
            <h3 className="text-base font-black text-slate-900">
              Camionetas 4x4 & SUV Diésel
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              De <strong>15 a 17 placas (75 a 95 Amp)</strong> con CCA entre 650A y 800A. Placas reforzadas contra vibraciones severas en trocha y alto amperaje para precalentadores diésel.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Modelos: 27 HP (95A), Bosch S4 27 HP (88A)
            </div>
          </div>

          {/* Card 3: Pesados */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl font-bold">
              🚛
            </div>
            <div className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
              Grupo 31 SHD / N150
            </div>
            <h3 className="text-base font-black text-slate-900">
              Camiones, Flotas & Maquinaria
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              De <strong>21 a 33 placas (100 a 160 Amp)</strong> con terminales roscados o de poste cónico. Construcción Super Heavy Duty (SHD) con separadores de fibra de vidrio para ciclos continuos.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Modelos: Grupo 31 SHD (105A), N150 SHD (160A)
            </div>
          </div>

          {/* Card 4: Camaroneras */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xl font-bold">
              🦐
            </div>
            <div className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
              Ciclo Estacionario & Marino
            </div>
            <h3 className="text-base font-black text-slate-900">
              Sector Acuícola & Camaroneras
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Baterías de alta reserva para motores estacionarios de bombas de agua, aireadores y generadores en piscinas de la zona norte de Manabí (Pedernales, Cojimíes, Jama).
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Modelos: Grupo 31 SHD, N150, Baterías de Alta Capacidad
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Batteries Explorer Component */}
      <section id="catalogo-baterias" className="scroll-mt-24">
        <BatteriesExplorer />
      </section>

      {/* Factory Warranty & Quality Assurance Protocol */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Compromiso de Autenticidad LiderPro
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Protocolo de Activación de Garantía y Embalaje Seguro
            </h3>
          </div>
          <a
            href={buildWhatsAppLink("emergency", {})}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-white text-xs font-bold py-2.5 px-5 rounded-xl shrink-0 inline-flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Consultar Garantía por WhatsApp</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Gauge className="w-4 h-4 text-[#0A3B8C]" />
              <span>1. Diagnóstico de Carga y Alternador</span>
            </div>
            <p className="leading-relaxed">
              Cada batería despachada cuenta con verificación previa de voltaje de circuito abierto (mínimo 12.6V) y prueba bajo carga simulada para certificar el estado de las celdas antes de salir de bodega.
            </p>
          </div>

          <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Factory className="w-4 h-4 text-emerald-600" />
              <span>2. Póliza Oficial de Fábrica Sellada</span>
            </div>
            <p className="leading-relaxed">
              Entregamos la póliza física con fecha, número de serie y sello de Distribuidor Autorizado, válida para cobertura ante cualquier defecto de fabricación a nivel nacional en centros de servicio de la marca.
            </p>
          </div>

          <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>3. Despacho Vertical Protegido</span>
            </div>
            <p className="leading-relaxed">
              Embalaje con flejado y señalética de posición vertical estricta. El cliente acuerda por WhatsApp el transportista y método de entrega más conveniente para su ciudad en cualquiera de las 24 provincias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
