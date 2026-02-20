const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'src', 'renderer', 'src', 'pages', 'ProvinceTacticalPage.tsx');
const content = fs.readFileSync(srcFile, 'utf-8');
const lines = content.split('\n');

const outDir = path.join(__dirname, 'src', 'renderer', 'src', 'pages', 'ProvinceTactical');
const tabsDir = path.join(outDir, 'tabs');
const componentsDir = path.join(outDir, 'components');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(tabsDir)) fs.mkdirSync(tabsDir, { recursive: true });
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

function getLines(start, end) {
    if (!start || !end) return '';
    return lines.slice(start - 1, end).join('\n');
}

// Ensure exports on components
function addExport(text) {
    return text.replace(/^const /gm, 'export const ');
}

// 1. types.ts
const typesCode = `import { Region, Province } from '../../data/regions';

export type FlyToHandler = (lat: number, lng: number, title?: string) => void;

${getLines(1559, 1598).replace('interface ProvinceData', 'export interface ProvinceData')}
`;
fs.writeFileSync(path.join(outDir, 'types.ts'), typesCode);

// 2. data.tsx
const dataCode = `${getLines(3, 40).split('\n').filter(l => l.includes('import')).join('\n')}
import { Region, Province } from '../../data/regions';
import { ProvinceData } from './types';

${getLines(1600, lines.length).replace(/function generateProvinceData/g, 'export function generateProvinceData')}
`;
fs.writeFileSync(path.join(outDir, 'data.tsx'), dataCode);

// 3. HelperComponents.tsx
const lucideImports = getLines(3, 37); // Get lucide imports
const helperCode = `import { useState } from 'react';
${lucideImports}
import { FlyToHandler } from '../types';

${addExport(getLines(774, 1555))}
`;
fs.writeFileSync(path.join(componentsDir, 'HelperComponents.tsx'), helperCode);

// 4. Tabs
const tabImports = `import { useState } from 'react';\n${lucideImports}\nimport { FlyToHandler, ProvinceData } from '../types';\nimport { Province } from '../../data/regions';\nimport * as Helpers from '../components/HelperComponents';\n\n`;

const tabs = [
    { name: 'ExploreTab', start: 230, end: 285 },
    { name: 'StayTab', start: 287, end: 376 },
    { name: 'EatTab', start: 378, end: 462 },
    { name: 'TravelTab', start: 464, end: 528 },
    { name: 'EssentialsTab', start: 530, end: 771 },
];

tabs.forEach(tab => {
    let tabCode = tabImports + addExport(getLines(tab.start, tab.end));
    
    // Replace standalone helper calls with Helpers. calls for simplicity
    const helperNames = ['QuickBadge', 'ContentCard', 'CollapsibleSection', 'PlaceCard', 'ActivityChip', 'SeasonCard', 'AccommodationCard', 'AreaCard', 'DishCard', 'RestaurantCard', 'CafeCard', 'MarketCard', 'MallCard', 'LocalTransportCard', 'EmergencyCard', 'LocalEmergencyCard', 'HospitalCard', 'SafetyMeter', 'PharmacyCard', 'BankCard', 'GasStationCard', 'SafetyTip', 'InfoItem'];
    
    helperNames.forEach(h => {
        const regex = new RegExp('<' + h + ' ', 'g');
        tabCode = tabCode.replace(regex, '<Helpers.' + h + ' ');
    });
    
    fs.writeFileSync(path.join(tabsDir, tab.name + '.tsx'), tabCode);
});

// 5. Parent Page (index.tsx)
const pageCode = `${getLines(1, 40)}
import { ProvinceData } from './types';
import { generateProvinceData } from './data';
import { ExploreTab } from './tabs/ExploreTab';
import { StayTab } from './tabs/StayTab';
import { EatTab } from './tabs/EatTab';
import { TravelTab } from './tabs/TravelTab';
import { EssentialsTab } from './tabs/EssentialsTab';
import * as Helpers from './components/HelperComponents';

${getLines(42, 223).replace(/<QuickBadge /g, '<Helpers.QuickBadge ')}
`;

fs.writeFileSync(path.join(outDir, 'index.tsx'), pageCode);

console.log('Refactor complete.');
