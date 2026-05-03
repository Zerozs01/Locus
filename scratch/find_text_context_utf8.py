import sys
import io

# Set stdout to utf-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'c:\App\Electron\Locus\src\renderer\src\components\ProvinceMap.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if 'เส้นทาง' in line:
            print(f"Line {i+1}: {line.strip()}")
            # Print 5 lines before and after
            start = max(0, i-5)
            end = min(len(lines), i+6)
            for j in range(start, end):
                if j != i:
                    print(f"  {j+1}: {lines[j].strip()}")
