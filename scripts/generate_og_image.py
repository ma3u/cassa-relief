#!/usr/bin/env python3
"""Generate Open Graph / Social Preview image (1200×630 px) for graph-eAkte.

Requires: Pillow  (pip install pillow)
Output  : public/og-preview.png
"""

from PIL import Image, ImageDraw, ImageFont
import os, math

OUT_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "og-preview.png")
W, H = 1200, 630

# ── Colours (matches oklch design tokens) ──
BG_DARK   = (18, 24, 42)       # Deep Navy
BG_MID    = (28, 36, 60)
ACCENT    = (180, 60, 50)      # Signal Red
ACCENT2   = (60, 120, 220)     # Electric Blue
TEXT_HEAD = (245, 245, 250)
TEXT_SUB  = (170, 175, 195)
TEXT_MUTE = (110, 118, 145)
NODE_CLR  = [(60,130,220),(200,80,60),(60,180,120),(170,90,200),(220,160,40)]

img  = Image.new("RGB", (W, H), BG_DARK)
draw = ImageDraw.Draw(img)

# ── Background gradient bands ──
for y in range(H):
    t = y / H
    r = int(BG_DARK[0] + (BG_MID[0]-BG_DARK[0])*t)
    g = int(BG_DARK[1] + (BG_MID[1]-BG_DARK[1])*t)
    b = int(BG_DARK[2] + (BG_MID[2]-BG_DARK[2])*t)
    draw.line([(0,y),(W,y)], fill=(r,g,b))

# ── Decorative graph nodes / edges (top-right area) ──
import random
random.seed(42)
nodes = [(900+random.randint(-180,230), 80+random.randint(-30,280)) for _ in range(18)]
for i, (x1,y1) in enumerate(nodes):
    for j, (x2,y2) in enumerate(nodes):
        if j <= i: continue
        dist = math.hypot(x2-x1, y2-y1)
        if dist < 140:
            alpha = int(80 * (1 - dist/140))
            draw.line([(x1,y1),(x2,y2)], fill=(80,100,160, alpha), width=1)
for i,(x,y) in enumerate(nodes):
    c = NODE_CLR[i % len(NODE_CLR)]
    r = random.randint(6,14)
    draw.ellipse([(x-r,y-r),(x+r,y+r)], fill=c, outline=(255,255,255,60), width=1)

# ── Accent bar left ──
draw.rectangle([(0,0),(6,H)], fill=ACCENT)

# ── Badge pill ──
pill_x, pill_y, pill_w, pill_h = 60, 60, 320, 36
draw.rounded_rectangle([(pill_x,pill_y),(pill_x+pill_w,pill_y+pill_h)],
                        radius=18, fill=(40,55,100))
badge_text = "Graph  •  GraphRAG  •  Neo4j"
try:
    f_badge = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 15)
except:
    f_badge = ImageFont.load_default()
draw.text((pill_x+16, pill_y+9), badge_text, font=f_badge, fill=ACCENT2)

# ── Main headline ──
try:
    f_h1 = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 62)
except:
    try:
        f_h1 = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 62)
    except:
        f_h1 = ImageFont.load_default()

headline1 = "KI-gestützte E-AKTE"
headline2 = "mit Knowledge Graph"
draw.text((60, 120), headline1, font=f_h1, fill=TEXT_HEAD)
draw.text((60, 195), headline2, font=f_h1, fill=TEXT_HEAD)

# ── Accent underline ──
draw.rectangle([(60, 278),(440, 284)], fill=ACCENT)

# ── Subline ──
try:
    f_sub = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
except:
    f_sub = ImageFont.load_default()

sub1 = "GraphRAG · Neo4j · APOC · GDS · OCR · DSGVO-konform"
sub2 = "Demo-Fall: Bedarfsgemeinschaft Becker · SGB II · Jobcenter"
draw.text((60, 306), sub1, font=f_sub, fill=TEXT_SUB)
draw.text((60, 340), sub2, font=f_sub, fill=TEXT_MUTE)

# ── Feature pills row ──
try:
    f_pill = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 18)
except:
    f_pill = ImageFont.load_default()

features = ["OCR & Volltext", "Vollständigkeitsprüfung", "Datenschutz-KI", "BPMN 2.0", "Neo4j GraphRAG"]
px = 60
py = 410
for feat in features:
    bbox = draw.textbbox((0,0), feat, font=f_pill)
    fw = bbox[2]-bbox[0]
    pad = 20
    pw = fw + pad*2
    ph = 34
    draw.rounded_rectangle([(px,py),(px+pw,py+ph)], radius=17, fill=(35,50,90))
    draw.rounded_rectangle([(px,py),(px+pw,py+ph)], radius=17, outline=(70,90,150), width=1)
    draw.text((px+pad, py+8), feat, font=f_pill, fill=ACCENT2)
    px += pw + 12

# ── Bottom URL bar ──
draw.rectangle([(0, H-56),(W, H)], fill=(22,30,52))
draw.line([(0, H-56),(W, H-56)], fill=(50,65,100), width=1)
try:
    f_url = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 18)
except:
    f_url = ImageFont.load_default()
draw.text((60, H-38), "ma3u.github.io/graph-eAkte", font=f_url, fill=TEXT_MUTE)
draw.text((W-380, H-38), "Open Source · Apache 2.0 · lokal betreibbar", font=f_url, fill=TEXT_MUTE)

img.save(OUT_PATH, "PNG", optimize=True)
print(f"Saved: {OUT_PATH}  ({W}x{H})")
