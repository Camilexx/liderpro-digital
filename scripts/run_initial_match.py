import json
import re
import difflib

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    data = json.load(f)

inv_items = data['inventory_items']
sheet_rows = data['sheet_rows']

# Index inventory by SKU and by normalized name
inv_by_sku = {it['sku'].upper(): it for it in inv_items}

def clean_name(s):
    s = s.upper()
    s = re.sub(r'[\"\t\r\n]', ' ', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

# Create a mapping of sheet row -> inventory item(s)
matched_catalog = []
unmatched_sheet_rows = []

for sheet_name, rows in sheet_rows.items():
    print(f"\n--- Processing Sheet: {sheet_name} ---")
    for r in rows:
        c1 = r['col1'].strip()
        c2 = r['col2'].strip()
        imgs = r['images']
        
        if not c1 and not c2 and not imgs:
            continue
            
        row_num = r['row_num']
        
        # Strategy A: exact SKU match via Col 1
        matched_items = []
        if c1 and c1.upper() in inv_by_sku:
            matched_items.append(inv_by_sku[c1.upper()])
        
        # Strategy B: Clean Col 1 SKU (sometimes trailing or leading spaces or dash variations)
        if not matched_items and c1:
            clean_c1 = re.sub(r'[^A-Z0-9]', '', c1.upper())
            for sku, it in inv_by_sku.items():
                if re.sub(r'[^A-Z0-9]', '', sku) == clean_c1:
                    matched_items.append(it)
                    break
        
        # Strategy C: Exact or fuzzy match on Col 2 description
        if not matched_items and c2:
            clean_c2 = clean_name(c2)
            # Try exact name match
            for it in inv_items:
                if clean_name(it['name']) == clean_c2:
                    matched_items.append(it)
                    break
            
            # If not exact, try finding all inventory items that share the base product
            if not matched_items:
                # For lubricants / coolants / chemicals: find all presentation sizes of this product!
                # e.g. "MANNOL REFRIGERANTE AZUL VIDA UTIL 3 AÑOS" -> find 012MN4011-1, 012MN4011-5, 012MN4011-20
                c2_tokens = [w for w in re.split(r'[\s\-\/\(\)\,\.]+', clean_c2) if len(w) >= 3]
                stop_words = {'LURICANTE', 'ACEITE', 'MOTOR', 'PARA', 'VIDA', 'UTIL', 'AOS', 'ANOS', 'PLUS', 'SEMI', 'SINTETICO', 'SUPER', 'ADVANCE', 'FILTRO'}
                key_tokens = [w for w in c2_tokens if w not in stop_words]
                
                candidate_matches = []
                for it in inv_items:
                    it_name = clean_name(it['name'])
                    # Check token coverage
                    if key_tokens and all(k in it_name for k in key_tokens[:3]):
                        candidate_matches.append(it)
                
                # Check for high quality matches
                if candidate_matches:
                    # If this is a filter sheet, pick the best single match
                    if 'FILTRO' in sheet_name.upper():
                        # Pick best string similarity
                        best = max(candidate_matches, key=lambda it: difflib.SequenceMatcher(None, clean_c2, clean_name(it['name'])).ratio())
                        matched_items.append(best)
                    else:
                        # For oils / chemicals, all matching size variants belong to this product!
                        matched_items = candidate_matches

        if matched_items:
            matched_catalog.append({
                'sheet': sheet_name,
                'row_num': row_num,
                'col1': c1,
                'col2': c2,
                'images': imgs,
                'inventory_matches': matched_items
            })
        else:
            unmatched_sheet_rows.append({
                'sheet': sheet_name,
                'row_num': row_num,
                'col1': c1,
                'col2': c2,
                'images': imgs
            })

print(f"\nTotal matched rows from sheets: {len(matched_catalog)}")
print(f"Total unmatched rows from sheets: {len(unmatched_sheet_rows)}")

# Check which inventory items are covered by matched_catalog
covered_skus = set()
for m in matched_catalog:
    for it in m['inventory_matches']:
        covered_skus.add(it['sku'].upper())

print(f"Total distinct inventory SKUs covered by sheets: {len(covered_skus)} of {len(inv_items)}")

# Save to json
with open('scripts/matched_catalog_initial.json', 'w', encoding='utf-8') as f:
    json.dump({
        'matched_catalog': matched_catalog,
        'unmatched_sheet_rows': unmatched_sheet_rows,
        'covered_skus': list(covered_skus)
    }, f, indent=2, ensure_ascii=False)
