import type { Meta, StoryObj } from '@storybook/react-vite';
import { MembershipPage } from './MembershipPage';

const meta = {
  title: 'Prototypes/Membership',
  component: MembershipPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MembershipPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '멤버십 · 휴넷 CEO 탭',
  args: { onClose: () => {} },
};
