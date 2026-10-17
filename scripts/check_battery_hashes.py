import os
import hashlib

def get_md5(path):
    if not os.path.isfile(path):
        return None
    with open(path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

def main():
    pdir = "public/images/products"
    files = os.listdir(pdir)
    
    # Check all spec-030... (Baterias Ecuador)
    ecuador_specs = [f for f in files if f.startswith("spec-030")]
    print(f"Total spec-030 files: {len(ecuador_specs)}")
    
    # Hash all generated images in pdir
    hashes = {}
    for f in files:
        full_p = os.path.join(pdir, f)
        h = get_md5(full_p)
        hashes.setdefault(h, []).append(f)

    # Let's see which spec files share hash with studio images
    studio_images = [
        "bosch-s4-group24.png", "bosch-s4-group27.png", "bosch-s4-group42.png",
        "bosch-s4-ns40.png", "bosch-s5-b65.png", "bosch-s3-group42.png",
        "ecuador-fe-group24.png", "ecuador-hp-group24.png", "ecuador-fe-group42.png",
        "ecuador-hp-group42.png", "ecuador-hp-group27.png", "ecuador-fe-ns40.png",
        "ecuador-hp-ns40.png"
    ]
    
    print("\nStudio images status:")
    for s in studio_images:
        sp = os.path.join(pdir, s)
        h = get_md5(sp)
        matches = [m for m in hashes.get(h, []) if m != s]
        print(f"  {s}: size={os.path.getsize(sp) if os.path.exists(sp) else 'N/A'} | matches={matches}")

    # Check which spec-030 files DO NOT match their expected model!
    print("\nChecking all spec-030 files:")
    for sf in sorted(ecuador_specs):
        sp = os.path.join(pdir, sf)
        sz = os.path.getsize(sp)
        h = get_md5(sp)
        matching_studio = [m for m in hashes.get(h, []) if m in studio_images]
        print(f"  {sf:<26} size={sz} -> studio match: {matching_studio}")

if __name__ == "__main__":
    main()
