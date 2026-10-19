import zipfile
import xml.etree.ElementTree as ET

xlsx_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.user_uploaded\media_1792380131191_09084a0a.xlsx'

with zipfile.ZipFile(xlsx_path, 'r') as z:
    dr_root = ET.fromstring(z.read('xl/drawings/drawing6.xml'))
    rels_root = ET.fromstring(z.read('xl/drawings/_rels/drawing6.xml.rels'))
    rid_map = {r.attrib['Id']: r.attrib['Target'] for r in rels_root.iter('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship')}
    
    for anchor in dr_root.iter():
        if anchor.tag.endswith('twoCellAnchor') or anchor.tag.endswith('oneCellAnchor'):
            from_elem = anchor.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}from')
            blip = anchor.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
            if from_elem is not None and blip is not None:
                r_num = int(from_elem.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}row').text) + 1
                c_num = int(from_elem.find('{http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing}col').text)
                emb = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                if r_num in [8, 9, 10, 17, 18, 19]:
                    print(f"Row {r_num}, Col {c_num} -> {emb} ({rid_map.get(emb)})")
