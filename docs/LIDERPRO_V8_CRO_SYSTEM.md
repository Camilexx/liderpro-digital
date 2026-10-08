# LIDERPRO DIGITAL — V8 CONVERSION RATE OPTIMIZATION (CRO) SYSTEM
**Document Version:** 8.0  
**Target:** WhatsApp Conversion Architecture & User Journeys  

---

## 1. Arquitectura de los 3 Caminos de Conversión (Three Conversion Paths)

La página principal de LiderPro Digital estructura el embudo comercial en 3 rutas diferenciadas según el nivel de certeza e intencionalidad del cliente:

```
                  VISITANTE / CLIENTE
                           │
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
 [CAMINO A: URGENCIA] [CAMINO B: BÚSQUEDA] [CAMINO C: ASESORÍA]
 "Mi carro no prende" "Busco un producto"  "No sé qué necesito"
         │                   │                   │
         ▼                   ▼                   ▼
 /emergencia-bateria   VehicleFinder       /asesoria
  (Triage síntomas)     (6 Pasos)           (Foto/Síntoma)
         │                   │                   │
         └───────────────────┼───────────────────┘
                             ▼
              WHATSAPP COMMERCE ENGINE 2.0
               (Mensaje con Trazabilidad)
                             ▼
                   CIERRE DE VENTA & DESPACHO
```

### Camino A: Emergencia / Auxilio Inmediato (`/emergencia-bateria`)
- **Público Objetivo:** Conductor varado en casa, oficina o carretera.
- **Acción:** Triage sintomático con un solo tap (*Hace clic y no enciende*, *No hace nada*, *Se apagó en marcha*, *Luces tenues*).
- **Resultado:** Link WhatsApp preconfigurado con síntoma + vehículo + ciudad sin fricción.

### Camino B: Búsqueda Determinada (`VehicleFinder 2.0`)
- **Público Objetivo:** Conductor que conoce su auto o busca repuesto específico (ej. "Batería para Sail 2018").
- **Acción:** Selector estructurado: Intención → Marca → Modelo → Año → Motor → Ciudad.
- **Resultado:** Filtro instantáneo de catálogo con botón de confirmación de compatibilidad.

### Camino C: Asistencia Guiada (`/asesoria` - Usuario Desconocido)
- **Público Objetivo:** Usuario sin conocimientos mecánicos o con falla intermitente.
- **Acción:** Ruta de 3 pasos (Describe el síntoma, Envía una foto de la muestra o placa, Recibe cotización y entrega).
- **Resultado:** Enlace WhatsApp `unknown_need` invitando a enviar fotografía de la pieza o etiqueta.

---

## 2. Microcopy de Alta Conversión

| Ubicación | Copy Anterior (Genérico) | Copy V8 (Orientado a Conversión) |
| :--- | :--- | :--- |
| **Hero Button Principal** | "Buscar Repuestos" | `ENCONTRAR MI PRODUCTO` |
| **Hero Button Secundario**| "Contáctanos" | `HABLAR CON UN ASESOR` |
| **Ficha de Producto** | "Comprar Ahora" / "Consultar" | `CONFIRMAR COMPATIBILIDAD Y DISPONIBILIDAD` |
| **Auxilio Inmediato** | "Enviar Emergencia" | `SOLICITAR AUXILIO DE BATERÍA POR WHATSAPP` |
| **Ruta Asesoría** | "Escríbenos" | `AYÚDAME A IDENTIFICAR EL PRODUCTO` |

---

## 3. Matriz de Fricción Eliminada

1. **Sin Carrito de Compras Abandonado:** En el mercado ecuatoriano de autopartes, forzar un checkout con tarjeta sin verificar compatibilidad produce tasas de devolución >30%. El modelo guiado a WhatsApp reduce devoluciones a <2%.
2. **Sin Formularios Extensos:** Máximo 2 campos opcionales en banners rápidos.
3. **Persistencia de Contexto:** El cliente nunca tiene que re-escribir su auto en WhatsApp; viaja en el texto codificado en la URL.
