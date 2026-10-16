import re
import json

with open("src/data/products.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Match each product object
# In products.ts each product is defined as an object inside PRODUCTS = [ ... ]
# Let's extract all products with category: "baterias"

pattern = re.compile(r'\{[^{}]*?"category":\s*"baterias"[^{}]*?\}', re.DOTALL)
# But products have nested arrays like compatibleVehicles.
# Let's parse product objects more robustly:

# Find the start of PRODUCTS array
start_idx = text.find("export const PRODUCTS: Product[] = [")
if start_idx == -1:
    print("Could not find PRODUCTS array")
    exit(1)

# Find all occurrences of "category": "baterias"
matches = [m.start() for m in re.finditer(r'"category":\s*"baterias"', text)]
print(f"Total occurrences of category baterias: {len(matches)}")

battery_products = []

for pos in matches:
    # scan backwards to find the opening '{' of this product
    bracket_count = 0
    start_pos = pos
    # Go backwards until we find the product boundary (e.g. \n  { at indentation level 2)
    while start_pos > 0:
        if text[start_pos:start_pos+4] == "\n  {":
            start_pos += 3
            break
        start_pos -= 1
    
    # scan forward to find the matching '}'
    curr = start_pos
    depth = 0
    end_pos = start_pos
    while curr < len(text):
        if text[curr] == '{':
            depth += 1
        elif text[curr] == '}':
            depth -= 1
            if depth == 0:
                end_pos = curr + 1
                break
        curr += 1
    
    product_str = text[start_pos:end_pos]
    
    # Extract fields with regex
    def get_field(field_name):
        m = re.search(rf'"{field_name}":\s*"([^"]+)"', product_str)
        return m.group(1) if m else None

    pid = get_field("id")
    sku = get_field("sku")
    name = get_field("name")
    brand = get_field("brand")
    img = get_field("imageUrl")
    subcat = get_field("subcategory")
    slug = get_field("slug")
    
    battery_products.append({
        "id": pid,
        "sku": sku,
        "name": name,
        "brand": brand,
        "subcategory": subcat,
        "imageUrl": img,
        "slug": slug
    })

print(f"\nExtracted {len(battery_products)} battery products:")
for i, b in enumerate(battery_products, 1):
    print(f"{i:2d}. SKU: {b['sku']:<18} Brand: {b['brand']:<18} Img: {b['imageUrl']}")
    print(f"    Name: {b['name']}")
