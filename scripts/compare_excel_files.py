import zipfile
import xml.etree.ElementTree as ET
import os

EXCEL_DIR = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES"

for fname in ["FILTROS.xlsx", "FILTROS DE AIRE AA.xlsx", "FOTOS MARCAS.xlsx", "INVENTARIO ACEITES.xlsx"]:
    fpath = os.path.join(EXCEL_DIR, fname)
    with zipfile.ZipFile(fpath, "r") as z:
        wb_root = ET.fromstring(z.read("xl/workbook.xml"))
        ns_wb = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        sheets = [s.attrib["name"] for s in wb_root.findall(".//s:sheet", ns_wb)]
        media_count = len([x for x in z.namelist() if x.startswith("xl/media/")])
        print(f"{fname}: {len(sheets)} sheets, {media_count} media files. Sheets: {sheets}")
