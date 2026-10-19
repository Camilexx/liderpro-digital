import json
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    products = json.loads(re.search(r'export const PRODUCTS: Product\[\] = (\[.*\]);', f.read(), re.DOTALL).group(1))

print("=== CHECKING FOR NEAR-DUPLICATE PRODUCT NAMES ===")
from collections import defaultdict
names_normalized = defaultdict(list)

for p in products:
    # normalize name: remove extra whitespace, punctuation, brand prefix
    norm = re.sub(r'[^a-zA-Z0-9]', '', p['name'].upper())
    # remove brand
    for b in ['MANNOL', 'AROIL', 'MOBIL', 'AMALIE', 'MOTUL', 'VALVOLINE', 'ADVANCE', 'ABRO', 'BOSCH', 'BATERIASECUADOR']:
        norm = norm.replace(b, '')
    names_normalized[norm].append(p)

near_dups = {k: v for k, v in names_normalized.items() if len(v) > 1 and len(k) > 5}
print(f"Total potential near-duplicate name groups: {len(near_dups)}")
for k, prods in near_dups.items():
    print(f"\nGroup '{k}':")
    for p in prods:
        print(f"   * [{p['sku']}] Cat: {p['category']:<12} | Brand: {p['brand']:<10} | Name: '{p['name']}'")

