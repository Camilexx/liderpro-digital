import urllib.request
import re

req = urllib.request.Request('https://www.tecnova.com.ec/shop/producto?id=2061', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
imgs = re.findall(r'/productos_gallery/img/([a-zA-Z0-9_\.]+\.webp)', html)
print('Gallery images for id=2061 (S3 42 FE):', set(imgs))
if imgs:
    img_url = f'https://www.tecnova.com.ec/productos_gallery/img/{imgs[0]}'
    req_img = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
    data = urllib.request.urlopen(req_img).read()
    open('public/images/products/test-tecnova-s3-42.webp', 'wb').write(data)
    print(f'Downloaded {imgs[0]} ({len(data)} bytes)')
