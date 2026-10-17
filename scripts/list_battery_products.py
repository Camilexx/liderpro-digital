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

battery_prods = [p for p in products if p[5] == "baterias"]

print(f"Total battery products: {len(battery_prods)}\n")
for bp in battery_prods:
    sku = bp[1]
    name = bp[3]
    brand = bp[4]
    img = bp[6]
    print(f"SKU: {sku:<16} | Brand: {brand:<16} | Name: {name}")
    print(f"   Current Img: {img}")
