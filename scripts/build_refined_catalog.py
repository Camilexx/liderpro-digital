import json
import zipfile
import os
import re
import io
import sys
from PIL import Image

xlsx_path = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx'
inv_xlsx = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO.xlsx'
output_img_dir = r'public/images/products'

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

sheet_rows = full_data['sheet_rows']
inv_items = full_data['inventory_items']
inv_by_sku = {it['sku'].upper(): it for it in inv_items}

def clean_sku(s):
    return re.sub(r'[^a-zA-Z0-9_\-]', '_', s.strip())

def make_slug(s):
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')

def clean_display_name(raw_name, brand):
    name = raw_name
    # Remove packaging artifacts from title
    name = re.sub(r'\bCJ\s*X\s*\d+\s*(?:LT|UND|LTS)\b', '', name, flags=re.I)
    name = re.sub(r'\b(?:12/1|20/1|4/1|6/1|3/1|4/5)\s*(?:LT|GL|CAN|LTS)?\b', '', name, flags=re.I)
    name = re.sub(r'\b(?:CAN\s*5/1|CAN\s*5GL|BLD\s*CAN\s*5|CAN\s*2\.5|CAN\s*20/1|CAN\s*10|CAN\s*5\s*GL)\b', '', name, flags=re.I)
    name = re.sub(r'[\"\t\r\n]', ' ', name)
    name = re.sub(r'\s+', ' ', name).strip()
    if name.upper().startswith(brand.upper()):
        name = name[len(brand):].strip()
    return f"{brand} {name}".strip()

def format_clean_badge(pres_name):
    if 'Caneca (20 Litros)' in pres_name:
        return 'Caneca 20L'
    if 'Caneca (5 Galones / 19L)' in pres_name:
        return 'Caneca 5 GL'
    if 'Media Caneca (2.5 Gal)' in pres_name:
        return 'Caneca 2.5 GL'
    if 'Caneca (10 Litros)' in pres_name:
        return 'Caneca 10L'
    if 'Bidón (5 Litros)' in pres_name:
        return 'Bidón 5L'
    if '1 Galón' in pres_name:
        return '1 Galón'
    if '1 Litro' in pres_name:
        return '1 Litro'
    if '1 Cuarto' in pres_name:
        return '1 Cuarto'
    if '16-18 kg' in pres_name or '18 KG' in pres_name:
        return 'Caneca 18 kg'
    if '4.5 kg' in pres_name:
        return '4.5 kg'
    if '800 g' in pres_name:
        return '800 g'
    if '400 g' in pres_name:
        return '400 g'
    if '230 g' in pres_name:
        return '230 g'
    if '85 g' in pres_name:
        return '85 g'
    if 'Libra' in pres_name:
        return '1 Libra'
    if '650 ml' in pres_name:
        return '650 ml'
    if '520 ml' in pres_name:
        return '520 ml'
    if '500 ml' in pres_name:
        return '500 ml'
    if '450 ml' in pres_name:
        return '450 ml'
    if '400 ml' in pres_name:
        return '400 ml'
    if '350 ml' in pres_name:
        return '350 ml'
    if '300 ml' in pres_name:
        return '300 ml'
    if '250 ml' in pres_name:
        return '250 ml'
    if '200 ml' in pres_name:
        return '200 ml'
    if '100 ml' in pres_name:
        return '100 ml'
    if '10 ml' in pres_name:
        return 'Gotero 10 ml'
    if '10 oz' in pres_name:
        return '10 oz'
    return pres_name

def cap_variants_to_3(item_variants):
    if len(item_variants) <= 3:
        return item_variants
    # When 4 variants exist, pick smallest, primary retail middle (Galón/5L), and largest industrial (Caneca)
    first = item_variants[0]
    last = item_variants[-1]
    middle = None
    for v in item_variants[1:-1]:
        if 'Galón' in v['presentation'] or '5L' in v['presentation'] or '4.5' in v['presentation']:
            middle = v
            break
    if not middle:
        middle = item_variants[1]
    return [first, middle, last]

