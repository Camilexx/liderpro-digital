import json

with open("scripts/ecuador_map_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

svg_w = data["svgWidth"]
svg_h = data["svgHeight"]
inset = data["galapagosInset"]

# Color palette by region
REGION_COLORS = {
    "costa": {"fill": "#0F3870", "stroke": "#38BDF8", "hover": "#1D4ED8"},
    "sierra": {"fill": "#78350F", "stroke": "#F59E0B", "hover": "#B45309"},
    "oriente": {"fill": "#064E3B", "stroke": "#10B981", "hover": "#047857"},
    "insular": {"fill": "#0E7490", "stroke": "#22D3EE", "hover": "#0891B2"}
}

svg_lines = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svg_w} {svg_h}" width="{svg_w}" height="{svg_h}" style="background-color: #04122E;">',
    '  <defs>',
    '    <linearGradient id="hubPulse" x1="0%" y1="0%" x2="100%" y2="100%">',
    '      <stop offset="0%" stop-color="#FFC500" />',
    '      <stop offset="100%" stop-color="#F59E0B" />',
    '    </linearGradient>',
    '  </defs>',
    '  <!-- Background grid line for Equator -->',
    '  <line x1="20" y1="175" x2="940" y2="175" stroke="#FFC500" stroke-width="1" stroke-dasharray="6 4" opacity="0.4" />',
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

# Hub node (Pedernales)
hub = next(n for n in data["nodes"] if n.get("isHub"))
svg_lines.append('  <!-- Routes from Pedernales -->')
svg_lines.append('  <g id="routes">')
for n in data["nodes"]:
    if n.get("isHub"): continue
    x1, y1 = hub["x"], hub["y"]
    x2, y2 = n["x"], n["y"]
    dx = x2 - x1
    dy = y2 - y1
    cx = x1 + dx * 0.5 - dy * 0.15
    cy = y1 + dy * 0.5 - abs(dx) * 0.12
    svg_lines.append(f'    <path d="M {x1} {y1} Q {cx} {cy} {x2} {y2}" fill="none" stroke="#38BDF8" stroke-width="1" opacity="0.25" />')
svg_lines.append('  </g>')

svg_lines.append('  <!-- City Nodes -->')
svg_lines.append('  <g id="nodes">')
for n in data["nodes"]:
    is_hub = n.get("isHub")
    if is_hub:
        svg_lines.append(f'    <circle cx="{n["x"]}" cy="{n["y"]}" r="8" fill="#FFC500" stroke="#FFFFFF" stroke-width="2.5" />')
        svg_lines.append(f'    <text x="{n["x"] + 12}" y="{n["y"] + 4}" fill="#FFC500" font-size="13" font-family="sans-serif" font-weight="bold">★ HUB PEDERNALES (MATRIZ)</text>')
    else:
        svg_lines.append(f'    <circle cx="{n["x"]}" cy="{n["y"]}" r="4" fill="#38BDF8" stroke="#FFFFFF" stroke-width="1" />')
        svg_lines.append(f'    <text x="{n["x"] + 6}" y="{n["y"] + 3}" fill="#E2E8F0" font-size="9" font-family="sans-serif">{n["name"]}</text>')
svg_lines.append('  </g>')

svg_lines.append('</svg>')

with open("scripts/ecuador_preview.svg", "w", encoding="utf-8") as f:
    f.write("\n".join(svg_lines))

print("Saved scripts/ecuador_preview.svg successfully.")
