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

def map_pics_to_rows(sheet_name, drawing_path, rel_path):
    print(f"\n=================== {sheet_name} ===================")
    ws = wb[sheet_name]
    rows = list(ws.iter_rows(values_only=True))
    
    rels = ET.fromstring(zf.read(rel_path))
    rel_map = {r.attrib['Id']: r.attrib['Target'] for r in rels}
    root = ET.fromstring(zf.read(drawing_path))
    
    # Iterate over all twoCellAnchor and oneCellAnchor containing a pic
    anchors = root.findall('.//xdr:twoCellAnchor', ns) + root.findall('.//xdr:oneCellAnchor', ns)
    
    mapped = []
    for anc in anchors:
        pic = anc.find('xdr:pic', ns)
        if pic is None: continue
        
        name = pic.find('.//xdr:cNvPr', ns).attrib.get('name', '')
        blip = pic.find('.//a:blip', ns)
        r_id = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
        target = rel_map.get(r_id)
        
        srcRect = pic.find('.//a:srcRect', ns)
        crop = {k: int(v) for k, v in srcRect.attrib.items()} if srcRect is not None else None
        
        from_el = anc.find('xdr:from', ns)
        r_from = int(from_el.find('xdr:row', ns).text)
        c_from = int(from_el.find('xdr:col', ns).text)
        r_off = int(from_el.find('xdr:rowOff', ns).text) if from_el.find('xdr:rowOff', ns) is not None else 0
        
        to_el = anc.find('xdr:to', ns)
        r_to = int(to_el.find('xdr:row', ns).text) if to_el is not None else r_from
        c_to = int(to_el.find('xdr:col', ns).text) if to_el is not None else c_from
        
        # Row content
        prod_text = None
        if r_from < len(rows):
            for cell in rows[r_from]:
                if cell and isinstance(cell, str) and len(cell.strip()) > 2:
                    prod_text = cell.strip()
                    break
        
        mapped.append({
            'name': name,
            'r_from': r_from,
            'c_from': c_from,
            'r_off': r_off,
            'r_to': r_to,
            'c_to': c_to,
            'target': target,
            'crop': crop,
            'prod_text': prod_text
        })
    
    # Sort by r_from
    mapped.sort(key=lambda x: (x['r_from'], x['c_from']))
    for m in mapped:
        print(f"Row {m['r_from']+1:2} (col {m['c_from']}): {m['target']:25} | crop={m['crop']} | {m['prod_text']}")

map_pics_to_rows('BATERIAS BOSCH', 'xl/drawings/drawing1.xml', 'xl/drawings/_rels/drawing1.xml.rels')
map_pics_to_rows('BATERIAS ECUADOR', 'xl/drawings/drawing2.xml', 'xl/drawings/_rels/drawing2.xml.rels')
