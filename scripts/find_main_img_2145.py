import urllib.request
import re

req = urllib.request.Request('https://www.tecnova.com.ec/shop/producto?id=2145', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# find the main image or zoom image
main_img = re.findall(r'<img[^>]*class="[^"]*(?:product-zoom|main-image|img-responsive|active|galeria)[^"]*"[^>]*src="([^"]+)"', html)
print('Main img matches:', main_img)

# Search for the product name or title
for m in re.finditer(r'class="[^"]*(?:product-title|title|nombre)[^"]*"[^>]*>([^<]+)', html):
    print("Title match:", m.group(1).strip())

# Or search all <img> inside the main gallery div
gallery = re.search(r'(<div[^>]*class="[^"]*(?:gallery|slider|carousel|col-[^"]*images)[^"]*"[\s\S]*?</div>\s*</div>)', html)
if gallery:
    print("Gallery chunk:")
    print(re.findall(r'src="([^"]+)"', gallery.group(1)))
