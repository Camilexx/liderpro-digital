import json
import re

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

inv_items = full_data['inventory_items']

def format_clean_badge(pres_name):
    # Standardize short badges for cards
    if 'Caneca (20 Litros)' in pres_name:
        return 'Caneca 20L', 20.0
    if 'Caneca (5 Galones / 19L)' in pres_name:
        return 'Caneca 5 GL', 19.0
    if 'Media Caneca (2.5 Gal)' in pres_name:
        return 'Caneca 2.5 GL', 9.5
    if 'Caneca (10 Litros)' in pres_name:
        return 'Caneca 10L', 10.0
    if 'Bidón (5 Litros)' in pres_name:
        return 'Bidón 5L', 5.0
    if '1 Galón' in pres_name:
        return '1 Galón', 3.78
    if '1 Litro' in pres_name:
        return '1 Litro', 1.0
    if '1 Cuarto' in pres_name:
        return '1 Cuarto', 0.946
    if '16-18 kg' in pres_name or '18 KG' in pres_name:
        return 'Caneca 18 kg', 18.0
    if '4.5 kg' in pres_name:
        return '4.5 kg', 4.5
    if '800 g' in pres_name:
        return '800 g', 0.8
    if '400 g' in pres_name:
        return '400 g', 0.4
    if '230 g' in pres_name:
        return '230 g', 0.23
    if '85 g' in pres_name:
        return 'Tubo 85 g', 0.085
    if 'Libra' in pres_name:
        return '1 Libra', 0.45
    if '650 ml' in pres_name:
        return 'Spray 650 ml', 0.65
    if '520 ml' in pres_name:
        return '520 ml', 0.52
    if '500 ml' in pres_name:
        return '500 ml', 0.5
    if '450 ml' in pres_name:
        return '450 ml', 0.45
    if '400 ml' in pres_name:
        return '400 ml', 0.4
    if '350 ml' in pres_name:
        return '350 ml', 0.35
    if '300 ml' in pres_name:
        return '300 ml', 0.3
    if '250 ml' in pres_name:
        return '250 ml', 0.25
    if '200 ml' in pres_name:
        return '200 ml', 0.2
    if '100 ml' in pres_name:
        return '100 ml', 0.1
    if '10 ml' in pres_name:
        return 'Gotero 10 ml', 0.01
    if '10 oz' in pres_name:
        return '10 oz', 0.3
    return pres_name, 1.0

# If a product has 4 variants, pick the top 3 standard presentations
def cap_variants_to_3(item_variants):
    if len(item_variants) <= 3:
        return item_variants
    # If 4 variants, e.g. [1L, 1GL, 2.5GL, 5GL], pick [1L, 1GL, 5GL]
    # or [1L, 5L, 10L, 20L], pick [1L, 5L, 20L]
    first = item_variants[0] # smallest (usually 1L)
    last = item_variants[-1] # largest (usually 5GL or 20L)
    # pick the middle one that is 1 Galón or 5 Litros
    middle = None
    for v in item_variants[1:-1]:
        if 'Galón' in v['presentation'] or '5L' in v['presentation']:
            middle = v
            break
    if not middle:
        middle = item_variants[1]
    return [first, middle, last]

print("Test cap_variants_to_3 ready.")
