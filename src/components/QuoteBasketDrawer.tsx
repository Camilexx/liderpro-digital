"use client";

import { useState } from "react";
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
  Package
} from "lucide-react";
import { useQuoteBasket } from "@/context/QuoteBasketContext";

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
    sendWhatsAppQuote,
  } = useQuoteBasket();

  const [customerName, setCustomerName] = useState("");
  const [city, setCity] = useState("");
  const [rucCedula, setRucCedula] = useState("");

  const handleSend = () => {
    sendWhatsAppQuote(customerName, city, rucCedula);
  };

  return (
    <>
      {/* Floating Desktop Trigger Pill (Only if there are items and drawer is closed) */}
      {totalItems > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="hidden sm:flex fixed bottom-24 right-6 z-40 items-center gap-3 bg-[#061B40] text-white pl-4 pr-5 py-3 rounded-2xl shadow-2xl border border-[#FFC500]/60 hover:scale-105 active:scale-95 transition-all duration-200 group"
          aria-label="Ver lista de cotización"
        >
          <span className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-[#0A3B8C] text-[#FFC500]">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FFC500] text-slate-950 font-black text-[10px] flex items-center justify-center shadow-sm">
              {totalItems}
            </span>
          </span>
          <div className="text-left">
            <p className="text-[11px] font-black tracking-wider uppercase text-[#FFC500]">
              Mi Cotización
            </p>
            <p className="text-[10px] text-slate-300 font-medium">
              {totalUnits} {totalUnits === 1 ? "unidad" : "unidades"} en lista
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
                <span>Lista de Cotización</span>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#FFC500] text-slate-950 text-xs font-black">
                    {totalItems}
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-300">
                Hub Matriz Pedernales • Despacho Nacional
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
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
                <h4 className="text-sm font-bold text-slate-800">
                  Tu lista de cotización está vacía
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explora nuestro catálogo verificado de 366 productos y añade los que requieras para tu taller, vehículo o flota.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-secondary !text-xs !py-2.5 !px-5 inline-block"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Actions strip */}
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-700">
                  {totalItems} {totalItems === 1 ? "referencia" : "referencias"} ({totalUnits} unidades)
                </span>
                <button
                  onClick={clearBasket}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
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
                      className="p-3 bg-slate-50 border border-slate-200/90 rounded-2xl flex items-center gap-3 group hover:border-[#0A3B8C]/40 transition-colors"
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
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-black uppercase text-slate-500 bg-slate-200/80 px-1.5 py-0.2 rounded font-mono">
                            {it.product.sku}
                          </span>
                          <span className="text-[9px] font-bold text-[#0A3B8C] uppercase">
                            {it.product.brand}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {it.product.name}
                        </h4>
                        {pres && (
                          <p className="text-[10px] text-slate-500 font-medium">
                            Presentación: {pres}
                          </p>
                        )}

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(it.product.sku, -1)}
                              className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-black text-slate-900 min-w-7 text-center">
                              {it.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(it.product.sku, 1)}
                              className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(it.product.sku)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customer Data Optional Fields */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-3 mt-4">
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#0A3B8C]" />
                  <span>Datos Opcionales para Cotización / Factura SRI</span>
                </p>

                <div className="space-y-2">
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Nombre del Taller / Razón Social"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0A3B8C]"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ciudad de Destino (ej: Pedernales, Quito, Manta)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0A3B8C]"
                    />
                  </div>

                  <div className="relative">
                    <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="RUC o Cédula para Factura (opcional)"
                      value={rucCedula}
                      onChange={(e) => setRucCedula(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0A3B8C]"
                    />
                  </div>
                </div>
              </div>

              {/* Institutional Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-[10.5px] text-slate-600 font-semibold pt-1">
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-200/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Stock en Pedernales</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-900 p-2 rounded-xl border border-blue-200/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700 shrink-0" />
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
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 fill-black/10" />
              <span>Enviar Pedido Consolidado a WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-slate-500 font-medium">
              Te atenderá un asesor comercial oficial desde Bodega Pedernales.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
