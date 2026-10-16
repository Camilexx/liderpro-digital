import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}

# Tecnova search or category listing
urls = [
    'https://tecnova.com.ec/baterias',
    'https://tecnova.com.ec/productos',
    'https://www.tecnova.com.ec/categoria-producto/baterias/',
    'https://www.tecnova.com.ec/lineas/baterias-bosch/',
    'https://tecnova.com.ec/sitemap.xml',
    'https://www.tecnova.com.ec/sitemap_index.xml',
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        data = urllib.request.urlopen(req, timeout=5).read().decode('utf-8', errors='ignore')
        print(f"URL {u} -> Length: {len(data)}")
        # search for img webp in productos_gallery
        imgs = set(re.findall(r'https?://[^\s"\'<>]*(?:productos_gallery|uploads)[^\s"\'<>]+\.(?:webp|png|jpg)', data))
        print(f"  Found {len(imgs)} images:")
        for im in list(imgs)[:10]:
            print("    ", im)
    except Exception as e:
        print(f"Failed {u}: {e}")
