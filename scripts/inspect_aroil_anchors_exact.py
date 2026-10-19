import zipfile
import xml.etree.ElementTree as ET

filepath = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx"
with zipfile.ZipFile(filepath, "r") as z:
    draw_rels = ET.fromstring(z.read("xl/drawings/_rels/drawing9.xml.rels"))
    rel_map = {r.attrib["Id"]: r.attrib["Target"] for r in draw_rels}
    
    draw_root = ET.fromstring(z.read("xl/drawings/drawing9.xml"))
    ns = {
        "xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
        "a": "http://schemas.openxmlformats.org/drawingml/2006/main"
    }
    
    print("All anchors in drawing9 (Aroil):")
    for anchor in draw_root:
        from_el = anchor.find("xdr:from", ns)
        to_el = anchor.find("xdr:to", ns)
        if from_el is None:
            continue
        c1 = int(from_el.find("xdr:col", ns).text) + 1
        r1 = int(from_el.find("xdr:row", ns).text) + 1
        c2 = int(to_el.find("xdr:col", ns).text) + 1 if to_el is not None else None
        r2 = int(to_el.find("xdr:row", ns).text) + 1 if to_el is not None else None
        
        blip = anchor.find(".//a:blip", ns)
        embed = blip.attrib.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed") if blip is not None else None
        img = rel_map.get(embed)
        print(f"From ({r1}, {c1}) To ({r2}, {c2}) -> {img}")
