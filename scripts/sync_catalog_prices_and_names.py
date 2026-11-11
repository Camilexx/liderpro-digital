import openpyxl
import json
import re
import difflib

EXCEL_PATH = r"C:/Users/PC/.gemini/antigravity/brain/bbbff1a7-d87f-4f17-a9de-dc3f94a57663/.user_uploaded/media_1794369577912_28dd75af.xlsx"
PRODUCTS_PATH = r"C:/Users/PC/Desktop/NEXUS/liderpro-digital/src/data/products.ts"
REPORT_JSON_PATH = r"C:/Users/PC/Desktop/NEXUS/liderpro-digital/scripts/price_sync_audit_report.json"

wb = openpyxl.load_workbook(EXCEL_PATH, data_only=True)
ws = wb.active

excel_items = []
for r in range(8, ws.max_row + 1):
    art = ws.cell(r, 3).value
    nom = ws.cell(r, 4).value
    pventa = ws.cell(r, 6).value
    # NOTE: Column 5 (Costo) is strictly ignored and NEVER read or exported for Zero-Trust security
    if art or nom:
        sku_str = str(art).strip() if art else ""
        nom_str = str(nom).strip() if nom else ""
        pv_val = round(float(pventa), 2) if (pventa is not None and str(pventa).strip() != "") else None
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

def detect_pres_type(name_or_pres, sku=""):
    u = name_or_pres.upper()
    s = sku.upper()
    if re.search(r'\b20/1\s*CAN\b|\bCAN\s*20/1\s*LT\b|\bCAN\s*5\s*GL\b|\bCAN\s*5GL\b|\bCANECA\b|\b5\s*GAL\b|\b20\s*L|\b19\s*L|\b5/1\s*GL\b|\bCAN\s*5/1\b|\b18\s*KG\b|\b16\s*KG\b|\b16X1\s*KG\b', u) or s.endswith('-20') or s.endswith('-20A'):
        return 'caneca'
    if re.search(r'\b2\.5\s*GL\b|\bMEDIA\s*CANECA\b|\b2\.5/1\b|\bCAN\s*10\s*LT\b|\b10\s*L', u) or s.endswith('-10A'):
        return 'media_caneca'
    if re.search(r'\b4/5\s*LT\b|\b4/5LT\b|\b4/1\s*GL\b|\b6/1\s*GL\b|\b3/1\s*GL\b|\bGALON\b|\bGALÓN\b|\b1\s*GL\b|\b4\s*L|\b5\s*L|\b4\.5\s*KG\b', u) or s.endswith('-4') or s.endswith('-4A') or s.endswith('-5') or s.endswith('-5A'):
        return 'galon'
    if re.search(r'\b12/1\s*LT\b|\b20/1\s*LT\b|\b20/1\s*UND\b|\b1\s*LT\b|\b1\s*LITRO\b|\bLITRO\b|\bCUARTO\b|\b946\s*ML\b', u) or s.endswith('-1') or s.endswith('-1A'):
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

# Helper to create human-friendly adult-optimized product names
ABBREV_MAP = [
    (r'\bCH\b', 'Chevrolet'),
    (r'\bCHEV\b', 'Chevrolet'),
    (r'\bHY\b', 'Hyundai'),
    (r'\bHDY\b', 'Hyundai'),
    (r'\bTY\b', 'Toyota'),
    (r'\bTOY\b', 'Toyota'),
    (r'\bNS\b', 'Nissan'),
    (r'\bMZ\b', 'Mazda'),
    (r'\bFD\b', 'Ford'),
    (r'\bMT\b', 'Mitsubishi'),
    (r'\bSZ\b', 'Suzuki'),
    (r'\bVW\b', 'Volkswagen'),
    (r'\bSK\b', 'Skoda'),
    (r'\bRN\b', 'Renault'),
    (r'\bPG\b', 'Peugeot'),
    (r'\bG\.?\s*VITARA\b', 'Grand Vitara'),
    (r'\bDMAX\b', 'D-Max'),
    (r'\bBT50\b', 'BT-50'),
    (r'\bCRDI\b', 'CRDi'),
    (r'\bGAS\.\b', 'Gasolina'),
    (r'\bCOMB\.\b', 'Combustible'),
    (r'\bHIDR\.\b', 'Hidráulico'),
]

