import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import FAQHubClient from "@/components/FAQHubClient";
import { FAQS_DATA } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes (FAQ) | Envíos, Garantías y Pagos SRI | LiderPro Ecuador",
  description:
    "Respuestas oficiales sobre envíos diarios a las 24 provincias desde Pedernales, garantías de 12 meses en baterías Bosch y Baterías Ecuador, facturación electrónica SRI y precios para flotas.",
  keywords: [
    "preguntas frecuentes liderpro ecuador",
    "envios repuestos pedernales manabi quito guayaquil",
    "garantia baterias ecuador bosch",
    "facturacion electronica sri repuestos automotrices",
  ],
  alternates: {
    canonical: "/preguntas-frecuentes",
  },
  openGraph: {
    title: "Preguntas Frecuentes (FAQ) | Envíos, Garantías y Pagos SRI — LiderPro",
    description:
      "Respuestas oficiales sobre despachos desde Pedernales, garantías de baterías, facturación SRI y cotizaciones mayoristas.",
    url: "https://liderpro-digital.vercel.app/preguntas-frecuentes",
    type: "website",
  },
};

export default function PreguntasFrecuentesPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS_DATA.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#061B40] via-[#092352] to-[#04122E] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/15 border border-blue-500/30 rounded-full text-xs font-bold text-blue-300 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-[#FFC500]" />
            <span>CENTRO DE AYUDA Y PREGUNTAS FRECUENTES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            ¿Cómo Podemos Ayudarte Hoy?
          </h1>

          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Encuentra respuestas rápidas y transparentes sobre despachos interprovinciales, garantías de 12 meses, facturación electrónica SRI y precios corporativos.
          </p>
        </div>
      </section>

      {/* Interactive FAQ Client Hub */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQHubClient />
      </section>
    </div>
  );
}
