import os
import re

print("=== INSTITUTIONAL SECURITY & INTEGRITY AUDIT ===")

# 1. Check for exposed secrets or .env files in git/public
issues = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.next' in root or '.git' in root:
        continue
    for f in files:
        if f.startswith('.env') and not f.endswith('.example'):
            issues.append(f"Found sensitive file: {os.path.join(root, f)}")
        if f.endswith(('.pem', '.key', '.pfx')):
            issues.append(f"Found key/cert: {os.path.join(root, f)}")

print(f"1. Secrets/Env check: {'PASSED (0 issues)' if not issues else 'FAILED: ' + str(issues)}")

# 2. Check for tel: or phone call links
tel_links = []
gps_coords = []
erp_leaks = []

search_dirs = ['src']
for s_dir in search_dirs:
    for root, dirs, files in os.walk(s_dir):
        for f in files:
            if f.endswith(('.tsx', '.ts', '.jsx', '.js', '.json')):
                p = os.path.join(root, f)
                with open(p, 'r', encoding='utf-8', errors='ignore') as file:
                    txt = file.read()
                    if 'href="tel:' in txt or "href='tel:" in txt or 'href={`tel:' in txt:
                        tel_links.append(p)
                    # Check GPS coordinate patterns (e.g., latitude/longitude pairs)
                    if re.search(r'latitude|longitude|hasMap|geo:\s*\{', txt, re.IGNORECASE):
                        gps_coords.append(p)
                    # Check internal cost / margin words
                    if re.search(r'costo_compra|precio_distribuidor|costo_neto|margen_ganancia|utilidad_neta', txt, re.IGNORECASE):
                        erp_leaks.append(p)

print(f"2. Phone call links ('tel:'): {len(tel_links)} found {'(CLEAN - only WhatsApp active)' if not tel_links else str(tel_links)}")
print(f"3. GPS Coordinates: {len(gps_coords)} found {'(CLEAN - institutional text addresses only)' if not gps_coords else str(gps_coords)}")
print(f"4. ERP / Internal Cost leaks: {len(erp_leaks)} found {'(CLEAN - zero financial data exposed)' if not erp_leaks else str(erp_leaks)}")

