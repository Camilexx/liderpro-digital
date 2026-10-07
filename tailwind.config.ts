import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0A192F",
          dark: "#0F172A",
          surface: "#1E293B",
          primary: "#D92D20", // Automotive red
          primaryHover: "#B42318",
          amber: "#F59E0B", // Energy / Alert / Performance
          cyan: "#0284C7", // Coolant / Tech
          neutralBg: "#F8FAFC",
          cardBg: "#FFFFFF",
          border: "#E2E8F0",
          textPrimary: "#0F172A",
          textMuted: "#64748B",
          whatsapp: "#25D366",
          whatsappHover: "#1EBE5D",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 23, 42, 0.06)",
        card: "0 10px 30px -5px rgba(15, 23, 42, 0.08)",
        glow: "0 0 25px rgba(217, 45, 32, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