def detect_presentation(item):
    name = item['name']
    name_u = name.upper()
    sku = item['sku'].upper()
    cost = item.get('cost', 0)
    
    # 1. 20 Litros (Caneca 20L)
    if re.search(r'\b20/1\s*CAN\b|\bCAN\s*20/1\s*LT\b|\b20\s*LTS?\b|\b20LT\b', name_u):
        if not (name_u.startswith('MANNOL CJ X 20') and (sku.endswith('-1') or sku.endswith('-1A') or cost < 15.0)):
            return 'Caneca 20L', 20.0
            
    # 2. 5 Galones / 19 Litros (Caneca 5 GL)
    if re.search(r'(?<![0-9\.])5\s*GL\b|CAN\s*5/1|\bCANECA\s*5\b|(?<![0-9\.])5/1\s*GL\b|BLD\s*CAN\s*5|CAN\s*5GL', name_u):
        if not re.search(r'2\.5\s*GL|2\.5/1\s*GL|\bMEDIA\s*CANECA\b', name_u):
            return 'Caneca 5 GL', 19.0
            
    # 3. Media Caneca 2.5 Galones (9.5 Litros)
    if re.search(r'2\.5\s*GL\b|2\.5/1\s*GL\b|\bMEDIA\s*CANECA\b|(?<![0-9\.])2\.5\b', name_u):
        return 'Caneca 2.5 GL', 9.5
        
    # 4. 10 Litros
    if re.search(r'\b10\s*LT\b|\b10LT\b|CAN\s*10\s*LT', name_u):
        return 'Caneca 10L', 10.0
        
    # 5. 5 Litros (Bidón)
    if re.search(r'4/5\s*LT\b|4/5LT\b|(?<![0-9\.])5\s*LT\b|(?<![0-9\.])5LT\b', name_u):
        return 'Bidón 5L', 5.0
        
    # 6. 1 Galón (3.78 Litros)
    if re.search(r'\b4/1\s*GL\b|\b6/1\s*GL\b|\b3/1\s*GL\b|(?<![0-9\.])1\s*GL\b|\b4\s*LT\b|\bGALON\b|\bGALONES\b', name_u):
        return '1 Galón', 3.78
        
    # 7. 1 Litro
    if re.search(r'\b12/1\s*LT\b|\b12/1\b|\b20/1\s*LT\b|(?<![0-9\.])1\s*LT\b|\b1LT\b|\bLITRO\b|\bLITROS\b', name_u) or sku.endswith('-1') or sku.endswith('-1A'):
        return '1 Litro', 1.0
        
    # 8. 1 Cuarto (946 ml)
    if 'CUARTO' in name_u:
        return '1 Cuarto', 0.946
        
    # 9. Greases
    if re.search(r'18\s*KG\b|16\s*KG\b|16X1\s*KG\b', name_u):
        return 'Caneca 18 kg', 18.0
    if re.search(r'4\.5\s*KG\b', name_u):
        return '4.5 kg', 4.5
    if re.search(r'800\s*GR\b|800\s*GRS\b', name_u):
        return '800 g', 0.8
    if re.search(r'400\s*GR\b|400GR\b', name_u):
        return '400 g', 0.4
    if re.search(r'230\s*GR\b|230GR\b', name_u):
        return '230 g', 0.23
    if re.search(r'85\s*GR\b|85GR\b', name_u):
        return '85 g', 0.085
    if re.search(r'1\s*LB\b|1LB\b', name_u):
        return '1 Libra', 0.45
        
    # 10. Chemicals & Sprays (ml)
    if re.search(r'650\s*ML\b|650ML\b', name_u):
        return '650 ml', 0.65
    if re.search(r'520\s*ML\b|520ML\b', name_u):
        return '520 ml', 0.52
    if re.search(r'500\s*ML\b|500ML\b', name_u):
        return '500 ml', 0.5
    if re.search(r'450\s*ML\b|450ML\b|450\s*GR\b', name_u):
        return '450 ml', 0.45
    if re.search(r'400\s*ML\b|400ML\b', name_u):
        return '400 ml', 0.4
    if re.search(r'350\s*ML\b|350ML\b', name_u):
        return '350 ml', 0.35
    if re.search(r'300\s*ML\b|300ML\b|300\s*GR\b|300GR\b', name_u):
        return '300 ml', 0.3
    if re.search(r'250\s*ML\b|250ML\b|250\s*CC\b', name_u):
        return '250 ml', 0.25
    if re.search(r'200\s*ML\b|200ML\b', name_u):
        return '200 ml', 0.2
    if re.search(r'100\s*ML\b|100ML\b', name_u):
        return '100 ml', 0.1
    if re.search(r'10\s*ML\b|10ML\b', name_u):
        return 'Gotero 10 ml', 0.01
    if re.search(r'10\s*OZ\b|10OZ\b', name_u):
        return '10 oz', 0.3
        
    return 'Estándar', 1.0
    if re.search(r'500\s*ML\b|500ML\b', name_u):
        return 'Spray 500 ml', 0.5
    if re.search(r'450\s*ML\b|450ML\b|450\s*GR\b', name_u):
        return 'Envase 450 ml', 0.45
    if re.search(r'400\s*ML\b|400ML\b', name_u):
        return 'Spray 400 ml', 0.4
    if re.search(r'350\s*ML\b|350ML\b', name_u):
        return 'Envase 350 ml', 0.35
    if re.search(r'300\s*ML\b|300ML\b|300\s*GR\b|300GR\b', name_u):
        return 'Envase 300 ml', 0.3
    if re.search(r'250\s*ML\b|250ML\b|250\s*CC\b', name_u):
        return 'Envase 250 ml', 0.25
    if re.search(r'200\s*ML\b|200ML\b', name_u):
        return 'Spray 200 ml', 0.2
    if re.search(r'100\s*ML\b|100ML\b', name_u):
        return 'Envase 100 ml', 0.1
    if re.search(r'10\s*ML\b|10ML\b', name_u):
        return 'Gotero 10 ml', 0.01
    if re.search(r'10\s*OZ\b|10OZ\b', name_u):
        return 'Aerosol 10 oz', 0.3
        
    return 'Presentación Estándar', 1.0

