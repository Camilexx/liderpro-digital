import re, os

base_dir = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital"
with open(os.path.join(base_dir, 'src/data/products.ts'), 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.splitlines()
variant_lines = [i for i, line in enumerate(lines) if "variants" in line]
print(f"Total lines with 'variants': {len(variant_lines)}")
for idx in variant_lines[:10]:
    print(f"Line {idx+1}: {lines[idx]}")
    for j in range(max(0, idx-2), min(len(lines), idx+8)):
        print(f"  [{j+1}] {lines[j]}")
    print("---")
