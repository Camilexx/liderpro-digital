import json
import zipfile
import os
import re
import io
import numpy as np
import scipy.ndimage as ndi
from PIL import Image, ImageOps, ImageFilter

from scripts.build_full_image_catalog import process_filter_screenshot, fit_to_studio, clean_sku

xlsx_path = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx'
with zipfile.ZipFile(xlsx_path, 'r') as z:
    # Test 1: Air filter
    img_data = z.read('xl/media/image71.jpeg')
    im = Image.open(io.BytesIO(img_data))
    studio_filter = process_filter_screenshot(im)
    studio_filter.save('temp_inspect/test_filter_studio.png')
    print("Saved test_filter_studio.png (size:", studio_filter.size, ")")

    # Test 2: Lubricant bottle (Mannol 1L)
    img_data2 = z.read('xl/media/image1.png')
    im2 = Image.open(io.BytesIO(img_data2))
    studio_bottle = fit_to_studio(im2)
    studio_bottle.save('temp_inspect/test_bottle_studio.png')
    print("Saved test_bottle_studio.png (size:", studio_bottle.size, ")")

    # Test 3: Mobil Gallon
    img_data3 = z.read('xl/media/image63.jpeg')
    im3 = Image.open(io.BytesIO(img_data3))
    studio_mobil = fit_to_studio(im3)
    studio_mobil.save('temp_inspect/test_mobil_studio.png')
    print("Saved test_mobil_studio.png (size:", studio_mobil.size, ")")
