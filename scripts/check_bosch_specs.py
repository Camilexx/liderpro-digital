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
    
    # Check all spec-027... (Bosch batteries)
    bosch_specs = [f for f in files if f.startswith("spec-027")]
    print(f"Total spec-027 files: {len(bosch_specs)}")
    
    for bf in sorted(bosch_specs):
        sp = os.path.join(pdir, bf)
        sz = os.path.getsize(sp)
        print(f"  {bf:<26} size={sz}")

if __name__ == "__main__":
    main()
