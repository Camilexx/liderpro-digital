import json
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    products = json.loads(re.search(r'export const PRODUCTS: Product\[\] = (\[.*\]);', f.read(), re.DOTALL).group(1))

print("=== CHECKING IF ANY VARIANT SKU ALSO APPEARS AS A STANDALONE PRODUCT ===")
all_variant_skus = {}
for p in products:
    if p.get('variants'):
        for v in p['variants']:
            all_variant_skus[v['sku'].upper()] = (p['sku'], p['name'])

primary_skus = {p['sku'].upper(): p for p in products}

collisions = []
for v_sku, (parent_sku, parent_name) in all_variant_skus.items():
    if v_sku in primary_skus:
        # If it's the parent product itself, that's expected because primary SKU is the first variant
        if v_sku != parent_sku.upper():
            collisions.append((v_sku, parent_sku, parent_name, primary_skus[v_sku]['name']))

print(f"Total non-parent collisions: {len(collisions)}")
for v_sku, parent_sku, parent_name, standalone_name in collisions:
    print(f"   Collision on SKU: {v_sku}")
    print(f"      Parent Product [{parent_sku}]: {parent_name}")
    print(f"      Standalone Product: {standalone_name}")
