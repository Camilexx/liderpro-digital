import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="bg-slate-950 text-slate-300 py-1.5 px-4 text-xs border-b border-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
        <div className="flex items-center gap-2 font-medium text-slate-200 text-[11px] sm:text-xs">
          <span>📍 Sede Central: Pedernales, Manabí · Envíos Diarios a Todo el Ecuador</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-slate-300 text-[11px] sm:text-xs font-medium">
          <span>Garantía de Fábrica · Facturación SRI · Atención WhatsApp Directa</span>
          <Link
            href="/envios"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors font-semibold ml-1"
          >
            Circuito Logístico
          </Link>
        </div>
      </div>
    </div>
  );
}
