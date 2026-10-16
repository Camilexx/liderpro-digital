import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}

urls = [
    'https://bateriasecuador.com/full-equipo/',
    'https://bateriasecuador.com/high-power/',
    'https://bateriasecuador.com/heavy-duty/',
    'https://bateriasecuador.com/producto/24/',
    'https://bateriasecuador.com/producto/42/',
    'https://bateriasecuador.com/producto/27/',
    'https://bateriasecuador.com/producto/ns40/',
    'https://bateriasecuador.com/producto/31/',
    'https://bateriasecuador.com/producto/n150/',
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        data = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
        imgs = set(re.findall(r'https://bateriasecuador\.com/wp-content/uploads/[^\s"\'<>]+\.(?:png|jpg|webp)', data))
        prod_imgs = [i for i in imgs if not any(x in i for x in ['logo', 'favicon', 'elementor', 'slider'])]
        print(f"\nPage: {u} -> {len(prod_imgs)} product images")
        for pi in sorted(prod_imgs):
            print("  ", pi)
    except Exception as e:
        print(f"Error {u}: {e}")
