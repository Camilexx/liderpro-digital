import json
import os
import re

with open("src/data/products.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Extract the PRODUCTS array
# Find "export const PRODUCTS: Product[] = ["
start_idx = content.find("export const PRODUCTS")
if start_idx == -1:
    print("Could not find PRODUCTS export")
    exit(1)

# Find each product block by searching for "id": "p-..."
skus = re.findall(r'"sku":\s*"([^"]+)"', content)
print(f"Total SKUs in file: {len(skus)}")

# For every sku, let's find category and imageUrl
battery_count = 0
missing_images = []
battery_skus = []

for sku in skus:
    sku_pos = content.find(f'"sku": "{sku}"')
    if sku_pos == -1:
        sku_pos = content.find(f'"sku": \'{sku}\'')
    if sku_pos == -1:
        continue
    
    # Slice the product object (next 3000 characters)
    chunk = content[sku_pos:sku_pos+3500]
    
    # Check category
    cat_m = re.search(r'"category":\s*"([^"]+)"', chunk)
    if cat_m and cat_m.group(1) == "baterias":
        battery_count += 1
        img_m = re.search(r'"imageUrl":\s*"([^"]+)"', chunk)
        name_m = re.search(r'"name":\s*"([^"]+)"', chunk)
        img_url = img_m.group(1) if img_m else "NONE"
        name = name_m.group(1) if name_m else sku
        
        rel_path = os.path.join("public", img_url.lstrip("/"))
        exists = os.path.exists(rel_path)
        size_kb = (os.path.getsize(rel_path) // 1024) if exists else 0
        
        battery_skus.append((sku, name, img_url, exists, size_kb))
        if not exists:
            missing_images.append((sku, img_url))

print(f"\n==========================================")
print(f"TOTAL BATTERY PRODUCTS FOUND: {battery_count}")
print(f"==========================================")
for sku, name, img_url, exists, size_kb in battery_skus:
    status = f"OK ({size_kb} KB)" if exists else "MISSING"
    print(f"SKU: {sku:<16} | {status:<12} | {img_url:<40} | {name[:45]}")

if missing_images:
    print(f"\nCRITICAL: {len(missing_images)} missing image files!")
    for s, i in missing_images:
        print(f"  {s}: {i}")
else:
    print(f"\nSUCCESS: All {battery_count} battery products have valid physical image files in public/images/products/!")
