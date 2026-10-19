import json

with open('scripts/full_audit_data.json', encoding='utf-8') as f:
    data = json.load(f)

for sname in ['FILTROS AIRE', 'FILTROS ACEITE', 'FILTROS CABINA', 'FILTROS COMBUSTIBLE']:
    rows = data['sheet_rows'][sname]
    print(f"\n*** {sname} (first 8 rows) ***")
    for r in rows[:8]:
        imgs = [f"Col{img['col']}:{img['media_name']}" for img in r['images']]
        print(f"  Row {r['row_num']:2d}: C1='{r['col1']}' | C2='{r['col2'][:55]}' | {len(r['images'])} imgs: {imgs}")
