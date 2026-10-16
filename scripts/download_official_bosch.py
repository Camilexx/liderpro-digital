import urllib.request
import os

headers = {'User-Agent': 'Mozilla/5.0'}
os.makedirs('public/images/products/official_bosch', exist_ok=True)

bosch_downloads = {
    "s4_24hp": "https://www.tecnova.com.ec/productos_gallery/img/a9cd79fa362c4929ffb1649c1e506741.webp",
    "s4_24hpi": "https://www.tecnova.com.ec/productos_gallery/img/81fe7e730bbfa4143f194c6982173135.webp",
    "s4_27hp": "https://www.tecnova.com.ec/productos_gallery/img/0f3299bf35fe9f89ca4be8247a994102.webp",
    "s4_27hpi": "https://www.tecnova.com.ec/productos_gallery/img/b00fd1a8ad2c3f460f31c7b544004057.webp",
    "s4_34hp": "https://www.tecnova.com.ec/productos_gallery/img/d3566acb83da1fcfffcf2d3be654a2b1.webp",
    "s4_36hp": "https://www.tecnova.com.ec/productos_gallery/img/0153bf51cc7f59681815b309c8518f4a.webp",
    "s4_42fe": "https://www.tecnova.com.ec/productos_gallery/img/55f610cbc3b3938275cab2c4eeca69e9.webp",
    "s4_42fei": "https://www.tecnova.com.ec/productos_gallery/img/1b66e0889e1b655e9a0cd44fbfff480a.webp",
    "s4_42hp": "https://www.tecnova.com.ec/productos_gallery/img/933351b3c7fa7a2a56793a95814ff198.webp",
    "s4_42hpi": "https://www.tecnova.com.ec/productos_gallery/img/dd6062bf61823a24654e330a26281c45.webp",
    "s4_ns40fe": "https://www.tecnova.com.ec/productos_gallery/img/3a7acc809c66106ee07440804ce7b6f9.webp",
    "s3_42fe": "https://www.tecnova.com.ec/productos_gallery/img/2c0f7270d26f78fba2dd06b51dcb719d.webp",
    "s5_megapower": "https://www.tecnova.com.ec/productos_gallery/img/72bfeb16d8ff7ff23aab34b22d4d1710.webp",
}

for key, url in bosch_downloads.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        data = urllib.request.urlopen(req, timeout=10).read()
        out_file = f"public/images/products/official_bosch/{key}.webp"
        with open(out_file, 'wb') as f:
            f.write(data)
        print(f"OK: {key:<15} ({len(data)} bytes)")
    except Exception as e:
        print(f"FAIL: {key:<15} -> {e}")
