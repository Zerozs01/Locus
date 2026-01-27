import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RegionDashboard } from './RegionDashboard';
import { regionsData } from '../data/regions';

const meta = {
  title: 'Components/RegionDashboard',
  component: RegionDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Region Dashboard

แดชบอร์ดแสดงข้อมูลภูมิภาคของประเทศไทย รองรับ 2 โหมด:
- **Region Mode**: แสดงสถิติภาพรวมของภาค (ค่าครองชีพ, อาหาร, แหล่งท่องเที่ยว)
- **Province Mode**: แสดง Gallery ของจังหวัดในภาค (3 columns grid)

### Features
- 🎨 Region-specific theme colors (rose/cyan/emerald/blue/amber/violet)
- 💬 Chat with AI button - navigates to Intelligence page with context
- 🚌 Travel Guide button - navigates to transport routes
- 🔍 Province cards with daily cost & safety rating
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectedRegionId: { 
      control: 'select',
      options: ['north', 'northeast', 'central', 'south', 'west', 'east', null],
      description: 'Currently selected region ID'
    },
    mapMode: { 
      control: 'radio', 
      options: ['region', 'province'],
      description: 'Display mode - region stats or province gallery'
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="h-screen bg-[#020305]">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof RegionDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use static data for Storybook
const mockRegions = regionsData;

export const Default: Story = {
  args: {
    regions: mockRegions,
    selectedRegionId: null,
    onSelectRegion: (id) => console.log('Selected Region:', id),
    mapMode: 'region',
    setMapMode: (mode) => console.log('Set Map Mode:', mode),
    selectedProvince: null,
    onSelectProvince: (prov) => console.log('Selected Province:', prov),
    onViewProvinceDetail: (regionId, provinceId) => console.log('View Detail:', regionId, provinceId),
    onOpenChat: (context) => console.log('Open Chat:', context),
  },
};

export const NorthSelected: Story = {
  name: 'ภาคเหนือ (North)',
  args: {
    ...Default.args,
    selectedRegionId: 'north',
  },
};

export const CentralSelected: Story = {
  name: 'ภาคกลาง (Central)',
  args: {
    ...Default.args,
    selectedRegionId: 'central',
  },
};

export const SouthSelected: Story = {
  name: 'ภาคใต้ (South)',
  args: {
    ...Default.args,
    selectedRegionId: 'south',
  },
};

export const ProvinceMode: Story = {
  name: 'Province Gallery Mode',
  args: {
    ...Default.args,
    selectedRegionId: 'central',
    mapMode: 'province',
  },
};

export const WithSelectedProvince: Story = {
  name: 'Province Selected',
  args: {
    ...Default.args,
    selectedRegionId: 'north',
    mapMode: 'province',
    selectedProvince: mockRegions[0].subProvinces[0], // Chiang Mai
  },
};
