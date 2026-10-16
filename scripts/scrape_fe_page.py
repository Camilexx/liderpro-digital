import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://bateriasecuador.com/full-equipo/', headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# find all images
imgs = set(re.findall(r'https://bateriasecuador\.com/wp-content/uploads/[^\s"\'<>]+\.(?:png|jpg|webp)', html))
for img in sorted(imgs):
    if not any(x in img for x in ['elementor', 'logo', 'favicon', 'slider']):
        print(img)
