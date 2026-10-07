import Link from "next/link";
import { BUSINESS_CONFIG } from "@/data/businessConfig";

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-navy border-b border-slate-800 text-xs py-2 px-4 text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-white">LiderPro Operación Digital:</span>
          <span>Puntos estratégicos en Pedernales (Manabí) y Quito (Pichincha)</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span className="hidden md:inline">Envíos a nivel nacional • Entrega 24–48 h*</span>
          <Link
            href="/sucursales"
            className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors"
          >
            Ver Cobertura Logística →
          </Link>
        </div>
      </div>
    </div>
  );
}
