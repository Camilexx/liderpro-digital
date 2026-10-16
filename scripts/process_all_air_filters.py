import os, zipfile, json, re, math, io
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
import scipy.ndimage as ndi

xlsx_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.user_uploaded\media_1792149283574_3029267d.xlsx'
output_dir = r'c:\Users\PC\Desktop\NEXUS\liderpro-digital\public\images\products'
os.makedirs(output_dir, exist_ok=True)

# Selected Hero image mapping for each row
hero_map = {
    2: 'xl/media/image71.jpeg',   # 078AA-1531
    3: 'xl/media/image73.jpeg',   # 078AA-3040
    4: 'xl/media/image75.jpeg',   # 080AA-10086
    5: 'xl/media/image77.jpeg',   # 080AA-10088
    6: 'xl/media/image80.jpeg',   # 080AA-10286
    7: 'xl/media/image82.jpeg',   # 080AA-10699
    8: 'xl/media/image85.jpeg',   # 080AA-10891
    9: 'xl/media/image88.jpeg',   # 080AA-11071
    10: 'xl/media/image90.jpeg',  # 080AA-11077
    11: 'xl/media/image92.jpeg',  # 080AA-11085
    12: 'xl/media/image94.jpeg',  # 080AA-11113
    13: 'xl/media/image96.jpeg',  # 080AA-11652
    14: 'xl/media/image98.jpeg',  # 080AA-11654
    15: 'xl/media/image101.jpeg', # 080AA-11674
    16: 'xl/media/image103.jpeg', # 080AA-1380
    17: 'xl/media/image106.jpeg', # 080AA-1485
    18: 'xl/media/image108.jpeg', # 080AA-2070
    19: 'xl/media/image110.jpeg', # 080AA-2217
    20: 'xl/media/image112.jpeg', # 080AA-25006
    21: 'xl/media/image114.jpeg', # 080AA-25011
    22: 'xl/media/image116.jpeg', # 080AA-25040
    23: 'xl/media/image118.jpeg', # 080AA-25128
    24: 'xl/media/image120.jpeg', # 080AA-2659
    25: 'xl/media/image123.jpeg', # 080AA-2662
    26: 'xl/media/image125.jpeg', # 080AA-28115
    27: 'xl/media/image127.jpeg', # 080AA-28130
    28: 'xl/media/image129.jpeg', # 080AA-3603
    29: 'xl/media/image131.jpeg', # 080AA-38240
    30: 'xl/media/image133.jpeg', # 080AA-4000
    31: 'xl/media/image135.jpeg', # 080AA-4309
    32: 'xl/media/image137.jpeg', # 080AA-4939
    33: 'xl/media/image139.jpeg', # 080AA-51943
    34: 'xl/media/image142.jpeg', # 080AA-54661
    35: 'xl/media/image144.jpeg', # 080AA-5827
    36: 'xl/media/image147.jpeg', # 080AA-5903
    37: 'xl/media/image149.jpeg', # 080AA-6000
    38: 'xl/media/image151.jpeg', # 080AA-6012
    39: 'xl/media/image153.jpeg', # 080AA-6127
    40: 'xl/media/image155.jpeg', # 080AA-6558
    41: 'xl/media/image157.jpeg', # 080AA-6664
    42: 'xl/media/image159.jpeg', # 080AA-6900
    43: 'xl/media/image161.jpeg', # 080AA-7617
    44: 'xl/media/image163.jpeg', # 080AA-8067
    45: 'xl/media/image166.jpeg', # 080AA-8069
    46: 'xl/media/image168.jpeg', # 080AA-8078
    47: 'xl/media/image172.jpeg', # 080AA-8590
    48: 'xl/media/image174.jpeg', # 080AA-8964
    49: 'xl/media/image176.jpeg', # 080AA-9100
    50: 'xl/media/image179.jpeg', # 080AA-9102
    51: 'xl/media/image181.jpeg', # 080AA-9110
    52: 'xl/media/image183.jpeg', # 080AA-9123
    53: 'xl/media/image185.jpeg', # 080AA-9124
    54: 'xl/media/image187.jpeg', # 080AA-9322
    55: 'xl/media/image189.jpeg', # 080AA-9392
    56: 'xl/media/image192.jpeg', # 080AA-9476
    57: 'xl/media/image194.jpeg', # 080AA-9632
    58: 'xl/media/image196.jpeg', # 080AA-9800
    59: 'xl/media/image199.jpeg', # 080AA-9856
    60: 'xl/media/image201.jpeg', # 080AA-9902
    61: 'xl/media/image204.jpeg', # 080AA-994
    65: 'xl/media/image206.jpeg', # 081AA-1132
    66: 'xl/media/image208.jpeg', # FILTRO AIRE 080AA-3038
}

