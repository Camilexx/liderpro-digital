import json, re

with open(r'c:\Users\PC\Desktop\NEXUS\liderpro-digital\src\data\products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse the products array or extract variants
matches = re.findall(r'(\{[^{}]*"sku":\s*"([^"]+)",[^{}]*"name":\s*"([^"]+)"[^{}]*"variants":\s*\[(.*?)\][^{}]*\})', content, re.DOTALL)
print(f"Products with variants: {len(matches)}")

same_img_count = 0
diff_img_count = 0
for full, sku, name, vblock in matches:
    v_imgs = re.findall(r'"imageUrl":\s*"([^"]+)"', vblock)
    v_pres = re.findall(r'"presentation":\s*"([^"]+)"', vblock)
    unique_imgs = set(v_imgs)
    if len(unique_imgs) <= 1:
        same_img_count += 1
        print(f"[ALL SAME IMG] SKU: {sku} | {name[:35]} | Imgs ({len(v_imgs)}): {v_imgs}")
    else:
        diff_img_count += 1
        print(f"[DIFF IMGS]     SKU: {sku} | {name[:35]} | Imgs ({len(v_imgs)}): {v_imgs}")

print(f"\nSummary: {diff_img_count} have different images, {same_img_count} have SAME image across variants")
