import zipfile
import os

filepath = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx"
out_dir = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\scripts\inspect_aroil_imgs"
os.makedirs(out_dir, exist_ok=True)

with zipfile.ZipFile(filepath, "r") as z:
    for i in range(440, 467):
        for ext in [".jpeg", ".png", ".jpg"]:
            name = f"xl/media/image{i}{ext}"
            if name in z.namelist():
                out_path = os.path.join(out_dir, f"image{i}{ext}")
                with open(out_path, "wb") as f:
                    f.write(z.read(name))
                print(f"Extracted: image{i}{ext} ({len(z.read(name))} bytes)")
