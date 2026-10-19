import zipfile
import xml.etree.ElementTree as ET
import re

xlsx_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.user_uploaded\media_1792380131191_09084a0a.xlsx'

with zipfile.ZipFile(xlsx_path, 'r') as z:
    # Read shared strings
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        sst_xml = z.read('xl/sharedStrings.xml')
        sst_root = ET.fromstring(sst_xml)
        for si in sst_root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
            # concatenate text inside si
            t_elems = si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
            shared_strings.append("".join([t.text or "" for t in t_elems]))
    print(f"Total shared strings: {len(shared_strings)}")
    
    # Read workbook relationships to map r:id to sheet xml filename
    wb_rels_xml = z.read('xl/_rels/workbook.xml.rels')
    wb_rels_root = ET.fromstring(wb_rels_xml)
    rid_to_target = {}
    for rel in wb_rels_root.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
        rid_to_target[rel.attrib['Id']] = rel.attrib['Target']

    # Read workbook.xml to get sheet names
    wb_xml = z.read('xl/workbook.xml')
    wb_root = ET.fromstring(wb_xml)
    sheet_info = {}
    for sheet in wb_root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet'):
        s_name = sheet.attrib['name']
        rid = sheet.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
        target = rid_to_target[rid]
        # target is like "worksheets/sheet5.xml"
        sheet_path = 'xl/' + target if not target.startswith('xl/') else target
        sheet_info[s_name] = sheet_path

    print("\nTarget filter sheets:")
    for name in ['FILTROS ACEITE', 'FILTROS CABINA', 'FILTROS COMBUSTIBLE', 'FILTROS AIRE']:
        print(f"  {name}: {sheet_info.get(name)}")
