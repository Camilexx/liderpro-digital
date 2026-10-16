import urllib.request
import re

req = urllib.request.Request('https://www.tecnova.com.ec/shop', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Search for dataTables-blogfs5
idx = html.find('dataTables-blogfs5')
if idx != -1:
    print("Found dataTables-blogfs5:")
    print(html[idx:idx+1200])
else:
    print("dataTables-blogfs5 not found")
