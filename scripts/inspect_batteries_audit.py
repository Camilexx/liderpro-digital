import json
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    products = json.loads(re.search(r'export const PRODUCTS: Product\[\] = (\[.*\]);', f.read(), re.DOTALL).group(1))

bats = [p for p in products if p['category'] == 'baterias']
print(f"Total batteries: {len(bats)}")

non_battery_acc = []
for b in bats:
    if 'BATER' not in b['name'].upper():
        non_battery_acc.append(b)

print(f"Non-battery accessories in category baterias: {len(non_battery_acc)}")
for a in non_battery_acc:
    print(f"   * [{a['sku']}] '{a['name']}' -> Image: {a['imageUrl']}")

pure_bats = [b for b in bats if b not in non_battery_acc]
print(f"\nPure batteries: {len(pure_bats)}")
bosch_bats = [b for b in pure_bats if b['brand'] == 'BOSCH']
ecuador_bats = [b for b in pure_bats if b['brand'] == 'BATERÍAS ECUADOR']
print(f"   - Bosch batteries: {len(bosch_bats)}")
print(f"   - Baterías Ecuador batteries: {len(ecuador_bats)}")

# Check image uniformity
bosch_imgs = set(b['imageUrl'] for b in bosch_bats)
ecuador_imgs = set(b['imageUrl'] for b in ecuador_bats)
print(f"   - Bosch images used: {bosch_imgs}")
print(f"   - Baterías Ecuador images used: {ecuador_imgs}")

# Check if any battery has variants
bat_with_vars = [b for b in pure_bats if b.get('variants')]
print(f"   - Batteries with variants: {len(bat_with_vars)}")
