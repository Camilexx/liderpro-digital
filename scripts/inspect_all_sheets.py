import zipfile, openpyxl

excel_path = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO FOTOS.xlsx"
wb = openpyxl.load_workbook(excel_path, data_only=True)

print("Sheet summary:")
for sheetname in wb.sheetnames:
    ws = wb[sheetname]
    rows = list(ws.iter_rows(values_only=True))
    non_empty = [r for r in rows if any(x is not None and str(x).strip() != '' for x in r)]
    header = rows[0] if rows else ()
    print(f"{sheetname:22} | Rows: {len(rows):3} (non-empty: {len(non_empty):3}) | Cols: {ws.max_column:2} | Row 1: {header[:4]}")
