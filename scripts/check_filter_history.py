import os

with open('scripts/generate_filter_images.py' if os.path.exists('scripts/generate_filter_images.py') else 'package.json', 'r') as f:
    print(f.read()[:500])

# check any scripts mentioning filter
for f in os.listdir('scripts'):
    if 'filter' in f:
        print("Found script:", f)
