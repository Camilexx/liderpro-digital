from PIL import Image

for sample in ['public/images/products/spec-078AO-2841.png', 
               'public/images/products/spec-080AC-11105.png',
               'public/images/products/spec-078AFP-179.png',
               'public/images/products/advance-oil-filter.png',
               'public/images/products/advance-cabin-filter.png',
               'public/images/products/advance-fuel-filter.png']:
    try:
        with Image.open(sample) as im:
            print(f"{sample:<50} | size={im.size} | mode={im.mode}")
    except Exception as e:
        print(f"Error {sample}: {e}")
