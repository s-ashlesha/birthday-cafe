import os
from PIL import Image

props_dir = r"c:\Users\LENOVO\Downloads\birthday\assets\props"
sheet_path = os.path.join(props_dir, "props_sheet.png")
cake_path = os.path.join(props_dir, "cake.png")

if os.path.exists(sheet_path):
    print("Found props_sheet.png")
    sheet = Image.open(sheet_path).convert("RGBA")
    print(f"Sheet dimensions: {sheet.width}x{sheet.height}")
    
    # Try to find exactly the cake. Let's make a copy to examine what's in the sheet.
    # We can just extract it manually if we find the coordinates. 
    # Let's save a reduced version or just inspect it.
