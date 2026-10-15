"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

const B2B_FAQS: FAQItem[] = [
  {
    tag: "Escalas y Mínimos",
    question: "¿Cuáles son los volúmenes mínimos para acceder a tarifas mayoristas B2B?",
    answer:
      "Diseñamos tres escalas accesibles: la Escala Taller/Local inicia a partir de 5 canecas (20L) o un lote de 6 baterías; la Escala Flota Mediana a partir de 16 unidades o cajas master de filtros; y la Escala Distribuidor/Gran Flota para tambores industriales de 55 galones y pedidos consolidados con descuento máximo.",
  },
  {
    tag: "Tributario y SRI",
    question: "¿Cómo funciona la Facturación Electrónica con RUC y retenciones del SRI?",
    answer:
      "Emitimos Facturación Electrónica autorizada por el SRI de forma inmediata con el RUC de tu empresa o taller, permitiéndote deducir costos y aprovechar el crédito tributario de IVA. Aceptamos comprobantes de retención electrónicos según los porcentajes de ley vigentes.",
  },
  {
    tag: "Logística y Camaroneras",
    question: "¿Tienen capacidad de despacho hacia camaroneras y fincas en zonas de difícil acceso?",
    answer:
      "Sí, con amplia experiencia. Desde nuestro Hub Matriz en Pedernales abastecemos diariamente al sector acuícola y camaronero de Manabí, Esmeraldas, Guayas y El Oro. Coordinamos camiones de carga pesada con paletizado reforzado para entrega en ruta o terminal más cercano a la finca.",
  },
  {
    tag: "Garantías y Lotes",
    question: "¿Qué garantía tienen los productos comprados al por mayor para talleres mecánicos?",
    answer:
      "Todos los productos son 100% originales de fábrica con trazabilidad directa de importación. Las baterías Bosch y Baterías Ecuador se entregan con fecha de fabricación reciente, voltaje verificado y certificado de garantía. En lubricantes, se garantiza lote sellado con precinto de inducción intacto.",
  },
  {
    tag: "Flotas Multimarca",
    question: "¿Ofrecen asesoría técnica para consolidar y estandarizar lubricantes en flotas?",
    answer:
      "Totalmente. Revisamos la ficha técnica de tus unidades (camiones Hino, Isuzu, Freightliner, camionetas D-Max, Hilux, furgones o generadores) para recomendarte lubricantes multigrado (ej. 15W40 CK-4 o 5W30 Full Sintético) que cumplan con los manuales de todos tus vehículos, reduciendo inventario ocioso.",
  },
  {
    tag: "Retiro en Bodega",
    question: "¿Podemos retirar con camión o transporte propio en la bodega matriz de Pedernales?",
    answer:
      "Sí. Contamos con bodega mayorista y personal de estiba en la zona comercial de Pedernales (Manabí). Puedes coordinar con tu asesor comercial el retiro de canecas, tambores o pallets con tu propio transporte de lunes a sábado de 08:00 a 18:00 sin recargo de flete.",
  },
];

export default function B2BFAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {B2B_FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all overflow-hidden ${
              isOpen
                ? "bg-white border-blue-900/40 shadow-md ring-1 ring-blue-900/20"
                : "bg-white/80 border-slate-200 hover:border-slate-300"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-primary bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {faq.tag}
                </span>
                <h4 className="text-sm sm:text-base font-black text-slate-900 pt-1">
                  {faq.question}
                </h4>
              </div>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 mt-1 ${
                  isOpen
                    ? "bg-[#061B40] text-[#FFC500] rotate-180"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                <p className="pt-3">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
