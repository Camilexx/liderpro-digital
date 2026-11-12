import openpyxl
import json
import re

EXCEL_PATH = r"C:/Users/PC/.gemini/antigravity/brain/bbbff1a7-d87f-4f17-a9de-dc3f94a57663/.user_uploaded/media_1794369577912_28dd75af.xlsx"
PRODUCTS_PATH = r"C:/Users/PC/Desktop/NEXUS/liderpro-digital/src/data/products.ts"

wb = openpyxl.load_workbook(EXCEL_PATH, read_only=True, data_only=True)
ws = wb.active

excel_by_sku = {}
excel_items = []
for r in ws.iter_rows(min_row=8):
    if r[2].value or r[3].value:
        sku = str(r[2].value).strip() if r[2].value else ""
        nom = str(r[3].value).strip() if r[3].value else ""
        costo = round(float(r[4].value), 2) if r[4].value is not None else None
        pventa = round(float(r[5].value), 2) if r[5].value is not None else None
        item = {
            "sku": sku,
            "sku_clean": sku.upper().replace(" ", ""),
            "name": nom,
            "costo": costo,
            "pventa": pventa,
        }
        excel_items.append(item)
        excel_by_sku[sku.upper()] = item
        # Also index without leading zero for 12MN codes
        if sku.upper().startswith("012"):
            excel_by_sku[sku.upper()[1:]] = item
        elif sku.upper().startswith("12"):
            excel_by_sku["0" + sku.upper()] = item

with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
    text = f.read()

products = json.loads(text.split("export const PRODUCTS: Product[] = ")[1].strip().rstrip(";"))

print(f"Loaded {len(products)} products from products.ts")

# Targeted manual overrides for variant SKU mappings based on exact Excel rows
EXACT_VARIANT_FIXES = {
    # Special Plus 10W-30
    "LP-LUR-009": {
        "1 Litro": ("012MN7512-1A", 9.83),
        "1 Galón / 5L": ("012MN7512-4A", 32.22),
    },
    # Chevrolet Opel OEM 5W-30 (Only 1L in bodega, Galón doesn't exist in stock)
    "LP-LUR-010": {
        "1 Litro": ("012MN7701-1", 14.78),
        "1 Galón / 5L": (None, None), # Galón not stocked in bodega
    },
    # Ceramic Pro 10W-40 (Only 5L Galón in bodega, 1L doesn't exist in stock)
    "LP-LUR-014": {
        "1 Litro": (None, None), # 1L not stocked in bodega
        "1 Galón / 5L": ("012MN7726-5", 39.55),
    },
    # Molibden Green Ultra 5W-30
    "LP-LUR-037": {
        "1 Litro": ("12MN7916-1", 16.17),
        "1 Galón / 5L": ("12MN7916-4", 55.35),
    },
    # Mobil Delvac MX 15W-40
    "LP-LUR-002-2": {
        "1 Litro": ("015MD12-15W40", 6.83),
        "1 Galón": ("01504MD04-15W40", 24.39),
        "Caneca 5 GL": ("015MD5-15W40", 94.35),
    },
    # Aroil 15W-40 CI-4
    "LP-LUR-005-3": {
        "1 Litro": ("0368AR10031", 3.96),
        "1 Galón": ("0368AR10001", 15.26),
        "Caneca 5 GL": ("0368AR10003", 62.61),
    },
    # Mannol Grasa LC-2
    "LP-MAN-008": {
        "800 g": ("012MN8028-08", 8.70),
        "1 Galón / 5L": ("012MN8029", 60.91), # 4.5kg
        "Caneca 5 GL": ("012MN8116", 207.78), # 18kg
    },
    # Mannol Ester Additive
    "LP-MAN-033": {
        "450 ml": ("012MN9929-045", 8.48),
        "1 Galón / 5L": ("012MN9929-1", 17.52), # 1 Litro
    },
    # Mannol Diesel Ester Additive
    "LP-MAN-034": {
        "250 ml": ("012MN9930-025", 5.57),
        "1 Galón / 5L": ("012MN9930-01", 2.78), # 100ml
    },
    # Abro Refrigerante Rojo
    "LP-ABR-004": {
        "1 Litro": ("102EC-502LT", 1.35),
        "1 Galón": ("102EC-502", 3.13),
    },
    # Abro Refrigerante Verde
    "LP-ABR-005": {
        "1 Litro": ("102EC-503LT", 1.35),
        "1 Galón": ("102EC-503", 3.13),
    },
}

