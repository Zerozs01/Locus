import type { Meta, StoryObj } from '@storybook/react';
import { ChatOverlay } from './ChatOverlay';

const meta = {
  title: 'Components/ChatOverlay',
  component: ChatOverlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'onClose' },
  },
} satisfies Meta<typeof ChatOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
