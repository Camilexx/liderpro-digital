import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
for sm in [
    'https://bateriasecuador.com/wp-sitemap-posts-page-1.xml',
    'https://bateriasecuador.com/wp-sitemap-posts-product-1.xml',
]:
    req = urllib.request.Request(sm, headers=headers)
    data = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    locs = re.findall(r'<loc>(.*?)</loc>', data)
    print(f"\n=== {sm} ({len(locs)} items) ===")
    for l in locs:
        print(l)
