import openpyxl
import json

EXCEL_PATH = r"C:/Users/PC/.gemini/antigravity/brain/bbbff1a7-d87f-4f17-a9de-dc3f94a57663/.user_uploaded/media_1794369577912_28dd75af.xlsx"
PRODUCTS_PATH = r"C:/Users/PC/Desktop/NEXUS/liderpro-digital/src/data/products.ts"

wb = openpyxl.load_workbook(EXCEL_PATH, read_only=True, data_only=True)
ws = wb.active

excel_rows = {}
for r in ws.iter_rows(min_row=8):
    if r[2].value:
        sku = str(r[2].value).strip().upper()
        nom = str(r[3].value).strip() if r[3].value else ""
        costo = round(float(r[4].value), 2) if r[4].value is not None else None
        pventa = round(float(r[5].value), 2) if r[5].value is not None else None
        excel_rows[sku] = {
            "name": nom,
            "costo": costo,
            "pventa": pventa,
        }

with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
    text = f.read()

products = json.loads(text.split("export const PRODUCTS: Product[] = ")[1].strip().rstrip(";"))

cost_matches = []
pventa_matches = []
repeated_variant_prices = []

for p in products:
    p_sku = p["sku"].upper()
    p_price = p.get("price")
    
    # Check variants
    variants = p.get("variants") or []
    if len(variants) > 1:
        # Check if prices repeat across variants of different sizes
        v_prices = [v.get("price") for v in variants if v.get("price") is not None]
        if len(v_prices) > 1 and len(set(v_prices)) == 1:
            repeated_variant_prices.append({
                "product_sku": p["sku"],
                "product_name": p["name"],
                "variants": [(v.get("presentation"), v.get("price"), v.get("officialSku")) for v in variants]
            })

    # Check if p_price matched cost
    if p_sku in excel_rows and p_price is not None:
        c = excel_rows[p_sku]["costo"]
        pv = excel_rows[p_sku]["pventa"]
        if p_price == c and c != pv:
            cost_matches.append((p_sku, p["name"], p_price, c, pv))
        elif p_price == pv:
            pventa_matches.append((p_sku, p["name"], p_price))

    for v in variants:
        v_sku = (v.get("officialSku") or v.get("sku") or "").upper()
        v_price = v.get("price")
        if v_sku in excel_rows and v_price is not None:
            c = excel_rows[v_sku]["costo"]
            pv = excel_rows[v_sku]["pventa"]
            if v_price == c and c != pv:
                cost_matches.append((v_sku, v["name"], v_price, c, pv))
            elif v_price == pv:
                pventa_matches.append((v_sku, v["name"], v_price))

print(f"VERIFICATION RESULTS:")
print(f"Total matches with COST (Costo): {len(cost_matches)}")
if cost_matches:
    for m in cost_matches:
        print(f"  [ALERT COST]: {m}")
else:
    print("  >>> ZERO COST LEAKS: 100% of matched items use 'Precio de venta' (PVP)!")

print(f"\nTotal matches with PRECIO DE VENTA: {len(pventa_matches)}")

print(f"\nPRODUCTS WHERE VARIANT PRICES REPEAT (INCONSISTENT 1L vs GALON): {len(repeated_variant_prices)}")
for item in repeated_variant_prices:
    print(f"  * {item['product_sku']} | {item['product_name']}: {item['variants']}")
