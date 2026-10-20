import type { Metadata } from "next";
import { Wrench, ShieldCheck, ArrowRight, Truck, Droplets, Wind } from "lucide-react";
import FiltersExplorer from "@/components/FiltersExplorer";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Filtros de Aceite, Combustible, Aire y Cabina | Advance Filters Oficial",
  description:
    "Catálogo oficial de 188 filtros Advance Filters en Ecuador: filtros de aceite blindados, separadores de agua diésel Common Rail, filtros de aire de motor y cabina A/C. Despacho nacional diario desde Bodega Matriz Pedernales.",
  keywords: [
    "filtros advance ecuador",
    "filtro de aceite chevrolet aveo sail dmax",
    "filtro de combustible diesel trampa de agua",
    "filtro de aire toyota hilux kia sportage",
    "distribuidor filtros automotrices ecuador",
  ],
  alternates: {
    canonical: "/filtros",
  },
  openGraph: {
    title: "Filtros Automotrices y Servicio Pesado Advance Filters — LiderPro Ecuador",
    description:
      "188 referencias en filtración de aceite, aire, cabina y combustible diésel con equivalencias OEM verificadas y despacho a las 24 provincias.",
    url: "https://liderpro-digital.vercel.app/filtros",
    type: "website",
    images: [{ url: "/images/products/advance-oil-filter.png", width: 800, height: 800 }],
  },
};

export default function FiltersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Institutional Hero Banner */}
      <div className="bg-gradient-to-r from-[#061B40] via-slate-900 to-[#0A3B8C] text-white p-6 sm:p-12 rounded-3xl border border-[#0A3B8C]/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            Distribución Autorizada • Advance Filters Ecuador
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Filtración Blindada de Grado Original para Máxima Protección
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Línea oficial de <strong>188 filtros Advance Filters</strong> certificados bajo normas internacionales de calidad. Blindados de aceite con válvula anti-retorno de silicona, trampas de agua para diésel Common Rail, filtros de aire de microfibra fenólica y filtros de polen de cabina para el parque automotor de Ecuador.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-amber-400 font-black text-sm">99.2%</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Eficiencia de retención</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-emerald-400 font-black text-sm">Silicona Roja</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Válvula anti-drenado</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-blue-400 font-black text-sm">Common Rail</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Separación de agua</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <div className="text-purple-400 font-black text-sm">24 Provincias</div>
              <div className="text-slate-300 text-[11px] mt-0.5">Despacho nacional</div>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Value: The 4 Filter Families */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Ingeniería de Filtración Certificada
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Las 4 Familias Críticas de Filtración Advance
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Diseñados para resistir las condiciones más exigentes del combustible, clima y carreteras ecuatorianas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Aceite */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0A3B8C] flex items-center justify-center text-xl font-bold">
              🛢️
            </div>
            <h3 className="text-base font-black text-slate-900">
              Filtros de Aceite Blindados
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipados con <strong>válvula anti-retorno de silicona</strong> que previene el drenado del lubricante al apagar el motor, garantizando lubricación instantánea y cero desgaste metálico en el arranque en frío.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Ref: AO-3387, AO-1314, AO-222
            </div>
          </div>

          {/* Card 2: Combustible */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl font-bold">
              ⛽
            </div>
            <h3 className="text-base font-black text-slate-900">
              Combustible & Trampa Diésel
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Medio filtrante coalescente de alta densidad que separa hasta el <strong>99% del agua emulsionada</strong> y micropartículas de hollín, protegiendo inyectores piezoeléctricos Common Rail de alto costo.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Ref: AFE-297 (D-Max), AFP-974 (Wingle)
            </div>
          </div>

          {/* Card 3: Aire */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold">
              💨
            </div>
            <h3 className="text-base font-black text-slate-900">
              Filtros de Aire de Motor
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Plisado geométrico uniforme con empaque perimetral de <strong>poliuretano vulcanizado</strong>. Evita la entrada de polvo volcánico, arena costera y partículas abrasivas hacia los cilindros y sensor MAF.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Ref: AR-281, AR-341, AF-Series
            </div>
          </div>

          {/* Card 4: Cabina */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xl font-bold">
              🌬️
            </div>
            <h3 className="text-base font-black text-slate-900">
              Filtros de Cabina / A/C
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fibras electrostáticas con opción de carbón activado para retener polen, bacterias y malos olores. Prolonga la vida útil del evaporador del aire acondicionado y garantiza aire puro a los ocupantes.
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Ref: AC-110, AC-220, Polvo PM2.5
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Filters Explorer Component */}
      <section id="catalogo-filtros" className="scroll-mt-24">
        <FiltersExplorer />
      </section>

      {/* Technical Maintenance Protocol for Ecuador */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
              Buenas Prácticas de Mantenimiento Preventivo
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Frecuencias de Reemplazo en Condiciones de Operación Ecuatorianas
            </h3>
          </div>
          <a
            href={buildWhatsAppLink("quick_compatibility", {
              neededItem: "Asesoría Técnica de Filtros",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-white text-xs font-bold py-2.5 px-5 rounded-xl shrink-0 inline-flex items-center gap-2"
          >
            <span>Consultar por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-2 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Droplets className="w-4 h-4 text-amber-400" />
              <span>Filtro de Aceite (Cada Cambio)</span>
            </div>
            <p className="leading-relaxed">
              Nunca reutilices un filtro de aceite usado. Un filtro saturado abre su válvula bypass interna, permitiendo que aceite sucio con partículas de carbón circule libremente por los cojinetes de biela y bancada.
            </p>
            <span className="inline-block text-[11px] font-bold text-amber-300">
              Frecuencia: Cada 5.000 a 7.500 km
            </span>
          </div>

          <div className="space-y-2 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Filtro Diésel / Trampa de Agua</span>
            </div>
            <p className="leading-relaxed">
              El diésel nacional presenta variaciones en contenido de azufre y condensación de agua en tanques. Purgar la trampa de agua mensualmente y sustituir el elemento previene fallas de arranque y daño en la bomba de inyección.
            </p>
            <span className="inline-block text-[11px] font-bold text-emerald-300">
              Frecuencia: Cada 10.000 km (Purga mensual)
            </span>
          </div>

          <div className="space-y-2 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Wind className="w-4 h-4 text-blue-400" />
              <span>Filtro de Aire & Cabina</span>
            </div>
            <p className="leading-relaxed">
              En vías destapadas o zonas con polvo salino costero, sopletear con aire a presión no se recomienda porque rompe los microporos de la celulosa. La sustitución oportuna reduce el consumo de combustible hasta un 8%.
            </p>
            <span className="inline-block text-[11px] font-bold text-blue-300">
              Frecuencia: Cada 10.000 a 15.000 km
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
