import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle, MessageCircle, AlertCircle } from "lucide-react";
import { EDUCATIONAL_ARTICLES, EducationalArticle } from "@/data/articles";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface GuideDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EDUCATIONAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: GuideDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const article = EDUCATIONAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Guía no encontrada | LiderPro" };

  return {
    title: `${article.title} | LiderPro Ecuador`,
    description: article.metaDescription,
  };
}

export default async function GuideDetailPage({ params }: GuideDetailProps) {
  const { slug } = await params;
  const article = EDUCATIONAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <Link
          href="/guias"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a todas las guías</span>
        </Link>
      </div>

      <article className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-12 space-y-8">
        {/* Article Header */}
        <div className="space-y-4 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-brand-primary uppercase tracking-wider px-2.5 py-1 bg-red-50 rounded-full">
              {article.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{article.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium">
            {article.subtitle}
          </p>
        </div>

        {/* 1. Problem */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>1. El Problema Común</span>
          </div>
          <div className="p-5 bg-red-50/50 rounded-2xl border border-red-100 text-xs sm:text-sm text-slate-800 leading-relaxed">
            {article.problem}
          </div>
        </div>

        {/* 2. Technical Explanation */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-brand-primary" />
            <span>2. Explicación Técnica Sencilla</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <p>{article.explanation}</p>
          </div>
        </div>

        {/* 3. Solution */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm uppercase tracking-wider">
            <CheckCircle className="w-4 h-4" />
            <span>3. La Solución Recomendada por LiderPro</span>
          </div>
          <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs sm:text-sm text-slate-800 leading-relaxed">
            {article.solution}
          </div>
        </div>

        {/* WhatsApp Hook */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
          <h4 className="text-base font-bold">
            ¿Quieres resolver esto en tu vehículo hoy mismo?
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Escríbenos por WhatsApp con los datos de tu vehículo y te asesoramos directamente sin costo de consulta.
          </p>
          <a
            href={buildWhatsAppLink("general_quote")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>CONSULTAR CON UN ASESOR TÉCNICO</span>
          </a>
        </div>
      </article>
    </div>
  );
}
