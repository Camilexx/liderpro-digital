import type { Metadata } from "next";
import DemoWhatsAppSimulator from "@/components/DemoWhatsAppSimulator";

export const metadata: Metadata = {
  title: "Milo • Asesor Automotriz de LíderPro Pedernales (WhatsApp 24/7)",
  description: "Simulador conversacional de Milo, asesor automotriz de LíderPro Pedernales.",
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
