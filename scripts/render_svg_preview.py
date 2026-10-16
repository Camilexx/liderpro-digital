import json

with open("scripts/ecuador_map_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

svg_w = data["svgWidth"]
svg_h = data["svgHeight"]
inset = data["galapagosInset"]

CALIBRATED_NODES = [
    {"id": "pedernales", "name": "Pedernales", "province": "Manabí", "region": "costa", "x": 298.0, "y": 175.3, "labelDx": -75, "labelDy": -40, "labelAnchor": "start", "transitTime": "24h", "transportType": "Bodega Matriz y Centro de Despacho", "popularProducts": "Acopio y despacho nacional mayorista y minorista", "isHub": True},
    {"id": "quito", "name": "Quito", "province": "Pichincha", "region": "sierra", "x": 435.0, "y": 198.0, "labelDx": 10, "labelDy": -4, "labelAnchor": "start", "transitTime": "24h", "transportType": "Courier & Encomienda Directa", "popularProducts": "Lubricantes sintéticos Mannol/Motul, baterías Bosch, filtros"},
    {"id": "santo-domingo", "name": "Santo Domingo", "province": "Sto. Domingo", "region": "costa", "x": 378.0, "y": 214.0, "labelDx": -10, "labelDy": -6, "labelAnchor": "end", "transitTime": "24h", "transportType": "Encomienda Interprovincial Directa", "popularProducts": "Aceites diésel 15W40, baterías pesadas, filtros"},
    {"id": "manta", "name": "Manta", "province": "Manabí", "region": "costa", "x": 226.0, "y": 276.0, "labelDx": -10, "labelDy": -2, "labelAnchor": "end", "transitTime": "24h", "transportType": "Transporte Intercantonal Directo", "popularProducts": "Aceites marinos, canecas 20L, baterías"},
    {"id": "portoviejo", "name": "Portoviejo", "province": "Manabí", "region": "costa", "x": 254.0, "y": 284.0, "labelDx": 10, "labelDy": 2, "labelAnchor": "start", "transitTime": "24h", "transportType": "Transporte Intercantonal Directo", "popularProducts": "Lubricantes 20W50, filtros de aceite y aire"},
    {"id": "esmeraldas", "name": "Esmeraldas", "province": "Esmeraldas", "region": "costa", "x": 338.0, "y": 92.0, "labelDx": 10, "labelDy": -2, "labelAnchor": "start", "transitTime": "24h", "transportType": "Encomienda Directa Costa Norte", "popularProducts": "Lubricantes de motor, baterías, refrigerantes"},
    {"id": "guayaquil", "name": "Guayaquil", "province": "Guayas", "region": "costa", "x": 308.0, "y": 392.0, "labelDx": 10, "labelDy": 2, "labelAnchor": "start", "transitTime": "24h", "transportType": "Courier Express & Encomienda", "popularProducts": "Canecas de aceite, baterías selladas, aditivos"},
    {"id": "quevedo", "name": "Quevedo", "province": "Los Ríos", "region": "costa", "x": 345.0, "y": 282.0, "labelDx": -10, "labelDy": 0, "labelAnchor": "end", "transitTime": "24h", "transportType": "Encomienda Directa Central", "popularProducts": "Aceites agrícolas, 15W40, baterías heavy-duty"},
    {"id": "babahoyo", "name": "Babahoyo", "province": "Los Ríos", "region": "costa", "x": 346.0, "y": 366.0, "labelDx": -10, "labelDy": 0, "labelAnchor": "end", "transitTime": "24h", "transportType": "Encomienda Interprovincial", "popularProducts": "Lubricantes de camión y camioneta, baterías"},
    {"id": "salinas", "name": "Salinas", "province": "Santa Elena", "region": "costa", "x": 226.0, "y": 396.0, "labelDx": -10, "labelDy": -2, "labelAnchor": "end", "transitTime": "24-48h", "transportType": "Courier & Encomienda", "popularProducts": "Aceites sintéticos, filtros y refrigerantes"},
    {"id": "machala", "name": "Machala", "province": "El Oro", "region": "costa", "x": 298.0, "y": 512.0, "labelDx": -10, "labelDy": 2, "labelAnchor": "end", "transitTime": "24-48h", "transportType": "Transporte de Carga Pesada", "popularProducts": "Lubricantes camaroneros, canecas, baterías Grupo 31"},
    {"id": "latacunga", "name": "Latacunga", "province": "Cotopaxi", "region": "sierra", "x": 412.0, "y": 264.0, "labelDx": 10, "labelDy": -2, "labelAnchor": "start", "transitTime": "24-48h", "transportType": "Encomienda Directa Sierra", "popularProducts": "Aceites para altura, refrigerantes 50/50"},
    {"id": "ambato", "name": "Ambato", "province": "Tungurahua", "region": "sierra", "x": 442.0, "y": 305.0, "labelDx": 10, "labelDy": 2, "labelAnchor": "start", "transitTime": "24-48h", "transportType": "Encomienda Interprovincial", "popularProducts": "Filtros de aceite/aire, baterías, lubricantes"},
    {"id": "riobamba", "name": "Riobamba", "province": "Chimborazo", "region": "sierra", "x": 428.0, "y": 368.0, "labelDx": 10, "labelDy": 2, "labelAnchor": "start", "transitTime": "24-48h", "transportType": "Encomienda Directa", "popularProducts": "Aceites pesados, baterías Ecuador 24/27"},
    {"id": "cuenca", "name": "Cuenca", "province": "Azuay", "region": "sierra", "x": 392.0, "y": 476.0, "labelDx": 10, "labelDy": 2, "labelAnchor": "start", "transitTime": "24-48h", "transportType": "Courier Express & Encomienda", "popularProducts": "Mannol sintético, baterías Bosch, bujías NGK"},
    {"id": "loja", "name": "Loja", "province": "Loja", "region": "sierra", "x": 338.0, "y": 582.0, "labelDx": -10, "labelDy": 0, "labelAnchor": "end", "transitTime": "48h", "transportType": "Transporte Interprovincial Sur", "popularProducts": "Lubricantes multigrado, baterías, filtros"},
    {"id": "ibarra", "name": "Ibarra", "province": "Imbabura", "region": "sierra", "x": 460.0, "y": 142.0, "labelDx": 10, "labelDy": -2, "labelAnchor": "start", "transitTime": "24-48h", "transportType": "Encomienda Directa Norte", "popularProducts": "Aceites de motor, baterías, aditivos"},
    {"id": "tulcan", "name": "Tulcán", "province": "Carchi", "region": "sierra", "x": 498.0, "y": 104.0, "labelDx": 10, "labelDy": -2, "labelAnchor": "start", "transitTime": "48h", "transportType": "Encomienda Interprovincial Frontera", "popularProducts": "Lubricantes pesados, anticongelantes, filtros"},
    {"id": "lago-agrio", "name": "Lago Agrio", "province": "Sucumbíos", "region": "oriente", "x": 605.0, "y": 172.0, "labelDx": 10, "labelDy": -2, "labelAnchor": "start", "transitTime": "48h", "transportType": "Transporte Carga Nororiente", "popularProducts": "Aceites diésel CI-4, canecas, baterías pesadas"},
    {"id": "el-coca", "name": "El Coca", "province": "Orellana", "region": "oriente", "x": 602.0, "y": 236.0, "labelDx": 10, "labelDy": 2, "labelAnchor": "start", "transitTime": "48h", "transportType": "Transporte de Carga Petrolera", "popularProducts": "Lubricantes industriales y petroleros, filtros"},
    {"id": "puyo", "name": "Puyo", "province": "Pastaza", "region": "oriente", "x": 518.0, "y": 332.0, "labelDx": 10, "labelDy": 2, "labelAnchor": "start", "transitTime": "48h", "transportType": "Encomienda Interprovincial", "popularProducts": "Aceites 4T moto, lubricantes pesados, baterías"},
    {"id": "tena", "name": "Tena", "province": "Napo", "region": "oriente", "x": 512.0, "y": 276.0, "labelDx": 10, "labelDy": 0, "labelAnchor": "start", "transitTime": "48h", "transportType": "Encomienda Directa", "popularProducts": "Lubricantes de trabajo y filtros de aire"},
    {"id": "macas", "name": "Macas", "province": "Morona Santiago", "region": "oriente", "x": 468.0, "y": 422.0, "labelDx": 10, "labelDy": 2, "labelAnchor": "start", "transitTime": "48h", "transportType": "Transporte Interprovincial", "popularProducts": "Aceites de motor, baterías y filtros"},
    {"id": "zamora", "name": "Zamora", "province": "Zamora Chinchipe", "region": "oriente", "x": 402.0, "y": 592.0, "labelDx": 10, "labelDy": 2, "labelAnchor": "start", "transitTime": "48h", "transportType": "Transporte Suroriental", "popularProducts": "Lubricantes para maquinaria y baterías"},
    {"id": "galapagos", "name": "Galápagos", "province": "Galápagos", "region": "insular", "x": 105.0, "y": 135.0, "labelDx": 0, "labelDy": 18, "labelAnchor": "middle", "transitTime": "48h", "transportType": "Courier Aéreo / Carga Autorizada", "popularProducts": "Filtros livianos, bujías y aditivos permitidos"}
]

REGION_COLORS = {
    "costa": {"fill": "#0F3870", "stroke": "#38BDF8"},
    "sierra": {"fill": "#78350F", "stroke": "#F59E0B"},
    "oriente": {"fill": "#064E3B", "stroke": "#10B981"},
    "insular": {"fill": "#0E7490", "stroke": "#22D3EE"}
}

svg_lines = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svg_w} {svg_h}" width="{svg_w}" height="{svg_h}" style="background-color: #04122E;">',
    '  <!-- Background grid line for Equator -->',
    '  <line x1="20" y1="175.3" x2="940" y2="175.3" stroke="#FFC500" stroke-width="1" stroke-dasharray="6 4" opacity="0.4" />',
    '  <text x="750" y="168" fill="#FFC500" font-size="11" font-family="sans-serif" font-weight="bold" opacity="0.8">LÍNEA EQUATORIAL 0°00\'00"</text>',
    '  <!-- Inset Box for Galapagos -->',
    f'  <rect x="{inset["x"]}" y="{inset["y"]}" width="{inset["width"]}" height="{inset["height"]}" rx="12" fill="#061B40" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.7"/>',
    f'  <text x="{inset["x"] + 12}" y="{inset["y"] + 24}" fill="#38BDF8" font-size="11" font-family="sans-serif" font-weight="bold">ARCHIPIÉLAGO DE GALÁPAGOS</text>',
    '  <!-- Provinces -->',
    '  <g id="provinces">'
]

