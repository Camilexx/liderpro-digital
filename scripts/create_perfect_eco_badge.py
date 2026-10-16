import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# 600x600 high res badge, downscaled to 180x180 for razor-sharp rendering
S = 600
badge = Image.new('RGBA', (S, S), (0, 0, 0, 0))
draw = ImageDraw.Draw(badge)

cx, cy = S // 2, S // 2
r_outer = 270
r_border = 260
r_inner = 240

# Outer drop shadow
for dr in range(20, 0, -1):
    alpha = int(25 * (1 - dr / 20.0))
    draw.ellipse((cx - r_outer - dr, cy - r_outer - dr, cx + r_outer + dr, cy + r_outer + dr), fill=(0, 0, 0, alpha))

# Solid pure white badge circle
draw.ellipse((cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), fill=(255, 255, 255, 255), outline=(22, 163, 74, 255), width=10)
draw.ellipse((cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner), outline=(34, 197, 94, 200), width=4)

font_top = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 26)
font_center = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 36)
font_bot = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 24)

# Top curved text: "RECICLAJE CERTIFICADO"
top_text = "RECICLAJE CERTIFICADO"
start_angle = -145
end_angle = -35
n = len(top_text)
step = (end_angle - start_angle) / (n - 1)
radius_text = 205

for i, ch in enumerate(top_text):
    ang = start_angle + i * step
    rad = math.radians(ang)
    x = cx + radius_text * math.cos(rad)
    y = cy + radius_text * math.sin(rad)
    
    char_img = Image.new('RGBA', (80, 80), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(char_img)
    bbox = font_top.getbbox(ch)
    cw, ch_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    cdraw.text((40 - cw//2, 40 - ch_h//2), ch, font=font_top, fill=(21, 128, 61, 255))
    rot_img = char_img.rotate(-ang - 90, resample=Image.Resampling.BICUBIC, center=(40, 40))
    badge.alpha_composite(rot_img, (int(x - 40), int(y - 40)))

# Bottom text: horizontal, elegant
t_bot1 = "ECO-VALOR"
bbox = font_center.getbbox(t_bot1)
w = bbox[2] - bbox[0]
draw.text((cx - w//2, cy + 130), t_bot1, font=font_center, fill=(21, 128, 61, 255))

t_bot2 = "BATERÍAS ECUADOR"
bbox2 = font_bot.getbbox(t_bot2)
w2 = bbox2[2] - bbox2[0]
draw.text((cx - w2//2, cy + 180), t_bot2, font=font_bot, fill=(75, 85, 99, 255))

# Draw 3-arrow recycling icon in center (between cy-70 and cy+70)
# Draw 3 chasing arrow arcs
arrow_color = (22, 163, 74, 255)
arrow_head_color = (21, 128, 61, 255)

for rot in [0, 120, 240]:
    arr_img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    adraw = ImageDraw.Draw(arr_img)
    
    # arc ribbon
    pts = []
    for deg in range(0, 75, 3):
        rad = math.radians(deg)
        pts.append((cx + 90 * math.cos(rad), cy - 10 + 90 * math.sin(rad)))
    for deg in range(72, -1, -3):
        rad = math.radians(deg)
        pts.append((cx + 68 * math.cos(rad), cy - 10 + 68 * math.sin(rad)))
    adraw.polygon(pts, fill=arrow_color)
    
    # Arrow head
    rad_tip = math.radians(82)
    head = [
        (cx + 105 * math.cos(rad_tip), cy - 10 + 105 * math.sin(rad_tip)),
        (cx + 53 * math.cos(rad_tip), cy - 10 + 53 * math.sin(rad_tip)),
        (cx + 79 * math.cos(math.radians(102)), cy - 10 + 79 * math.sin(math.radians(102)))
    ]
    adraw.polygon(head, fill=arrow_head_color)
    
    rotated = arr_img.rotate(rot, resample=Image.Resampling.BICUBIC, center=(cx, cy - 10))
    badge.alpha_composite(rotated)

# Green leaf in very center of arrows
leaf_pts = [
    (cx, cy - 40),
    (cx + 25, cy - 10),
    (cx, cy + 20),
    (cx - 25, cy - 10)
]
draw.polygon(leaf_pts, fill=(34, 197, 94, 255))
# Leaf stem
draw.line([(cx, cy - 35), (cx, cy + 25)], fill=(21, 128, 61, 255), width=3)

# Resize to 200x200
final_badge = badge.resize((200, 200), Image.Resampling.LANCZOS)
final_badge.save('scripts/eco_badge_perfect.png')
print("Successfully generated scripts/eco_badge_perfect.png")
