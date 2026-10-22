"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Menu, X, Search, ShoppingBag } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { useQuoteBasket } from "@/context/QuoteBasketContext";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.19 2.09 2.37 2.26.96.16 1.97-.13 2.71-.74.69-.54 1.06-1.38 1.07-2.25.02-3.87.01-7.74.01-11.61 0-2.38.01-4.76.01-7.14z"/>
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useQuoteBasket();

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", { location: "header_nav" });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#061B40] text-white border-b border-[#FFC500]/20 shadow-xl transition-all backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Official Logo */}
          <Link href="/" className="flex items-center group py-1.5 focus:outline-none shrink-0">
            <div className="relative">
              <Image
                src="/images/logo-white.png"
                alt="LiderPro - Productos Automotrices"
                width={200}
                height={48}
                priority
                className="h-10 sm:h-12 w-auto object-contain hover:scale-[1.02] transition-transform duration-200"
              />
            </div>
          </Link>

          {/* Desktop Navigation - 100% Golden & Single Word for Maximum Legibility */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-bold text-[#FFC500]">
            <Link
              href="/encuentra-tu-producto"
              className="hover:text-white transition-colors py-1 flex items-center gap-1.5 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FFC500] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              <Search className="w-3.5 h-3.5 text-[#FFC500]" />
              <span>Buscador</span>
            </Link>
            <Link
              href="/productos"
              className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FFC500] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Catálogo
            </Link>
            <Link
              href="/baterias"
              className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FFC500] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Baterías
            </Link>
            <Link
              href="/lubricantes"
              className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FFC500] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Lubricantes
            </Link>
            <Link
              href="/filtros"
              className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FFC500] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Filtros
            </Link>
            <Link
              href="/b2b"
              className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FFC500] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Mayorista
            </Link>
            <Link
              href="/envios"
              className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FFC500] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Envíos
            </Link>
          </nav>

          {/* Right Action: Asesor WhatsApp + Cotización */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {totalItems > 0 && (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FFC500] font-black text-xs border border-white/15 transition-all cursor-pointer active:scale-95"
                title="Ver lista de cotización"
              >
                <ShoppingBag className="w-4 h-4 text-[#FFC500]" />
                <span>Cotización ({totalItems})</span>
              </button>
            )}

            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="btn-whatsapp btn-shine !bg-[#25D366] hover:!bg-[#20ba59] !text-slate-950 hover:!text-black !py-2.5 !px-5 text-xs font-black tracking-wider flex items-center gap-2 rounded-xl shadow-lg shadow-emerald-950/40 border border-emerald-400/30 shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-slate-950 fill-black/10" />
              <span>ASESOR WHATSAPP</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            {totalItems > 0 && (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 bg-[#0A3B8C] text-[#FFC500] rounded-xl shadow-sm font-bold border border-[#FFC500]/40"
                aria-label="Ver cotización"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFC500] text-slate-950 font-black text-[9px] flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
            )}

            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="p-2.5 bg-[#25D366] active:bg-[#20ba59] text-slate-950 rounded-xl shadow-sm font-bold"
              aria-label="Hablar con asesor"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FFC500]" /> : <Menu className="w-5 h-5 text-[#FFC500]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#0A3B8C]/60 bg-[#061B40] px-5 py-5 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3 text-sm font-bold text-[#FFC500]">
            <Link
              href="/encuentra-tu-producto"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-[#FFC500]" />
              <span>Buscador</span>
            </Link>
            <Link
              href="/productos"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Catálogo
            </Link>
            <Link
              href="/baterias"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Baterías
            </Link>
            <Link
              href="/lubricantes"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Lubricantes
            </Link>
            <Link
              href="/filtros"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Filtros
            </Link>
            <Link
              href="/b2b"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Mayorista
            </Link>
            <Link
              href="/envios"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Envíos
            </Link>
          </nav>

          {/* Mobile Social Links */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Síguenos:</span>
            <div className="flex items-center gap-3">
              <a
                href={BUSINESS_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-[#FFC500]"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-[#FFC500]"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-[#FFC500]"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/593983893231?text=Hola%20LiderPro%20Pedernales%2C%20deseo%20consultar%20disponibilidad%20en%20el%20local."
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#0A3B8C] hover:bg-blue-800 text-[#FFC500] text-[11px] font-black rounded-xl flex items-center justify-center gap-1.5 shadow-md border border-[#FFC500]/30 text-center"
            >
              <span>Local: 098 389 3231</span>
            </a>
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 text-[11px] font-black rounded-xl flex items-center justify-center gap-1.5 shadow-lg text-center"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: 096</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
