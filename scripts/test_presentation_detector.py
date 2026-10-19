import json
import zipfile
import os
import re
import io
import sys
import numpy as np
import scipy.ndimage as ndi
from PIL import Image, ImageOps, ImageFilter

xlsx_path = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx'
inv_xlsx = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO.xlsx'
output_img_dir = r'public/images/products'
os.makedirs(output_img_dir, exist_ok=True)

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

sheet_rows = full_data['sheet_rows']
inv_items = full_data['inventory_items']
inv_by_sku = {it['sku'].upper(): it for it in inv_items}

def detect_presentation(name):
    name_u = name.upper()
    if '20 LT' in name_u or '20/1 LT' in name_u or '20LT' in name_u:
        return 'Caneca (20 Litros)', 20.0
    if '5 GL' in name_u or '5GL' in name_u or 'CANECA 5' in name_u or '5/1 GL' in name_u:
        return 'Caneca (5 Galones / 19L)', 19.0
    if '2.5 GL' in name_u or '2.5GL' in name_u:
        return 'Media Caneca (2.5 Gal)', 9.5
    if '4/5LT' in name_u or '5LT' in name_u or '5 LT' in name_u:
        return 'Bidón (5 Litros)', 5.0
    if '4/1 GL' in name_u or '1 GL' in name_u or '4LT' in name_u or '4 LT' in name_u or 'GALON' in name_u or '3/1 GL' in name_u:
        return '1 Galón (3.78L)', 3.78
    if '12/1 LT' in name_u or '1 LT' in name_u or '1LT' in name_u or 'LITRO' in name_u or '12/1' in name_u:
        return '1 Litro', 1.0
    if 'CUARTO' in name_u:
        return '1 Cuarto (946 ml)', 0.946
    if '18 KG' in name_u or '16 KG' in name_u or '16X1 KG' in name_u:
        return 'Caneca (16-18 kg)', 18.0
    if '4.5 KG' in name_u:
        return 'Tarrina 4.5 kg', 4.5
    if '800 GR' in name_u or '800 GRS' in name_u:
        return 'Tarrina 800 g', 0.8
    if '650 ML' in name_u or '650ML' in name_u:
        return 'Spray 650 ml', 0.65
    if '520 ML' in name_u or '520ML' in name_u:
        return 'Aerosol 520 ml', 0.52
    if '500 ML' in name_u or '500ML' in name_u:
        return 'Spray 500 ml', 0.5
    if '450 ML' in name_u or '450ML' in name_u:
        return 'Envase 450 ml', 0.45
    if '400 ML' in name_u or '400ML' in name_u:
        return 'Spray 400 ml', 0.4
    if '350 ML' in name_u or '350ML' in name_u:
        return 'Envase 350 ml', 0.35
    if '300 ML' in name_u or '300ML' in name_u or '300GR' in name_u:
        return 'Envase 300 ml', 0.3
    if '250 ML' in name_u or '250ML' in name_u or '250 CC' in name_u:
        return 'Envase 250 ml', 0.25
    if '200 ML' in name_u or '200ML' in name_u or '200M' in name_u:
        return 'Spray 200 ml', 0.2
    if '100 ML' in name_u or '100ML' in name_u:
        return 'Envase 100 ml', 0.1
    if '85GR' in name_u or '85 GR' in name_u:
        return 'Tubo 85 g', 0.085
    if '10 ML' in name_u or '10ML' in name_u:
        return 'Gotero 10 ml', 0.01
    if '10OZ' in name_u or '10 OZ' in name_u:
        return 'Aerosol 10 oz', 0.3
    if '1LB' in name_u or '1 LB' in name_u:
        return 'Envase 1 Libra', 0.45
    return 'Presentación Estándar', 1.0

print("Testing detect_presentation:")
for test_str in [
    'MANNOL REFRIGERANTE AZUL AG 11 12/1 LT',
    'MANNOL REFRIGERANTE AZUL AG 11 4/5LT',
    'MANNOL REFRIGERANTE AZUL AG 11 CAN 20/1 LT',
    'MOBIL DELVAC MX 15W40 4/1 GL',
    'MOBIL DELVAC MX 15W40 CANECA 5GL',
    'MOBIL DELVAC MX 15W40 2.5',
    'ABRO REFRIGERANTE ROJO CUARTO',
    'ABRO REFRIGERANTE ROJO GALON',
    'MANNOL DIESEL ESTER ADDITIVE 100ML',
    'MANNOL DIESEL ESTER ADDITIVE 250ML'
]:
    pres, vol = detect_presentation(test_str)
    print(f"  {test_str[:42]:<42} -> {pres:<25} (vol: {vol})")
