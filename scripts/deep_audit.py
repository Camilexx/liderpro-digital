import openpyxl
import os
import re
import json
import zipfile
import xml.etree.ElementTree as ET

folder = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES'
filtros_xlsx = os.path.join(folder, 'FILTROS.xlsx')
inventario_xlsx = os.path.join(folder, 'INVENTARIO.xlsx')

# 1. Parse all drawings and images per sheet in FILTROS.xlsx
with zipfile.ZipFile(filtros_xlsx, 'r') as z:
    wb_rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
    rid_map = {r.attrib['Id']: r.attrib['Target'] for r in wb_rels.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship')}
    wb = ET.fromstring(z.read('xl/workbook.xml'))
    sheet_drawings = {}
    for s in wb.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet'):
        s_name = s.attrib['name']
        s_rid = s.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
        s_target = rid_map[s_rid]
        sheet_path = ('xl/' + s_target[3:]) if s_target.startswith('../') else ('xl/' + s_target if not s_target.startswith('xl/') else s_target)
        s_dir, s_file = sheet_path.rsplit('/', 1)
        rels_path = f'{s_dir}/_rels/{s_file}.rels'
        if rels_path in z.namelist():
            s_rels = ET.fromstring(z.read(rels_path))
            for rel in s_rels.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                if 'drawing' in rel.attrib['Type']:
                    d_target = rel.attrib['Target']
                    d_path = ('xl/' + d_target[3:]) if d_target.startswith('../') else (s_dir + '/' + d_target)
                    sheet_drawings[s_name] = d_path

    # Extract all drawing anchors: sheet -> list of {row, col, img_target, media_path}
    sheet_anchors = {}
    for sname, dpath in sheet_drawings.items():
        d_dir, d_file = dpath.rsplit('/', 1)
        d_rels_path = f'{d_dir}/_rels/{d_file}.rels'
        img_map = {}
        if d_rels_path in z.namelist():
            d_rels = ET.fromstring(z.read(d_rels_path))
            for r in d_rels.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                if 'image' in r.attrib['Type']:
                    img_map[r.attrib['Id']] = r.attrib['Target']
        
        d_root = ET.fromstring(z.read(dpath))
        anchors = []
        for anchor in d_root:
            from_tag = anchor.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}from')
            blip = anchor.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
            if from_tag is not None and blip is not None:
                col = int(from_tag.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}col').text)
                row = int(from_tag.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}row').text)
                embed = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                target = img_map.get(embed)
                if target:
                    # Clean target path to xl/media/...
                    media_name = os.path.basename(target)
                    anchors.append({
                        'row': row + 1,  # 1-indexed to match openpyxl row
                        'col': col + 1,  # 1-indexed to match openpyxl col
                        'media_name': media_name,
                        'zip_path': f'xl/media/{media_name}'
                    })
        sheet_anchors[sname] = anchors

print("Drawing sheets loaded:")
for sname, anch in sheet_anchors.items():
    print(f"  {sname:<25}: {len(anch)} image anchors")

# 2. Parse FILTROS.xlsx cell data per sheet
wb_filtros = openpyxl.load_workbook(filtros_xlsx, data_only=True)
sheet_rows = {}
for sname in sheet_anchors.keys():
    ws = wb_filtros[sname]
    rows = []
    for r in range(1, ws.max_row + 1):
        c1 = ws.cell(r, 1).value
        c2 = ws.cell(r, 2).value
        # Check if there are images anchored to this row
        row_imgs = [a for a in sheet_anchors[sname] if a['row'] == r]
        # Sort images by column (left to right -> smallest to largest presentation)
        row_imgs.sort(key=lambda x: x['col'])
        if c1 or c2 or row_imgs:
            rows.append({
                'row_num': r,
                'col1': str(c1).strip() if c1 is not None else '',
                'col2': str(c2).strip() if c2 is not None else '',
                'images': row_imgs
            })
    sheet_rows[sname] = rows
    print(f"  {sname:<25}: {len(rows)} data rows, {sum(len(rw['images']) for rw in rows)} anchored images")

# 3. Parse INVENTARIO.xlsx
inv_wb = openpyxl.load_workbook(inventario_xlsx, data_only=True)
inv_ws = inv_wb.active
inventory_items = []
for r in range(8, inv_ws.max_row + 1):
    sku = inv_ws.cell(r, 1).value
    name = inv_ws.cell(r, 2).value
    barcode = inv_ws.cell(r, 3).value
    stock = inv_ws.cell(r, 6).value
    cost = inv_ws.cell(r, 8).value
    if sku and name:
        inventory_items.append({
            'row': r,
            'sku': str(sku).strip(),
            'name': str(name).strip(),
            'barcode': str(barcode).strip() if barcode else '',
            'stock': int(stock) if stock is not None else 0,
            'cost': float(cost) if cost is not None else 0.0
        })

print(f"\nTotal inventory items in INVENTARIO.xlsx: {len(inventory_items)}")

# Save intermediate summary for next steps
with open('scripts/full_audit_data.json', 'w', encoding='utf-8') as f:
    json.dump({
        'inventory_items': inventory_items,
        'sheet_rows': sheet_rows
    }, f, indent=2, ensure_ascii=False)

print("Saved audit data to scripts/full_audit_data.json")
