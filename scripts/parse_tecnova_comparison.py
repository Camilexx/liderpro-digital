import urllib.request
import re
import json

headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request('https://www.tecnova.com.ec/shop/producto?id=2145', headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Extract all columns in the comparison table:
# <th class="col-head-img ... <a href="/shop/producto?id=(\d+)"> <img ... src="([^"]+)" alt="([^"]+)" ... <span ...>([^<]+)
pattern = r'<th class="col-head-img[^"]*"[\s\S]*?<a href="/shop/producto\?id=(\d+)"[\s\S]*?<img class="img-tbl-compare" src="([^"]+)" alt="([^"]*)"[\s\S]*?<span[^>]*><a[^>]*>([^<]+)</a></span>'
matches = re.findall(pattern, html)
print(f"Found {len(matches)} battery columns in comparison table:")

battery_map = {}
for pid, src, alt, title in matches:
    clean_title = ' '.join(title.split())
    battery_map[pid] = {
        'id': pid,
        'src': src,
        'alt': alt,
        'title': clean_title
    }
    print(f"ID: {pid:<6} | {clean_title:<30} | Alt: {alt:<20} | Src: {src}")

# Also extract the codes row from tbody
# <tr> ... <td>Código del producto</td> <td>...</td> <td>...</td>
code_row = re.search(r'C[oó]digo del producto</td>[\s\S]*?</tr>', html)
if code_row:
    codes = re.findall(r'<label class="white-space: normal;">(\d+)</td>', code_row.group(0))
    print(f"\nCodes found ({len(codes)}):", codes)
    # The order matches the columns!
    col_list = list(battery_map.values())
    if len(codes) == len(col_list):
        for c, item in zip(codes, col_list):
            item['code'] = c
            print(f"Code: {c} -> {item['title']} -> {item['src']}")

with open('public/images/products/tecnova_table.json', 'w', encoding='utf-8') as f:
    json.dump(battery_map, f, indent=2)
