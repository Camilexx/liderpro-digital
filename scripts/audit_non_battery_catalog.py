import re
import os

with open("src/data/products.ts", "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(
    r'\{\s*"id":\s*"([^"]+)",\s*'
    r'"sku":\s*"([^"]+)",\s*'
    r'"slug":\s*"([^"]+)",\s*'
    r'"name":\s*"([^"]+)",\s*'
    r'"brand":\s*"([^"]+)",\s*'
    r'"category":\s*"([^"]+)",.*?'
    r'"imageUrl":\s*"([^"]+)"',
    re.DOTALL
)
products = pattern.findall(content)

print(f"Total products: {len(products)}")

# Check filter types:
# In Advance filters:
# AA = Air filter (Aire)
# AO = Oil filter (Aceite)
# AC = Cabin filter (Cabina)
# AF / AFP / AFE / AFS = Fuel filter (Combustible / Gasolina / Diésel)
filter_mismatches = []
lubricant_mismatches = []
general_discrepancies = []

for p in products:
    sku, slug, name, brand, cat, img = p[1], p[2], p[3], p[4], p[5], p[6]
    name_l = name.lower()
    img_l = img.lower()
    
    if cat == "filtros":
        # Check if air filter has oil filter image, etc.
        # Check prefix of SKU vs image
        # If SKU starts with 080AA (Air)
        if "080aa" in sku.lower() and not "080aak" in sku.lower():
            if "ao" in img_l or "oil" in img_l or "aceite" in img_l:
                filter_mismatches.append((sku, name, img, "SKU is Air Filter (AA) but image is Oil Filter (AO)"))
        elif "080ao" in sku.lower():
            if "aa" in img_l or "air" in img_l or "aire" in img_l:
                filter_mismatches.append((sku, name, img, "SKU is Oil Filter (AO) but image is Air Filter (AA)"))
        elif "080ac" in sku.lower():
            if "oil" in img_l or "ao" in img_l or "air" in img_l:
                filter_mismatches.append((sku, name, img, "SKU is Cabin Filter (AC) but image has AO/AA"))
                
    if cat == "lubricantes":
        # Check viscosity or brand in image vs product
        # e.g. Mannol product with Motul image
        if "mannol" in brand.lower() and "motul" in img_l:
            lubricant_mismatches.append((sku, name, img, "Mannol brand with Motul image"))
        elif "motul" in brand.lower() and "mannol" in img_l:
            lubricant_mismatches.append((sku, name, img, "Motul brand with Mannol image"))
        elif "mobil" in brand.lower() and ("mannol" in img_l or "motul" in img_l):
            lubricant_mismatches.append((sku, name, img, "Mobil brand with Mannol/Motul image"))

print(f"\nFilter mismatches found: {len(filter_mismatches)}")
for m in filter_mismatches:
    print(f"  {m[0]}: {m[1]} | Img: {m[2]} -> {m[3]}")

print(f"\nLubricant mismatches found: {len(lubricant_mismatches)}")
for m in lubricant_mismatches:
    print(f"  {m[0]}: {m[1]} | Img: {m[2]} -> {m[3]}")

# Let's inspect all filters
print(f"\n--- ALL 39 FILTERS ---")
filters = [p for p in products if p[5] == "filtros"]
for f in filters:
    print(f"  {f[1]:<20} | {f[3][:40]:<40} | Img: {f[6]}")
