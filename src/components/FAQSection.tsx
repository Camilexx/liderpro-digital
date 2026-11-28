"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "¿Cómo sé cuál es el producto exactamente compatible con mi vehículo?",
    answer:
      "Puedes utilizar nuestro buscador de compatibilidad ingresando marca, modelo, año y motor. Si tu vehículo tiene modificaciones o prefieres verificar directamente, nuestro equipo técnico revisará el catálogo oficial por WhatsApp sin costo.",
  },
  {
    question: "¿Dónde está ubicada la tienda física de LíderPro?",
    answer:
      "Nuestra tienda y bodega única está en Pedernales (Manabí), Vía al Carmen frente a la gasolinera. Dentro de Pedernales ofrecemos instalación gratuita de baterías a domicilio, y despachamos a todo el Ecuador en menos de 48h.",
  },
  {
    question: "¿Cuánto demora en llegar mi pedido y el envío es gratis?",
    answer:
      "¡Sí! Ofrecemos ENVÍO GRATIS a las 24 provincias del Ecuador en compras desde $35 (y en toda batería), con despacho diario coordinado en menos de 48 horas desde nuestra bodega matriz en Pedernales y foto de tu guía apenas salga a ruta.",
  },
  {
    question: "¿Qué garantía tienen las baterías y repuestos vendidos en LiderPro?",
    answer:
      "Nuestras baterías cuentan con respaldo técnico y garantía de fábrica según la marca y modelo, sujeta a diagnóstico del sistema eléctrico. Los lubricantes y filtros son productos originales de grado técnico con respaldo de lote.",
  },
  {
    question: "¿Puedo retirar mi compra en el local de Pedernales?",
    answer:
      "Sí, puedes retirar tu compra directamente en nuestra sede de Pedernales o solicitar envío a domicilio dentro del cantón (instalación de baterías gratis a domicilio en Pedernales) o encomienda a todo el Ecuador en <48h.",
  },
  {
    question: "¿Atienden a talleres mecánicos o flotas de transporte?",
    answer:
      "Sí, disponemos de cotización técnica y atención comercial personalizada para talleres mecánicos, transportistas y administradores de flotas comerciales en todo el país.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2.5 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-brand-primary" />
            Resolución de Dudas Frecuentes
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
            Todo lo que necesitas saber antes de comprar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Claridad total en garantías, envíos nacionales, compatibilidad mecánica y puntos de atención.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-300 shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-800 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-brand-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 pt-2 text-xs sm:text-sm text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
