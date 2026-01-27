import type { Meta, StoryObj } from '@storybook/react';
import { RegionDashboard } from './RegionDashboard';
import { regions } from '../data/regions';

const meta = {
  title: 'Components/RegionDashboard',
  component: RegionDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedRegionId: { control: 'text' },
    mapMode: { control: 'radio', options: ['region', 'province'] },
  },
} satisfies Meta<typeof RegionDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data might be needed if regions import fails or needs simplification
const mockRegions = regions; // Assuming regions import works. If not, I would mock it.

export const Default: Story = {
  args: {
    regions: mockRegions,
    selectedRegionId: null,
    onSelectRegion: (id) => console.log('Selected Region:', id),
    mapMode: 'region',
    setMapMode: (mode) => console.log('Set Map Mode:', mode),
    selectedProvince: null,
    onSelectProvince: (prov) => console.log('Selected Province:', prov),
  },
};

export const RegionSelected: Story = {
  args: {
    ...Default.args,
    selectedRegionId: 'central', // Assuming 'central' is a valid ID from mockRegions
  },
};

export const ProvinceMode: Story = {
  args: {
    ...Default.args,
    selectedRegionId: 'central',
    mapMode: 'province',
  },
};
