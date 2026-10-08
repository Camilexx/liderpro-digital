import type { Metadata } from "next";
import EmergencyBanner from "@/components/EmergencyBanner";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "¿Tu Vehículo No Enciende? Auxilio de Batería Inmediato | LiderPro Ecuador",
  description:
    "Servicio de respuesta rápida para vehículos sin encendido. Identificación de batería, prueba de carga y despacho urgente en Pedernales, Quito y nacional.",
};

export default function EmergencyBatteryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <EmergencyBanner />

        {/* Diagnostic Guide */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-brand-dark">
            Diagnóstico Rápido: ¿Es la batería o el alternador?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
            <div className="p-5 bg-red-50/60 rounded-2xl border border-red-100 space-y-2">
              <strong className="text-red-900 font-bold block">
                Síntoma 1: Hace "clic-clic" y no gira el motor
              </strong>
              <p>
                La batería no tiene suficiente amperaje de arranque en frío (CCA). Suele suceder cuando tiene más de 18-24 meses de uso o si se dejaron luces encendidas.
              </p>
            </div>

            <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-2">
              <strong className="text-amber-900 font-bold block">
                Síntoma 2: Se apagó mientras ibas manejando
              </strong>
              <p>
                Probablemente sea el alternador que dejó de suministrar corriente continua. En este caso una batería nueva se descargará en pocos minutos si no se repara el alternador.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              ¿No estás seguro? Nuestro personal técnico te guiará por videollamada o mensaje.
            </p>
            <a
              href={buildWhatsAppLink("emergency")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Pedir Asistencia Inmediata
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
