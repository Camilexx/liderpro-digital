import urllib.request
import os

headers = {'User-Agent': 'Mozilla/5.0'}

base_urls = [
    # 2023/09
    ('24-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/24-01.webp'),
    ('27-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/27-01.webp'),
    ('34-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/34-01.webp'),
    ('36-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/36-01.webp'),
    ('42-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/42-01.webp'),
    ('48-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/48-01.webp'),
    ('49-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/49-01.webp'),
    ('55-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/55-01.webp'),
    ('65-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/65-01.webp'),
    ('66-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/66-01.webp'),
    ('31-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/31-01.webp'),
    ('n100-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/n100-01.webp'),
    ('n120-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/n120-01.webp'),
    ('n150-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/n150-01.webp'),
    ('n200-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/n200-01.webp'),
    ('f65-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/f65-01.webp'),
    ('n40-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2023/09/n40-01.webp'),
    # 2021/08
    ('ns40-01.webp', 'https://bateriasecuador.com/wp-content/uploads/2021/08/ns40-01.webp'),
    # 2025/03
    ('27fe-1.webp', 'https://bateriasecuador.com/wp-content/uploads/2025/03/27fe-1.webp'),
]

os.makedirs('public/images/products/official_be', exist_ok=True)

for name, url in base_urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        data = urllib.request.urlopen(req, timeout=10).read()
        out_path = os.path.join('public/images/products/official_be', name)
        with open(out_path, 'wb') as f:
            f.write(data)
        print(f"Downloaded {name} ({len(data)} bytes)")
    except Exception as e:
        print(f"Error {name}: {e}")
