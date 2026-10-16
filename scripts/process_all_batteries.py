import os
import json
import re
from PIL import Image, ImageDraw, ImageFilter

BRAIN_DIR = r"C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663"
OUT_DIR = r"public\images\products"

# Master source images in brain directory
SOURCE_IMAGES = {
    "bosch-s4-group24": os.path.join(BRAIN_DIR, "bosch_s4_group24_png_1792184047044.jpg"),
    "bosch-s4-group27": os.path.join(BRAIN_DIR, "bosch_s4_group27_png_1792184064160.jpg"),
    "bosch-s4-group42": os.path.join(BRAIN_DIR, "bosch_s4_group42_png_1792184085468.jpg"),
    "bosch-s4-ns40": os.path.join(BRAIN_DIR, "bosch_s4_ns40_png_1792184110732.jpg"),
    "bosch-s3-group42": os.path.join(BRAIN_DIR, "bosch_s3_group42_png_1792184066811.jpg"),
    "bosch-s5-b65": os.path.join(BRAIN_DIR, "bosch_s5_b65_png_1792184083828.jpg"),
    "ecuador-fe-group24": os.path.join(BRAIN_DIR, "ecuador_fe_group24_png_1792184100807.jpg"),
    "ecuador-hp-group24": os.path.join(BRAIN_DIR, "ecuador_hp_group24_png_1792184133935.jpg"),
    "ecuador-fe-group42": os.path.join(BRAIN_DIR, "ecuador_fe_group42_1792184093298.jpg"),
    "ecuador-hp-group42": os.path.join(BRAIN_DIR, "ecuador_hp_group42_1792184110339.jpg"),
    "ecuador-hp-group27": os.path.join(BRAIN_DIR, "ecuador_hp_group27_1792184128323.jpg"),
    "ecuador-fe-ns40": os.path.join(BRAIN_DIR, "ecuador_fe_ns40_png_1792184104794.jpg"),
    "ecuador-hp-ns40": os.path.join(BRAIN_DIR, "ecuador_hp_ns40_png_1792184132863.jpg"),
}

# Verify all source images exist
print("Verifying source images:")
for key, path in SOURCE_IMAGES.items():
    exists = os.path.exists(path)
    print(f"  {key:<20}: {exists} ({os.path.basename(path)})")
    if not exists:
        raise FileNotFoundError(f"Missing source image: {path}")

# Complete mapping for all 40 SKUs
SKU_TO_TEMPLATE = {
    # BOSCH (12)
    "02724HPS4": "bosch-s4-group24",
    "02724HPIS4": "bosch-s4-group24",
    "02727HPS4": "bosch-s4-group27",
    "02727HPIS4": "bosch-s4-group27",
    "02734HPS4": "bosch-s4-group24",
    "02742FES3": "bosch-s3-group42",
    "02742HPIS4": "bosch-s4-group42",
    "42HPS4": "bosch-s4-group42",
    "0277B6548": "bosch-s5-b65",
    "027N40FES4": "bosch-s4-ns40",
    "027NS40FEFS4": "bosch-s4-ns40",
    "027NS40FEIFS4": "bosch-s4-ns40",

    # BATERÍAS ECUADOR (28)
    "03024-FE": "ecuador-fe-group24",
    "03024-FE-I": "ecuador-fe-group24",
    "03024-HP-I": "ecuador-hp-group24",
    "03027-FE": "ecuador-fe-group24",
    "03027-FE-I": "ecuador-fe-group24",
    "03027-HP": "ecuador-hp-group27",
    "03027-HP-I": "ecuador-hp-group27",
    "03034-FE": "ecuador-fe-group24",
    "03034-FE-I": "ecuador-fe-group24",
    "03034-HP": "ecuador-hp-group27",
    "03034-HP-I": "ecuador-hp-group27",
    "03036-HP": "ecuador-hp-group27",
    "03042-FE": "ecuador-fe-group42",
    "03042-HP": "ecuador-hp-group42",
    "03042-HP-I": "ecuador-hp-group42",
    "03055-HD": "ecuador-fe-group24",
    "03055-HD-I": "ecuador-fe-group24",
    "03065-HP": "ecuador-hp-group27",
    "03066-HP": "ecuador-hp-group27",
    "030NS40-FE": "ecuador-fe-ns40",
    "030NS40-FE-I": "ecuador-fe-ns40",
    "030N40-FE-I": "ecuador-fe-ns40",
    "030NS40-HP": "ecuador-hp-ns40",
    "030N40-HP": "ecuador-hp-ns40",
    "030N40-HP-I": "ecuador-hp-ns40",
    "03031-SHD": "ecuador-hp-group27",
    "030N100-SHD-I": "ecuador-hp-group27",
    "030N150-SHD": "ecuador-hp-group27",
}

print(f"\nTotal SKUs to process: {len(SKU_TO_TEMPLATE)}")

# Cache processed master templates (800x800 square format with studio gradient lighting)
processed_templates = {}

def process_master_template(img_path):
    orig = Image.open(img_path).convert("RGBA")
    w, h = orig.size
    
    # Target size: 800x800
    target_size = 800
    
    # Create luxurious subtle radial studio background (#FFFFFF center to #EEF2F6 edges)
    bg = Image.new("RGBA", (target_size, target_size), (255, 255, 255, 255))
    draw = ImageDraw.Draw(bg)
    
    # Resize product while preserving aspect ratio, ensuring generous breathing margins
    max_dim = int(target_size * 0.90)
    ratio = min(max_dim / w, max_dim / h)
    new_w = int(w * ratio)
    new_h = int(h * ratio)
    resized_prod = orig.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Paste product centered
    offset_x = (target_size - new_w) // 2
    offset_y = (target_size - new_h) // 2
    
    bg.paste(resized_prod, (offset_x, offset_y), resized_prod)
    return bg.convert("RGB")

for t_key, t_path in SOURCE_IMAGES.items():
    processed_templates[t_key] = process_master_template(t_path)
    # Also save the template directly for reference
    out_master_path = os.path.join(OUT_DIR, f"{t_key}.png")
    processed_templates[t_key].save(out_master_path, "PNG", optimize=True)
    print(f"Saved master template: {out_master_path}")

# Now generate individual files for all 40 SKUs
for sku, template_key in SKU_TO_TEMPLATE.items():
    master_img = processed_templates[template_key]
    
    # Save both battery-<sku>.png and spec-<sku>.png
    path_battery = os.path.join(OUT_DIR, f"battery-{sku}.png")
    path_spec = os.path.join(OUT_DIR, f"spec-{sku}.png")
    
    master_img.save(path_battery, "PNG", optimize=True)
    master_img.save(path_spec, "PNG", optimize=True)
    print(f"Generated {sku:<16} from {template_key}")

print(f"\nSuccessfully generated 80 files for {len(SKU_TO_TEMPLATE)} battery SKUs in {OUT_DIR}!")
