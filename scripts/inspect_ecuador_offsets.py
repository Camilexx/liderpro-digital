import zipfile
from xml.etree import ElementTree as ET
import openpyxl

excel_path = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO FOTOS.xlsx"
zf = zipfile.ZipFile(excel_path)
wb = openpyxl.load_workbook(excel_path, data_only=True)
ws = wb['BATERIAS ECUADOR']
rows = list(ws.iter_rows(values_only=True))

ns = {'xdr': 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing', 'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
root = ET.fromstring(zf.read('xl/drawings/drawing2.xml'))
rels = ET.fromstring(zf.read('xl/drawings/_rels/drawing2.xml.rels'))
rel_map = {r.attrib['Id']: r.attrib['Target'] for r in rels}

for anc in root.findall('.//xdr:twoCellAnchor', ns) + root.findall('.//xdr:oneCellAnchor', ns):
    pic = anc.find('xdr:pic', ns)
    if pic is None: continue
    blip = pic.find('.//a:blip', ns)
    r_id = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
    target = rel_map.get(r_id)
    
    f_row = anc.find('xdr:from/xdr:row', ns).text
    f_off = anc.find('xdr:from/xdr:rowOff', ns).text if anc.find('xdr:from/xdr:rowOff', ns) is not None else '0'
    t_row = anc.find('xdr:to/xdr:row', ns).text if anc.find('xdr:to', ns) is not None else ''
    t_off = anc.find('xdr:to/xdr:rowOff', ns).text if anc.find('xdr:to/xdr:rowOff', ns) is not None else '0'
    
    # Calculate midpoint row
    r_from_int = int(f_row)
    prod = rows[r_from_int][1] if r_from_int < len(rows) and len(rows[r_from_int]) > 1 else 'N/A'
    
    print(f"Target: {target:25} | from row {int(f_row)+1} (off={f_off:7}) to row {int(t_row)+1 if t_row else '':2} (off={t_off:7}) | prod: {prod}")
