import json

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    d = json.load(f)

print("=== ALL LUBRICANT ITEMS IN INVENTORY ===")
for it in d['inventory_items']:
    name_u = it['name'].upper()
    if any(b in name_u for b in ['MOBIL', 'AROIL', 'AMALIE', 'MOTUL', 'VALVOLINE']):
        print(f"{it['sku']:<18} | Cost: ${it['cost']:<6.2f} | Stock: {it['stock']:<3} | {it['name']}")
