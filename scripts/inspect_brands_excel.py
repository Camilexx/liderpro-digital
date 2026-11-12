import openpyxl
import json
import re

EXCEL_PATH = r"C:/Users/PC/.gemini/antigravity/brain/bbbff1a7-d87f-4f17-a9de-dc3f94a57663/.user_uploaded/media_1794369577912_28dd75af.xlsx"
wb = openpyxl.load_workbook(EXCEL_PATH, read_only=True, data_only=True)
ws = wb.active

items = []
for r in ws.iter_rows(min_row=8):
    if r[2].value or r[3].value:
        sku = str(r[2].value).strip() if r[2].value else ""
        nom = str(r[3].value).strip() if r[3].value else ""
        costo = round(float(r[4].value), 2) if r[4].value is not None else None
        pventa = round(float(r[5].value), 2) if r[5].value is not None else None
        items.append({"sku": sku, "name": nom, "costo": costo, "pventa": pventa})

print(f"Total excel items: {len(items)}")

# Let's inspect Mobil items
print("\n--- MOBIL ITEMS IN EXCEL ---")
for it in items:
    if "MOBIL" in it["name"].upper() or "DELVAC" in it["name"].upper():
        print(f"{it['sku']} | {it['name']} | P.Venta: {it['pventa']}")

# Let's inspect Valvoline items
print("\n--- VALVOLINE ITEMS IN EXCEL ---")
for it in items:
    if "VALVOLINE" in it["name"].upper() or "VALVODIESEL" in it["name"].upper():
        print(f"{it['sku']} | {it['name']} | P.Venta: {it['pventa']}")

# Let's inspect Amalie items
print("\n--- AMALIE ITEMS IN EXCEL ---")
for it in items:
    if "AMALIE" in it["name"].upper():
        print(f"{it['sku']} | {it['name']} | P.Venta: {it['pventa']}")

# Let's inspect Motul items
print("\n--- MOTUL ITEMS IN EXCEL ---")
for it in items:
    if "MOTUL" in it["name"].upper():
        print(f"{it['sku']} | {it['name']} | P.Venta: {it['pventa']}")

# Let's inspect Abro items
print("\n--- ABRO ITEMS IN EXCEL ---")
for it in items:
    if "ABRO" in it["name"].upper() and "REFRIGERANTE" in it["name"].upper():
        print(f"{it['sku']} | {it['name']} | P.Venta: {it['pventa']}")
