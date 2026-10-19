import json

with open('scripts/all_remaining_filters_map.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for cat, items in data.items():
    for item in items:
        if not item.get('hero_img'):
            print(f"Missing hero: [{cat}] Row {item['row']} | {item['sku']} | {item['name']}")
