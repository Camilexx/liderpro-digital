import json

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    d = json.load(f)

print("=== ALL ITEMS IN INVENTORY CONTAINING 'BATER' ===")
for it in d['inventory_items']:
    name_u = it['name'].upper()
    if 'BATER' in name_u:
        print(f"{it['sku']:<18} | Cost: ${it['cost']:<6.2f} | Stock: {it['stock']:<3} | {it['name']}")
