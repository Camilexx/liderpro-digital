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
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-slate-700">
            <Link
              href="/productos"
              className="hover:text-brand-primary transition-colors py-1"
            >
              Productos
            </Link>
            <Link
              href="/encuentra-tu-producto"
              className="hover:text-brand-primary transition-colors py-1 text-slate-900 font-bold"
            >
              Encuentra tu producto
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
              href="/sucursales"
              className="hover:text-brand-primary transition-colors py-1 text-slate-600"
            >
              Sucursales
            </Link>
          </nav>

          {/* Right Action: Asesor / WhatsApp */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors"
            >
              ¿No sabes cuál necesitas?
            </a>

            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Hablar con asesor</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="p-2 bg-emerald-600 text-white rounded-lg"
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
              className="w-full py-3 bg-emerald-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2"
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
