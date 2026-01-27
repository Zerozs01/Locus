import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { IntelligencePage } from './IntelligencePage';

const meta = {
  title: 'Pages/IntelligencePage',
  component: IntelligencePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Intelligence Page (AI Chat)

หน้า Chat กับ AI Assistant พร้อม Canvas panel สำหรับแสดงข้อมูลเสริม

### Features
- 💬 Real-time AI chat interface
- 📄 Context-aware responses (from region/province navigation)
- 🖼️ Image upload support (drag & drop)
- 📊 Canvas panel for structured data display
- 📎 Source citations with links
- 💡 Suggested queries based on context

### Context Integration
- Receives context from "Chat with AI" button in RegionDashboard
- Auto-generates welcome message with relevant questions
- Context types: \`region\` or \`province\`

### Message Types
- Text responses
- Graph visualizations
- Map references
- Data tables

### Canvas Panel
- Expandable/collapsible
- Shows sources and context data
- Copy functionality

### API Integration
- Connects to n8n webhook (\`/webhook/chat\`)
- Supports streaming responses (future)
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IntelligencePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Without context
export const EmptyState: Story = {
  name: 'Empty State (No Context)',
  render: () => (
    <MemoryRouter initialEntries={['/intelligence']}>
      <Routes>
        <Route path="/intelligence" element={<IntelligencePage />} />
      </Routes>
    </MemoryRouter>
  ),
};

// With region context
export const WithRegionContext: Story = {
  name: 'With Region Context',
  render: () => (
    <MemoryRouter 
      initialEntries={[{
        pathname: '/intelligence',
        state: {
          context: {
            type: 'region',
            name: 'ภาคเหนือ',
            regionId: 'north',
            engName: 'NORTH',
            provinces: ['Chiang Mai', 'Chiang Rai', 'Nan', 'Phrae', 'Mae Hong Son', 'Lamphun'],
            stats: {
              dailyCost: '300 ฿',
              monthlyCost: '12,000 ฿',
              food: 'ข้าวซอย',
              flora: 'ดอกพญาเสือโคร่ง',
              attraction: 'ดอยอินทนนท์',
              nightlife: 'นิมมานฯ',
            },
            safety: 75,
          }
        }
      }]}
    >
      <Routes>
        <Route path="/intelligence" element={<IntelligencePage />} />
      </Routes>
    </MemoryRouter>
  ),
};

// With province context
export const WithProvinceContext: Story = {
  name: 'With Province Context',
  render: () => (
    <MemoryRouter 
      initialEntries={[{
        pathname: '/intelligence',
        state: {
          context: {
            type: 'province',
            name: 'เชียงใหม่',
            regionId: 'north',
            engName: 'Chiang Mai',
          }
        }
      }]}
    >
      <Routes>
        <Route path="/intelligence" element={<IntelligencePage />} />
      </Routes>
    </MemoryRouter>
  ),
};
