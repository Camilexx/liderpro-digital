import os, zipfile, io, re, math, json
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
import scipy.ndimage as ndi

xlsx_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.user_uploaded\media_1792380131191_09084a0a.xlsx'
output_dir = r'public/images/products'
os.makedirs(output_dir, exist_ok=True)

def clean_sku_filename(sku):
    clean = re.sub(r'[^a-zA-Z0-9_\-]', '_', sku.strip())
    return clean

def render_institutional_studio(orig_img, target_size=(800, 800)):
    arr = np.array(orig_img.convert('RGB'))
    h, w, _ = arr.shape
    
    # 1. Canvas area from ~12% to 88% height to exclude top header and bottom nav
    y_min, y_max = int(0.12 * h), int(0.88 * h)
    canvas = arr[y_min:y_max, :].copy()
    canvas_h, canvas_w, _ = canvas.shape
    
    # Background color estimate from corners
    corner_pixels = np.vstack([canvas[:15, :15], canvas[:15, -15:], canvas[-15:, :15], canvas[-15:, -15:]])
    bg_color = np.median(corner_pixels.reshape(-1, 3), axis=0).astype(np.uint8)
    
    # 2. Geometric inpaint for carousel pagination dots if present
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
    mask = diff > 20
    
    labeled, num = ndi.label(mask)
    if num == 0:
        return None
    sizes = ndi.sum(mask, labeled, range(1, num + 1))
    
    product_components = [i + 1 for i, s in enumerate(sizes) if s > 1000]
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

with open('scripts/all_remaining_filters_map.json', 'r', encoding='utf-8') as f:
    filter_maps = json.load(f)

sku_to_new_img = {}

with zipfile.ZipFile(xlsx_path, 'r') as z:
    for cat_name, items in filter_maps.items():
        print(f"\nProcessing {len(items)} items for {cat_name}...")
        for it in items:
            sku = it['sku']
            name = it['name']
            hero_img = it.get('hero_img')
            clean = clean_sku_filename(sku)
            
            target_filter_filename = f"filter-{clean}.png"
            target_spec_filename = f"spec-{clean}.png"
            
            filter_full_path = os.path.join(output_dir, target_filter_filename)
            spec_full_path = os.path.join(output_dir, target_spec_filename)
            
            img_result = None
            if hero_img and hero_img in z.namelist():
                try:
                    data = z.read(hero_img)
                    orig = Image.open(io.BytesIO(data))
                    img_result = render_institutional_studio(orig)
                except Exception as e:
                    print(f"Error processing {sku} ({hero_img}): {e}")
            
            if img_result is None:
                # fallback
                fallback_name = f"advance-{cat_name}-filter.png"
                fallback_p = os.path.join(output_dir, fallback_name)
                if os.path.exists(fallback_p):
                    img_result = Image.open(fallback_p)
                else:
                    img_result = Image.open(os.path.join(output_dir, 'advance-oil-filter.png'))
            
            # Save target files
            img_result.save(filter_full_path, 'PNG', optimize=True)
            img_result.save(spec_full_path, 'PNG', optimize=True)
            
            new_rel_path = f"/images/products/{target_filter_filename}"
            sku_to_new_img[sku] = new_rel_path
            print(f"  OK: {sku:<18} -> {new_rel_path}")

print(f"\nTotal new filter images generated: {len(sku_to_new_img)}")

# Save mapping to json
with open('scripts/filters_remapping_done.json', 'w', encoding='utf-8') as f:
    json.dump(sku_to_new_img, f, indent=2)

print("Saved scripts/filters_remapping_done.json")
