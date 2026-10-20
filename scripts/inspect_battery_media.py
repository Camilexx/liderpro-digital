import zipfile, io
from PIL import Image

excel_path = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO FOTOS.xlsx"
zf = zipfile.ZipFile(excel_path)

media_files = [n for n in zf.namelist() if n.startswith("xl/media/")]
print(f"Total media files in zip: {len(media_files)}")

# Let's inspect images 1 to 30 (the ones used in batteries)
for i in range(1, 35):
    found = [n for n in media_files if f"image{i}." in n]
    if found:
        fname = found[0]
        data = zf.read(fname)
        try:
            im = Image.open(io.BytesIO(data))
            print(f"{fname:25}: format={im.format}, size={im.size}, bytes={len(data)}")
        except Exception as e:
            print(f"{fname:25}: error {e}")
