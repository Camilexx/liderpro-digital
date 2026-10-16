import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

bosch_urls = [
    'https://1800baterias.com/producto/bateria-bosch-s4-24/',
    'https://1800baterias.com/producto/bateria-bosch-s4-42/',
    'https://1800baterias.com/producto/bateria-bosch-s4-ns40/',
    'https://1800baterias.com/producto/bateria-bosch-s5-27/',
    'https://1800baterias.com/producto/bateria-bosch-s5-65/',
    'https://1800baterias.com/producto/bateria-bosch-s3-36/',
    'https://1800baterias.com/producto/bateria-bosch-s3-42/',
    'https://1800baterias.com/producto/bateria-bosch-s4-27/',
    'https://1800baterias.com/marca/bosch/'
]

for u in bosch_urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        data = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        # find wp-content/uploads images
        imgs = set(re.findall(r'https://1800baterias\.com/wp-content/uploads/[^\s"\'<>]+\.(?:png|jpg|webp)', data))
        prod_imgs = [i for i in imgs if any(k in i.lower() for k in ['bosch', 's4', 's5', 's3', 'bateria'])]
        print(f"\n{u} -> {len(prod_imgs)} matches")
        for pi in sorted(prod_imgs):
            print("  ", pi)
    except Exception as e:
        print(f"Error {u}: {e}")
