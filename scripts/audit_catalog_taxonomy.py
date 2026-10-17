import re
import json

with open("src/data/products.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Locate export const PRODUCTS: Product[] = [ ... ];
start_idx = content.find("export const PRODUCTS: Product[] = [")
if start_idx == -1:
    start_idx = content.find("export const PRODUCTS = [")
    if start_idx == -1:
        # Search for PRODUCTS
        matches = [m.start() for m in re.finditer(r'PRODUCTS.*=\s*\[', content)]
        if matches:
            start_idx = matches[0]

print(f"Found PRODUCTS array around index {start_idx}")

# Parse individual product objects by regex or json-like block
# Each product has id, sku, slug, name, brand, category, applicationType...
pattern = re.compile(
    r'\{\s*"id":\s*"([^"]+)",\s*'
    r'"sku":\s*"([^"]+)",\s*'
    r'"slug":\s*"([^"]+)",\s*'
    r'"name":\s*"([^"]+)",\s*'
    r'"brand":\s*"([^"]+)",\s*'
    r'"category":\s*"([^"]+)",\s*'
    r'"applicationType":\s*"([^"]+)"',
    re.MULTILINE
)

products = []
for m in pattern.finditer(content):
    p = {
        "id": m.group(1),
        "sku": m.group(2),
        "slug": m.group(3),
        "name": m.group(4),
        "brand": m.group(5),
        "category": m.group(6),
        "applicationType": m.group(7),
    }
    products.append(p)

print(f"Total parsed products: {len(products)}")

# Analysis
categories = {}
app_types = {}
brands = {}

for p in products:
    cat = p["category"]
    categories[cat] = categories.get(cat, 0) + 1
    
    app = p["applicationType"]
    app_types[app] = app_types.get(app, 0) + 1
    
    b = p["brand"]
    brands[b] = brands.get(b, 0) + 1

print("\n--- Distribution by Category ---")
for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
    print(f"  {cat}: {count}")

print("\n--- Distribution by ApplicationType ---")
for app, count in sorted(app_types.items(), key=lambda x: x[1], reverse=True):
    print(f"  {app}: {count}")

print(f"\n--- Distribution by Brand ({len(brands)} brands) ---")
for b, count in sorted(brands.items(), key=lambda x: x[1], reverse=True):
    print(f"  {b}: {count}")

# Check for potential categorization anomalies
anomalies = []

for p in products:
    name_upper = p["name"].upper()
    cat = p["category"]
    app = p["applicationType"]
    sku = p["sku"]
    brand = p["brand"]

    # 1. Batteries check
    if ("BATERIA" in name_upper or "BATERÍA" in name_upper or "SHD" in name_upper or "HIGH POWER" in name_upper or "FULL EQUIPO" in name_upper) and "BORNE" not in name_upper and "TERMINAL" not in name_upper and "SOPORTE" not in name_upper:
        if cat != "baterias":
            anomalies.append((sku, p["name"], f"Name looks like battery, but category is '{cat}'"))

    # 2. Filters check
    if "FILTRO" in name_upper:
        if cat != "filtros":
            anomalies.append((sku, p["name"], f"Name contains FILTRO, but category is '{cat}'"))

    # 3. Coolants check
    if ("REFRIGERANTE" in name_upper or "COOLANT" in name_upper or "ANTICONGELANTE" in name_upper) and cat != "refrigerantes":
        anomalies.append((sku, p["name"], f"Name contains Coolant/Refrigerante, but category is '{cat}'"))

    # 4. Brakes check
    if ("FRENO" in name_upper or "DOT 3" in name_upper or "DOT 4" in name_upper or "DOT3" in name_upper or "DOT4" in name_upper) and cat != "frenos":
        anomalies.append((sku, p["name"], f"Name contains Brake/Freno/DOT, but category is '{cat}'"))

    # 5. Spark plugs check
    if ("BUJIA" in name_upper or "BUJÍA" in name_upper or "SPARK" in name_upper) and cat != "bujias":
        anomalies.append((sku, p["name"], f"Name contains Bujia/Spark, but category is '{cat}'"))

    # 6. Additives check
    if ("ADITIVO" in name_upper or "TRATAMIENTO" in name_upper or "OCTANE" in name_upper or "LIMPIADOR" in name_upper) and cat != "aditivos" and "FILTRO" not in name_upper:
        anomalies.append((sku, p["name"], f"Name contains Aditivo/Tratamiento, but category is '{cat}'"))

    # 7. Moto Application check
    if ("MOTO " in name_upper or "2T" in name_upper or "4T" in name_upper or "MOTUL MOTO" in name_upper) and app != "motos":
        anomalies.append((sku, p["name"], f"Name suggests Moto, but applicationType is '{app}'"))

    # 8. Heavy Application check
    if ("DELVAC" in name_upper or "31 SHD" in name_upper or "N150" in name_upper or "N200" in name_upper or "HINO" in name_upper or "ISUZU" in name_upper or "VALVODIESEL" in name_upper or "CAN 20" in name_upper or "TAMBOR" in name_upper or "55 GAL" in name_upper):
        if app not in ("pesado", "camionetas"):
            anomalies.append((sku, p["name"], f"Name suggests Heavy/Flotas, but applicationType is '{app}'"))

print(f"\n--- Potential Anomalies Found: {len(anomalies)} ---")
for sku, name, reason in anomalies[:30]:
    print(f"  [{sku}] {name[:50]}... -> {reason}")
