from PIL import Image
import numpy as np

def clean_white_bg(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)
    
    # rgb channels
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
    
    # The BE background is very uniform light grey ~ 240-244
    # Detect background: where r > 230 and g > 230 and b > 230 and abs(r-g) < 4 and abs(g-b) < 4
    # For background pixels, we can map [235, 245] to 255
    diff1 = np.abs(r - g)
    diff2 = np.abs(g - b)
    is_neutral_light = (r > 225) & (g > 225) & (b > 225) & (diff1 < 6) & (diff2 < 6)
    
    # Scale neutral light pixels towards 255
    factor = np.clip((r - 225) / (241 - 225), 0.0, 1.0)
    
    # Where is_neutral_light is true, blend towards 255
    for c in range(3):
        arr[:, :, c] = np.where(is_neutral_light, arr[:, :, c] + (255 - arr[:, :, c]) * factor, arr[:, :, c])
    
    res = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), mode="RGBA").convert("RGB")
    res.save(out_path, "PNG", optimize=True)
    print(f"Processed {img_path} -> {out_path}")

clean_white_bg("public/images/products/official_be/42-01.webp", "public/images/products/test-clean-be-42.png")
clean_white_bg("public/images/products/official_be/27fe-1.webp", "public/images/products/test-clean-be-27fe.png")
