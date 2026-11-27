"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function createEventId(prefix: string): string {
  return `lp_${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function resolveRouteViewContent(pathname: string): { content_name: string; content_category: string } | null {
  if (pathname.startsWith("/productos/")) {
    return { content_name: pathname.replace("/productos/", ""), content_category: "Producto" };
  }
  if (pathname === "/productos") return { content_name: "Catalogo Productos", content_category: "Catalogo" };
  if (pathname.startsWith("/baterias") || pathname.startsWith("/emergencia-bateria")) {
    return { content_name: "Baterias Ecuador y Bosch", content_category: "Baterias" };
  }
  if (pathname.startsWith("/lubricantes")) return { content_name: "Lubricantes MANNOL y Mobil", content_category: "Lubricantes" };
  if (pathname.startsWith("/filtros")) return { content_name: "Filtros Advance", content_category: "Filtros" };
  if (pathname.startsWith("/encuentra-tu-producto")) return { content_name: "Buscador Vehicular", content_category: "Buscador" };
  if (pathname.startsWith("/b2b")) return { content_name: "Flotas y Camaroneras B2B", content_category: "B2B" };
  return null;
}

export default function MetaPixelEvents() {
  const pathname = usePathname() || "/";
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq !== "function") return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      fbq("track", "PageView", {}, { eventID: createEventId("pv") });
    }

    const vc = resolveRouteViewContent(pathname);
    if (vc) {
      fbq(
        "track",
        "ViewContent",
        { ...vc, currency: "USD" },
        { eventID: createEventId("vc_route") }
      );
    }
  }, [pathname]);

  useEffect(() => {
    const onDocClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!/(wa\.me|api\.whatsapp\.com|^tel:)/i.test(href)) return;

      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (typeof fbq !== "function") return;

      const eid = createEventId("wa_link");
      const data = {
        content_name: href.startsWith("tel:") ? "Telefono_Directo" : "WhatsApp_Directo",
        content_category: "Contacto_Directo",
        currency: "USD",
      };
      fbq("track", "Contact", data, { eventID: `${eid}_ct` });
      fbq("track", "Lead", data, { eventID: `${eid}_ld` });
    };

    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  return null;
}
