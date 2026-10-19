import json
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    products = json.loads(re.search(r'export const PRODUCTS: Product\[\] = (\[.*\]);', f.read(), re.DOTALL).group(1))

with_vars = [p for p in products if p.get('variants')]
print(f"Count of products with variants: {len(with_vars)}")
for i, p in enumerate(with_vars, 1):
    skus = [v['sku'] for v in p['variants']]
    names = [v['name'] for v in p['variants']]
    press = [v['presentation'] for v in p['variants']]
    print(f"\n{i}. [{p['sku']}] {p['name']} ({len(skus)} variants)")
    for s, n, pr in zip(skus, names, press):
        print(f"     * {s:<18} | {pr:<28} | {n}")
