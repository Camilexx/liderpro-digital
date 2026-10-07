# LIDERPRO DIGITAL — ARQUITECTURA SEO Y POSICIONAMIENTO ORGÁNICO
**Estrategia:** SEO Técnico, Local y Temático para Ecuador  

---

## 1. Pilares de Indexación

1. **Por Categoría Principal:**
   - `/baterias/` — Baterías selladas, amperajes y arranque en frío.
   - `/lubricantes/` — Aceites sintéticos 5W-30 y diésel 15W-40.
   - `/filtros/` — Filtros blindados de aceite y combustible.

2. **Por Producto Específico:**
   - `/productos/[slug]/` — Fichas técnicas indexadas con meta-títulos dinámicos, SKU, aplicaciones y garantía.

3. **Por Educación y Resolución de Problemas (Inbound):**
   - `/guias/por-que-mi-carro-no-prende/`
   - `/guias/que-significa-aceite-5w30/`
   - `/guias/cada-cuanto-cambiar-el-aceite/`
   - `/guias/que-bateria-necesita-un-chevrolet-sail/`

4. **Por Presencia Local Estratégica:**
   - `/sucursales/` — Pedernales (Manabí) y Quito (Pichincha) con palabras clave geográficas de intención comercial.
   - `/envios/` — Despacho nacional con cobertura interprovincial.

---

## 2. Archivos de Indexación Automática

- `src/app/sitemap.ts`: Genera dinámicamente `sitemap.xml` con prioridades, frecuencias de rastreo y todos los slugs de productos y guías.
- `src/app/robots.ts`: Permite la indexación completa de rutas públicas y bloquea rutas privadas de API.
- Metadatos con `title`, `description`, `keywords` y OpenGraph preconfigurados.
