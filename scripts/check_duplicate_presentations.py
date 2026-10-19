import json
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    products = json.loads(re.search(r'export const PRODUCTS: Product\[\] = (\[.*\]);', f.read(), re.DOTALL).group(1))

print("=== CHECKING PRODUCTS WITH DUPLICATE PRESENTATIONS IN VARIANTS ===")
dup_pres_prods = []
for p in products:
    vars = p.get('variants')
    if vars:
        press = [v['presentation'] for v in vars]
        if len(press) != len(set(press)):
            print(f"\nProduct [{p['sku']}] '{p['name']}' has duplicate presentations:")
            for v in vars:
                print(f"   * SKU: {v['sku']:<18} | Pres: {v['presentation']:<25} | Name: {v['name']}")
            dup_pres_prods.append(p)

print(f"\nTotal products with duplicate presentations: {len(dup_pres_prods)}")
