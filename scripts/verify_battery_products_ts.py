import os
import re

with open("src/data/products.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Find all products in category: 'baterias' or categoryId: 'baterias'
# or check all 40 SKUs directly

pattern = r'{\s*id:\s*"([^"]+)",\s*sku:\s*"([^"]+)",\s*name:\s*"([^"]+)",[\s\S]*?category:\s*"baterias"[\s\S]*?imageUrl:\s*"([^"]+)"'
matches = re.findall(pattern, text)

print(f"Total battery products matched in products.ts: {len(matches)}")
missing_files = []
for pid, sku, name, img in matches:
    rel_path = img.lstrip("/")
    exists = os.path.exists(rel_path)
    size = os.path.getsize(rel_path) if exists else 0
    if not exists:
        missing_files.append((sku, img))
    print(f"SKU: {sku:<16} | Exists: {str(exists):<5} ({size//1024:>3} KB) | Img: {img}")

if missing_files:
    print(f"\nWARNING: {len(missing_files)} missing images!")
    for s, i in missing_files:
        print(f"  {s}: {i}")
else:
    print("\nALL BATTERY IMAGES EXIST AND ARE VALID!")
