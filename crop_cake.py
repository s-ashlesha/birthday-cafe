import os
from PIL import Image

props_dir = r"c:\Users\LENOVO\Downloads\birthday\assets\props"
cake_path = os.path.join(props_dir, "cake.png")
recovered_cake_path = os.path.join(props_dir, "cake_fixed.png")

cake = Image.open(cake_path).convert("RGBA")
pixels = cake.load()

# Currently the cake image from y=0 to 140 is erased.
# Let's see if we can just crop the image tighter so it doesn't look cut off,
# or rebuild the top. The missing part is just the top oval.
# We can find the first non-transparent row
y_start = 0
for y in range(cake.height):
    found = False
    for x in range(cake.width):
        if pixels[x, y][3] > 0:
            y_start = y
            found = True
            break
    if found:
        break

print(f"Content starts at row {y_start}")

# We can crop the image
new_cake = cake.crop((0, y_start, cake.width, cake.height))
new_cake.save(recovered_cake_path)
