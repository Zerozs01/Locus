import type { Meta, StoryObj } from '@storybook/react-vite';
import { GradientProgressBar } from './GradientProgressBar';

const meta = {
  title: 'Components/GradientProgressBar',
  component: GradientProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## GradientProgressBar

Animated rainbow gradient progress bar ใช้สำหรับแสดงสถานะ loading หรือ progress

### Features
- 🌈 Rainbow gradient animation
- ⚡ Smooth CSS animation
- 📏 Configurable height

### Props
- \`show\`: boolean - แสดง/ซ่อน progress bar
- \`height?\`: number (default: 5) - ความสูงเป็น pixels
- \`className?\`: string - custom CSS classes
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    show: { control: 'boolean' },
    height: { control: 'number' },
  },
} satisfies Meta<typeof GradientProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    height: 5,
  },
};

export const Tall: Story = {
  name: 'Tall Progress Bar',
  args: {
    show: true,
    height: 12,
  },
};

export const Hidden: Story = {
  name: 'Hidden Progress Bar',
  args: {
    show: false,
    height: 5,
  },
};