import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://bateriasecuador.com/producto/24fe/', headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
for img in set(re.findall(r'https://bateriasecuador\.com/wp-content/uploads/[^\s"\'<>]+\.(?:png|jpg|webp)', html)):
    print(img)
