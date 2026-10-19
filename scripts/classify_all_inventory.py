import json

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    d = json.load(f)

inv_items = d['inventory_items']
print(f"Total inventory items: {len(inv_items)}")

# Check items that should NOT be in catalog without photo
categories = {}
for it in inv_items:
    name = it['name']
    name_u = name.upper()
    sku = it['sku']
    
    # Check if battery
    is_battery = False
    if name_u.startswith('BATERIA BOSCH') or name_u.startswith('BATERIA ECUADOR'):
        is_battery = True
    elif 'BATERIA' in name_u and not any(w in name_u for w in ['TERMINAL', 'SOPORTE', 'ECOVALOR']):
        is_battery = True
        
    if is_battery:
        categories.setdefault('Baterías Reales', []).append(it)
    elif 'TERMINAL BATERIA' in name_u or 'BORNE' in name_u:
        categories.setdefault('Terminales / Bornes', []).append(it)
    elif 'SOPORTE DE BATERIA' in name_u:
        categories.setdefault('Soportes Batería', []).append(it)
    elif 'ECOVALOR' in name_u or 'ECOVL' in sku:
        categories.setdefault('Rubros Administrativos Eco-Valor', []).append(it)
    elif 'PLUMA' in name_u:
        categories.setdefault('Plumas Limpiaparabrisas', []).append(it)
    elif 'BUJIA' in name_u:
        categories.setdefault('Bujías', []).append(it)
    elif 'FOCO' in name_u:
        categories.setdefault('Focos Automotrices', []).append(it)
    elif 'LIQUIDO' in name_u or 'FRENO' in name_u or 'ATE' in name_u:
        categories.setdefault('Líquidos de Freno', []).append(it)
    elif 'BARDAHL' in name_u:
        categories.setdefault('Bardahl', []).append(it)
    elif 'FILTRO' in name_u:
        categories.setdefault('Filtros', []).append(it)
    elif any(l in name_u for l in ['MANNOL', 'AROIL', 'MOBIL', 'AMALIE', 'MOTUL', 'VALVOLINE']):
        categories.setdefault('Lubricantes & Químicos de Marca', []).append(it)
    elif 'ABRO' in name_u:
        categories.setdefault('Abro', []).append(it)
    elif any(s in name_u for s in ['SIMONIZ', 'AREON']):
        categories.setdefault('Perfumes & Cosmética', []).append(it)
    else:
        categories.setdefault('Otros / Varios', []).append(it)

for cat, items in sorted(categories.items(), key=lambda x: -len(x[1])):
    print(f"\nCategory: {cat} ({len(items)} items)")
    for it in items[:5]:
        print(f"   * [{it['sku']:<18}] Stock: {it['stock']:<3} | {it['name']}")
    if len(items) > 5:
        print(f"   ... and {len(items)-5} more")

