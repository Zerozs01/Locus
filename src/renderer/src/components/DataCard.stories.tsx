import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataCard, Placeholder, LogItem } from './DataCard';
import { Activity } from 'lucide-react';

const meta = {
  title: 'Components/DataCard',
  component: DataCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'AGENT LOGS',
    icon: <Activity size={12} />,
    children: (
      <div className="space-y-4">
        <LogItem time="10:42:01" msg="System Initialize..." color="text-green-500" />
        <LogItem time="10:42:05" msg="Scanning local storage" color="text-zinc-500" />
        <LogItem time="10:42:08" msg="Warning: Low Memory" color="text-amber-500" />
      </div>
    ),
  },
};

export const WithPlaceholder: Story = {
  args: {
    title: 'PENDING DATA',
    icon: <Activity size={12} />,
    children: <Placeholder text="Waiting for input..." />,
  },
};
