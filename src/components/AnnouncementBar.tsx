import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-medium text-slate-200">
            Puntos de atención en Pedernales (Manabí) y Quito (Pichincha)
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400">
          <span>Envíos a todo el Ecuador • 24–48 h*</span>
          <Link
            href="/sucursales"
            className="text-slate-200 hover:text-white underline underline-offset-2 transition-colors font-medium"
          >
            Ver sedes
          </Link>
        </div>
      </div>
    </div>
  );
}
