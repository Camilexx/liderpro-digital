import type { Metadata, Viewport } from "next";
import Script from "next/script";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { BUSINESS_CONFIG } from "@/data/businessConfig";
import "./globals.css";

const SITE_URL = "https://www.liderpropedernales.com";
const META_DOMAIN_VERIFICATION =
  process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION ||
  "bo4ijpc9x02pok57gb9d9d8k6xf5p8";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#061B40",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "./",
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    other: {
      "facebook-domain-verification": META_DOMAIN_VERIFICATION,
    },
  },
  title: {
    default: "LiderPro Pedernales — Distribuidor Autorizado Multimarca | Ecuador",
    template: "%s | LiderPro Pedernales",
  },
  icons: {
    icon: [
      { url: "/favicon.png?v=2", type: "image/png" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png?v=2",
  },
  description:
    "Lubricantes (5W-30, 5W-40, 10W-40, 20W-50), baterías a domicilio en Pedernales, filtros y repuestos automotrices (Baterías Ecuador, Bosch, Mannol, Mobil, Amalie, Advance). Despacho diario desde Pedernales (Manabí) a todo Ecuador con factura electrónica SRI.",
  keywords: [
    "baterias a domicilio pedernales",
    "baterias ecuador pedernales",
    "baterias bosch ecuador",
    "lubricantes mannol 5w-30 5w-40 10w-40 20w-50 ecuador",
    "aceite 20w-50 5w-30 5w-40 pedernales",
    "mobil delvac pedernales",
    "filtros advance repuestos automotrices ecuador",
    "cambio de aceite pedernales manabi",
    "canecas 20l camaroneras flotas ecuador",
    "liderpro pedernales manabi",
  ],
  authors: [{ name: BUSINESS_CONFIG.legalName }, { name: "LiderPro Digital" }],
  openGraph: {
    title: "LiderPro Ecuador — Distribuidor Autorizado Multimarca",
    description:
      "Baterías Ecuador, Bosch, Mannol, Aroil, Motul, Mobil, Valvoline, Amalie y Advance. Despacho nacional diario a las 24 provincias desde nuestra Bodega Matriz en Pedernales.",
    url: SITE_URL,
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
      "@id": `${SITE_URL}/#organization`,
      "name": "LiderPro Ecuador",
      "legalName": BUSINESS_CONFIG.legalName,
      "alternateName": "LiderPro Productos Automotrices",
      "description":
        "Distribuidor Autorizado Multimarca de lubricantes, baterías, filtros y repuestos automotrices con Sede Central y Bodega Matriz en Pedernales, Manabí, y cobertura logística a las 24 provincias del Ecuador con facturación electrónica SRI.",
      "url": SITE_URL,
      "logo": `${SITE_URL}/images/logo.png`,
      "image": `${SITE_URL}/images/hero/local-pedernales.jpg`,
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
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "LiderPro Ecuador — Catálogo Oficial Multimarca",
      "publisher": {
        "@id": `${SITE_URL}/#organization`,
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/encuentra-tu-producto?q={search_term_string}`,
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
import MetaPixelEvents from "@/components/MetaPixelEvents";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1841181450502602";
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
            <MetaPixelEvents />
          </QuoteBasketProvider>
        </WhatsAppSelectorProvider>
      </body>
    </html>
  );
}
