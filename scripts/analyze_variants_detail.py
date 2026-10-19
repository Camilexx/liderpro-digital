import json
import re

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

sheet_rows = full_data['sheet_rows']
inv_items = full_data['inventory_items']
inv_by_sku = {it['sku'].upper(): it for it in inv_items}

def get_matching_inventory(sheet_name, row):
    c1 = row['col1'].strip()
    c2 = row['col2'].strip()
    
    if c1 and c1.upper() in inv_by_sku:
        return [inv_by_sku[c1.upper()]]
        
    # Search by description
    tokens = [t for t in re.split(r'[\s\-\/\(\)\,]+', c2.upper()) if len(t) > 2]
    stop_words = {'LURICANTE', 'ACEITE', 'MOTOR', 'EXTRA', 'SUPER', 'PLUS', 'SEMI', 'SINTETICO', 'PARA', 'VIDA', 'UTIL', 'AOS', 'ANOS', 'LT', 'LTS', 'CJ'}
    keys = [t for t in tokens if t not in stop_words]
    
    matches = []
    for it in inv_items:
        it_name = it['name'].upper()
        if keys and all(k in it_name for k in keys[:3]):
            matches.append(it)
    return matches

for sname in ['LURICANTE MANNOL', 'LURICANTE MOBIL', 'LURICANTE AROIL', 'LURICANTE AMALIE', 'MANNOL', 'ABRO']:
    rows = sheet_rows[sname]
    print(f"\n=================== {sname} ===================")
    for r in rows:
        if not r['col1'] and not r['col2']: continue
        imgs = r['images']
        inv_matches = get_matching_inventory(sname, r)
        print(f"\nRow {r['row_num']:2d}: {r['col1']} | {r['col2'][:45]}")
        img_strs = [f"Col{img['col']}:{img['media_name']}" for img in imgs]
        print(f"  Images ({len(imgs)}): {img_strs}")
        print(f"  Inventory items found ({len(inv_matches)}):")
        for it in inv_matches:
            print(f"    - SKU: {it['sku']:<16} | Stock: {str(it['stock']):>3} | {it['name']}")
