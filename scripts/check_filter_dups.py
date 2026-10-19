import json

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

inv_items = full_data['inventory_items']
inv_by_name = {it['name'].strip(): it for it in inv_items}
sheet_rows = full_data['sheet_rows']

for sname in ['FILTROS AIRE', 'FILTROS ACEITE', 'FILTROS CABINA', 'FILTROS COMBUSTIBLE']:
    rows = sheet_rows[sname]
    skus_seen = {}
    for r in rows:
        c1 = r['col1'].strip()
        c2 = r['col2'].strip()
        # Find matching inventory item
        matched_sku = None
        if c1:
            for it in inv_items:
                if c1.upper() == it['sku'].upper():
                    matched_sku = it['sku']
                    break
        if not matched_sku and c2:
            for it in inv_items:
                if c2.upper() == it['name'].upper():
                    matched_sku = it['sku']
                    break
        if not matched_sku and c2:
            # Try finding by exact text inside
            for it in inv_items:
                if c2.upper() in it['name'].upper() or it['name'].upper() in c2.upper():
                    matched_sku = it['sku']
                    break
        if matched_sku:
            skus_seen.setdefault(matched_sku, []).append((r['row_num'], c1, c2[:40]))
            
    print(f"\n--- {sname} Duplicate Matches ---")
    dups = {k: v for k, v in skus_seen.items() if len(v) > 1}
    for k, v in dups.items():
        print(f"SKU {k} matched multiple rows: {v}")
