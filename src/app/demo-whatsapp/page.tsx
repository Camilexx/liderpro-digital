import type { Metadata } from "next";
import DemoWhatsAppSimulator from "@/components/DemoWhatsAppSimulator";

export const metadata: Metadata = {
  title: "Simulador WhatsApp Business 24/7 — LíderPro Pedernales",
  description: "Entorno privado de demostración para Meta Business Review.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DemoWhatsAppPage() {
  return <DemoWhatsAppSimulator />;
}
