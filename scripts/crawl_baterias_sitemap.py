import urllib.request
import re
import xml.etree.ElementTree as ET

headers = {'User-Agent': 'Mozilla/5.0'}

# Try sitemaps
sitemaps = [
    'https://bateriasecuador.com/sitemap.xml',
    'https://bateriasecuador.com/sitemap_index.xml',
    'https://bateriasecuador.com/page-sitemap.xml',
    'https://bateriasecuador.com/product-sitemap.xml',
    'https://bateriasecuador.com/post-sitemap.xml'
]

urls = []
for sm in sitemaps:
    try:
        req = urllib.request.Request(sm, headers=headers)
        data = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
        found = re.findall(r'<loc>(.*?)</loc>', data)
        print(f"Sitemap {sm} -> {len(found)} urls")
        urls.extend(found)
    except Exception as e:
        print(f"Sitemap {sm} failed: {e}")

print("Total urls collected:", len(urls))
for u in urls[:30]:
    print("  ", u)
