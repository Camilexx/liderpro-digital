import zipfile
import xml.etree.ElementTree as ET
import os

EXCEL_DIR = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES"

def inspect_file(filename):
    filepath = os.path.join(EXCEL_DIR, filename)
    print(f"\n==========================================")
    print(f"FILE: {filename}")
    print(f"==========================================")
    with zipfile.ZipFile(filepath, "r") as z:
        wb_root = ET.fromstring(z.read("xl/workbook.xml"))
        wb_rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        sheet_target = {r.attrib["Id"]: r.attrib["Target"] for r in wb_rels}
        
        ns_wb = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        for s in wb_root.findall(".//s:sheet", ns_wb):
            name = s.attrib["name"]
            r_id = s.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]
            target = sheet_target[r_id]
            rel_file = f"xl/worksheets/_rels/{target.split('/')[-1]}.rels"
            
            drawings = []
            if rel_file in z.namelist():
                s_rels = ET.fromstring(z.read(rel_file))
                drawings = [r.attrib["Target"] for r in s_rels if "drawing" in r.attrib["Type"]]
            
            print(f"Sheet: '{name}' -> target: {target} -> drawings: {drawings}")

for f in ["INVENTARIO ACEITES.xlsx", "FOTOS MARCAS.xlsx", "FILTROS.xlsx", "FILTROS DE AIRE AA.xlsx"]:
    inspect_file(f)
