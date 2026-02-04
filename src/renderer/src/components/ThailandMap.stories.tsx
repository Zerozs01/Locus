import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThailandMap } from './ThailandMap';
import { Province } from '../data/regions';

const meta = {
  title: 'Components/ThailandMap',
  component: ThailandMap,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    activeId: { control: 'text' },
    viewMode: { control: 'radio', options: ['region', 'province'] },
  },
} satisfies Meta<typeof ThailandMap>;

export default meta;
type Story = StoryObj<typeof meta>;

// Needed for selectedProvince prop
const mockProvince: Province = {
  id: 'bkk',
  name: 'Bangkok',
  // Add other required fields if any based on Province type definition 
  // checking usages in ThailandMap, it only uses id and name and position lookup
  // But Typescript might complain if full object not provided
  // Let's check usage. In generated story I'll provide a minimal object casted 
  // or a full mock if I knew the type definition. 
  // Based on RegionDashboard usage, it has image, dist, tam, etc.
  // For Map, it only uses id and name.
} as any; 

export const Default: Story = {
  args: {
    activeId: null,
    onSelectRegion: (id) => console.log('Selected Region:', id),
    viewMode: 'region',
    selectedProvince: null,
    onSelectProvince: (prov) => console.log('Selected Province:', prov),
  },
  parameters: {
     backgrounds: { default: 'dark' }
  }
};

export const RegionActive: Story = {
  args: {
    ...Default.args,
    activeId: 'central',
  },
};

export const ProvinceView: Story = {
  args: {
    ...Default.args,
    activeId: 'central',
    viewMode: 'province',
    selectedProvince: mockProvince,
  },
};
