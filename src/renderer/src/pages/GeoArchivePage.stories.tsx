import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { GeoArchivePage } from './GeoArchivePage';

const meta = {
  title: 'Pages/GeoArchivePage',
  component: GeoArchivePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Geo-Archive Page (คลังข้อมูลจังหวัด)

Gallery view ของจังหวัดทั้งหมด พร้อมระบบ filter, sort และ compare

### Features
- 🔍 Search provinces (Thai & English support)
- 🏷️ Filter by region (multi-select)
- ⬆️⬇️ Sort by name, cost, safety, population
- 📊 Compare mode (up to 3 provinces)
- 🖼️ Grid / List view toggle

### Search Features
- Supports Thai ("เชียงใหม่") and English ("Chiang Mai")
- Yellow text highlight
- Real-time filtering

### Filter Options
- ภาคเหนือ (North) - Rose
- ภาคอีสาน (Northeast) - Emerald  
- ภาคกลาง (Central) - Cyan
- ภาคตะวันตก (West) - Amber
- ภาคตะวันออก (East) - Violet
- ภาคใต้ (South) - Blue

### Sort Options
- Name (A-Z)
- Cost (High/Low)
- Safety (High/Low)
- Population (High/Low)

### Compare Mode
- Click compare icon on province cards
- Add up to 3 provinces
- Side-by-side comparison panel
- Stats comparison: cost, safety, population, area

### View Modes
- **Grid**: 4-column responsive grid with images
- **List**: Full-width rows with details (optimized width)
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="h-screen bg-[#020305]">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof GeoArchivePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Archive Gallery',
};

// Note: GeoArchivePage manages its own state via useEffect and DB API
// In Storybook, it may show empty state if DB is not available
// For full testing, run the Electron app
