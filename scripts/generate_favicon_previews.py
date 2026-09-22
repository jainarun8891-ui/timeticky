import os
import math
from PIL import Image, ImageDraw

def create_preview_assets():
    svg_dir = os.path.join('public', 'favicons-review')
    os.makedirs(svg_dir, exist_ok=True)
    
    # Also save in artifact directory if available
    artifact_dir = r"C:\Users\jaina\.gemini\antigravity-ide\brain\267dd112-7075-47e2-989d-9a143d26e638"
    os.makedirs(artifact_dir, exist_ok=True)

    opt1_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="opt1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <linearGradient id="opt1-ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#818cf8" />
    </linearGradient>
  </defs>
  <!-- Outer squircle with subtle border glow -->
  <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#opt1-bg)" stroke="#38bdf8" stroke-width="1.6" stroke-opacity="0.45" />
  <!-- Precision dial track -->
  <circle cx="32" cy="32" r="22" fill="none" stroke="url(#opt1-ring)" stroke-width="2.6" />
  <!-- Cardinal Index Ticks (12, 3, 6, 9) -->
  <line x1="32" y1="12" x2="32" y2="16.5" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
  <line x1="52" y1="32" x2="47.5" y2="32" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.85" />
  <line x1="32" y1="52" x2="32" y2="47.5" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.85" />
  <line x1="12" y1="32" x2="16.5" y2="32" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.85" />
  <!-- Clock Hands (10:10 Classic Precision Alignment) -->
  <line x1="32" y1="32" x2="20.5" y2="20.5" stroke="#ffffff" stroke-width="4.8" stroke-linecap="round" />
  <line x1="32" y1="32" x2="45.5" y2="19" stroke="#38bdf8" stroke-width="3.8" stroke-linecap="round" />
  <!-- Atomic Amber Second Pin -->
  <line x1="32" y1="32" x2="32" y2="43" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round" />
  <circle cx="32" cy="32" r="3.6" fill="#f59e0b" />
  <circle cx="32" cy="32" r="1.4" fill="#ffffff" />
</svg>"""

    opt2_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="opt2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1d4ed8" />
      <stop offset="100%" stop-color="#4338ca" />
    </linearGradient>
  </defs>
  <!-- Squircle Base -->
  <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#opt2-bg)" stroke="#93c5fd" stroke-width="1.5" stroke-opacity="0.4" />
  <!-- Bold Globe Perimeter -->
  <circle cx="32" cy="32" r="22" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-opacity="0.95" />
  <!-- Bold Central Prime Meridian Ellipse -->
  <ellipse cx="32" cy="32" rx="9" ry="22" fill="none" stroke="#93c5fd" stroke-width="2.2" stroke-opacity="0.85" />
  <!-- Equator -->
  <line x1="10" y1="32" x2="54" y2="32" stroke="#93c5fd" stroke-width="2.2" stroke-opacity="0.85" />
  <!-- Crisp White Horological Hands -->
  <line x1="32" y1="32" x2="21" y2="19" stroke="#ffffff" stroke-width="4.8" stroke-linecap="round" />
  <line x1="32" y1="32" x2="44.5" y2="22" stroke="#ffffff" stroke-width="3.6" stroke-linecap="round" />
  <!-- Center Jewel -->
  <circle cx="32" cy="32" r="3.6" fill="#ffffff" />
  <circle cx="32" cy="32" r="1.5" fill="#1d4ed8" />
</svg>"""

    opt3_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="opt3-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0e1a" />
      <stop offset="100%" stop-color="#111827" />
    </linearGradient>
    <linearGradient id="opt3-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
  <!-- Squircle Base -->
  <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#opt3-bg)" stroke="#06b6d4" stroke-width="1.8" stroke-opacity="0.5" />
  <!-- Glowing Neon Pulse Ring -->
  <circle cx="32" cy="32" r="22" fill="none" stroke="url(#opt3-cyan)" stroke-width="3.2" />
  <!-- 12 o'clock Sync Beacon -->
  <circle cx="32" cy="10" r="3" fill="#06b6d4" />
  <!-- Minimalist Tech Hands -->
  <line x1="32" y1="32" x2="19.5" y2="19.5" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
  <line x1="32" y1="32" x2="45.5" y2="23" stroke="#22d3ee" stroke-width="3.8" stroke-linecap="round" />
  <!-- Core -->
  <circle cx="32" cy="32" r="3.6" fill="#ffffff" />
  <circle cx="32" cy="32" r="1.5" fill="#0a0e1a" />
