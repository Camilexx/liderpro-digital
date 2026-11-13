"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  ShoppingBag,
  ShieldCheck,
  Building2,
  MapPin,
  FileText,
  Package,
} from "lucide-react";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { useWhatsAppSelector } from "@/context/WhatsAppSelectorContext";

export default function QuoteBasketDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    clearBasket,
    totalItems,
    totalUnits,
  } = useQuoteBasket();
  const { openSelector } = useWhatsAppSelector();

  const [meter, setMeter] = useState({ unlocked: false, hasCombo: false, percent: 0, missing: 35 });
  const itemsKey = useMemo(
    () => JSON.stringify(items.map((it) => ({ sku: it.product.sku, qty: it.quantity }))),
    [items]
  );
  useEffect(() => {
    if (items.length === 0) return;
    const ctrl = new AbortController();
    const timer = setTimeout(() => {
      fetch("/api/quote-meter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: JSON.parse(itemsKey) }),
        signal: ctrl.signal,
      })
        .then((r) => r.json())
        .then((d) => setMeter(d))
        .catch(() => {});
    }, 250);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [itemsKey, items.length]);

  const hasLooseGallon = items.some(
    (it) =>
      !it.product.sku.startsWith("COMBO-") &&
      it.product.brand?.toUpperCase() === "MANNOL" &&
      /gal[oó]n|caneca/i.test(it.product.volume || "") &&
      String(it.product.category).toLowerCase().includes("lubric")
  );
  const hasFilter = items.some((it) => String(it.product.category).toLowerCase().includes("filtr"));

  const [customerName, setCustomerName] = useState("");
  const [city, setCity] = useState("");
  const [rucCedula, setRucCedula] = useState("");

  const handleSend = () => {
    if (items.length === 0) return;
    const lines: string[] = [
      "¡Hola LiderPro Pedernales! Vengo de la web y deseo cotizar mi lista de productos + reclamar mi regalo de cortesía (MANNOL 6145 Cockpit Care + Esponja):",
      "",
    ];
    items.forEach((it, idx) => {
      const pres = it.product.volume || it.product.plates || "Estándar";
      lines.push(`${idx + 1}. [Cód: ${it.product.sku}] ${it.product.name} — Presentación: ${pres} — Cant: ${it.quantity}`);
    });
    lines.push("");
    if (customerName.trim()) lines.push(`👤 Cliente / Taller: ${customerName.trim()}`);
    if (city.trim()) lines.push(`📍 Ciudad / Sector: ${city.trim()}`);
    if (rucCedula.trim()) lines.push(`📄 RUC / Cédula SRI: ${rucCedula.trim()}`);
    setIsOpen(false);
    openSelector({
      itemTitle: `Lista de Pedido (${items.length} productos, ${totalUnits} un.)`,
      customMessage: lines.join("\n"),
      sourceLocation: "quote_basket_drawer",
    });
  };

  return (
    <>
      {/* Floating Desktop Trigger Pill */}
      {totalItems > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="hidden sm:flex fixed bottom-24 right-6 z-40 items-center gap-3 bg-[#061B40] text-white pl-4 pr-5 py-3 rounded-2xl shadow-2xl border-2 border-[#FFC500] hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
          aria-label="Ver lista de cotización"
        >
          <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#0A3B8C] text-[#FFC500]">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FFC500] text-slate-950 font-black text-[11px] flex items-center justify-center shadow-sm">
              {totalItems}
            </span>
          </span>
          <div className="text-left">
            <p className="text-xs font-black tracking-wider uppercase text-[#FFC500]">
              Mi Lista ({totalUnits} un.)
            </p>
            <p className="text-xs text-white font-extrabold">
              🎁 Cotizar Lista + Regalo
            </p>
          </div>
        </button>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-[#061B40] text-white p-5 border-b border-[#0A3B8C] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A3B8C] text-[#FFC500] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight text-white flex items-center gap-2">
                <span>Mi Lista de Pedido</span>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#FFC500] text-slate-950 text-xs font-black">
                    {totalItems}
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-300">
                Vía al Carmen (Frente a gasolinera Pedernales) • 098 389 3231
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar cotizador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Package className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-800">
                  Tu lista de pedido está vacía
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Explora nuestro catálogo oficial o elige uno de los Combos Cambio Mannol y agrégalo para enviarlo por WhatsApp.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-secondary !text-xs !py-2.5 !px-5 inline-block cursor-pointer"
              >
                Ver Productos y Combos
              </button>
            </div>
          ) : (
            <>
              {/* Actions strip */}
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-700">
                  {totalItems} {totalItems === 1 ? "producto" : "productos"} ({totalUnits} unidades)
                </span>
                <button
                  onClick={clearBasket}
                  className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vaciar lista</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((it) => {
                  const pres = it.product.volume || it.product.plates;
                  return (
                    <div
                      key={it.product.sku}
                      className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl flex items-center gap-3 group hover:border-[#0A3B8C]/40 transition-colors"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl bg-white p-1 border border-slate-200 shrink-0 overflow-hidden">
                        <Image
                          src={it.product.imageUrl}
                          alt={it.product.name}
                          fill
                          sizes="64px"
                          className="object-contain p-0.5"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5 mb-0.5">
                          <span className="text-[10px] font-black uppercase text-slate-600 bg-slate-200/80 px-1.5 py-0.5 rounded font-mono">
                            {it.product.sku}
                          </span>
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            ✓ Stock
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                          {it.product.name}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium mt-0.5">
                          <span>{pres ? `Envase: ${pres}` : it.product.brand}</span>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center justify-between gap-2 mt-2">
                          <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(it.product.sku, -1)}
                              className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 py-0.5 text-xs font-black text-slate-900 min-w-7 text-center">
                              {it.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(it.product.sku, 1)}
                              className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(it.product.sku)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Medidor de Envío Gratis (valores internos privados) */}
              <div
                className={`rounded-2xl p-4 border-2 ${
                  meter.unlocked
                    ? "bg-gradient-to-r from-emerald-50 to-amber-50 border-emerald-500"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <p className={`text-xs font-black ${meter.unlocked ? "text-emerald-800" : "text-slate-800"}`}>
                  {meter.unlocked
                    ? "✅ ¡ENVÍO GRATIS DESBLOQUEADO EN TU PEDIDO!"
                    : `🚚 Te faltan $${meter.missing.toFixed(2)} USD en productos (o agregar 1 Combo Cambio MANNOL) para desbloquear tu ENVÍO GRATIS`}
                </p>
                <div className="mt-2 h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      meter.unlocked ? "bg-gradient-to-r from-emerald-500 to-[#FACC15]" : "bg-[#0A3B8C]"
                    }`}
                    style={{ width: `${meter.percent}%` }}
                  />
                </div>
                <p className="mt-1 text-[10.5px] font-bold text-slate-600">{meter.percent}% hacia envío gratis</p>
              </div>

              {hasLooseGallon && !hasFilter && (
                <Link
                  href="/filtros"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-2xl p-3.5 bg-amber-50 border-2 border-[#FACC15] text-[11.5px] font-extrabold text-slate-900 hover:bg-amber-100 transition-colors"
                >
                  💡 ¡Añade el Filtro para tu auto y conviértelo en Combo Cambio MANNOL para llevarte GRATIS el Limpiador Cockpit Care 1L + Esponja! <span className="underline">Ver filtros →</span>
                </Link>
              )}

              {/* Gift Card */}
              <div className="bg-gradient-to-r from-[#09152B] to-[#0A3B8C] text-white rounded-2xl p-4 flex items-center justify-between shadow-md border border-[#FACC15]/40">
                <div>
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-[#FACC15] block">
                    🎁 Regalo exclusivo en Combo Cambio MANNOL
                  </span>
                  <span className="text-[11px] text-slate-200">
                    Envío gratis en Combos MANNOL o pedidos ≥ $35 USD
                  </span>
                </div>
                <span className="text-xs font-black text-[#22C55E] bg-[#22C55E]/15 px-2.5 py-1 rounded-lg border border-[#22C55E]/40">
                  Elegir WhatsApp
                </span>
              </div>

              {/* Customer Data Optional Fields */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-3 mt-4">
                <p className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#0A3B8C]" />
                  <span>Datos Opcionales para Entrega / Factura</span>
                </p>

                <div className="space-y-2">
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Tu Nombre o Taller (opcional)"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C]"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Sector en Pedernales o Ciudad de Envío"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C]"
                    />
                  </div>

                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="RUC o Cédula para Factura SRI (opcional)"
                      value={rucCedula}
                      onChange={(e) => setRucCedula(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A3B8C]"
                    />
                  </div>
                </div>
              </div>

              {/* Institutional Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 font-bold pt-1">
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-900 p-2.5 rounded-xl border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Envío Gratis Pedernales</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-900 p-2.5 rounded-xl border border-blue-200">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Facturación SRI 100%</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer with Action Button */}
        {items.length > 0 && (
          <div className="p-5 bg-slate-50 border-t border-slate-200 shrink-0 space-y-2">
            <button
              onClick={handleSend}
              className="w-full py-4 px-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 fill-black/10" />
              <span>Enviar Pedido a WhatsApp (098 389 3231)</span>
            </button>
            <p className="text-[11px] text-center text-slate-600 font-semibold">
              Atención inmediata desde nuestro local en Vía al Carmen (Frente a gasolinera Pedernales).
            </p>
          </div>
        )}
      </div>
    </>
  );
}
