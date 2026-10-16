import os
from PIL import Image
import numpy as np

OUT_DIR = r"public/images/products"
BE_DIR = r"public/images/products/official_be"
BOSCH_DIR = r"public/images/products/official_bosch"

SKU_MAP = {
    # BOSCH (12)
    "02724HPS4": os.path.join(BOSCH_DIR, "s4_24hp.webp"),
    "02724HPIS4": os.path.join(BOSCH_DIR, "s4_24hpi.webp"),
    "02727HPS4": os.path.join(BOSCH_DIR, "s4_27hp.webp"),
    "02727HPIS4": os.path.join(BOSCH_DIR, "s4_27hpi.webp"),
    "02734HPS4": os.path.join(BOSCH_DIR, "s4_34hp.webp"),
    "02742FES3": os.path.join(BOSCH_DIR, "s3_42fe.webp"),
    "02742HPIS4": os.path.join(BOSCH_DIR, "s4_42hpi.webp"),
    "42HPS4": os.path.join(BOSCH_DIR, "s4_42hp.webp"),
    "0277B6548": os.path.join(BOSCH_DIR, "s5_megapower.webp"),
    "027N40FES4": os.path.join(BOSCH_DIR, "s4_ns40fe.webp"),
    "027NS40FEFS4": os.path.join(BOSCH_DIR, "s4_ns40fe.webp"),
    "027NS40FEIFS4": os.path.join(BOSCH_DIR, "s4_ns40fe.webp"),

    # BATERÍAS ECUADOR - FULL EQUIPO (10)
    "03024-FE": os.path.join(BE_DIR, "27fe-1.webp"),
    "03024-FE-I": os.path.join(BE_DIR, "27fe-1.webp"),
    "03027-FE": os.path.join(BE_DIR, "27fe-1.webp"),
    "03027-FE-I": os.path.join(BE_DIR, "27fe-1.webp"),
    "03034-FE": os.path.join(BE_DIR, "27fe-1.webp"),
    "03034-FE-I": os.path.join(BE_DIR, "27fe-1.webp"),
    "03042-FE": os.path.join(BE_DIR, "27fe-1.webp"),
    "030N40-FE-I": os.path.join(BE_DIR, "27fe-1.webp"),
    "030NS40-FE": os.path.join(BE_DIR, "27fe-1.webp"),
    "030NS40-FE-I": os.path.join(BE_DIR, "27fe-1.webp"),

    # BATERÍAS ECUADOR - HIGH POWER (TAPA ROJA) (13)
    "03024-HP-I": os.path.join(BE_DIR, "24-01.webp"),
    "03027-HP": os.path.join(BE_DIR, "27-01.webp"),
    "03027-HP-I": os.path.join(BE_DIR, "27-01.webp"),
    "03034-HP": os.path.join(BE_DIR, "34-01.webp"),
    "03034-HP-I": os.path.join(BE_DIR, "34-01.webp"),
    "03036-HP": os.path.join(BE_DIR, "36-01.webp"),
    "03042-HP": os.path.join(BE_DIR, "42-01.webp"),
    "03042-HP-I": os.path.join(BE_DIR, "42-01.webp"),
    "03065-HP": os.path.join(BE_DIR, "65-01.webp"),
    "03066-HP": os.path.join(BE_DIR, "66-01.webp"),
    "030N40-HP": os.path.join(BE_DIR, "n40-01.webp"),
    "030N40-HP-I": os.path.join(BE_DIR, "n40-01.webp"),
    "030NS40-HP": os.path.join(BE_DIR, "ns40-01.webp"),

    # BATERÍAS ECUADOR - HEAVY DUTY & SHD (5)
    "03055-HD": os.path.join(BE_DIR, "55-01.webp"),
    "03055-HD-I": os.path.join(BE_DIR, "55-01.webp"),
    "03031-SHD": os.path.join(BE_DIR, "31-01.webp"),
    "030N100-SHD-I": os.path.join(BE_DIR, "n100-01.webp"),
    "030N150-SHD": os.path.join(BE_DIR, "n150-01.webp"),
}

# Verify all source files exist
print(f"Total SKUs to process: {len(SKU_MAP)}")
for sku, path in SKU_MAP.items():
    if not os.path.exists(path):
        raise FileNotFoundError(f"Missing file for {sku}: {path}")
print("All source files exist verified!")

def process_image(src_path, is_be=False):
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)
    
    if is_be:
        r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
        diff1 = np.abs(r - g)
        diff2 = np.abs(g - b)
        is_neutral_light = (r > 225) & (g > 225) & (b > 225) & (diff1 < 6) & (diff2 < 6)
        factor = np.clip((r - 225) / (241 - 225), 0.0, 1.0)
        for c in range(3):
            arr[:, :, c] = np.where(is_neutral_light, arr[:, :, c] + (255 - arr[:, :, c]) * factor, arr[:, :, c])
    
    clean_img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), mode="RGBA").convert("RGB")
    
    # Resize to 800x800 square with high-quality Lanczos resampling
    final_img = clean_img.resize((800, 800), Image.Resampling.LANCZOS)
    return final_img

# Process each SKU
cached_processed = {}

for sku, src_path in SKU_MAP.items():
    is_be = "official_be" in src_path
    if src_path not in cached_processed:
        cached_processed[src_path] = process_image(src_path, is_be=is_be)
    
    img = cached_processed[src_path]
    
    # Target 1: spec-<sku>.png
    spec_path = os.path.join(OUT_DIR, f"spec-{sku}.png")
    img.save(spec_path, "PNG", optimize=True)
    
    # Target 2: battery-<sku>.png
    battery_path = os.path.join(OUT_DIR, f"battery-{sku}.png")
    img.save(battery_path, "PNG", optimize=True)
    
    print(f"SKU {sku:<16} -> Saved {spec_path} and {battery_path}")

print("\nSUCCESS: All 40 SKUs updated with official Ecuadorian manufacturer images!")
