import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home01 } from '@untitled-ui/icons-react';
import { Icon } from './Icon';
import type { IconSize } from './Icon';

const meta = {
  title: 'HDS/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [16, 20, 24, 32, 40],
    },
    color: { control: 'color' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Home01,
    size: 24,
    color: 'currentColor',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {([16, 20, 24, 32, 40] as IconSize[]).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon icon={Home01} size={size} />
          <span style={{ fontSize: 11, color: 'var(--typography-black-60)' }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};
