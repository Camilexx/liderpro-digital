import os
from PIL import Image

for folder in ['public/images/products/official_be', 'public/images/products/official_bosch']:
    print(f"\n--- {folder} ---")
    for f in sorted(os.listdir(folder)):
        if f.endswith(('.webp', '.png', '.jpg')):
            p = os.path.join(folder, f)
            im = Image.open(p)
            # check top-left pixel color
            corner = im.getpixel((0, 0)) if im.mode in ('RGB', 'RGBA') else 'N/A'
            print(f"{f:<20} | Size: {str(im.size):<12} | Mode: {im.mode:<5} | Corner: {corner}")
