import Link from "next/link";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/data/businessConfig";

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

export default function Footer() {
  return (
    <footer className="bg-[#061B40] text-slate-300 border-t border-[#0A3B8C]/40 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block">
              <Image
                src="/images/logo-white.png"
                alt="LiderPro - Productos Automotrices"
                width={220}
                height={55}
                className="h-12 sm:h-14 w-auto object-contain hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            <p className="text-[#FFC500] font-semibold text-xs tracking-wide">
              "{BUSINESS_CONFIG.slogan}"
            </p>
            <p className="text-slate-300 max-w-md leading-relaxed text-[11.5px]">
              {BUSINESS_CONFIG.legalNotice}
            </p>

            {/* Social Media Section */}
            <div className="pt-2">
              <h6 className="text-[11px] font-bold uppercase tracking-wider text-white mb-2.5">
                Canales Oficiales en Redes Sociales:
              </h6>
              <div className="flex items-center gap-3">
                <a
                  href={BUSINESS_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-[#FFC500] hover:text-slate-950 text-slate-200 border border-white/10 hover:border-[#FFC500] transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="Instagram de LiderPro Pedernales"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span className="font-semibold text-[11px]">Instagram</span>
                </a>
                <a
                  href={BUSINESS_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-[#FFC500] hover:text-slate-950 text-slate-200 border border-white/10 hover:border-[#FFC500] transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="Facebook de LiderPro Pedernales"
                >
                  <FacebookIcon className="w-4 h-4" />
                  <span className="font-semibold text-[11px]">Facebook</span>
                </a>
                <a
                  href={BUSINESS_CONFIG.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-[#FFC500] hover:text-slate-950 text-slate-200 border border-white/10 hover:border-[#FFC500] transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="TikTok de LiderPro Pedernales"
                >
                  <TikTokIcon className="w-4 h-4" />
                  <span className="font-semibold text-[11px]">TikTok</span>
                </a>
              </div>
            </div>

            {/* Direct Phone Lines */}
            <div className="pt-3 text-[11.5px] space-y-1.5 text-slate-300 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-[#FFC500] font-bold">📞 Local Pedernales:</span>
                <a href="tel:+593983893231" className="hover:text-white font-semibold underline decoration-slate-600">
                  098 389 3231 (+593 98 389 3231)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">💬 WhatsApp Nacional:</span>
                <a href="https://wa.me/593967489002" target="_blank" rel="noopener noreferrer" className="hover:text-white font-semibold underline decoration-slate-600">
                  096 748 9002 (+593 96 748 9002)
                </a>
              </div>
            </div>
          </div>

          {/* Categorías */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC500]"></span>
              Catálogo Multimarca
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/baterias" className="hover:text-[#FFC500] transition-colors">
                  Baterías Ecuador & Bosch
                </Link>
              </li>
              <li>
                <Link href="/lubricantes" className="hover:text-[#FFC500] transition-colors">
                  Lubricantes Mannol, Motul, Mobil
                </Link>
              </li>
              <li>
                <Link href="/filtros" className="hover:text-[#FFC500] transition-colors">
                  Filtros Advance, Fram y Bosch
                </Link>
              </li>
              <li>
                <Link href="/productos?cat=refrigerantes" className="hover:text-[#FFC500] transition-colors">
                  Refrigerantes Orgánicos AF12+
                </Link>
              </li>
              <li>
                <Link href="/encuentra-tu-producto" className="hover:text-[#FFC500] transition-colors font-semibold text-white">
                  🔍 Buscador por Vehículo
                </Link>
              </li>
            </ul>
          </div>

          {/* Sedes y Despachos */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC500]"></span>
              Atención & Despachos
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/sucursales" className="hover:text-[#FFC500] transition-colors">
                  Hub Central Pedernales (Manabí)
                </Link>
              </li>
              <li>
                <Link href="/sucursales" className="hover:text-[#FFC500] transition-colors">
                  Enlace Logístico Sierra — Quito
                </Link>
              </li>
              <li>
                <Link href="/envios" className="hover:text-[#FFC500] transition-colors">
                  Rutas Nacionales (24 Provincias)
                </Link>
              </li>
              <li>
                <Link href="/b2b" className="hover:text-[#FFC500] transition-colors">
                  Atención B2B Flotas & Camaroneras
                </Link>
              </li>
              <li>
                <Link href="/guias" className="hover:text-[#FFC500] transition-colors">
                  Guías Técnicas y Mantenimiento
                </Link>
              </li>
            </ul>
          </div>

          {/* Confianza & Cumplimiento Legal SRI */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC500]"></span>
              Confianza & Legal SRI
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/garantias" className="hover:text-[#FFC500] transition-colors">
                  🛡️ Garantías Oficiales (12 Meses)
                </Link>
              </li>
              <li>
                <Link href="/sri" className="hover:text-[#FFC500] transition-colors">
                  📄 Facturación Electrónica SRI
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-[#FFC500] transition-colors">
                  ❓ Preguntas Frecuentes (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-[#FFC500] transition-colors">
                  ⚖️ Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-[#FFC500] transition-colors">
                  🔒 Privacidad de Datos (LOPDP)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} LiderPro Ecuador. Distribuidor Autorizado Multimarca. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/garantias" className="hover:text-[#FFC500]">Garantías</Link>
            <Link href="/sri" className="hover:text-[#FFC500]">Facturación SRI</Link>
            <Link href="/preguntas-frecuentes" className="hover:text-[#FFC500]">FAQ</Link>
            <Link href="/terminos" className="hover:text-[#FFC500]">Términos</Link>
            <Link href="/privacidad" className="hover:text-[#FFC500]">Privacidad</Link>
            <Link href="/contacto" className="hover:text-[#FFC500]">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
