# LIDERPRO DIGITAL — SISTEMA DE WHATSAPP COMMERCE
**Capa Comercial:** WhatsApp como motor de conversión y calificación de leads  

---

## 1. Principio Operativo

WhatsApp no es un simple botón flotante; es la **capa transaccional principal**. Cada clic en la plataforma transporta al asesor humano un contexto predigerido con:
- Intención del cliente
- Producto y SKU específico
- Vehículo (Marca, Modelo, Año, Motor)
- Ciudad de destino
- Tipo de solicitud (Emergencia, Cotización B2B, Retiro en local o Flete)

---

## 2. Tipos de Acciones Contextuales y Mensajes

1. **Consulta / Compra de Producto (`whatsapp_product`):**
   ```text
   Hola LiderPro 👋
   Quiero consultar/comprar:
   • Producto: [PRODUCTO]
   • SKU: [SKU]
   • Vehículo: [VEHÍCULO]
   • Ciudad: [CIUDAD]
   ¿Me pueden confirmar disponibilidad, precio y tiempo de despacho?
   ```

2. **Confirmación de Compatibilidad (`whatsapp_vehicle`):**
   Se activa cuando el buscador automático no tiene coincidencia o el cliente desea verificar por foto o chasis.

3. **Emergencia de Batería (`whatsapp_emergency`):**
   ```text
   🚨 EMERGENCIA BATERÍA — LIDERPRO
   Mi vehículo no enciende y necesito asistencia rápida para batería.
   • Vehículo: [VEHÍCULO]
   • Ciudad/Ubicación: [CIUDAD]
   • Estado: No da arranque / Batería agotada
   ```

4. **Cotización B2B y Talleres (`whatsapp_b2b`):**
   Solicitud formal de lista de precios al por mayor y condiciones para flotas o lubricadoras.

5. **Consulta de Sucursales y Retiro Físico (`whatsapp_branch`):**
   Enrutamiento directo al punto de Pedernales o Quito.

---

## 3. Disparador Centralizado de Analítica (`src/lib/analytics.ts`)

Los eventos se capturan de forma desacoplada y se envían a:
- Google Analytics 4 (`gtag`)
- Google Tag Manager (`dataLayer`)
- Meta Pixel (`fbq`)
Eventos monitoreados:
`page_view`, `product_view`, `vehicle_finder_start`, `vehicle_finder_complete`, `whatsapp_click`, `whatsapp_product`, `whatsapp_vehicle`, `whatsapp_emergency`, `quote_request`, `branch_view`, `shipping_view`.