# Strict Sheet Matcher
def get_strict_matches(sheet_name, row):
    c1 = row['col1'].strip()
    c2 = row['col2'].strip()
    c2_u = c2.upper()
    
    # Direct SKU match
    if c1 and c1.upper() in inv_by_sku:
        return [inv_by_sku[c1.upper()]]
        
    # 1. FILTERS
    if 'FILTRO' in sheet_name.upper():
        for it in inv_items:
            it_name = it['name'].upper()
            if c2_u == it_name or it_name in c2_u or c2_u in it_name:
                return [it]
        c2_norm = re.sub(r'[^A-Z0-9]', '', c2_u)
        for it in inv_items:
            it_norm = re.sub(r'[^A-Z0-9]', '', it['name'].upper())
            if c2_norm in it_norm or it_norm in c2_norm:
                return [it]
        return []
        
    # 2. MOBIL
    if sheet_name == 'LURICANTE MOBIL':
        if 'DELVAC MX 15W40' in c2_u:
            return [it for it in inv_items if 'DELVAC MX 15W40' in it['name'].upper()]
        elif 'DELVAC 1300' in c2_u:
            return [it for it in inv_items if 'DELVAC 1300' in it['name'].upper()]
        elif '10W30' in c2_u:
            return [it for it in inv_items if 'MOBIL' in it['name'].upper() and '10W30' in it['name'].upper()]
        elif '20W50' in c2_u:
            return [it for it in inv_items if 'MOBIL' in it['name'].upper() and '20W50' in it['name'].upper()]
        return []

    # 3. AMALIE
    if sheet_name == 'LURICANTE AMALIE':
        if '10W30' in c2_u:
            return [it for it in inv_items if 'AMALIE' in it['name'].upper() and '10W30' in it['name'].upper()]
        elif '20W50' in c2_u:
            return [it for it in inv_items if 'AMALIE' in it['name'].upper() and '20W50' in it['name'].upper()]
        return []

    # 4. MOTUL
    if sheet_name == 'LURICANTE MOTUL':
        if '10W40' in c2_u:
            return [it for it in inv_items if '01001012' == it['sku']]
        elif '15W50' in c2_u:
            return [it for it in inv_items if '01098960' == it['sku']]
        elif '20W50' in c2_u:
            return [it for it in inv_items if '01099362' == it['sku']]
        return []

    # 5. VALVOLINE
    if sheet_name == 'LURICANTE VALVOLINE':
        if '15W40' in c2_u or 'VALVODIESEL' in c2_u:
            return [it for it in inv_items if '038LUB-D1540-0025' == it['sku']]
        elif '20W50' in c2_u:
            return [it for it in inv_items if it['sku'] in ['038LUB-PC2050-0025', '038LUB-PC2050-0100']]
        elif '10W30' in c2_u:
            return [it for it in inv_items if '038LUBC1030-0025' == it['sku']]
        return []

    # 6. AROIL
    if sheet_name == 'LURICANTE AROIL':
        matches = []
        for it in inv_items:
            it_name = it['name'].upper()
            if 'AROIL' not in it_name: continue
            if 'RACING 10W30' in c2_u and 'RACING 10W30' in it_name: matches.append(it)
            elif 'RACING 20W50' in c2_u and 'RACING 20W50' in it_name: matches.append(it)
            elif 'SUPER 40' in c2_u and 'SUPER 40' in it_name: matches.append(it)
            elif '15W40 CI-4' in c2_u and '15W40 CI-4' in it_name: matches.append(it)
            elif '25W60 CF' in c2_u and '25W60 CF' in it_name: matches.append(it)
            elif 'DIESEL 40 CF' in c2_u and 'DIESEL 40 CF' in it_name: matches.append(it)
            elif 'MOTOR 2T' in c2_u and '2T' in it_name: matches.append(it)
            elif '4T 20W50' in c2_u and '4T 20W50' in it_name: matches.append(it)
            elif '75W85 GL-5' in c2_u and '75W85' in it_name: matches.append(it)
            elif '80W90 GL-5' in c2_u and '80W90' in it_name: matches.append(it)
            elif '85W140 GL-5' in c2_u and '85W140' in it_name: matches.append(it)
            elif '90 GL-4' in c2_u and ('90 GL-4' in it_name or '90 GL' in it_name) and '80W' not in it_name and '140' not in it_name and '75W' not in it_name:
                matches.append(it)
            elif '140 GL-4' in c2_u and ('140 GL-4' in it_name or '140 GL' in it_name) and '85W' not in it_name:
                matches.append(it)
            elif 'ATF DIII' in c2_u and 'ATF' in it_name: matches.append(it)
            elif 'AW ISO 68 ROJO' in c2_u and '0368AR50006' == it['sku']: matches.append(it)
            elif 'TRACFLUID 10W30' in c2_u and 'TRACFLUID' in it_name: matches.append(it)
            elif 'ISO 68 AMBAR' in c2_u and 'ISO 68 AMBAR' in it_name: matches.append(it)
            elif 'GRASA CHASSIS 2 ROJA' in c2_u and 'GRASA' in it_name and 'ROJA' in it_name: matches.append(it)
            elif 'GRASA CHASSIS 2 AZUL' in c2_u and 'GRASA' in it_name and 'AZUL' in it_name: matches.append(it)
        return matches

    # 7. MANNOL LUBRICANTS & COOLANTS
    if sheet_name == 'LURICANTE MANNOL':
        matches = []
        for it in inv_items:
            if 'MANNOL' not in it['name'].upper(): continue
            it_name = it['name'].upper()
            if 'AZUL' in c2_u and 'REFRIGERANTE' in c2_u and 'AZUL' in it_name and 'REFRIGERANTE' in it_name: matches.append(it)
            elif 'ROJO' in c2_u and 'REFRIGERANTE' in c2_u and 'ROJO' in it_name and 'REFRIGERANTE' in it_name: matches.append(it)
            elif 'VERDE' in c2_u and 'REFRIGERANTE' in c2_u and 'VERDE' in it_name and 'REFRIGERANTE' in it_name: matches.append(it)
            elif 'NARANJA' in c2_u and 'REFRIGERANTE' in c2_u and 'NARANJA' in it_name and 'REFRIGERANTE' in it_name: matches.append(it)
            elif 'TS-4' in c2_u and 'TS-4' in it_name: matches.append(it)
            elif 'SAFARI' in c2_u and 'SAFARI' in it_name: matches.append(it)
            elif 'CLASSIC 10W40' in c2_u and 'CLASSIC 10W40' in it_name: matches.append(it)
            elif 'SPECIAL PLUS' in c2_u and 'SPECIAL PLUS' in it_name: matches.append(it)
            elif 'TOYOTA LEXUS' in c2_u and 'TOYOTA LEXUS' in it_name: matches.append(it)
            elif 'HYUNDAI KIA' in c2_u and 'HYUNDAI KIA' in it_name: matches.append(it)
            elif 'CERAMIC 5W30' in c2_u and 'CERAMIC 5W30' in it_name: matches.append(it)
            elif 'CERAMIC PRO' in c2_u and 'CERAMIC PRO' in it_name: matches.append(it)
            elif '4TAKT MOTORBIKE 10W40' in c2_u and '4TAKT MOTORBIKE 10W40' in it_name: matches.append(it)
            elif '4TAKT MOTORBIKE 10W50' in c2_u and '4TAKT MOTORBIKE 10W50' in it_name: matches.append(it)
            elif 'POWERBIKE' in c2_u and 'POWERBIKE' in it_name: matches.append(it)
            elif 'DIESEL TURBO' in c2_u and 'DIESEL TURBO' in it_name: matches.append(it)
            elif 'ENERGY ULTRA JP' in c2_u and 'ENERGY ULTRA JP' in it_name: matches.append(it)
            elif 'DIESEL TDI' in c2_u and 'DIESEL TDI' in it_name: matches.append(it)
            elif 'ENERGY FORMULA JP' in c2_u and 'ENERGY FORMULA JP' in it_name: matches.append(it)
            elif 'FOR CHINESE CARS' in c2_u and 'FOR CHINESE CARS' in it_name: matches.append(it)
            elif 'FWD 75W85' in c2_u and 'FWD 75W85' in it_name: matches.append(it)
            elif 'HYPOID LSD' in c2_u and 'HYPOID LSD' in it_name: matches.append(it)
            elif 'HYPOID GETRIEBEOEL' in c2_u and 'HYPOID GETRIEBEOEL' in it_name: matches.append(it)
            elif 'UNIVERSAL GETRIEBEOEL' in c2_u and 'UNIVERSAL GETRIEBEOEL' in it_name: matches.append(it)
            elif 'BASIC PLUS' in c2_u and 'BASIC PLUS' in it_name: matches.append(it)
            elif 'MTF-3' in c2_u and 'MTF-3' in it_name: matches.append(it)
            elif 'DCT FLUID' in c2_u and 'DCT FLUID' in it_name: matches.append(it)
            elif 'ATF DEXRON III' in c2_u and 'DEXRON III' in it_name and 'VI' not in it_name: matches.append(it)
            elif 'ATF DEXRON VI' in c2_u and 'DEXRON VI' in it_name: matches.append(it)
            elif 'CVT NISSAN NS-3' in c2_u and 'CVT NISSAN NS-3' in it_name: matches.append(it)
            elif 'ATF ULV' in c2_u and 'ATF ULV' in it_name: matches.append(it)
            elif 'ISO 32' in c2_u and 'ISO 32' in it_name: matches.append(it)
            elif 'ISO 46' in c2_u and 'ISO 46' in it_name: matches.append(it)
            elif 'ISO 68' in c2_u and 'ISO 68' in it_name and 'HV' in it_name: matches.append(it)
            elif 'MULTIFARM' in c2_u and 'MULTIFARM' in it_name: matches.append(it)
            elif 'MOLIBDEN GREEN' in c2_u and 'MOLIBDEN GREEN' in it_name: matches.append(it)
            elif 'TS-5 UHPD' in c2_u and 'TS-5 UHPD' in it_name: matches.append(it)
        return matches

    # 8. ABRO
    if sheet_name == 'ABRO':
        matches = []
        for it in inv_items:
            it_name = it['name'].upper()
            if 'ABRO' not in it_name: continue
            if 'AB-404' in c2_u and 'AB-404' in it_name: matches.append(it)
            elif 'AB-80' in c2_u and 'AB-80' in it_name: matches.append(it)
            elif 'REFRIGERANTE ROJO' in c2_u and 'REFRIGERANTE ROJO' in it_name: matches.append(it)
            elif 'REFRIGERANTE VERDE' in c2_u and 'REFRIGERANTE VERDE' in it_name: matches.append(it)
            elif 'LG-990' in c2_u and 'LG-990' in it_name: matches.append(it)
            elif 'SS-822' in c2_u and 'SS-822' in it_name: matches.append(it)
            elif 'TAIPE' in c2_u and 'TAIPE' in it_name: matches.append(it)
            elif 'TRANSPARENTE' in c2_u and 'TRANSPARENTE' in it_name: matches.append(it)
        return matches

    # 9. PERFUMES
    if sheet_name == 'PERFUMES':
        matches = []
        for it in inv_items:
            it_name = it['name'].upper()
            if 'CHICLE' in c2_u and 'CHICLE' in it_name: matches.append(it)
            elif 'CITRUS' in c2_u and 'CITRUS' in it_name: matches.append(it)
            elif 'FRESA' in c2_u and 'FRESA' in it_name: matches.append(it)
            elif 'PICADURA TABACO' in c2_u and 'PICADURA TABACO' in it_name: matches.append(it)
            elif 'CARRO NUEVO' in c2_u and 'CARRO NUEVO' in it_name: matches.append(it)
            elif 'CERA 300GR' in c2_u and 'CERA 300GR' in it_name: matches.append(it)
            elif 'BLACK CRYSTAL' in c2_u and 'BLACK CRYSTAL' in it_name: matches.append(it)
            elif 'NEW CAR' in c2_u and 'NEW CAR' in it_name and 'AREON' in it_name: matches.append(it)
            elif 'MON DISPLAY' in c2_u and 'MON DISPLAY' in it_name: matches.append(it)
            elif 'SHAMPOO CERA' in c2_u and 'SHAMPOO' in it_name: matches.append(it)
        return matches

    # 10. MANNOL CHEMICALS & ADDITIVES
    if sheet_name == 'MANNOL':
        # Strict explicit matching for every row in MANNOL
        if 'APPLE' in c2_u:
            return [it for it in inv_items if '6145' in it['sku']]
        elif 'VAINILLA' in c2_u:
            return [it for it in inv_items if '6149' in it['sku']]
        elif '4.5 KG' in c2_u or '18 KG' in c2_u:
            return [it for it in inv_items if it['sku'] in ['012MN8029-08', '012MN8029', '012MN8116']]
        elif 'LITIO MULTIUSO 800 GRS' in c2_u:
            return [it for it in inv_items if '012MN8028-08' == it['sku']]
        elif 'ESTER ADDITIVE / TRATAMIENTO DE ACEITE' in c2_u:
            return [it for it in inv_items if '012MN9929-045' == it['sku'] or '012MN9929-1' == it['sku']]
        elif 'DIESEL ESTER ADDITIVE' in c2_u:
            return [it for it in inv_items if '012MN9930-01' == it['sku'] or '012MN9930-025' == it['sku']]
        elif 'BENZIN ESTER' in c2_u:
            return [it for it in inv_items if '012MN9950-025' == it['sku']]
        elif 'SELLADOR DE FUGAS PARA RADIADOR' in c2_u:
            return [it for it in inv_items if '012MN9966-025' == it['sku']]
        elif 'SELLADOR DE FUGAS CAJA' in c2_u:
            return [it for it in inv_items if '012MN9968-025' == it['sku']]
        elif 'LIMPIADOR INYECTORES DIESEL' in c2_u or 'DIESEL JET CLEANER' in c2_u:
            return [it for it in inv_items if '012MN9956-025' == it['sku']]
        elif 'LIMPIA INYECTORES GASOLINA' in c2_u or 'INJECTOR CLEANER GASOLINA' in c2_u:
            return [it for it in inv_items if '012MN9957-025' == it['sku']]
        elif 'CAJA AUTOM' in c2_u:
            return [it for it in inv_items if '012MN9902-01' == it['sku']]
        elif 'CAJA MANUAL' in c2_u:
            return [it for it in inv_items if '012MN9903-01' == it['sku']]
            
        matches = []
        for it in inv_items:
            it_name = it['name'].upper()
            if 'MANNOL' not in it_name: continue
            title_words = [w for w in re.split(r'[\s\-\/\(\)\,]+', c2_u) if len(w) >= 3 and w not in ['MANNOL', 'PARA', 'CON', 'DEL', 'LTS', 'LT', 'UND', 'CJ', 'X']]
            if title_words and all(tw in it_name for tw in title_words[:3]):
                matches.append(it)
        return matches[:1]

    return []

