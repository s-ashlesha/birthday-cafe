import os
from PIL import Image

props_dir = r"c:\Users\LENOVO\Downloads\birthday\assets\props"
cake_path = os.path.join(props_dir, "cake.png")

if os.path.exists(cake_path):
    img = Image.open(cake_path).convert("RGBA")
    # Make top portion transparent (approx 120 pixels, which should cover a candle on a 333 height image)
    for x in range(img.width):
        for y in range(140):  # guess 140 pixels down
            img.putpixel((x, y), (0, 0, 0, 0))
    img.save(cake_path)
    print("Cake modified")
else:
    print("Cake not found")
