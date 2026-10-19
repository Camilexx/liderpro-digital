import json

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

with open('scripts/matched_catalog_initial.json', encoding='utf-8') as f:
    match_data = json.load(f)

inv_items = full_data['inventory_items']
covered_skus = set(match_data['covered_skus'])

uncovered = [it for it in inv_items if it['sku'].upper() not in covered_skus]

print(f"Total uncovered inventory items: {len(uncovered)}")

# Group uncovered by category/brand
groups = {}
for it in uncovered:
    name = it['name'].upper()
    cat = 'OTROS'
    if 'BATERIA' in name or 'BATERA' in name:
        cat = 'BATERIAS'
    elif 'TERMINAL' in name or 'SOPORTE DE BATERIA' in name or 'ECOVALOR' in name:
        cat = 'ACCESORIOS BATERIAS'
    elif 'PLUMA' in name:
        cat = 'PLUMAS / LIMPIAPARABRISAS'
    elif 'FOCO' in name or 'LAMPARA' in name:
        cat = 'ILUMINACION / FOCOS'
    elif 'PASTILLA' in name or 'FRENO' in name:
        cat = 'FRENOS'
    elif 'BUJIA' in name:
        cat = 'BUJIAS'
    elif 'FILTRO' in name:
        cat = 'FILTROS SIN FOTO'
    elif any(b in name for b in ['MANNOL', 'MOBIL', 'AROIL', 'AMALIE', 'MOTUL', 'VALVOLINE', 'CASTROL', 'HAVOLINE', 'CHEVRON']):
        cat = 'LUBRICANTES SIN FOTO'
    elif any(b in name for b in ['ABRO', 'SIMONIZ', 'WD-40', 'AREON']):
        cat = 'QUIMICOS/PERFUMES SIN FOTO'
    
    groups.setdefault(cat, []).append(it)

for cat, items in sorted(groups.items(), key=lambda x: -len(x[1])):
    print(f"\n=== {cat} ({len(items)} items) ===")
    for it in items[:8]:
        print(f"  {it['sku']:<18} | Stk: {it['stock']:>2} | {it['name']}")
    if len(items) > 8:
        print(f"  ... and {len(items)-8} more")
