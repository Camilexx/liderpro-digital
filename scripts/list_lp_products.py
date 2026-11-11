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

for p in products:
    if p["sku"].startswith("LP-"):
        print(f"{p['sku']:<14} | {p['category']:<13} | {p['brand']:<15} | {p['name']} | vars: {[v['presentation'] for v in (p.get('variants') or [])]}")
