import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RadarPage } from './RadarPage';

const meta = {
  title: 'Pages/RadarPage',
  component: RadarPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Radar Page (หน้าแรก)

หน้าหลักแสดงแผนที่ประเทศไทยแบบ Interactive พร้อม Region Dashboard

### Features
- 🗺️ Interactive Thailand Map (react-simple-maps + GeoJSON)
- 🔍 Search bar with Thai/English province search
- ⌨️ Keyboard navigation (Arrow Up/Down, Enter, Escape)
- 🎯 Click region to zoom & select
- 📊 Region stats panel (costs, food, attractions)
- 🏘️ Province gallery mode (3-column grid)

### Search Features
- Supports both English ("Chiang Mai") and Thai ("เชียงใหม่")
- Yellow text highlight on focus
- Auto-suggest dropdown (max 6 results)
- Keyboard navigation for suggestions

### Map Interactions
- Click region → Select & zoom
- Toggle "View Provinces" → Province mode
- Click province card → Show detail button
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
} satisfies Meta<typeof RadarPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Main Map View',
};

// Note: RadarPage manages its own state via useEffect and DB API
// In Storybook, it may show empty state if DB is not available
// For full testing, run the Electron app
