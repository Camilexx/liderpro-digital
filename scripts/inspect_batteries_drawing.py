import zipfile
from xml.etree import ElementTree as ET
import openpyxl

excel_path = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO FOTOS.xlsx"
zf = zipfile.ZipFile(excel_path)
wb = openpyxl.load_workbook(excel_path, data_only=True)

def inspect_sheet_drawing(sheet_name, drawing_path, rel_path):
    print(f"\n=================== {sheet_name} ===================")
    ws = wb[sheet_name]
    rows = list(ws.iter_rows(values_only=True))
    
    # Read rels
    rels_root = ET.fromstring(zf.read(rel_path))
    rel_map = {r.attrib["Id"]: r.attrib["Target"] for r in rels_root}
    
    # Read drawing
    draw_root = ET.fromstring(zf.read(drawing_path))
    ns = {
        'xdr': 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing',
        'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
        'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    }
    
    anchors = draw_root.findall('.//xdr:twoCellAnchor', ns) + draw_root.findall('.//xdr:oneCellAnchor', ns)
    print(f"Total anchors in {drawing_path}: {len(anchors)}")
    
    for i, anc in enumerate(anchors):
        from_el = anc.find('xdr:from', ns)
        r_from = int(from_el.find('xdr:row', ns).text) if from_el is not None else -1
        c_from = int(from_el.find('xdr:col', ns).text) if from_el is not None else -1
        
        to_el = anc.find('xdr:to', ns)
        r_to = int(to_el.find('xdr:row', ns).text) if to_el is not None else -1
        c_to = int(to_el.find('xdr:col', ns).text) if to_el is not None else -1
        
        blip = anc.find('.//a:blip', ns)
        embed_id = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed') if blip is not None else None
        target = rel_map.get(embed_id, "NONE")
        
        # Check product at this row
        prod_val = rows[r_from] if r_from < len(rows) else None
        print(f"Anchor #{i+1:2}: from col {c_from}, row {r_from+1} to col {c_to}, row {r_to+1} | img: {target} | row content: {prod_val[:4] if prod_val else 'EMPTY'}")

inspect_sheet_drawing('BATERIAS BOSCH', 'xl/drawings/drawing1.xml', 'xl/drawings/_rels/drawing1.xml.rels')
inspect_sheet_drawing('BATERIAS ECUADOR', 'xl/drawings/drawing2.xml', 'xl/drawings/_rels/drawing2.xml.rels')
