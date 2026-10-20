import re

file_path = "c:/Users/PC/Desktop/NEXUS/liderpro-digital/src/data/products.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_brands = """export const OFFICIAL_BRANDS = [
  { name: "BATERÍAS ECUADOR", logoUrl: "/images/brands/baterias-ecuador.png" },
  { name: "BOSCH", logoUrl: "/images/brands/bosch.png" },
  { name: "MANNOL", logoUrl: "/images/brands/mannol.png" },
  { name: "MOBIL", logoUrl: "/images/brands/mobil.png" },
  { name: "VALVOLINE", logoUrl: "/images/brands/valvoline.png" },
  { name: "MOTUL", logoUrl: "/images/brands/motul.png" },
  { name: "AROIL", logoUrl: "/images/brands/aroil.png" },
  { name: "AMALIE", logoUrl: "/images/brands/amalie.png" },
  { name: "ADVANCE", logoUrl: "/images/brands/advance.png" },
  { name: "ABRO", logoUrl: "/images/brands/abro.png" },
  { name: "SIMONIZ", logoUrl: "/images/brands/simoniz.png" },
  { name: "AREON", logoUrl: "/images/brands/areon.png" }
];"""

content = re.sub(r'export const OFFICIAL_BRANDS = \[[\s\S]*?\];', new_brands, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated OFFICIAL_BRANDS successfully in products.ts")
