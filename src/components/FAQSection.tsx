"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

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
    question: "¿Tienen local físico en Pedernales y en Quito?",
    answer:
      "Sí. Operamos con presencia estratégica física en Pedernales (Manabí) para atención y distribución en la Costa, y contamos con un punto de atención y coordinación logística en Quito (Pichincha) para clientes de la Sierra.",
  },
  {
    question: "¿Cuánto demora en llegar mi pedido a otras provincias del Ecuador?",
    answer:
      "El tiempo estimado promedio de entrega es de 24 a 48 horas hábiles mediante cooperativas interprovinciales o courier certificado (Servientrega / LaarCourier), sujeto a disponibilidad de stock y condiciones logísticas.",
  },
  {
    question: "¿Qué garantía tienen las baterías y repuestos vendidos en LiderPro?",
    answer:
      "Todas nuestras baterías cuentan con 15 a 18 meses de garantía técnica directa contra defectos de fábrica. Los lubricantes y filtros son 100% originales con trazabilidad de lote.",
  },
  {
    question: "¿Puedo retirar mi compra en el local de Pedernales o Quito?",
    answer:
      "Sí, puedes coordinar el retiro presencial de tu producto directamente por WhatsApp con uno de nuestros asesores para tenerlo listo a tu llegada.",
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
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-brand-primary" />
            Resolución de Dudas Frecuentes
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
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
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
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
