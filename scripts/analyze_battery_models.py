import re
import json

with open("src/data/products.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Find all battery products
matches = [m.start() for m in re.finditer(r'"category":\s*"baterias"', text)]

batteries = []
for pos in matches:
    start_pos = pos
    while start_pos > 0:
        if text[start_pos:start_pos+4] == "\n  {":
            start_pos += 3
            break
        start_pos -= 1
    
    curr = start_pos
    depth = 0
    end_pos = start_pos
    while curr < len(text):
        if text[curr] == '{': depth += 1
        elif text[curr] == '}':
            depth -= 1
            if depth == 0:
                end_pos = curr + 1
                break
        curr += 1
    
    block = text[start_pos:end_pos]
    
    def get_f(fld):
        m = re.search(rf'"{fld}":\s*"([^"]+)"', block)
        return m.group(1) if m else ""

    sku = get_f("sku")
    name = get_f("name")
    brand = get_f("brand")
    img = get_f("imageUrl")
    plates = get_f("plates")
    
    # Filter out accessories
    if "TERMINAL" in name or "SOPORTE" in name or "RECICLAJE" in name:
        continue
        
    batteries.append({
        "sku": sku,
        "name": name,
        "brand": brand,
        "plates": plates,
        "imageUrl": img
    })

print(f"Total actual battery units: {len(batteries)}")

# Group by brand
bosch = [b for b in batteries if "Bosch" in b["brand"]]
ecuador = [b for b in batteries if "Ecuador" in b["brand"]]

print(f"\n--- BOSCH BATTERIES ({len(bosch)}) ---")
for b in bosch:
    print(f"SKU: {b['sku']:<16} | {b['name']}")

print(f"\n--- BATERIAS ECUADOR ({len(ecuador)}) ---")
for b in ecuador:
    print(f"SKU: {b['sku']:<16} | {b['name']}")
