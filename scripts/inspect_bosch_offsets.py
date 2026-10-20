import zipfile, io
from PIL import Image
from xml.etree import ElementTree as ET

zf = zipfile.ZipFile(r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO FOTOS.xlsx")
ns = {'xdr': 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing', 'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
root = ET.fromstring(zf.read('xl/drawings/drawing1.xml'))
rels = ET.fromstring(zf.read('xl/drawings/_rels/drawing1.xml.rels'))
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
    
    print(f"Target: {target:25} | from row {int(f_row)+1} (off={f_off}) to row {int(t_row)+1 if t_row else ''} (off={t_off})")
