with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '"sku": "03024-FE"' in line:
        print(f"Found 03024-FE around line {i+1}")
        for j in range(max(0, i-5), min(len(lines), i+35)):
            print(f"{j+1}: {lines[j]}", end="")
        break
