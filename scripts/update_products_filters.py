import json
import re

with open('scripts/filters_remapping_done.json', 'r', encoding='utf-8') as f:
    mapping = json.load(f)

print(f"Total filter mappings to apply: {len(mapping)}")

products_path = 'src/data/products.ts'
with open(products_path, 'r', encoding='utf-8') as f:
    content = f.read()

updated_count = 0

def replace_filter_image(m):
    global updated_count
    block = m.group(0)
    sku_m = re.search(r'"sku":\s*"([^"]+)"', block)
    if not sku_m:
        return block
    sku = sku_m.group(1).strip()
    if sku in mapping:
        new_img = mapping[sku]
        new_block = re.sub(r'("imageUrl":\s*)"[^"]+"', rf'\1"{new_img}"', block)
        if new_block != block:
            updated_count += 1
            print(f"Updated {sku} -> {new_img}")
        return new_block
    return block

# Match each product block { "id": "p-... }
pattern = r'\{\s*"id":\s*"[^"]+",.*?\n  \}'
new_content = re.sub(pattern, replace_filter_image, content, flags=re.DOTALL)

with open(products_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\nDone! Successfully updated {updated_count} filter products in {products_path}")
