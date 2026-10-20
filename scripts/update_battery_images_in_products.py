import os, json

base_dir = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital"
products_file = os.path.join(base_dir, "src", "data", "products.ts")

with open(products_file, "r", encoding="utf-8") as f:
    content = f.read()

start = content.find("export const PRODUCTS: Product[] = ")
prefix = content[:start + len("export const PRODUCTS: Product[] = ")]
json_str = content[start + len("export const PRODUCTS: Product[] = "):].rstrip(";\n ")
products = json.loads(json_str)

battery_imgs = {
    "02724HPIS4": "/images/products/battery-bosch-24-hp-i-s4-64amp-602438.png",
    "02724HPS4":  "/images/products/battery-bosch-24-hp-s4-64amp-602434.png",
    "02727HPIS4": "/images/products/battery-bosch-27-hp-i-s4-85amp-602738.png",
    "02727HPS4":  "/images/products/battery-bosch-27-hp-s4-88amp-602732.png",
    "02734HPS4":  "/images/products/battery-bosch-34-hp-s4-70amp-603432.png",
    "02742FES3":  "/images/products/battery-bosch-42-fe-s3-45amp-304222.png",
    "02742HPIS4": "/images/products/battery-bosch-42-hp-i-s4-55amp-604236.png",
    "42HPS4":     "/images/products/battery-bosch-42-hp-s4-55amp-604232.png",
    "0277B6548":  "/images/products/battery-bosch-b65-mp-i-s5-sellada.png",
    "027N40FES4": "/images/products/battery-bosch-n40-fe-s4-43amp-614022.png",
    "027NS40FEFS4": "/images/products/battery-bosch-ns40-fe-f-s4-604023.png",
    "027NS40FEIFS4": "/images/products/battery-bosch-ns40-fe-i-f-s4-42amp-604027.png",
    "03024-FE":     "/images/products/battery-ecuador-24-fe-full-equipo-65-amp.png",
    "03024-FE-I":   "/images/products/battery-ecuador-24-fe-i-full-equipo-65-amp.png",
    "03024-HP-I":   "/images/products/battery-ecuador-24-hp-i-high-power-85-amp.png",
    "03027-FE":     "/images/products/battery-ecuador-27-fe-full-equipo-80-amp.png",
    "03027-FE-I":   "/images/products/battery-ecuador-27-fe-i-full-equipo-80-amp.png",
    "03027-HP":     "/images/products/battery-ecuador-27-hp-high-power-95-amp.png",
    "03027-HP-I":   "/images/products/battery-ecuador-27-hp-i-high-power-95-amp.png",
    "03031-SHD":    "/images/products/battery-ecuador-31-shd-super-heavy-duty-105-amp.png",
    "03034-FE":     "/images/products/battery-ecuador-34-fe-full-equipo-65-amp.png",
    "03034-FE-I":   "/images/products/battery-ecuador-34-fe-i-full-equipo-65-amp.png",
    "03034-HP":     "/images/products/battery-ecuador-34-hp-high-power-80-amp.png",
    "03034-HP-I":   "/images/products/battery-ecuador-34-hp-i-high-power-80-amp.png",
    "03036-HP":     "/images/products/battery-ecuador-36-hp-high-power-50-amp.png",
    "03042-FE":     "/images/products/battery-ecuador-42-fe-full-equipo-55-amp.png",
    "03042-HP":     "/images/products/battery-ecuador-42-hp-high-power-62-amp.png",
    "03042-HP-I":   "/images/products/battery-ecuador-42-hp-i-high-power-62-amp.png",
    "03055-HD":     "/images/products/battery-ecuador-55-hd-14pl-63amp-servicio-publico.png",
    "03055-HD-I":   "/images/products/battery-ecuador-55-hd-i-14pl-63amp-servicio-publico.png",
    "03065-HP":     "/images/products/battery-ecuador-65-hp-high-power-65-amp.png",
    "03066-HP":     "/images/products/battery-ecuador-66-hp-high-power-84-amp.png",
    "030N100-SHD-I":"/images/products/battery-ecuador-n100-shd-i-super-heavy-duty-104-amp.png",
    "030N150-SHD":  "/images/products/battery-ecuador-n150-shd-super-heavy-duty-160-amp.png",
    "030N40-FE-I":  "/images/products/battery-ecuador-n40-fe-i-full-equipo-45-amp.png",
    "030N40-HP":    "/images/products/battery-ecuador-n40-hp-high-power-50-amp.png",
    "030N40-HP-I":  "/images/products/battery-ecuador-n40-hp-i-high-power-50-amp.png",
    "030NS40-FE":   "/images/products/battery-ecuador-ns40-fe-full-equipo-42-amp.png",
    "030NS40-FE-I": "/images/products/battery-ecuador-ns40-fe-i-full-equipo-42-amp.png",
    "030NS40-HP":   "/images/products/battery-ecuador-ns40-hp-high-power-45-amp.png",
}

updated_count = 0
for p in products:
    sku = p["sku"]
    if sku in battery_imgs:
        p["imageUrl"] = battery_imgs[sku]
        updated_count += 1

print(f"Updated {updated_count} battery products with exact real photos!")

with open(products_file, "w", encoding="utf-8") as f:
    f.write(prefix + json.dumps(products, ensure_ascii=False, indent=2) + ";\n")

print("products.ts successfully updated!")
