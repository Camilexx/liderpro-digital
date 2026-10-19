import re
from collections import defaultdict

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Match products
raw_products = re.findall(r'\{\s*"id":\s*"([^"]+)",(.*?)\n  \}', content, re.DOTALL)

filters = []
filter_types = defaultdict(list)

for pid, body in raw_products:
    cat_m = re.search(r'"category":\s*"([^"]+)"', body)
    if cat_m and cat_m.group(1) == 'filtros':
        sku_m = re.search(r'"sku":\s*"([^"]+)"', body)
        name_m = re.search(r'"name":\s*"([^"]+)"', body)
        img_m = re.search(r'"imageUrl":\s*"([^"]+)"', body)
        
        sku = sku_m.group(1) if sku_m else 'unknown'
        name = name_m.group(1) if name_m else 'unknown'
        img = img_m.group(1) if img_m else 'unknown'
        
        name_lower = name.lower()
        if 'cabina' in name_lower or 'ac-' in sku.lower() or 'ac-' in name_lower:
            ftype = 'cabina'
        elif 'combustible' in name_lower or 'afp-' in sku.lower() or 'afe-' in sku.lower() or 'afs-' in sku.lower() or 'afk-' in sku.lower() or 'trampa' in name_lower or 'separador' in name_lower or 'afi-' in sku.lower():
            ftype = 'combustible'
        elif 'aceite' in name_lower or 'ao-' in sku.lower() or 'aoe-' in sku.lower():
            if 'aoe-' in sku.lower() or 'elemento' in name_lower or 'cartucho' in name_lower:
                ftype = 'aceite_elemento'
            elif 'sintetico' in name_lower or '15000' in name_lower or 'st' in sku.lower():
                ftype = 'aceite_sintetico'
            else:
                ftype = 'aceite_blindado'
        elif 'aire' in name_lower or 'aa-' in sku.lower() or 'aak-' in sku.lower():
            ftype = 'aire'
        else:
            ftype = 'otro_filtro'
            
        filters.append((sku, name, img, ftype))
        filter_types[ftype].append((sku, name, img))

print(f"Total filters in products.ts: {len(filters)}\n")
for ftype, items in sorted(filter_types.items()):
    print(f"--- {ftype.upper()} ({len(items)} products) ---")
    distinct_imgs = set(x[2] for x in items)
    print(f"  Distinct images: {len(distinct_imgs)}")
    for sku, name, img in items[:5]:
        print(f"    {sku:<18} | {img:<40} | {name[:40]}")
    if len(items) > 5:
        print(f"    ... and {len(items)-5} more")
    print()
