import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "LiderPro — Tu vehículo. Nuestra experiencia | Repuestos y Baterías Ecuador",
  description:
    "Encuentra el producto adecuado para tu vehículo con respaldo técnico. Baterías automotrices, aceites sintéticos y repuestos con puntos en Pedernales y Quito, y envíos a nivel nacional.",
  keywords: [
    "baterias ecuador",
    "baterias pedernales",
    "baterias quito",
    "repuestos automotrices manabi",
    "aceite 5w30 ecuador",
    "liderpro digital",
    "repuestos chevrolet sail",
  ],
  authors: [{ name: "LiderPro Digital" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-primary selection:text-white">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
