"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    trackEvent("whatsapp_click", { location: "floating_button" });
  };

  return (
    <aside
      aria-label="Atención por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
    >
      {/* Tooltip on hover/focus */}
      <div
        role="status"
        className={`hidden sm:block px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-lg transition-all duration-200 pointer-events-none ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        ¿Necesitas ayuda técnica?
      </div>

      {/* Floating Action Button */}
      <a
        href={buildWhatsAppLink("general_quote")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label="Contactar a un asesor técnico por WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 btn-whatsapp text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.45)] hover:shadow-[0_14px_30px_rgba(16,185,129,0.6)] transition-all duration-300 active:scale-95 animate-pulse-glow-green focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </aside>
  );
}
