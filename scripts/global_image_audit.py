import re
import os
import hashlib
from collections import defaultdict

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

raw_products = re.findall(r'\{\s*"id":\s*"([^"]+)",(.*?)\n  \}', content, re.DOTALL)

print(f"Total products found: {len(raw_products)}")

hash_to_products = defaultdict(list)
missing_images = []
category_stats = defaultdict(lambda: {'total': 0, 'distinct_hashes': set(), 'missing': 0})

for pid, body in raw_products:
    cat_m = re.search(r'"category":\s*"([^"]+)"', body)
    sku_m = re.search(r'"sku":\s*"([^"]+)"', body)
    name_m = re.search(r'"name":\s*"([^"]+)"', body)
    img_m = re.search(r'"imageUrl":\s*"([^"]+)"', body)
    
    cat = cat_m.group(1) if cat_m else 'unknown'
    sku = sku_m.group(1) if sku_m else 'unknown'
    name = name_m.group(1) if name_m else 'unknown'
    img = img_m.group(1) if img_m else 'unknown'
    
    category_stats[cat]['total'] += 1
    
    local_path = os.path.join('public', img.lstrip('/'))
    if not os.path.exists(local_path):
        missing_images.append((sku, name, cat, img))
        category_stats[cat]['missing'] += 1
    else:
        with open(local_path, 'rb') as f:
            h = hashlib.md5(f.read()).hexdigest()
        hash_to_products[h].append((sku, name, cat, img, os.path.getsize(local_path)))
        category_stats[cat]['distinct_hashes'].add(h)

print("\n--- CATEGORY AUDIT SUMMARY ---")
for cat, stats in sorted(category_stats.items()):
    print(f"{cat:<15}: {stats['total']:>3} products | {len(stats['distinct_hashes']):>3} distinct images | {stats['missing']:>2} missing")

print(f"\nMissing image files: {len(missing_images)}")
for sku, name, cat, img in missing_images:
    print(f"  [MISSING] {sku} ({cat}) -> {img}")

print("\n--- DETECTED DUPLICATE HASH GROUPS (where > 1 product share identical file content) ---")
duplicate_groups = {h: prods for h, prods in hash_to_products.items() if len(prods) > 1}
for h, prods in sorted(duplicate_groups.items(), key=lambda x: len(x[1]), reverse=True):
    print(f"\nHash: {h} (Size: {prods[0][4]} B) shared by {len(prods)} products:")
    for sku, name, cat, img, size in prods[:10]:
        print(f"   [{cat:<12}] {sku:<16} | {img:<42} | {name[:40]}")
    if len(prods) > 10:
        print(f"   ... and {len(prods) - 10} more")
