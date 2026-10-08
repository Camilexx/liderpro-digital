import type { Metadata, Viewport } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "LiderPro — El producto correcto para tu vehículo. Sin adivinar.",
  description:
    "Especialista automotriz con cobertura nacional. Baterías, lubricantes y repuestos con asesoría técnica real y envíos a todo Ecuador.",
  keywords: [
    "baterias ecuador",
    "repuestos automotrices ecuador",
    "aceite sintetico 5w30",
    "liderpro ecuador",
    "repuestos chevrolet sail",
    "asesoria repuestos autos",
  ],
  authors: [{ name: "LiderPro Digital" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-primary selection:text-white relative">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
