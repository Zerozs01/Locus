import os

dir_path = r'c:\App\Electron\Locus\src\Image\Province_pic\Central_pic'
files = os.listdir(dir_path)

for f in files:
    print(f"{f}")
