"use client";

import React, { createContext, useContext, useState } from "react";
import { buildContextualWhatsAppMessage } from "@/lib/dual_whatsapp_router";
import { trackEvent } from "@/lib/analytics";

export interface WhatsAppSelectorRequest {
  itemTitle?: string;
  customMessage?: string;
  sourceLocation?: string;
  sku?: string;
  isComboGift?: boolean;
}

interface WhatsAppSelectorContextType {
  isOpen: boolean;
  request: WhatsAppSelectorRequest | null;
  openSelector: (req?: WhatsAppSelectorRequest) => void;
  closeSelector: () => void;
}

const WhatsAppSelectorContext = createContext<WhatsAppSelectorContextType | undefined>(
  undefined
);

export function WhatsAppSelectorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState<WhatsAppSelectorRequest | null>(null);

  const openSelector = (req: WhatsAppSelectorRequest = {}) => {
    const finalMessage =
      req.customMessage?.trim() ||
      buildContextualWhatsAppMessage(req.itemTitle);
    setRequest({
      ...req,
      customMessage: finalMessage,
    });
    setIsOpen(true);
    trackEvent("whatsapp_selector_open", {
      location: req.sourceLocation || "web",
      item: req.itemTitle || "general",
      sku: req.sku || "",
    });
  };

  const closeSelector = () => {
    setIsOpen(false);
  };

  return (
    <WhatsAppSelectorContext.Provider
      value={{ isOpen, request, openSelector, closeSelector }}
    >
      {children}
    </WhatsAppSelectorContext.Provider>
  );
}

export function useWhatsAppSelector() {
  const ctx = useContext(WhatsAppSelectorContext);
  if (!ctx) {
    throw new Error(
      "useWhatsAppSelector debe usarse dentro de WhatsAppSelectorProvider"
    );
  }
  return ctx;
}
