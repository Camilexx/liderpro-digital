import json

# Read existing file to preserve ECUADOR_PROVINCES exactly
with open("src/data/ecuadorMapData.ts", "r", encoding="utf-8") as f:
    current_content = f.read()

# We know the provinces start after ECUADOR_PROVINCES = [
prov_start_idx = current_content.find("export const ECUADOR_PROVINCES: ProvincePath[] = [")
if prov_start_idx == -1:
    raise ValueError("Could not find ECUADOR_PROVINCES in current content")

provinces_part = current_content[prov_start_idx:]

CALIBRATED_NODES = [
    {
        "id": "pedernales",
        "name": "Pedernales",
        "province": "Manabí",
        "region": "costa",
        "x": 298.0,
        "y": 175.3,
        "labelDx": -78,
        "labelDy": -36,
        "labelAnchor": "start",
        "transitTime": "24h",
        "transportType": "Bodega Matriz y Centro de Despacho",
        "popularProducts": "Acopio y despacho nacional mayorista y minorista",
        "isHub": True
    },
    {
        "id": "quito",
        "name": "Quito",
        "province": "Pichincha",
        "region": "sierra",
        "x": 435.0,
        "y": 198.0,
        "labelDx": 10,
        "labelDy": -4,
        "labelAnchor": "start",
        "transitTime": "24h",
        "transportType": "Courier & Encomienda Directa",
        "popularProducts": "Lubricantes sintéticos Mannol/Motul, baterías Bosch, filtros",
        "isHub": False
    },
    {
        "id": "santo-domingo",
        "name": "Santo Domingo",
        "province": "Sto. Domingo",
        "region": "costa",
        "x": 378.0,
        "y": 214.0,
        "labelDx": -10,
        "labelDy": -6,
        "labelAnchor": "end",
        "transitTime": "24h",
        "transportType": "Encomienda Interprovincial Directa",
        "popularProducts": "Aceites diésel 15W40, baterías pesadas, filtros",
        "isHub": False
    },
    {
        "id": "manta",
        "name": "Manta",
        "province": "Manabí",
        "region": "costa",
        "x": 226.0,
        "y": 276.0,
        "labelDx": -10,
        "labelDy": -2,
        "labelAnchor": "end",
        "transitTime": "24h",
        "transportType": "Transporte Intercantonal Directo",
        "popularProducts": "Aceites marinos, canecas 20L, baterías",
        "isHub": False
    },
    {
        "id": "portoviejo",
        "name": "Portoviejo",
        "province": "Manabí",
        "region": "costa",
        "x": 254.0,
        "y": 284.0,
        "labelDx": -10,
        "labelDy": 0,
        "labelAnchor": "end",
        "transitTime": "24h",
        "transportType": "Transporte Intercantonal Directo",
        "popularProducts": "Lubricantes 20W50, filtros de aceite y aire",
        "isHub": False
    },
    {
        "id": "esmeraldas",
        "name": "Esmeraldas",
        "province": "Esmeraldas",
        "region": "costa",
        "x": 338.0,
        "y": 92.0,
        "labelDx": 10,
        "labelDy": -2,
        "labelAnchor": "start",
        "transitTime": "24h",
        "transportType": "Encomienda Directa Costa Norte",
        "popularProducts": "Lubricantes de motor, baterías, refrigerantes",
        "isHub": False
    },
    {
        "id": "guayaquil",
        "name": "Guayaquil",
        "province": "Guayas",
        "region": "costa",
        "x": 308.0,
        "y": 392.0,
        "labelDx": 10,
        "labelDy": 2,
        "labelAnchor": "start",
        "transitTime": "24h",
        "transportType": "Courier Express & Encomienda",
        "popularProducts": "Canecas de aceite, baterías selladas, aditivos",
        "isHub": False
    },
    {
        "id": "quevedo",
        "name": "Quevedo",
        "province": "Los Ríos",
        "region": "costa",
        "x": 345.0,
        "y": 282.0,
        "labelDx": 10,
        "labelDy": 0,
        "labelAnchor": "start",
        "transitTime": "24h",
        "transportType": "Encomienda Directa Central",
        "popularProducts": "Aceites agrícolas, 15W40, baterías heavy-duty",
        "isHub": False
    },
    {
        "id": "babahoyo",
        "name": "Babahoyo",
        "province": "Los Ríos",
        "region": "costa",
        "x": 346.0,
        "y": 366.0,
        "labelDx": -10,
        "labelDy": 0,
        "labelAnchor": "end",
        "transitTime": "24h",
        "transportType": "Encomienda Interprovincial",
        "popularProducts": "Lubricantes de camión y camioneta, baterías",
        "isHub": False
    },
    {
        "id": "salinas",
        "name": "Salinas",
        "province": "Santa Elena",
        "region": "costa",
        "x": 226.0,
        "y": 396.0,
        "labelDx": -10,
        "labelDy": -2,
        "labelAnchor": "end",
        "transitTime": "24-48h",
        "transportType": "Courier & Encomienda",
        "popularProducts": "Aceites sintéticos, filtros y refrigerantes",
        "isHub": False
    },
    {
        "id": "machala",
        "name": "Machala",
        "province": "El Oro",
        "region": "costa",
        "x": 298.0,
        "y": 512.0,
        "labelDx": -10,
        "labelDy": 2,
        "labelAnchor": "end",
        "transitTime": "24-48h",
        "transportType": "Transporte de Carga Pesada",
        "popularProducts": "Lubricantes camaroneros, canecas, baterías Grupo 31",
        "isHub": False
    },
    {
        "id": "latacunga",
        "name": "Latacunga",
        "province": "Cotopaxi",
        "region": "sierra",
        "x": 412.0,
        "y": 264.0,
        "labelDx": 10,
        "labelDy": -2,
        "labelAnchor": "start",
        "transitTime": "24-48h",
        "transportType": "Encomienda Directa Sierra",
        "popularProducts": "Aceites para altura, refrigerantes 50/50",
        "isHub": False
    },
    {
        "id": "ambato",
        "name": "Ambato",
        "province": "Tungurahua",
        "region": "sierra",
        "x": 442.0,
        "y": 305.0,
        "labelDx": 10,
        "labelDy": 2,
        "labelAnchor": "start",
        "transitTime": "24-48h",
        "transportType": "Encomienda Interprovincial",
        "popularProducts": "Filtros de aceite/aire, baterías, lubricantes",
        "isHub": False
    },
    {
        "id": "riobamba",
        "name": "Riobamba",
        "province": "Chimborazo",
        "region": "sierra",
        "x": 428.0,
        "y": 368.0,
        "labelDx": 10,
        "labelDy": 2,
        "labelAnchor": "start",
        "transitTime": "24-48h",
        "transportType": "Encomienda Directa",
        "popularProducts": "Aceites pesados, baterías Ecuador 24/27",
        "isHub": False
    },
    {
        "id": "cuenca",
        "name": "Cuenca",
        "province": "Azuay",
        "region": "sierra",
        "x": 392.0,
        "y": 476.0,
        "labelDx": 10,
        "labelDy": 2,
        "labelAnchor": "start",
        "transitTime": "24-48h",
        "transportType": "Courier Express & Encomienda",
        "popularProducts": "Mannol sintético, baterías Bosch, bujías NGK",
        "isHub": False
    },
    {
        "id": "loja",
        "name": "Loja",
        "province": "Loja",
        "region": "sierra",
        "x": 338.0,
        "y": 582.0,
        "labelDx": -10,
        "labelDy": 0,
        "labelAnchor": "end",
        "transitTime": "48h",
        "transportType": "Transporte Interprovincial Sur",
        "popularProducts": "Lubricantes multigrado, baterías, filtros",
        "isHub": False
    },
    {
        "id": "ibarra",
        "name": "Ibarra",
        "province": "Imbabura",
        "region": "sierra",
        "x": 460.0,
        "y": 142.0,
        "labelDx": 10,
        "labelDy": -2,
        "labelAnchor": "start",
        "transitTime": "24-48h",
        "transportType": "Encomienda Directa Norte",
        "popularProducts": "Aceites de motor, baterías, aditivos",
        "isHub": False
    },
    {
        "id": "tulcan",
        "name": "Tulcán",
        "province": "Carchi",
        "region": "sierra",
        "x": 498.0,
        "y": 104.0,
        "labelDx": 10,
        "labelDy": -2,
        "labelAnchor": "start",
        "transitTime": "48h",
        "transportType": "Encomienda Interprovincial Frontera",
        "popularProducts": "Lubricantes pesados, anticongelantes, filtros",
        "isHub": False
    },
    {
        "id": "lago-agrio",
        "name": "Lago Agrio",
        "province": "Sucumbíos",
        "region": "oriente",
        "x": 605.0,
        "y": 172.0,
        "labelDx": 10,
        "labelDy": -2,
        "labelAnchor": "start",
        "transitTime": "48h",
        "transportType": "Transporte Carga Nororiente",
        "popularProducts": "Aceites diésel CI-4, canecas, baterías pesadas",
        "isHub": False
    },
    {
        "id": "el-coca",
        "name": "El Coca",
        "province": "Orellana",
        "region": "oriente",
        "x": 602.0,
        "y": 236.0,
        "labelDx": 10,
        "labelDy": 2,
        "labelAnchor": "start",
        "transitTime": "48h",
        "transportType": "Transporte de Carga Petrolera",
        "popularProducts": "Lubricantes industriales y petroleros, filtros",
        "isHub": False
    },
    {
        "id": "puyo",
        "name": "Puyo",
        "province": "Pastaza",
        "region": "oriente",
        "x": 518.0,
        "y": 332.0,
        "labelDx": 10,
        "labelDy": 2,
        "labelAnchor": "start",
        "transitTime": "48h",
        "transportType": "Encomienda Interprovincial",
        "popularProducts": "Aceites 4T moto, lubricantes pesados, baterías",
        "isHub": False
    },
    {
        "id": "tena",
        "name": "Tena",
        "province": "Napo",
        "region": "oriente",
        "x": 512.0,
        "y": 276.0,
        "labelDx": 10,
        "labelDy": 0,
        "labelAnchor": "start",
        "transitTime": "48h",
        "transportType": "Encomienda Directa",
        "popularProducts": "Lubricantes de trabajo y filtros de aire",
        "isHub": False
    },
    {
        "id": "macas",
        "name": "Macas",
        "province": "Morona Santiago",
        "region": "oriente",
        "x": 468.0,
        "y": 422.0,
        "labelDx": 10,
        "labelDy": 2,
        "labelAnchor": "start",
        "transitTime": "48h",
        "transportType": "Transporte Interprovincial",
        "popularProducts": "Aceites de motor, baterías y filtros",
        "isHub": False
    },
    {
        "id": "zamora",
        "name": "Zamora",
        "province": "Zamora Chinchipe",
        "region": "oriente",
        "x": 402.0,
        "y": 592.0,
        "labelDx": 10,
        "labelDy": 2,
        "labelAnchor": "start",
        "transitTime": "48h",
        "transportType": "Transporte Suroriental",
        "popularProducts": "Lubricantes para maquinaria y baterías",
        "isHub": False
    },
    {
        "id": "galapagos",
        "name": "Galápagos",
        "province": "Galápagos",
        "region": "insular",
        "x": 105.0,
        "y": 135.0,
        "labelDx": 0,
        "labelDy": 18,
        "labelAnchor": "middle",
        "transitTime": "48h",
        "transportType": "Courier Aéreo / Carga Autorizada",
        "popularProducts": "Filtros livianos, bujías y aditivos permitidos",
        "isHub": False
    }
]

