import zipfile
import xml.etree.ElementTree as ET

EXCEL_DIR = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES"

for fname in ["INVENTARIO ACEITES.xlsx", "FOTOS MARCAS.xlsx", "FILTROS DE AIRE AA.xlsx", "FILTROS.xlsx"]:
    fpath = f"{EXCEL_DIR}\\{fname}"
    with zipfile.ZipFile(fpath, "r") as z:
        # Find which drawing belongs to LURICANTE AROIL
        wb_root = ET.fromstring(z.read("xl/workbook.xml"))
        wb_rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        sheet_target = {r.attrib["Id"]: r.attrib["Target"] for r in wb_rels}
        
        ns_wb = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        aroil_target = None
        for s in wb_root.findall(".//s:sheet", ns_wb):
            if s.attrib["name"] == "LURICANTE AROIL":
                aroil_target = sheet_target[s.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]]
                break
        
        if not aroil_target:
            print(f"{fname}: No LURICANTE AROIL")
            continue
            
        rel_file = f"xl/worksheets/_rels/{aroil_target.split('/')[-1]}.rels"
        s_rels = ET.fromstring(z.read(rel_file))
        draw_target = [r.attrib["Target"] for r in s_rels if "drawing" in r.attrib["Type"]][0]
        draw_file = "xl/drawings/" + draw_target.split("/")[-1]
        
        draw_root = ET.fromstring(z.read(draw_file))
        ns_draw = {"xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing"}
        
        # Count anchors with pictures
        anchors = draw_root.findall("xdr:twoCellAnchor", ns_draw) + draw_root.findall("xdr:oneCellAnchor", ns_draw)
        print(f"{fname}: sheet {aroil_target} -> {draw_file} has {len(anchors)} anchors")
