import urllib.request
import json
import pyproj

# Fetch official high-precision GeoJSON from Natural Earth / Highcharts
url = 'https://raw.githubusercontent.com/zpio/Mapa-Ecuador/master/ec-all.geo.json'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    geo_data = json.loads(resp.read().decode('utf-8'))

# UTM Zone 17S projection for mainland Ecuador
proj17 = pyproj.Proj('+proj=utm +zone=17 +south +datum=WGS84 +units=m +no_defs')

scale = 0.000981919472868
jsonres = 15.5
jsonmarginX = -999.0
jsonmarginY = 9851.0
xoffset = 498553.31656
yoffset = 10158651.1115

def geo_to_raw(lon, lat):
    e, n = proj17(lon, lat)
    x = (e - xoffset) * scale * jsonres - jsonmarginX
    y = (n - yoffset) * scale * jsonres + jsonmarginY
    return x, y

# Bounding box of all features
# Raw coordinates range: X from -922 to 11605, Y from -999 to 9851
# Target SVG viewBox: 0 0 960 720
# We want clean margins around the map
SVG_WIDTH = 960
SVG_HEIGHT = 720
PADDING_X = 40
PADDING_Y = 40

RAW_MIN_X = -922
RAW_MAX_X = 11605
RAW_MIN_Y = -999
RAW_MAX_Y = 9851

RAW_W = RAW_MAX_X - RAW_MIN_X
RAW_H = RAW_MAX_Y - RAW_MIN_Y

AVAILABLE_W = SVG_WIDTH - 2 * PADDING_X
AVAILABLE_H = SVG_HEIGHT - 2 * PADDING_Y

FIT_SCALE = min(AVAILABLE_W / RAW_W, AVAILABLE_H / RAW_H)

def raw_to_svg(rx, ry):
    # In raw coordinates, rx goes right, ry goes UP (North).
    # In SVG, y goes DOWN.
    sx = PADDING_X + (rx - RAW_MIN_X) * FIT_SCALE
    sy = PADDING_Y + (RAW_MAX_Y - ry) * FIT_SCALE
    return round(sx, 1), round(sy, 1)

def transform_polygon(coords):
    path_parts = []
    for ring in coords:
        if not ring: continue
        pts = [raw_to_svg(pt[0], pt[1]) for pt in ring]
        ring_str = f"M {pts[0][0]} {pts[0][1]} " + " ".join(f"L {p[0]} {p[1]}" for p in pts[1:]) + " Z"
        path_parts.append(ring_str)
    return " ".join(path_parts)

def transform_geometry(geom):
    gtype = geom.get('type')
    coords = geom.get('coordinates', [])
    if gtype == 'Polygon':
        return transform_polygon(coords)
    elif gtype == 'MultiPolygon':
        return " ".join(transform_polygon(poly) for poly in coords)
    return ""

# Province metadata & region mapping
REGION_MAP = {
    # COSTA
    'Esmeraldas': 'costa',
    'Manabi': 'costa',
    'Santa Elena': 'costa',
    'Guayas': 'costa',
    'Los Rios': 'costa',
    'El Oro': 'costa',
    'Santo Domingo De Los Tsachilas': 'costa',
    
    # SIERRA
    'Carchi': 'sierra',
    'Imbabura': 'sierra',
    'Pichincha': 'sierra',
    'Cotopaxi': 'sierra',
    'Tungurahua': 'sierra',
    'Bolivar': 'sierra',
    'Chimborazo': 'sierra',
    'Caar': 'sierra',
    'Cañar': 'sierra',
    'Azuay': 'sierra',
    'Loja': 'sierra',
    
    # ORIENTE
    'Sucumbios': 'oriente',
    'Napo': 'oriente',
    'Orellana': 'oriente',
    'Pastaza': 'oriente',
    'Morona Santiago': 'oriente',
    'Zamora Chinchipe': 'oriente',
    
    # INSULAR
    'Galapagos': 'insular'
}

PROVINCE_DISPLAY_NAMES = {
    'Manabi': 'Manabí',
    'Los Rios': 'Los Ríos',
    'Caar': 'Cañar',
    'Santo Domingo De Los Tsachilas': 'Santo Domingo de los Tsáchilas',
    'Sucumbios': 'Sucumbíos',
    'Galapagos': 'Galápagos',
}

provinces = []
for f in geo_data.get('features', []):
    props = f.get('properties', {})
    name = props.get('name')
    if not name: continue
    
    d_path = transform_geometry(f.get('geometry', {}))
    clean_name = PROVINCE_DISPLAY_NAMES.get(name, name)
    region = REGION_MAP.get(name, 'costa')
    
    provinces.append({
        'id': props.get('hc-key', name.lower().replace(' ', '-')),
        'rawName': name,
        'name': clean_name,
        'region': region,
        'path': d_path
    })

