with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

skus = [
    '03024-HP-I',
    '02724HPS4',
    '42HPS4',
    '12MN7916-4',
    '01504MD04-15W40',
    '080AO-3614ST',
    '01001012',
    '080AAK-102',
    '03031-SHD',
    '0368AR50006'
]

for s in skus:
    needle = f'"sku": "{s}"'
    if needle in text:
        idx = text.find(needle)
        name_idx = text.find('"name": "', idx)
        name_end = text.find('",', name_idx)
        name = text[name_idx+9:name_end]
        print(f"FOUND: {s:<18} -> {name}")
    else:
        print(f"NOT FOUND: {s}")
