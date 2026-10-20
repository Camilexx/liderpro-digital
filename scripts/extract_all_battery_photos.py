import os, zipfile, io
from PIL import Image, ImageOps
from xml.etree import ElementTree as ET
import openpyxl

excel_path = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO FOTOS.xlsx"
out_dir = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\public\images\products"
os.makedirs(out_dir, exist_ok=True)

zf = zipfile.ZipFile(excel_path)
wb = openpyxl.load_workbook(excel_path, data_only=True)

ns = {
    'xdr': 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}

def extract_and_process_image(media_rel_path, crop, out_filename):
    # media_rel_path is like '../media/image1.png'
    raw_path = "xl/" + media_rel_path.replace("../", "")
    if raw_path not in zf.namelist():
        print(f"ERROR: {raw_path} not found in zip!")
        return None
        
    data = zf.read(raw_path)
    im = Image.open(io.BytesIO(data))
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGBA')
        
    # Apply DrawingML crop (percentages in 1/100,000)
    w, h = im.size
    if crop:
        l = int(crop.get('l', 0)) * w / 100000.0
        t = int(crop.get('t', 0)) * h / 100000.0
        r = int(crop.get('r', 0)) * w / 100000.0
        b = int(crop.get('b', 0)) * h / 100000.0
        im = im.crop((l, t, max(l+1, w - r), max(t+1, h - b)))
        
    # Place on clean white 800x800 square canvas
    target_size = 800
    # Keep aspect ratio
    im.thumbnail((720, 720), Image.Resampling.LANCZOS)
    canvas = Image.new('RGB', (target_size, target_size), (255, 255, 255))
    
    # Center on canvas
    offset_x = (target_size - im.width) // 2
    offset_y = (target_size - im.height) // 2
    
    if im.mode == 'RGBA':
        canvas.paste(im, (offset_x, offset_y), im)
    else:
        canvas.paste(im, (offset_x, offset_y))
        
    dest_path = os.path.join(out_dir, out_filename)
    canvas.save(dest_path, "PNG", quality=95)
    print(f"Saved: {out_filename} ({canvas.size}) from {raw_path} [crop={crop}]")
    return f"/images/products/{out_filename}"

# Bosch mapping
bosch_mapping = {
    "02724HPIS4": ("../media/image1.png", {'t': 14498, 'b': 19393}, "battery-bosch-24-hp-i-s4-64amp-602438.png"),
    "02724HPS4":  ("../media/image3.png", {'t': 12178, 'b': 13981}, "battery-bosch-24-hp-s4-64amp-602434.png"),
    "02727HPIS4": ("../media/image2.png", {'t': 21457, 'b': 15914}, "battery-bosch-27-hp-i-s4-85amp-602738.png"),
    "02727HPS4":  ("../media/image2.png", {'t': 21457, 'b': 15914}, "battery-bosch-27-hp-s4-88amp-602732.png"),
    "02734HPS4":  ("../media/image4.jpeg", {'t': 10052, 'b': 9921}, "battery-bosch-34-hp-s4-70amp-603432.png"),
    "02742FES3":  ("../media/image6.png", {'t': 11722, 'b': 14247}, "battery-bosch-42-fe-s3-45amp-304222.png"),
    "02742HPIS4": ("../media/image5.jpeg", {'t': 17204, 'b': 16300}, "battery-bosch-42-hp-i-s4-55amp-604236.png"),
    "42HPS4":     ("../media/image5.jpeg", {'t': 17204, 'b': 16300}, "battery-bosch-42-hp-s4-55amp-604232.png"),
    "0277B6548":  ("../media/image7.jpeg", {'t': 20104, 'b': 21132}, "battery-bosch-b65-mp-i-s5-sellada.png"),
    "027N40FES4": ("../media/image8.jpeg", {'t': 14304, 'b': 14560}, "battery-bosch-n40-fe-s4-43amp-614022.png"),
    "027NS40FEFS4": ("../media/image9.jpeg", {'t': 8699, 'b': 8374}, "battery-bosch-ns40-fe-f-s4-604023.png"),
    "027NS40FEIFS4": ("../media/image9.jpeg", {'t': 8699, 'b': 8374}, "battery-bosch-ns40-fe-i-f-s4-42amp-604027.png"),
}