print(f"Processed {len(provinces)} provinces successfully.")

# Target destination cities with exact GPS coordinates
CITIES = [
    # HUB
    {"id": "pedernales", "name": "Pedernales", "province": "Manabí", "region": "costa", "lon": -80.0524, "lat": 0.0718, "transitTime": "24h", "transportType": "Bodega Matriz y Centro de Despacho", "popularProducts": "Acopio y despacho nacional mayorista y minorista", "isHub": True},
    
    # COSTA
    {"id": "quito", "name": "Quito", "province": "Pichincha", "region": "sierra", "lon": -78.4678, "lat": -0.1807, "transitTime": "24h", "transportType": "Courier & Encomienda Directa", "popularProducts": "Lubricantes sintéticos Mannol/Motul, baterías Bosch, filtros"},
    {"id": "santo-domingo", "name": "Santo Domingo", "province": "Sto. Domingo", "region": "costa", "lon": -79.1754, "lat": -0.2530, "transitTime": "24h", "transportType": "Encomienda Interprovincial Directa", "popularProducts": "Aceites diésel 15W40, baterías pesadas, filtros"},
    {"id": "manta", "name": "Manta", "province": "Manabí", "region": "costa", "lon": -80.7128, "lat": -0.9621, "transitTime": "24h", "transportType": "Transporte Intercantonal Directo", "popularProducts": "Aceites marinos, canecas 20L, baterías"},
    {"id": "portoviejo", "name": "Portoviejo", "province": "Manabí", "region": "costa", "lon": -80.4544, "lat": -1.0544, "transitTime": "24h", "transportType": "Transporte Intercantonal Directo", "popularProducts": "Lubricantes 20W50, filtros de aceite y aire"},
    {"id": "esmeraldas", "name": "Esmeraldas", "province": "Esmeraldas", "region": "costa", "lon": -79.6517, "lat": 0.9682, "transitTime": "24h", "transportType": "Encomienda Directa Costa Norte", "popularProducts": "Lubricantes de motor, baterías, refrigerantes"},
    {"id": "guayaquil", "name": "Guayaquil", "province": "Guayas", "region": "costa", "lon": -79.8891, "lat": -2.1894, "transitTime": "24h", "transportType": "Courier Express & Encomienda", "popularProducts": "Canecas de aceite, baterías selladas, aditivos"},
    {"id": "quevedo", "name": "Quevedo", "province": "Los Ríos", "region": "costa", "lon": -79.4635, "lat": -1.0286, "transitTime": "24h", "transportType": "Encomienda Directa Central", "popularProducts": "Aceites agrícolas, 15W40, baterías heavy-duty"},
    {"id": "babahoyo", "name": "Babahoyo", "province": "Los Ríos", "region": "costa", "lon": -79.5344, "lat": -1.8022, "transitTime": "24h", "transportType": "Encomienda Interprovincial", "popularProducts": "Lubricantes de camión y camioneta, baterías"},
    {"id": "salinas", "name": "Salinas", "province": "Santa Elena", "region": "costa", "lon": -80.9585, "lat": -2.2234, "transitTime": "24-48h", "transportType": "Courier & Encomienda", "popularProducts": "Aceites sintéticos, filtros y refrigerantes"},
    {"id": "machala", "name": "Machala", "province": "El Oro", "region": "costa", "lon": -79.9554, "lat": -3.2581, "transitTime": "24-48h", "transportType": "Transporte de Carga Pesada", "popularProducts": "Lubricantes camaroneros, canecas, baterías Grupo 31"},
    
    # SIERRA
    {"id": "latacunga", "name": "Latacunga", "province": "Cotopaxi", "region": "sierra", "lon": -78.6155, "lat": -0.9347, "transitTime": "24-48h", "transportType": "Encomienda Directa Sierra", "popularProducts": "Aceites para altura, refrigerantes 50/50"},
    {"id": "ambato", "name": "Ambato", "province": "Tungurahua", "region": "sierra", "lon": -78.6168, "lat": -1.2491, "transitTime": "24-48h", "transportType": "Encomienda Interprovincial", "popularProducts": "Filtros de aceite/aire, baterías, lubricantes"},
    {"id": "riobamba", "name": "Riobamba", "province": "Chimborazo", "region": "sierra", "lon": -78.6546, "lat": -1.6635, "transitTime": "24-48h", "transportType": "Encomienda Directa", "popularProducts": "Aceites pesados, baterías Ecuador 24/27"},
    {"id": "cuenca", "name": "Cuenca", "province": "Azuay", "region": "sierra", "lon": -79.0059, "lat": -2.9001, "transitTime": "24-48h", "transportType": "Courier Express & Encomienda", "popularProducts": "Mannol sintético, baterías Bosch, bujías NGK"},
    {"id": "loja", "name": "Loja", "province": "Loja", "region": "sierra", "lon": -79.2042, "lat": -3.9931, "transitTime": "48h", "transportType": "Transporte Interprovincial Sur", "popularProducts": "Lubricantes multigrado, baterías, filtros"},
    {"id": "ibarra", "name": "Ibarra", "province": "Imbabura", "region": "sierra", "lon": -78.1223, "lat": 0.3517, "transitTime": "24-48h", "transportType": "Encomienda Directa Norte", "popularProducts": "Aceites de motor, baterías, aditivos"},
    {"id": "tulcan", "name": "Tulcán", "province": "Carchi", "region": "sierra", "lon": -77.7173, "lat": 0.8122, "transitTime": "48h", "transportType": "Encomienda Interprovincial Frontera", "popularProducts": "Lubricantes pesados, anticongelantes, filtros"},
    
    # ORIENTE
    {"id": "lago-agrio", "name": "Lago Agrio", "province": "Sucumbíos", "region": "oriente", "lon": -76.8828, "lat": 0.0847, "transitTime": "48h", "transportType": "Transporte Carga Nororiente", "popularProducts": "Aceites diésel CI-4, canecas, baterías pesadas"},
    {"id": "el-coca", "name": "El Coca", "province": "Orellana", "region": "oriente", "lon": -76.9878, "lat": -0.4665, "transitTime": "48h", "transportType": "Transporte de Carga Petrolera", "popularProducts": "Lubricantes industriales y petroleros, filtros"},
    {"id": "puyo", "name": "Puyo", "province": "Pastaza", "region": "oriente", "lon": -77.9984, "lat": -1.4837, "transitTime": "48h", "transportType": "Encomienda Interprovincial", "popularProducts": "Aceites 4T moto, lubricantes pesados, baterías"},
    {"id": "tena", "name": "Tena", "province": "Napo", "region": "oriente", "lon": -77.8129, "lat": -0.9938, "transitTime": "48h", "transportType": "Encomienda Directa", "popularProducts": "Lubricantes de trabajo y filtros de aire"},
    {"id": "macas", "name": "Macas", "province": "Morona Santiago", "region": "oriente", "lon": -78.1114, "lat": -2.3087, "transitTime": "48h", "transportType": "Transporte Interprovincial", "popularProducts": "Aceites de motor, baterías y filtros"},
    {"id": "zamora", "name": "Zamora", "province": "Zamora Chinchipe", "region": "oriente", "lon": -78.9564, "lat": -4.0692, "transitTime": "48h", "transportType": "Transporte Suroriental", "popularProducts": "Lubricantes para maquinaria y baterías"},
    
    # INSULAR (Galápagos center in the inset)
    {"id": "galapagos", "name": "Galápagos", "province": "Galápagos", "region": "insular", "lon": -89.60, "lat": -0.90, "transitTime": "48h", "transportType": "Courier Aéreo / Carga Autorizada", "popularProducts": "Filtros livianos, bujías y aditivos permitidos", "customRaw": (150, 8500)}
]

