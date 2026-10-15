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
  title: "LiderPro Ecuador — Distribuidor Autorizado Multimarca | Hub Pedernales",
  description:
    "Distribuidor Autorizado Multimarca de lubricantes, baterías y filtros automotrices e industriales. Despacho diario desde Bodega Matriz en Pedernales (Manabí) a las 24 provincias del Ecuador con facturación electrónica SRI.",
  keywords: [
    "baterias ecuador",
    "baterias bosch ecuador",
    "lubricantes mannol ecuador",
    "motul ecuador",
    "mobil delvac pedernales",
    "filtros advance ecuador",
    "repuestos automotrices ecuador",
    "repuestos chevrolet sail",
    "aceite sintetico 5w30",
    "liderpro pedernales",
    "baterias camaroneras ecuador",
  ],
  authors: [{ name: "LiderPro Digital" }],
  openGraph: {
    title: "LiderPro Ecuador — Distribuidor Autorizado Multimarca",
    description:
      "Baterías Ecuador, Bosch, Mannol, Motul, Mobil, Havoline y Castrol. Despacho nacional diario a las 24 provincias desde nuestra Bodega Matriz en Pedernales.",
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
  "@type": "AutoPartsStore",
  "name": "LiderPro Ecuador",
  "alternateName": "LiderPro Productos Automotrices",
  "description": "Distribuidor Autorizado Multimarca de lubricantes, baterías y repuestos automotrices con Sede Central y Bodega Matriz en Pedernales, Manabí, y cobertura logística a las 24 provincias.",
  "url": "https://liderpro-digital.vercel.app",
  "telephone": "+593981881515",
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Electronic Transfer, SRI Withholding",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Zona Comercial Automotriz",
    "addressLocality": "Pedernales",
    "addressRegion": "Manabí",
    "postalCode": "131001",
    "addressCountry": "EC"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 0.07,
    "longitude": -80.05
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Ecuador"
  }
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
