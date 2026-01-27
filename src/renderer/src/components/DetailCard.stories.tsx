import type { Meta, StoryObj } from '@storybook/react';
import { DetailCard } from './DetailCard';
import { MapPin } from 'lucide-react';

const meta = {
  title: 'Components/DetailCard',
  component: DetailCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    bgClass: { control: 'text' },
    textClass: { control: 'text' },
  },
} satisfies Meta<typeof DetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <MapPin />,
    label: 'LOCATION',
    value: 'Bangkok, TH',
    sub: 'Lat: 13.7563, Long: 100.5018',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-400',
  },
};

export const Warning: Story = {
  args: {
    icon: <MapPin />,
    label: 'DANGER ZONE',
    value: 'High Radiation',
    sub: 'Avoid this area immediately',
    bgClass: 'bg-red-500/10',
    textClass: 'text-red-400',
  },
};
