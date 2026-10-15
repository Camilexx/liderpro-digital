"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

const FAQS: FAQItem[] = [
  {
    tag: "Seguridad y Embalaje",
    question: "¿Cómo garantizan que los lubricantes y líquidos no se derramen durante el trayecto?",
    answer:
      "Aplicamos un protocolo estricto de embalaje industrial: cada envase (cuartos, galones y canecas) se somete a inspección previa del sello de fábrica, refuerzo perimetral con precinto térmico en las tapas, bolsa de polietileno de alta densidad para contención secundaria y cajas de cartón corrugado de alta resistencia. Viajan asegurados sin riesgo de filtración.",
  },
  {
    tag: "Carga Pesada",
    question: "¿Es seguro enviar baterías automotrices y de camión a otras provincias?",
    answer:
      "Totalmente seguro. Trabajamos exclusivamente con baterías selladas y libres de mantenimiento (Bosch y Baterías Ecuador). Cada acumulador se despacha con protectores aislantes dieléctricos en ambos bornes para evitar arcos eléctricos, base estabilizadora plana y señalización exterior obligatoria 'ESTE LADO ARRIBA - MANEJAR CON PRECAUCIÓN' en el transporte interprovincial.",
  },
  {
    tag: "Logística y Transporte",
    question: "¿Qué empresa de transporte o courier se encargará de llevar mi pedido?",
    answer:
      "Para tu máxima comodidad y economía, no imponemos una empresa fija. Según tu provincia y cantón exacto, y dependiendo del tipo de carga (encomiendas pesadas para talleres/camaroneras o paquetes express livianos), coordinamos contigo directamente por WhatsApp la empresa de transporte interprovincial o el servicio de courier con agencia más cercana o entrega a domicilio.",
  },
  {
    tag: "Trazabilidad",
    question: "¿Cómo rastreo mi despacho y cuándo recibo la guía oficial?",
    answer:
      "Mantenemos comunicación en tiempo real por WhatsApp. Una vez embalado y rotulado el producto en nuestro Hub Matriz de Pedernales, te enviamos la fotografía del paquete listo y el comprobante de la guía de remisión oficial con número de guía para que puedas retirar en terminal o recibir en tu dirección.",
  },
  {
    tag: "Garantía Legal",
    question: "¿Las compras incluyen factura electrónica autorizada por el SRI?",
    answer:
      "Sí, 100%. LiderPro opera como Distribuidor Autorizado Multimarca formal y transparente. Todas las ventas se emiten con Facturación Electrónica autorizada por el Servicio de Rentas Internas (SRI), con desglose de IVA y crédito tributario para talleres mecánicos, cooperativas de transporte, flotas y clientes particulares.",
  },
  {
    tag: "Retiro en Local",
    question: "¿Puedo retirar mi pedido directamente en la bodega de Pedernales?",
    answer:
      "Por supuesto. Nuestra Sede Central y Bodega Matriz está ubicada en la zona comercial de Pedernales (Manabí). Atendemos de lunes a sábado de 08:00 a 18:00 con mostrador técnico, diagnóstico de acumuladores sin costo y entrega inmediata de stock.",
  },
];

export default function ShippingFAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {FAQS.map((faq, idx) => {
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
