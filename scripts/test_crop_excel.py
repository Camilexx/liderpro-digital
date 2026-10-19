from PIL import Image
import zipfile
import xml.etree.ElementTree as ET
import os

filepath = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx"
out_dir = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\scripts\test_crops"
os.makedirs(out_dir, exist_ok=True)

with zipfile.ZipFile(filepath, "r") as z:
    draw_rels = ET.fromstring(z.read("xl/drawings/_rels/drawing9.xml.rels"))
    rel_map = {r.attrib["Id"]: r.attrib["Target"] for r in draw_rels}
    
    draw_root = ET.fromstring(z.read("xl/drawings/drawing9.xml"))
    ns = {
        "xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
        "a": "http://schemas.openxmlformats.org/drawingml/2006/main"
    }
    
    idx = 0
    for anchor in draw_root:
        from_el = anchor.find("xdr:from", ns)
        if from_el is None:
            continue
        c = int(from_el.find("xdr:col", ns).text) + 1
        r = int(from_el.find("xdr:row", ns).text) + 1
        
        pic = anchor.find("xdr:pic", ns)
        if pic is None:
            continue
            
        blip = pic.find(".//a:blip", ns)
        if blip is None:
            continue
            
        embed = blip.attrib.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed")
        target_img = rel_map.get(embed)
        
        src_rect = pic.find(".//a:srcRect", ns)
        
        # Read image
        img_data = z.read("xl/" + target_img.replace("../", ""))
        from io import BytesIO
        im = Image.open(BytesIO(img_data))
        W, H = im.size
        
        if src_rect is not None and any(k in src_rect.attrib for k in ["l", "t", "r", "b"]):
            l = float(src_rect.attrib.get("l", 0)) / 100000.0
            t = float(src_rect.attrib.get("t", 0)) / 100000.0
            right = float(src_rect.attrib.get("r", 0)) / 100000.0
            b = float(src_rect.attrib.get("b", 0)) / 100000.0
            
            x1 = int(round(W * l))
            y1 = int(round(H * t))
            x2 = int(round(W * (1.0 - right)))
            y2 = int(round(H * (1.0 - b)))
            
            if x2 > x1 and y2 > y1:
                im = im.crop((x1, y1, x2, y2))
                
        out_name = f"row{r}_col{c}_idx{idx}.png"
        im.save(os.path.join(out_dir, out_name))
        print(f"Saved: {out_name} (from Row {r}, Col {c}) size={im.size}")
        idx += 1