print("Strict matcher and presentation detector initialized.")

SHEET_METAS = {
    'FILTROS AIRE': {'cat': 'filtros', 'brand': 'ADVANCE', 'app': 'autos'},
    'FILTROS ACEITE': {'cat': 'filtros', 'brand': 'ADVANCE', 'app': 'autos'},
    'FILTROS CABINA': {'cat': 'filtros', 'brand': 'ADVANCE', 'app': 'autos'},
    'FILTROS COMBUSTIBLE': {'cat': 'filtros', 'brand': 'ADVANCE', 'app': 'autos'},
    'LURICANTE MANNOL': {'cat': 'lubricantes', 'brand': 'MANNOL', 'app': 'autos'},
    'LURICANTE MOBIL': {'cat': 'lubricantes', 'brand': 'MOBIL', 'app': 'autos'},
    'LURICANTE AROIL': {'cat': 'lubricantes', 'brand': 'AROIL', 'app': 'autos'},
    'LURICANTE AMALIE': {'cat': 'lubricantes', 'brand': 'AMALIE', 'app': 'autos'},
    'LURICANTE MOTUL': {'cat': 'lubricantes', 'brand': 'MOTUL', 'app': 'motos'},
    'LURICANTE VALVOLINE': {'cat': 'lubricantes', 'brand': 'VALVOLINE', 'app': 'pesado'},
    'MANNOL': {'cat': 'aditivos', 'brand': 'MANNOL', 'app': 'autos'},
    'ABRO': {'cat': 'aditivos', 'brand': 'ABRO', 'app': 'autos'},
    'PERFUMES': {'cat': 'aditivos', 'brand': 'SIMONIZ', 'app': 'autos'}
}

