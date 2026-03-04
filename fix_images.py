import os
from PIL import Image

characters_dir = r"c:\Users\LENOVO\Downloads\birthday\assets\characters"
props_dir = r"c:\Users\LENOVO\Downloads\birthday\assets\props"

def remove_white_bg(img_path):
    if not os.path.exists(img_path):
        print(f"Not found: {img_path}")
        return
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    new_data = []
    for item in datas:
        # Check for white or near-white
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    img.save(img_path)
    print(f"Removed white bg from {img_path}")

remove_white_bg(os.path.join(characters_dir, "bf_idle.png"))
remove_white_bg(os.path.join(characters_dir, "girl_idle.png"))

def analyze_cake(img_path):
    if not os.path.exists(img_path):
        print(f"Not found: {img_path}")
        return
    img = Image.open(img_path).convert("RGBA")
    print(f"Cake dims: {img.width}x{img.height}")

analyze_cake(os.path.join(props_dir, "cake.png"))
