import os
from PIL import Image, ImageDraw, ImageFont

def generate_showcase():
    art_dir = r"C:\Users\jaina\.gemini\antigravity-ide\brain\267dd112-7075-47e2-989d-9a143d26e638"
    
    # Load 128px images
    images = [
        ("Current (Old)", os.path.join(art_dir, "current-128.png"), os.path.join(art_dir, "current-16.png")),
        ("Option 1 (Chrono)", os.path.join(art_dir, "opt1-128.png"), os.path.join(art_dir, "opt1-16.png")),
        ("Option 2 (Globe)", os.path.join(art_dir, "opt2-128.png"), os.path.join(art_dir, "opt2-16.png")),
        ("Option 3 (Atomic)", os.path.join(art_dir, "opt3-128.png"), os.path.join(art_dir, "opt3-16.png")),
        ("Option 4 (Contrast)", os.path.join(art_dir, "opt4-128.png"), os.path.join(art_dir, "opt4-16.png")),
    ]
    
    width = 1100
    height = 560
    canvas = Image.new("RGBA", (width, height), (15, 23, 42, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Header Banner
    draw.rectangle([0, 0, width, 70], fill=(11, 17, 32, 255))
    draw.text((32, 24), "TimeNumbers Favicon Redesign — Design Comparison Matrix", fill=(248, 250, 252))
    
    col_width = (width - 64) // 5
    start_x = 32
    
    for i, (title, p128, p16) in enumerate(images):
        col_x = start_x + i * col_width
        
        # Column card background
        card_rect = [col_x + 4, 85, col_x + col_width - 8, height - 20]
        bg_col = (20, 30, 52) if i == 1 else (18, 24, 38)
        border_col = (56, 189, 248) if i == 1 else (30, 41, 59)
        draw.rounded_rectangle(card_rect, radius=12, fill=bg_col, outline=border_col, width=2 if i == 1 else 1)
        
        # Title
        t_col = (56, 189, 248) if i == 1 else ((239, 68, 68) if i == 0 else (226, 232, 240))
        draw.text((col_x + 14, 98), title, fill=t_col)
        
        # 128px icon preview
        if os.path.exists(p128):
            im128 = Image.open(p128).convert("RGBA")
            # Draw on dark preview box
            box_rect = [col_x + (col_width - 100)//2, 130, col_x + (col_width + 100)//2, 230]
            draw.rounded_rectangle(box_rect, radius=8, fill=(10, 14, 26))
            im_resized = im128.resize((84, 84), Image.Resampling.LANCZOS)
            canvas.alpha_composite(im_resized, (col_x + (col_width - 84)//2, 138))
            
        # Label
        draw.text((col_x + 14, 242), "16px Tab Scaled 3X:", fill=(148, 163, 184))
        
        # 16px icon preview scaled up 3x
        if os.path.exists(p16):
            im16 = Image.open(p16).convert("RGBA")
            im16_scaled = im16.resize((48, 48), Image.Resampling.NEAREST)
            
            # Dark tab mock
            draw.rounded_rectangle([col_x + 14, 268, col_x + col_width - 18, 335], radius=6, fill=(35, 35, 45), outline=(55, 55, 68))
            draw.text((col_x + 22, 274), "Dark Tab", fill=(156, 163, 175))
            canvas.alpha_composite(im16, (col_x + 22, 302)) # actual 16px
            canvas.alpha_composite(im16_scaled, (col_x + 50, 278)) # 3x magnified
            
            # Light tab mock
            draw.rounded_rectangle([col_x + 14, 348, col_x + col_width - 18, 415], radius=6, fill=(241, 245, 249), outline=(203, 213, 225))
            draw.text((col_x + 22, 354), "Light Tab", fill=(71, 85, 105))
            canvas.alpha_composite(im16, (col_x + 22, 382)) # actual 16px
            canvas.alpha_composite(im16_scaled, (col_x + 50, 358)) # 3x magnified
            
        # Verdict / Note
        if i == 0:
            verdict = "Low contrast / blurry"
            v_col = (239, 68, 68)
        elif i == 1:
            verdict = "★ Best: Needle-Sharp"
            v_col = (56, 189, 248)
        elif i == 2:
            verdict = "Matches Header Logo"
            v_col = (147, 197, 253)
        elif i == 3:
            verdict = "Modern Tech Vibe"
            v_col = (52, 211, 153)
        else:
            verdict = "Max Visibility"
            v_col = (251, 146, 60)
            
        draw.text((col_x + 14, 435), verdict, fill=v_col)

    out_path = os.path.join(art_dir, "favicon_comparison_showcase.png")
    canvas.save(out_path)
    # also save in public
    canvas.save(os.path.join("public", "favicons-review", "favicon_comparison_showcase.png"))
    print("Showcase image successfully generated at:", out_path)

if __name__ == "__main__":
    generate_showcase()
