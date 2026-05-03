with open(r'c:\App\Electron\Locus\src\renderer\src\components\ProvinceMap.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if 'เส้นทาง' in line:
            print(f"{i+1}: {line.strip()}")
