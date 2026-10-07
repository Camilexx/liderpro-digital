import Link from "next/link";
import { AlertCircle, ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-red-50 text-brand-primary flex items-center justify-center mx-auto">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h1 className="text-3xl font-black text-brand-dark">
        Página no encontrada (Error 404)
      </h1>

      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
        El producto o enlace que buscas no existe o ha sido reubicado. Utiliza nuestro buscador de compatibilidad para encontrar tu repuesto.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>
        <Link
          href="/encuentra-tu-producto"
          className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Buscador por Vehículo</span>
        </Link>
      </div>
    </div>
  );
}
