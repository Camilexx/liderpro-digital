import urllib.request
import re

req = urllib.request.Request('https://www.tecnova.com.ec/shop', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Search for the javascript that populates dataTables-blogfs5
matches = [m.start() for m in re.finditer(r'#dataTables-blogfs5', html)]
for idx in matches:
    print("--- MATCH AT", idx, "---")
    print(html[idx:idx+800])
