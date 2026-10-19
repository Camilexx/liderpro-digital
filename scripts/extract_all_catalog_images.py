import json
import zipfile
import os
import re
from PIL import Image, ImageOps
import io
import numpy as np
import scipy.ndimage as ndi

xlsx_path = r'c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\FILTROS.xlsx'
output_dir = r'public/images/products'
os.makedirs(output_dir, exist_ok=True)

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    full_data = json.load(f)

sheet_rows = full_data['sheet_rows']
inv_items = full_data['inventory_items']

print("Ready to process images from FILTROS.xlsx...")
