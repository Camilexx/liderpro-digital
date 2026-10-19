import json

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    d = json.load(f)

print("=== ALL MANNOL ITEMS IN INVENTORY WITH PACKAGING ===")
for it in d['inventory_items']:
    if 'MANNOL' in it['name'].upper() and any(w in it['name'].upper() for w in ['20/1', '20 LT', '20LT', '10 LT', '5LT', '4/1', '12/1', '24 UND', '450 ML', '250ML', '100ML', '800', '4.5', '18 KG']):
        print(f"{it['sku']:<18} | Cost: ${it['cost']:<6.2f} | Stock: {it['stock']:<3} | {it['name']}")
