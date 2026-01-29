import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { TravelGuidePage } from './TravelGuidePage';

const meta = {
  title: 'Pages/TravelGuidePage',
  component: TravelGuidePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Travel Guide Page (คู่มือการเดินทาง)

หน้าแสดงข้อมูลเส้นทางการเดินทางแยกตามภูมิภาค

### Features
- 🚌 Transport routes data (bus, van, train, plane, boat)
- 🔍 Search routes by name/destination
- 🏷️ Filter by transport type
- 💰 Fare calculator (text input + dropdown modes)
- 📍 Route details with via provinces

### Fare Calculator
- **Text Input Mode**: พิมพ์ชื่อต้นทาง/ปลายทางได้เลย
- **Dropdown Mode**: เลือกจาก dropdown
- Auto-calculate based on distance & base fare

### Transport Types
- 🚌 Bus (รถเมล์)
- 🚐 Van (รถตู้)
- 🚎 Coach (รถทัวร์)
- 🚂 Train (รถไฟ)
- ✈️ Plane (เครื่องบิน)
- ⛴️ Boat (เรือ)

### URL Pattern
\`/travel-guide/:regionId\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TravelGuidePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to wrap with router and specific route
const withRouter = (regionId: string) => (
  <MemoryRouter initialEntries={[`/travel-guide/${regionId}`]}>
    <Routes>
      <Route path="/travel-guide/:regionId" element={<TravelGuidePage />} />
    </Routes>
  </MemoryRouter>
);

export const NorthRegion: Story = {
  name: 'ภาคเหนือ (North)',
  render: () => withRouter('north'),
};

export const CentralRegion: Story = {
  name: 'ภาคกลาง (Central)',
  render: () => withRouter('central'),
};

export const SouthRegion: Story = {
  name: 'ภาคใต้ (South)',
  render: () => withRouter('south'),
};

export const NortheastRegion: Story = {
  name: 'ภาคอีสาน (Northeast)',
  render: () => withRouter('northeast'),
};

export const WestRegion: Story = {
  name: 'ภาคตะวันตก (West)',
  render: () => withRouter('west'),
};

export const EastRegion: Story = {
  name: 'ภาคตะวันออก (East)',
  render: () => withRouter('east'),
};
