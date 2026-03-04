import os
import shutil
from PIL import Image

artifact_dir = r"C:\Users\LENOVO\.gemini\antigravity\brain\7a7026fd-c443-4ae0-add9-86303e1a0ee1"
assets_dir = r"c:\Users\LENOVO\Downloads\birthday\assets\props"
src_img = os.path.join(artifact_dir, "media__1772648284004.jpg")
dst_img = os.path.join(assets_dir, "cake_fixed.png")

# Since it might be a JPG with a transparency grid drawn in it, 
# let's try to key out the lighter grid colors, or just copy it if it's too much effort.
# Actually, the user attached a cropped image of the cake they wanted.
if os.path.exists(src_img):
    img = Image.open(src_img).convert("RGBA")
    data = img.getdata()
    new_data = []
    
    # We could do a basic background removal if its a checkerboard 
    # (white and light grey)
    # The checkerboard typically has colors like 255,255,255 and 204,204,204
    for item in data:
        # Check if it's part of the background grid (grayscale and lighter than 180)
        r, g, b, a = item
        if abs(r - g) < 15 and abs(g - b) < 15 and r > 150:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    
    img.putdata(new_data)
    img.save(dst_img)
    print("Cake updated with attachment!")
else:
    print("Attachment not found.")
