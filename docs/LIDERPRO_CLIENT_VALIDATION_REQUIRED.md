# LIDERPRO DIGITAL — REQUERIMIENTOS DE VALIDACIÓN DEL CLIENTE
**Documento:** Client Validation Checklist  
**Propósito:** Definir los únicos 4 datos comerciales que el propietario de la franquicia debe proveer para activar la operación a escala comercial.  

---

| Ítem | Valor Actual (Placeholder Seguro) | ¿Por qué es importante? | Entrada Requerida del Cliente | Riesgo si no se actualiza |
|---|---|---|---|---|
| **Número WhatsApp Pedernales** | `593999999999` | Es el receptor directo de las compras y consultas de la Costa. | Número real de WhatsApp Business (ej: `593987654321`) | Las consultas de la Costa llegarán a un número demostrativo. |
| **Número WhatsApp Quito** | `593998888888` | Es el receptor directo de las consultas de la Sierra e interprovinciales. | Número real de WhatsApp Business de la sede Quito. | Las consultas de la Sierra llegarán a un número demostrativo. |
| **Dirección Pedernales** | "Av. Principal y Acceso Comercial" | Permite que clientes de Pedernales y Manabí retiren baterías en persona. | Dirección comercial exacta o punto de referencia en Pedernales. | Menor confianza en retiros locales. |
| **Dirección Quito** | "Sector Estratégico Norte / Centro Logístico" | Permite a talleres y clientes coordinar visitas o retiros en Quito. | Dirección o sector comercial exacto en Quito. | Menor precisión para visitas físicas en Quito. |

---

## Instrucciones para el Cliente (30 Segundos)

Para reemplazar estos valores, el cliente solo necesita editar el archivo centralizado:  
📁 `src/data/businessConfig.ts`  
Y modificar las líneas 61–62 (Pedernales) y 79–80 (Quito). Toda la web se actualizará automáticamente sin tocar código HTML/React.
