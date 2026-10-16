import os
import re

with open("src/data/products.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Find each battery product block
matches = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"brand":\s*"([^"]+)"[\s\S]*?"category":\s*"baterias"[\s\S]*?"imageUrl":\s*"([^"]+)"', text)
print(f"Total battery matches: {len(matches)}")

for pid, name, brand, img in matches:
    rel_path = img.lstrip("/")
    exists = os.path.exists(rel_path)
    size = os.path.getsize(rel_path) if exists else 0
    print(f"{brand:<18} | {name[:45]:<45} | {img} (Exists: {exists}, {size//1024} KB)")
