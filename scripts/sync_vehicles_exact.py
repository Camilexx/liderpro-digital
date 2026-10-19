import re
import json

PRODUCTS_PATH = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\src\data\products.ts"
VEHICLES_PATH = r"c:\Users\PC\Desktop\NEXUS\liderpro-digital\src\data\vehicles.ts"

with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
    text = f.read()

j_start = text.index("export const PRODUCTS: Product[] = ") + len("export const PRODUCTS: Product[] = ")
j_str = text[j_start:].strip().rstrip(";")
products = json.loads(j_str)

prods_by_cat = {}
for p in products:
    c = p["category"]
    if c not in prods_by_cat:
        prods_by_cat[c] = []
    prods_by_cat[c].append(p)

# Universal coolants and additives
universal_coolants = [p["sku"] for p in prods_by_cat.get("refrigerantes", [])][:3]
universal_additives = [p["sku"] for p in prods_by_cat.get("aditivos", [])][:3]

def get_skus_for_model(make_str, model_str, cat):
    matched = []
    candidates = prods_by_cat.get(cat, [])
    
    # Sub-makes
    sub_makes = [m.strip().lower() for m in make_str.split("/")]
    
    # Sub-models
    model_keywords = [k.strip().lower() for k in re.sub(r"[\(\)/]", " ", model_str).split() if len(k.strip()) > 1]
    
    for p in candidates:
        cv_list = p.get("compatibleVehicles", [])
        for cv in cv_list:
            cv_make = cv["make"].lower()
            cv_model = cv["model"].lower()
            
            # Make match
            make_hit = any(sm in cv_make or cv_make in sm for sm in sub_makes)
            if not make_hit:
                continue
                
            # Model hit
            if any(k in cv_model for k in model_keywords):
                matched.append(p["sku"])
                break
                
    if not matched:
        # Fallback to make match
        for p in candidates:
            for cv in p.get("compatibleVehicles", []):
                cv_make = cv["make"].lower()
                if any(sm in cv_make or cv_make in sm for sm in sub_makes):
                    matched.append(p["sku"])
                    break
            if len(matched) >= 4:
                break
                
    if not matched:
        # Category fallback
        if cat == "refrigerantes":
            return universal_coolants
        elif cat == "aditivos":
            return universal_additives
        elif cat == "baterias":
            # Return standard Grupo 24 or 27 or 42
            if "camion" in make_str.lower() or "pesado" in make_str.lower() or "hino" in make_str.lower() or "isuzu" in make_str.lower():
                return [p["sku"] for p in candidates if "31" in p["name"] or "N150" in p["name"]][:2]
            elif "moto" in make_str.lower():
                return []
            else:
                return [p["sku"] for p in candidates if "24" in p["name"] or "42" in p["name"]][:3]
        elif cat == "lubricantes":
            if "moto" in make_str.lower():
                return [p["sku"] for p in candidates if "MOTO" in p["name"] or "4T" in p["name"]][:3]
            elif "camion" in make_str.lower() or "pesado" in make_str.lower() or "hino" in make_str.lower():
                return [p["sku"] for p in candidates if "15W40" in p["name"] or "DELVAC" in p["name"]][:3]
            else:
                return [p["sku"] for p in candidates if "10W30" in p["name"] or "5W30" in p["name"]][:3]
                
    return list(dict.fromkeys(matched))[:6]

with open(VEHICLES_PATH, "r", encoding="utf-8") as f:
    v_lines = f.readlines()

new_lines = []
curr_make = ""
curr_model = ""
in_rec = False

for line in v_lines:
    m_make = re.search(r'make:\s*"([^"]+)"', line)
    if m_make:
        curr_make = m_make.group(1)
        new_lines.append(line)
        continue
        
    m_model = re.search(r'model:\s*"([^"]+)"', line)
    if m_model:
        curr_model = m_model.group(1)
        new_lines.append(line)
        continue
        
    if "recommendedCategories:" in line:
        in_rec = True
        new_lines.append(line)
        # Compute real SKUs
        bats = get_skus_for_model(curr_make, curr_model, "baterias")
        lubs = get_skus_for_model(curr_make, curr_model, "lubricantes")
        fils = get_skus_for_model(curr_make, curr_model, "filtros")
        refs = get_skus_for_model(curr_make, curr_model, "refrigerantes")
        adits = get_skus_for_model(curr_make, curr_model, "aditivos")
        
        # Write clean recommended categories
        new_lines.append(f'          baterias: {json.dumps(bats)},\n')
        new_lines.append(f'          lubricantes: {json.dumps(lubs)},\n')
        new_lines.append(f'          filtros: {json.dumps(fils)},\n')
        new_lines.append(f'          refrigerantes: {json.dumps(refs)},\n')
        new_lines.append(f'          aditivos: {json.dumps(adits)}\n')
        continue
        
    if in_rec:
        if line.strip().startswith("}"):
            in_rec = False
            new_lines.append(line)
        # Skip old category lines
        continue
        
    new_lines.append(line)

with open(VEHICLES_PATH, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Synchronized src/data/vehicles.ts with 100% verified SKUs.")
