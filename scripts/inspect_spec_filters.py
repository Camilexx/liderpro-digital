import os
import hashlib
from collections import defaultdict

spec_files = [f for f in os.listdir('public/images/products') if f.startswith('spec-')]
print(f"Total spec- files: {len(spec_files)}")

type_groups = defaultdict(list)
for f in spec_files:
    p = os.path.join('public/images/products', f)
    size = os.path.getsize(p)
    with open(p, 'rb') as fp:
        h = hashlib.md5(fp.read()).hexdigest()
    if 'AO' in f:
        grp = 'oil'
    elif 'AC' in f:
        grp = 'cabin'
    elif 'AF' in f:
        grp = 'fuel'
    elif any(k in f for k in ['030', '027', '42HP']):
        grp = 'battery'
    else:
        grp = 'other'
    type_groups[grp].append((f, size, h))

for grp, items in type_groups.items():
    print(f"\nGroup: {grp} ({len(items)} files)")
    hashes = set(x[2] for x in items)
    sizes = set(x[1] for x in items)
    print(f"  Distinct hashes: {len(hashes)}, Distinct sizes: {len(sizes)}")
    for f, size, h in items[:4]:
        print(f"    {f:<35} | {size:>8} B | {h}")
