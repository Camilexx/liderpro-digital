import { Metadata } from "next";

export default function Robots(): {
  rules: { userAgent: string; allow: string; disallow: string[] };
  sitemap: string;
} {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://liderpro-digital.vercel.app/sitemap.xml",
  };
}
