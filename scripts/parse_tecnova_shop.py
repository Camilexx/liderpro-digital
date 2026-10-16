import urllib.request
import re
import json

headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://www.tecnova.com.ec/shop', headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Match product cards or images with surrounding text
# Look for product containers
pattern = r'class="[^"]*product[^"]*"[\s\S]*?<img[^>]*src="([^"]*productos_gallery/img/[^"]+)"[\s\S]*?<(?:h2|h3|h4|h5|p|span|a)[^>]*>([^<]*(?:BATERIA|S3|S4|S5|S6|BOSCH|42|24|27|34|NS40|N40)[^<]*)'

# Or let's search all <img> tags and nearby text
img_matches = re.findall(r'<img[^>]*src="([^"]*productos_gallery/img/[^"]+)"[^>]*alt="([^"]*)"', html)
print(f"Total img alt matches: {len(img_matches)}")

for src, alt in img_matches:
    if any(k in alt.lower() for k in ['bateria', 'bosch', 's3', 's4', 's5', 's6', '42', '24', '27', '34']):
        print(f"Alt: {alt:<50} | Src: {src}")

# If alt is empty, search text around src in html
if len([a for _, a in img_matches if a]) < 5:
    print("\nExtracting around src matches:")
    all_imgs = set(re.findall(r'(productos_gallery/img/[a-zA-Z0-9_\.]+\.webp)', html))
    for img_path in all_imgs:
        idx = html.find(img_path)
        snippet = html[max(0, idx-300):min(len(html), idx+500)]
        # clean html tags from snippet
        clean_text = re.sub(r'<[^>]+>', ' ', snippet)
        clean_text = ' '.join(clean_text.split())
        if 'bateria' in clean_text.lower():
            # extract possible product title
            print(f"Img: {img_path}")
            print(f"   Context: {clean_text[:120]}...\n")
