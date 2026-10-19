import os
import zipfile
import xml.etree.ElementTree as ET

folder = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES'

for fname in ['INVENTARIO.xlsx', 'INVENTARIO ACEITES.xlsx', 'FOTOS MARCAS.xlsx', 'FILTROS.xlsx', 'FILTROS DE AIRE AA.xlsx']:
    fpath = os.path.join(folder, fname)
    if not os.path.exists(fpath):
        continue
    print(f"\n=======================================================")
    print(f"FILE: {fname}")
    print(f"=======================================================")
    with zipfile.ZipFile(fpath, 'r') as z:
        # Map sheet r:id to target and name
        wb_rels_xml = z.read('xl/_rels/workbook.xml.rels')
        wb_rels_root = ET.fromstring(wb_rels_xml)
        rid_to_target = {rel.attrib['Id']: rel.attrib['Target'] for rel in wb_rels_root.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship')}
        
        wb_root = ET.fromstring(z.read('xl/workbook.xml'))
        for s in wb_root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet'):
            s_name = s.attrib['name']
            rid = s.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
            target = rid_to_target[rid]
            sheet_path = ('xl/' + target[3:]) if target.startswith('../') else ('xl/' + target if not target.startswith('xl/') else target)
            
            # Check if this sheet has drawing rels
            s_dir, s_file = os.path.split(sheet_path)
            rels_path = f"{s_dir}/_rels/{s_file}.rels"
            has_drawing = False
            img_count = 0
            if rels_path in z.namelist():
                s_rels_root = ET.fromstring(z.read(rels_path))
                for rel in s_rels_root.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                    if 'drawing' in rel.attrib['Type']:
                        has_drawing = True
                        d_target = rel.attrib['Target']
                        d_path = ('xl/' + d_target[3:]) if d_target.startswith('../') else ('xl/worksheets/' + d_target)
                        d_dir, d_file = os.path.split(d_path)
                        d_rels_path = f"{d_dir}/_rels/{d_file}.rels"
                        if d_rels_path in z.namelist():
                            d_rels_root = ET.fromstring(z.read(d_rels_path))
                            for d_rel in d_rels_root.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                                if 'image' in d_rel.attrib['Type']:
                                    img_count += 1
            print(f"  {s_name:<25} | drawing={str(has_drawing):<5} | images={img_count:>3}")