def clean_sku_filename(sku):
    clean = re.sub(r'[^a-zA-Z0-9_\-]', '_', sku.strip())
    return f"filter-{clean}.png"

def render_institutional_studio(orig_img, target_size=(800, 800)):
    arr = np.array(orig_img.convert('RGB'))
    h, w, _ = arr.shape
    
    # 1. Canvas area from ~15% to 85% height to exclude top header and bottom nav
    y_min, y_max = int(0.15 * h), int(0.85 * h)
    canvas = arr[y_min:y_max, :].copy()
    canvas_h, canvas_w, _ = canvas.shape
    
    # Background color estimate from corners
    corner_pixels = np.vstack([canvas[:15, :15], canvas[:15, -15:], canvas[-15:, :15], canvas[-15:, -15:]])
    bg_color = np.median(corner_pixels.reshape(-1, 3), axis=0).astype(np.uint8)
    
    # 2. Exact geometric inpaint for carousel pagination dots
    is_blue = (canvas[:, :, 2] > 160) & (canvas[:, :, 0] < 70) & (canvas[:, :, 1] < 150)
    by, bx = np.where(is_blue)
    if len(by):
        cy, cx = int(np.mean(by)), int(np.mean(bx))
        y_coords, x_coords = np.ogrid[:canvas_h, :canvas_w]
        blue_circle = (np.sqrt((y_coords - cy)**2 + (x_coords - cx)**2) <= 10)
        grey_circle = (np.sqrt((y_coords - cy)**2 + (x_coords - (cx + 17))**2) <= 8)
        dot_mask = blue_circle | grey_circle
        _, indices = ndi.distance_transform_edt(dot_mask, return_indices=True)
        canvas = canvas[indices[0], indices[1]]
    
    # 3. Detect non-background pixels
    diff = np.abs(canvas.astype(float) - bg_color.astype(float)).sum(axis=2)
    mask = diff > 22
    
    labeled, num = ndi.label(mask)
    if num == 0:
        return None
    sizes = ndi.sum(mask, labeled, range(1, num + 1))
    
    # Keep only large components (actual product & watermark, ignoring isolated small noise)
    product_components = [i + 1 for i, s in enumerate(sizes) if s > 1200]
    if not product_components:
        product_components = [np.argmax(sizes) + 1]
    
    product_mask = np.isin(labeled, product_components)
    rows = np.where(product_mask.any(axis=1))[0]
    cols = np.where(product_mask.any(axis=0))[0]
    
    if len(rows) == 0 or len(cols) == 0:
        return None
    
    pad = 8
    r0 = max(0, rows[0] - pad)
    r1 = min(canvas_h, rows[-1] + pad)
    c0 = max(0, cols[0] - pad)
    c1 = min(canvas_w, cols[-1] + pad)
    
    crop_arr = canvas[r0:r1, c0:c1]
    crop_prod_mask = product_mask[r0:r1, c0:c1]
    crop_prod_dilated = ndi.binary_dilation(crop_prod_mask, iterations=3)
    
    crop_diff = np.abs(crop_arr.astype(float) - bg_color.astype(float)).sum(axis=2)
    alpha = np.clip((crop_diff - 8) / 20.0 * 255.0, 0, 255).astype(np.uint8)
    alpha[~crop_prod_dilated] = 0
    alpha[crop_prod_mask] = 255
    
    alpha_img = Image.fromarray(alpha, mode='L').filter(ImageFilter.GaussianBlur(radius=0.7))
    cutout = Image.fromarray(crop_arr, mode='RGB')
    cutout.putalpha(alpha_img)
    
    # 4. Build 800x800 Institutional Luxury Studio Canvas
    TW, TH = target_size
    center_x, center_y = TW / 2.0, TH / 2.0
    max_dist = math.sqrt(center_x**2 + center_y**2)
    y_coords, x_coords = np.ogrid[:TH, :TW]
    dists = np.sqrt((x_coords - center_x)**2 + (y_coords - center_y * 0.9)**2) / max_dist
    dists = np.clip(dists, 0.0, 1.0)
    
    c_start = np.array([255, 255, 255], dtype=float)
    c_end = np.array([238, 242, 246], dtype=float)
    gradient = c_start[None, None, :] * (1.0 - dists[:, :, None]) + c_end[None, None, :] * dists[:, :, None]
    studio_canvas = Image.fromarray(gradient.astype(np.uint8), mode='RGB')
    
    # Scale cutout to fit ~74% of the canvas while maintaining aspect ratio
    cw, ch = cutout.size
    scale = min((TW * 0.74) / cw, (TH * 0.70) / ch)
    new_cw = int(cw * scale)
    new_ch = int(ch * scale)
    cutout_resized = cutout.resize((new_cw, new_ch), Image.Resampling.LANCZOS)
    
    # Enhance sharpness & contrast
    r_c, g_c, b_c, a_c = cutout_resized.split()
    rgb = Image.merge('RGB', (r_c, g_c, b_c))
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.25)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.08)
    rgb = ImageEnhance.Color(rgb).enhance(1.05)
    cutout_enhanced = Image.merge('RGBA', (*rgb.split(), a_c))
    
    pos_x = (TW - new_cw) // 2
    pos_y = int((TH - new_ch) * 0.46)
    
    # Create realistic studio contact shadow
    shadow_layer = Image.new('RGBA', (TW, TH), (0, 0, 0, 0))
    shadow_w = int(new_cw * 0.88)
    shadow_h = max(24, int(new_ch * 0.16))
    shadow_x = (TW - shadow_w) // 2
    shadow_y = pos_y + new_ch - int(shadow_h * 0.55)
    
    sy, sx = np.ogrid[:shadow_h, :shadow_w]
    s_dists = np.sqrt(((sx - shadow_w/2)/(shadow_w/2))**2 + ((sy - shadow_h/2)/(shadow_h/2))**2)
    shadow_arr = np.zeros((shadow_h, shadow_w), dtype=np.uint8)
    shadow_arr[s_dists <= 1.0] = (np.clip(1.0 - s_dists[s_dists <= 1.0], 0, 1) ** 1.5 * 130).astype(np.uint8)
    shadow_img = Image.fromarray(shadow_arr, mode='L').filter(ImageFilter.GaussianBlur(radius=shadow_h * 0.35))
    shadow_colored = Image.new('RGBA', (shadow_w, shadow_h), (25, 33, 44, 110))
    shadow_layer.paste(shadow_colored, (shadow_x, shadow_y), shadow_img)
    
    studio_canvas.paste(shadow_layer, (0, 0), shadow_layer)
    studio_canvas.paste(cutout_enhanced, (pos_x, pos_y), cutout_enhanced)
    
    return studio_canvas

