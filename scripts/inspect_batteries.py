import re
import os

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Match each object in PRODUCTS
# Products start with { and have "id": "p-...
# Let's find each product using regex that matches balanced or bounded blocks
raw_products = re.findall(r'\{\s*"id":\s*"([^"]+)",(.*?)\n  \}', content, re.DOTALL)

print(f"Total products parsed: {len(raw_products)}")

battery_products = []
for pid, body in raw_products:
    cat_m = re.search(r'"category":\s*"([^"]+)"', body)
    if cat_m and cat_m.group(1) == 'baterias':
        sku_m = re.search(r'"sku":\s*"([^"]+)"', body)
        name_m = re.search(r'"name":\s*"([^"]+)"', body)
        brand_m = re.search(r'"brand":\s*"([^"]+)"', body)
        img_m = re.search(r'"imageUrl":\s*"([^"]+)"', body)
        
        sku = sku_m.group(1) if sku_m else 'N/A'
        name = name_m.group(1) if name_m else 'N/A'
        brand = brand_m.group(1) if brand_m else 'N/A'
        img = img_m.group(1) if img_m else 'N/A'
        battery_products.append({
            'id': pid,
            'sku': sku,
            'name': name,
            'brand': brand,
            'img': img
        })

print(f"Total battery products: {len(battery_products)}\n")
for b in battery_products:
    full_path = os.path.join('public', b['img'].lstrip('/'))
    exists = os.path.exists(full_path)
    size = os.path.getsize(full_path) if exists else 0
    print(f"{b['sku']:<16} | {b['brand']:<18} | {size:>7} B | {b['img']:<40} | {b['name'][:35]}")
