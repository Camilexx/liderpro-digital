import os
import zipfile
import xml.etree.ElementTree as ET

folder = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES'

for fname in os.listdir(folder):
    if not fname.endswith('.xlsx'):
        continue
    fpath = os.path.join(folder, fname)
    size_mb = os.path.getsize(fpath) / (1024 * 1024)
    print(f"\n=======================================================")
    print(f"FILE: {fname} ({size_mb:.2f} MB)")
    print(f"=======================================================")
    try:
        with zipfile.ZipFile(fpath, 'r') as z:
            media_files = [n for n in z.namelist() if n.startswith('xl/media/')]
            print(f"Total media files (images): {len(media_files)}")
            
            # Read workbook sheets
            if 'xl/workbook.xml' in z.namelist():
                wb_xml = z.read('xl/workbook.xml')
                root = ET.fromstring(wb_xml)
                sheets = []
                for s in root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet'):
                    sheets.append(s.attrib.get('name'))
                print(f"Sheets ({len(sheets)}): {sheets}")
    except Exception as e:
        print(f"Error reading {fname}: {e}")
