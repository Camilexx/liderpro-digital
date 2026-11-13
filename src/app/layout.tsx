import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
    default: "LiderPro Pedernales — Distribuidor Autorizado Multimarca | Ecuador",
    template: "%s | LiderPro Pedernales",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        url: "/images/hero/local-pedernales.jpg",
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
    images: ["/images/hero/local-pedernales.jpg"],
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
        "Distribuidor Autorizado Multimarca de lubricantes, baterías, filtros y repuestos automotrices con Sede Central y Bodega Matriz en Pedernales, Manabí, y cobertura logística a las 24 provincias del Ecuador con facturación electrónica SRI.",
      "url": "https://liderpro-digital.vercel.app",
      "logo": "https://liderpro-digital.vercel.app/images/logo.png",
      "image": "https://liderpro-digital.vercel.app/images/hero/local-pedernales.jpg",
      "telephone": ["+593967489002", "+593983893231"],
      "priceRange": "$$",
      "currenciesAccepted": "USD",
      "paymentAccepted": "Cash, Credit Card, Electronic Transfer, SRI Withholding",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Zona Comercial Automotriz, Vía Principal",
        "addressLocality": "Pedernales",
        "addressRegion": "Manabí",
        "postalCode": "131001",
        "addressCountry": "EC",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 0.0717,
        "longitude": -80.0526,
      },
      "hasMap": "https://maps.google.com/?q=0.0717,-80.0526",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "18:00",
        },
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+593967489002",
        "contactType": "sales and technical support",
        "areaServed": "EC",
        "availableLanguage": "Spanish",
      },
      "knowsAbout": [
        "Baterías Ecuador",
        "Baterías Bosch S4 y S5",
        "Lubricantes Mannol Alemania",
        "Mobil Delvac 15W40",
        "Motul Motos 4T",
        "Filtros Advance Automotrices e Industriales",
        "Flotas Pesadas y Sector Camaronero",
        "Facturación Electrónica SRI",
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

import { QuoteBasketProvider } from "@/context/QuoteBasketContext";
import { WhatsAppSelectorProvider } from "@/context/WhatsAppSelectorContext";
import QuoteBasketDrawer from "@/components/QuoteBasketDrawer";
import WhatsAppSelectorModal from "@/components/WhatsAppSelectorModal";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {metaPixelId && (
          <>
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${metaPixelId}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-primary selection:text-white relative pb-16 lg:pb-0">
        <WhatsAppSelectorProvider>
          <QuoteBasketProvider>
            <AnnouncementBar />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <QuoteBasketDrawer />
            <WhatsAppSelectorModal />
            <FloatingWhatsApp />
            <MobileBottomBar />
          </QuoteBasketProvider>
        </WhatsAppSelectorProvider>
      </body>
    </html>
  );
}
