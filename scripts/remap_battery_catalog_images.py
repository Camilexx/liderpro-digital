import re
import os
import shutil

mapping = {
    # BATERIAS ECUADOR
    "03024-FE": "/images/products/ecuador-fe-group24.png",
    "03024-FE-I": "/images/products/ecuador-fe-group24.png",
    "03024-HP-I": "/images/products/ecuador-hp-group24.png",
    "03027-FE": "/images/products/official_be/27fe-1.webp",
    "03027-FE-I": "/images/products/official_be/27fe-1.webp",
    "03027-HP": "/images/products/ecuador-hp-group27.png",
    "03027-HP-I": "/images/products/ecuador-hp-group27.png",
    "03031-SHD": "/images/products/official_be/31-01.webp",
    "03034-FE": "/images/products/official_be/34-01.webp",
    "03034-FE-I": "/images/products/official_be/34-01.webp",
    "03034-HP": "/images/products/official_be/34-01.webp",
    "03034-HP-I": "/images/products/official_be/34-01.webp",
    "03036-HP": "/images/products/official_be/36-01.webp",
    "03042-FE": "/images/products/ecuador-fe-group42.png",
    "03042-HP": "/images/products/ecuador-hp-group42.png",
    "03042-HP-I": "/images/products/ecuador-hp-group42.png",
    "03055-HD": "/images/products/official_be/55-01.webp",
    "03055-HD-I": "/images/products/official_be/55-01.webp",
    "03065-HP": "/images/products/official_be/65-01.webp",
    "03066-HP": "/images/products/official_be/66-01.webp",
    "030N100-SHD-I": "/images/products/official_be/n100-01.webp",
    "030N150-SHD": "/images/products/official_be/n150-01.webp",
    "030N40-FE-I": "/images/products/official_be/n40-01.webp",
    "030N40-HP": "/images/products/official_be/n40-01.webp",
    "030N40-HP-I": "/images/products/official_be/n40-01.webp",
    "030NS40-FE": "/images/products/ecuador-fe-ns40.png",
    "030NS40-FE-I": "/images/products/ecuador-fe-ns40.png",
    "030NS40-HP": "/images/products/ecuador-hp-ns40.png",
    
    # BOSCH
    "02724HPIS4": "/images/products/bosch-s4-group24.png",
    "02724HPS4": "/images/products/bosch-s4-group24.png",
    "02727HPIS4": "/images/products/bosch-s4-group27.png",
    "02727HPS4": "/images/products/bosch-s4-group27.png",
    "02734HPS4": "/images/products/official_bosch/s4_34hp.webp",
    "02742FES3": "/images/products/bosch-s3-group42.png",
    "02742HPIS4": "/images/products/bosch-s4-group42.png",
    "42HPS4": "/images/products/bosch-s4-group42.png",
    "0277B6548": "/images/products/bosch-s5-b65.png",
    "027N40FES4": "/images/products/official_bosch/s4_ns40fe.webp",
    "027NS40FEFS4": "/images/products/bosch-s4-ns40.png",
    "027NS40FEIFS4": "/images/products/bosch-s4-ns40.png",
}

filepath = 'src/data/products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make backup first
with open(filepath + '.bak_img', 'w', encoding='utf-8') as f:
    f.write(content)

updated_count = 0

def replace_in_product(m):
    global updated_count
    full_block = m.group(0)
    sku_m = re.search(r'"sku":\s*"([^"]+)"', full_block)
    if not sku_m:
        return full_block
    sku = sku_m.group(1)
    if sku in mapping:
        new_img = mapping[sku]
        # replace imageUrl inside this block
        new_block = re.sub(r'("imageUrl":\s*)"[^"]+"', rf'\1"{new_img}"', full_block)
        if new_block != full_block:
            updated_count += 1
            print(f"Updated {sku} -> {new_img}")
        return new_block
    return full_block

# Match each product block { ... } in PRODUCTS
pattern = r'\{\s*"id":\s*"[^"]+",.*?\n  \}'
new_content = re.sub(pattern, replace_in_product, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\nDone! Successfully updated {updated_count} products in {filepath}")
