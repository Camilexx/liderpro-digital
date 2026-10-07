import type { Metadata } from "next";
import Link from "next/link";
import { EDUCATIONAL_ARTICLES } from "@/data/articles";
import { BookOpen, ArrowRight, HelpCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Guías Técnicas y Consejos Automotrices | LiderPro Ecuador",
  description:
    "Artículos educativos sobre mantenimiento, diagnóstico de baterías, aceites para motor y prevención de fallas mecánicas en Ecuador.",
};

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-soft text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-brand-primary rounded-full text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Educación Automotriz Sin Jerga Compleja
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
          Guías Técnicas para el Conductor
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Diseñamos estas explicaciones técnicas para que entiendas exactamente qué ocurre con tu carro y tomes decisiones informadas sin gastar de más.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {EDUCATIONAL_ARTICLES.map((art) => (
          <div
            key={art.slug}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-bold text-brand-primary uppercase tracking-wider">
                  {art.category}
                </span>
                <span>{art.readTime}</span>
              </div>
              <h2 className="font-black text-xl text-brand-dark mb-3">
                <Link href={`/guias/${art.slug}`} className="hover:text-brand-primary transition-colors">
                  {art.title}
                </Link>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {art.subtitle}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/guias/${art.slug}`}
                className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1.5"
              >
                <span>Leer guía completa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
