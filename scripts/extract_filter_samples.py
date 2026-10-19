from PIL import Image
import zipfile
import os

filepath = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx"
out_dir = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\scripts\test_filter_imgs"
os.makedirs(out_dir, exist_ok=True)

with zipfile.ZipFile(filepath, "r") as z:
    for img_name in ["image210.jpeg", "image211.jpeg", "image72.jpeg", "image73.jpeg"]:
        data = z.read("xl/media/" + img_name)
        with open(os.path.join(out_dir, img_name), "wb") as f:
            f.write(data)
        print(f"Extracted: {img_name}")
