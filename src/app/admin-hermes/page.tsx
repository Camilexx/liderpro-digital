import type { Metadata } from "next";
import AdminHermesDashboard from "@/components/AdminHermesDashboard";

export const metadata: Metadata = {
  title: "Admin Milo IA — Pedidos y Auditoría | LíderPro Pedernales",
  description: "Panel operativo privado de despacho, historial omnicanal y auditoría semanal.",
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

export default function AdminHermesPage() {
  return <AdminHermesDashboard />;
}
