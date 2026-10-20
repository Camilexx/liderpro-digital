import openpyxl

excel_path = r"c:\Users\PC\Desktop\PRODUCTOS E IMAGENES\INVENTARIO FOTOS.xlsx"
wb = openpyxl.load_workbook(excel_path, data_only=True)

print("=== CHECKING ALL SHEETS ROW BY ROW ===")
for sheetname in wb.sheetnames:
    if sheetname == "Sheet1":
        continue
    ws = wb[sheetname]
    rows = list(ws.iter_rows(values_only=True))
    non_empty_rows = [r for r in rows if any(x is not None for x in r)]
    print(f"\n--- Sheet: {sheetname} ({len(non_empty_rows)} items) ---")
    # Show first 3 and last 2 items
    for r in non_empty_rows[:2]:
        print("  Sample start:", [c for c in r if c is not None][:3])
    for r in non_empty_rows[-2:]:
        print("  Sample end:  ", [c for c in r if c is not None][:3])
