"use client";

import Link from "next/link";
import { Phone, Search, ShoppingBag, MessageCircle } from "lucide-react";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_CONFIG } from "@/data/businessConfig";

export default function MobileBottomBar() {
  const { totalItems, setIsOpen } = useQuoteBasket();

  const handleCall = () => {
    trackEvent("call_click", { location: "mobile_bottom_bar" });
  };

  const handleWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "mobile_bottom_bar" });
  };

  return (
    <aside
      aria-label="Acciones rápidas de contacto y cotización móvil"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#061B40]/95 backdrop-blur-md border-t border-[#0A3B8C]/60 lg:hidden shadow-2xl px-3 py-2"
    >
      <div className="grid grid-cols-4 gap-1 items-center max-w-md mx-auto text-center">
        {/* 1. Llamar a Bodega Pedernales */}
        <a
          href={`tel:${BUSINESS_CONFIG.locations.pedernales.phone.replace(/\s+/g, "")}`}
          onClick={handleCall}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-[#FFC500] mb-1" />
          <span className="text-[10px] font-bold tracking-tight">Llamar</span>
        </a>

        {/* 2. Buscador por Vehículo */}
        <Link
          href="/encuentra-tu-producto"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
        >
          <Search className="w-4 h-4 text-[#FFC500] mb-1" />
          <span className="text-[10px] font-bold tracking-tight">Buscador</span>
        </Link>

        {/* 3. Cotizador Multiproducto Drawer Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[#FFC500] mb-1" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#FFC500] text-slate-950 font-black text-[9px] flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight">Mi Lista</span>
        </button>

        {/* 4. WhatsApp Asesor Oficial */}
        <a
          href={buildWhatsAppLink("general_quote")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-1 px-1.5 rounded-xl bg-[#25D366] text-slate-950 font-black active:scale-95 shadow-md transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-black/10 mb-0.5" />
          <span className="text-[10px] font-black uppercase tracking-tight">Asesor</span>
        </a>
      </div>
    </aside>
  );
}
