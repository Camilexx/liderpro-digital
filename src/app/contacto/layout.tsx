import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto y Cotizaciones Especializadas | LiderPro Ecuador",
  description:
    "Atención personalizada para particulares, talleres mecánicos y flotas comerciales desde nuestro Hub Central en Pedernales (Manabí) hacia las 24 provincias.",
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    title: "Contacto y Cotizaciones Especializadas | LiderPro Ecuador",
    description:
      "Atención personalizada para particulares, talleres mecánicos y flotas comerciales con despacho nacional y facturación SRI.",
    url: "https://liderpro-digital.vercel.app/contacto",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
