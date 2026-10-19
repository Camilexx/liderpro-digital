import json
import zipfile
import os
import re
import io
import sys
import numpy as np
import scipy.ndimage as ndi
from PIL import Image, ImageOps, ImageFilter

xlsx_path = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx'
inv_xlsx = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO.xlsx'
output_img_dir = r'public/images/products'
os.makedirs(output_img_dir, exist_ok=True)

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

sheet_rows = full_data['sheet_rows']
inv_items = full_data['inventory_items']
inv_by_sku = {it['sku'].upper(): it for it in inv_items}

def clean_sku(s):
    return re.sub(r'[^a-zA-Z0-9_\-]', '_', s.strip())

def make_slug(s):
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')

def detect_presentation(name):
    name_u = name.upper()
    if '20 LT' in name_u or '20/1 LT' in name_u or '20LT' in name_u:
        return 'Caneca (20 Litros)', 20.0
    if '5 GL' in name_u or '5GL' in name_u or 'CANECA 5' in name_u or '5/1 GL' in name_u:
        return 'Caneca (5 Galones / 19L)', 19.0
    if '2.5 GL' in name_u or '2.5GL' in name_u or '2.5' in name_u:
        return 'Media Caneca (2.5 Gal)', 9.5
    if '4/5LT' in name_u or '5LT' in name_u or '5 LT' in name_u:
        return 'Bidón (5 Litros)', 5.0
    if '4/1 GL' in name_u or '1 GL' in name_u or '4LT' in name_u or '4 LT' in name_u or 'GALON' in name_u or '3/1 GL' in name_u:
        return '1 Galón (3.78L)', 3.78
    if '12/1 LT' in name_u or '1 LT' in name_u or '1LT' in name_u or 'LITRO' in name_u or '12/1' in name_u:
        return '1 Litro', 1.0
    if 'CUARTO' in name_u:
        return '1 Cuarto (946 ml)', 0.946
    if '18 KG' in name_u or '16 KG' in name_u or '16X1 KG' in name_u:
        return 'Caneca (16-18 kg)', 18.0
    if '4.5 KG' in name_u:
        return 'Tarrina 4.5 kg', 4.5
    if '800 GR' in name_u or '800 GRS' in name_u:
        return 'Tarrina 800 g', 0.8
    if '650 ML' in name_u or '650ML' in name_u:
        return 'Spray 650 ml', 0.65
    if '520 ML' in name_u or '520ML' in name_u:
        return 'Aerosol 520 ml', 0.52
    if '500 ML' in name_u or '500ML' in name_u:
        return 'Spray 500 ml', 0.5
    if '450 ML' in name_u or '450ML' in name_u:
        return 'Envase 450 ml', 0.45
    if '400 ML' in name_u or '400ML' in name_u:
        return 'Spray 400 ml', 0.4
    if '350 ML' in name_u or '350ML' in name_u:
        return 'Envase 350 ml', 0.35
    if '300 ML' in name_u or '300ML' in name_u or '300GR' in name_u:
        return 'Envase 300 ml', 0.3
    if '250 ML' in name_u or '250ML' in name_u or '250 CC' in name_u:
        return 'Envase 250 ml', 0.25
    if '200 ML' in name_u or '200ML' in name_u or '200M' in name_u:
        return 'Spray 200 ml', 0.2
    if '100 ML' in name_u or '100ML' in name_u:
        return 'Envase 100 ml', 0.1
    if '85GR' in name_u or '85 GR' in name_u:
        return 'Tubo 85 g', 0.085
    if '10 ML' in name_u or '10ML' in name_u:
        return 'Gotero 10 ml', 0.01
    if '10OZ' in name_u or '10 OZ' in name_u:
        return 'Aerosol 10 oz', 0.3
    if '1LB' in name_u or '1 LB' in name_u:
        return 'Envase 1 Libra', 0.45
    return 'Presentación Estándar', 1.0

