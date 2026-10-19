import zipfile
import xml.etree.ElementTree as ET

xlsx_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.user_uploaded\media_1792380131191_09084a0a.xlsx'

with zipfile.ZipFile(xlsx_path, 'r') as z:
    media_files = [n for n in z.namelist() if n.startswith('xl/media/')]
    print(f"Total media files inside Excel: {len(media_files)}")
    
    wb_xml = z.read('xl/workbook.xml')
    root = ET.fromstring(wb_xml)
    print("\n--- WORKBOOK SHEETS IN NEW EXCEL ---")
    for sheet in root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet'):
        print(f"Sheet ID: {sheet.attrib.get('sheetId')}, Name: {sheet.attrib.get('name')}, r:id: {sheet.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')}")
