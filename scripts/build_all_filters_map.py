import zipfile
import xml.etree.ElementTree as ET
import os
import json

xlsx_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.user_uploaded\media_1792380131191_09084a0a.xlsx'

with zipfile.ZipFile(xlsx_path, 'r') as z:
    # 1. Shared strings
    sst_root = ET.fromstring(z.read('xl/sharedStrings.xml'))
    shared_strings = []
    for si in sst_root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
        t_elems = si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
        shared_strings.append("".join([t.text or "" for t in t_elems]))

    sheets_to_process = [
        ('aceite', 'FILTROS ACEITE', 'xl/worksheets/sheet5.xml'),
        ('cabina', 'FILTROS CABINA', 'xl/worksheets/sheet6.xml'),
        ('combustible', 'FILTROS COMBUSTIBLE', 'xl/worksheets/sheet7.xml')
    ]

    all_maps = {}

    for cat_key, sheet_name, sheet_xml_path in sheets_to_process:
        print(f"\nProcessing {sheet_name}...")
        sheet_root = ET.fromstring(z.read(sheet_xml_path))
        rows_data = {}
        for row in sheet_root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
            r_idx = int(row.attrib['r'])
            cells = {}
            for c in row.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                c_ref = c.attrib['r']
                col_letter = ''.join([ch for ch in c_ref if ch.isalpha()])
                t_type = c.attrib.get('t')
                v_elem = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                if v_elem is not None and v_elem.text:
                    if t_type == 's':
                        val = shared_strings[int(v_elem.text)]
                    else:
                        val = v_elem.text
                else:
                    val = ""
                cells[col_letter] = val
            rows_data[r_idx] = cells

        # Drawing rels
        sheet_dir, sheet_file = os.path.split(sheet_xml_path)
        rels_path = f"{sheet_dir}/_rels/{sheet_file}.rels"
        rels_root = ET.fromstring(z.read(rels_path))
        drawing_target = None
        for rel in rels_root.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
            if 'drawing' in rel.attrib['Type']:
                drawing_target = rel.attrib['Target']
                break
        
        drawing_path = ('xl/' + drawing_target[3:]) if drawing_target.startswith('../') else ('xl/worksheets/' + drawing_target)
        dr_dir, dr_file = os.path.split(drawing_path)
        dr_rels_path = f"{dr_dir}/_rels/{dr_file}.rels"
        dr_rid_to_media = {}
        if dr_rels_path in z.namelist():
            dr_rels_root = ET.fromstring(z.read(dr_rels_path))
            for rel in dr_rels_root.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                m_target = rel.attrib['Target']
                m_path = ('xl/' + m_target[3:]) if m_target.startswith('../') else ('xl/drawings/' + m_target)
                dr_rid_to_media[rel.attrib['Id']] = m_path

        dr_root = ET.fromstring(z.read(drawing_path))
        
        # Each anchor has a from row
        row_to_images = {}
        for anchor in dr_root.iter():
            if anchor.tag.endswith('twoCellAnchor') or anchor.tag.endswith('oneCellAnchor'):
                from_elem = anchor.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}from')
                blip_elem = anchor.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
                if from_elem is not None and blip_elem is not None:
                    row_elem = from_elem.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}row')
                    col_elem = from_elem.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}col')
                    embed_id = blip_elem.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                    if row_elem is not None and embed_id:
                        r_num = int(row_elem.text) + 1
                        c_num = int(col_elem.text) if col_elem is not None else 0
                        media_f = dr_rid_to_media.get(embed_id)
                        if media_f:
                            if r_num not in row_to_images:
                                row_to_images[r_num] = []
                            row_to_images[r_num].append((c_num, media_f))

        sheet_items = []
        for r_num in sorted(rows_data.keys()):
            if r_num == 1:
                continue # header
            r_cells = rows_data[r_num]
            sku = r_cells.get('A', '').strip()
            name = r_cells.get('B', '').strip()
            if not sku and not name:
                continue
            
            imgs = row_to_images.get(r_num, [])
            # sort by column (c_num)
            imgs_sorted = sorted(imgs, key=lambda x: x[0])
            hero_img = imgs_sorted[0][1] if imgs_sorted else None
            
            sheet_items.append({
                'row': r_num,
                'sku': sku,
                'name': name,
                'hero_img': hero_img,
                'all_imgs': [x[1] for x in imgs_sorted]
            })

        print(f"Mapped {len(sheet_items)} items for {sheet_name} (Items with images: {sum(1 for x in sheet_items if x['hero_img'])})")
        all_maps[cat_key] = sheet_items

    with open('scripts/all_remaining_filters_map.json', 'w', encoding='utf-8') as f:
        json.dump(all_maps, f, indent=2, ensure_ascii=False)
    print("Saved scripts/all_remaining_filters_map.json")
