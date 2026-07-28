import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationsPage } from './NotificationsPage';

const meta = {
  title: 'Prototypes/Notifications',
  component: NotificationsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'gray', values: [{ name: 'gray', value: '#E5E7EB' }] },
  },
} satisfies Meta<typeof NotificationsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'HU 알림 페이지',
  args: { onBack: () => {} },
};
