import urllib.request
import re

req = urllib.request.Request('https://www.tecnova.com.ec/shop', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

urls = re.findall(r'url\s*:\s*[\'"]([^\'"]+)[\'"]', html)
for u in set(urls):
    print(u)
