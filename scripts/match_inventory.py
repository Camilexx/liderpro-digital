import openpyxl
import os
import re
import json

folder = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES'
inv_wb = openpyxl.load_workbook(os.path.join(folder, 'INVENTARIO.xlsx'), data_only=True)
inv_ws = inv_wb.active

inv_items = []
for r in range(8, inv_ws.max_row + 1):
    sku = inv_ws.cell(r, 1).value
    name = inv_ws.cell(r, 2).value
    stock = inv_ws.cell(r, 6).value
    cost = inv_ws.cell(r, 8).value
    if sku and name:
        inv_items.append({'sku': str(sku).strip(), 'name': str(name).strip(), 'stock': stock, 'cost': cost})

print(f"Total inventory items: {len(inv_items)}")

wb = openpyxl.load_workbook(os.path.join(folder, 'FILTROS.xlsx'), data_only=True)

sheets_to_check = [
    'LURICANTE MANNOL', 'LURICANTE MOBIL', 'LURICANTE AROIL', 
    'LURICANTE AMALIE', 'LURICANTE MOTUL', 'LURICANTE VALVOLINE', 
    'MANNOL', 'ABRO', 'PERFUMES'
]

for sheet_name in sheets_to_check:
    ws = wb[sheet_name]
    print(f"\n=================== {sheet_name} (rows: {ws.max_row}) ===================")
    for r in range(2, ws.max_row + 1):
        name = ws.cell(r, 2).value
        sku_col = ws.cell(r, 1).value
        if not name and not sku_col:
            continue
        name_str = str(name).strip() if name else str(sku_col).strip()
        
        # Clean tokens
        raw_tokens = [w for w in re.split(r'[\s\-\/\(\)\,\.]+', name_str.upper()) if len(w) >= 2]
        filter_words = {'LURICANTE', 'ACEITE', 'MOTOR', 'PARA', 'VIDA', 'UTIL', 'AOS', 'ANOS', 'PLUS', 'SEMI', 'SINTETICO', 'SUPER', 'DE', 'CON', 'EN', 'CJ', 'LT', 'LTS', 'GALON'}
        key_tokens = [w for w in raw_tokens if w not in filter_words]
        
        matches = []
        for item in inv_items:
            item_name = item['name'].upper()
            # If all key tokens are in item name
            if all(k in item_name for k in key_tokens[:3]):
                matches.append(item)
        
        print(f"Row {r:2d}: '{name_str[:50]}' -> {len(matches)} matches")
        for m in matches[:5]:
            print(f"    SKU: {m['sku']:<16} | Stk: {str(m['stock']):>3} | {m['name']}")
