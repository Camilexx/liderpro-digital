import zipfile
import xml.etree.ElementTree as ET
import os

xlsx_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.user_uploaded\media_1792380131191_09084a0a.xlsx'

with zipfile.ZipFile(xlsx_path, 'r') as z:
    # 1. Shared strings
    sst_root = ET.fromstring(z.read('xl/sharedStrings.xml'))
    shared_strings = []
    for si in sst_root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
        t_elems = si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
        shared_strings.append("".join([t.text or "" for t in t_elems]))

    sheets_to_check = {
        'FILTROS ACEITE': 'xl/worksheets/sheet5.xml',
        'FILTROS CABINA': 'xl/worksheets/sheet6.xml',
        'FILTROS COMBUSTIBLE': 'xl/worksheets/sheet7.xml',
    }

    for sheet_name, sheet_xml_path in sheets_to_check.items():
        print(f"\n=======================================================")
        print(f"ANALYZING: {sheet_name} ({sheet_xml_path})")
        print(f"=======================================================")
        
        # Read sheet rows
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

        print(f"Total rows in {sheet_name}: {len(rows_data)}")
        # Print first 5 rows
        for r in sorted(rows_data.keys())[:6]:
            print(f"  Row {r}: {rows_data[r]}")

        # Find drawing relationship for this sheet
        # E.g. xl/worksheets/_rels/sheet5.xml.rels
        sheet_dir, sheet_file = os.path.split(sheet_xml_path)
        rels_path = f"{sheet_dir}/_rels/{sheet_file}.rels"
        if rels_path in z.namelist():
            rels_root = ET.fromstring(z.read(rels_path))
            drawing_target = None
            for rel in rels_root.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                if 'drawing' in rel.attrib['Type']:
                    drawing_target = rel.attrib['Target']
                    break
            
            if drawing_target:
                # normalize drawing path
                if drawing_target.startswith('../'):
                    drawing_path = 'xl/' + drawing_target[3:]
                else:
                    drawing_path = 'xl/worksheets/' + drawing_target
                print(f"Drawing XML: {drawing_path}")
                
                # Read drawing rels to map rId to media image
                dr_dir, dr_file = os.path.split(drawing_path)
                dr_rels_path = f"{dr_dir}/_rels/{dr_file}.rels"
                dr_rid_to_media = {}
                if dr_rels_path in z.namelist():
                    dr_rels_root = ET.fromstring(z.read(dr_rels_path))
                    for rel in dr_rels_root.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                        m_target = rel.attrib['Target']
                        if m_target.startswith('../'):
                            m_path = 'xl/' + m_target[3:]
                        else:
                            m_path = 'xl/drawings/' + m_target
                        dr_rid_to_media[rel.attrib['Id']] = m_path

                # Parse drawing XML anchors
                dr_root = ET.fromstring(z.read(drawing_path))
                anchors = []
                # Check twoCellAnchor and oneCellAnchor
                for anchor in dr_root.iter():
                    if anchor.tag.endswith('twoCellAnchor') or anchor.tag.endswith('oneCellAnchor'):
                        from_elem = anchor.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}from')
                        blip_elem = anchor.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
                        if from_elem is not None and blip_elem is not None:
                            row_elem = from_elem.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}row')
                            embed_id = blip_elem.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                            if row_elem is not None and embed_id:
                                r_num = int(row_elem.text) + 1 # 1-based row
                                media_f = dr_rid_to_media.get(embed_id, 'UNKNOWN')
                                anchors.append((r_num, embed_id, media_f))
                
                print(f"Found {len(anchors)} image anchors in drawing XML")
                for r_num, emb, mf in anchors[:6]:
                    sku_candidate = rows_data.get(r_num, {}).get('A', '') or rows_data.get(r_num, {}).get('B', '')
                    print(f"    Row {r_num}: Embed {emb} -> {mf} | SKU/Name: {sku_candidate[:40]}")
