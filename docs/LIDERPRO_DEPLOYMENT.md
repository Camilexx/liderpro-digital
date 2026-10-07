# LIDERPRO DIGITAL — GUÍA DE DESPLIEGUE EN VERCEL
**Plataforma Objetivo:** Vercel (Next.js Edge Deployment)  

---

## 1. Verificación Previa al Despliegue

El proyecto ha completado de forma 100% exitosa la compilación estática de producción:

```bash
cd liderpro-digital
npm run build
```

**Resultado de Compilación:**
- **Páginas Estáticas Generadas:** 28 rutas compiladas con éxito (Home, Catálogo, Fichas de Producto dinámicas SSG, Buscador, Guías educativas SSG, Sucursales, Envíos, Emergencia, Contacto, Sitemap y Robots).
- **First Load JS:** Optimizado a ~105 kB compartido.
- **Tipado TypeScript:** 0 errores de compilación.

---

## 2. Métodos de Despliegue a Vercel

### Opción A: Despliegue Automático mediante GitHub (Recomendado)
1. El repositorio local está configurado con Git.
2. Hacer push a la rama `main` en GitHub (repositorio vinculado a la cuenta `Camilexx`).
3. En el dashboard de Vercel (`https://vercel.com`), importar el proyecto seleccionando la carpeta raíz `liderpro-digital`.
4. El pipeline CI/CD de Vercel detecta automáticamente Next.js 15 y ejecuta `next build` en cada commit o Pull Request.

### Opción B: Despliegue Directo con Vercel CLI
```bash
# Iniciar sesión en Vercel
npx vercel login

# Vincular y desplegar en modo producción
npx vercel --prod
```

---

## 3. Variables de Entorno de Producción (Opcionales)

| Variable | Descripción | Valor por Defecto |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número principal de WhatsApp para recepción | `593999999999` |
| `NEXT_PUBLIC_GA_ID` | Identificador de Google Analytics 4 | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Identificador de Meta Pixel | `XXXXXXXXXXXXXXX` |
