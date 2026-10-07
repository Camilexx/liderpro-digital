# LIDERPRO DIGITAL — VEHICLE COMPATIBILITY AUDIT
**Auditoría:** Forensic Production Audit V4.0  
**Fecha:** Octubre 2026  
**Regla:** Zero-Compatibility Hallucination  

---

## 1. Integridad del Dataset de Vehículos (`src/data/vehicles.ts`)

La base de datos contiene exclusivamente vehículos de alta penetración en el mercado ecuatoriano con tolerancias mecánicas comprobadas:

| Marca | Modelo | Años Soportados | Motores Verificados | SKUs Asignados en Catálogo | Estado de Validación |
|---|---|---|---|---|---|
| **Chevrolet** | Sail | 2012–2022 | 1.4L / 1.5L Gasolina | Batería `LP-BAT-NS60L-55`<br>Aceite `LP-LUB-5W30-SYN`<br>Filtro `LP-FIL-ACE-CS101`<br>Coolant `LP-REF-OAT-5050`<br>Freno `LP-FRE-CER-044` | **Verificado OEM** (Parque ecuatoriano masivo) |
| **Chevrolet** | Tracker Turbo | 2020–2024 | 1.2L Turbo | Batería `LP-BAT-DIN66-660`<br>Aceite `LP-LUB-5W30-SYN`<br>Coolant `LP-REF-OAT-5050` | **Verificado OEM** (Demanda DIN66 baja) |
| **Chevrolet** | D-Max | 2010–2022 | 2.5L / 3.0L Diésel | Aceite `LP-LUB-15W40-DIESEL`<br>Coolant `LP-REF-OAT-5050` | **Verificado OEM** (Flotas diésel) |
| **Chevrolet** | Aveo Family | 2008–2018 | 1.5L 8V | Batería `LP-BAT-NS60L-55`<br>Filtro `LP-FIL-ACE-CS101`<br>Coolant `LP-REF-OAT-5050` | **Verificado OEM** |
| **Toyota** | Yaris | 2008–2022 | 1.3L / 1.5L | Batería `LP-BAT-NS60L-55`<br>Aceite `LP-LUB-5W30-SYN` | **Verificado OEM** |
| **Toyota** | Hilux | 2006–2022 | 2.5L / 2.8L Diésel | Aceite `LP-LUB-15W40-DIESEL`<br>Coolant `LP-REF-OAT-5050` | **Verificado OEM** |
| **Kia** | Rio | 2012–2021 | 1.4L / 1.6L | Batería `LP-BAT-NS60L-55`<br>Aceite `LP-LUB-5W30-SYN`<br>Filtro `LP-FIL-ACE-CS101` | **Verificado OEM** |
| **Kia** | Sportage Active | 2009–2020 | 2.0L Gasolina | Batería `LP-BAT-DIN66-660`<br>Freno `LP-FRE-CER-044` | **Verificado OEM** |
| **Hyundai** | Tucson | 2010–2020 | 2.0L Gasolina | Batería `LP-BAT-DIN66-660`<br>Freno `LP-FRE-CER-044` | **Verificado OEM** |
| **Renault** | Duster | 2013–2023 | 1.6L / 2.0L | Batería `LP-BAT-DIN66-660`<br>Freno `LP-FRE-CER-044` | **Verificado OEM** |
| **Nissan** | Tiida | 2007–2017 | 1.6L / 1.8L | Batería `LP-BAT-NS60L-55`<br>Aceite `LP-LUB-5W30-SYN` | **Verificado OEM** |

---

## 2. Comportamiento Ante Casos No Encontrados (Zero-Hallucination)

Cuando un usuario selecciona un vehículo o necesidad sin SKU exacto cargado:
1. El componente `VehicleFinder` **no genera productos falsos ni aproxima tolerancias**.
2. Despliega la tarjeta de honestidad técnica:  
   *"No encontramos una coincidencia automática exacta para [Vehículo]. Para evitar darte una especificación incorrecta, un asesor técnico de LiderPro verificará el manual directamente."*
3. Ofrece el botón de acción inmediata: `CONFIRMAR POR WHATSAPP` con todos los parámetros seleccionados precargados en el mensaje.
