"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", { location: "header_nav" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-black text-lg tracking-tight">
              L
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-950 leading-none">
                LIDER<span className="text-brand-primary">PRO</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-500 mt-0.5">
                Ecuador
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-semibold text-slate-700">
            <Link
              href="/encuentra-tu-producto"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-950 font-bold transition-all text-xs tracking-tight"
            >
              <span>🔍 Encuentra tu producto</span>
            </Link>
            <Link
              href="/productos"
              className="hover:text-brand-primary transition-colors py-1"
            >
              Productos
            </Link>
            <Link
              href="/baterias"
              className="hover:text-brand-primary transition-colors py-1"
            >
              Baterías
            </Link>
            <Link
              href="/lubricantes"
              className="hover:text-brand-primary transition-colors py-1"
            >
              Lubricantes
            </Link>
            <Link
              href="/b2b"
              className="hover:text-brand-primary transition-colors py-1 text-slate-800 font-bold"
            >
              Atención B2B
            </Link>
            <Link
              href="/sucursales"
              className="hover:text-brand-primary transition-colors py-1 text-slate-600"
            >
              Puntos y Envíos
            </Link>
          </nav>

          {/* Right Action: Live Status + Asesor WhatsApp */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-full text-[11px] font-semibold text-slate-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Asesoría Activa</span>
            </div>

            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="btn-whatsapp !py-2.5 !px-4 text-xs tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ASESOR WHATSAPP</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="p-2.5 btn-whatsapp rounded-lg"
              aria-label="Hablar con asesor"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-800">
            <Link
              href="/encuentra-tu-producto"
              onClick={() => setMobileMenuOpen(false)}
              className="text-brand-primary font-bold"
            >
              Encuentra tu producto
            </Link>
            <Link
              href="/productos"
              onClick={() => setMobileMenuOpen(false)}
            >
              Catálogo de Productos
            </Link>
            <Link
              href="/baterias"
              onClick={() => setMobileMenuOpen(false)}
            >
              Baterías Automotrices
            </Link>
            <Link
              href="/lubricantes"
              onClick={() => setMobileMenuOpen(false)}
            >
              Lubricantes y Filtros
            </Link>
            <Link
              href="/sucursales"
              onClick={() => setMobileMenuOpen(false)}
            >
              Puntos Pedernales y Quito
            </Link>
            <Link
              href="/emergencia-bateria"
              onClick={() => setMobileMenuOpen(false)}
              className="text-red-700 font-bold"
            >
              ¿Tu vehículo no enciende?
            </Link>
          </nav>

          <div className="pt-2">
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="w-full py-3 btn-whatsapp text-xs font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hablar con un asesor</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
