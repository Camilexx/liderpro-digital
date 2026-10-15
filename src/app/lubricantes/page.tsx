import type { Metadata } from "next";
import Link from "next/link";
import { Layers, ShieldCheck, Truck, ArrowRight, Factory, Award } from "lucide-react";
import LubricantsExplorer from "@/components/LubricantsExplorer";

export const metadata: Metadata = {
  title: "Aceites y Lubricantes para Motor Multimarca | Sintéticos, Diésel y 4T | LiderPro",
  description:
    "Catálogo oficial de 94 lubricantes automotrices e industriales: Aroil, Mannol Made in Germany, Mobil Delvac, Motul y Valvoline. Viscosidades 5W-30, 10W-30, 15W-40, 20W-50 y Super 40. Despacho nacional desde Pedernales.",
};

export default function LubricantsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-[#061B40] via-slate-900 to-[#0A3B8C] text-white p-6 sm:p-12 rounded-3xl border border-[#0A3B8C]/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Distribución Multimarca Autorizada • Aroil • Mannol • Mobil • Motul
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Lubricación de Alta Ingeniería con Homologaciones Internacionales
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Línea oficial de <strong>94 referencias certificadas</strong> en lubricantes sintéticos, semisintéticos, diésel pesado y aceites de alta viscosidad para la costa ecuatoriana. Productos 100% legítimos con sellos inviolables de fábrica y facturación electrónica SRI.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-amber-400 font-black text-sm">Norma API SP</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Protección turbo & LSPI</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-emerald-400 font-black text-sm">Made in Germany</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Mannol OEM homologado</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-blue-400 font-black text-sm">Heavy Duty Diésel</div>
              <div className="text-slate-300 text-[11px] mt-0.5">15W-40 CI-4 / CK-4</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-purple-400 font-black text-sm">24 Provincias</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Canecas, galones y litros</div>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Value: Viscosity Matrix */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Ingeniería de Fluidos Automotrices
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Guía de Selección de Viscosidad para Ecuador
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Comprende el comportamiento térmico de cada fluido y protege los componentes internos de tu motor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Sintéticos */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0A3B8C] flex items-center justify-center text-xl font-bold">
              ⚡
            </div>
            <div className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
              0W-20 / 5W-30 / 5W-40
            </div>
            <h3 className="text-base font-black text-slate-900">
              100% Sintéticos API SP
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bases sintéticas PAO y éster con control estricto de <strong>pre-ignición a baja velocidad (LSPI)</strong>. Máxima película lubricante en motores turboalimentados y menor resistencia al giro para ahorro de combustible.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Líneas: Mannol Special Plus, Mobil 1, Valvoline
            </div>
          </div>

          {/* Card 2: Semisintéticos */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold">
              ⚖️
            </div>
            <div className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
              10W-30 / 10W-40
            </div>
            <h3 className="text-base font-black text-slate-900">
              Semisintéticos de Alto Desempeño
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equilibrio óptimo para flotas mixtas y vehículos con más de 100.000 km. Excelente fluidez durante el encendido matutino y alta estabilidad de viscosidad en tráfico pesado o cuestas prolongadas.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Líneas: Mannol Defender, Aroil Semi-Sintético
            </div>
          </div>

          {/* Card 3: Diésel Heavy Duty */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl font-bold">
              🚛
            </div>
            <div className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
              15W-40 CI-4 / CK-4
            </div>
            <h3 className="text-base font-black text-slate-900">
              Diésel Pesado & Camaroneras
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paquete de aditivos detergentes y dispersantes para neutralizar el hollín y ácidos producidos por el diésel. Especial para camiones Hino, Isuzu, camionetas D-Max/Hilux y motores de bombeo estacionario.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Líneas: AROIL 15W-40, Mobil Delvac 1300 Super
            </div>
          </div>

          {/* Card 4: Alto Kilometraje & Costa */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xl font-bold">
              🔥
            </div>
            <div className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
              20W-50 / 25W-60 / Super 40
            </div>
            <h3 className="text-base font-black text-slate-900">
              Alto Kilometraje & Clima Cálido
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Formulado para sellar holguras mecánicas y restaurar compresión en cilindros con desgaste. Resistencia insuperable a la evaporación térmica bajo el calor constante de la costa ecuatoriana.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Líneas: AROIL Super 40 (Top #1), AROIL 25W-60
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Lubricants Explorer Component */}
      <section id="catalogo-lubricantes" className="scroll-mt-24">
        <LubricantsExplorer />
      </section>

      {/* Wholesale & Commercial Fleet Services */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
              Ventas Mayoristas & Flotas de Transporte
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Suministro en Canecas de 5 Galones y Tambores Industriales
            </h3>
          </div>
          <Link
            href="/b2b"
            className="btn-primary btn-shine text-xs font-black tracking-wider py-3 px-6 rounded-xl shrink-0 inline-flex items-center gap-2"
          >
            <span>Ir al Portal B2B Mayorista</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-2 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Factory className="w-4 h-4 text-amber-400" />
              <span>Camaroneras & Sector Acuícola</span>
            </div>
            <p className="leading-relaxed">
              Despacho programado de AROIL 15W-40 y AROIL 25W-60 en Canecas de 5 Galones para motores estacionarios de bombas de agua y generadores diésel en Pedernales, Cojimíes y cantones aledaños.
            </p>
          </div>

          <div className="space-y-2 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Flotas de Carga & Cooperativas</span>
            </div>
            <p className="leading-relaxed">
              Precios escalonados por volumen para cabezales, volquetas y buses interprovinciales con facturación electrónica SRI detallada y retenciones tributarias aplicables.
            </p>
          </div>

          <div className="space-y-2 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Talleres & Lubricadoras</span>
            </div>
            <p className="leading-relaxed">
              Consolida en un solo pedido filtros Advance, aceites sintéticos Mannol y baterías con entrega directa coordinada con el transportista más conveniente para tu cantón.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
