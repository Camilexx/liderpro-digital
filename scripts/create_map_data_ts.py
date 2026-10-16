import json

with open("scripts/ecuador_map_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# City label alignments to avoid overlaps
LABEL_OFFSETS = {
    "pedernales": {"dx": -65, "dy": -38, "anchor": "start"},
    "manta": {"dx": -10, "dy": -4, "anchor": "end"},
    "portoviejo": {"dx": 10, "dy": 2, "anchor": "start"},
    "salinas": {"dx": -10, "dy": -2, "anchor": "end"},
    "guayaquil": {"dx": 10, "dy": 2, "anchor": "start"},
    "santo-domingo": {"dx": -10, "dy": -12, "anchor": "end"},
    "quito": {"dx": 10, "dy": -4, "anchor": "start"},
    "esmeraldas": {"dx": 10, "dy": -2, "anchor": "start"},
    "quevedo": {"dx": 10, "dy": -4, "anchor": "start"},
    "babahoyo": {"dx": 10, "dy": 4, "anchor": "start"},
    "machala": {"dx": 10, "dy": 4, "anchor": "start"},
    "latacunga": {"dx": 10, "dy": -2, "anchor": "start"},
    "ambato": {"dx": 10, "dy": 2, "anchor": "start"},
    "riobamba": {"dx": 10, "dy": 2, "anchor": "start"},
    "cuenca": {"dx": 10, "dy": 2, "anchor": "start"},
    "loja": {"dx": -10, "dy": 2, "anchor": "end"},
    "zamora": {"dx": 10, "dy": 4, "anchor": "start"},
    "ibarra": {"dx": 10, "dy": -2, "anchor": "start"},
    "tulcan": {"dx": 10, "dy": -2, "anchor": "start"},
    "lago-agrio": {"dx": 10, "dy": -2, "anchor": "start"},
    "el-coca": {"dx": 10, "dy": 2, "anchor": "start"},
    "tena": {"dx": 10, "dy": 0, "anchor": "start"},
    "puyo": {"dx": 10, "dy": 2, "anchor": "start"},
    "macas": {"dx": 10, "dy": 2, "anchor": "start"},
    "galapagos": {"dx": 0, "dy": 16, "anchor": "middle"},
}

nodes_code = []
for n in data["nodes"]:
    offset = LABEL_OFFSETS.get(n["id"], {"dx": 8, "dy": -4, "anchor": "start"})
    is_hub = "true" if n.get("isHub") else "false"
    nodes_code.append(f"""  {{
    id: "{n['id']}",
    name: "{n['name']}",
    province: "{n['province']}",
    region: "{n['region']}",
    x: {n['x']},
    y: {n['y']},
    labelDx: {offset['dx']},
    labelDy: {offset['dy']},
    labelAnchor: "{offset['anchor']}",
    transitTime: "{n['transitTime']}",
    transportType: "{n['transportType']}",
    popularProducts: "{n['popularProducts']}",
    isHub: {is_hub}
  }}""")

provinces_code = []
for p in data["provinces"]:
    provinces_code.append(f"""  {{
    id: "{p['id']}",
    name: "{p['name']}",
    region: "{p['region']}",
    path: "{p['path']}"
  }}""")

inset = data["galapagosInset"]

ts_content = f"""// Official Geographic Map Data for Ecuador (UTM Zone 17S - Highcharts / Natural Earth Cartography)
export type RegionType = "costa" | "sierra" | "oriente" | "insular";

export interface ProvincePath {{
  id: string;
  name: string;
  region: RegionType;
  path: string;
}}

export interface MapCityNode {{
  id: string;
  name: string;
  province: string;
  region: RegionType;
  x: number;
  y: number;
  labelDx: number;
  labelDy: number;
  labelAnchor: "start" | "end" | "middle";
  transitTime: "24h" | "24-48h" | "48h";
  transportType: string;
  popularProducts: string;
  isHub?: boolean;
}}

export const ECUADOR_MAP_CONFIG = {{
  svgWidth: {data['svgWidth']},
  svgHeight: {data['svgHeight']},
  equatorY: 175.3,
  galapagosInset: {{
    x: {inset['x']},
    y: {inset['y']},
    width: {inset['width']},
    height: {inset['height']}
  }}
}};

export const HUB_NODE: MapCityNode = {{
  id: "pedernales",
  name: "Pedernales",
  province: "Manabí",
  region: "costa",
  x: 249.3,
  y: 175.3,
  labelDx: -65,
  labelDy: -38,
  labelAnchor: "start",
  transitTime: "24h",
  transportType: "Bodega Matriz y Centro de Despacho",
  popularProducts: "Acopio y despacho nacional mayorista y minorista",
  isHub: true
}};

export const DESTINATION_NODES: MapCityNode[] = [
{",\n".join(nodes_code[1:])}
];

export const ECUADOR_PROVINCES: ProvincePath[] = [
{",\n".join(provinces_code)}
];
"""

with open("src/data/ecuadorMapData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Saved src/data/ecuadorMapData.ts successfully.")
