import os
import re
import json
import zipfile
import xml.etree.ElementTree as ET
from io import BytesIO
from PIL import Image
import openpyxl

EXCEL_PATH = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx"
IMG_OUT_DIR = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\public\images\products"
DATA_OUT_PATH = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\src\data\products.ts"
REPORT_OUT_PATH = r"c:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\reporte_productos_sin_imagen.md"

os.makedirs(IMG_OUT_DIR, exist_ok=True)

wb = openpyxl.load_workbook(EXCEL_PATH, data_only=True)

# Helper: slugify
def slugify(text):
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    return text.strip("-")

# Read drawing and worksheet mapping from zip
with zipfile.ZipFile(EXCEL_PATH, "r") as z:
    wb_root = ET.fromstring(z.read("xl/workbook.xml"))
    wb_rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
    sheet_target = {r.attrib["Id"]: r.attrib["Target"] for r in wb_rels}
    ns_wb = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    ns_draw = {
        "xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
        "a": "http://schemas.openxmlformats.org/drawingml/2006/main"
    }

    print("Extracting sheets and images from FILTROS.xlsx...")
    
    extracted_catalog = []
    missing_image_products = []
    
    # Process sheets
    for sheetname in wb.sheetnames:
        if sheetname == "Sheet1":
            continue
            
        ws = wb[sheetname]
        
        # Determine category & brand
        brand = "ADVANCE"
        category = "Filtros"
        subcategory = "Filtros Automotrices"
        is_filter = False
        is_lubricant = False
        is_chemical = False
        
        if "MANNOL" in sheetname:
            brand = "MANNOL"
            if sheetname == "LURICANTE MANNOL":
                category = "Aceites y Lubricantes"
                subcategory = "Lubricantes Motor & Refrigerantes"
                is_lubricant = True
            else:
                category = "Químicos y Aditivos"
                subcategory = "Cuidado & Rendimiento Automotriz"
                is_chemical = True
        elif "MOBIL" in sheetname:
            brand = "MOBIL"
            category = "Aceites y Lubricantes"
            subcategory = "Lubricantes Motor Heavy Duty & Gasolina"
            is_lubricant = True
        elif "AMALIE" in sheetname:
            brand = "AMALIE"
            category = "Aceites y Lubricantes"
            subcategory = "Lubricantes Motor Sintéticos"
            is_lubricant = True
        elif "MOTUL" in sheetname:
            brand = "MOTUL"
            category = "Aceites y Lubricantes"
            subcategory = "Lubricantes Motor y Motos"
            is_lubricant = True
        elif "AROIL" in sheetname:
            brand = "AROIL"
            category = "Aceites y Lubricantes"
            subcategory = "Lubricantes Automotrices e Industriales"
            is_lubricant = True
        elif "VALVOLINE" in sheetname:
            brand = "VALVOLINE"
            category = "Aceites y Lubricantes"
            subcategory = "Lubricantes Premium"
            is_lubricant = True
        elif "ABRO" in sheetname:
            brand = "ABRO"
            category = "Químicos y Aditivos"
            subcategory = "Selladores, Grasas y Cintas"
            is_chemical = True
        elif "PERFUMES" in sheetname:
            brand = "SIMONIZ / AREON"
            category = "Químicos y Aditivos"
            subcategory = "Ambientadores y Cosmética Automotriz"
            is_chemical = True
        elif "FILTROS" in sheetname:
            brand = "ADVANCE"
            category = "Filtros"
            is_filter = True
            if "AIRE" in sheetname:
                subcategory = "Filtros de Aire"
            elif "ACEITE" in sheetname:
                subcategory = "Filtros de Aceite"
            elif "CABINA" in sheetname:
                subcategory = "Filtros de Cabina"
            elif "COMBUSTIBLE" in sheetname:
                subcategory = "Filtros de Combustible"

        # Find sheet target
        target = None
        for s in wb_root.findall(".//s:sheet", ns_wb):
            if s.attrib["name"] == sheetname:
                target = sheet_target[s.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]]
                break
                
        if not target:
            continue
            
        rel_file = f"xl/worksheets/_rels/{target.split('/')[-1]}.rels"
        if rel_file not in z.namelist():
            continue
            
        s_rels = ET.fromstring(z.read(rel_file))
        draw_targets = [r.attrib["Target"] for r in s_rels if "drawing" in r.attrib["Type"]]
        if not draw_targets:
            continue
            
        draw_target = draw_targets[0]
        draw_filename = "xl/drawings/" + draw_target.split("/")[-1]
        draw_rels_file = "xl/drawings/_rels/" + draw_target.split("/")[-1] + ".rels"
        
        dr_rels_root = ET.fromstring(z.read(draw_rels_file))
        rel_map = {r.attrib["Id"]: r.attrib["Target"] for r in dr_rels_root}
        draw_root = ET.fromstring(z.read(draw_filename))
        
        # Calculate row heights cumulative
        cumulative_y = [0]
        default_height_pt = ws.sheet_format.defaultRowHeight or 15.0
        total_y = 0
        for r in range(1, ws.max_row + 15):
            h = ws.row_dimensions[r].height if r in ws.row_dimensions and ws.row_dimensions[r].height else default_height_pt
            h_emu = int(round(h * 12700))
            total_y += h_emu
            cumulative_y.append(total_y)
            
        # Parse pictures and their EMU positions
        # Store: row -> col -> list of {img_bytes, src_rect, embed, target}
        row_col_pics = {}
        for anchor in draw_root:
            from_el = anchor.find("xdr:from", ns_draw)
            to_el = anchor.find("xdr:to", ns_draw)
            if from_el is None:
                continue
                
            c1 = int(from_el.find("xdr:col", ns_draw).text) + 1
            r1 = int(from_el.find("xdr:row", ns_draw).text) + 1
            off_y1 = int(from_el.find("xdr:rowOff", ns_draw).text if from_el.find("xdr:rowOff", ns_draw) is not None else 0)
            
            c2 = int(to_el.find("xdr:col", ns_draw).text) + 1 if to_el is not None else c1
            r2 = int(to_el.find("xdr:row", ns_draw).text) + 1 if to_el is not None else r1
            off_y2 = int(to_el.find("xdr:rowOff", ns_draw).text if to_el is not None and to_el.find("xdr:rowOff", ns_draw) is not None else 0)
            
            pic = anchor.find("xdr:pic", ns_draw)
            if pic is None:
                continue
            blip = pic.find(".//a:blip", ns_draw)
            if blip is None:
                continue
            embed = blip.attrib.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed")
            tgt = rel_map.get(embed)
            if not tgt:
                continue
                
            src_rect = pic.find(".//a:srcRect", ns_draw)
            
            # Mid Y in EMUs
            y_start = cumulative_y[r1 - 1] + off_y1
            y_end = cumulative_y[r2 - 1] + off_y2
            y_mid = (y_start + y_end) / 2.0
            
            assigned_row = 1
            for r in range(1, len(cumulative_y)):
                if cumulative_y[r-1] <= y_mid < cumulative_y[r]:
                    assigned_row = r
                    break
                    
            if assigned_row not in row_col_pics:
                row_col_pics[assigned_row] = {}
            if c1 not in row_col_pics[assigned_row]:
                row_col_pics[assigned_row][c1] = []
                
            row_col_pics[assigned_row][c1].append({
                "embed": embed,
                "tgt": tgt,
                "src_rect": src_rect,
                "y_mid": y_mid
            })

        # Process each row
        sheet_slug = slugify(sheetname)
        for r in range(1, ws.max_row + 1):
            val_a = ws.cell(r, 1).value
            val_b = ws.cell(r, 2).value
            
            # Skip empty or header rows
            if not val_a and not val_b:
                continue
            name_candidate = str(val_b or val_a).strip()
            if not name_candidate or name_candidate.lower().startswith("salida") or name_candidate.lower().startswith("título"):
                continue
                
            pics_by_col = row_col_pics.get(r, {})
            
            # If no pictures, record as missing
            if not pics_by_col:
                missing_image_products.append({
                    "sheet": sheetname,
                    "row": r,
                    "sku": str(val_a).strip() if val_a else "N/A",
                    "name": name_candidate
                })
                continue
                
            # We have pictures!
            # Crop helper
            def crop_and_save_pic(pic_info, out_filename):
                tgt_path = "xl/" + pic_info["tgt"].replace("../", "")
                raw_bytes = z.read(tgt_path)
                im = Image.open(BytesIO(raw_bytes))
                W, H = im.size
                src_rect = pic_info["src_rect"]
                if src_rect is not None and any(k in src_rect.attrib for k in ["l", "t", "r", "b"]):
                    l = float(src_rect.attrib.get("l", 0)) / 100000.0
                    t = float(src_rect.attrib.get("t", 0)) / 100000.0
                    right = float(src_rect.attrib.get("r", 0)) / 100000.0
                    b = float(src_rect.attrib.get("b", 0)) / 100000.0
                    x1 = max(0, int(round(W * l)))
                    y1 = max(0, int(round(H * t)))
                    x2 = min(W, int(round(W * (1.0 - right))))
                    y2 = min(H, int(round(H * (1.0 - b))))
                    if x2 > x1 + 10 and y2 > y1 + 10:
                        im = im.crop((x1, y1, x2, y2))
                out_full = os.path.join(IMG_OUT_DIR, out_filename)
                # Convert RGBA or CMYK to RGB if saving jpg, or save png
                if im.mode in ("RGBA", "P"):
                    im.save(out_full, format="PNG")
                else:
                    im.save(out_full, format="PNG")
                return f"/images/products/{out_filename}"

            sku = str(val_a).strip() if val_a and str(val_a).strip() != "" and is_filter else None
            if not sku:
                # Try to extract code like AA-10891 or 080...
                m = re.search(r"\b([0-9]{3}[A-Z]{2,3}-[0-9A-Z-]+)\b", name_candidate)
                if m:
                    sku = m.group(1)
                else:
                    m2 = re.search(r"\b(AA-\s*[0-9]+|AC-\s*[0-9]+|AO-\s*[0-9]+|AF-\s*[0-9]+)\b", name_candidate)
                    if m2:
                        sku = m2.group(1).replace(" ", "")
                    else:
                        sku = f"LP-{sheet_slug[:3].upper()}-{r:03d}"

            # Brand refinement from name
            prod_brand = brand
            if "SIMONIZ" in name_candidate.upper():
                prod_brand = "SIMONIZ"
            elif "AREON" in name_candidate.upper():
                prod_brand = "AREON"
            elif "ABRO" in name_candidate.upper():
                prod_brand = "ABRO"
            elif "MANNOL" in name_candidate.upper():
                prod_brand = "MANNOL"
            elif "AROIL" in name_candidate.upper():
                prod_brand = "AROIL"
            elif "MOBIL" in name_candidate.upper():
                prod_brand = "MOBIL"
            elif "VALVOLINE" in name_candidate.upper():
                prod_brand = "VALVOLINE"
            elif "MOTUL" in name_candidate.upper():
                prod_brand = "MOTUL"
            elif "AMALIE" in name_candidate.upper():
                prod_brand = "AMALIE"

            # Check if this row is a multi-variant product or solo product
            cols_sorted = sorted(pics_by_col.keys())
            
            if is_filter:
                # FILTERS ARE ALWAYS SOLO PRODUCTS!
                # Col 4 is preferred (front view), fallback to Col 3
                chosen_col = 4 if 4 in pics_by_col else cols_sorted[0]
                pic_info = pics_by_col[chosen_col][0]
                img_name = f"{sheet_slug}-r{r}-{sku.lower().replace('/', '-')}.png"
                img_url = crop_and_save_pic(pic_info, img_name)
                
                extracted_catalog.append({
                    "id": f"{sheet_slug}-r{r}",
                    "sku": sku,
                    "name": name_candidate,
                    "brand": prod_brand,
                    "category": category,
                    "subcategory": subcategory,
                    "imageUrl": img_url,
                    "variants": None,
                    "isFilter": True
                })
            else:
                # Lubricants, coolants, chemicals:
                # Columns C, D, E/F represent sizes!
                # Col 3 = Pequeño (1 Litro / Cuarto / 800g / 250ml)
                # Col 4 = Mediano (1 Galón / 5 Litros / 4.5kg / etc.)
                # Col 5/6 = Grande (Caneca 5 GL / 18kg / 20 Litros)
                
                # Check how many distinct size columns exist
                size_cols = [c for c in cols_sorted if c in [3, 4, 5, 6, 7]]
                
                if len(size_cols) == 1:
                    # SOLO PRODUCT
                    col_idx = size_cols[0]
                    pic_info = pics_by_col[col_idx][0]
                    img_name = f"{sheet_slug}-r{r}-solo.png"
                    img_url = crop_and_save_pic(pic_info, img_name)
                    
                    pres = "1 Litro"
                    if col_idx == 4:
                        pres = "1 Galón"
                    elif col_idx >= 5:
                        pres = "Caneca 5 GL"
                    # If chemical, check name
                    m_vol = re.search(r"(\d+(?:\.\d+)?\s*(?:ml|cc|gr|grs|kg|oz|lt|litro|galon|caneca))\b", name_candidate, re.I)
                    if m_vol:
                        pres = m_vol.group(1).title()
                        
                    extracted_catalog.append({
                        "id": f"{sheet_slug}-r{r}",
                        "sku": sku,
                        "name": name_candidate,
                        "brand": prod_brand,
                        "category": category,
                        "subcategory": subcategory,
                        "imageUrl": img_url,
                        "volume": pres,
                        "variants": None,
                        "isFilter": False
                    })
                else:
                    # MULTI-VARIANT PRODUCT (MAX 3)
                    # Pick at most 3 size columns
                    picked_cols = size_cols[:3]
                    variants_list = []
                    primary_img = None
                    
                    for c_idx in picked_cols:
                        pic_info = pics_by_col[c_idx][0]
                        v_label = "1 Litro"
                        if c_idx == 3:
                            v_label = "1 Litro"
                            if "grasa" in name_candidate.lower():
                                v_label = "800 g"
                            elif "250ml" in name_candidate.lower():
                                v_label = "250 ml"
                            elif "400ml" in name_candidate.lower() or "450" in name_candidate.lower():
                                v_label = "450 ml"
                        elif c_idx == 4:
                            v_label = "1 Galón"
                            if "5lt" in name_candidate.lower() or "5 lt" in name_candidate.lower() or "5w" in name_candidate.lower():
                                v_label = "1 Galón / 5L" if "mannol" in prod_brand.lower() else "1 Galón"
                            elif "4.5" in name_candidate.lower():
                                v_label = "4.5 kg"
                        elif c_idx >= 5:
                            v_label = "Caneca 5 GL"
                            if "18" in name_candidate.lower():
                                v_label = "Caneca 18 kg"
                            elif "20" in name_candidate.lower():
                                v_label = "Caneca 20L"
                                
                        v_sku = f"{sku}-C{c_idx}"
                        v_img_name = f"{sheet_slug}-r{r}-c{c_idx}.png"
                        v_img_url = crop_and_save_pic(pic_info, v_img_name)
                        
                        if primary_img is None:
                            primary_img = v_img_url
                            
                        variants_list.append({
                            "sku": v_sku,
                            "name": f"{name_candidate} ({v_label})",
                            "presentation": v_label,
                            "imageUrl": v_img_url
                        })
                        
                    extracted_catalog.append({
                        "id": f"{sheet_slug}-r{r}",
                        "sku": sku,
                        "name": name_candidate,
                        "brand": prod_brand,
                        "category": category,
                        "subcategory": subcategory,
                        "imageUrl": primary_img,
                        "variants": variants_list,
                        "isFilter": False
                    })

    print(f"Catalog extraction complete: {len(extracted_catalog)} valid products, {len(missing_image_products)} missing image products.")
    
    # Save missing image report
    with open(REPORT_OUT_PATH, "w", encoding="utf-8") as rf:
        rf.write("# Reporte Oficial de Productos Faltantes de Imagen\n\n")
        rf.write(f"Total productos sin imagen en el Excel: **{len(missing_image_products)}**\n\n")
        rf.write("| Hoja | Fila | SKU | Nombre del Producto |\n|---|---|---|---|\n")
        for m in missing_image_products:
            rf.write(f"| {m['sheet']} | {m['row']} | {m['sku']} | {m['name']} |\n")
    print(f"Missing images report written to {REPORT_OUT_PATH}")

