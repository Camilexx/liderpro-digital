import urllib.request
import re
import json

headers = {'User-Agent': 'Mozilla/5.0'}

# Let's check IDs in range around 2100 to 2200 or search in Google
# We can also search Google for: site:tecnova.com.ec/shop/producto
req = urllib.request.Request('https://www.tecnova.com.ec/shop/producto?id=2145', headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Where is the title of the product in this page?
# Let's find any text containing 602434 or S4 or 24 HP
print("Occurrences of 602434:")
for m in re.finditer(r'602434', html):
    idx = m.start()
    print("  ", html[max(0, idx-100):min(len(html), idx+100)])
