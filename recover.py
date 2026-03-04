import os
from PIL import Image

props_dir = r"c:\Users\LENOVO\Downloads\birthday\assets\props"
sheet_path = os.path.join(props_dir, "props_sheet.png")
cake_path = os.path.join(props_dir, "cake.png")

sheet = Image.open(sheet_path).convert("RGBA")
cake = Image.open(cake_path).convert("RGBA")

s_w, s_h = sheet.size
c_w, c_h = cake.size

# We know the bottom part of cake from y=150 to 250 is untouched.
# Let's get a small 20x20 signature from the middle width of the cake at y=200
cx = c_w // 2
cy = 200
sig_w = 40
sig_h = 40
sig = []
for y in range(cy, cy+sig_h):
    row = []
    for x in range(cx, cx+sig_w):
        row.append(cake.getpixel((x, y)))
    sig.append(row)

found = False
for sy in range(0, s_h - sig_h, 10):
    for sx in range(0, s_w - sig_w, 10):
        # check match in top-left pixel
        if sheet.getpixel((sx, sy)) == sig[0][0]:
            # check full patch roughly
            match = True
            for py in range(0, sig_h, 4):
                for px in range(0, sig_w, 4):
                    if sheet.getpixel((sx+px, sy+py)) != sig[py][px]:
                        match = False
                        break
                if not match: break
            if match:
                print(f"Found signature at {sx}, {sy}")
                best_x = sx - cx
                best_y = sy - cy
                new_cake = sheet.crop((best_x, best_y, best_x + c_w, best_y + c_h))
                new_cake.save(os.path.join(props_dir, "recovered_cake.png"))
                found = True
                break
    if found: break

if not found:
    print("Could not recover cake from sheet")
