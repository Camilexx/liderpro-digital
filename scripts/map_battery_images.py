import zipfile
from xml.etree import ElementTree as ET
import openpyxl

excel_path = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO FOTOS.xlsx"
zf = zipfile.ZipFile(excel_path)
wb = openpyxl.load_workbook(excel_path, data_only=True)

ns = {
    'xdr': 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}

def analyze_sheet_images(sheet_name, drawing_path, rel_path):
    print(f"\n=================== {sheet_name} EXACT ROW MAPPING ===================")
    ws = wb[sheet_name]
    rows = list(ws.iter_rows(values_only=True))
    
    rels_root = ET.fromstring(zf.read(rel_path))
    rel_map = {r.attrib["Id"]: r.attrib["Target"] for r in rels_root}
    draw_root = ET.fromstring(zf.read(drawing_path))
    
    anchors = draw_root.findall('.//xdr:twoCellAnchor', ns) + draw_root.findall('.//xdr:oneCellAnchor', ns)
    
    row_images = {}
    for anc in anchors:
        from_el = anc.find('xdr:from', ns)
        if from_el is None: continue
        r_from = int(from_el.find('xdr:row', ns).text)
        c_from = int(from_el.find('xdr:col', ns).text)
        
        blip = anc.find('.//a:blip', ns)
        if blip is None: continue
        embed_id = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
        target = rel_map.get(embed_id)
        if not target: continue
        
        # Check srcRect
        srcRect = anc.find('.//a:srcRect', ns)
        crop = {}
        if srcRect is not None:
            crop = {k: int(v) for k, v in srcRect.attrib.items()}
            
        row_images.setdefault(r_from, []).append((c_from, target, crop))
        
    for r_idx in range(len(rows)):
        row_val = rows[r_idx]
        if any(x is not None for x in row_val):
            p_name = None
            for cell in row_val:
                if cell and isinstance(cell, str) and len(cell.strip()) > 2:
                    p_name = cell.strip()
                    break
            imgs = row_images.get(r_idx, [])
            print(f"Row {r_idx+1:2}: {p_name:55} | Imgs: {imgs}")

analyze_sheet_images('BATERIAS BOSCH', 'xl/drawings/drawing1.xml', 'xl/drawings/_rels/drawing1.xml.rels')
analyze_sheet_images('BATERIAS ECUADOR', 'xl/drawings/drawing2.xml', 'xl/drawings/_rels/drawing2.xml.rels')