def fit_to_studio(img, target_size=(800, 800)):
    """Center image on pure white 800x800 canvas with soft contact shadow."""
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        alpha = img.convert('RGBA')
        bbox = alpha.getbbox()
        if bbox:
            alpha = alpha.crop(bbox)
        alpha.thumbnail((680, 680), Image.Resampling.LANCZOS)
        
        studio = Image.new('RGB', target_size, (255, 255, 255))
        shadow_w = int(alpha.width * 0.85)
        shadow_h = max(18, int(alpha.height * 0.08))
        shadow = Image.new('RGBA', (shadow_w, shadow_h), (0, 0, 0, 0))
        from PIL import ImageDraw
        draw = ImageDraw.Draw(shadow)
        draw.ellipse([0, 0, shadow_w, shadow_h], fill=(0, 0, 0, 40))
        shadow = shadow.filter(ImageFilter.GaussianBlur(radius=8))
        
        px = (target_size[0] - alpha.width) // 2
        py = (target_size[1] - alpha.height) // 2
        sx = (target_size[0] - shadow_w) // 2
        sy = py + alpha.height - int(shadow_h * 0.4)
        
        studio.paste(shadow, (sx, sy), shadow)
        studio.paste(alpha, (px, py), alpha)
        return studio
    else:
        rgb = img.convert('RGB')
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
        
        shadow_w = int(rgb.width * 0.85)
        shadow_h = max(18, int(rgb.height * 0.08))
        shadow = Image.new('RGBA', (shadow_w, shadow_h), (0, 0, 0, 0))
        from PIL import ImageDraw
        draw = ImageDraw.Draw(shadow)
        draw.ellipse([0, 0, shadow_w, shadow_h], fill=(0, 0, 0, 35))
        shadow = shadow.filter(ImageFilter.GaussianBlur(radius=8))
        
        px = (target_size[0] - rgb.width) // 2
        py = (target_size[1] - rgb.height) // 2
        sx = (target_size[0] - shadow_w) // 2
        sy = py + rgb.height - int(shadow_h * 0.4)
        
        studio.paste(shadow, (sx, sy), shadow)
        studio.paste(rgb, (px, py))
        return studio

def process_filter_screenshot(orig_img, target_size=(800, 800)):
    arr = np.array(orig_img.convert('RGB'))
    h, w, _ = arr.shape
    y_min, y_max = int(0.11 * h), int(0.89 * h)
    canvas = arr[y_min:y_max, :].copy()
    canvas_h, canvas_w, _ = canvas.shape
    
    corner_pixels = np.vstack([canvas[:15, :15], canvas[:15, -15:], canvas[-15:, :15], canvas[-15:, -15:]])
    bg_color = np.median(corner_pixels.reshape(-1, 3), axis=0).astype(np.uint8)
    
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
    
    diff = np.abs(canvas.astype(float) - bg_color.astype(float)).sum(axis=2)
    mask = diff > 22
    labeled, num = ndi.label(mask)
    if num == 0:
        box = (int(0.1 * w), int(0.2 * h), int(0.9 * w), int(0.8 * h))
        return fit_to_studio(orig_img.crop(box), target_size)
        
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
    
    cropped_img = Image.fromarray(canvas[r0:r1, c0:c1])
    return fit_to_studio(cropped_img, target_size)

print("Starting full catalog build...")

# Open zip of FILTROS.xlsx
z = zipfile.ZipFile(xlsx_path, 'r')

processed_products = []
covered_skus = set()
saved_images = set()

# Map sheet to category and brand
SHEET_METAS = {
    'FILTROS AIRE': {'cat': 'filtros', 'brand': 'ADVANCE', 'app': 'autos', 'type': 'aire'},
    'FILTROS ACEITE': {'cat': 'filtros', 'brand': 'ADVANCE', 'app': 'autos', 'type': 'aceite'},
    'FILTROS CABINA': {'cat': 'filtros', 'brand': 'ADVANCE', 'app': 'autos', 'type': 'cabina'},
    'FILTROS COMBUSTIBLE': {'cat': 'filtros', 'brand': 'ADVANCE', 'app': 'autos', 'type': 'combustible'},
    'LURICANTE MANNOL': {'cat': 'lubricantes', 'brand': 'MANNOL', 'app': 'autos', 'type': 'mannol_lub'},
    'LURICANTE MOBIL': {'cat': 'lubricantes', 'brand': 'MOBIL', 'app': 'autos', 'type': 'mobil_lub'},
    'LURICANTE AROIL': {'cat': 'lubricantes', 'brand': 'AROIL', 'app': 'autos', 'type': 'aroil_lub'},
    'LURICANTE AMALIE': {'cat': 'lubricantes', 'brand': 'AMALIE', 'app': 'autos', 'type': 'amalie_lub'},
    'LURICANTE MOTUL': {'cat': 'lubricantes', 'brand': 'MOTUL', 'app': 'motos', 'type': 'motul_lub'},
    'LURICANTE VALVOLINE': {'cat': 'lubricantes', 'brand': 'VALVOLINE', 'app': 'pesado', 'type': 'valvoline_lub'},
    'MANNOL': {'cat': 'aditivos', 'brand': 'MANNOL', 'app': 'autos', 'type': 'mannol_chem'},
    'ABRO': {'cat': 'aditivos', 'brand': 'ABRO', 'app': 'autos', 'type': 'abro_chem'},
    'PERFUMES': {'cat': 'aditivos', 'brand': 'SIMONIZ', 'app': 'autos', 'type': 'perfumes'}
}

def extract_and_process_image(zip_path, is_filter=False):
    try:
        data = z.read(zip_path)
        im = Image.open(io.BytesIO(data))
        if is_filter:
            return process_filter_screenshot(im)
        else:
            return fit_to_studio(im)
    except Exception as e:
        print(f"Error processing {zip_path}: {e}")
        return None