nodes = []
for c in CITIES:
    if "customRaw" in c:
        rx, ry = c["customRaw"]
    else:
        rx, ry = geo_to_raw(c["lon"], c["lat"])
    sx, sy = raw_to_svg(rx, ry)
    nodes.append({
        **c,
        "x": sx,
        "y": sy
    })

# Inset box for Galapagos
# In raw coords: hitZone [[[2455, 9999], [2455, 8025], [1375, 6315], [-999, 6315], [-999, 9999], [2455, 9999]]]
# Let's create an institutional rectangular inset box
g_top_left = raw_to_svg(-999, 9999)
g_bottom_right = raw_to_svg(2455, 6315)

out_data = {
    "svgWidth": SVG_WIDTH,
    "svgHeight": SVG_HEIGHT,
    "galapagosInset": {
        "x": g_top_left[0],
        "y": g_top_left[1],
        "width": round(g_bottom_right[0] - g_top_left[0], 1),
        "height": round(g_bottom_right[1] - g_top_left[1], 1)
    },
    "provinces": provinces,
    "nodes": nodes
}

with open("scripts/ecuador_map_data.json", "w", encoding="utf-8") as f:
    json.dump(out_data, f, ensure_ascii=False, indent=2)

print(f"Saved ecuador_map_data.json with {len(provinces)} provinces and {len(nodes)} city nodes.")
