import Link from "next/link";
import { ShieldCheck, MapPin, Truck, Phone, MessageCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300 border-t border-slate-800">
      {/* Upper strategic trust banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="p-3 bg-red-950/60 text-brand-primary rounded-xl shrink-0 border border-red-800/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Autenticidad y Calidad Garantizada</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Productos verificados, formulaciones certificadas y respaldo técnico para tu motor.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="p-3 bg-amber-950/60 text-amber-400 rounded-xl shrink-0 border border-amber-800/40">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Puntos Estratégicos: Pedernales & Quito</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Presencia física para atender la Costa y la Sierra, facilitando retiros y despacho nacional.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="p-3 bg-emerald-950/60 text-emerald-400 rounded-xl shrink-0 border border-emerald-800/40">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Envíos a Nivel Nacional (24–48 h*)</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Despachamos desde el punto más conveniente según disponibilidad y cobertura de transporte.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
                L<span className="text-amber-300 text-sm">P</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                LIDER<span className="text-brand-primary">PRO</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium italic">
              "{BUSINESS_CONFIG.slogan}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {BUSINESS_CONFIG.supportingProposition}
            </p>
            <div className="pt-2">
              <p className="text-[11px] text-slate-400 font-mono bg-slate-800/80 p-3 rounded-lg border border-slate-700/70 leading-relaxed">
                <span className="text-amber-400 font-bold block mb-1">Identidad Operativa:</span>
                {BUSINESS_CONFIG.legalNotice}
              </p>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Categorías Clave
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/baterias" className="hover:text-white transition-colors">
                  Baterías Automotrices
                </Link>
              </li>
              <li>
                <Link href="/lubricantes" className="hover:text-white transition-colors">
                  Aceites Sintéticos y Diésel
                </Link>
              </li>
              <li>
                <Link href="/filtros" className="hover:text-white transition-colors">
                  Filtros de Aceite y Combustible
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Refrigerantes Orgánicos OAT
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Pastillas de Freno Cerámicas
                </Link>
              </li>
              <li>
                <Link href="/encuentra-tu-producto" className="text-brand-primary hover:underline font-semibold">
                  Buscador por Vehículo →
                </Link>
              </li>
            </ul>
          </div>

          {/* Cobertura & Puntos */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Puntos Físicos
            </h5>
            <div className="space-y-4 text-xs">
              <div>
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Pedernales (Manabí)
                </p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  {BUSINESS_CONFIG.locations.pedernales.role}
                </p>
                <p className="text-slate-300 text-[11px] mt-1 font-mono">
                  {BUSINESS_CONFIG.locations.pedernales.hours}
                </p>
              </div>

              <div>
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Quito (Pichincha)
                </p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  {BUSINESS_CONFIG.locations.quito.role}
                </p>
                <p className="text-slate-300 text-[11px] mt-1 font-mono">
                  {BUSINESS_CONFIG.locations.quito.hours}
                </p>
              </div>

              <Link href="/sucursales" className="inline-block text-amber-400 hover:underline text-[11px] font-semibold">
                Ver detalles de ubicaciones →
              </Link>
            </div>
          </div>

          {/* Asesoría y Ayuda */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Atención Directa
            </h5>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href={buildWhatsAppLink("general_quote")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-emerald-950/40 border border-emerald-700/50 rounded-lg text-emerald-300 hover:bg-emerald-900/50 transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-brand-whatsapp shrink-0" />
                  <span>WhatsApp Especializado</span>
                </a>
              </li>
              <li>
                <Link href="/emergencia-bateria" className="text-red-400 hover:text-red-300 flex items-center gap-1">
                  <span>🚨 Auxilio / Emergencia Batería</span>
                </Link>
              </li>
              <li>
                <Link href="/guias" className="hover:text-white transition-colors">
                  Guías y Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Talleres y Cotizaciones de Flota
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer legal & subfooter */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} LiderPro Operación Comercial Independiente (Pedernales & Quito). Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/sucursales" className="hover:text-slate-200">
              Ubicaciones
            </Link>
            <Link href="/envios" className="hover:text-slate-200">
              Términos de Envíos
            </Link>
            <Link href="/contacto" className="hover:text-slate-200">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
