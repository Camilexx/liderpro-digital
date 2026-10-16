import json

with open('scripts/ecuador_map_data.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

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

prov_map = {}
for p in d['provinces']:
    prov_map[p['name']] = parse_path(p['path'])

CANDIDATES = [
    ("Pedernales", "Manabí", 298.0, 175.3),
    ("Manta", "Manabí", 226.0, 276.0),
    ("Portoviejo", "Manabí", 254.0, 284.0),
    ("Santo Domingo", "Santo Domingo de los Tsáchilas", 378.0, 214.0),
    ("Quito", "Pichincha", 435.0, 198.0),
    ("Esmeraldas", "Esmeraldas", 338.0, 92.0),
    ("Quevedo", "Los Ríos", 345.0, 282.0),
    ("Babahoyo", "Los Ríos", 346.0, 366.0),
    ("Guayaquil", "Guayas", 308.0, 392.0),
    ("Salinas", "Santa Elena", 226.0, 396.0),
    ("Machala", "El Oro", 298.0, 512.0),
    ("Latacunga", "Cotopaxi", 412.0, 264.0),
    ("Ambato", "Tungurahua", 442.0, 305.0),
    ("Riobamba", "Chimborazo", 428.0, 368.0),
    ("Cuenca", "Azuay", 392.0, 476.0),
    ("Loja", "Loja", 338.0, 582.0),
    ("Ibarra", "Imbabura", 460.0, 142.0),
    ("Tulcán", "Carchi", 498.0, 104.0),
    ("Lago Agrio", "Sucumbíos", 605.0, 172.0),
    ("El Coca", "Orellana", 602.0, 236.0),
    ("Tena", "Napo", 512.0, 276.0),
    ("Puyo", "Pastaza", 518.0, 332.0),
    ("Macas", "Morona Santiago", 468.0, 422.0),
    ("Zamora", "Zamora Chinchipe", 402.0, 592.0),
    ("Galápagos", "Galápagos", 105.0, 135.0),
]

all_ok = True
for city, prov, x, y in CANDIDATES:
    polys = prov_map[prov]
    inside = any(point_in_poly(x, y, p) for p in polys)
    status = "OK (INSIDE)" if inside else "FAIL (OUTSIDE)"
    if not inside: all_ok = False
    print(f"{city:<15} in {prov:<30}: ({x:5.1f}, {y:5.1f}) -> {status}")

print(f"\nALL 25 CITIES INSIDE THEIR PROVINCES: {all_ok}")
