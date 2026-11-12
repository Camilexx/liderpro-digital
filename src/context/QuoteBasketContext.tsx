"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Product } from "@/data/products";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import { trackEvent } from "@/lib/analytics";

export interface BasketItem {
  product: Product;
  quantity: number;
}

interface QuoteBasketContextType {
  items: BasketItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, delta: number) => void;
  clearBasket: () => void;
  totalItems: number;
  totalUnits: number;
  totalEstimatedPrice: number;
  sendWhatsAppQuote: (customerName?: string, city?: string, rucCedula?: string) => void;
}

const QuoteBasketContext = createContext<QuoteBasketContextType | undefined>(undefined);

const STORAGE_KEY = "liderpro_quote_basket_v2";

export function QuoteBasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isMounted]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.product.sku === product.sku);
      if (existing) {
        return prev.map((it) =>
          it.product.sku === product.sku ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [...prev, { product, quantity: Math.max(1, quantity) }];
    });

    trackEvent("basket_add", {
      sku: product.sku,
      brand: product.brand,
      name: product.name,
    });
  };

  const removeItem = (sku: string) => {
    setItems((prev) => prev.filter((it) => it.product.sku !== sku));
  };

  const updateQuantity = (sku: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((it) => {
          if (it.product.sku === sku) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as BasketItem[]
    );
  };

  const clearBasket = () => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const totalItems = items.length;
  const totalUnits = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items]);
  const totalEstimatedPrice = useMemo(
    () =>
      items.reduce((sum, it) => {
        const unitPrice = typeof it.product.price === "number" ? it.product.price : 0;
        return sum + unitPrice * it.quantity;
      }, 0),
    [items]
  );

  const sendWhatsAppQuote = (customerName = "", city = "", rucCedula = "") => {
    if (items.length === 0) return;

    const lines: string[] = [
      "¡Hola LiderPro Pedernales! 👋",
      "Deseo confirmar disponibilidad y pedido de la siguiente lista oficial:",
      "",
    ];

    items.forEach((it, idx) => {
      const pres = it.product.volume || it.product.plates || "Estándar";
      lines.push(`${idx + 1}. [Cód: ${it.product.sku}] ${it.product.name}`);
      lines.push(
        `   Marca: ${it.product.brand} | Presentación: ${pres} | Cant: ${it.quantity} un.`
      );
    });

    lines.push("");
    lines.push(`📦 Total ítems: ${items.length} referencias (${totalUnits} unidades en total)`);

    if (customerName.trim()) {
      lines.push(`👤 Cliente / Taller: ${customerName.trim()}`);
    }
    if (city.trim()) {
      lines.push(`📍 Ciudad / Sector: ${city.trim()}`);
    }
    if (rucCedula.trim()) {
      lines.push(`📄 RUC / Cédula SRI: ${rucCedula.trim()}`);
    }

    lines.push("");
    lines.push(
      "¿Me confirman por favor la cotización con IVA y el regalo de cortesía (MANNOL 6145 Cockpit Care + Esponja)?"
    );

    trackEvent("basket_whatsapp_quote", {
      itemCount: items.length,
      unitCount: totalUnits,
    });

    const encoded = encodeURIComponent(lines.join("\n"));
    const phone = BUSINESS_CONFIG.pedernalesDirectNumber || "593983893231";
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <QuoteBasketContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
        totalItems,
        totalUnits,
        totalEstimatedPrice,
        sendWhatsAppQuote,
      }}
    >
      {children}
    </QuoteBasketContext.Provider>
  );
}

export function useQuoteBasket() {
  const context = useContext(QuoteBasketContext);
  if (!context) {
    throw new Error("useQuoteBasket must be used within a QuoteBasketProvider");
  }
  return context;
}