hub = CALIBRATED_NODES[0]
dests = CALIBRATED_NODES[1:]

nodes_code = []
for n in dests:
    nodes_code.append(f"""  {{
    id: "{n['id']}",
    name: "{n['name']}",
    province: "{n['province']}",
    region: "{n['region']}",
    x: {n['x']},
    y: {n['y']},
    labelDx: {n['labelDx']},
    labelDy: {n['labelDy']},
    labelAnchor: "{n['labelAnchor']}",
    transitTime: "{n['transitTime']}",
    transportType: "{n['transportType']}",
    popularProducts: "{n['popularProducts']}",
    isHub: false
  }}""")

top_section = f"""// Official Geographic Map Data for Ecuador (UTM Zone 17S - Highcharts / Natural Earth Cartography)
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
  svgWidth: 960,
  svgHeight: 720,
  equatorY: 175.3,
  galapagosInset: {{
    x: 35.5,
    y: 31.3,
    width: 203.7,
    height: 217.3
  }}
}};

export const HUB_NODE: MapCityNode = {{
  id: "{hub['id']}",
  name: "{hub['name']}",
  province: "{hub['province']}",
  region: "{hub['region']}",
  x: {hub['x']},
  y: {hub['y']},
  labelDx: {hub['labelDx']},
  labelDy: {hub['labelDy']},
  labelAnchor: "{hub['labelAnchor']}",
  transitTime: "{hub['transitTime']}",
  transportType: "{hub['transportType']}",
  popularProducts: "{hub['popularProducts']}",
  isHub: true
}};

export const DESTINATION_NODES: MapCityNode[] = [
{",\n".join(nodes_code)}
];

"""

final_ts = top_section + provinces_part

with open("src/data/ecuadorMapData.ts", "w", encoding="utf-8") as f:
    f.write(final_ts)

print("Updated src/data/ecuadorMapData.ts successfully.")
