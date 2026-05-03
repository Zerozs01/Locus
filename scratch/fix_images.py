
import re
import os

path = r'c:\App\Electron\Locus\src\main\database\explorePlacesSeed.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix provinceIds
# pathum-thani -> pathumthani
# lop-buri -> lopburi (if it exists)
content = content.replace('"pathum-thani"', '"pathumthani"')
content = content.replace('"lop-buri"', '"lopburi"')

# Manually add some thumbnails for Pathum Thani and Lopburi
thumbnails = {
    "บ้าน ๑,๐๐๐ ไม้ cafe & farm": "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=600",
    "วัดเจดีย์หอย": "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600",
    "ตลาดอิงน้ำสามโคก": "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=600",
    "พระปรางค์สามยอด": "https://images.unsplash.com/photo-1596422846543-75c6fc18a5cf?q=80&w=600",
    "ทุ่งทานตะวันเขาจีนแล": "https://images.unsplash.com/photo-1470137237906-d8a4f71e1966?q=80&w=600",
    "วัดเขาวงพระจันทร์": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600"
}

def add_thumbnail(m):
    title = m.group(1)
    rest = m.group(2)
    if title in thumbnails:
        return f'title: "{title}",\n    thumbnailUrl: "{thumbnails[title]}",{rest}'
    return m.group(0)

pattern = re.compile(r'title:\s*"(.*?)",(\s*locationName:)', re.S)
new_content = pattern.sub(add_thumbnail, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Standardized provinceIds and added thumbnails")