processed_products = []
covered_skus = set()
seen_primary_skus = set()
seen_slugs = set()

def clean_desc(text):
    text = re.sub(r'[\"\t\r\n]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

for sheet_name, meta in SHEET_METAS.items():
    rows = sheet_rows.get(sheet_name, [])
    is_filter_sheet = 'FILTRO' in sheet_name.upper()
    
    for r in rows:
        row_num = r['row_num']
        c1 = r['col1'].strip()
        c2 = r['col2'].strip()
        imgs = r['images']
        
        if not c1 and not c2: continue
        if not imgs: continue
        
        matched_items = get_strict_matches(sheet_name, r)
        if not matched_items: continue
        
        category = meta['cat']
        brand = meta['brand']
        app_type = meta['app']
        
        if 'REFRIGERANTE' in c2.upper() or 'COOLANT' in c2.upper():
            category = 'refrigerantes'
        elif any(m in c2.upper() for m in ['MOTO', '4T', '2T', 'MOTORBIKE']):
            app_type = 'motos'
        elif any(p in c2.upper() for p in ['HINO', 'ISUZU', 'MACK', 'FREIGHTLINER', 'FVR', 'FTR', 'NPR', 'NHR', 'CAMION']):
            app_type = 'pesado'
        elif any(c in c2.upper() for c in ['DMAX', 'D-MAX', 'HILUX', 'BT50', 'BT-50', 'WINGLE', 'T6', 'FORTUNER', 'PICK UP']):
            app_type = 'camionetas'
            
        if brand == 'SIMONIZ' and 'AREON' in c2.upper():
            brand = 'AREON'

        # Multi-variant product vs Single variant
        if len(matched_items) > 1 and not is_filter_sheet:
            item_variants = []
            seen_press_in_prod = set()
            for it in matched_items:
                pres_name, vol_val = detect_presentation(it)
                # Ensure no duplicate presentations inside same product
                if pres_name in seen_press_in_prod:
                    continue
                seen_press_in_prod.add(pres_name)
                item_variants.append({
                    'item': it,
                    'presentation': pres_name,
                    'volume_val': vol_val
                })
            item_variants.sort(key=lambda x: x['volume_val'])
            
            # Cap strictly to maximum 3 variants!
            item_variants = cap_variants_to_3(item_variants)
            
            if not item_variants:
                continue
                
            # If after deduplicating presentations only 1 variant remains, treat as single
            if len(item_variants) == 1:
                matched_items = [item_variants[0]['item']]
            else:
                primary_var = item_variants[0]
                primary_sku = primary_var['item']['sku']
                
                if primary_sku.upper() in seen_primary_skus:
                    continue
                    
                seen_primary_skus.add(primary_sku.upper())
                
                prod_variants = []
                for v_obj in item_variants:
                    it = v_obj['item']
                    v_sku = it['sku']
                    covered_skus.add(v_sku.upper())
                    v_clean = clean_sku(v_sku)
                    
                    # Check disk image
                    if os.path.exists(os.path.join(output_img_dir, f"{v_clean}.png")):
                        v_img_path = f"/images/products/{v_clean}.png"
                    elif os.path.exists(os.path.join(output_img_dir, f"filter-{v_clean}.png")):
                        v_img_path = f"/images/products/filter-{v_clean}.png"
                    else:
                        v_img_path = f"/images/products/{clean_sku(primary_sku)}.png"
                    
                    prod_variants.append({
                        'sku': v_sku,
                        'name': it['name'],
                        'presentation': v_obj['presentation'],
                        'volume': f"{v_obj['volume_val']}L" if v_obj['volume_val'] >= 1.0 else f"{int(v_obj['volume_val']*1000)}ml",
                        'stock': it['stock'],
                        'imageUrl': v_img_path,
                        'barcode': it.get('barcode', '')
                    })
                    
                display_name = clean_display_name(c2 if c2 else primary_var['item']['name'], brand)
                
                prod_id = f"prod-{clean_sku(primary_sku)}"
                prod_slug = make_slug(f"{brand}-{display_name}-{primary_sku}")
                while prod_slug in seen_slugs:
                    prod_slug += "-alt"
                seen_slugs.add(prod_slug)
                
                total_stock = sum(v['stock'] for v in prod_variants)
                
                processed_products.append({
                    'id': prod_id,
                    'sku': primary_sku,
                    'slug': prod_slug,
                    'name': display_name,
                    'brand': brand,
                    'category': category,
                    'applicationType': app_type,
                    'volume': primary_var['presentation'],
                    'shortSpec': f"Línea oficial {brand}. Disponible en {len(prod_variants)} presentaciones ({', '.join(v['presentation'] for v in prod_variants)}) con stock en Bodega Pedernales.",
                    'specifications': {
                        'Marca': brand,
                        'Presentaciones': ", ".join(v['presentation'] for v in prod_variants),
                        'Stock Total': f"{total_stock} unidades",
                        'Origen': 'Distribución Matriz LiderPro'
                    },
                    'fullSpecs': {
                        'Categoría': category.capitalize(),
                        'Línea': f"{brand} Automotive",
                        'Presentaciones Disponibles': ", ".join(v['presentation'] for v in prod_variants),
                        'Garantía': 'Garantía Oficial de Fábrica y LiderPro'
                    },
                    'description': f"{display_name} distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones ({', '.join(v['presentation'] for v in prod_variants)}) para talleres y flotas en Manabí y a nivel nacional.",
                    'priceNote': 'Consultar precio mayorista o unitario vía WhatsApp con factura SRI',
                    'warranty': 'Garantía oficial de autenticidad',
                    'commercialStatus': 'VERIFIED',
                    'inStock': total_stock > 0,
                    'stockStatusText': f"{total_stock} unidades disponibles en Bodega Pedernales" if total_stock > 0 else "Bajo pedido inmediato",
                    'dispatchIndicator': 'Despacho Inmediato',
                    'primaryOriginRecommendation': 'Pedernales',
                    'imageUrl': prod_variants[0]['imageUrl'],
                    'variants': prod_variants,
                    'compatibleVehicles': [
                        {'make': 'Universal', 'model': 'Línea Multimarca y Talleres', 'yearRange': 'Todos los años'}
                    ],
                    'features': [
                        f"Presentación intercambiable en {len(prod_variants)} tamaños unificados",
                        "Fórmula certificada de máxima pureza y durabilidad",
                        "Despacho verificado desde Bodega Matriz Pedernales",
                        "Facturación electrónica autorizada por el SRI"
                    ],
                    'faqs': [
                        {
                            'question': f'¿Qué presentaciones de {display_name} tienen en stock?',
                            'answer': f'Disponemos de {len(prod_variants)} presentaciones oficiales: {", ".join(v["presentation"] for v in prod_variants)}. Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp.'
                        },
                        {
                            'question': '¿Realizan envíos a otras ciudades del país?',
                            'answer': 'Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro.'
                        }
                    ],
                    'isBestSeller': total_stock > 10
                })
                continue
                
        # Single item
        it = matched_items[0]
        sku = it['sku']
        if sku.upper() in seen_primary_skus:
            continue
        seen_primary_skus.add(sku.upper())
        covered_skus.add(sku.upper())
        
        sku_clean = clean_sku(sku)
        if os.path.exists(os.path.join(output_img_dir, f"{sku_clean}.png")):
            img_url = f"/images/products/{sku_clean}.png"
        elif os.path.exists(os.path.join(output_img_dir, f"filter-{sku_clean}.png")):
            img_url = f"/images/products/filter-{sku_clean}.png"
        else:
            img_url = f"/images/products/{sku_clean}.png"
        
        display_name = clean_display_name(c2 if c2 else it['name'], brand)
        
        compat = []
        if is_filter_sheet:
            for vname, make in [
                ('HILUX', 'Toyota'), ('FORTUNER', 'Toyota'), ('YARIS', 'Toyota'), ('COROLLA', 'Toyota'),
                ('D-MAX', 'Chevrolet'), ('DMAX', 'Chevrolet'), ('SAIL', 'Chevrolet'), ('SPARK', 'Chevrolet'),
                ('AVEO', 'Chevrolet'), ('LUV', 'Chevrolet'), ('JOY', 'Chevrolet'),
                ('TUCSON', 'Hyundai'), ('ACCENT', 'Hyundai'), ('GETZ', 'Hyundai'), ('SANTA FE', 'Hyundai'), ('H100', 'Hyundai'),
                ('SPORTAGE', 'Kia'), ('RIO', 'Kia'), ('SOUL', 'Kia'), ('SOLUTO', 'Kia'), ('PREGIO', 'Kia'), ('K2700', 'Kia'),
                ('GRAN VITARA', 'Suzuki'), ('VITARA', 'Suzuki'), ('SZ', 'Suzuki'),
                ('WINGLE', 'Great Wall'), ('HAVAL', 'Great Wall'),
                ('T6', 'JAC'), ('HFC', 'JAC'),
                ('BT-50', 'Mazda'), ('BT50', 'Mazda'),
                ('F150', 'Ford'), ('ESCAPE', 'Ford'), ('EXPLORER', 'Ford'),
                ('BORA', 'Volkswagen'), ('JETTA', 'Volkswagen'), ('GOL', 'Volkswagen'),
                ('T600', 'Zotye'), ('TIGGO', 'Chery'),
                ('HINO', 'Hino'), ('ISUZU', 'Isuzu'), ('NPR', 'Chevrolet Isuzu'), ('NHR', 'Chevrolet Isuzu'), ('FTR', 'Chevrolet Isuzu')
            ]:
                if vname in display_name.upper():
                    compat.append({'make': make, 'model': vname, 'yearRange': 'Línea Compatible'})
        if not compat:
            compat.append({'make': 'Multimarca', 'model': 'Vehículos y Flotas', 'yearRange': 'Consulte según especificación'})
            
        pres_str, _ = detect_presentation(it)
        
        prod_id = f"prod-{clean_sku(sku)}"
        prod_slug = make_slug(f"{brand}-{display_name[:40]}-{sku}")
        while prod_slug in seen_slugs:
            prod_slug += "-alt"
        seen_slugs.add(prod_slug)
        
        processed_products.append({
            'id': prod_id,
            'sku': sku,
            'slug': prod_slug,
            'name': display_name,
            'brand': brand,
            'category': category,
            'applicationType': app_type,
            'volume': pres_str if not is_filter_sheet else None,
            'shortSpec': f"Producto original {brand}. Código OEM / Referencia: {sku}. Stock disponible en Pedernales.",
            'specifications': {
                'Código / SKU': sku,
                'Marca': brand,
                'Tipo': 'Filtro Automotriz' if is_filter_sheet else 'Producto Automotriz',
                'Stock Actual': f"{it['stock']} unidades",
                'Bodega': 'Pedernales Matriz'
            },
            'fullSpecs': {
                'Referencia Comercial': sku,
                'Fabricante': brand,
                'Aplicación': app_type.capitalize(),
                'Disponibilidad': f"{it['stock']} unid. listas para entrega"
            },
            'description': f"{display_name} con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
            'priceNote': 'Cotización inmediata por WhatsApp con factura SRI',
            'warranty': 'Garantía oficial de fábrica',
            'commercialStatus': 'VERIFIED',
            'inStock': it['stock'] > 0,
            'stockStatusText': f"{it['stock']} unidades en Bodega Pedernales" if it['stock'] > 0 else "Bajo pedido inmediato",
            'dispatchIndicator': 'Despacho Inmediato',
            'primaryOriginRecommendation': 'Pedernales',
            'imageUrl': img_url,
            'compatibleVehicles': compat,
            'features': [
                f"Calidad OEM garantizada por {brand}",
                "Construcción de alta resistencia y durabilidad",
                "Entrega inmediata en Pedernales y envíos a todo Ecuador",
                "Factura comercial autorizada por el SRI"
            ],
            'faqs': [
                {
                    'question': f'¿Este producto {sku} es compatible con mi vehículo?',
                    'answer': 'Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío.'
                },
                {
                    'question': '¿Tienen stock para retiro inmediato en tienda física?',
                    'answer': f'Sí, disponemos de {it["stock"]} unidades en nuestro local matriz de Pedernales listo para entrega inmediata.'
                }
            ],
            'isBestSeller': it['stock'] > 8
        })

# Add Real Batteries
for it in inv_items:
    sku = it['sku']
    name = it['name']
    name_u = name.upper()
    stock = it['stock']
    
    if sku.upper() in seen_primary_skus:
        continue
        
    # Strictly real 12V automotive batteries
    is_real_battery = (
        (name_u.startswith('BATERIA BOSCH') or name_u.startswith('BATERIA ECUADOR')) and
        not any(w in name_u for w in ['TERMINAL', 'SOPORTE', 'ECOVALOR', 'BORNE', 'ANILLOS'])
    )
    
    if is_real_battery:
        seen_primary_skus.add(sku.upper())
        covered_skus.add(sku.upper())
        is_bosch = 'BOSCH' in name_u
        brand = 'BOSCH' if is_bosch else 'BATERÍAS ECUADOR'
        img_url = '/images/products/bosch-s4-real.png' if is_bosch else '/images/products/baterias-ecuador-real.png'
        
        app_type = 'autos'
        if any(h in name_u for h in ['N100', 'N150', '31 SHD', 'SHD', '55 HD']):
            app_type = 'pesado'
        elif any(c in name_u for c in ['27 HP', '27 FE', '34 HP', '34 FE', '65 HP', '66 HP']):
            app_type = 'camionetas'
            
        amp_match = re.search(r'(\d+)\s*(?:AMP|AH)', name_u)
        amp_str = f"{amp_match.group(1)} Ah" if amp_match else "12V Alta Potencia"
        
        clean_name_bat = name
        if is_bosch:
            clean_name_bat = re.sub(r'BATERIA\s+BOSCH\s+', 'Batería Bosch ', clean_name_bat, flags=re.I)
        else:
            clean_name_bat = re.sub(r'BATERIA\s+ECUADOR\s+', 'Batería Ecuador ', clean_name_bat, flags=re.I)
            
        prod_id = f"bat-{clean_sku(sku)}"
        prod_slug = make_slug(f"{brand}-{clean_name_bat}-{sku}")
        while prod_slug in seen_slugs:
            prod_slug += "-alt"
        seen_slugs.add(prod_slug)
        
        warranty = "18 meses / 40.000 Km" if is_bosch else "Garantía Nacional 15 a 18 meses"
        
        processed_products.append({
            'id': prod_id,
            'sku': sku,
            'slug': prod_slug,
            'name': clean_name_bat,
            'brand': brand,
            'category': 'baterias',
            'applicationType': app_type,
            'plates': amp_str,
            'shortSpec': f"{clean_name_bat} con tecnología de libre mantenimiento. {amp_str}, arranque confiable en frío.",
            'specifications': {
                'Marca': brand,
                'Capacidad / Potencia': amp_str,
                'Garantía': warranty,
                'Tipo de Borne': 'Estándar Automotriz (Izquierdo / Derecho según código)',
                'Stock': f"{stock} unidades en Pedernales"
            },
            'fullSpecs': {
                'Línea': 'High Power / S4' if is_bosch else 'High Power Selección Oficial',
                'Tecnología': 'PowerFrame Alemana' if is_bosch else 'Placas Reforzadas Heavy Duty',
                'Garantía Certificada': warranty,
                'Origen': 'Distribución Autorizada LiderPro'
            },
            'description': f"{clean_name_bat} disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
            'priceNote': 'Precio preferencial entregando batería usada (Plan Eco-Valor SRI)',
            'warranty': warranty,
            'commercialStatus': 'VERIFIED',
            'inStock': stock > 0,
            'stockStatusText': f"{stock} unidades disponibles en Bodega Pedernales" if stock > 0 else "Bajo pedido inmediato",
            'dispatchIndicator': 'Entrega & Instalación Inmediata',
            'primaryOriginRecommendation': 'Pedernales',
            'imageUrl': img_url,
            'compatibleVehicles': [
                {'make': 'Línea Nacional', 'model': 'Autos, Camionetas y Flotas según amperaje', 'yearRange': '12V'}
            ],
            'features': [
                "Diseño profesional institucional según modelo real en tienda",
                f"Garantía oficial {warranty}",
                "Diagnóstico y prueba de alternador sin costo en local",
                "Facturación electrónica autorizada por el SRI"
            ],
            'faqs': [
                {
                    'question': '¿Reciben mi batería vieja como parte de pago?',
                    'answer': 'Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado.'
                },
                {
                    'question': '¿La instalación tiene costo adicional?',
                    'answer': 'La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales.'
                }
            ],
            'isBestSeller': stock >= 2
        })

print(f"\n================ AUDIT SUMMARY ================")
print(f"Total processed products: {len(processed_products)}")
print(f"Total covered inventory SKUs: {len(covered_skus)} of {len(inv_items)}")

# Verify 0 duplicate primary SKUs
p_skus = [p['sku'] for p in processed_products]
dup_p_skus = set([s for s in p_skus if p_skus.count(s) > 1])
print(f"Duplicate primary SKUs: {len(dup_p_skus)} -> {dup_p_skus}")

# Verify variant counts
variant_counts = [len(p.get('variants') or []) for p in processed_products if p.get('variants')]
print(f"Products with variants: {len(variant_counts)}")
print(f"Max variants on any single product: {max(variant_counts) if variant_counts else 0}")
print(f"Min variants on any single product: {min(variant_counts) if variant_counts else 0}")

# Uncovered items
uncovered_items = [it for it in inv_items if it['sku'].upper() not in covered_skus]
print(f"Total uncovered items (sin imagen): {len(uncovered_items)}")

# Write to src/data/products.ts
ts_path = r'src/data/products.ts'
ts_header = """export type ApplicationType = "autos" | "camionetas" | "pesado" | "motos";

export type ProductCategory =
  | "baterias"
  | "lubricantes"
  | "filtros"
  | "refrigerantes"
  | "frenos"
  | "bujias"
  | "aditivos";

export interface ProductVariant {
  sku: string;
  name: string;
  presentation: string;
  volume?: string;
  stock: number;
  imageUrl: string;
  barcode?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  applicationType: ApplicationType;
  volume?: string | null;
  plates?: string | null;
  shortSpec: string;
  specifications: Record<string, string>;
  fullSpecs: Record<string, string>;
  description: string;
  priceEstimate?: string | null;
  priceNote: string;
  warranty: string;
  commercialStatus: "VERIFIED" | "REFERENCE" | "PENDING_VERIFICATION";
  inStock: boolean;
  stockStatusText: string;
  dispatchIndicator: string;
  primaryOriginRecommendation: "Pedernales" | "Quito" | "Nacional";
  imageUrl: string;
  variants?: ProductVariant[];
  compatibleVehicles: {
    make: string;
    model: string;
    yearRange: string;
    engine?: string;
  }[];
  features: string[];
  faqs: { question: string; answer: string }[];
  isBestSeller?: boolean;
}

export const OFFICIAL_BRANDS = [
  { name: "BATERÍAS ECUADOR", logoUrl: "/images/brands/baterias-ecuador.png", origin: "Línea Oficial Nacional", specialty: "Arranque & Alta Durabilidad" },
  { name: "BOSCH", logoUrl: "/images/brands/bosch.png", origin: "Tecnología Alemana", specialty: "Baterías S4 PowerFrame" },
  { name: "MANNOL", logoUrl: "/images/brands/mannol.png", origin: "Ingeniería Alemana", specialty: "Sintéticos, Coolant & Aditivos" },
  { name: "AROIL", logoUrl: "/images/brands/aroil.png", origin: "Alta Rotación Ecuador", specialty: "Super 40, 15W-40 & Canecas" },
  { name: "MOBIL", logoUrl: "/images/brands/mobil.png", origin: "ExxonMobil Global", specialty: "Mobil Delvac & Mobil 1" },
  { name: "MOTUL", logoUrl: "/images/brands/motul.png", origin: "Especialista Francés", specialty: "Motos 4T Ester & Rendimiento" },
  { name: "VALVOLINE", logoUrl: "/images/brands/valvoline.png", origin: "Líder Americano", specialty: "Valvodiesel & Protección SAE" },
  { name: "AMALIE", logoUrl: "/images/brands/amalie.png", origin: "Fórmula Americana", specialty: "Synthetic Blend Multigrado" },
  { name: "ADVANCE", logoUrl: "/images/brands/advance.png", origin: "Filtración Automotriz", specialty: "Filtros de Aceite, Aire & Combustible" },
  { name: "ATE", logoUrl: "/images/brands/ate.png", origin: "Equipo Original Alemán", specialty: "Fluidos de Freno DOT 3 & DOT 4" },
  { name: "NGK", logoUrl: "/images/brands/ngk.png", origin: "Líder en Encendido", specialty: "Bujías Platino & Cobre" },
  { name: "DENSO", logoUrl: "/images/brands/denso.png", origin: "Equipo Original Japonés", specialty: "Bujías de Precisión OEM" },
  { name: "BARDAHL", logoUrl: "/images/brands/bardahl.png", origin: "Aditivos Profesionales", specialty: "Tratamiento B1, B2 & Antifricción" },
  { name: "ABRO", logoUrl: "/images/brands/abro.png", origin: "Fórmula Americana", specialty: "Químicos & Refrigerantes USA" },
  { name: "SIMONIZ", logoUrl: "/images/brands/simoniz.png", origin: "Cuidado Automotriz", specialty: "Ceras, Siliconas & Shampoo" },
  { name: "AREON", logoUrl: "/images/brands/areon.png", origin: "Perfumería Europea", specialty: "Aromas Black Crystal & New Car" }
];

export const PRODUCTS: Product[] = """

json_products = json.dumps(processed_products, indent=2, ensure_ascii=False)
with open(ts_path, 'w', encoding='utf-8') as tf:
    tf.write(ts_header + json_products + ";\n")

print(f"Written {len(processed_products)} clean products to {ts_path}")

# Write updated report
report_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\reporte_productos_sin_imagen.md'

uncovered_by_cat = {}
for it in uncovered_items:
    name_u = it['name'].upper()
    cat = 'Varios / Repuestos'
    if 'PLUMA' in name_u:
        cat = 'Plumas Limpiaparabrisas (Bosch)'
    elif 'BUJIA' in name_u:
        cat = 'Bujías (NGK / Denso)'
    elif 'FOCO' in name_u:
        cat = 'Focos Automotrices (Bosch)'
    elif 'FRENO' in name_u or 'ATE' in name_u:
        cat = 'Líquidos de Freno (ATE)'
    elif 'BARDAHL' in name_u:
        cat = 'Aditivos Bardahl'
    elif 'GLOBAL' in name_u or 'GRAFITADA' in name_u:
        cat = 'Químicos / Duchas Especiales'
    elif 'TERMINAL BATERIA' in name_u or 'BORNE' in name_u:
        cat = 'Terminales de Batería'
    elif 'SOPORTE DE BATERIA' in name_u:
        cat = 'Soportes de Batería'
    elif 'ECOVL' in name_u or 'ECOVALOR' in name_u:
        cat = 'Rubros Administrativos (Eco-Valor SRI)'
    elif 'SIMONIZ' in name_u or 'TAPETE' in name_u:
        cat = 'Accesorios Simoniz'
    elif 'MANNOL' in name_u:
        cat = 'Mannol (Referencias sin imagen en Excel)'
    elif 'ABRO' in name_u:
        cat = 'Abro (Referencias sin imagen en Excel)'
    elif 'VALVOLINE' in name_u:
        cat = 'Valvoline (Referencias sin imagen en Excel)'
    uncovered_by_cat.setdefault(cat, []).append(it)

with open(report_path, 'w', encoding='utf-8') as rf:
    rf.write("# Auditoría Institucional: Productos de Inventario Excluidos por Falta de Imagen Real\n\n")
    rf.write("> [!IMPORTANT]\n")
    rf.write("> En estricto cumplimiento de su instrucción: **\"los productos que no encuentres con imágenes debes no colocarlos en la página hasta que te envíe la imagen real pero me puedes documentar exactamente qué falta en qué productos\"**, estos artículos se mantienen debidamente inventariados pero fuera de la vista pública hasta contar con su respectiva fotografía de estudio.\n\n")
    rf.write("## Resumen Ejecutivo del Inventario Maestro\n\n")
    rf.write(f"- **Total de ítems en `INVENTARIO.xlsx`:** {len(inv_items)} referencias.\n")
    rf.write(f"- **Productos Activos en el Catálogo Público:** {len(processed_products)} productos institucionales.\n")
    rf.write(f"- **Referencias del Inventario Cubiertas (con imagen y variantes unificadas):** {len(covered_skus)} ítems ({round(len(covered_skus)/len(inv_items)*100, 1)}%).\n")
    rf.write(f"- **Referencias Pendientes de Fotografía Real:** {len(uncovered_items)} ítems.\n\n")
    rf.write("---\n\n")
    rf.write("## Detalle de Ítems Pendientes por Categoría y Marca\n\n")
    
    for cat_name, items in sorted(uncovered_by_cat.items(), key=lambda x: -len(x[1])):
        total_cat_stock = sum(it['stock'] for it in items)
        rf.write(f"### {cat_name} ({len(items)} referencias | Stock total: {total_cat_stock} unidades)\n\n")
        rf.write("| SKU | Descripción Oficial | Stock en Bodega |\n")
        rf.write("| :--- | :--- | :---: |\n")
        for it in items:
            rf.write(f"| `{it['sku']}` | {it['name']} | **{it['stock']}** |\n")
        rf.write("\n")

print(f"Report artifact written to {report_path}")
