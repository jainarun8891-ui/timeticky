import os
import sys
from PIL import Image, ImageDraw

def render_opt1(size=512):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    scale = size / 64.0
    # Background squircle
    r = 15 * scale
    pad = 2 * scale
    d.rounded_rectangle(
        [pad, pad, size - pad, size - pad],
        radius=int(r),
        fill=(15, 23, 42),
        outline=(56, 189, 248, 115),
        width=int(max(1, 1.6 * scale))
    )
    # Dial track
    cx, cy = size / 2, size / 2
    cr = 22 * scale
    d.ellipse(
        [cx - cr, cy - cr, cx + cr, cy + cr],
        outline=(56, 189, 248),
        width=int(max(1, 2.6 * scale))
    )
    # Cardinal ticks
    d.line([cx, 12 * scale, cx, 16.5 * scale], fill=(255, 255, 255), width=int(max(1, 3 * scale)))
    d.line([cx + cr - 3 * scale, cy, cx + cr + 1.5 * scale, cy], fill=(255, 255, 255), width=int(max(1, 2.5 * scale)))
    d.line([cx, cx + cr - 3 * scale, cx, cx + cr + 1.5 * scale], fill=(255, 255, 255), width=int(max(1, 2.5 * scale)))
    d.line([cx - cr - 1.5 * scale, cy, cx - cr + 3 * scale, cy], fill=(255, 255, 255), width=int(max(1, 2.5 * scale)))
    # Hour hand (10 o'clock)
    d.line([cx, cy, 20.5 * scale, 20.5 * scale], fill=(255, 255, 255), width=int(max(1, 4.8 * scale)))
    # Minute hand (2 o'clock)
    d.line([cx, cy, 45.5 * scale, 19 * scale], fill=(56, 189, 248), width=int(max(1, 3.8 * scale)))
    # Second pin
    d.line([cx, cy, cx, 43 * scale], fill=(245, 158, 11), width=int(max(1, 1.8 * scale)))
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
    d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=int(r), fill=(29, 78, 216), outline=(147, 197, 253, 100), width=int(max(1, 1.5 * scale)))
    cx, cy = size / 2, size / 2
    cr = 22 * scale
    d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], outline=(255, 255, 255, 240), width=int(max(1, 2.8 * scale)))
    d.ellipse([cx - 9 * scale, cy - cr, cx + 9 * scale, cy + cr], outline=(147, 197, 253, 220), width=int(max(1, 2.2 * scale)))
    d.line([cx - cr, cy, cx + cr, cy], fill=(147, 197, 253, 220), width=int(max(1, 2.2 * scale)))
    d.line([cx, cy, 21 * scale, 19 * scale], fill=(255, 255, 255), width=int(max(1, 4.8 * scale)))
    d.line([cx, cy, 44.5 * scale, 22 * scale], fill=(255, 255, 255), width=int(max(1, 3.6 * scale)))
    jr = 3.6 * scale
    d.ellipse([cx - jr, cy - jr, cx + jr, cy + jr], fill=(255, 255, 255))
    jr2 = 1.5 * scale
    d.ellipse([cx - jr2, cy - jr2, cx + jr2, cy + jr2], fill=(29, 78, 216))
    return img

def apply_favicon(option_num="1"):
    renderers = {
        "1": (render_opt1, "option-1-chrono.svg"),
        "2": (render_opt2, "option-2-globe.svg"),
    }
    
    if str(option_num) not in renderers:
        print(f"Error: Invalid option {option_num}. Choose 1 or 2.")
        sys.exit(1)
        
    render_fn, svg_filename = renderers[str(option_num)]
    
    # 1. Update public/favicon.svg
    src_svg = os.path.join("public", "favicons-review", svg_filename)
    dest_svg = os.path.join("public", "favicon.svg")
    with open(src_svg, "r", encoding="utf-8") as f_in:
        content = f_in.read()
    with open(dest_svg, "w", encoding="utf-8") as f_out:
        f_out.write(content)
    print("Updated public/favicon.svg")
    
    # Render master high-res image (512x512)
    master_512 = render_fn(512)
    
    # 2. Save public/icon-512.png
    master_512.save("public/icon-512.png")
    print("Updated public/icon-512.png")
    
    # 3. Save public/icon-192.png
    img_192 = master_512.resize((192, 192), Image.Resampling.LANCZOS)
    img_192.save("public/icon-192.png")
    print("Updated public/icon-192.png")
    
    # 4. Save public/apple-touch-icon.png (180x180)
    img_180 = master_512.resize((180, 180), Image.Resampling.LANCZOS)
    img_180.save("public/apple-touch-icon.png")
    print("Updated public/apple-touch-icon.png")
    
    # 5. Generate crisp multi-resolution ICO (16, 32, 48, 64, 128, 256)
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    
    # Save to public/favicon.ico
    master_512.save("public/favicon.ico", format="ICO", sizes=sizes)
    print("Updated public/favicon.ico (multi-resolution ICO with 16, 32, 48, 64, 128, 256 frames)")
    
    # Save to src/app/favicon.ico
    master_512.save("src/app/favicon.ico", format="ICO", sizes=sizes)
    print("Updated src/app/favicon.ico")
    
    print(f"Successfully applied Favicon Option {option_num} across the entire project!")

if __name__ == "__main__":
    opt = sys.argv[1] if len(sys.argv) > 1 else "1"
    apply_favicon(opt)
