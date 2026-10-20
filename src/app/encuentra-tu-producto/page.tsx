import type { Metadata } from "next";
import { Search, ShieldAlert, CheckCircle2, Car, HelpCircle, MessageCircle, Wrench, Zap, Droplets } from "lucide-react";
import VehicleFinder from "@/components/VehicleFinder";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Centro de Compatibilidad y Diagnóstico Automotriz | LiderPro Ecuador",
  description:
    "Verifica la compatibilidad exacta de baterías, aceites, filtros y bujías por marca, modelo y año. Tolerancias mecánicas confirmadas para el parque automotor de Ecuador.",
  alternates: {
    canonical: "/encuentra-tu-producto",
  },
  openGraph: {
    title: "Buscador de Compatibilidad por Vehículo | LiderPro Ecuador",
    description:
      "Filtra baterías, aceites y filtros compatibles con Chevrolet, Toyota, Hyundai, Kia, Nissan, Hino y Suzuki.",
    url: "https://liderpro-digital.vercel.app/encuentra-tu-producto",
    type: "website",
  },
};

const POPULAR_VEHICLE_KITS = [
  {
    make: "Chevrolet",
    model: "Aveo Family / Emotion & Sail 1.4 / 1.5",
    segment: "Autos Livianos",
    icon: "🚗",
    battery: "Batería 42 HP (62A) o 34 HP (80A)",
    oil: "Mannol 5W-30 Sintético o Aroil 10W-40",
    filter: "Filtro Aceite Advance AO-3387",
    query: "Chevrolet Sail Aveo",
  },
  {
    make: "Chevrolet",
    model: "D-Max 2.5 / 3.0 / CRDi (Todas las Versiones)",
    segment: "Camionetas Diésel 4x4",
    icon: "🛻",
    battery: "Batería 27 HP I (95A) o Bosch S4 27 HP (88A)",
    oil: "AROIL 15W-40 CI-4 o Mobil Delvac Super",
    filter: "Filtro Combustible Diésel AFE-297",
    query: "Chevrolet D-Max",
  },
  {
    make: "Toyota",
    model: "Hilux 2.4 / 2.7 / 2.8 & Fortuner",
    segment: "Camionetas & SUV Diésel/Gasolina",
    icon: "🚙",
    battery: "Batería 27 HP (95A) Reforzada",
    oil: "Mannol 5W-30 o AROIL 15W-40 CI-4",
    filter: "Filtro Aceite AO-222 / Filtro Trampa",
    query: "Toyota Hilux",
  },
  {
    make: "Kia & Hyundai",
    model: "Sportage, Tucson, Picanto, Accent & Soluto",
    segment: "SUVs & Sedanes Modernos",
    icon: "⚡",
    battery: "Batería 42 HP (62A) o N40 (45A)",
    oil: "100% Sintético 5W-30 API SP con protección LSPI",
    filter: "Filtro Advance AO-1002 / AO-1005",
    query: "Kia Sportage Picanto",
  },
  {
    make: "Great Wall",
    model: "Wingle 5 & Wingle 7 Diésel 2.0 / 2.8",
    segment: "Camionetas de Trabajo",
    icon: "🏔️",
    battery: "Batería 27R (95A) o 34 HP",
    oil: "AROIL 15W-40 Diésel Heavy Duty",
    filter: "Filtro Combustible Trampa AFP-974",
    query: "Great Wall Wingle",
  },
  {
    make: "Hino & Isuzu",
    model: "Hino 300 / 500 & Camiones Isuzu Forward / NLR",
    segment: "Transporte Pesado & Flotas",
    icon: "🚛",
    battery: "Batería Grupo 31 SHD (105A) o N150 SHD (160A)",
    oil: "AROIL 15W-40 en Caneca de 5 Galones (19L)",
    filter: "Filtro Aceite Pesado AO-1314",
    query: "Hino 300 500",
  },
];

const COMPATIBILITY_FAQS = [
  {
    q: "¿Por qué es peligroso colocar un aceite más grueso como 20W-50 en un motor moderno diseñado para 5W-30?",
    a: "Los motores modernos cuentan con ductos de lubricación micrométricos, variadores de fase hidráulicos (VVT / VTC) y turbocompresores. Un aceite más espeso tarda hasta 15 veces más en subir a la culata durante el arranque en frío, provocando fricción metal con metal, retraso en la apertura de válvulas y desgaste prematuro de la cadena de distribución.",
  },
  {
    q: "¿Qué sucede si instalo una batería con menor amperaje o CCA del requerido por el manual?",
    a: "Si el amperaje (Ah) y la corriente de arranque en frío (CCA) son inferiores, el motor de arranque girará forzado, el voltaje descenderá por debajo de 9.6V durante el encendido y los módulos electrónicos (ECU, ABS, dirección asistida) pueden descalibrarse o registrar códigos de error de bajo voltaje.",
  },
  {
    q: "¿Cómo identifico si mi vehículo necesita batería con borne derecho o izquierdo?",
    a: "Párate frente a la batería mirando hacia los bornes (el lado donde están los terminales). Si el borne positivo (rojo, con signo +) queda a tu derecha, la batería es estándar (Derecha). Si queda a tu izquierda, es invertida (marcada usualmente con la letra 'I' como 34 HP I o 27 HP I). Nunca intentes cruzar los cables a la fuerza porque puedes provocar un cortocircuito grave en la computadora del auto.",
  },
  {
    q: "¿Por qué los filtros de aceite Advance Filters incorporan válvula anti-retorno de silicona?",
    a: "Cuando apagas el vehículo, la gravedad tiende a vaciar el filtro y la galería de aceite hacia el cárter. La válvula de silicona roja de Advance sella herméticamente la entrada, reteniendo una columna de lubricante dentro del filtro. De este modo, en el siguiente arranque la presión de aceite sube en 0.2 segundos en lugar de tardar 4 o 5 segundos en seco.",
  },
];

