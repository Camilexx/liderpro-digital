import os

keywords = ['ventas diarias', 'promedio de ventas', 'margen', 'utilidad', 'costo erp', 'ganancia', 'promedio venta']
found = 0
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.ts', '.tsx')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                for line_no, line in enumerate(fp, 1):
                    for k in keywords:
                        if k in line.lower():
                            print(f"{p}:{line_no} [{k}] -> {line.strip()[:100]}")
                            found += 1

print(f"\nTotal potential sensitive occurrences: {found}")