# Load map
with open('scripts/air_filters_map.json', 'r', encoding='utf-8') as f:
    air_map = json.load(f)

processed_results = []
with zipfile.ZipFile(xlsx_path, 'r') as z:
    for item in air_map:
        row = item['row']
        sku = item['sku']
        name = item['name']
        
        if row not in hero_map:
            print(f"Skipping row {row} (no hero image mapped)")
            continue
        
        img_rel = hero_map[row]
        if img_rel not in z.namelist():
            print(f"Image {img_rel} not found in zip for row {row}")
            continue
        
        data = z.read(img_rel)
        orig_img = Image.open(io.BytesIO(data))
        
        canvas_result = render_institutional_studio(orig_img)
        if canvas_result is None:
            print(f"FAILED processing row {row} (SKU {sku})")
            continue
        
        filename = clean_sku_filename(sku)
        full_path = os.path.join(output_dir, filename)
        canvas_result.save(full_path, quality=95)
        
        # Also overwrite the old spec image if it exists so both old and new paths work seamlessly!
        old_spec_file = f"spec-{re.sub(r'[^a-zA-Z0-9_\-]', '_', sku.strip())}.png"
        old_spec_path = os.path.join(output_dir, old_spec_file)
        canvas_result.save(old_spec_path, quality=95)
        
        web_url = f"/images/products/{filename}"
        processed_results.append({
            'row': row,
            'sku': sku,
            'name': name,
            'filename': filename,
            'imageUrl': web_url
        })
        print(f"Row {row:02d} | SKU: {sku:18s} -> Saved {filename} and {old_spec_file}")

print(f"\nSuccessfully processed and saved {len(processed_results)} air filter images!")
with open('scripts/processed_air_filters.json', 'w', encoding='utf-8') as f:
    json.dump(processed_results, f, indent=2, ensure_ascii=False)
