import { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { EDUCATIONAL_ARTICLES } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://liderpro-digital.vercel.app";

  const staticRoutes = [
    "",
    "/productos",
    "/baterias",
    "/lubricantes",
    "/filtros",
    "/encuentra-tu-producto",
    "/sucursales",
    "/envios",
    "/b2b",
    "/asesoria",
    "/guias",
    "/contacto",
    "/emergencia-bateria",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/b2b" || route === "/asesoria" ? 0.85 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/productos/${prod.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const guideRoutes = EDUCATIONAL_ARTICLES.map((guide) => ({
    url: `${baseUrl}/guias/${guide.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...guideRoutes];
}
