import type { Meta, StoryObj } from '@storybook/react-vite';
import { AQIModal } from './AQIModal';

const meta = {
  title: 'Components/AQIModal',
  component: AQIModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AQI Modal (Air Quality Index)

Modal แสดงข้อมูลคุณภาพอากาศ (PM2.5) ของจังหวัดในภาคต่างๆ

### Features
- 📊 แสดงค่า AQI ของแต่ละจังหวัด
- 📈 7-day regional trend chart
- 🔄 Sync data จาก OpenWeather หรือ AQICN
- 🏷️ Filter ตามระดับคุณภาพอากาศ
- 📍 แสดงข้อมูล Stale ถ้าข้อมูลไม่ใช่วันปัจจุบัน

### AQI Levels
- Good (0-50): 🟢 คุณภาพอากาศดี
- Moderate (51-100): 🟡 คุณภาพอากาศปานกลาง
- Unhealthy (101+): 🔴 คุณภาพอากาศไม่ดี

### Props
- \`isOpen\`: boolean - เปิด/ปิด modal
- \`onClose\`: () => void - ปิด modal
- \`regionName\`: string - ชื่อภาค
- \`provinces\`: { id: string; name: string }[] - รายชื่อจังหวัด
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    regionName: { control: 'text' },
  },
} satisfies Meta<typeof AQIModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'AQI Modal Open',
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    regionName: 'ภาคเหนือ',
    provinces: [
      { id: 'chiang-mai', name: 'Chiang Mai' },
      { id: 'chiang-rai', name: 'Chiang Rai' },
      { id: 'nan', name: 'Nan' },
      { id: 'phrae', name: 'Phrae' },
      { id: 'mae-hong-son', name: 'Mae Hong Son' },
      { id: 'lamphun', name: 'Lamphun' },
    ],
  },
};

export const CentralRegion: Story = {
  name: 'Central Region (Mock Data)',
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    regionName: 'ภาคกลาง',
    provinces: [
      { id: 'bangkok', name: 'Bangkok' },
      { id: 'ayutthaya', name: 'Ayutthaya' },
      { id: 'nakhon-pathom', name: 'Nakhon Pathom' },
      { id: 'pathum-thani', name: 'Pathum Thani' },
      { id: 'lop-buri', name: 'Lop Buri' },
    ],
  },
};

export const Closed: Story = {
  name: 'AQI Modal Closed',
  args: {
    isOpen: false,
    onClose: () => console.log('Close clicked'),
    regionName: 'ภาคเหนือ',
    provinces: [
      { id: 'chiang-mai', name: 'Chiang Mai' },
    ],
  },
};