# LIDERPRO DIGITAL — V8 TECHNICAL SEO AUDIT
**Canonical Domain:** `https://liderpro-digital.vercel.app`  

---

## 1. Arquitectura de Metadatos y OpenGraph

- **Títulos Únicos:** Cada página cuenta con título y descripción contextualizada para intención de búsqueda local ecuatoriana.
- **Ruta Nueva `/asesoria`:** Incluye metadata para consultas de intención ambigua: *"¿No sabes qué repuesto necesita tu vehículo? Asesoría técnica LiderPro"*.
- **Ruta `/emergencia-bateria`:** Posicionada para búsquedas transaccionales de auxilio vial: *"¿Tu vehículo no enciende? Auxilio de batería urgente"*.

---

## 2. Archivos de Rastreo: `sitemap.xml` y `robots.ts`

- **Sitemap Dinámico (`src/app/sitemap.ts`):** Genera URLs canónicas para todas las categorías, artículos y slugs de productos generados en build estático.
- **Robots (`src/app/robots.ts`):** `User-Agent: *`, `Allow: /`, apuntando a `sitemap.xml`.
- **Indexación y Datos Estructurados:** Marcado semántico Schema.org `AutoPartsStore` y `Product` con moneda USD para el mercado ecuatoriano.
