import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrendingPlacesCard } from './TrendingPlacesCard';

const mockTrendingPlaces = [
  {
    id: 1,
    title: 'Doi Inthanon',
    locationName: 'Chiang Mai, North',
    thumbnailUrl: '',
    rating: 4.8,
    reviewCount: 1250,
    trendingScore: 9.2,
    isTrending: true,
    recencyGrowth: 12,
    checkinCount: 45,
    category: null,
    iconName: null,
    regionId: 'north',
    provinceId: 'chiang-mai',
    tags: [],
    fullImageUrl: null,
    description: null,
    reviewCountWeek: 85,
    lastReviewAt: null,
    openingHours: null,
    sourceUrl: null,
    updatedAt: null,
    scoreBreakdown: {
      rating: 4.8,
      volume: 4.5,
      growth: 4.9,
    },
  },
  {
    id: 2,
    title: 'Ancient Ayutthaya',
    locationName: 'Ayutthaya, Central',
    thumbnailUrl: '',
    rating: 4.6,
    reviewCount: 2100,
    trendingScore: 8.7,
    isTrending: true,
    recencyGrowth: 8,
    checkinCount: 32,
    category: null,
    iconName: null,
    regionId: 'central',
    provinceId: 'ayutthaya',
    tags: [],
    fullImageUrl: null,
    description: null,
    reviewCountWeek: 120,
    lastReviewAt: null,
    openingHours: null,
    sourceUrl: null,
    updatedAt: null,
    scoreBreakdown: {
      rating: 4.6,
      volume: 4.8,
      growth: 4.2,
    },
  },
  {
    id: 3,
    title: 'Railay Beach',
    locationName: 'Krabi, South',
    thumbnailUrl: '',
    rating: 4.5,
    reviewCount: 980,
    trendingScore: 8.1,
    isTrending: true,
    recencyGrowth: 15,
    checkinCount: 28,
    category: null,
    iconName: null,
    regionId: 'south',
    provinceId: 'krabi',
    tags: [],
    fullImageUrl: null,
    description: null,
    reviewCountWeek: 67,
    lastReviewAt: null,
    openingHours: null,
    sourceUrl: null,
    updatedAt: null,
    scoreBreakdown: {
      rating: 4.5,
      volume: 4.2,
      growth: 4.4,
    },
  },
];

const meta = {
  title: 'Components/TrendingPlacesCard',
  component: TrendingPlacesCard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## TrendingPlacesCard

Card แสดงสถานที่ท่องเที่ยวยอดนิยม พร้อม trending score

### Features
- 📊 Trending score และ rank
- ⏱️ Timeframe selector (Today/Week/Month)
- 🖼️ Thumbnail images
- ⬆️ Growth indicators
- 📈 Score breakdown popup

### Props
- \`limit?\`: number (default: 5) - จำนวนสถานที่ที่แสดง
- \`onClick?\`: (place: TrendingPlace) => void - callback เมื่อคลิก
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    limit: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-[#020305] min-h-screen">
        <div className="max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof TrendingPlacesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Trending Places Card',
  args: {
    limit: 5,
  },
};

export const Limited: Story = {
  name: 'Limited to 3',
  args: {
    limit: 3,
  },
};

// Note: TrendingPlacesCard fetches data from DB via API
// In Storybook, data may not be available
// For full testing, run the Electron app with seeded data