import json
import re
import sys
sys.path.append('scripts')
import build_refined_catalog as brc

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

sheet_rows = full_data['sheet_rows']
inv_items = full_data['inventory_items']

print("Auditing all rows where get_strict_matches returns > 1 items...")
suspicious_groupings = []

for sheet_name, rows in sheet_rows.items():
    for r in rows:
        c1 = r['col1'].strip()
        c2 = r['col2'].strip()
        if not c1 and not c2: continue
        matches = brc.get_strict_matches(sheet_name, r)
        if len(matches) > 1:
            skus = [it['sku'] for it in matches]
            names = [it['name'] for it in matches]
            print(f"\nSheet [{sheet_name}] Row {r['row_num']}: '{c2}' -> {len(matches)} matches:")
            for s, n in zip(skus, names):
                print(f"    * {s:<18} | {n}")
            
            # Check if names are actually the same product
            suspicious = False
            for w in ['APPLE', 'VAINILLA', 'RADIADOR', 'CAJA', 'GASOLINA', 'DIESEL', 'AUTOM', 'MANUAL']:
                has_w = [w in n.upper() for n in names]
                if any(has_w) and not all(has_w):
                    suspicious = True
            if suspicious:
                print("    >>> SUSPICIOUS MISMATCH FOUND! <<<")
                suspicious_groupings.append((sheet_name, c2, skus, names))

print(f"\nTotal suspicious groupings: {len(suspicious_groupings)}")
