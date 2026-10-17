import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

chunks = text.split('"id":')[1:]

products = []
for p in chunks:
    sku = re.search(r'"sku":\s*"([^"]+)"', p)
    name = re.search(r'"name":\s*"([^"]+)"', p)
    brand = re.search(r'"brand":\s*"([^"]+)"', p)
    cat = re.search(r'"category":\s*"([^"]+)"', p)
    app = re.search(r'"applicationType":\s*"([^"]+)"', p)
    img = re.search(r'"imageUrl":\s*"([^"]+)"', p)
    bestseller = '"isBestSeller": true' in p
    products.append({
        'sku': sku.group(1) if sku else '',
        'name': name.group(1) if name else '',
        'brand': brand.group(1) if brand else '',
        'cat': cat.group(1) if cat else '',
        'app': app.group(1) if app else '',
        'img': img.group(1) if img else '',
        'bestseller': bestseller
    })

print(f"Loaded {len(products)} products.")

print("\n--- Top Battery Candidates ---")
for p in products:
    if p['cat'] == 'baterias' and any(k in p['sku'] for k in ['03024-HP', '42HPS4', '03027-HP', '02724HPS4', '03031-SHD']):
        print(f"SKU: {p['sku']:<15} | Brand: {p['brand']:<18} | Name: {p['name']}")

print("\n--- Top Lubricant Candidates ---")
for p in products:
    if p['cat'] == 'lubricantes' and any(k in p['sku'] for k in ['01001012', '01098960', '012MN2201', '122APC11', '122PACKMA60', '12MN7916']):
        print(f"SKU: {p['sku']:<15} | Brand: {p['brand']:<18} | Name: {p['name']}")

print("\n--- Top Filter Candidates ---")
for p in products:
    if p['cat'] == 'filtros' and any(k in p['sku'] for k in ['080AAK-102', '080AAK-107', '080AO-3614ST', '080AA-3038', '080AO-500']):
        print(f"SKU: {p['sku']:<15} | Brand: {p['brand']:<18} | Name: {p['name']}")

print("\n--- Top Heavy/Camaronera Candidates ---")
for p in products:
    if p['app'] == 'pesado' and ('31' in p['sku'] or '15W40' in p['name'].upper() or 'CAN' in p['name'].upper() or 'SHD' in p['sku']):
        print(f"SKU: {p['sku']:<15} | Brand: {p['brand']:<18} | Name: {p['name']}")
