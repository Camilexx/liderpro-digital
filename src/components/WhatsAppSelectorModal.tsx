"use client";

import { useEffect } from "react";
import { X, MessageCircle, Gift, ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";
import { useWhatsAppSelector } from "@/context/WhatsAppSelectorContext";
import {
  LIDERPRO_WHATSAPP_LINES,
  buildLineWhatsAppUrl,
} from "@/lib/dual_whatsapp_router";
import { trackEvent } from "@/lib/analytics";

export default function WhatsAppSelectorModal() {
  const { isOpen, request, closeSelector } = useWhatsAppSelector();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSelector();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeSelector]);

  if (!isOpen || !request) return null;

  const message = request.customMessage || "";
  const lines = [LIDERPRO_WHATSAPP_LINES.matriz, LIDERPRO_WHATSAPP_LINES.despachos];

  const handleSelectLine = (lineId: "matriz" | "despachos") => {
    trackEvent("whatsapp_click", {
      line: lineId,
      location: request.sourceLocation || "modal_selector",
      item: request.itemTitle || "general",
      sku: request.sku || "",
    });
    closeSelector();
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dual-whatsapp-title"
      onClick={closeSelector}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#09152B]/95 border-2 border-[#FACC15]/70 shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-white p-5 sm:p-7 space-y-5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Gold Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#FACC15]/15 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FACC15]/15 border border-[#FACC15]/40 text-[#FACC15] text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Atención Oficial LíderPro Pedernales
            </span>
            <h2
              id="dual-whatsapp-title"
              className="text-lg sm:text-xl font-black text-white tracking-tight"
            >
              Elige tu Asesor / Sucursal más cercana
            </h2>
            {request.itemTitle && (
              <p className="text-xs text-slate-300 font-semibold">
                Producto / Promo:{" "}
                <span className="text-[#FACC15] font-black">
                  {request.itemTitle}
                </span>
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={closeSelector}
            aria-label="Cerrar selector de WhatsApp"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gift & Welcome Banner */}
        <div className="relative z-10 rounded-2xl bg-[#070B14]/80 border border-white/10 p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FACC15] text-slate-950 flex items-center justify-center shrink-0 shadow-md">
            <Gift className="w-5 h-5" />
          </div>
          <div className="text-xs leading-snug">
            <span className="font-black text-[#FACC15] block">
              Cotización Inmediata + Regalo de Cortesía
            </span>
            <span className="text-slate-300">
              Incluye saludo automático con tu consulta lista y verificación técnica por vehículo.
            </span>
          </div>
        </div>

        {/* Two Official WhatsApp Lines */}
        <div className="space-y-3 relative z-10">
          {lines.map((line) => {
            const href = buildLineWhatsAppUrl(line.id, message);
            return (
              <a
                key={line.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSelectLine(line.id)}
                className="group block rounded-2xl p-4 bg-[#070B14]/90 hover:bg-[#22C55E]/15 border border-white/15 hover:border-[#22C55E] transition-all duration-200 shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#22C55E] text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-6 h-6 fill-slate-950/10" />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-black text-[#22C55E] tracking-wide">
                        {line.statusBadge}
                      </span>
                      <h3 className="text-sm font-black text-white group-hover:text-[#FACC15] transition-colors leading-snug">
                        {line.label}
                      </h3>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {line.subtitle}
                      </p>
                      <span className="inline-block text-xs font-mono font-bold text-[#FACC15]">
                        {line.displayPhone}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#22C55E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer reassurance */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            LíderPro Pedernales • Vía al Carmen
          </span>
          <span className="font-semibold text-slate-300">
            Respuesta en &lt; 2 min
          </span>
        </div>
      </div>
    </div>
  );
}