def humanize_product_name(p):
    raw = p.get("rawErpName") or p["name"]
    cat = p["category"]
    brand = p["brand"]
    sku = p["sku"]

    # Clean quotes and extra spaces
    s = re.sub(r'["\']', '', raw).strip()
    # Remove packaging prefixes like CJ X 4 GL, CJ X 12/1 LT, etc.
    s = re.sub(r'\bCJ\s*X\s*\d+\s*(GL|LT|UND|CAN)?\b', '', s, flags=re.IGNORECASE)
    s = re.sub(r'\b(12/1\s*LT|20/1\s*LT|4/5\s*LT|4/5LT|4/1\s*GL|6/1\s*GL|3/1\s*GL|20/1\s*CAN|CAN\s*20/1\s*LT|CAN\s*5\s*GL|CAN\s*5GL|20/1\s*UND)\b', '', s, flags=re.IGNORECASE)
    s = re.sub(r'\s+', ' ', s).strip()

    if cat == "baterias":
        # e.g. BATERIA ECUADOR 24 HP I HIGH POWER 85 AMP -> Batería Ecuador 24 HP Invertida (85 Amp)
        s_up = s.upper()
        amp_match = re.search(r'(\d+)\s*AMP', s_up)
        amp_str = f"{amp_match.group(1)} Amp" if amp_match else ""
        is_inv = bool(re.search(r'\b(HP\s*I|FE\s*I|MP\s*I|NS40\s*FE\s*I|N40\s*FE\s*I|N40\s*HP\s*I|34\s*R|27\s*R)\b', s_up))
        pol_str = "Borne Izquierdo (I)" if is_inv else "Borne Estándar"
        if "BOSCH" in brand.upper():
            # Extract model code like 42 HP S4, 24 HP S4, etc.
            m = re.sub(r'^BATERIA\s+BOSCH\s+', '', s_up)
            m = re.sub(r'\b\d{6}\b', '', m) # remove 6-digit bosch internal ref from title
            m = re.sub(r'\b\d+\s*AMP\b', '', m).strip()
            m = re.sub(r'\s+', ' ', m)
            return f"Batería Bosch {m}" + (f" ({amp_str})" if amp_str else "")
        else:
            m = re.sub(r'^BATERIA\s+ECUADOR\s+', '', s_up)
            m = re.sub(r'\b(HIGH POWER|FULL EQUIPO|SUPER HEAVY DUTY|MAXI POWER)\b', '', m)
            m = re.sub(r'\b\d+\s*AMP\b', '', m).strip()
            m = re.sub(r'\s+', ' ', m)
            line_name = "High Power Tapa Roja" if "HIGH POWER" in s_up else ("Full Equipo" if "FULL EQUIPO" in s_up else ("Super Heavy Duty" if "SUPER HEAVY" in s_up else "Maxi Power"))
            return f"Batería Ecuador {m} — {line_name}" + (f" ({amp_str})" if amp_str else "")

    if cat == "filtros":
        s_up = s.upper()
        # Determine filter type
        if "CABINA" in s_up or sku.upper().startswith("AC-") or "080AC" in sku.upper() or "078AC" in sku.upper():
            ftype = "Filtro de Cabina (A/C)"
        elif "AIRE" in s_up or sku.upper().startswith("AA-") or "080AA" in sku.upper() or "078AA" in sku.upper():
            ftype = "Filtro de Aire de Motor"
        elif "COMBUSTIBLE" in s_up or "DIESEL" in s_up or "GASOLINA" in s_up or "AFP" in sku.upper() or "AFE" in sku.upper():
            ftype = "Filtro de Combustible"
        else:
            ftype = "Filtro de Aceite"

        # Clean prefix
        body = re.sub(r'^FILTRO\s+(ADVANCE\s+)?(DE\s+)?(ACEITE|AIRE|CABINA|COMBUSTIBLE|GASOLINA|DIESEL)\s*', '', s_up)
        body = re.sub(r'\bADVANCE\b', '', body).strip(' -/,')
        for pat, rep in ABBREV_MAP:
            body = re.sub(pat, rep, body, flags=re.IGNORECASE)
        # Smart title case while keeping model codes uppercase
        words = []
        for w in body.split():
            if w.upper() in ["II", "III", "IV", "CRDI", "VVT", "GT", "LTZ", "SZ", "XL7", "IX", "TL", "NP300", "BT-50", "D-MAX", "L200", "ASX", "WRX", "VW", "MG", "JAC", "JMC", "KIA", "FTR", "NLR", "GH"]:
                words.append(w.upper())
            elif re.match(r'^[A-Z]{1,3}-\d+', w.upper()) or re.match(r'^\d', w):
                words.append(w.upper())
            else:
                words.append(w.capitalize())
        clean_body = " ".join(words)
        clean_code = sku.replace("080", "").replace("078", "")
        if clean_code.startswith("LP-"):
            return f"{ftype} Advance — {clean_body}"
        return f"{ftype} Advance ({clean_code}) — {clean_body}"

    # Lubricants, refrigerantes, aditivos, bujias, frenos
    for pat, rep in ABBREV_MAP:
        s = re.sub(pat, rep, s, flags=re.IGNORECASE)

    # Viscosities formatting: 10W40 -> 10W-40, 5W30 -> 5W-30, 15W40 -> 15W-40, 20W50 -> 20W-50, 25W60 -> 25W-60, 75W90 -> 75W-90, 80W90 -> 80W-90, 85W140 -> 85W-140
    s = re.sub(r'\b(0W|5W|10W|15W|20W|25W|75W|80W|85W)(\d{2,3})\b', r'\1-\2', s, flags=re.IGNORECASE)

    words = []
    keep_upper = {"MANNOL", "MOBIL", "MOTUL", "VALVOLINE", "AROIL", "AMALIE", "ABRO", "NGK", "DENSO", "ATE", "BOSCH", "SAE", "API", "ACEA", "OEM", "SHPD", "UHPD", "STOU", "ISO", "ATF", "CVT", "DCT", "MTF-3", "LSD", "FWD", "TDI", "TS-4", "TS-5", "GL-4", "GL-5", "CI-4", "CK-4", "CH-4", "CF-4", "CF", "SP", "SN", "SL", "DOT", "OAT", "AG11", "AF12+", "AG13", "UV3", "PVC", "4T", "2T", " JP", "ULV"}
    for w in s.split():
        wu = w.upper().strip(",.")
        if wu in keep_upper or re.match(r'^\d+W-\d+$', wu) or re.match(r'^[A-Z]+-\d+$', wu):
            words.append(w.upper())
        else:
            words.append(w.capitalize())
    res = " ".join(words)
    res = re.sub(r'\bAnos\b|\bAÑos\b', 'Años', res)
    res = re.sub(r'\bUtil\b', 'Útil', res)
    res = re.sub(r'\bSintetico\b', 'Sintético', res)
    res = re.sub(r'\bDiesel\b', 'Diésel', res)
    res = re.sub(r'\bHidraulico\b', 'Hidráulico', res)
    res = re.sub(r'\bTransmision\b', 'Transmisión', res)
    res = re.sub(r'\bBateria\b', 'Batería', res)
    res = re.sub(r'\bBujia\b', 'Bujía', res)
    res = re.sub(r'\bLiquido\b', 'Líquido', res)
    return res

