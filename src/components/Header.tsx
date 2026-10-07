"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, ShieldCheck, MapPin, Search, Wrench, Zap } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppHeader = () => {
    trackEvent("whatsapp_click", { location: "header_cta" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-md group-hover:scale-105 transition-transform duration-200">
                L<span className="text-amber-300 text-lg">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-brand-dark flex items-center gap-1">
                  LIDER<span className="text-brand-primary">PRO</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500">
                  Pedernales • Quito • Envíos
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <Link
              href="/encuentra-tu-producto"
              className="flex items-center gap-1.5 text-brand-primary hover:text-brand-primaryHover font-bold transition-colors"
            >
              <Search className="w-4 h-4" />
              Buscador por Vehículo
            </Link>
            <Link href="/productos" className="hover:text-brand-primary transition-colors">
              Catálogo de Productos
            </Link>
            <Link href="/baterias" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Baterías
            </Link>
            <Link href="/lubricantes" className="hover:text-brand-primary transition-colors">
              Lubricantes
            </Link>
            <Link href="/sucursales" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Pedernales y Quito
            </Link>
            <Link href="/envios" className="hover:text-brand-primary transition-colors">
              Envíos Nacionales
            </Link>
            <Link href="/guias" className="hover:text-brand-primary transition-colors">
              Guías Técnicas
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/emergencia-bateria"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
            >
              <Zap className="w-3.5 h-3.5 fill-red-600 text-red-600" />
              ¿No enciende?
            </Link>

            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppHeader}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Asesor WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppHeader}
              className="p-2 bg-brand-whatsapp text-white rounded-lg"
              aria-label="WhatsApp Asesor"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold text-red-900">¿Tu carro no prende?</span>
            </div>
            <Link
              href="/emergencia-bateria"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-red-700 underline"
            >
              Atención Urgente →
            </Link>
          </div>

          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-800">
            <Link
              href="/encuentra-tu-producto"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-brand-primary font-bold"
            >
              <span>🔍 Buscador por Vehículo</span>
              <span>→</span>
            </Link>
            <Link
              href="/productos"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50"
            >
              Catálogo de Productos
            </Link>
            <Link
              href="/baterias"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Baterías Automotrices</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">15 Meses Gtía</span>
            </Link>
            <Link
              href="/lubricantes"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50"
            >
              Lubricantes y Filtros
            </Link>
            <Link
              href="/sucursales"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50"
            >
              Puntos Pedernales y Quito
            </Link>
            <Link
              href="/envios"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50"
            >
              Envíos a todo el Ecuador
            </Link>
            <Link
              href="/guias"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50"
            >
              Guías Técnicas Automotrices
            </Link>
            <Link
              href="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50"
            >
              Contacto y Cotizaciones B2B
            </Link>
          </nav>

          <div className="pt-2">
            <a
              href={buildWhatsAppLink("general_quote")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppHeader}
              className="w-full py-3 bg-brand-whatsapp text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contactar Asesor por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
