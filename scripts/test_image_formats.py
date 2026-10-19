import zipfile
import io
import os
from PIL import Image

fpath = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx'
sample_images = ['image1.png', 'image2.png', 'image71.jpeg', 'image72.jpeg', 'image210.jpeg', 'image324.jpeg', 'image361.jpeg', 'image526.jpeg']

with zipfile.ZipFile(fpath, 'r') as z:
    for s in sample_images:
        data = z.read('xl/media/' + s)
        im = Image.open(io.BytesIO(data))
        print(f"{s:<15}: mode={im.mode:<5}, size={str(im.size):<12}, format={im.format}")
