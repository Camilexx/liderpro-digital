import json

with open('scripts/ecuador_map_data.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

# Parse all province polygons
def parse_path(path_str):
    polys = []
    current_poly = []
    tokens = path_str.replace('M', ' M ').replace('L', ' L ').replace('Z', ' Z ').split()
    i = 0
    while i < len(tokens):
        tok = tokens[i]
        if tok == 'M':
            if current_poly:
                polys.append(current_poly)
                current_poly = []
            x = float(tokens[i+1])
            y = float(tokens[i+2])
            current_poly.append((x, y))
            i += 3
        elif tok == 'L':
            x = float(tokens[i+1])
            y = float(tokens[i+2])
            current_poly.append((x, y))
            i += 3
        elif tok == 'Z':
            if current_poly:
                polys.append(current_poly)
                current_poly = []
            i += 1
        else:
            i += 1
    if current_poly:
        polys.append(current_poly)
    return polys

def point_in_poly(x, y, poly):
    n = len(poly)
    inside = False
    p1x, p1y = poly[0]
    for i in range(n + 1):
        p2x, p2y = poly[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y
    return inside

def point_in_province(x, y, prov_polys):
    return any(point_in_poly(x, y, poly) for poly in prov_polys)

prov_map = {}
for p in d['provinces']:
    prov_map[p['name']] = parse_path(p['path'])
    prov_map[p['id']] = prov_map[p['name']]

# Find northern coast of Manabi at Equator (lat 0°, y=175.3)
manabi_polys = prov_map['Manabí']
manabi_at_175 = []
for poly in manabi_polys:
    for x in range(210, 360):
        if point_in_poly(x, 175.3, poly):
            manabi_at_175.append(x)
print(f"Manabi X range at Y=175.3 (Equator): {min(manabi_at_175) if manabi_at_175 else 'None'} to {max(manabi_at_175) if manabi_at_175 else 'None'}")

# Find Manta (westernmost cape of Manabi around Y=278)
manta_xs = []
for poly in manabi_polys:
    for x in range(210, 260):
        if point_in_poly(x, 278, poly):
            manta_xs.append(x)
print(f"Manta X range at Y=278: {min(manta_xs) if manta_xs else 'None'} to {max(manta_xs) if manta_xs else 'None'}")

# Find Salinas (westernmost tip of Santa Elena around Y=395)
se_polys = prov_map['Santa Elena']
se_at_395 = []
for poly in se_polys:
    for x in range(200, 260):
        if point_in_poly(x, 395, poly):
            se_at_395.append(x)
print(f"Santa Elena X range at Y=395 (Salinas): {min(se_at_395) if se_at_395 else 'None'} to {max(se_at_395) if se_at_395 else 'None'}")
