import zipfile
import xml.etree.ElementTree as ET
import os

filepath = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx"

with zipfile.ZipFile(filepath, "r") as z:
    wb_root = ET.fromstring(z.read("xl/workbook.xml"))
    wb_rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
    sheet_target = {r.attrib["Id"]: r.attrib["Target"] for r in wb_rels}
    
    ns_wb = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    ns_draw = {
        "xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
        "a": "http://schemas.openxmlformats.org/drawingml/2006/main"
    }
    
    for s in wb_root.findall(".//s:sheet", ns_wb):
        name = s.attrib["name"]
        r_id = s.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]
        target = sheet_target[r_id]
        sheet_file = f"xl/{target}"
        rel_file = f"xl/worksheets/_rels/{target.split('/')[-1]}.rels"
        
        if rel_file not in z.namelist():
            print(f"\nSheet '{name}': NO DRAWING")
            continue
            
        s_rels = ET.fromstring(z.read(rel_file))
        draw_targets = [r.attrib["Target"] for r in s_rels if "drawing" in r.attrib["Type"]]
        if not draw_targets:
            print(f"\nSheet '{name}': NO DRAWING TARGET")
            continue
            
        draw_rel_path = draw_targets[0] # e.g. ../drawings/drawing1.xml
        draw_filename = "xl/drawings/" + draw_rel_path.split("/")[-1]
        draw_rels_file = "xl/drawings/_rels/" + draw_rel_path.split("/")[-1] + ".rels"
        
        rel_map = {}
        if draw_rels_file in z.namelist():
            dr_rels_root = ET.fromstring(z.read(draw_rels_file))
            rel_map = {r.attrib["Id"]: r.attrib["Target"] for r in dr_rels_root}
            
        draw_root = ET.fromstring(z.read(draw_filename))
        
        anchors_by_row = {}
        for anchor in draw_root:
            from_el = anchor.find("xdr:from", ns_draw)
            if from_el is None:
                continue
            col = int(from_el.find("xdr:col", ns_draw).text) + 1
            row = int(from_el.find("xdr:row", ns_draw).text) + 1
            
            blip = anchor.find(".//a:blip", ns_draw)
            if blip is not None:
                embed = blip.attrib.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed")
                img = rel_map.get(embed, "")
                if row not in anchors_by_row:
                    anchors_by_row[row] = {}
                anchors_by_row[row][col] = img
                
        print(f"\nSheet '{name}' ({draw_filename}): {len(anchors_by_row)} rows with images")
        # Print first 5 rows with images
        for r in sorted(anchors_by_row.keys())[:10]:
            print(f"  Row {r}: cols {anchors_by_row[r]}")
