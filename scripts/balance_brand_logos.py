import os
from PIL import Image, ImageOps

brands_dir = 'c:/Users/PC/Desktop/NEXUS/liderpro-digital/public/images/brands'
brand_files = [
    'baterias-ecuador.png',
    'bosch.png',
    'mannol.png',
    'mobil.png',
    'valvoline.png',
    'motul.png',
    'aroil.png',
    'amalie.png',
    'advance.png',
    'abro.png',
    'simoniz.png',
    'areon.png'
]

for b in brand_files:
    p = os.path.join(brands_dir, b)
    if os.path.exists(p):
        im = Image.open(p)
        # Check bounding box of non-transparent pixels
        bbox = im.getbbox()
        if bbox:
            cropped = im.crop(bbox)
            w, h = cropped.size
            # Add small uniform padding (5%)
            pad = int(max(w, h) * 0.05)
            # Create transparent canvas with padding
            padded = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
            padded.paste(cropped, (pad, pad))
            padded.save(p, "PNG")
            print(f"Trimmed & balanced {b:22}: original={im.size} -> trimmed={cropped.size} -> padded={padded.size}")
        else:
            print(f"{b}: all transparent?")
    else:
        print(f"NOT FOUND: {b}")
