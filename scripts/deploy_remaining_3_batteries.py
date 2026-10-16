import os
from PIL import Image
import numpy as np

OUT_DIR = r"public/images/products"
BE_DIR = r"public/images/products/official_be"

def process_be_image(src_path):
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)
    
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    diff1 = np.abs(r - g)
    diff2 = np.abs(g - b)
    is_neutral_light = (r > 225) & (g > 225) & (b > 225) & (diff1 < 6) & (diff2 < 6)
    factor = np.clip((r - 225) / (241 - 225), 0.0, 1.0)
    for c in range(3):
        arr[:, :, c] = np.where(is_neutral_light, arr[:, :, c] + (255 - arr[:, :, c]) * factor, arr[:, :, c])
    
    clean_img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), mode="RGBA").convert("RGB")
    final_img = clean_img.resize((800, 800), Image.Resampling.LANCZOS)
    return final_img

# 1. Process 0995009R (SOPORTE DE BATERIA UNIVERSAL ROJO VARILLA LARGA)
# Uses official Baterías Ecuador High Power F65 / 24 with red top lid and handle
img_0995009r = process_be_image(os.path.join(BE_DIR, "f65-01.webp"))
img_0995009r.save(os.path.join(OUT_DIR, "spec-0995009R.png"), "PNG", optimize=True)
img_0995009r.save(os.path.join(OUT_DIR, "battery-0995009R.png"), "PNG", optimize=True)
print("Saved 0995009R")

# 2. Process 0995009VCU (SOPORTE DE BATERIA INFERIOR PEQUEÑO UNIVERSAL)
# Uses official Baterías Ecuador High Power DIN 48 with inferior clamp ledge
img_0995009vcu = process_be_image(os.path.join(BE_DIR, "48-01.webp"))
img_0995009vcu.save(os.path.join(OUT_DIR, "spec-0995009VCU.png"), "PNG", optimize=True)
img_0995009vcu.save(os.path.join(OUT_DIR, "battery-0995009VCU.png"), "PNG", optimize=True)
print("Saved 0995009VCU")

# 3. Process ECOVLBAT (PROGRAMA DE RECICLAJE & GESTIÓN AMBIENTAL DE BATERÍAS)
# Uses the verified preview_ecovlbat_perfect.png composite
img_ecovlbat = Image.open("scripts/preview_ecovlbat_perfect.png").convert("RGB")
img_ecovlbat.save(os.path.join(OUT_DIR, "spec-ECOVLBAT.png"), "PNG", optimize=True)
img_ecovlbat.save(os.path.join(OUT_DIR, "battery-ECOVLBAT.png"), "PNG", optimize=True)
print("Saved ECOVLBAT")

# 4. Clean Terminal SKUs (098TBDN, 098TBDP, 098TBG-IN, 098TBGN, 098TBGP)
# Normalize battery-terminal.png to pure white background and save to all 5 SKUs
term_src = Image.open(os.path.join(OUT_DIR, "battery-terminal.png")).convert("RGBA")
tarr = np.array(term_src, dtype=np.float32)
tr, tg, tb = tarr[:, :, 0], tarr[:, :, 1], tarr[:, :, 2]
tdiff1 = np.abs(tr - tg)
tdiff2 = np.abs(tg - tb)
t_is_neutral_light = (tr > 210) & (tg > 210) & (tb > 210) & (tdiff1 < 15) & (tdiff2 < 15)
for c in range(3):
    tarr[:, :, c] = np.where(t_is_neutral_light, 255.0, tarr[:, :, c])

clean_term = Image.fromarray(np.clip(tarr, 0, 255).astype(np.uint8), mode="RGBA").convert("RGB")
clean_term = clean_term.resize((800, 800), Image.Resampling.LANCZOS)

for term_sku in ['098TBDN', '098TBDP', '098TBG-IN', '098TBGN', '098TBGP']:
    clean_term.save(os.path.join(OUT_DIR, f"spec-{term_sku}.png"), "PNG", optimize=True)
    clean_term.save(os.path.join(OUT_DIR, f"battery-{term_sku}.png"), "PNG", optimize=True)
    print(f"Cleaned terminal {term_sku}")

print("\nSUCCESS: All remaining battery & accessory items updated cleanly without banners!")
