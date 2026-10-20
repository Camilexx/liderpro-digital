import zipfile
from xml.etree import ElementTree as ET

zf = zipfile.ZipFile(r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO FOTOS.xlsx")
for draw_name in ['xl/drawings/drawing1.xml', 'xl/drawings/drawing2.xml']:
    print(f"=== {draw_name} ===")
    root = ET.fromstring(zf.read(draw_name))
    for i, child in enumerate(list(root)[:5]):
        print(f"--- Child {i}: tag={child.tag} ---")
        xml_str = ET.tostring(child, encoding='utf-8').decode('utf-8')
        print(xml_str[:300])
