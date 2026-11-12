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

print(f"--- DETAILED AUDIT OF ALL {len(var_prods)} PRODUCTS WITH VARIANTS ---")
for p in var_prods:
    print(f"\nPRODUCT: {p['sku']} | {p['name']} (Brand: {p['brand']})")
    # Find all potential matches in excel
    potential = []
    p_name_words = [w for w in p['name'].upper().split() if len(w) > 2 and w not in ["MANNOL", "ACEITE", "MOTOR", "PARA", "CON", "100%", "SINTETICO", "SEMISINTETICO"]]
    for it in excel_items:
        it_name = it["name"].upper()
        if p["brand"].upper() in it_name:
            # check similarity or word match
            matches = sum(1 for w in p_name_words if w in it_name)
            if matches >= 1:
                potential.append(it)
    
    print(f"  Current Variants in catalog:")
    for v in p["variants"]:
        print(f"    - {v.get('presentation')}: Price={v.get('price')}, Sku={v.get('sku')}, OfficialSku={v.get('officialSku')}")
    print(f"  Available potential Excel items ({len(potential)}):")
    for it in potential[:6]:
        print(f"    * {it['sku']} | {it['name']} | P.Venta: {it['pventa']}")
