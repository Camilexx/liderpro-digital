# LIDERPRO DIGITAL — FORENSIC DISCOVERY & CODEBASE RECONNAISSANCE
**Auditoría:** Forensic Production Audit V4.0  
**Fecha:** Octubre 2026  
**Entorno de Trabajo:** `c:\Users\PC\Desktop\NEXUS\liderpro-digital`  
**Estado:** Inspección Integral Ejecutada  

---

## 1. Inventario Tecnológico

- **Framework:** Next.js `15.1.7` (App Router)
- **Runtime / Lenguaje:** Node.js v25.6.1 / TypeScript `5`
- **Librería de Componentes:** Componentes a medida sobre Tailwind CSS `3.4.1` + `clsx` + `tailwind-merge` + `lucide-react` `1.52.0`.
- **Motor de Renderizado:** Server Components por defecto; Client Components estrictamente delimitados con `"use client"` para interactividad (`Header`, `VehicleFinder`, `EmergencyBanner`, `LocationsLogisticsSection`, `ProductCard`, `FAQSection`, `Contacto`).
- **Sistema de Rutas:** App Router con 28 rutas estáticas y SSG generadas mediante `generateStaticParams()`.
- **Commerce Layer:** WhatsApp Deep Linking (`src/lib/whatsapp.ts`) estructurado para 7 flujos de conversión calificados.

---

## 2. Mapa Estructural del Proyecto

```
liderpro-digital/
├── .env.example                    # Plantilla de variables de entorno para producción
├── .gitignore                      # Configurado para ignorar .next, node_modules, .env*.local
├── docs/                           # Documentación de arquitectura, diseño y auditoría
├── public/                         # Assets estáticos y fotografía
│   └── images/
│       ├── hero/automotive-hero.jpg
│       └── products/               # 7 imágenes aisladas SHA256 diferenciadas
├── src/
│   ├── app/                        # Rutas públicas (Home, Catálogo, Fichas, Sucursales, etc.)
│   ├── components/                 # Componentes de presentación y herramientas interactivas
│   ├── data/                       # Fuente estática estructurada (productos, vehículos, config)
│   └── lib/                        # Helpers de analítica y WhatsApp
├── package.json                    # Scripts: dev, build, start, lint, typecheck
├── tailwind.config.ts              # Tokens de diseño oficiales LiderPro
└── tsconfig.json                   # Tipado estricto habilitado
```

---

## 3. Diagnóstico de Gobernanza y Separación de Responsabilidades

1. **Separación UI / Data / Logic:** Los datos de catálogo no están incrustados en componentes JSX; residen en archivos dedicados en `src/data/` (`products.ts`, `vehicles.ts`, `articles.ts`, `businessConfig.ts`).
2. **Control de Código Muerto:** Se corrigieron warnings de TypeScript y se añadió el script `"typecheck": "tsc --noEmit"` a `package.json` para integración continua.
3. **Manejo de Errores y Páginas No Encontradas:** Implementación de `not-found.tsx` personalizada con recuperación guiada al inicio y al buscador por vehículo.
