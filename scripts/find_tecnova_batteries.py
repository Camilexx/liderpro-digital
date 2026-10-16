import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://www.tecnova.com.ec/shop', headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Search for products with "bateria" in name or title or description
# Let's find all <div or <article that contains "BATERIA"
blocks = re.findall(r'<div[^>]*class="[^"]*product[^"]*"[\s\S]*?</div>\s*</div>\s*</div>', html)
print(f"Product blocks: {len(blocks)}")

# Let's search all matches of "BATERIA" in html and print surrounding 500 chars
for m in re.finditer(r'BATERIA[^\n<]+', html, re.IGNORECASE):
    title = m.group(0).strip()
    idx = m.start()
    chunk = html[max(0, idx-400):min(len(html), idx+800)]
    img_m = re.search(r'productos_gallery/img/([a-zA-Z0-9_\.]+\.webp)', chunk)
    img = img_m.group(1) if img_m else "NO_IMG"
    print(f"Title: {title:<55} | Img: {img}")
