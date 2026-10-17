import re
import os

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

chunks = text.split('"id":')[1:]

print(f"Total products in products.ts: {len(chunks)}")

best_sellers = []
for p in chunks:
    if '"isBestSeller": true' in p:
        sku = re.search(r'"sku":\s*"([^"]+)"', p)
        name = re.search(r'"name":\s*"([^"]+)"', p)
        brand = re.search(r'"brand":\s*"([^"]+)"', p)
        img = re.search(r'"imageUrl":\s*"([^"]+)"', p)
        best_sellers.append((sku.group(1), brand.group(1), name.group(1), img.group(1)))

print(f"\n=== Best Sellers (Total: {len(best_sellers)}) ===")
for b in best_sellers[:6]:
    fpath = os.path.join('public', b[3].lstrip('/'))
    exists = os.path.exists(fpath)
    print(f"SKU: {b[0]:<14} | Brand: {b[1]:<16} | Exists: {str(exists):<5} | Img: {b[3]:<35} | Name: {b[2]}")

print("\n=== First 8 Default Products on Home Page ===")
first_8 = chunks[:8]
for p in first_8:
    sku = re.search(r'"sku":\s*"([^"]+)"', p)
    name = re.search(r'"name":\s*"([^"]+)"', p)
    brand = re.search(r'"brand":\s*"([^"]+)"', p)
    img = re.search(r'"imageUrl":\s*"([^"]+)"', p)
    s = sku.group(1) if sku else ""
    b = brand.group(1) if brand else ""
    n = name.group(1) if name else ""
    i = img.group(1) if img else ""
    fpath = os.path.join('public', i.lstrip('/'))
    exists = os.path.exists(fpath)
    print(f"SKU: {s:<14} | Brand: {b:<16} | Exists: {str(exists):<5} | Img: {i:<35} | Name: {n}")
