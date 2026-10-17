import os
from PIL import Image

pdir = "public/images/products"

def check_img(name):
    p = os.path.join(pdir, name)
    if os.path.exists(p):
        with Image.open(p) as im:
            print(f"{name:<28}: format={im.format}, size={im.size}, mode={im.mode}, filesize={os.path.getsize(p)}")
    else:
        print(f"{name:<28}: DOES NOT EXIST")

print("--- COMPARING SPEC vs STUDIO ---")
check_img("spec-03024-FE.png")
check_img("ecuador-fe-group24.png")

check_img("spec-03024-HP-I.png")
check_img("ecuador-hp-group24.png")

check_img("spec-03042-FE.png")
check_img("ecuador-fe-group42.png")

check_img("spec-03042-HP.png")
check_img("ecuador-hp-group42.png")

check_img("spec-03027-HP.png")
check_img("ecuador-hp-group27.png")

check_img("spec-030NS40-FE.png")
check_img("ecuador-fe-ns40.png")

check_img("spec-030NS40-HP.png")
check_img("ecuador-hp-ns40.png")

check_img("spec-02724HPS4.png")
check_img("bosch-s4-group24.png")

check_img("spec-02727HPS4.png")
check_img("bosch-s4-group27.png")

check_img("spec-02742FES3.png")
check_img("bosch-s3-group42.png")

check_img("spec-0277B6548.png")
check_img("bosch-s5-b65.png")

check_img("spec-02742HPIS4.png")
check_img("bosch-s4-group42.png")

check_img("spec-027NS40FEFS4.png")
check_img("bosch-s4-ns40.png")