export default function FindYourProductPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Institutional Hero Banner */}
      <div className="bg-gradient-to-r from-[#061B40] via-slate-900 to-[#0A3B8C] text-white p-6 sm:p-12 rounded-3xl border border-[#0A3B8C]/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            Centro Tecnológico de Compatibilidad Automotriz
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Terminal de Compatibilidad Mecánica Multimarca
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Elimina el riesgo de comprar repuestos incompatibles. Nuestro sistema cruza tolerancias de fábrica, polaridades BCI, viscosidades API recomendadas por manual y códigos de filtración verificados para el parque automotor de Ecuador.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verificación de manual y chasis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Cero improvisación técnica</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Asesoría directa en WhatsApp en 3 minutos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main VehicleFinder Interactive Station */}
      <div className="max-w-5xl mx-auto">
        <VehicleFinder />
      </div>

      {/* Section: Top 6 Most Popular Vehicle Applications in Ecuador */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Car className="w-3.5 h-3.5 text-[#0A3B8C]" />
            Combinaciones Técnicas Más Solicitadas
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Kits de Repuestos Recomendados por Modelo en Ecuador
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Los vehículos con mayor circulación en el país y sus especificaciones exactas en batería, aceite y filtros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_VEHICLE_KITS.map((kit) => (
            <div
              key={kit.model}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{kit.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                    {kit.segment}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#0A3B8C] uppercase tracking-wider">
                    {kit.make}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-950 leading-snug">
                    {kit.model}
                  </h3>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Batería: </span>
                      <span className="text-slate-600">{kit.battery}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Aceite: </span>
                      <span className="text-slate-600">{kit.oil}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Wrench className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Filtro: </span>
                      <span className="text-slate-600">{kit.filter}</span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={buildWhatsAppLink("quick_compatibility", {
                  vehicleMake: kit.make,
                  vehicleModel: kit.model,
                  neededItem: "Kit Completo de Mantenimiento",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cotizar Kit para este Modelo</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Special VIN / Plate Protocol */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
              Servicio Especial de Consulta Técnica
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              ¿Vehículo Importado, Modificado o con Motor Adaptado?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Si tu vehículo tiene swap de motor, adaptaciones eléctricas o no figura en los catálogos comerciales estándar, un especialista en Pedernales contrastará el número de chasis o placa.
            </p>
          </div>
          <a
            href={buildWhatsAppLink("quick_compatibility", {
              neededItem: "Verificación de Chasis / VIN",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-white text-xs font-bold py-3 px-6 rounded-xl shrink-0 inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar Placa / Chasis por WhatsApp</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
            <div className="text-white font-bold flex items-center gap-2">
              <span className="text-amber-400 font-black">1.</span> Foto de la Ficha o Manual
            </div>
            <p>Envíanos una fotografía de la batería actual, filtro colocado o la etiqueta de especificaciones bajo el capó.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
            <div className="text-white font-bold flex items-center gap-2">
              <span className="text-emerald-400 font-black">2.</span> Cruce Técnico en Base de Datos
            </div>
            <p>Verificamos el amperaje alternador, código OEM del filtro y viscosidad recomendada sin suposiciones.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
            <div className="text-white font-bold flex items-center gap-2">
              <span className="text-blue-400 font-black">3.</span> Despacho Inmediato
            </div>
            <p>Una vez confirmada la pieza exacta, coordinamos el despacho desde Pedernales hacia tu ciudad con el transportista acordado.</p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Compatibility Questions */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Preguntas Frecuentes
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Dudas Clave sobre Compatibilidad Mecánica
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPATIBILITY_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-2.5"
            >
              <h3 className="text-sm font-black text-slate-950 leading-snug">
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Notice regarding zero fabrication */}
      <div className="max-w-3xl mx-auto bg-slate-100 rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-800 block">Compromiso de Honestidad Técnica LiderPro:</strong>
          <p>
            Nunca inventamos datos de compatibilidad ni adivinamos números de parte. Si un modelo no arroja resultado automático, un especialista revisará el manual oficial en nuestra base de datos técnica mediante WhatsApp en tiempo real.
          </p>
        </div>
      </div>
    </div>
  );
}
