import os
from PIL import Image

artifact_dir = r"C:\Users\LENOVO\.gemini\antigravity\brain\7a7026fd-c443-4ae0-add9-86303e1a0ee1"
assets_dir = r"c:\Users\LENOVO\Downloads\birthday\assets\props"

images = [
    ("stardew_chocolate_1772646656547.png", "chocolate.png"),
    ("stardew_mouse_1772646686302.png", "mouse.png"),
    ("stardew_flowers_1772646726733.png", "flowers.png")
]

for src_name, dst_name in images:
    src_path = os.path.join(artifact_dir, src_name)
    dst_path = os.path.join(assets_dir, dst_name)
    if os.path.exists(src_path):
        img = Image.open(src_path).convert("RGBA")
        datas = img.getdata()
        new_data = []
        for item in datas:
            # Check for white or near-white
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        img.putdata(new_data)
        img.save(dst_path)
        print(f"Processed {src_name} -> {dst_name}")
    else:
        print(f"Not found: {src_path}")
