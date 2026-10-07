# LIDERPRO DIGITAL — ARQUITECTURA TÉCNICA DEL SISTEMA
**Versión:** 3.0 — Production-Oriented  
**Ecosistema:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Vercel Edge Network  

---

## 1. Visión y Propósito del Sistema

LiderPro Digital no es una página web genérica automotriz ni un e-commerce transaccional tradicional saturado de carritos pesados. Es un **sistema de ventas digitales calificado para el mercado ecuatoriano** con el siguiente flujo comercial principal:

```
TRÁFICO
  ↓
CONFIANZA (Presencia física real en Pedernales y Quito)
  ↓
IDENTIFICACIÓN DE VEHÍCULO / PRODUCTO
  ↓
VALIDACIÓN DE COMPATIBILIDAD (Sin inventar datos)
  ↓
WHATSAPP COMMERCE (Conversación humana calificada con SKU precargado)
  ↓
COTIZACIÓN / CIERRE
  ↓
DESPACHO MULTI-ORIGEN (Pedernales Costa vs. Quito Sierra)
  ↓
POST-VENTA Y RECOMPRA
```

---

## 2. Identidad Comercial y Gobernanza Legal

- **Modelo:** Operación comercial independiente bajo el modelo y franquicia de LiderPro.
- **Conexión:** Enlace operativo y comercial directo con la planta principal.
- **Bases Operativas:**
  1. **Pedernales, Manabí:** Base estratégica física en la Costa ecuatoriana, permitiendo retiro presencial, diagnóstico de baterías y despacho prioritario para Manabí y perfil costero.
  2. **Quito, Pichincha:** Punto de atención y coordinación logística en la Sierra para Pichincha y distribución interprovincial.
- **Principio de Veracidad:** La plataforma **no** se proclama como sede corporativa central nacional ni casa matriz propietaria de toda la red, garantizando transparencia legal absoluta.

---

## 3. Modelo de Despacho Multi-Origen Inteligente (Fulfillment Ready)

La arquitectura de datos integra la siguiente fórmula:

$$\text{Cliente (Ubicación)} + \text{Producto (Disponibilidad)} + \text{Origen (Pedernales / Quito)} = \text{Mejor Opción Logística}$$

- **Mensaje Oficial:** *"Seleccionamos la alternativa de despacho más conveniente según disponibilidad, ubicación y cobertura."*
- **Tiempos de Entrega:** Estimado 24–48 h hábiles con disclaimer visible sobre factores viales, transportadoras y corte horario.

---

## 4. Stack Tecnológico

| Capa | Tecnología | Justificación |
|---|---|---|
| **Framework** | Next.js 15.1.7 (App Router) | Renderizado estático (SSG), Core Web Vitals de alta velocidad y SEO nativo. |
| **Lenguaje** | TypeScript 5 | Tipado estricto en modelos de repuestos, compatibilidad y analítica. |
| **Estilos** | Tailwind CSS + Custom Tokens | Paleta automotriz profesional (Rojo técnico, Azul marino industrial, Verde WhatsApp). |
| **Iconografía** | Lucide React | Iconos vectoriales limpios y ligeros. |
| **Commerce Layer** | WhatsApp Deep Linking | Enrutamiento con mensajes precargados contextuales y analítica de eventos. |
| **Deployment** | Vercel Edge Platform | Despliegue global optimizado, caché estática y alta disponibilidad. |
