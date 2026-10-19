import openpyxl
import os
import zipfile
import xml.etree.ElementTree as ET
import json
from collections import defaultdict

folder = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES'

# 1. Parse INVENTARIO.xlsx
inv_wb = openpyxl.load_workbook(os.path.join(folder, 'INVENTARIO.xlsx'), data_only=True)
inv_sheet = inv_wb.active

inventory_items = []
for r in range(8, inv_sheet.max_row + 1):
    sku = inv_sheet.cell(r, 1).value
    name = inv_sheet.cell(r, 2).value
    barcode = inv_sheet.cell(r, 3).value
    bodega = inv_sheet.cell(r, 4).value
    bodega_name = inv_sheet.cell(r, 5).value
    stock = inv_sheet.cell(r, 6).value
    cost = inv_sheet.cell(r, 8).value
    
    if sku and name:
        inventory_items.append({
            'row': r,
            'sku': str(sku).strip(),
            'name': str(name).strip(),
            'barcode': str(barcode).strip() if barcode else '',
            'stock': int(stock) if stock is not None else 0
        })

print(f"Total inventory items in INVENTARIO.xlsx: {len(inventory_items)}")

# 2. Inspect FILTROS.xlsx sheets and items
filtros_path = os.path.join(folder, 'FILTROS.xlsx')
wb_filtros = openpyxl.load_workbook(filtros_path, data_only=True)
print(f"\nSheets in FILTROS.xlsx ({len(wb_filtros.sheetnames)}): {wb_filtros.sheetnames}")

for sname in wb_filtros.sheetnames:
    ws = wb_filtros[sname]
    # Check first 5 rows
    rows_with_data = 0
    sample_skus = []
    for r in range(1, min(ws.max_row + 1, 300)):
        vA = ws.cell(r, 1).value
        vB = ws.cell(r, 2).value
        if vA or vB:
            rows_with_data += 1
            if len(sample_skus) < 3 and vA and str(vA).strip() not in ['Artículo', 'Articulo', 'SKU', 'CODIGO']:
                sample_skus.append((str(vA).strip(), str(vB)[:30] if vB else ''))
    print(f"  {sname:<25}: max_row={ws.max_row:>4}, rows_with_data={rows_with_data:>4} | Samples: {sample_skus}")
