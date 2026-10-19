from PIL import Image
import os

img_dir = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\scripts\inspect_aroil_imgs"
for fname in sorted(os.listdir(img_dir)):
    fpath = os.path.join(img_dir, fname)
    with Image.open(fpath) as im:
        print(f"{fname}: format={im.format}, size={im.size}, mode={im.mode}")
