const fs = require('fs');
const file = 'c:/Users/beelink/Downloads/Code/University/Locus/src/renderer/src/pages/ProvinceTactical/data.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix the typing
content = content.replace(/const data: Omit<ProvinceData, 'mapMarkers'> = \{/, 'const data: any = {');

// Fix the duplicate imports
content = content.replace(/import \{ Plane, Bus, Train, Car \} from 'lucide-react';\r?\nimport \{ Plane, Bus, Train, Car \} from 'lucide-react';/, "import { Plane, Bus, Train, Car } from 'lucide-react';");

// Fix the syntax error at the end of generateProvinceData
content = content.replace(/  return data as ProvinceData;\r?\n  \/\/\r?\n  \};\r?\n\}/, '  return data as ProvinceData;\n}');

// Remove the obsolete generateMapMarkers
content = content.replace(/function generateMapMarkers\([\s\S]*?\}\r?\n/, '');

fs.writeFileSync(file, content);
