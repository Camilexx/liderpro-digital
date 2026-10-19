import zipfile
import os

xlsx_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.user_uploaded\media_1792149283574_3029267d.xlsx'

if os.path.exists(xlsx_path):
    print("Found xlsx:", xlsx_path)
    with zipfile.ZipFile(xlsx_path, 'r') as z:
        media_files = [n for n in z.namelist() if n.startswith('xl/media/')]
        print(f"Total media files inside Excel: {len(media_files)}")
        sheet_files = [n for n in z.namelist() if n.startswith('xl/worksheets/')]
        print("Sheets:", sheet_files)
        # Check first 10 media files
        for m in media_files[:10]:
            print("  ", m, z.getinfo(m).file_size)
else:
    print("XLSX not found at path:", xlsx_path)
