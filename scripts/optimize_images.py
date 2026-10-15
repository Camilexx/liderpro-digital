import os
import glob
from PIL import Image

def optimize_images():
    base_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')
    print(f"Scanning images in: {base_dir}")

    total_orig_bytes = 0
    total_new_bytes = 0
    optimized_count = 0

    # 1. Optimize Hero JPEG
    hero_path = os.path.join(base_dir, 'hero', 'automotive-hero.jpg')
    if os.path.exists(hero_path):
        orig_size = os.path.getsize(hero_path)
        total_orig_bytes += orig_size
        img = Image.open(hero_path)
        img.save(hero_path, 'JPEG', quality=84, optimize=True, progressive=True)
        new_size = os.path.getsize(hero_path)
        total_new_bytes += new_size
        optimized_count += 1
        print(f"Hero Image optimized: {orig_size / 1024:.1f} KB -> {new_size / 1024:.1f} KB (saved {((orig_size - new_size) / orig_size) * 100:.1f}%)")

    # 2. Optimize Product PNGs
    products_dir = os.path.join(base_dir, 'products')
    png_files = glob.glob(os.path.join(products_dir, '*.png'))
    print(f"\nProcessing {len(png_files)} product images...")

    for fpath in png_files:
        orig_size = os.path.getsize(fpath)
        total_orig_bytes += orig_size

        try:
            with Image.open(fpath) as img:
                # If image is RGBA and large, optimize compression
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    # Save with maximum PNG compression level
                    img.save(fpath, 'PNG', optimize=True, compress_level=9)
                else:
                    img = img.convert('RGB')
                    img.save(fpath, 'PNG', optimize=True, compress_level=9)

                new_size = os.path.getsize(fpath)
                total_new_bytes += new_size
                optimized_count += 1
        except Exception as e:
            print(f"Error optimizing {fpath}: {e}")
            total_new_bytes += orig_size

    saved_mb = (total_orig_bytes - total_new_bytes) / (1024 * 1024)
    print("\n--- RESUMEN DE OPTIMIZACIÓN ---")
    print(f"Imágenes procesadas: {optimized_count}")
    print(f"Peso original total: {total_orig_bytes / (1024 * 1024):.2f} MB")
    print(f"Peso nuevo total: {total_new_bytes / (1024 * 1024):.2f} MB")
    print(f"Ahorro de ancho de banda: {saved_mb:.2f} MB ({((total_orig_bytes - total_new_bytes) / total_orig_bytes) * 100:.1f}%)")

if __name__ == '__main__':
    optimize_images()
