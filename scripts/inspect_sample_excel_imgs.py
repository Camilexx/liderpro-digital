import zipfile
import xml.etree.ElementTree as ET
import os
from PIL import Image
import io

xlsx_path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.user_uploaded\media_1792380131191_09084a0a.xlsx'

with zipfile.ZipFile(xlsx_path, 'r') as z:
    for img_name in ['xl/media/image210.jpeg', 'xl/media/image211.jpeg', 
                     'xl/media/image323.jpeg', 'xl/media/image324.jpeg',
                     'xl/media/image361.jpeg', 'xl/media/image362.jpeg']:
        if img_name in z.namelist():
            data = z.read(img_name)
            im = Image.open(io.BytesIO(data))
            print(f"{img_name:<26} | size={str(im.size):<12} | {len(data):>7} B | format={im.format}")
