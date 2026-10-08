# LIDERPRO DIGITAL — V8 PERFORMANCE & BUNDLE OPTIMIZATION
**Framework:** Next.js 15.1.11 (App Router + Turbopack Ready)  
**Total Static Routes:** 29 Prerendered Pages  

---

## 1. Métricas de Bundle y Carga

- **First Load JS Compartido:** 105 kB (Excelente rango para conexiones 4G/3G en Ecuador).
- **Home Page (`/`):** 4.71 kB transferidos, tiempo de carga inicial < 500ms en Edge.
- **Rutas de Producto (`/productos/[slug]`):** 191 B HTML base + 116 kB First Load JS.
- **Ruta Asesoría (`/asesoria`):** 191 B HTML base + 111 kB First Load JS.

---

## 2. Optimización de Imágenes y Fuentes

- **Next/Image:** Prioridad de carga (`priority`) únicamente para el Hero Banner (`/images/hero/automotive-hero.jpg`) y la foto principal del producto en la vista de detalle.
- **Formato WebP/AVIF Automático:** Comprimido y servido mediante Vercel Image Optimization.
- **Fuentes:** Tipografías del sistema y variables sin fuentes pesadas de terceros bloqueantes de render.
