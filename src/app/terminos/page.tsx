import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos y Condiciones de Venta y Servicio | LiderPro Ecuador",
  description:
    "Términos y condiciones comerciales de LiderPro Ecuador. Normativa aplicable a cotizaciones, despachos nacionales, pagos, garantías y facturación electrónica.",
  alternates: {
    canonical: "/terminos",
  },
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#061B40] via-[#092352] to-[#04122E] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/15 border border-blue-500/30 rounded-full text-xs font-bold text-blue-300 uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-[#FFC500]" />
            <span>MARCO LEGAL Y COMERCIAL VIGENTE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Términos y Condiciones de Venta
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Última actualización: Octubre de 2026. Al solicitar cotizaciones o realizar compras a través de nuestros canales oficiales, aceptas las presentes disposiciones comerciales.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3B8C]"></span>
              1. Identidad de la Empresa y Ámbito de Aplicación
            </h2>
            <p>
              LiderPro Ecuador opera como Distribuidor Autorizado Multimarca de lubricantes, baterías, filtros y repuestos automotrices con Sede Central y Hub Logístico en la ciudad de Pedernales, Provincia de Manabí, República del Ecuador. Estas condiciones regulan la relación comercial entre LiderPro y sus clientes finales, talleres mecánicos, cooperativas y empresas B2B.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3B8C]"></span>
              2. Validez de Cotizaciones y Precios
            </h2>
            <p>
              Las cotizaciones emitidas a través de nuestro sitio web, cotizador multiproducto o mensajes oficiales de WhatsApp tienen una validez estándar de <strong>48 horas hábiles</strong> a partir de su emisión, salvo variaciones excepcionales de stock o precios de lista oficiales de los fabricantes importadores.
            </p>
            <p>
              Los precios cotizados son en Dólares de los Estados Unidos de América (USD) y se desglosan con su respectivo Impuesto al Valor Agregado (IVA) conforme a la legislación tributaria ecuatoriana.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3B8C]"></span>
              3. Pagos y Emisión de Facturación Electrónica SRI
            </h2>
            <p>
              Todo despacho nacional se procesa una vez confirmada la acreditación de los fondos correspondientes en nuestras cuentas bancarias empresariales autorizadas. Cada transacción está respaldada por una Factura Electrónica legalmente autorizada por el Servicio de Rentas Internas (SRI), cuyos archivos XML y RIDE se envían al correo suministrado por el comprador.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3B8C]"></span>
              4. Despachos y Transporte Interprovincial
            </h2>
            <p>
              Los pedidos se embalan bajo estándares técnicos rigurosos (precintos antiderrame y fijación vertical de acumuladores) y se entregan a couriers o cooperativas de transporte interprovincial de carga certificadas. LiderPro proporciona al cliente la foto de la guía física de remisión con el número de rastreo. Es responsabilidad del cliente inspeccionar el paquete externamente al momento de la recepción antes de suscribir la conformidad con el transportista.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3B8C]"></span>
              5. Garantías de Fábrica y Devoluciones
            </h2>
            <p>
              Las baterías comercializadas (Baterías Ecuador, Bosch) cuentan con 12 meses de garantía contra defectos internos de fábrica, sujeta a evaluación técnica del acumulador y del sistema eléctrico del vehículo. Para consultar las exclusiones y el protocolo detallado, consulta nuestra página oficial de{" "}
              <Link href="/garantias" className="text-[#0A3B8C] font-bold hover:underline">
                Políticas de Garantía
              </Link>
              .
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A3B8C]"></span>
              6. Jurisdicción y Resolución de Conflictos
            </h2>
            <p>
              Para cualquier controversia derivada de la interpretación o ejecución de los presentes términos, las partes se someten a la legislación aplicable de la República del Ecuador y a los juzgados competentes de la ciudad de Pedernales, Provincia de Manabí.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
