import os
import re
import sys

# Force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

print("==================================================================")
print("   AUDITORIA INSTITUCIONAL FINAL INTEGRAL — LIDERPRO ECUADOR")
print("==================================================================")

issues = []

# 1. Image presence check in products.ts
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    products_content = f.read()

products_raw = re.findall(r'\{\s*"id":\s*"([^"]+)",(.*?)\n  \}', products_content, re.DOTALL)
print(f"\n1. Catalogo de Productos: {len(products_raw)} SKUs encontrados.")

missing_images = []
categories_count = {}
for pid, body in products_raw:
    cat_m = re.search(r'"category":\s*"([^"]+)"', body)
    sku_m = re.search(r'"sku":\s*"([^"]+)"', body)
    img_m = re.search(r'"imageUrl":\s*"([^"]+)"', body)
    
    cat = cat_m.group(1) if cat_m else 'unknown'
    sku = sku_m.group(1) if sku_m else 'unknown'
    img = img_m.group(1) if img_m else 'unknown'
    
    categories_count[cat] = categories_count.get(cat, 0) + 1
    
    local_img = os.path.join('public', img.lstrip('/'))
    if not os.path.exists(local_img):
        missing_images.append((sku, cat, img))

for cat, count in sorted(categories_count.items()):
    print(f"   - {cat:<15}: {count:>3} productos verificados")

if missing_images:
    print(f"   [ALERTA] {len(missing_images)} imagenes no encontradas en disco:")
    for sku, cat, img in missing_images:
        print(f"      {sku} ({cat}) -> {img}")
        issues.append(f"Missing image: {img}")
else:
    print("   [OK] 100% de las imagenes del catalogo existen y estan verificadas en disco.")

# 2. Hero and Local Pedernales Image Check
local_img_hero = 'public/images/hero/local-pedernales.jpg'
if os.path.exists(local_img_hero):
    print(f"\n2. Imagen Principal del Local en Pedernales: [OK] Existe ({os.path.getsize(local_img_hero)} bytes)")
else:
    print(f"\n2. Imagen Principal del Local en Pedernales: [ERROR] FALTA {local_img_hero}")
    issues.append("Missing hero store image")

# 3. Security, Privacy and Compliance Checks
print("\n3. Auditoria de Seguridad, Privacidad y Politicas Comerciales:")
search_files = []
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            search_files.append(os.path.join(root, f))

tel_count = 0
gps_count = 0
erp_leaks = 0

for p in search_files:
    with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
        txt = fp.read()
        if 'tel:' in txt:
            tel_count += 1
            print(f"   [ALERTA] Enlace tel: encontrado en {p}")
        if 'latitude' in txt.lower() or 'longitude' in txt.lower():
            gps_count += 1
            print(f"   [ALERTA] Coordenadas GPS encontradas en {p}")
        if any(w in txt.lower() for w in ['costo_compra', 'precio_distribuidor', 'margen_ganancia']):
            erp_leaks += 1
            print(f"   [ALERTA] Termino de costo ERP encontrado en {p}")

print(f"   - Enlaces de llamada telefonica ('tel:'): {tel_count} {'([OK] 0 enlaces, canal WhatsApp exclusivo)' if tel_count == 0 else ''}")
print(f"   - Coordenadas GPS numericas en UI/Schema: {gps_count} {'([OK] 0 coordenadas, ubicacion factica)' if gps_count == 0 else ''}")
print(f"   - Fugas de precios de costo o margen ERP: {erp_leaks} {'([OK] 0 fugas detectadas)' if erp_leaks == 0 else ''}")

# 4. WhatsApp Master Verification
whatsapp_ok = True
with open('src/lib/whatsapp.ts', 'r', encoding='utf-8') as f:
    wa_content = f.read()
    if '593967489002' in wa_content:
        print("\n4. Canal de WhatsApp Oficial: [OK] +593 96 748 9002 configurado como master unico.")
    else:
        print("\n4. Canal de WhatsApp Oficial: [ERROR] Numero maestro no coincide.")
        whatsapp_ok = False
        issues.append("WhatsApp number mismatch")

print("\n==================================================================")
if not issues:
    print("   RESULTADO GLOBAL: [OK] AUDITORIA COMPLETADA CON 0 DISCREPANCIAS")
else:
    print(f"   RESULTADO GLOBAL: [ALERTA] {len(issues)} OBSERVACIONES DETECTADAS")
print("==================================================================")
