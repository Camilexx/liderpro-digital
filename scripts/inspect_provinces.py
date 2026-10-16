import json

with open('scripts/ecuador_map_data.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

print("=== PROVINCE SVG BOUNDING BOXES & CENTROIDS ===")
prov_data = {}
for p in d['provinces']:
    parts = p['path'].replace('M', ' ').replace('L', ' ').replace('Z', ' ').split()
    nums = [float(x) for x in parts if x.strip()]
    xs = nums[0::2]
    ys = nums[1::2]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    # Area-weighted centroid or simple average
    cx, cy = sum(xs) / len(xs), sum(ys) / len(ys)
    mid_x, mid_y = (min_x + max_x) / 2, (min_y + max_y) / 2
    prov_data[p['name']] = {
        'id': p['id'],
        'min_x': min_x, 'max_x': max_x,
        'min_y': min_y, 'max_y': max_y,
        'cx': round(cx, 1), 'cy': round(cy, 1),
        'mid_x': round(mid_x, 1), 'mid_y': round(mid_y, 1),
    }
    print(f"{p['name']:<30}: X [{min_x:5.1f}, {max_x:5.1f}]  Y [{min_y:5.1f}, {max_y:5.1f}]  Center: ({cx:5.1f}, {cy:5.1f})")

print("\n=== CURRENT CITY NODE POSITIONS VS THEIR PROVINCES ===")
for node in d['nodes']:
    name = node['name']
    prov_name = node['province']
    nx, ny = node['x'], node['y']
    # match province
    matched_p = None
    for pname, pinfo in prov_data.items():
        if pname.lower() in prov_name.lower() or prov_name.lower() in pname.lower():
            matched_p = (pname, pinfo)
            break
        if "sto. domingo" in prov_name.lower() and "santo domingo" in pname.lower():
            matched_p = (pname, pinfo)
            break
    if matched_p:
        pname, pinfo = matched_p
        inside_x = pinfo['min_x'] <= nx <= pinfo['max_x']
        inside_y = pinfo['min_y'] <= ny <= pinfo['max_y']
        status = "INSIDE" if (inside_x and inside_y) else "OUTSIDE!"
        print(f"{name:<15} ({prov_name:<15}): Node at ({nx:5.1f}, {ny:5.1f}) | Prov X[{pinfo['min_x']:5.1f}, {pinfo['max_x']:5.1f}] Y[{pinfo['min_y']:5.1f}, {pinfo['max_y']:5.1f}] -> {status}")
    else:
        print(f"{name:<15} ({prov_name:<15}): Node at ({nx:5.1f}, {ny:5.1f}) | (No province match)")
