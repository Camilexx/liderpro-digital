import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}

# We can query search on tecnova or check IDs
codes = [
    "602434", "602438", "602732", "602738", "603432", 
    "304222", "604232", "604236", "614022", "604023", "604027"
]

# Let's see how search works on tecnova
# Let's try searching on tecnova: https://www.tecnova.com.ec/shop?search=602434
for code in codes:
    url = f"https://www.tecnova.com.ec/shop?search={code}"
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8', errors='ignore')
        # find producto?id=
        p_ids = re.findall(r'producto\?id=(\d+)', html)
        print(f"Code {code} -> p_ids: {set(p_ids)}")
    except Exception as e:
        print(f"Error {code}: {e}")
