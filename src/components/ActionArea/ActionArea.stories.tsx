import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ActionArea } from './ActionArea';

const meta = {
  title: 'HDS/ActionArea',
  component: ActionArea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ActionArea>;

export default meta;
type Story = StoryObj<typeof meta>;

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 280,
        padding: '20px 24px',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--line-layout)',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'var(--font-default)',
      }}
    >
      <p style={{ margin: 0, fontSize: 'var(--text-14)', color: 'var(--typography-black-100)' }}>
        카드 제목
      </p>
      <p style={{ margin: '4px 0 0', fontSize: 'var(--text-12)', color: 'var(--typography-black-60)' }}>
        카드 설명 텍스트입니다.
      </p>
      {children}
    </div>
  );
}

export const Default: Story = {
  args: {
    onClick: fn(),
    'aria-label': '카드 상세보기',
  },
  render: (args) => (
    <Card>
      <ActionArea {...args} />
    </Card>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const area = canvas.getByRole('button', { name: '카드 상세보기' });
    await userEvent.click(area);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const AsLink: Story = {
  args: {
    href: '#',
    'aria-label': '카드 링크',
  },
  render: (args) => (
    <Card>
      <ActionArea {...args} />
    </Card>
  ),
};

export const Disabled: Story = {
  args: {
    onClick: fn(),
    disabled: true,
    'aria-label': '비활성화된 카드',
  },
  render: (args) => (
    <Card>
      <ActionArea {...args} />
    </Card>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const area = canvas.getByRole('button', { name: '비활성화된 카드' });
    await expect(area).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const ExtendedTouchArea: Story = {
  name: 'Extended Touch Area (음수 margin)',
  args: {
    onClick: fn(),
    'aria-label': '확장된 터치 영역',
  },
  render: (args) => (
    <div style={{ padding: 32, background: 'var(--bg-page)' }}>
      <Card>
        <ActionArea {...args} style={{ inset: '-12px' }} />
      </Card>
    </div>
  ),
};
