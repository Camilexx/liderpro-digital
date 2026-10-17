import os

def list_files(d):
    if not os.path.exists(d):
        print(f"Directory {d} does not exist")
        return
    print(f"\n--- Files in {d} ---")
    files = sorted(os.listdir(d))
    for f in files:
        p = os.path.join(d, f)
        if os.path.isfile(p):
            print(f"{f:<35} | {os.path.getsize(p):>8} B")

list_files('public/images/products/official_be')
list_files('public/images/products/official_bosch')

print("\n--- Studio files in public/images/products/ matching ecuador/bosch/support/terminals ---")
for f in sorted(os.listdir('public/images/products')):
    if any(k in f for k in ['ecuador', 'bosch', 'support', 'ecovalor', 'terminals']):
        p = os.path.join('public/images/products', f)
        print(f"{f:<35} | {os.path.getsize(p):>8} B")