# Ecuador mapping
ecuador_mapping = {
    "03024-FE":     ("../media/image10.jpeg", {'l': 13735, 't': 22810, 'r': 14304, 'b': 21132}, "battery-ecuador-24-fe-full-equipo-65-amp.png"),
    "03024-FE-I":   ("../media/image10.jpeg", {'l': 13735, 't': 22810, 'r': 14304, 'b': 21132}, "battery-ecuador-24-fe-i-full-equipo-65-amp.png"),
    "03024-HP-I":   ("../media/image11.jpeg", {'t': 17784, 'b': 18040}, "battery-ecuador-24-hp-i-high-power-85-amp.png"),
    "03027-FE":     ("../media/image12.jpeg", {'t': 12371, 'r': 4557, 'b': 13980}, "battery-ecuador-27-fe-full-equipo-80-amp.png"),
    "03027-FE-I":   ("../media/image12.jpeg", {'t': 12371, 'r': 4557, 'b': 13980}, "battery-ecuador-27-fe-i-full-equipo-80-amp.png"),
    "03027-HP":     ("../media/image13.jpeg", {'l': 11584, 't': 22423, 'r': 11759, 'b': 21905}, "battery-ecuador-27-hp-high-power-95-amp.png"),
    "03027-HP-I":   ("../media/image13.jpeg", {'l': 11584, 't': 22423, 'r': 11759, 'b': 21905}, "battery-ecuador-27-hp-i-high-power-95-amp.png"),
    "03031-SHD":    ("../media/image14.jpeg", {'l': 13324, 't': 23389, 'r': 12917, 'b': 23066}, "battery-ecuador-31-shd-super-heavy-duty-105-amp.png"),
    "03034-FE":     ("../media/image15.jpeg", {'l': 4053, 't': 8505, 'r': 4469, 'b': 8567}, "battery-ecuador-34-fe-full-equipo-65-amp.png"),
    "03034-FE-I":   ("../media/image15.jpeg", {'l': 4053, 't': 8505, 'r': 4469, 'b': 8567}, "battery-ecuador-34-fe-i-full-equipo-65-amp.png"),
    "03034-HP":     ("../media/image16.jpeg", {'l': 11972, 't': 20104, 'r': 11179, 'b': 18813}, "battery-ecuador-34-hp-high-power-80-amp.png"),
    "03034-HP-I":   ("../media/image16.jpeg", {'l': 11972, 't': 20104, 'r': 11179, 'b': 18813}, "battery-ecuador-34-hp-i-high-power-80-amp.png"),
    "03036-HP":     ("../media/image17.jpeg", {'l': 6561, 't': 12758, 'r': 6985, 'b': 13787}, "battery-ecuador-36-hp-high-power-50-amp.png"),
    "03042-FE":     ("../media/image18.jpeg", {'l': 4248, 't': 11984, 'r': 3456, 'b': 13593}, "battery-ecuador-42-fe-full-equipo-55-amp.png"),
    "03042-HP":     ("../media/image19.jpeg", {'l': 11578, 't': 17977, 'r': 9880, 'b': 17073}, "battery-ecuador-42-hp-high-power-62-amp.png"),
    "03042-HP-I":   ("../media/image19.jpeg", {'l': 11578, 't': 17977, 'r': 9880, 'b': 17073}, "battery-ecuador-42-hp-i-high-power-62-amp.png"),
    "03055-HD":     ("../media/image20.jpeg", {'l': 2896, 't': 12178, 'r': 3069, 'b': 11854}, "battery-ecuador-55-hd-14pl-63amp-servicio-publico.png"),
    "03055-HD-I":   ("../media/image20.jpeg", {'l': 2896, 't': 12178, 'r': 3069, 'b': 11854}, "battery-ecuador-55-hd-i-14pl-63amp-servicio-publico.png"),
    "03065-HP":     ("../media/image21.jpeg", {'l': 8303, 't': 13531, 'r': 8863, 'b': 13014}, "battery-ecuador-65-hp-high-power-65-amp.png"),
    "03066-HP":     ("../media/image22.jpeg", {'l': 10041, 't': 24356, 'r': 9054, 'b': 22679}, "battery-ecuador-66-hp-high-power-84-amp.png"),
    "030N100-SHD-I":("../media/image23.jpeg", {'l': 9076, 't': 24550, 'r': 9055, 'b': 24612}, "battery-ecuador-n100-shd-i-super-heavy-duty-104-amp.png"),
    "030N150-SHD":  ("../media/image24.jpeg", {'l': 6179, 't': 29189, 'r': 6158, 'b': 30024}, "battery-ecuador-n150-shd-super-heavy-duty-160-amp.png"),
    "030N40-FE-I":  ("../media/image25.jpeg", {'l': 8883, 't': 9472, 'r': 9634, 'b': 9148}, "battery-ecuador-n40-fe-i-full-equipo-45-amp.png"),
    "030N40-HP":    ("../media/image25.jpeg", {'l': 8883, 't': 9472, 'r': 9634, 'b': 9148}, "battery-ecuador-n40-hp-high-power-50-amp.png"),
    "030N40-HP-I":  ("../media/image26.jpeg", {'l': 10448, 't': 12742, 'r': 11322, 'b': 11570}, "battery-ecuador-n40-hp-i-high-power-50-amp.png"),
    "030NS40-FE":   ("../media/image27.jpeg", {'l': 4240, 'r': 4201}, "battery-ecuador-ns40-fe-full-equipo-42-amp.png"),
    "030NS40-FE-I": ("../media/image27.jpeg", {'l': 4240, 'r': 4201}, "battery-ecuador-ns40-fe-i-full-equipo-42-amp.png"),
    "030NS40-HP":   ("../media/image28.jpeg", {'l': 14525, 't': 10958, 'r': 12852, 'b': 11315}, "battery-ecuador-ns40-hp-high-power-45-amp.png"),
}

saved_map = {}
for sku, (media, crop, fname) in {**bosch_mapping, **ecuador_mapping}.items():
    res = extract_and_process_image(media, crop, fname)
    if res:
        saved_map[sku] = res

print(f"\nExtracted {len(saved_map)} battery images successfully!")
