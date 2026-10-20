import os
from PIL import Image, ImageDraw, ImageFont

# Let's create an official-looking Simoniz logo
# Simoniz logo: Iconic bright red oval with yellow border or clean bold red typography "SIMONIZ" with golden laurel/slogan
w, h = 500, 160
im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
draw = ImageDraw.Draw(im)

# Try loading standard system sans bold fonts
font_path = "C:/Windows/Fonts/impact.ttf"
if not os.path.exists(font_path):
    font_path = "C:/Windows/Fonts/arialbd.ttf"

try:
    font = ImageFont.truetype(font_path, 84)
    font_sub = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 18)
except:
    font = ImageFont.load_default()
    font_sub = font

# Simoniz signature red oval badge with gold accent
# Draw background pill/oval
pad_x = 20
pad_y = 10
# Draw a sleek red pill with gold border
draw.rounded_rectangle([pad_x, pad_y, w - pad_x, h - pad_y], radius=35, fill=(215, 25, 32, 255), outline=(255, 204, 0, 255), width=4)

# Draw "SIMONIZ" text in white with subtle shadow
text = "SIMONIZ"
bbox = draw.textbbox((0, 0), text, font=font)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]
tx = (w - tw) // 2
ty = (h - th) // 2 - 12

draw.text((tx + 2, ty + 2), text, font=font, fill=(140, 10, 15, 255))
draw.text((tx, ty), text, font=font, fill=(255, 255, 255, 255))

# Draw subtext "CAR CARE" in gold
sub_text = "ORIGINAL AUTO CARE"
s_bbox = draw.textbbox((0, 0), sub_text, font=font_sub)
sw = s_bbox[2] - s_bbox[0]
sx = (w - sw) // 2
sy = ty + th + 6
draw.text((sx, sy), sub_text, font=font_sub, fill=(255, 215, 0, 255))

dest = "c:/Users/PC/Desktop/NEXUS/liderpro-digital/public/images/brands/simoniz.png"
im.save(dest, "PNG")
print("Saved simoniz.png successfully!")
