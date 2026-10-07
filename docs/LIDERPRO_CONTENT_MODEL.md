# LIDERPRO DIGITAL — MODELO DE CONTENIDO Y DATOS
**Ubicación:** `src/data/`  

---

## 1. Configuración Centralizada de Negocio (`src/data/businessConfig.ts`)

Centraliza claims comerciales, textos de soporte, números de contacto y gobernanza legal:

- **Slogan Principal:** *"LiderPro — Tu vehículo. Nuestra experiencia."*
- **Propuesta de Valor:** *"Encuentra el producto adecuado para tu vehículo, recibe asesoría especializada y recíbelo donde estés."*
- **Disclaimer Legal:** Operación comercial independiente con enlace directo a planta principal.
- **Configuración de Sucursales:** Datos de Pedernales (Manabí) y Quito (Pichincha) con horarios, servicios y teléfonos.

---

## 2. Catálogo Técnico de Productos (`src/data/products.ts`)

Modelo estructurado que contempla:

- `id`, `sku`, `slug`, `name`, `brand`, `category`
- `shortSpec`: Resumen técnico clave de una línea (amperaje, CCA, viscosidad, norma API).
- `fullSpecs`: Diccionario clave-valor con tolerancias OEM (voltaje, base sintética, dimensiones, polaridad).
- `warranty`: Garantía técnica real (15 a 18 meses para baterías).
- `inStock`: Disponibilidad real confirmada en sucursales.
- `compatibleVehicles`: Relación de modelos verificados (Chevrolet Sail, Tracker Turbo, D-Max, Kia Rio, Toyota Yaris, Hilux, etc.).

---

## 3. Base de Datos de Vehículos y Compatibilidad (`src/data/vehicles.ts`)

- Árbol de datos: `Marca → Modelo → Años → Motores/Cilindrada → SKUs Recomendados`.
- **Regla de Cero Fabricación:** Si una combinación no cuenta con SKU exacto verificado, el sistema **nunca** adivina. En su lugar, despliega la alerta de verificación humana con enlace directo a WhatsApp.

---

## 4. Motor de Contenido Educativo (`src/data/articles.ts`)

Estructura de cuatro etapas orientada a la psicología del cliente automotriz:
1. **Problema:** El síntoma cotidiano que experimenta el conductor.
2. **Explicación Técnica Sencilla:** Por qué ocurre sin tecnicismos innecesarios.
3. **Solución LiderPro:** El producto o procedimiento adecuado.
4. **WhatsApp Hook:** Botón de consulta directa con un especialista.
