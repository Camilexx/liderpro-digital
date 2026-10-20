import zipfile
from xml.etree import ElementTree as ET

zf = zipfile.ZipFile(r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO FOTOS.xlsx")

# Check workbook sheets
wb_xml = ET.fromstring(zf.read("xl/workbook.xml"))
sheets = wb_xml.findall(".//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet")
wb_rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
rels_map = {r.attrib["Id"]: r.attrib["Target"] for r in wb_rels}

print("=== SHEETS AND TARGETS ===")
for s in sheets:
    s_name = s.attrib["name"]
    r_id = s.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]
    target = rels_map[r_id]
    print(f"Sheet: {s_name} -> {target}")
    
    # Check sheet rels
    sheet_rel_path = f"xl/worksheets/_rels/{target.split('/')[-1]}.rels"
    if sheet_rel_path in zf.namelist():
        s_rels = ET.fromstring(zf.read(sheet_rel_path))
        for sr in s_rels:
            if "drawing" in sr.attrib.get("Type", ""):
                d_target = sr.attrib["Target"]
                # Resolve drawing path
                d_path = "xl/" + d_target.replace("../", "") if d_target.startswith("../") else "xl/worksheets/" + d_target
                d_rel_path = f"xl/drawings/_rels/{d_target.split('/')[-1]}.rels"
                media_count = 0
                if d_rel_path in zf.namelist():
                    dr_rels = ET.fromstring(zf.read(d_rel_path))
                    media_count = len([m for m in dr_rels if "image" in m.attrib.get("Type", "")])
                print(f"   Drawing: {d_path} with {media_count} media images")
