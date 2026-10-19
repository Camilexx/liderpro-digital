from PIL import Image
import os
import shutil

src_img = r'C:/Users/PC/.gemini/antigravity/brain/bbbff1a7-d87f-4f17-a9de-dc3f94a57663/.user_uploaded/media_1792380132883_838ba7c3.jpg'
dest_dir = 'public/images/hero'
os.makedirs(dest_dir, exist_ok=True)

with Image.open(src_img) as im:
    print(f"Original image size: {im.size}, mode: {im.mode}, format: {im.format}")
    
    # Save high-res JPG
    dest_jpg = os.path.join(dest_dir, 'local-pedernales.jpg')
    im.save(dest_jpg, 'JPEG', quality=95)
    print(f"Saved {dest_jpg}: {os.path.getsize(dest_jpg)} bytes")
    
    # Also save as webp
    dest_webp = os.path.join(dest_dir, 'local-pedernales.webp')
    im.save(dest_webp, 'WEBP', quality=90)
    print(f"Saved {dest_webp}: {os.path.getsize(dest_webp)} bytes")

    # Overwrite automotive-hero.jpg with this real local photo so any existing links load the store
    hero_jpg = os.path.join(dest_dir, 'automotive-hero.jpg')
    im.save(hero_jpg, 'JPEG', quality=95)
    print(f"Overwrote {hero_jpg}: {os.path.getsize(hero_jpg)} bytes")

    # Also save in public/images/local-pedernales.jpg for direct access
    root_jpg = 'public/images/local-pedernales.jpg'
    im.save(root_jpg, 'JPEG', quality=95)
    print(f"Saved {root_jpg}: {os.path.getsize(root_jpg)} bytes")
