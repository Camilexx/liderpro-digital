# LIDERPRO DIGITAL — V8 WHATSAPP COMMERCE ENGINE
**Module:** `src/lib/whatsapp.ts`  
**Phone:** `+593 98 188 1515` (Ecuador Format: 593981881515)  

---

## 1. Mapeo de Acciones y Plantillas de Mensaje

El motor de WhatsApp estructura los mensajes salientes para garantizar una conversación de alta conversión comercial:

| Acción (`action`) | Contexto Recibido | Plantilla Generada |
| :--- | :--- | :--- |
| `emergency` | `vehicleMake`, `city`, `symptom` | "¡Hola LiderPro! Mi auto no enciende y necesito auxilio/batería urgente. Síntoma: [symptom]. Vehículo: [vehicle]. Ubicación: [city]." |
| `vehicle_match` | `vehicleMake`, `vehicleModel`, `vehicleYear`, `vehicleEngine`, `city` | "Hola LiderPro, busco repuestos y compatibilidad para mi vehículo: [Make] [Model] [Year] [Engine] en [City]. ¿Tienen disponibilidad y precio?" |
| `product` | `productName`, `sku`, `price` | "Hola LiderPro, estoy interesado en el producto: [productName] (SKU: [sku]). Quisiera confirmar compatibilidad con mi vehículo y stock." |
| `unknown_need` | `city`, `issueDescription` | "Hola LiderPro, necesito asesoría técnica. No estoy seguro qué repuesto o producto necesita mi vehículo. ¿Me pueden ayudar a identificarlo?" |
| `general_quote`| N/A | "Hola LiderPro, quisiera solicitar una cotización y consultar tiempos de entrega en Ecuador." |

---

## 2. Parámetros Técnicos de Sanitización

- **Encoding:** Codificación estricta mediante `encodeURIComponent()` para caracteres especiales (tildes, signos de interrogación, espacios).
- **Fallback Seguro:** Si falta un parámetro, el motor inyecta un texto contextual amigable (ej. *"mi vehículo"* en lugar de `undefined`).
- **Trazabilidad:** Cada enlace cuenta con un evento analítico emparejado en `src/lib/analytics.ts` (`trackEvent("whatsapp_click", { action, ...context })`).