for p in data["provinces"]:
    reg = p["region"]
    colors = REGION_COLORS.get(reg, REGION_COLORS["costa"])
    svg_lines.append(f'    <path id="prov-{p["id"]}" d="{p["path"]}" fill="{colors["fill"]}" stroke="{colors["stroke"]}" stroke-width="1.2" opacity="0.9" />')

svg_lines.append('  </g>')

hub = CALIBRATED_NODES[0]
svg_lines.append('  <!-- Routes from Pedernales -->')
svg_lines.append('  <g id="routes">')
for n in CALIBRATED_NODES[1:]:
    x1, y1 = hub["x"], hub["y"]
    x2, y2 = n["x"], n["y"]
    dx = x2 - x1
    dy = y2 - y1
    cx = x1 + dx * 0.5 - dy * 0.14
    cy = y1 + dy * 0.5 - abs(dx) * 0.12
    svg_lines.append(f'    <path d="M {x1} {y1} Q {cx} {cy} {x2} {y2}" fill="none" stroke="#38BDF8" stroke-width="1.2" opacity="0.25" />')
svg_lines.append('  </g>')

svg_lines.append('  <!-- City Nodes -->')
svg_lines.append('  <g id="nodes">')
for n in CALIBRATED_NODES:
    is_hub = n.get("isHub")
    if is_hub:
        svg_lines.append(f'    <circle cx="{n["x"]}" cy="{n["y"]}" r="7" fill="#FFC500" stroke="#FFFFFF" stroke-width="2.5" />')
        svg_lines.append(f'    <g transform="translate({n["x"] + n["labelDx"]}, {n["y"] + n["labelDy"]})">')
        svg_lines.append('      <rect x="0" y="0" width="156" height="26" rx="6" fill="#04122E" stroke="#10B981" stroke-width="2" />')
        svg_lines.append('      <text x="12" y="17" fill="#FFFFFF" font-size="9.5" font-family="sans-serif" font-weight="bold">★ HUB PEDERNALES</text>')
        svg_lines.append('    </g>')
    else:
        svg_lines.append(f'    <circle cx="{n["x"]}" cy="{n["y"]}" r="4" fill="#38BDF8" stroke="#FFFFFF" stroke-width="1.2" />')
        anchor = n["labelAnchor"]
        lx = n["x"] + n["labelDx"]
        ly = n["y"] + n["labelDy"]
        svg_lines.append(f'    <text x="{lx}" y="{ly}" text-anchor="{anchor}" fill="#E2E8F0" font-size="9" font-family="sans-serif">{n["name"]}</text>')
svg_lines.append('  </g>')

svg_lines.append('</svg>')

with open("scripts/ecuador_preview_calibrated.svg", "w", encoding="utf-8") as f:
    f.write("\n".join(svg_lines))

print("Saved scripts/ecuador_preview_calibrated.svg successfully.")
