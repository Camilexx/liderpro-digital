# LIDERPRO DIGITAL — DATA LOCK & COMMERCIAL GOVERNANCE MATRIX
**Auditoría:** Forensic Production Audit V4.0  
**Fecha:** Octubre 2026  
**Regla:** Zero-Hallucination & Commercial Truth  

---

## 1. Matriz de Gobernanza de Datos Comerciales

| Campo | Valor Actual en Código | Fuente | ¿Verificado con Cliente? | Nivel de Confianza | ¿Apto para Producción? | Acción Requerida |
|---|---|---|---|---|---|---|
| **Razón / Marca** | LiderPro | Master Prompt | SÍ (Reglas de Marca) | 100% | SÍ | Mantener inalterable |
| **Slogan** | "Tu vehículo. Nuestra experiencia." | Master Prompt | SÍ (Texto Oficial) | 100% | SÍ | Mantener inalterable |
| **Propuesta** | "Encuentra el producto adecuado..." | Master Prompt | SÍ (Texto Oficial) | 100% | SÍ | Mantener inalterable |
| **Gobernanza Legal** | Operación independiente con enlace directo | Master Prompt | SÍ (Regla Crítica #1) | 100% | SÍ | Cero atribución de casa matriz |
| **Sede Pedernales** | Av. Principal / Punto Estratégico Manabí | Prompt Placeholder | PENDING VALIDATION | 80% | SÍ (Con Placeholder) | Cliente confirmará dirección física exacta |
| **Teléfono Pedernales** | `+593 99 999 9999` / `593999999999` | Placeholder Config | PENDING VALIDATION | Placeholder | REQUERIDO | Cliente debe ingresar número de WhatsApp activo |
| **Sede Quito** | Sector Estratégico Norte / Red Sierra | Prompt Placeholder | PENDING VALIDATION | 80% | SÍ (Con Placeholder) | Cliente confirmará dirección exacta en Quito |
| **Teléfono Quito** | `+593 99 888 8888` / `593998888888` | Placeholder Config | PENDING VALIDATION | Placeholder | REQUERIDO | Cliente debe ingresar número de WhatsApp activo |
| **SKU Batería NS60L** | `LP-BAT-NS60L-55` | Catálogo Estructurado | CONTROLADO | 95% | SÍ (Referencial) | Validar con código de fábrica de distribuidor |
| **Precio Batería NS60L**| `$74.00 (Referencial)` | Catálogo Estructurado | CONTROLADO | 90% | SÍ (Con Nota) | Nota explícita: precio referencial con chatarra |
| **Garantía Baterías** | 15 a 18 Meses | Master Prompt | SÍ (Estándar Industria) | 95% | SÍ | Mantener garantía técnica |
| **Promesa Logística** | "24–48 h*" con disclaimer | Master Prompt | SÍ (Texto Seguro #3) | 100% | SÍ | Asterisco y disclaimer visible en todas las páginas |
| **Multi-Origen** | "Seleccionamos la alternativa..." | Master Prompt | SÍ (Texto Seguro #16) | 100% | SÍ | Cero promesas automáticas falsas |

---

## 2. Política de Manejo de Placeholders

Para garantizar que el sistema no engañe al usuario ni invente datos:
1. Todos los precios exhiben la etiqueta `(Precio referencial con despacho)` o `(Consultar por modelo exacto)`.
2. Las direcciones físicas cuentan con el rótulo `(Punto Estratégico Autorizado / Coordinación previa)`.
3. Los números de teléfono y WhatsApp están centralizados en un único archivo (`src/data/businessConfig.ts`), lo que permite que el cliente reemplace los 9 dígitos en 30 segundos sin tocar el código fuente de los componentes.
