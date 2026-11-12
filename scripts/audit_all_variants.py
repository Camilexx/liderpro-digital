import openpyxl
import json
import re

EXCEL_PATH = r"C:/Users/PC/.gemini/antigravity/brain/bbbff1a7-d87f-4f17-a9de-dc3f94a57663/.user_uploaded/media_1794369577912_28dd75af.xlsx"
PRODUCTS_PATH = r"C:/Users/PC/Desktop/NEXUS/liderpro-digital/src/data/products.ts"

wb = openpyxl.load_workbook(EXCEL_PATH, read_only=True, data_only=True)
ws = wb.active

excel_items = []
for r in ws.iter_rows(min_row=8):
    if r[2].value or r[3].value:
        sku = str(r[2].value).strip() if r[2].value else ""
        nom = str(r[3].value).strip() if r[3].value else ""
        costo = round(float(r[4].value), 2) if r[4].value is not None else None
        pventa = round(float(r[5].value), 2) if r[5].value is not None else None
        excel_items.append({
            "sku": sku,
            "name": nom,
            "costo": costo,
            "pventa": pventa,
        })

with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
    text = f.read()

products = json.loads(text.split("export const PRODUCTS: Product[] = ")[1].strip().rstrip(";"))

var_prods = [p for p in products if p.get("variants")]

print(f"Total products with variants: {len(var_prods)}\n")
for p in var_prods:
    print(f"Product: {p['sku']} | {p['name']} (Brand: {p['brand']}, Main Price: {p.get('price')})")
    for v in p["variants"]:
        print(f"    Variant: {v.get('presentation')} | Price: {v.get('price')} | Sku: {v.get('sku')} | OfficialSku: {v.get('officialSku')}")
