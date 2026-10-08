import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-semibold text-slate-200">
            Envíos a todo el Ecuador • Calidad especializada y asesoría técnica real
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400">
          <span>Puntos de atención y distribución en Pedernales y Quito</span>
          <Link
            href="/envios"
            className="text-slate-200 hover:text-white underline underline-offset-2 transition-colors font-medium"
          >
            Detalle logístico
          </Link>
        </div>
      </div>
    </div>
  );
}
