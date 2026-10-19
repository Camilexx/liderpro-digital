import json
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'export const PRODUCTS: Product\[\] = (\[.*\]);', content, re.DOTALL)
if not match:
    print("Could not find PRODUCTS array")
    exit(1)

products = json.loads(match.group(1))
print(f"Total products in catalog: {len(products)}")

print("\n=== TOP 25 PRODUCTS WITH MOST VARIANTS ===")
sorted_by_vars = sorted(products, key=lambda p: len(p.get('variants') or []), reverse=True)
for p in sorted_by_vars[:25]:
    v_count = len(p.get('variants') or [])
    if v_count > 1:
        print(f"\nSKU: {p['sku']} | Name: {p['name']} | Total Variants: {v_count}")
        for v in (p.get('variants') or [])[:8]:
            print(f"    -> SKU: {v['sku']:<16} | Pres: {v['presentation']:<22} | {v['name']}")
        if v_count > 8:
            print(f"    ... and {v_count - 8} more variants!")

print("\n=== CHECKING FOR DUPLICATE SKUS IN PRODUCTS ===")
skus = [p['sku'] for p in products]
seen = set()
dups = set()
for s in skus:
    if s in seen:
        dups.add(s)
    seen.add(s)
print(f"Duplicate primary SKUs ({len(dups)}): {dups}")

print("\n=== CHECKING FOR DUPLICATE SLUGS IN PRODUCTS ===")
slugs = [p['slug'] for p in products]
seen_slugs = set()
dup_slugs = set()
for s in slugs:
    if s in seen_slugs:
        dup_slugs.add(s)
    seen_slugs.add(s)
print(f"Duplicate slugs ({len(dup_slugs)}): {dup_slugs}")

print("\n=== CHECKING FOR DUPLICATE NAMES IN PRODUCTS ===")
names = [p['name'] for p in products]
seen_names = {}
dup_names = set()
for s in names:
    if s in seen_names:
        dup_names.add(s)
    seen_names[s] = seen_names.get(s, 0) + 1
print(f"Duplicate names ({len(dup_names)}):")
for n in list(dup_names)[:10]:
    print(f"   '{n}' appears {seen_names[n]} times")
