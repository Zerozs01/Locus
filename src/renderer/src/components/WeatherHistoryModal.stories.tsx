import type { Meta, StoryObj } from '@storybook/react-vite';
import { WeatherHistoryModal } from './WeatherHistoryModal';

const meta = {
  title: 'Components/WeatherHistoryModal',
  component: WeatherHistoryModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Weather History Modal

Modal แสดงข้อมูลอุณหภูมิและสภาพอากาศย้อนหลัง 7 วัน หรือพยากรณ์ 7 วัน

### Features
- 🌡️ แสดงอุณหภูมิเฉลี่ยของจังหวัด
- 📊 Bar chart แสดง trend อุณหภูมิ
- 🔄 Sync data จาก OpenWeather API
- ⬆️⬇️ Toggle ระหว่าง Past 7 Days / Next 7 Days
- 📋 Province breakdown list

### Props
- \`isOpen\`: boolean - เปิด/ปิด modal
- \`onClose\`: () => void - ปิด modal
- \`provinceName\`: string - ชื่อจังหวัด (สำหรับ title)
- \`provinces\`: { id: string; name: string }[] - รายชื่อจังหวัด
- \`regionId?\`: string - ID ของภาค (optional)
- \`targetProvinceId?\`: string - จังหวัดที่ต้องการ highlight
- \`chartScope?\`: 'region-average' | 'province' - โหมดแสดงผล
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    provinceName: { control: 'text' },
    chartScope: { 
      control: 'radio', 
      options: ['region-average', 'province'] 
    },
  },
} satisfies Meta<typeof WeatherHistoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Weather Modal Open',
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    provinceName: 'Chiang Mai',
    provinces: [
      { id: 'chiang-mai', name: 'Chiang Mai' },
      { id: 'chiang-rai', name: 'Chiang Rai' },
      { id: 'nan', name: 'Nan' },
      { id: 'phrae', name: 'Phrae' },
      { id: 'mae-hong-son', name: 'Mae Hong Son' },
    ],
    regionId: 'north',
    targetProvinceId: 'chiang-mai',
    chartScope: 'region-average',
  },
};

export const ProvinceScope: Story = {
  name: 'Province Scope Mode',
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    provinceName: 'Bangkok',
    provinces: [
      { id: 'bangkok', name: 'Bangkok' },
      { id: 'nonthaburi', name: 'Nonthaburi' },
      { id: 'pathum-thani', name: 'Pathum Thani' },
    ],
    regionId: 'central',
    targetProvinceId: 'bangkok',
    chartScope: 'province',
  },
};

export const Closed: Story = {
  name: 'Weather Modal Closed',
  args: {
    isOpen: false,
    onClose: () => console.log('Close clicked'),
    provinceName: 'Chiang Mai',
    provinces: [
      { id: 'chiang-mai', name: 'Chiang Mai' },
    ],
  },
};