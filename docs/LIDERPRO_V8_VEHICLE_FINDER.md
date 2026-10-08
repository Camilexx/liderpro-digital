# LIDERPRO DIGITAL — V8 VEHICLE FINDER 2.0 ARCHITECTURE
**Component:** `src/components/VehicleFinder.tsx`  
**Version:** 2.0  
**State Machine:** Multi-Step Intent-Driven Selector  

---

## 1. Flujo de Pasos (Step Progression)

El Vehicle Finder 2.0 evoluciona de un simple filtro de base de datos a un asistente de intenciones comerciales de 6 etapas:

```
[Paso 1: Intención / Problema]
  ├── "Mi auto no prende" (Ruta Batería Inmediata)
  ├── "Necesito batería"
  ├── "Cambio de aceite"
  ├── "Filtros"
  ├── "Frenos"
  └── "No sé qué necesito" (Fallback honesto → WhatsApp)
         │
         ▼
[Paso 2: Marca] (Chevrolet, Toyota, Kia, Hyundai, Nissan, Renault, Chery...)
         │
         ▼
[Paso 3: Modelo] (Dependiente de la marca seleccionada)
         │
         ▼
[Paso 4: Año] (Rango soportado en parque automotor)
         │
         ▼
[Paso 5: Motor] (Cilindraje / Combustible: 1.4L, 1.5L, 2.0L, 2.8L CRDi...)
         │
         ▼
[Paso 6: Ciudad de Entrega / Despacho]
  ├── Pedernales, Manabí
  ├── Quito, Pichincha
  ├── Guayaquil / Manta / Santo Domingo / Otra ciudad
```

---

## 2. Prevención de Alucinaciones y Estado "Zero-Match"

Cuando un usuario selecciona una combinación de vehículo no registrada o la opción *"No sé qué necesito"*:
- El sistema **NO inventa un producto ficticio**.
- Muestra una tarjeta honesta de derivación técnica:
  > *"No tenemos este modelo cargado en el catálogo rápido, pero nuestro equipo técnico puede verificar la compatibilidad en el manual de fábrica de tu auto por WhatsApp."*
- Proporciona un botón directo a WhatsApp con los parámetros acumulados (`make`, `model`, `year`, `engine`, `city`).

---

## 3. Integración con WhatsApp Commerce

Cada resultado compatible incluye un enlace que transporta los parámetros del vehículo en el saludo inicial:
```
https://wa.me/593981881515?text=Hola%20LiderPro%2C%20estoy%20en%20Quito%20y%20busco%20la%20bater%C3%ADa%20para%20un%20Chevrolet%20Sail%202018%201.5L...
```
Esto elimina el tiempo de calificación del asesor de 10 minutos a menos de 30 segundos.
