import os
import zipfile

zip_path = r"C:\Users\LENOVO\Downloads\birthday.zip"
if os.path.exists(zip_path):
    print("Zip exists!")
    with zipfile.ZipFile(zip_path, 'r') as z:
        print(z.namelist())
else:
    print("No Zip found :(")
