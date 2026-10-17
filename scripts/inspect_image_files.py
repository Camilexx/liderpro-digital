import os
import glob
import re

def main():
    with open("src/data/products.ts", "r", encoding="utf-8") as f:
        content = f.read()

    # Find all products and their imageUrl
    # Regex to grab sku, name, brand, category, imageUrl
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

    # Check all files in public/images/products
    all_files = os.listdir("public/images/products")
    print(f"Total files in public/images/products: {len(all_files)}")

    # Check which files exist with 'battery' or 'ecuador' or 'bosch' in their name
    battery_files = [f for f in all_files if any(k in f.lower() for k in ["bosch", "ecuador", "bateria", "battery"])]
    print(f"\nBattery files in public/images/products ({len(battery_files)}):")
    for bf in sorted(battery_files):
        sz = os.path.getsize(os.path.join("public/images/products", bf))
        print(f"  {bf} ({sz} bytes)")

    # Also check what files exist in the artifact directory from earlier image generation tasks!
    artifact_dir = r"C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663"
    artifact_files = os.listdir(artifact_dir) if os.path.exists(artifact_dir) else []
    generated_images = [f for f in artifact_files if f.endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    print(f"\nGenerated images in artifact dir ({len(generated_images)}):")
    for gf in sorted(generated_images):
        sz = os.path.getsize(os.path.join(artifact_dir, gf))
        print(f"  {gf} ({sz} bytes)")

    # Now let's inspect the battery products in products.ts and see their imageUrl vs what files exist!
    print(f"\nBattery products mapping:")
    for m in products:
        sku = m[1]
        name = m[3]
        brand = m[4]
        cat = m[5]
        img = m[6]
        if cat == "baterias":
            print(f"  SKU: {sku:<16} | Brand: {brand:<16} | Img: {img}")

if __name__ == "__main__":
    main()
