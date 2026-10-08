# LIDERPRO DIGITAL — V8 MOBILE AUDIT & RESPONSIVENESS
**Reference Viewports:** 390x844 (iPhone 12/13/14), 360x800 (Samsung Galaxy), 412x915 (Pixel)  

---

## 1. Zonas de Contacto (Thumb Zones & Ergonomía Móvil)

- **Alturas Mínimas de Botones:** Mínimo `h-12` (48px) y `h-14` (56px) para todos los elementos accionables primarios, superando la pauta WCAG 2.1 (44px).
- **Barra de Navegación Móvil:** Accesible con una sola mano, menú colapsable optimizado y botón de WhatsApp accesible de inmediato.
- **Formularios de Emergencia:** Reducidos a 1 tap en selección de síntoma y campos de texto con inputs nativos `text-base` para prevenir zoom automático indeseado en Safari iOS.

---

## 2. Prevención de Desbordamiento Horizontal (Horizontal Scroll)

- Todos los contenedores usan `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Se removieron anchos fijos mayores a `100vw`.
- Las tablas y fichas técnicas se adaptan a disposición vertical en pantallas < 768px (`grid-cols-1 lg:grid-cols-2`).
