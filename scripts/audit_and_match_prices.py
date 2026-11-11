import openpyxl
import json
import re
import difflib

EXCEL_PATH = r"C:/Users/PC/.gemini/antigravity/brain/bbbff1a7-d87f-4f17-a9de-dc3f94a57663/.user_uploaded/media_1794369577912_28dd75af.xlsx"
PRODUCTS_PATH = r"C:/Users/PC/Desktop/NEXUS/liderpro-digital/src/data/products.ts"

wb = openpyxl.load_workbook(EXCEL_PATH, data_only=True)
ws = wb.active

excel_items = []
for r in range(8, ws.max_row + 1):
    art = ws.cell(r, 3).value
    nom = ws.cell(r, 4).value
    costo = ws.cell(r, 5).value
    pventa = ws.cell(r, 6).value
    if art or nom:
        sku_str = str(art).strip() if art else ""
        nom_str = str(nom).strip() if nom else ""
        pv_val = float(pventa) if (pventa is not None and str(pventa).strip() != "") else None
        excel_items.append({
            "sku": sku_str,
            "name": nom_str,
            "pventa": pv_val,
            "row": r
        })

with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
    p_text = f.read()

j_start = p_text.index("export const PRODUCTS: Product[] = ") + len("export const PRODUCTS: Product[] = ")
products = json.loads(p_text[j_start:].strip().rstrip(";"))

# Let's check how many products have exact SKU in excel_items vs LP-* SKU
excel_by_sku = {it["sku"].upper(): it for it in excel_items}
excel_by_clean_sku = {re.sub(r"[^A-Z0-9]", "", it["sku"].upper()): it for it in excel_items}

exact_sku_matches = 0
lp_products = []
unmatched_real_sku_products = []

for p in products:
    psku = p["sku"].strip().upper()
    if psku in excel_by_sku:
        exact_sku_matches += 1
    elif re.sub(r"[^A-Z0-9]", "", psku) in excel_by_clean_sku:
        exact_sku_matches += 1
    elif psku.startswith("LP-"):
        lp_products.append(p)
    else:
        unmatched_real_sku_products.append(p)

print(f"Total catalog products: {len(products)}")
print(f"Exact/Clean SKU matches: {exact_sku_matches}")
print(f"LP-* SKU products: {len(lp_products)}")
print(f"Unmatched non-LP SKU products: {len(unmatched_real_sku_products)}")
for up in unmatched_real_sku_products:
    print("  Unmatched non-LP:", up["sku"], "|", up["name"])

print("\nSample LP-* products:")
for p in lp_products[:30]:
    print(f"  {p['sku']:<12} | {p['brand']:<10} | {p['name']} | vars: {len(p.get('variants') or [])}")
