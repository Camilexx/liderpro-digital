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
  themeColor: "#061B40",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://liderpro-digital.vercel.app"),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "LiderPro Ecuador — Distribuidor Autorizado Multimarca | Hub Pedernales",
    template: "%s | LiderPro Ecuador",
  },
  description:
    "Distribuidor Autorizado Multimarca de lubricantes, baterías, filtros y químicos automotrices e industriales (Baterías Ecuador, Bosch, Mannol, Aroil, Mobil, Motul, Valvoline, Amalie, Advance, ATE, NGK, Denso, Bardahl, Abro). Despacho diario desde Bodega Matriz en Pedernales (Manabí) a las 24 provincias del Ecuador con facturación electrónica SRI.",
  keywords: [
    "baterias ecuador",
    "baterias bosch ecuador",
    "lubricantes mannol ecuador",
    "lubricantes aroil ecuador",
    "motul ecuador",
    "mobil delvac pedernales",
    "valvoline ecuador",
    "amalie motor oil ecuador",
    "filtros advance ecuador",
    "bujias ngk denso ecuador",
    "liquido de frenos ate dot 4",
    "aditivos bardahl abro ecuador",
    "repuestos automotrices ecuador",
    "liderpro pedernales manabi",
    "baterias camaroneras ecuador",
  ],
  authors: [{ name: "LiderPro Digital" }],
  openGraph: {
    title: "LiderPro Ecuador — Distribuidor Autorizado Multimarca",
    description:
      "Baterías Ecuador, Bosch, Mannol, Aroil, Motul, Mobil, Valvoline, Amalie y Advance. Despacho nacional diario a las 24 provincias desde nuestra Bodega Matriz en Pedernales.",
    url: "https://liderpro-digital.vercel.app",
    siteName: "LiderPro Ecuador",
    locale: "es_EC",
    type: "website",
    images: [
      {
        url: "/images/hero/automotive-hero.jpg",
        width: 1200,
        height: 630,
        alt: "LiderPro Distribuidor Autorizado Multimarca Pedernales Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LiderPro Ecuador — Distribuidor Autorizado Multimarca",
    description:
      "Baterías, lubricantes y filtros con despacho nacional desde Hub Pedernales (Manabí) hacia las 24 provincias.",
    images: ["/images/hero/automotive-hero.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoPartsStore",
      "@id": "https://liderpro-digital.vercel.app/#organization",
      "name": "LiderPro Ecuador",
      "alternateName": "LiderPro Productos Automotrices",
      "description":
        "Distribuidor Autorizado Multimarca de lubricantes, baterías, filtros y repuestos automotrices con Sede Central y Bodega Matriz en Pedernales, Manabí, y cobertura logística a las 24 provincias del Ecuador.",
      "url": "https://liderpro-digital.vercel.app",
      "telephone": "+593967489002",
      "priceRange": "$$",
      "currenciesAccepted": "USD",
      "paymentAccepted": "Cash, Credit Card, Electronic Transfer, SRI Withholding",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Zona Comercial Automotriz",
        "addressLocality": "Pedernales",
        "addressRegion": "Manabí",
        "postalCode": "131001",
        "addressCountry": "EC",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 0.07,
        "longitude": -80.05,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "18:00",
        },
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Ecuador",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://liderpro-digital.vercel.app/#website",
      "url": "https://liderpro-digital.vercel.app",
      "name": "LiderPro Ecuador — Catálogo Oficial Multimarca",
      "publisher": {
        "@id": "https://liderpro-digital.vercel.app/#organization",
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://liderpro-digital.vercel.app/encuentra-tu-producto?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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
