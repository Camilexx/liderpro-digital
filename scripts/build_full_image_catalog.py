import json
import zipfile
import os
import re
import io
import numpy as np
import scipy.ndimage as ndi
from PIL import Image, ImageOps, ImageFilter

xlsx_path = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx'
output_dir = r'public/images/products'
os.makedirs(output_dir, exist_ok=True)

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

sheet_rows = full_data['sheet_rows']
inv_items = full_data['inventory_items']
inv_by_sku = {it['sku'].upper(): it for it in inv_items}

def clean_sku(s):
    return re.sub(r'[^a-zA-Z0-9_\-]', '_', s.strip())

def process_filter_screenshot(orig_img, target_size=(800, 800)):
    """Process an Advance filter app screenshot into a clean 800x800 studio packshot."""
    arr = np.array(orig_img.convert('RGB'))
    h, w, _ = arr.shape
    
    # 1. Canvas area from ~11% to 89% height to exclude top mobile status bar and bottom nav
    y_min, y_max = int(0.11 * h), int(0.89 * h)
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
        blue_circle = (np.sqrt((y_coords - cy)**2 + (x_coords - cx)**2) <= 12)
        grey_circle = (np.sqrt((y_coords - cy)**2 + (x_coords - (cx + 17))**2) <= 10) | (np.sqrt((y_coords - cy)**2 + (x_coords - (cx - 17))**2) <= 10)
        dot_mask = blue_circle | grey_circle
        _, indices = ndi.distance_transform_edt(dot_mask, return_indices=True)
        canvas = canvas[indices[0], indices[1]]
    
    # 3. Detect non-background pixels (the product and watermark)
    diff = np.abs(canvas.astype(float) - bg_color.astype(float)).sum(axis=2)
    mask = diff > 22
    
    labeled, num = ndi.label(mask)
    if num == 0:
        # Fallback: simple center crop
        box = (int(0.1 * w), int(0.2 * h), int(0.9 * w), int(0.8 * h))
        cropped = orig_img.crop(box)
        return fit_to_studio(cropped, target_size)
        
    sizes = ndi.sum(mask, labeled, range(1, num + 1))
    product_components = [i + 1 for i, s in enumerate(sizes) if s > 800]
    if not product_components:
        product_components = [np.argmax(sizes) + 1]
    
    product_mask = np.isin(labeled, product_components)
    rows = np.where(product_mask.any(axis=1))[0]
    cols = np.where(product_mask.any(axis=0))[0]
    
    if len(rows) == 0 or len(cols) == 0:
        return fit_to_studio(orig_img, target_size)
    
    pad = 12
    r0 = max(0, rows[0] - pad)
    r1 = min(canvas_h, rows[-1] + pad)
    c0 = max(0, cols[0] - pad)
    c1 = min(canvas_w, cols[-1] + pad)
    
    cropped_arr = canvas[r0:r1, c0:c1]
    cropped_img = Image.fromarray(cropped_arr)
    
    return fit_to_studio(cropped_img, target_size)

def fit_to_studio(img, target_size=(800, 800)):
    """Center image on pure white 800x800 canvas with soft contact shadow."""
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        alpha = img.convert('RGBA')
        # Get bbox of alpha
        bbox = alpha.getbbox()
        if bbox:
            alpha = alpha.crop(bbox)
        # Scale to max 680x680 inside 800x800
        alpha.thumbnail((680, 680), Image.Resampling.LANCZOS)
        
        # Create pure white background
        studio = Image.new('RGB', target_size, (255, 255, 255))
        
        # Create subtle contact shadow under product
        shadow_w = int(alpha.width * 0.85)
        shadow_h = max(18, int(alpha.height * 0.08))
        shadow = Image.new('RGBA', (shadow_w, shadow_h), (0, 0, 0, 0))
        from PIL import ImageDraw
        draw = ImageDraw.Draw(shadow)
        draw.ellipse([0, 0, shadow_w, shadow_h], fill=(0, 0, 0, 45))
        shadow = shadow.filter(ImageFilter.GaussianBlur(radius=8))
        
        # Paste shadow
        px = (target_size[0] - alpha.width) // 2
        py = (target_size[1] - alpha.height) // 2
        sx = (target_size[0] - shadow_w) // 2
        sy = py + alpha.height - int(shadow_h * 0.4)
        
        studio.paste(shadow, (sx, sy), shadow)
        studio.paste(alpha, (px, py), alpha)
        return studio
    else:
        # RGB image
        rgb = img.convert('RGB')
        # Check background and trim borders
        arr = np.array(rgb)
        corners = np.vstack([arr[:10, :10], arr[:10, -10:], arr[-10:, :10], arr[-10:, -10:]])
        bg = np.median(corners.reshape(-1, 3), axis=0)
        diff = np.abs(arr.astype(float) - bg.astype(float)).sum(axis=2)
        mask = diff > 20
        rows = np.where(mask.any(axis=1))[0]
        cols = np.where(mask.any(axis=0))[0]
        if len(rows) > 0 and len(cols) > 0:
            rgb = rgb.crop((cols[0], rows[0], cols[-1], rows[-1]))
            
        rgb.thumbnail((680, 680), Image.Resampling.LANCZOS)
        studio = Image.new('RGB', target_size, (255, 255, 255))
        
        # Soft shadow
        shadow_w = int(rgb.width * 0.85)
        shadow_h = max(18, int(rgb.height * 0.08))
        shadow = Image.new('RGBA', (shadow_w, shadow_h), (0, 0, 0, 0))
        from PIL import ImageDraw
        draw = ImageDraw.Draw(shadow)
        draw.ellipse([0, 0, shadow_w, shadow_h], fill=(0, 0, 0, 40))
        shadow = shadow.filter(ImageFilter.GaussianBlur(radius=8))
        
        px = (target_size[0] - rgb.width) // 2
        py = (target_size[1] - rgb.height) // 2
        sx = (target_size[0] - shadow_w) // 2
        sy = py + rgb.height - int(shadow_h * 0.4)
        
        studio.paste(shadow, (sx, sy), shadow)
        studio.paste(rgb, (px, py))
        return studio

print("Image processing functions defined successfully.")
