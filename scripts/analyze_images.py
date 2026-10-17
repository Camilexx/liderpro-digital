import re
import os

with open("src/data/products.ts", "r", encoding="utf-8") as f:
    text = f.read()

urls = re.findall(r'["\']?imageUrl["\']?:\s*["\']([^"\']+)["\']', text)
print(f"Total products with imageUrl: {len(urls)}")
exts = {}
missing = []
for u in urls:
    ext = u.split(".")[-1].lower() if "." in u else "none"
    exts[ext] = exts.get(ext, 0) + 1
    local_path = os.path.join("public", u.lstrip("/"))
    if not os.path.exists(local_path):
        missing.append(u)

print("Extensions used:", exts)
print(f"Missing images count: {len(missing)}")
if missing:
    print("Sample missing:", missing[:5])
