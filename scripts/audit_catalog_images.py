import os
import re
import json

def main():
    products_file = "src/data/products.ts"
    with open(products_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Match blocks starting with { "id": "p-...
    # Or extract JSON-like objects
    # Let's find all occurrences of:
    # "id": "...", "sku": "...", "name": "...", "brand": "...", "category": "...", "imageUrl": "..."
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
    
    matches = pattern.findall(content)
    print(f"Total products matched with regex: {len(matches)}")
    
    products = []
    for m in matches:
        products.append({
            "id": m[0],
            "sku": m[1],
            "slug": m[2],
            "name": m[3],
            "brand": m[4],
            "category": m[5],
            "imageUrl": m[6],
        })

    missing_images = []
    brand_mismatches = []
    category_mismatches = []
    battery_brand_discrepancies = []
    image_usage = {}

    for p in products:
        img = p["imageUrl"]
        if img.startswith("/"):
            file_path = os.path.join("public", img[1:])
        else:
            file_path = os.path.join("public", img)
        file_path = os.path.normpath(file_path)
        
        if not os.path.isfile(file_path):
            missing_images.append((p, file_path))
            
        image_usage.setdefault(img, []).append(p)
        
        img_lower = img.lower()
        brand_lower = p["brand"].lower()
        cat_lower = p["category"].lower()
        name_lower = p["name"].lower()
        
        # 1. Baterias Ecuador vs Bosch check:
        if "bosch" in img_lower and ("baterias ecuador" in brand_lower or "ecuador" in brand_lower and "bosch" not in brand_lower):
            battery_brand_discrepancies.append((p, f"Product is brand '{p['brand']}' but image is '{img}' (Bosch)"))
            
        if "ecuador" in img_lower and "bosch" in brand_lower:
            battery_brand_discrepancies.append((p, f"Product is brand '{p['brand']}' but image is '{img}' (Ecuador)"))

        # 2. Battery model discrepancy:
        # Check if S3 / S4 / S5 or group 24 / 27 / 34 / 42 / ns40 / group31 / n150 mismatch
        groups = ["group24", "group27", "group34", "group42", "group31", "ns40", "ns60", "n150", "b65", "din65"]
        for g in groups:
            if g in img_lower:
                # If product name or sku says another group:
                for other_g in groups:
                    if other_g != g and other_g in name_lower.replace(" ", "").replace("-", ""):
                        # possible mismatch
                        category_mismatches.append((p, f"Image has {g} but name specifies {other_g}"))

        # 3. Category mismatch (e.g. filter image for battery, battery image for lubricant, etc.)
        if cat_lower == "baterias" and ("filter" in img_lower or "filtro" in img_lower or "lubricant" in img_lower or "oil" in img_lower):
            category_mismatches.append((p, f"Category is baterias but image is {img}"))
        if cat_lower == "filtros" and ("battery" in img_lower or "bateria" in img_lower or "bosch-s" in img_lower or "ecuador" in img_lower):
            category_mismatches.append((p, f"Category is filtros but image is {img}"))
        if cat_lower == "lubricantes" and ("battery" in img_lower or "bateria" in img_lower or "filtro" in img_lower or "filter" in img_lower):
            category_mismatches.append((p, f"Category is lubricantes but image is {img}"))

    print(f"\n--- AUDIT SUMMARY ---")
    print(f"Total products audited: {len(products)}")
    print(f"Missing images: {len(missing_images)}")
    for p, fp in missing_images:
        print(f"  [MISSING] SKU: {p['sku']} | {p['name']} | Expected: {fp}")

    print(f"\nBattery Brand Discrepancies: {len(battery_brand_discrepancies)}")
    for p, err in battery_brand_discrepancies:
        print(f"  [BATTERY BRAND ERROR] SKU: {p['sku']} | Name: {p['name']} | Img: {p['imageUrl']} -> {err}")

    print(f"\nCategory / Model Discrepancies: {len(category_mismatches)}")
    for p, err in category_mismatches:
        print(f"  [MODEL/CAT MISMATCH] SKU: {p['sku']} | Name: {p['name']} | Img: {p['imageUrl']} -> {err}")

    # Inspect all battery products and their images specifically
    print(f"\n--- ALL BATTERY PRODUCTS INSPECTION ---")
    battery_prods = [p for p in products if p["category"] == "baterias"]
    print(f"Total battery products: {len(battery_prods)}")
    for bp in battery_prods:
        print(f"  SKU: {bp['sku']} | Brand: {bp['brand']} | Name: {bp['name']} | Image: {bp['imageUrl']}")

    # Inspect duplicate image assignments
    print(f"\n--- SHARED / DUPLICATE IMAGES ---")
    duplicates = {img: prods for img, prods in image_usage.items() if len(prods) > 1}
    print(f"Unique images shared by multiple SKUs: {len(duplicates)}")
    for img, prods in duplicates.items():
        print(f"  Image: {img} ({len(prods)} products):")
        for p in prods:
            print(f"    - SKU {p['sku']}: {p['name']} [{p['brand']}]")

if __name__ == "__main__":
    main()
