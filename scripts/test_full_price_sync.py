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

excel_by_sku = {it["sku"].upper(): it for it in excel_items}

def norm_text(s):
    s = s.upper()
    s = re.sub(r'["\'\t\r\n]', ' ', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

def detect_pres_type(excel_name, excel_sku):
    u = excel_name.upper()
    s = excel_sku.upper()
    if re.search(r'\b20/1\s*CAN\b|\bCAN\s*20/1\s*LT\b|\bCAN\s*5\s*GL\b|\bCAN\s*5GL\b|\bCANECA\s*5\b|\b5/1\s*GL\b|\bCAN\s*5/1\b|\b18\s*KG\b|\b16\s*KG\b|\b16X1\s*KG\b', u) or s.endswith('-20') or s.endswith('-20A'):
        return 'caneca'
    if re.search(r'\b2\.5\s*GL\b|\bMEDIA\s*CANECA\b|\b2\.5/1\b|\bCAN\s*10\s*LT\b', u) or s.endswith('-10A'):
        return 'media_caneca'
    if re.search(r'\b4/5\s*LT\b|\b4/5LT\b|\b4/1\s*GL\b|\b6/1\s*GL\b|\b3/1\s*GL\b|\bGALON\b|\b1\s*GL\b|\b4\.5\s*KG\b', u) or s.endswith('-4') or s.endswith('-4A') or s.endswith('-5') or s.endswith('-5A'):
        return 'galon'
    if re.search(r'\b12/1\s*LT\b|\b20/1\s*LT\b|\b20/1\s*UND\b|\b1\s*LT\b|\bLITRO\b|\bCUARTO\b', u) or s.endswith('-1') or s.endswith('-1A'):
        return 'litro'
    if '800 GR' in u or '800 GRS' in u:
        return '800g'
    if '450 ML' in u or '450ML' in u:
        return '450ml'
    if '250 ML' in u or '250ML' in u:
        return '250ml'
    if '100 ML' in u or '100ML' in u:
        return '100ml'
    return 'single'

# Let's match every product in products.ts to excel_items
matched_excel_skus = set()
unmatched_catalog_products = []
matched_catalog_summary = []

for p in products:
    psku = p["sku"].strip()
    psku_u = psku.upper()
    pname_u = norm_text(p["name"])
    brand_u = p["brand"].upper()

    matched_list = []

    # 1. Exact SKU match
    if psku_u in excel_by_sku:
        matched_list = [excel_by_sku[psku_u]]
    # 2. Prefix 080 or FILTRO AIRE on AA- / AO- / AC-
    elif f"080{psku_u}" in excel_by_sku:
        matched_list = [excel_by_sku[f"080{psku_u}"]]
    elif f"FILTRO AIRE 080{psku_u}" in excel_by_sku:
        matched_list = [excel_by_sku[f"FILTRO AIRE 080{psku_u}"]]
    elif psku_u == "AA-54" and "080AA-54661" in excel_by_sku:
        matched_list = [excel_by_sku["080AA-54661"]]
    else:
        # Match by product name / family
        if p["category"] == "filtros":
            # Look for exact or close filter name match
            best_it = None
            best_score = 0
            for it in excel_items:
                if "FILTRO" not in it["name"].upper():
                    continue
                it_u = norm_text(it["name"])
                if it_u == pname_u or pname_u in it_u or it_u in pname_u:
                    best_it = it
                    best_score = 1.0
                    break
                score = difflib.SequenceMatcher(None, pname_u, it_u).ratio()
                if score > best_score:
                    best_score = score
                    best_it = it
            if best_it and best_score >= 0.78:
                matched_list = [best_it]
        elif p["category"] == "baterias":
            # Check battery name match
            for it in excel_items:
                if "BATERIA" in it["name"].upper() and norm_text(it["name"]) == pname_u:
                    matched_list = [it]
                    break
        else:
            # Lubricants, refrigerantes, aditivos
            # Let's use explicit rules + token matching
            for it in excel_items:
                it_u = norm_text(it["name"])
                it_sku = it["sku"].upper()
                if brand_u == "MANNOL" and "MANNOL" in it_u:
                    if "REFRIGERANTE AZUL" in pname_u and "REFRIGERANTE AZUL" in it_u: matched_list.append(it)
                    elif "REFRIGERANTE ROJO" in pname_u and "REFRIGERANTE ROJO" in it_u: matched_list.append(it)
                    elif "REFRIGERANTE VERDE" in pname_u and "REFRIGERANTE VERDE" in it_u: matched_list.append(it)
                    elif "REFRIGERANTE NARANJA" in pname_u and "REFRIGERANTE NARANJA" in it_u: matched_list.append(it)
                    elif "TS-4" in pname_u and "TS-4" in it_u: matched_list.append(it)
                    elif "SAFARI" in pname_u and "SAFARI" in it_u: matched_list.append(it)
                    elif "CLASSIC 10W40" in pname_u and "CLASSIC 10W40" in it_u: matched_list.append(it)
                    elif "SPECIAL PLUS 10W30" in pname_u and "SPECIAL PLUS 10W30" in it_u: matched_list.append(it)
                    elif "CHEVROLET OPEL" in pname_u and "CHEVROLET OPEL" in it_u: matched_list.append(it)
                    elif "TOYOTA LEXUS" in pname_u and "TOYOTA LEXUS" in it_u: matched_list.append(it)
                    elif "HYUNDAI KIA" in pname_u and "HYUNDAI KIA" in it_u: matched_list.append(it)
                    elif "CERAMIC 5W30" in pname_u and "CERAMIC 5W30" in it_u: matched_list.append(it)
                    elif "CERAMIC PRO" in pname_u and "CERAMIC PRO" in it_u: matched_list.append(it)
                    elif "4TAKT MOTORBIKE 10W40" in pname_u and "4TAKT MOTORBIKE 10W40" in it_u: matched_list.append(it)
                    elif "4TAKT MOTORBIKE 10W50" in pname_u and "4TAKT MOTORBIKE 10W50" in it_u: matched_list.append(it)
                    elif "POWERBIKE 15W50" in pname_u and "POWERBIKE 15W50" in it_u: matched_list.append(it)
                    elif "DIESEL TURBO 5W40" in pname_u and "DIESEL TURBO 5W40" in it_u: matched_list.append(it)
                    elif "ENERGY ULTRA JP 5W20" in pname_u and "ENERGY ULTRA JP 5W20" in it_u: matched_list.append(it)
                    elif "DIESEL TDI 5W30" in pname_u and "DIESEL TDI 5W30" in it_u: matched_list.append(it)
                    elif "ENERGY FORMULA JP 5W30" in pname_u and "ENERGY FORMULA JP 5W30" in it_u: matched_list.append(it)
                    elif "FOR CHINESE CARS 5W30" in pname_u and "FOR CHINESE CARS 5W30" in it_u: matched_list.append(it)
                    elif "FWD 75W85" in pname_u and "FWD 75W85" in it_u: matched_list.append(it)
                    elif "HYPOID LSD 85W140" in pname_u and "HYPOID LSD 85W140" in it_u: matched_list.append(it)
                    elif "HYPOID GETRIEBEOEL 80W90" in pname_u and "HYPOID GETRIEBEOEL 80W90" in it_u: matched_list.append(it)
                    elif "UNIVERSAL GETRIEBEOEL 80W90" in pname_u and "UNIVERSAL GETRIEBEOEL 80W90" in it_u: matched_list.append(it)
                    elif "BASIC PLUS 75W90" in pname_u and "BASIC PLUS 75W90" in it_u: matched_list.append(it)
                    elif "MTF-3 75W" in pname_u and "MTF-3 75W" in it_u: matched_list.append(it)
                    elif "DCT FLUID" in pname_u and "DCT FLUID" in it_u: matched_list.append(it)
                    elif "ATF DEXRON III" in pname_u and "ATF DEXRON III" in it_u: matched_list.append(it)
                    elif "ATF DEXRON VI" in pname_u and "ATF DEXRON VI" in it_u: matched_list.append(it)
                    elif "CVT NISSAN NS-3" in pname_u and "CVT NISSAN NS-3" in it_u: matched_list.append(it)
                    elif "ATF ULV" in pname_u and "ATF ULV" in it_u: matched_list.append(it)
                    elif "HYDRO HV ISO 32" in pname_u and "HYDRO HV ISO 32" in it_u: matched_list.append(it)
                    elif "HYDRO HV ISO 46" in pname_u and "HYDRO HV ISO 46" in it_u: matched_list.append(it)
                    elif "HYDRO HV ISO 68" in pname_u and "HYDRO HV ISO 68" in it_u: matched_list.append(it)
                    elif "MULTIFARM STOU" in pname_u and "MULTIFARM STOU" in it_u: matched_list.append(it)
                    elif "MOLIBDEN GREEN ULTRA" in pname_u and "MOLIBDEN GREEN ULTRA" in it_u: matched_list.append(it)
                    elif "TS-5 UHPD 10W40" in pname_u and "TS-5 UHPD 10W40" in it_u: matched_list.append(it)
                    # Mannol Additives
                    elif "ESTER ADDITIVE / TRATAMIENTO DE ACEITE" in pname_u and "ESTER ADDITIVE / TRATAMIENTO DE ACEITE" in it_u: matched_list.append(it)
                    elif "DIESEL ESTER ADDITIVE" in pname_u and "DIESEL ESTER ADDITIVE" in it_u: matched_list.append(it)
                    elif "GRASA LC-2 ALTA TEMPERATURA 4.5 KG" in pname_u and it_sku in ["012MN8029-08", "012MN8029", "012MN8116"]: matched_list.append(it)
                    elif "GRASA LC-2 ALTA TEMPERATURA 18 KG" in pname_u and it_sku == "012MN8116": matched_list.append(it)
                    elif "GRASA DE LITIO MULTIUSO 800 GRS" in pname_u and it_sku == "012MN8028-08": matched_list.append(it)
                    elif "COCKPIT CARE APPLE" in pname_u and "APPLE" in it_u: matched_list.append(it)
                    elif "COCKPIT CARE VAINILLA" in pname_u and "VAINILLA" in it_u: matched_list.append(it)
                    elif pname_u == it_u or pname_u in it_u or it_u in pname_u:
                        matched_list.append(it)
                elif brand_u == "MOBIL" and "MOBIL" in it_u:
                    if "DELVAC MX 15W40" in pname_u and "DELVAC MX 15W40" in it_u: matched_list.append(it)
                    elif "DELVAC 1300" in pname_u and "DELVAC 1300" in it_u: matched_list.append(it)
                    elif "10W30" in pname_u and "10W30" in it_u: matched_list.append(it)
                    elif "20W50" in pname_u and "20W50" in it_u: matched_list.append(it)
                elif brand_u == "AMALIE" and "AMALIE" in it_u:
                    if "10W30" in pname_u and "10W30" in it_u: matched_list.append(it)
                    elif "20W50" in pname_u and "20W50" in it_u: matched_list.append(it)
                elif brand_u == "MOTUL" and "MOTUL" in it_u:
                    if "10W40" in pname_u and "10W40" in it_u: matched_list.append(it)
                    elif "15W50" in pname_u and "15W50" in it_u: matched_list.append(it)
                    elif "20W50" in pname_u and "20W50" in it_u: matched_list.append(it)
                elif brand_u == "VALVOLINE" and ("VALVOLINE" in it_u or "VALVODIESEL" in it_u):
                    if "15W40" in pname_u and "15W40" in it_u: matched_list.append(it)
                    elif "20W50" in pname_u and "20W50" in it_u: matched_list.append(it)
                    elif "10W30" in pname_u and "10W30" in it_u: matched_list.append(it)
                elif brand_u == "AROIL" and "AROIL" in it_u:
                    if "RACING 10W30" in pname_u and "RACING 10W30" in it_u: matched_list.append(it)
                    elif "RACING 20W50" in pname_u and "RACING 20W50" in it_u: matched_list.append(it)
                    elif "SUPER 40" in pname_u and "SUPER 40" in it_u: matched_list.append(it)
                    elif "15W40 CI-4" in pname_u and "15W40 CI-4" in it_u: matched_list.append(it)
                    elif "25W60 CF" in pname_u and "25W60 CF" in it_u: matched_list.append(it)
                    elif "DIESEL 40 CF" in pname_u and "DIESEL 40 CF" in it_u: matched_list.append(it)
                    elif "4T 20W50" in pname_u and "4T 20W50" in it_u: matched_list.append(it)
                    elif "75W85" in pname_u and "75W85" in it_u: matched_list.append(it)
                    elif "80W90" in pname_u and "80W90" in it_u: matched_list.append(it)
                    elif "85W140" in pname_u and "85W140" in it_u: matched_list.append(it)
                    elif "90 GL-4" in pname_u and "90 GL-4" in it_u and "80W" not in it_u and "140" not in it_u: matched_list.append(it)
                    elif "140 GL-4" in pname_u and "140 GL-4" in it_u and "85W" not in it_u: matched_list.append(it)
                    elif "ATF DIII" in pname_u and "ATF DIII" in it_u: matched_list.append(it)
                    elif "AW ISO 68 ROJO" in pname_u and it_sku == "0368AR50006": matched_list.append(it)
                    elif "TRACFLUID 10W30" in pname_u and "TRACFLUID" in it_u: matched_list.append(it)
                    elif "ISO 68 AMBAR" in pname_u and "ISO 68 AMBAR" in it_u: matched_list.append(it)
                elif brand_u == "ABRO" and "ABRO" in it_u:
                    if "AB-404" in pname_u and "AB-404" in it_u: matched_list.append(it)
                    elif "AB-80" in pname_u and "AB-80" in it_u: matched_list.append(it)
                    elif "REFRIGERANTE ROJO" in pname_u and "REFRIGERANTE ROJO" in it_u: matched_list.append(it)
                    elif "REFRIGERANTE VERDE" in pname_u and "REFRIGERANTE VERDE" in it_u: matched_list.append(it)
                    elif "LG-990" in pname_u and "LG-990" in it_u: matched_list.append(it)
                    elif "SS-822" in pname_u and "SS-822" in it_u: matched_list.append(it)
                    elif "TAIPE" in pname_u and "TAIPE" in it_u: matched_list.append(it)
                    elif "TRANSPARENTE" in pname_u and "TRANSPARENTE" in it_u: matched_list.append(it)
                elif ("SIMONIZ" in brand_u or "AREON" in brand_u) and ("SIMONIZ" in it_u or "AREON" in it_u):
                    if "CHICLE" in pname_u and "CHICLE" in it_u: matched_list.append(it)
                    elif "CITRUS" in pname_u and "CITRUS" in it_u: matched_list.append(it)
                    elif "FRESA" in pname_u and "FRESA" in it_u: matched_list.append(it)
                    elif "PICADURA TABACO" in pname_u and "PICADURA TABACO" in it_u: matched_list.append(it)
                    elif "CARRO NUEVO" in pname_u and "CARRO NUEVO" in it_u: matched_list.append(it)
                    elif "CERA 300GR" in pname_u and "CERA 300GR" in it_u: matched_list.append(it)
                    elif "BLACK CRYSTAL" in pname_u and "BLACK CRYSTAL" in it_u: matched_list.append(it)
                    elif "NEW CAR" in pname_u and "NEW CAR" in it_u: matched_list.append(it)
                    elif "MON DISPLAY" in pname_u and "MON DISPLAY" in it_u: matched_list.append(it)

    if matched_list:
        for m in matched_list:
            matched_excel_skus.add(m["sku"].upper())
        matched_catalog_summary.append((p, matched_list))
    else:
        unmatched_catalog_products.append(p)

print(f"Catalog products matched to Excel: {len(matched_catalog_summary)} / {len(products)}")
print(f"Catalog products NOT in Excel: {len(unmatched_catalog_products)}")
for up in unmatched_catalog_products:
    print(f"  Catalog item not in Excel: {up['sku']:<15} | {up['brand']:<12} | {up['name']}")

unregistered_excel_items = [it for it in excel_items if it["sku"].upper() not in matched_excel_skus]
print(f"\nExcel SKUs covered by catalog: {len(matched_excel_skus)} / {len(excel_items)}")
print(f"Excel SKUs NOT registered in catalog: {len(unregistered_excel_items)}")