matched_excel_skus = set()
unmatched_catalog_products = []
catalog_with_null_excel_price = []
updated_products_count = 0
updated_variants_count = 0

for p in products:
    if "rawErpName" not in p:
        p["rawErpName"] = p["name"]

    psku = p["sku"].strip()
    psku_u = psku.upper()
    pname_u = norm_text(p["rawErpName"])
    brand_u = p["brand"].upper()

    matched_list = []

    if psku_u in excel_by_sku:
        matched_list = [excel_by_sku[psku_u]]
    elif f"080{psku_u}" in excel_by_sku:
        matched_list = [excel_by_sku[f"080{psku_u}"]]
    elif f"FILTRO AIRE 080{psku_u}" in excel_by_sku:
        matched_list = [excel_by_sku[f"FILTRO AIRE 080{psku_u}"]]
    elif psku_u == "AA-54" and "080AA-54661" in excel_by_sku:
        matched_list = [excel_by_sku["080AA-54661"]]
    elif psku_u == "080AC-4426" and "080AC-18120" in excel_by_sku:
        matched_list = [excel_by_sku["080AC-18120"]]
    else:
        if p["category"] == "filtros":
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
            for it in excel_items:
                if "BATERIA" in it["name"].upper() and norm_text(it["name"]) == pname_u:
                    matched_list = [it]
                    break
        else:
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

    # Humanize product name and build searchKeywords
    clean_title = humanize_product_name(p)
    p["name"] = clean_title

    # Map prices to variants and main product
    if matched_list:
        for m in matched_list:
            matched_excel_skus.add(m["sku"].upper())

        # Build lookup by presentation type from matched_list
        pres_price_map = {}
        for m in matched_list:
            pt = detect_pres_type(m["name"], m["sku"])
            if m["pventa"] is not None:
                pres_price_map[pt] = (m["pventa"], m["sku"])

        # Update variants if present
        if p.get("variants") and len(p["variants"]) > 0:
            for v in p["variants"]:
                v_pt = detect_pres_type(v.get("presentation", "") + " " + v.get("name", ""), v.get("sku", ""))
                chosen = None
                if v_pt in pres_price_map:
                    chosen = pres_price_map[v_pt]
                elif len(matched_list) == 1 and matched_list[0]["pventa"] is not None:
                    chosen = (matched_list[0]["pventa"], matched_list[0]["sku"])
                elif pres_price_map:
                    # Fallback by order: litro -> galon -> media_caneca -> caneca
                    chosen = list(pres_price_map.values())[0]

                v["name"] = f"{clean_title} ({v['presentation']})"
                if chosen:
                    v["price"] = chosen[0]
                    v["priceEstimate"] = f"${chosen[0]:.2f}"
                    v["officialSku"] = chosen[1]
                    updated_variants_count += 1
                else:
                    v["price"] = None
                    v["priceEstimate"] = None

            # Set main product price from the first variant (or lowest presentation) that has a price
            first_priced_var = next((v for v in p["variants"] if v.get("price") is not None), None)
            if first_priced_var:
                p["price"] = first_priced_var["price"]
                p["priceEstimate"] = first_priced_var["priceEstimate"]
                updated_products_count += 1
            else:
                p["price"] = None
                p["priceEstimate"] = None
                catalog_with_null_excel_price.append({
                    "sku": p["sku"],
                    "name": p["name"],
                    "excel_matches": [m["sku"] for m in matched_list]
                })
        else:
            # Single presentation product
            p_pt = detect_pres_type((p.get("volume") or "") + " " + p["rawErpName"], p["sku"])
            chosen = None
            if p_pt in pres_price_map:
                chosen = pres_price_map[p_pt]
            elif matched_list[0]["pventa"] is not None:
                chosen = (matched_list[0]["pventa"], matched_list[0]["sku"])
            elif pres_price_map:
                chosen = list(pres_price_map.values())[0]

            if chosen:
                p["price"] = chosen[0]
                p["priceEstimate"] = f"${chosen[0]:.2f}"
                updated_products_count += 1
            else:
                p["price"] = None
                p["priceEstimate"] = None
                catalog_with_null_excel_price.append({
                    "sku": p["sku"],
                    "name": p["name"],
                    "excel_matches": [m["sku"] for m in matched_list]
                })
    else:
        p["price"] = None
        p["priceEstimate"] = None
        unmatched_catalog_products.append({
            "sku": p["sku"],
            "brand": p["brand"],
            "name": p["name"],
            "rawErpName": p["rawErpName"]
        })

