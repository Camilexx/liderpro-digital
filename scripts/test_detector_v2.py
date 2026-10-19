import re
import json

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

inv_items = full_data['inventory_items']

def detect_presentation_v2(item):
    name = item['name']
    name_u = name.upper()
    sku = item['sku'].upper()
    cost = item.get('cost', 0)
    
    # 1. 20 Liters / 20L Canecas
    # In Mannol/Aroil: 'CAN 20/1 LT', '20/1 CAN', or SKU ending in '-20' or cost > $30 when 20 is present
    if re.search(r'\b20/1\s*CAN\b|\bCAN\s*20/1\s*LT\b|\b20\s*LTS?\b|\b20LT\b', name_u):
        if not (name_u.startswith('MANNOL CJ X 20') and (sku.endswith('-1') or sku.endswith('-1A') or cost < 15.0)):
            return 'Caneca (20 Litros)', 20.0
            
    # 2. 5 Gallons / 19 Liters (Caneca 5 GL)
    if re.search(r'(?<![0-9\.])5\s*GL\b|CAN\s*5/1|\bCANECA\s*5\b|(?<![0-9\.])5/1\s*GL\b|BLD\s*CAN\s*5|CAN\s*5GL', name_u):
        if not re.search(r'2\.5\s*GL|2\.5/1\s*GL', name_u):
            return 'Caneca (5 Galones / 19L)', 19.0
            
    # 3. Media Caneca 2.5 Gallons (9.5 Liters)
    if re.search(r'2\.5\s*GL\b|2\.5/1\s*GL\b|\bMEDIA\s*CANECA\b|(?<![0-9\.])2\.5\b', name_u):
        return 'Media Caneca (2.5 Gal)', 9.5
        
    # 4. 10 Litros
    if re.search(r'\b10\s*LT\b|\b10LT\b|CAN\s*10\s*LT', name_u):
        return 'Caneca (10 Litros)', 10.0
        
    # 5. 5 Litros (Bidón)
    if re.search(r'4/5\s*LT\b|4/5LT\b|(?<![0-9\.])5\s*LT\b|(?<![0-9\.])5LT\b', name_u):
        return 'Bidón (5 Litros)', 5.0
        
    # 6. 1 Galón (3.78 Litros)
    if re.search(r'\b4/1\s*GL\b|\b6/1\s*GL\b|\b3/1\s*GL\b|(?<![0-9\.])1\s*GL\b|\b4\s*LT\b|\bGALON\b|\bGALONES\b', name_u):
        return '1 Galón (3.78L)', 3.78
        
    # 7. 1 Litro (including cases where description mentions 20/1 LT or 12/1 LT with bottle cost)
    if re.search(r'\b12/1\s*LT\b|\b12/1\b|\b20/1\s*LT\b|(?<![0-9\.])1\s*LT\b|\b1LT\b|\bLITRO\b|\bLITROS\b', name_u) or sku.endswith('-1') or sku.endswith('-1A'):
        return '1 Litro', 1.0
        
    # 8. 1 Cuarto (946 ml)
    if 'CUARTO' in name_u:
        return '1 Cuarto (946 ml)', 0.946
        
    # 9. Greases
    if re.search(r'18\s*KG\b|16\s*KG\b|16X1\s*KG\b', name_u):
        return 'Caneca (16-18 kg)', 18.0
    if re.search(r'4\.5\s*KG\b', name_u):
        return 'Tarrina 4.5 kg', 4.5
    if re.search(r'800\s*GR\b|800\s*GRS\b', name_u):
        return 'Tarrina 800 g', 0.8
    if re.search(r'400\s*GR\b|400GR\b', name_u):
        return 'Tubo 400 g', 0.4
    if re.search(r'230\s*GR\b|230GR\b', name_u):
        return 'Tarrina 230 g', 0.23
    if re.search(r'85\s*GR\b|85GR\b', name_u):
        return 'Tubo 85 g', 0.085
    if re.search(r'1\s*LB\b|1LB\b', name_u):
        return 'Envase 1 Libra', 0.45
        
    # 10. Chemicals & Sprays (ml)
    if re.search(r'650\s*ML\b|650ML\b', name_u):
        return 'Spray 650 ml', 0.65
    if re.search(r'520\s*ML\b|520ML\b', name_u):
        return 'Aerosol 520 ml', 0.52
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

print("Testing detect_presentation_v2 on all previously misclassified items:")
test_skus = [
    '012MN7104-1', '012MN7104-5A', '012MN7104-10A', '012MN7104-20A',
    '012MN8101-1A', '012MN8101-4',
    '0368AR10031', '0368AR10001', '0368AR10002', '0368AR10003',
    '0368AR10032', '0368AR10008', '0368AR10009', '0368AR10010',
    '0368AR40038', '0368AR40001',
    '012MN4016-1', '012MN4016-5',
    '012MN7512-1A', '012MN7512-4A',
    '12MN7916-1', '12MN7916-4',
    '015MD-51300', '015MD-513002.5'
]

inv_by_sku = {it['sku'].upper(): it for it in inv_items}
for s in test_skus:
    it = inv_by_sku.get(s.upper())
    if it:
        pres, vol = detect_presentation_v2(it)
        print(f"SKU: {s:<16} | Pres: {pres:<26} | Vol: {vol:<4} | Name: {it['name']}")
