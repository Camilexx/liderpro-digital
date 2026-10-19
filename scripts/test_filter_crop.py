from PIL import Image
import zipfile
import xml.etree.ElementTree as ET
import os

filepath = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx"
out_dir = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\scripts\test_filter_crops"
os.makedirs(out_dir, exist_ok=True)

with zipfile.ZipFile(filepath, "r") as z:
    draw_root = ET.fromstring(z.read("xl/drawings/drawing4.xml"))
    draw_rels = ET.fromstring(z.read("xl/drawings/_rels/drawing4.xml.rels"))
    rel_map = {r.attrib["Id"]: r.attrib["Target"] for r in draw_rels}
    ns = {
        "xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
        "a": "http://schemas.openxmlformats.org/drawingml/2006/main"
    }
    
    for idx, pic in enumerate(draw_root.findall(".//xdr:pic", ns)[:4]):
        blip = pic.find(".//a:blip", ns)
        embed = blip.attrib.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed")
        tgt = rel_map.get(embed)
        src_rect = pic.find(".//a:srcRect", ns)
        
        img_bytes = z.read("xl/" + tgt.replace("../", ""))
        from io import BytesIO
        im = Image.open(BytesIO(img_bytes))
        W, H = im.size
        
        if src_rect is not None and any(k in src_rect.attrib for k in ["l", "t", "r", "b"]):
            l = float(src_rect.attrib.get("l", 0)) / 100000.0
            t = float(src_rect.attrib.get("t", 0)) / 100000.0
            r = float(src_rect.attrib.get("r", 0)) / 100000.0
            b = float(src_rect.attrib.get("b", 0)) / 100000.0
            
            x1 = int(round(W * l))
            y1 = int(round(H * t))
            x2 = int(round(W * (1.0 - r)))
            y2 = int(round(H * (1.0 - b)))
            im = im.crop((x1, y1, x2, y2))
            
        out_file = os.path.join(out_dir, f"crop_{idx}_{embed}.png")
        im.save(out_file)
        print(f"Saved: {out_file} size={im.size}")
