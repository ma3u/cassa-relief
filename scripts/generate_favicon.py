#!/usr/bin/env python3
"""Generate favicon set for graph-eAkte.

Outputs:
  public/favicon.svg          – vector, all modern browsers
  public/favicon-32x32.png    – standard browser tab
  public/favicon-16x16.png    – legacy / small
  public/apple-touch-icon.png – iOS home screen (180x180)
  public/favicon.ico          – IE / bundler fallback (16+32 embedded)

Design: dark navy rounded square, three coloured graph nodes connected
        by white semi-transparent edges — matches the site's OG image.
"""

import os, struct, io, math
from PIL import Image, ImageDraw

PUBLIC = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public")

# ── Colours ──────────────────────────────────────────────────────────────────
BG      = (28, 36, 68)     # deep navy
BLUE    = (60, 128, 224)   # electric blue node
RED     = (192, 72, 56)    # signal red node
GREEN   = (56, 180, 120)   # teal node
EDGE    = (255, 255, 255, 90)  # white, semi-transparent

SVG_CONTENT = """\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <radialGradient id="bg" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#2a3a6a"/>
      <stop offset="100%" stop-color="#1a2240"/>
    </radialGradient>
  </defs>
  <rect width="32" height="32" rx="7" fill="url(#bg)"/>
  <!-- edges -->
  <line x1="9.5" y1="9.5"  x2="22.5" y2="9.5"  stroke="white" stroke-width="1.4" stroke-opacity="0.45"/>
  <line x1="9.5" y1="9.5"  x2="16"   y2="22.5" stroke="white" stroke-width="1.4" stroke-opacity="0.45"/>
  <line x1="22.5" y1="9.5" x2="16"   y2="22.5" stroke="white" stroke-width="1.4" stroke-opacity="0.45"/>
  <!-- nodes with glow effect -->
  <circle cx="9.5"  cy="9.5"  r="5.5" fill="#3c80e0" opacity="0.25"/>
  <circle cx="22.5" cy="9.5"  r="5.5" fill="#c04838" opacity="0.25"/>
  <circle cx="16"   cy="22.5" r="5.5" fill="#38b478" opacity="0.25"/>
  <circle cx="9.5"  cy="9.5"  r="4"   fill="#4a90f0"/>
  <circle cx="22.5" cy="9.5"  r="4"   fill="#d05040"/>
  <circle cx="16"   cy="22.5" r="4"   fill="#3cc480"/>
</svg>
"""


def make_icon(size: int) -> Image.Image:
    """Draw the favicon at given pixel size with LANCZOS anti-aliasing."""
    SCALE = 4                          # render at 4× then downscale
    S = size * SCALE
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img, "RGBA")

    # rounded background
    r = round(S * 0.22)
    d.rounded_rectangle([(0, 0), (S - 1, S - 1)], radius=r, fill=BG + (255,))

    # node positions (relative to 32-grid, scaled)
    def pos(x, y):
        return (round(x / 32 * S), round(y / 32 * S))

    n1 = pos(9.5,  9.5)
    n2 = pos(22.5, 9.5)
    n3 = pos(16,   22.5)

    # edges
    ew = max(1, round(S * 0.044))
    d.line([n1, n2], fill=EDGE, width=ew)
    d.line([n1, n3], fill=EDGE, width=ew)
    d.line([n2, n3], fill=EDGE, width=ew)

    # glow halos
    for (cx, cy), col in [(n1, BLUE), (n2, RED), (n3, GREEN)]:
        hr = round(S * 0.175)
        d.ellipse([(cx - hr, cy - hr), (cx + hr, cy + hr)],
                  fill=col + (50,))

    # solid nodes
    for (cx, cy), col in [(n1, BLUE), (n2, RED), (n3, GREEN)]:
        nr = round(S * 0.128)
        d.ellipse([(cx - nr, cy - nr), (cx + nr, cy + nr)],
                  fill=col + (255,))

    return img.resize((size, size), Image.LANCZOS)


# ── Save SVG ──────────────────────────────────────────────────────────────────
svg_path = os.path.join(PUBLIC, "favicon.svg")
with open(svg_path, "w", encoding="utf-8") as f:
    f.write(SVG_CONTENT)
print(f"Saved: {svg_path}")

# ── Save PNGs ─────────────────────────────────────────────────────────────────
for size, name in [(32, "favicon-32x32.png"), (16, "favicon-16x16.png"), (180, "apple-touch-icon.png")]:
    p = os.path.join(PUBLIC, name)
    make_icon(size).save(p, "PNG")
    print(f"Saved: {p}  ({size}x{size})")

# ── Save .ico (16 + 32 embedded) ──────────────────────────────────────────────
ico_path = os.path.join(PUBLIC, "favicon.ico")
img16 = make_icon(16)
img32 = make_icon(32)
# PIL can write multi-size .ico natively
img32.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32)],
           append_images=[img16])
print(f"Saved: {ico_path}  (16+32 embedded)")
