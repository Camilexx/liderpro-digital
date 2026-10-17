"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { FAQS_DATA } from "@/data/faqs";

const CATEGORIES = [
  { key: "all", label: "Todas las Preguntas" },
  { key: "envios", label: "Envíos y Rutas" },
  { key: "pagos", label: "Pagos y SRI" },
  { key: "garantias", label: "Garantías" },
  { key: "b2b", label: "Flotas & B2B" },
  { key: "horarios", label: "Sedes y Horarios" },
];

export default function FAQHubClient() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "env-1": true,
    "gar-1": true,
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchesCat = selectedCat === "all" || faq.category === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCat, searchQuery]);

  const whatsappUrl = buildWhatsAppLink("unknown_need", {
    details: "Hola LiderPro, tengo una consulta específica que no encontré en las preguntas frecuentes.",
  });

  return (
    <div className="space-y-8">
      {/* Search Box */}
      <div className="max-w-xl mx-auto relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar por batería, envío a Quito, factura, garantía..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white text-slate-900 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC500] shadow-lg border border-slate-200"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCat(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCat === cat.key
                ? "bg-[#0A3B8C] text-white shadow-md shadow-[#0A3B8C]/20"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <p className="text-sm font-semibold text-slate-700">
              No encontramos preguntas que coincidan con "{searchQuery}".
            </p>
            <p className="text-xs text-slate-500">
              Escríbenos directamente y nuestro equipo técnico te responderá a la brevedad.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFC500] text-slate-950 font-bold rounded-xl text-xs"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Preguntar por WhatsApp</span>
            </a>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                      {faq.categoryLabel}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="p-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Contact Banner */}
      <div className="bg-gradient-to-r from-[#061B40] to-[#0A3B8C] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            ¿Tienes una pregunta específica o requerimiento especial?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Nuestros especialistas en repuestos automotrices te atienden directamente por WhatsApp con asesoría técnica personalizada.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFC500] hover:bg-[#e6b200] text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg hover:-translate-y-0.5 shrink-0"
        >
          <MessageCircle className="w-5 h-5 fill-slate-950" />
          <span>Hablar con un Especialista</span>
        </a>
      </div>
    </div>
  );
}