fix_count = 0
for p in products:
    p_sku = p["sku"]
    if p_sku in EXACT_VARIANT_FIXES:
        fixes = EXACT_VARIANT_FIXES[p_sku]
        print(f"\nApplying targeted variant fix for {p_sku} - {p['name']}:")
        variants = p.get("variants") or []
        for v in variants:
            pres = v.get("presentation")
            if pres in fixes:
                new_sku, new_price = fixes[pres]
                old_price = v.get("price")
                v["officialSku"] = new_sku
                v["price"] = new_price
                v["priceEstimate"] = f"${new_price:.2f}" if new_price is not None else "Consultar en mostrador"
                print(f"  * {pres}: {old_price} -> {v['priceEstimate']} (SKU: {new_sku})")
                fix_count += 1
        
        # Adjust presentation label for LP-MAN-033 and LP-MAN-034 if needed
        if p_sku == "LP-MAN-033":
            for v in variants:
                if v.get("presentation") == "1 Galón / 5L":
                    v["presentation"] = "1 Litro"
                    v["name"] = p["name"] + " (1 Litro)"
        elif p_sku == "LP-MAN-034":
            for v in variants:
                if v.get("presentation") == "1 Galón / 5L":
                    v["presentation"] = "100 ml"
                    v["name"] = p["name"] + " (100 ml)"
        elif p_sku == "LP-MAN-008":
            for v in variants:
                if v.get("presentation") == "1 Galón / 5L":
                    v["presentation"] = "4.5 Kg"
                    v["name"] = p["name"] + " (4.5 Kg)"
                elif v.get("presentation") == "Caneca 5 GL":
                    v["presentation"] = "Caneca 18 Kg"
                    v["name"] = p["name"] + " (Caneca 18 Kg)"

        # Update main product price
        # For lubricants, if 1 Litro has price, use 1 Litro; if not, use the available variant with price
        first_valid = next((v for v in variants if v.get("price") is not None), None)
        if first_valid:
            p["price"] = first_valid["price"]
            p["priceEstimate"] = first_valid["priceEstimate"]
        else:
            p["price"] = None
            p["priceEstimate"] = "Consultar en mostrador"

print(f"\nApplied {fix_count} variant fixes!")

# Also verify ALL other products with variants to ensure 1L < Galón < Caneca
inconsistent_count = 0
for p in products:
    variants = p.get("variants") or []
    if len(variants) > 1:
        priced_vars = [v for v in variants if v.get("price") is not None]
        for i in range(len(priced_vars) - 1):
            v1 = priced_vars[i]
            v2 = priced_vars[i+1]
            # If v1 is smaller presentation than v2 but v1.price >= v2.price
            p1 = v1.get("presentation", "")
            p2 = v2.get("presentation", "")
            if ("1 Litro" in p1 or "Cuarto" in p1 or "450" in p1 or "250" in p1) and ("Galón" in p2 or "Caneca" in p2):
                if v1["price"] >= v2["price"]:
                    print(f"WARNING: Inconsistency in {p['sku']} {p['name']}: {p1} (${v1['price']}) >= {p2} (${v2['price']})")
                    inconsistent_count += 1

print(f"Remaining variant inconsistencies: {inconsistent_count}")

# Save back to src/data/products.ts
header_ts = text[:text.index("export const PRODUCTS: Product[] = ")]
new_content = header_ts + "export const PRODUCTS: Product[] = " + json.dumps(products, ensure_ascii=False, indent=2) + ";\n"

with open(PRODUCTS_PATH, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"SUCCESS: src/data/products.ts written cleanly!")
