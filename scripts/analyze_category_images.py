import re
import os

def main():
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

    # Group by category
    cats = {}
    for p in products:
        sku, slug, name, brand, cat, img = p[1], p[2], p[3], p[4], p[5], p[6]
        cats.setdefault(cat, []).append({
            "sku": sku, "name": name, "brand": brand, "image": img
        })

    for cat, prods in cats.items():
        print(f"\nCategory: {cat} ({len(prods)} products)")
        # Sample first 3 and last 3
        sample = prods[:3] + prods[-3:] if len(prods) > 6 else prods
        for s in sample:
            sz = os.path.getsize(os.path.join("public", s["image"].lstrip("/"))) if os.path.exists(os.path.join("public", s["image"].lstrip("/"))) else "NOT FOUND"
            print(f"  {s['sku']:<18} | {s['brand']:<14} | Img: {s['image']} ({sz} bytes)")

if __name__ == "__main__":
    main()
