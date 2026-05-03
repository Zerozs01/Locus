
import re
import os

path = r'c:\App\Electron\Locus\src\main\database\explorePlacesSeed.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix sourceUrl
def fix_url(match):
    title = match.group(1)
    url = match.group(2)
    # If the url ends with query= and a partial title, or is just a partial search
    if 'query=' in url:
        base_url = url.split('query=')[0] + 'query='
        # Always use the full title for the query to be safe
        fixed_url = base_url + title.replace(' ', '+')
        return f'title: "{title}",\n    locationName: "{match.group(3)}",\n    category: "{match.group(4)}",\n    iconName: "{match.group(5)}",\n    tags: {match.group(6)},\n    regionId: "{match.group(7)}",\n    provinceId: "{match.group(8)}",\n    description: "{match.group(9)}",\n    sourceUrl: "{fixed_url}"'
    return match.group(0)

# Pattern to capture fields and fix sourceUrl
# Note: The structure in the file is:
# {
#   title: "...",
#   locationName: "...",
#   category: "...",
#   iconName: "...",
#   tags: [...],
#   regionId: "...",
#   provinceId: "...",
#   description: "...",
#   sourceUrl: "..."
# }

# More robust pattern
pattern = re.compile(r'title:\s*"(.*?)",\s*locationName:\s*"(.*?)",\s*category:\s*"(.*?)",\s*iconName:\s*"(.*?)",\s*tags:\s*(\[.*?\]),\s*regionId:\s*"(.*?)",\s*provinceId:\s*"(.*?)",\s*description:\s*"(.*?)",\s*sourceUrl:\s*"(.*?)"', re.S)

def replace_fn(m):
    title = m.group(1)
    loc = m.group(2)
    cat = m.group(3)
    icon = m.group(4)
    tags = m.group(5)
    reg = m.group(6)
    prov = m.group(7)
    desc = m.group(8)
    url = m.group(9)
    
    if 'query=' in url and not url.endswith(title.replace(' ', '+')):
         url = url.split('query=')[0] + 'query=' + title.replace(' ', '+')
         
    return f'title: "{title}",\n    locationName: "{loc}",\n    category: "{cat}",\n    iconName: "{icon}",\n    tags: {tags},\n    regionId: "{reg}",\n    provinceId: "{prov}",\n    description: "{desc}",\n    sourceUrl: "{url}"'

new_content = pattern.sub(replace_fn, content)

# Also check for Pathum Thani and Lopburi thumbnails
# Pathum Thani is 'pathum-thani' in seed data (based on provinceId in initialData vs seed)
# Wait, let's check what provinceId is used in the seed for Pathum Thani.
# It seems it uses 'pathum-thani' (kebab-case) whereas initialData uses 'pathumthani'.
# This mismatch might be why it's not fetching data correctly if there's a join.

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed sourceUrls")
