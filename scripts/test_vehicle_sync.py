import re
import json

PRODUCTS_PATH = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\src\data\products.ts"
VEHICLES_PATH = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\src\data\vehicles.ts"

with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
    text = f.read()

j_start = text.index("export const PRODUCTS: Product[] = ") + len("export const PRODUCTS: Product[] = ")
j_str = text[j_start:].strip().rstrip(";")
products = json.loads(j_str)

# Map by category
prods_by_cat = {}
for p in products:
    cat = p["category"]
    if cat not in prods_by_cat:
        prods_by_cat[cat] = []
    prods_by_cat[cat].append(p)

# Helper to find matching SKUs for a vehicle
def match_skus_for_vehicle(make, model_name, cat):
    matched = []
    candidates = prods_by_cat.get(cat, [])
    
    # Split model keywords (e.g. D-Max, CRDi, 2.5, 3.0)
    m_clean = re.sub(r"[\(\)/]", " ", model_name).split()
    keywords = [k.strip().lower() for k in m_clean if len(k.strip()) > 1]
    
    for p in candidates:
        cv_list = p.get("compatibleVehicles", [])
        for cv in cv_list:
            cv_make = cv["make"].lower()
            cv_model = cv["model"].lower()
            
            # Check make match
            make_matches = (make.lower() in cv_make or cv_make in make.lower())
            if not make_matches:
                continue
                
            # Check model keyword match
            if any(k in cv_model for k in keywords):
                matched.append(p["sku"])
                break
                
    # If no specific match found, provide brand/category fallback
    if not matched:
        for p in candidates:
            for cv in p.get("compatibleVehicles", []):
                if make.lower() in cv["make"].lower():
                    matched.append(p["sku"])
                    break
            if len(matched) >= 3:
                break
                
    return list(dict.fromkeys(matched))[:6]

# Read vehicles.ts structure
with open(VEHICLES_PATH, "r", encoding="utf-8") as f:
    v_content = f.read()

# We can parse the VEHICLE_DATABASE array and re-inject recommendedCategories
# Let's inspect the vehicles models
make_blocks = re.findall(r'\{\s*make:\s*"([^"]+)",\s*models:\s*\[(.*?)\]\s*\}', v_content, re.DOTALL)
print(f"Found {len(make_blocks)} make blocks in vehicles.ts")

for make, models_raw in make_blocks:
    model_entries = re.findall(r'model:\s*"([^"]+)"', models_raw)
    print(f"\nMake: {make}")
    for m in model_entries:
        bat_skus = match_skus_for_vehicle(make, m, "baterias")
        lub_skus = match_skus_for_vehicle(make, m, "lubricantes")
        fil_skus = match_skus_for_vehicle(make, m, "filtros")
        ref_skus = match_skus_for_vehicle(make, m, "refrigerantes")
        print(f"  Model '{m}': {len(bat_skus)} bats, {len(lub_skus)} lubs, {len(fil_skus)} filters, {len(ref_skus)} coolants")
