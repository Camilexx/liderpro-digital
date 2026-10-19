import re
import json

# Load current products
with open("src/data/products.ts", "r", encoding="utf-8") as f:
    text = f.read()

j_start = text.index("export const PRODUCTS: Product[] = ") + len("export const PRODUCTS: Product[] = ")
j_str = text[j_start:].strip().rstrip(";")
products = json.loads(j_str)

print(f"Loaded {len(products)} products from products.ts")

# Check current compatibleVehicles
all_makes = set()
for p in products:
    for cv in p.get("compatibleVehicles", []):
        all_makes.add(cv["make"])

print(f"Current makes in products: {all_makes}")
