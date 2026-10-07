import Link from "next/link";
import { BUSINESS_CONFIG } from "@/data/businessConfig";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-brand-primary flex items-center justify-center text-white font-black text-sm">
                L
              </span>
              <span className="text-lg font-black text-white">
                LIDER<span className="text-brand-primary">PRO</span>
              </span>
            </div>
            <p className="text-slate-300 font-medium text-xs">
              "{BUSINESS_CONFIG.slogan}"
            </p>
            <p className="text-slate-400 max-w-md leading-relaxed text-[11px]">
              {BUSINESS_CONFIG.legalNotice}
            </p>
          </div>

          {/* Categorías */}
          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Productos
            </h5>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link href="/baterias" className="hover:text-white transition-colors">
                  Baterías Automotrices
                </Link>
              </li>
              <li>
                <Link href="/lubricantes" className="hover:text-white transition-colors">
                  Lubricantes y Aceites
                </Link>
              </li>
              <li>
                <Link href="/filtros" className="hover:text-white transition-colors">
                  Filtros Blindados
                </Link>
              </li>
              <li>
                <Link href="/encuentra-tu-producto" className="hover:text-white transition-colors">
                  Buscador por Vehículo
                </Link>
              </li>
            </ul>
          </div>

          {/* Sedes */}
          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Atención Directa
            </h5>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link href="/sucursales" className="hover:text-white transition-colors">
                  Pedernales (Manabí)
                </Link>
              </li>
              <li>
                <Link href="/sucursales" className="hover:text-white transition-colors">
                  Quito (Pichincha)
                </Link>
              </li>
              <li>
                <Link href="/envios" className="hover:text-white transition-colors">
                  Envíos a Nivel Nacional
                </Link>
              </li>
              <li>
                <Link href="/guias" className="hover:text-white transition-colors">
                  Guías Técnicas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} LiderPro Operación Independiente. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/sucursales" className="hover:text-slate-200">Ubicaciones</Link>
            <Link href="/envios" className="hover:text-slate-200">Envíos</Link>
            <Link href="/contacto" className="hover:text-slate-200">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
