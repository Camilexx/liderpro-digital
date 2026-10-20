import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LiderPro Ecuador — Distribuidor Multimarca",
    short_name: "LiderPro",
    description:
      "Distribuidor Oficial Multimarca de Baterías, Lubricantes y Filtros en Ecuador. Despacho diario a las 24 provincias.",
    start_url: "/",
    display: "standalone",
    background_color: "#061B40",
    theme_color: "#061B40",
    lang: "es",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