# Now rewrite src/data/products.ts with updated TypeScript interface and JSON array
header_ts = p_text[:p_text.index("export const PRODUCTS: Product[] = ")]
# Ensure ProductVariant and Product interfaces include price, priceEstimate, officialSku, rawErpName
if "price?: number | null;" not in header_ts:
    header_ts = header_ts.replace(
        "  barcode?: string;\n}",
        "  barcode?: string;\n  price?: number | null;\n  priceEstimate?: string | null;\n  officialSku?: string;\n}"
    )
    header_ts = header_ts.replace(
        "  priceEstimate?: string | null;",
        "  price?: number | null;\n  priceEstimate?: string | null;\n  rawErpName?: string;"
    )

new_ts_content = header_ts + "export const PRODUCTS: Product[] = " + json.dumps(products, ensure_ascii=False, indent=2) + ";\n"
with open(PRODUCTS_PATH, "w", encoding="utf-8") as f:
    f.write(new_ts_content)

unregistered_excel_items = [it for it in excel_items if it["sku"].upper() not in matched_excel_skus]
excel_null_price_items = [it for it in excel_items if it["pventa"] is None]

report = {
    "total_catalog_products": len(products),
    "matched_catalog_products": len(products) - len(unmatched_catalog_products),
    "updated_products_with_price": updated_products_count,
    "updated_variants_with_price": updated_variants_count,
    "catalog_items_with_null_excel_price": catalog_with_null_excel_price,
    "catalog_items_not_in_excel": unmatched_catalog_products,
    "total_excel_rows": len(excel_items),
    "excel_skus_matched_to_catalog": len(matched_excel_skus),
    "excel_skus_unregistered_in_catalog_count": len(unregistered_excel_items),
    "excel_skus_unregistered_in_catalog": unregistered_excel_items,
    "excel_rows_without_pventa_count": len(excel_null_price_items),
    "excel_rows_without_pventa": excel_null_price_items,
}

with open(REPORT_JSON_PATH, "w", encoding="utf-8") as f:
    json.dump(report, f, ensure_ascii=False, indent=2)

print(f"SUCCESS! Updated {updated_products_count} products and {updated_variants_count} variants with official PVP prices.")
print(f"Catalog items matched to Excel: {report['matched_catalog_products']} / {report['total_catalog_products']}")
print(f"Catalog items where Excel had empty price: {len(catalog_with_null_excel_price)}")
print(f"Catalog items not found in Excel: {len(unmatched_catalog_products)}")
print(f"Excel SKUs NOT registered in catalog (reported only, NOT added): {len(unregistered_excel_items)}")
