import os

brain_root = r"C:\Users\PC\.gemini\antigravity\brain"
for folder in os.listdir(brain_root):
    fpath = os.path.join(brain_root, folder)
    if os.path.isdir(fpath):
        imgs = [f for f in os.listdir(fpath) if f.endswith(('.png', '.jpg', '.jpeg', '.webp'))]
        if imgs:
            print(f"\nFolder {folder}: {len(imgs)} images")
            for img in imgs:
                sz = os.path.getsize(os.path.join(fpath, img))
                print(f"  {img} ({sz} bytes)")
