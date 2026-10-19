import json
import re
import os

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'export const PRODUCTS: Product\[\] = (\[.*\]);', content, re.DOTALL)
if not match:
    print("Could not find PRODUCTS in src/data/products.ts")
    exit(1)

products = json.loads(match.group(1))

print("=================================================================")
print(f"TOTAL PRODUCTS IN CATALOG: {len(products)}")
print("=================================================================")

# 1. Check duplicate SKUs
sku_counts = {}
for p in products:
    sku_counts[p['sku']] = sku_counts.get(p['sku'], 0) + 1
dup_skus = {k: v for k, v in sku_counts.items() if v > 1}
print(f"\n1. DUPLICATE PRIMARY SKUS: {len(dup_skus)}")
for k, v in dup_skus.items():
    print(f"   Duplicate SKU: {k} (appears {v} times)")

# 2. Check duplicate slugs
slug_counts = {}
for p in products:
    slug_counts[p['slug']] = slug_counts.get(p['slug'], 0) + 1
dup_slugs = {k: v for k, v in slug_counts.items() if v > 1}
print(f"\n2. DUPLICATE SLUGS: {len(dup_slugs)}")
for k, v in dup_slugs.items():
    print(f"   Duplicate Slug: {k} (appears {v} times)")

# 3. Check duplicate names
name_counts = {}
for p in products:
    name_counts[p['name']] = name_counts.get(p['name'], 0) + 1
dup_names = {k: v for k, v in name_counts.items() if v > 1}
print(f"\n3. DUPLICATE PRODUCT NAMES: {len(dup_names)}")
for k, v in dup_names.items():
    print(f"   Duplicate Name: {k} (appears {v} times)")

# 4. Check all products with variants
products_with_variants = [p for p in products if p.get('variants')]
print(f"\n4. PRODUCTS WITH VARIANTS: {len(products_with_variants)}")
for p in products_with_variants:
    v_list = p['variants']
    print(f"\nProduct [{p['sku']}] '{p['name']}' (Cat: {p['category']}, Brand: {p['brand']}) -> {len(v_list)} variants:")
    for v in v_list:
        print(f"   - SKU: {v['sku']:<18} | Pres: {v['presentation']:<28} | Name: {v['name']}")

# 5. Check missing image files on disk
missing_images = []
for p in products:
    img = p['imageUrl']
    disk_path = os.path.join('public', img.lstrip('/'))
    if not os.path.exists(disk_path):
        missing_images.append((p['sku'], p['name'], img))
    if p.get('variants'):
        for v in p['variants']:
            v_img = v['imageUrl']
            v_disk_path = os.path.join('public', v_img.lstrip('/'))
            if not os.path.exists(v_disk_path):
                missing_images.append((v['sku'], v['name'], v_img))

print(f"\n5. MISSING IMAGES ON DISK: {len(missing_images)}")
for sku, name, img in missing_images[:10]:
    print(f"   Missing: SKU {sku} -> {img}")

# 6. Check battery image uniformity
batteries = [p for p in products if p['category'] == 'baterias']
print(f"\n6. BATTERIES AUDIT: {len(batteries)} total")
bat_images = {}
for b in batteries:
    bat_images.setdefault(b['imageUrl'], []).append(b['name'])
for img, names in bat_images.items():
    print(f"   Image '{img}': {len(names)} items")