</svg>"""

    opt4_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="opt4-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
  </defs>
  <!-- Circular Badge -->
  <circle cx="32" cy="32" r="30" fill="url(#opt4-bg)" stroke="#60a5fa" stroke-width="1.8" />
  <circle cx="32" cy="32" r="23" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-opacity="0.4" />
  <!-- Cardinal Markers -->
  <line x1="32" y1="11" x2="32" y2="16" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" />
  <line x1="53" y1="32" x2="48" y2="32" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" />
  <line x1="32" y1="53" x2="32" y2="48" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" />
  <line x1="11" y1="32" x2="16" y2="32" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" />
  <!-- Chunky Ultra-High Contrast Hands -->
  <line x1="32" y1="32" x2="20" y2="19" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
  <line x1="32" y1="32" x2="45.5" y2="22" stroke="#ffffff" stroke-width="3.8" stroke-linecap="round" />
  <line x1="32" y1="32" x2="32" y2="14" stroke="#fb923c" stroke-width="2.2" stroke-linecap="round" />
  <circle cx="32" cy="32" r="3.2" fill="#fb923c" />
</svg>"""

    # Save all SVGs
    options = [
        ("option-1-chrono.svg", opt1_svg),
        ("option-2-globe.svg", opt2_svg),
        ("option-3-atomic.svg", opt3_svg),
        ("option-4-dualtone.svg", opt4_svg),
    ]

    for filename, content in options:
        path_pub = os.path.join(svg_dir, filename)
        with open(path_pub, "w", encoding="utf-8") as f:
            f.write(content)
        path_art = os.path.join(artifact_dir, filename)
        with open(path_art, "w", encoding="utf-8") as f:
            f.write(content)

    print("SVGs successfully written.")

    # Generate high-res Pillow renderings (512x512 with anti-aliasing) and downsample
    def render_opt1(size=512):
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        scale = size / 64.0
        # Background squircle
        r = 15 * scale
        pad = 2 * scale
        d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=int(r), fill=(15, 23, 42), outline=(56, 189, 248, 115), width=int(max(1, 1.6*scale)))
        # Dial track
        cx, cy = size / 2, size / 2
        cr = 22 * scale
        d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], outline=(56, 189, 248), width=int(max(1, 2.6*scale)))
        # Cardinal ticks
        d.line([cx, 12*scale, cx, 16.5*scale], fill=(255, 255, 255), width=int(max(1, 3*scale)) )
        d.line([cx + cr - 3*scale, cy, cx + cr + 1.5*scale, cy], fill=(255, 255, 255), width=int(max(1, 2.5*scale)) )
        d.line([cx, cx + cr - 3*scale, cx, cx + cr + 1.5*scale], fill=(255, 255, 255), width=int(max(1, 2.5*scale)) )
        d.line([cx - cr - 1.5*scale, cy, cx - cr + 3*scale, cy], fill=(255, 255, 255), width=int(max(1, 2.5*scale)) )
        # Hour hand (10 o'clock)
        d.line([cx, cy, 20.5*scale, 20.5*scale], fill=(255, 255, 255), width=int(max(1, 4.8*scale)))
        # Minute hand (2 o'clock)
        d.line([cx, cy, 45.5*scale, 19*scale], fill=(56, 189, 248), width=int(max(1, 3.8*scale)))
        # Second pin
        d.line([cx, cy, cx, 43*scale], fill=(245, 158, 11), width=int(max(1, 1.8*scale)))
        # Center jewel
        jr = 3.6 * scale
        d.ellipse([cx - jr, cy - jr, cx + jr, cy + jr], fill=(245, 158, 11))
        jr2 = 1.4 * scale
        d.ellipse([cx - jr2, cy - jr2, cx + jr2, cy + jr2], fill=(255, 255, 255))
        return img

    def render_opt2(size=512):
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        scale = size / 64.0
        r = 15 * scale
        pad = 2 * scale
        d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=int(r), fill=(29, 78, 216), outline=(147, 197, 253, 100), width=int(max(1, 1.5*scale)))
        cx, cy = size / 2, size / 2
        cr = 22 * scale
        d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], outline=(255, 255, 255, 240), width=int(max(1, 2.8*scale)))
        # Meridian
        d.ellipse([cx - 9*scale, cy - cr, cx + 9*scale, cy + cr], outline=(147, 197, 253, 220), width=int(max(1, 2.2*scale)))
        # Equator
        d.line([cx - cr, cy, cx + cr, cy], fill=(147, 197, 253, 220), width=int(max(1, 2.2*scale)))
        # Hands
        d.line([cx, cy, 21*scale, 19*scale], fill=(255, 255, 255), width=int(max(1, 4.8*scale)))
        d.line([cx, cy, 44.5*scale, 22*scale], fill=(255, 255, 255), width=int(max(1, 3.6*scale)))
        # Center
        jr = 3.6 * scale
        d.ellipse([cx - jr, cy - jr, cx + jr, cy + jr], fill=(255, 255, 255))
        jr2 = 1.5 * scale
        d.ellipse([cx - jr2, cy - jr2, cx + jr2, cy + jr2], fill=(29, 78, 216))
        return img

    def render_opt3(size=512):
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        scale = size / 64.0
        r = 15 * scale
        pad = 2 * scale
        d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=int(r), fill=(10, 14, 26), outline=(6, 182, 212, 128), width=int(max(1, 1.8*scale)))
        cx, cy = size / 2, size / 2
        cr = 22 * scale
        d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], outline=(6, 182, 212), width=int(max(1, 3.2*scale)))
        # 12 o'clock beacon
        br = 3 * scale
        d.ellipse([cx - br, 10*scale - br, cx + br, 10*scale + br], fill=(6, 182, 212))
        # Hands
        d.line([cx, cy, 19.5*scale, 19.5*scale], fill=(255, 255, 255), width=int(max(1, 5*scale)))
        d.line([cx, cy, 45.5*scale, 23*scale], fill=(34, 211, 238), width=int(max(1, 3.8*scale)))
        jr = 3.6 * scale
        d.ellipse([cx - jr, cy - jr, cx + jr, cy + jr], fill=(255, 255, 255))
        jr2 = 1.5 * scale
        d.ellipse([cx - jr2, cy - jr2, cx + jr2, cy + jr2], fill=(10, 14, 26))
        return img

    def render_opt4(size=512):
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        scale = size / 64.0
        cx, cy = size / 2, size / 2
        cr_outer = 30 * scale
        d.ellipse([cx - cr_outer, cy - cr_outer, cx + cr_outer, cy + cr_outer], fill=(37, 99, 235), outline=(96, 165, 250), width=int(max(1, 1.8*scale)))
        cr = 23 * scale
        d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], outline=(255, 255, 255, 102), width=int(max(1, 2.2*scale)))
        # Cardinal markers
        d.line([cx, 11*scale, cx, 16*scale], fill=(255, 255, 255), width=int(max(1, 3.2*scale)))
        d.line([cx + cr - 2*scale, cy, cx + cr + 3*scale, cy], fill=(255, 255, 255), width=int(max(1, 2.4*scale)))
        d.line([cx, cx + cr - 2*scale, cx, cx + cr + 3*scale], fill=(255, 255, 255), width=int(max(1, 2.4*scale)))
        d.line([cx - cr - 3*scale, cy, cx - cr + 2*scale, cy], fill=(255, 255, 255), width=int(max(1, 2.4*scale)))
        # Hands
        d.line([cx, cy, 20*scale, 19*scale], fill=(255, 255, 255), width=int(max(1, 5*scale)))
        d.line([cx, cy, 45.5*scale, 22*scale], fill=(255, 255, 255), width=int(max(1, 3.8*scale)))
        d.line([cx, cy, cx, 14*scale], fill=(251, 146, 60), width=int(max(1, 2.2*scale)))
        jr = 3.2 * scale
        d.ellipse([cx - jr, cy - jr, cx + jr, cy + jr], fill=(251, 146, 60))
        return img

    renderers = [
        ("opt1", render_opt1),
        ("opt2", render_opt2),
        ("opt3", render_opt3),
        ("opt4", render_opt4),
    ]

    for name, fn in renderers:
        hi_res = fn(512)
        # Save 128x128 preview
        p128 = hi_res.resize((128, 128), Image.Resampling.LANCZOS)
        p128.save(os.path.join(svg_dir, f"{name}-128.png"))
        p128.save(os.path.join(artifact_dir, f"{name}-128.png"))
        
        # Save 32x32 retina preview
        p32 = hi_res.resize((32, 32), Image.Resampling.LANCZOS)
        p32.save(os.path.join(svg_dir, f"{name}-32.png"))
        p32.save(os.path.join(artifact_dir, f"{name}-32.png"))

        # Save 16x16 standard preview
        p16 = hi_res.resize((16, 16), Image.Resampling.LANCZOS)
        p16.save(os.path.join(svg_dir, f"{name}-16.png"))
        p16.save(os.path.join(artifact_dir, f"{name}-16.png"))

    # Also grab current favicon for comparison
    if os.path.exists("public/favicon.ico"):
        cur_ico = Image.open("public/favicon.ico")
        cur_128 = cur_ico.resize((128, 128), Image.Resampling.LANCZOS)
        cur_128.save(os.path.join(svg_dir, "current-128.png"))
        cur_128.save(os.path.join(artifact_dir, "current-128.png"))
        cur_32 = cur_ico.resize((32, 32), Image.Resampling.LANCZOS)
        cur_32.save(os.path.join(svg_dir, "current-32.png"))
        cur_32.save(os.path.join(artifact_dir, "current-32.png"))
        cur_16 = cur_ico.resize((16, 16), Image.Resampling.LANCZOS)
        cur_16.save(os.path.join(svg_dir, "current-16.png"))
        cur_16.save(os.path.join(artifact_dir, "current-16.png"))

    print("Rasterized PNGs rendered and saved.")

if __name__ == "__main__":
    create_preview_assets()
