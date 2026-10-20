import os, json

base_dir = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital"
products_file = os.path.join(base_dir, "src", "data", "products.ts")

with open(products_file, "r", encoding="utf-8") as f:
    content = f.read()

start = content.find("export const PRODUCTS: Product[] = ")
json_str = content[start + len("export const PRODUCTS: Product[] = "):].rstrip(";\n ")
products = json.loads(json_str)

missing_images = []
existing_count = 0

for p in products:
    main_img = p.get("imageUrl", "")
    if main_img:
        rel = main_img.lstrip("/")
        full_path = os.path.join(base_dir, "public", rel)
        if not os.path.exists(full_path):
            missing_images.append((p["sku"], p["name"], main_img))
        else:
            existing_count += 1
            
    for v in p.get("variants", []):
        v_img = v.get("imageUrl", "")
        if v_img:
            rel = v_img.lstrip("/")
            full_path = os.path.join(base_dir, "public", rel)
            if not os.path.exists(full_path):
                missing_images.append((v["sku"], v["name"], v_img))
            else:
                existing_count += 1

print(f"Total valid images checked: {existing_count}")
print(f"Total missing images: {len(missing_images)}")
if missing_images:
    for sku, name, img in missing_images[:10]:
        print(f"  Missing: {sku} | {name[:30]} -> {img}")