def clean_desc(text):
    text = re.sub(r'[\"\t\r\n]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

print("Processing sheets...")

for sheet_name, meta in SHEET_METAS.items():
    rows = sheet_rows.get(sheet_name, [])
    is_filter_sheet = 'FILTRO' in sheet_name.upper()
    
    for r in rows:
        row_num = r['row_num']
        c1 = r['col1'].strip()
        c2 = r['col2'].strip()
        imgs = r['images']
        
        # Skip header rows with no product info
        if not c1 and not c2:
            continue
            
        # If no images anchored to this row, skip from catalog per user rule!
        if not imgs:
            continue
            
        # Sort images by column (left to right -> smallest to largest presentation)
        imgs.sort(key=lambda x: x['col'])
        
        # 1. Match inventory items
        matched_items = []
        if c1 and c1.upper() in inv_by_sku:
            matched_items.append(inv_by_sku[c1.upper()])
            
        if not matched_items and c1:
            clean_c1 = re.sub(r'[^A-Z0-9]', '', c1.upper())
            for sku, it in inv_by_sku.items():
                if re.sub(r'[^A-Z0-9]', '', sku) == clean_c1:
                    matched_items.append(it)
                    break
                    
        if not matched_items and c2:
            clean_c2 = clean_desc(c2.upper())
            # Find candidate matches in inventory
            tokens = [w for w in re.split(r'[\s\-\/\(\)\,\.]+', clean_c2) if len(w) >= 3]
            stop = {'LURICANTE', 'ACEITE', 'MOTOR', 'PARA', 'VIDA', 'UTIL', 'AOS', 'ANOS', 'PLUS', 'SEMI', 'SINTETICO', 'SUPER', 'ADVANCE', 'FILTRO'}
            keys = [w for w in tokens if w not in stop]
            
            candidates = []
            for it in inv_items:
                it_name = clean_desc(it['name'].upper())
                if keys and all(k in it_name for k in keys[:3]):
                    candidates.append(it)
                    
            if candidates:
                if is_filter_sheet:
                    # Pick highest word overlap
                    best = max(candidates, key=lambda it: sum(1 for k in keys if k in clean_desc(it['name'].upper())))
                    matched_items.append(best)
                else:
                    matched_items = candidates

        if not matched_items:
            continue
            
        # 2. Build product and variants
        category = meta['cat']
        brand = meta['brand']
        app_type = meta['app']
        
        # Override category if coolant
        if 'REFRIGERANTE' in c2.upper() or 'COOLANT' in c2.upper():
            category = 'refrigerantes'
        elif 'MOTO' in c2.upper() or '4T' in c2.upper() or '2T' in c2.upper():
            app_type = 'motos'
        elif any(p in c2.upper() for p in ['HINO', 'ISUZU', 'MACK', 'FREIGHTLINER', 'FVR', 'FTR', 'NPR', 'NHR', 'CAMION']):
            app_type = 'pesado'
        elif any(c in c2.upper() for c in ['DMAX', 'D-MAX', 'HILUX', 'BT50', 'BT-50', 'WINGLE', 'T6', 'FORTUNER', 'PICK UP']):
            app_type = 'camionetas'
            
        if brand == 'SIMONIZ' and 'AREON' in c2.upper():
            brand = 'AREON'
            
        # Multi-variant product vs Single variant
        if len(matched_items) > 1 and not is_filter_sheet:
            # Sort inventory items by volume
            item_variants = []
            for it in matched_items:
                pres_name, vol_val = detect_presentation(it['name'])
                item_variants.append({
                    'item': it,
                    'presentation': pres_name,
                    'volume_val': vol_val
                })
            item_variants.sort(key=lambda x: x['volume_val'])
            
            # Map images to variants
            # Process extracted images
            processed_imgs = []
            for idx, img_info in enumerate(imgs):
                proc_img = extract_and_process_image(img_info['zip_path'], is_filter=False)
                if proc_img:
                    processed_imgs.append(proc_img)
                    
            if not processed_imgs:
                continue
                
            # Build variants array
            prod_variants = []
            for v_idx, v_obj in enumerate(item_variants):
                it = v_obj['item']
                v_sku = it['sku']
                covered_skus.add(v_sku.upper())
                
                # Assign image: if v_idx < len(processed_imgs), use that; else use last image
                img_to_use = processed_imgs[min(v_idx, len(processed_imgs) - 1)]
                v_img_fn = f"{clean_sku(v_sku)}.png"
                v_img_path = os.path.join(output_img_dir, v_img_fn)
                if v_img_fn not in saved_images:
                    img_to_use.save(v_img_path, 'PNG', optimize=True)
                    saved_images.add(v_img_fn)
                    
                prod_variants.append({
                    'sku': v_sku,
                    'name': it['name'],
                    'presentation': v_obj['presentation'],
                    'volume': f"{v_obj['volume_val']}L" if v_obj['volume_val'] >= 1.0 else f"{int(v_obj['volume_val']*1000)}ml",
                    'stock': it['stock'],
                    'imageUrl': f"/images/products/{v_img_fn}",
                    'barcode': it.get('barcode', '')
                })
                
            primary_var = prod_variants[0]
            base_name = clean_desc(c2) if c2 else primary_var['name']
            # Clean up redundant brand repetition in name
            display_name = base_name
            if display_name.upper().startswith(brand.upper()):
                display_name = display_name[len(brand):].strip()
            display_name = f"{brand} {display_name}".strip()
            
            prod_id = f"prod-{clean_sku(primary_var['sku'])}"
            prod_slug = make_slug(f"{brand}-{display_name}-{primary_var['sku']}")
            
            total_stock = sum(v['stock'] for v in prod_variants)
            
            processed_products.append({
                'id': prod_id,
                'sku': primary_var['sku'],
                'slug': prod_slug,
                'name': display_name,
                'brand': brand,
                'category': category,
                'applicationType': app_type,
                'volume': primary_var['presentation'],
                'shortSpec': f"Línea oficial {brand}. Disponible en {len(prod_variants)} presentaciones con stock en Bodega Pedernales.",
                'specifications': {
                    'Marca': brand,
                    'Presentaciones': ", ".join(v['presentation'] for v in prod_variants),
                    'Stock Total': f"{total_stock} unidades",
                    'Origen': 'Distribución Matriz LiderPro'
                },
                'fullSpecs': {
                    'Categoría': category.capitalize(),
                    'Línea': f"{brand} Automotive",
                    'Presentaciones Disponibles': ", ".join(v['presentation'] for v in prod_variants),
                    'Garantía': 'Garantía Oficial de Fábrica y LiderPro'
                },
                'description': f"{display_name} distribuido de forma oficial por LiderPro. Fórmula institucional de alto rendimiento disponible en múltiples presentaciones ({', '.join(v['presentation'] for v in prod_variants)}) para talleres y flotas en Manabí y a nivel nacional.",
                'priceNote': 'Consultar precio mayorista o unitario vía WhatsApp con factura SRI',
                'warranty': 'Garantía oficial de autenticidad',
                'commercialStatus': 'VERIFIED',
                'inStock': total_stock > 0,
                'stockStatusText': f"{total_stock} unidades disponibles en Bodega Pedernales" if total_stock > 0 else "Bajo pedido inmediato",
                'dispatchIndicator': 'Despacho Inmediato',
                'primaryOriginRecommendation': 'Pedernales',
                'imageUrl': primary_var['imageUrl'],
                'variants': prod_variants,
                'compatibleVehicles': [
                    {'make': 'Universal', 'model': 'Línea Multimarca y Talleres', 'yearRange': 'Todos los años'}
                ],
                'features': [
                    f"Presentación intercambiable en {len(prod_variants)} tamaños unificados",
                    "Fórmula certificada de máxima pureza y durabilidad",
                    "Despacho verificado desde Bodega Matriz Pedernales",
                    "Facturación electrónica autorizada por el SRI"
                ],
                'faqs': [
                    {
                        'question': f'¿Qué presentaciones de {display_name} tienen en stock?',
                        'answer': f'Disponemos de {len(prod_variants)} presentaciones oficiales: {", ".join(v["presentation"] for v in prod_variants)}. Puedes seleccionar tu tamaño y cotizar directamente por WhatsApp.'
                    },
                    {
                        'question': '¿Realizan envíos a otras ciudades del país?',
                        'answer': 'Sí, realizamos despachos diarios desde Pedernales a las 24 provincias del Ecuador mediante cooperativas y transporte de carga seguro.'
                    }
                ],
                'isBestSeller': total_stock > 10
            })
            
        else:
            # Single item
            it = matched_items[0]
            sku = it['sku']
            covered_skus.add(sku.upper())
            
            # Process image
            # If multiple images (e.g. filter top/bottom), use first image as primary
            primary_img_info = imgs[0]
            proc_img = extract_and_process_image(primary_img_info['zip_path'], is_filter=is_filter_sheet)
            if not proc_img:
                continue
                
            img_fn = f"{clean_sku(sku)}.png"
            img_path = os.path.join(output_img_dir, img_fn)
            if img_fn not in saved_images:
                proc_img.save(img_path, 'PNG', optimize=True)
                saved_images.add(img_fn)
                
            item_name = it['name']
            clean_item_name = clean_desc(c2) if c2 else item_name
            
            # Extract vehicle compatibility from filter description
            compat = []
            if is_filter_sheet:
                # Check vehicles in name
                for vname, make in [
                    ('HILUX', 'Toyota'), ('FORTUNER', 'Toyota'), ('YARIS', 'Toyota'), ('COROLLA', 'Toyota'),
                    ('D-MAX', 'Chevrolet'), ('DMAX', 'Chevrolet'), ('SAIL', 'Chevrolet'), ('SPARK', 'Chevrolet'),
                    ('AVEO', 'Chevrolet'), ('LUV', 'Chevrolet'), ('JOY', 'Chevrolet'),
                    ('TUCSON', 'Hyundai'), ('ACCENT', 'Hyundai'), ('GETZ', 'Hyundai'), ('SANTA FE', 'Hyundai'), ('H100', 'Hyundai'),
                    ('SPORTAGE', 'Kia'), ('RIO', 'Kia'), ('SOUL', 'Kia'), ('SOLUTO', 'Kia'), ('PREGIO', 'Kia'), ('K2700', 'Kia'),
                    ('GRAN VITARA', 'Suzuki'), ('VITARA', 'Suzuki'), ('SZ', 'Suzuki'),
                    ('WINGLE', 'Great Wall'), ('HAVAL', 'Great Wall'),
                    ('T6', 'JAC'), ('HFC', 'JAC'),
                    ('BT-50', 'Mazda'), ('BT50', 'Mazda'),
                    ('F150', 'Ford'), ('ESCAPE', 'Ford'), ('EXPLORER', 'Ford'),
                    ('BORA', 'Volkswagen'), ('JETTA', 'Volkswagen'), ('GOL', 'Volkswagen'),
                    ('T600', 'Zotye'), ('TIGGO', 'Chery'),
                    ('HINO', 'Hino'), ('ISUZU', 'Isuzu'), ('NPR', 'Chevrolet Isuzu'), ('NHR', 'Chevrolet Isuzu'), ('FTR', 'Chevrolet Isuzu')
                ]:
                    if vname in clean_item_name.upper():
                        compat.append({'make': make, 'model': vname, 'yearRange': 'Línea Compatible'})
            if not compat:
                compat.append({'make': 'Multimarca', 'model': 'Vehículos y Flotas', 'yearRange': 'Consulte según especificación'})
                
            pres_str, vol_val = detect_presentation(item_name)
            
            prod_id = f"prod-{clean_sku(sku)}"
            prod_slug = make_slug(f"{brand}-{clean_item_name[:40]}-{sku}")
            
            processed_products.append({
                'id': prod_id,
                'sku': sku,
                'slug': prod_slug,
                'name': clean_item_name,
                'brand': brand,
                'category': category,
                'applicationType': app_type,
                'volume': pres_str if not is_filter_sheet else None,
                'shortSpec': f"Producto original {brand}. Código OEM / Referencia: {sku}. Stock disponible en Pedernales.",
                'specifications': {
                    'Código / SKU': sku,
                    'Marca': brand,
                    'Tipo': 'Filtro Automotriz' if is_filter_sheet else 'Producto Automotriz',
                    'Stock Actual': f"{it['stock']} unidades",
                    'Bodega': 'Pedernales Matriz'
                },
                'fullSpecs': {
                    'Referencia Comercial': sku,
                    'Fabricante': brand,
                    'Aplicación': app_type.capitalize(),
                    'Disponibilidad': f"{it['stock']} unid. listas para entrega"
                },
                'description': f"{clean_item_name} con especificaciones de equipo original. Garantía de rendimiento, filtración de alta precisión y máxima protección mecánica. Facturación electrónica SRI y despacho diario.",
                'priceNote': 'Cotización inmediata por WhatsApp con factura SRI',
                'warranty': 'Garantía oficial de fábrica',
                'commercialStatus': 'VERIFIED',
                'inStock': it['stock'] > 0,
                'stockStatusText': f"{it['stock']} unidades en Bodega Pedernales" if it['stock'] > 0 else "Bajo pedido inmediato",
                'dispatchIndicator': 'Despacho Inmediato',
                'primaryOriginRecommendation': 'Pedernales',
                'imageUrl': f"/images/products/{img_fn}",
                'compatibleVehicles': compat,
                'features': [
                    f"Calidad OEM garantizada por {brand}",
                    "Construcción de alta resistencia y durabilidad",
                    "Entrega inmediata en Pedernales y envíos a todo Ecuador",
                    "Factura comercial autorizada por el SRI"
                ],
                'faqs': [
                    {
                        'question': f'¿Este producto {sku} es compatible con mi vehículo?',
                        'answer': 'Nuestros asesores técnicos en Pedernales validan la compatibilidad exacta con tu número de chasis o modelo por WhatsApp antes del envío.'
                    },
                    {
                        'question': '¿Tienen stock para retiro inmediato en tienda física?',
                        'answer': f'Sí, disponemos de {it["stock"]} unidades en nuestro local matriz de Pedernales listo para entrega inmediata.'
                    }
                ],
                'isBestSeller': it['stock'] > 8
            })

print(f"Processed {len(processed_products)} primary products from sheets.")
print(f"Covered {len(covered_skus)} inventory SKUs from sheets.")

# 3. Add Batteries and Battery Accessories
print("Processing Batteries and Battery Accessories...")

for it in inv_items:
    sku = it['sku']
    name = it['name']
    name_u = name.upper()
    stock = it['stock']
    
    if sku.upper() in covered_skus:
        continue
        
    if any(b in name_u for b in ['BATERIA', 'BATERA']):
        covered_skus.add(sku.upper())
        is_bosch = 'BOSCH' in name_u
        brand = 'BOSCH' if is_bosch else 'BATERÍAS ECUADOR'
        img_url = '/images/products/bosch-s4-real.png' if is_bosch else '/images/products/baterias-ecuador-real.png'
        
        # Determine application type
        app_type = 'autos'
        if any(h in name_u for h in ['N100', 'N150', '31 SHD', 'SHD', '55 HD']):
            app_type = 'pesado'
        elif any(c in name_u for c in ['27 HP', '27 FE', '34 HP', '34 FE', '65 HP', '66 HP']):
            app_type = 'camionetas'
            
        # Extract Ah / Amp
        amp_match = re.search(r'(\d+)\s*(?:AMP|AH)', name_u)
        amp_str = f"{amp_match.group(1)} Ah" if amp_match else "12V Alta Potencia"
        
        clean_name_bat = name
        if is_bosch:
            clean_name_bat = re.sub(r'BATERIA\s+BOSCH\s+', 'Batería Bosch ', clean_name_bat, flags=re.I)
        else:
            clean_name_bat = re.sub(r'BATERIA\s+ECUADOR\s+', 'Batería Ecuador ', clean_name_bat, flags=re.I)
            
        prod_id = f"bat-{clean_sku(sku)}"
        prod_slug = make_slug(f"{brand}-{clean_name_bat}-{sku}")
        warranty = "18 meses / 40.000 Km" if is_bosch else "Garantía Nacional 15 a 18 meses"
        
        processed_products.append({
            'id': prod_id,
            'sku': sku,
            'slug': prod_slug,
            'name': clean_name_bat,
            'brand': brand,
            'category': 'baterias',
            'applicationType': app_type,
            'plates': amp_str,
            'shortSpec': f"{clean_name_bat} con tecnología de libre mantenimiento. {amp_str}, arranque confiable en frío.",
            'specifications': {
                'Marca': brand,
                'Capacidad / Potencia': amp_str,
                'Garantía': warranty,
                'Tipo de Borne': 'Estándar Automotriz (Izquierdo / Derecho según código)',
                'Stock': f"{stock} unidades en Pedernales"
            },
            'fullSpecs': {
                'Línea': 'High Power / S4' if is_bosch else 'High Power Selección Oficial',
                'Tecnología': 'PowerFrame Alemana' if is_bosch else 'Placas Reforzadas Heavy Duty',
                'Garantía Certificada': warranty,
                'Origen': 'Distribución Autorizada LiderPro'
            },
            'description': f"{clean_name_bat} disponible en LiderPro Pedernales con instalación y diagnóstico computarizado sin costo. Producto 100% original con sello de garantía y respaldo técnico directo.",
            'priceNote': 'Precio preferencial entregando batería usada (Plan Eco-Valor SRI)',
            'warranty': warranty,
            'commercialStatus': 'VERIFIED',
            'inStock': stock > 0,
            'stockStatusText': f"{stock} unidades disponibles en Bodega Pedernales" if stock > 0 else "Bajo pedido inmediato",
            'dispatchIndicator': 'Entrega & Instalación Inmediata',
            'primaryOriginRecommendation': 'Pedernales',
            'imageUrl': img_url,
            'compatibleVehicles': [
                {'make': 'Línea Nacional', 'model': 'Autos, Camionetas y Flotas según amperaje', 'yearRange': '12V'}
            ],
            'features': [
                "Diseño profesional institucional según modelo real en tienda",
                f"Garantía oficial {warranty}",
                "Diagnóstico y prueba de alternador sin costo en local",
                "Facturación electrónica autorizada por el SRI"
            ],
            'faqs': [
                {
                    'question': '¿Reciben mi batería vieja como parte de pago?',
                    'answer': 'Sí, aplicamos el descuento Eco-Valor entregando tu batería usada para reciclaje ecológico certificado.'
                },
                {
                    'question': '¿La instalación tiene costo adicional?',
                    'answer': 'La instalación, revisión del alternador y bornes es completamente gratuita en nuestro local de Pedernales.'
                }
            ],
            'isBestSeller': stock >= 2
        })

    elif any(acc in name_u for acc in ['SOPORTE DE BATERIA', 'TERMINAL BATERIA', 'ECOVALOR (VENTA BATERIA']):
        covered_skus.add(sku.upper())
        img_acc = '/images/products/terminals-pair.png'
        if 'ROJO VARILLA' in name_u:
            img_acc = '/images/products/support-0995009R.png'
        elif 'INFERIOR PEQUE' in name_u:
            img_acc = '/images/products/support-0995009VCU.png'
        elif 'ECOVALOR' in name_u:
            img_acc = '/images/products/ecovalor-ECOVLBAT.png'
            
        prod_id = f"acc-{clean_sku(sku)}"
        prod_slug = make_slug(f"accesorio-{name}-{sku}")
        
        processed_products.append({
            'id': prod_id,
            'sku': sku,
            'slug': prod_slug,
            'name': name,
            'brand': 'LIDERPRO',
            'category': 'baterias',
            'applicationType': 'autos',
            'shortSpec': f"Accesorio automotriz de sujeción / conexión eléctrica ({sku}).",
            'specifications': {
                'SKU': sku,
                'Línea': 'Accesorios de Batería',
                'Stock': f"{stock} unidades en Pedernales"
            },
            'fullSpecs': {
                'Código': sku,
                'Calidad': 'OEM Reforzado'
            },
            'description': f"{name}. Accesorio indispensable para una instalación firme y segura del sistema eléctrico automotriz.",
            'priceNote': 'Consultar precio por WhatsApp',
            'warranty': 'Garantía de ajuste',
            'commercialStatus': 'VERIFIED',
            'inStock': stock > 0,
            'stockStatusText': f"{stock} unidades en Pedernales",
            'dispatchIndicator': 'Despacho Inmediato',
            'primaryOriginRecommendation': 'Pedernales',
            'imageUrl': img_acc,
            'compatibleVehicles': [{'make': 'Universal', 'model': 'Vehículos 12V', 'yearRange': 'Todos'}],
            'features': ['Resistente a la corrosión', 'Fijación de alta firmeza'],
            'faqs': [{'question': '¿Es compatible con mi auto?', 'answer': 'Sí, es medida universal estándar para baterías de 12V.'}],
            'isBestSeller': False
        })

# 4. Compute uncovered items (items in INVENTARIO without images)
uncovered_items = [it for it in inv_items if it['sku'].upper() not in covered_skus]
print(f"\nTotal products created in catalog: {len(processed_products)}")
print(f"Total inventory SKUs covered: {len(covered_skus)} of {len(inv_items)}")
print(f"Total uncovered items (sin imagen): {len(uncovered_items)}")

# 5. Generate Report Artifact
report_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\reporte_productos_sin_imagen.md'

# Group uncovered by category
uncovered_by_cat = {}
for it in uncovered_items:
    name_u = it['name'].upper()
    cat = 'Varios / Repuestos'
    if 'PLUMA' in name_u:
        cat = 'Plumas Limpiaparabrisas (Bosch)'
    elif 'BUJIA' in name_u:
        cat = 'Bujías (NGK / Denso)'
    elif 'FOCO' in name_u:
        cat = 'Focos Automotrices (Bosch)'
    elif 'FRENO' in name_u or 'ATE' in name_u:
        cat = 'Líquidos de Freno (ATE)'
    elif 'BARDAHL' in name_u:
        cat = 'Aditivos Bardahl'
    elif 'GLOBAL' in name_u or 'GRAFITADA' in name_u:
        cat = 'Químicos / Duchas Especiales'
    elif 'SIMONIZ' in name_u or 'TAPETE' in name_u:
        cat = 'Accesorios Simoniz'
    elif 'MANNOL' in name_u:
        cat = 'Mannol (Referencias sin imagen en Excel)'
    elif 'ABRO' in name_u:
        cat = 'Abro (Referencias sin imagen en Excel)'
    elif 'VALVOLINE' in name_u:
        cat = 'Valvoline (Referencias sin imagen en Excel)'
    elif 'ECOVL' in name_u:
        cat = 'Rubros Administrativos (Eco-Valor Aceites)'
    uncovered_by_cat.setdefault(cat, []).append(it)

with open(report_path, 'w', encoding='utf-8') as rf:
    rf.write("# Auditoría Institucional: Productos de Inventario Excluidos por Falta de Imagen Real\n\n")
    rf.write("> [!IMPORTANT]\n")
    rf.write("> En estricto cumplimiento de su instrucción: **\"los productos que no encuentres con imágenes debes no colocarlos en la página hasta que te envíe la imagen real pero me puedes documentar exactamente qué falta en qué productos\"**, estos artículos se mantienen debidamente inventariados pero fuera de la vista pública hasta contar con su respectiva fotografía de estudio.\n\n")
    rf.write("## Resumen Ejecutivo del Inventario Maestro\n\n")
    rf.write(f"- **Total de ítems en `INVENTARIO.xlsx`:** {len(inv_items)} referencias.\n")
    rf.write(f"- **Productos Activos en el Catálogo Público:** {len(processed_products)} productos institucionales.\n")
    rf.write(f"- **Referencias del Inventario Cubiertas (con imagen y variantes unificadas):** {len(covered_skus)} ítems ({round(len(covered_skus)/len(inv_items)*100, 1)}%).\n")
    rf.write(f"- **Referencias Pendientes de Fotografía Real:** {len(uncovered_items)} ítems.\n\n")
    rf.write("---\n\n")
    rf.write("## Detalle de Ítems Pendientes por Categoría y Marca\n\n")
    
    for cat_name, items in sorted(uncovered_by_cat.items(), key=lambda x: -len(x[1])):
        total_cat_stock = sum(it['stock'] for it in items)
        rf.write(f"### {cat_name} ({len(items)} referencias | Stock total: {total_cat_stock} unidades)\n\n")
        rf.write("| SKU | Descripción Oficial | Stock en Bodega |\n")
        rf.write("| :--- | :--- | :---: |\n")
        for it in items:
            rf.write(f"| `{it['sku']}` | {it['name']} | **{it['stock']}** |\n")
        rf.write("\n")

print(f"Report artifact written to {report_path}")

# 6. Generate src/data/products.ts
ts_path = r'src/data/products.ts'

ts_content = """export type ApplicationType = "autos" | "camionetas" | "pesado" | "motos";

export type ProductCategory =
  | "baterias"
  | "lubricantes"
  | "filtros"
  | "refrigerantes"
  | "frenos"
  | "bujias"
  | "aditivos";

export interface ProductVariant {
  sku: string;
  name: string;
  presentation: string;
  volume?: string;
  stock: number;
  imageUrl: string;
  barcode?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  applicationType: ApplicationType;
  volume?: string;
  plates?: string;
  shortSpec: string;
  specifications: Record<string, string>;
  fullSpecs: Record<string, string>;
  description: string;
  priceEstimate?: string;
  priceNote: string;
  warranty: string;
  commercialStatus: "VERIFIED" | "REFERENCE" | "PENDING_VERIFICATION";
  inStock: boolean;
  stockStatusText: string;
  dispatchIndicator: string;
  primaryOriginRecommendation: "Pedernales" | "Quito" | "Nacional";
  imageUrl: string;
  variants?: ProductVariant[];
  compatibleVehicles: {
    make: string;
    model: string;
    yearRange: string;
    engine?: string;
  }[];
  features: string[];
  faqs: { question: string; answer: string }[];
  isBestSeller?: boolean;
}

export const OFFICIAL_BRANDS = [
  { name: "BATERÍAS ECUADOR", logoUrl: "/images/brands/baterias-ecuador.png", origin: "Línea Oficial Nacional", specialty: "Arranque & Alta Durabilidad" },
  { name: "BOSCH", logoUrl: "/images/brands/bosch.png", origin: "Tecnología Alemana", specialty: "Baterías S4 PowerFrame" },
  { name: "MANNOL", logoUrl: "/images/brands/mannol.png", origin: "Ingeniería Alemana", specialty: "Sintéticos, Coolant & Aditivos" },
  { name: "AROIL", logoUrl: "/images/brands/aroil.png", origin: "Alta Rotación Ecuador", specialty: "Super 40, 15W-40 & Canecas" },
  { name: "MOBIL", logoUrl: "/images/brands/mobil.png", origin: "ExxonMobil Global", specialty: "Mobil Delvac & Mobil 1" },
  { name: "MOTUL", logoUrl: "/images/brands/motul.png", origin: "Especialista Francés", specialty: "Motos 4T Ester & Rendimiento" },
  { name: "VALVOLINE", logoUrl: "/images/brands/valvoline.png", origin: "Líder Americano", specialty: "Valvodiesel & Protección SAE" },
  { name: "AMALIE", logoUrl: "/images/brands/amalie.png", origin: "Fórmula Americana", specialty: "Synthetic Blend Multigrado" },
  { name: "ADVANCE", logoUrl: "/images/brands/advance.png", origin: "Filtración Automotriz", specialty: "Filtros de Aceite, Aire & Combustible" },
  { name: "ATE", logoUrl: "/images/brands/ate.png", origin: "Equipo Original Alemán", specialty: "Fluidos de Freno DOT 3 & DOT 4" },
  { name: "NGK", logoUrl: "/images/brands/ngk.png", origin: "Líder en Encendido", specialty: "Bujías Platino & Cobre" },
  { name: "DENSO", logoUrl: "/images/brands/denso.png", origin: "Equipo Original Japonés", specialty: "Bujías de Precisión OEM" },
  { name: "BARDAHL", logoUrl: "/images/brands/bardahl.png", origin: "Aditivos Profesionales", specialty: "Tratamiento B1, B2 & Antifricción" },
  { name: "ABRO", logoUrl: "/images/brands/abro.png", origin: "Fórmula Americana", specialty: "Químicos & Refrigerantes USA" },
  { name: "SIMONIZ", logoUrl: "/images/brands/simoniz.png", origin: "Cuidado Automotriz", specialty: "Ceras, Siliconas & Shampoo" },
  { name: "AREON", logoUrl: "/images/brands/areon.png", origin: "Perfumería Europea", specialty: "Aromas Black Crystal & New Car" }
];

export const PRODUCTS: Product[] = """

# Format JSON cleanly as TypeScript
json_products = json.dumps(processed_products, indent=2, ensure_ascii=False)
ts_content += json_products + ";\n"

with open(ts_path, 'w', encoding='utf-8') as tf:
    tf.write(ts_content)

print(f"TypeScript products file successfully written to {ts_path} ({len(processed_products)} products).")
