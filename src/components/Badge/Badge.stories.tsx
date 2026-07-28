import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, BadgeDot } from './Badge';
import type { BadgeVariant } from './Badge';

const meta = {
  title: 'HDS/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 5 },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 12 },
};

export const MaxCount: Story = {
  name: 'Max Count (99+)',
  args: { variant: 'primary', children: 120, max: 99 },
};

const statusVariants: BadgeVariant[] = ['brand', 'info', 'success', 'warning', 'error', 'normal'];
const statusLabels: Record<string, string> = {
  brand: '브랜드',
  info: '정보',
  success: '성공',
  warning: '경고',
  error: '오류',
  normal: '기본',
};

export const NumberBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Badge variant="primary">1</Badge>
      <Badge variant="primary">12</Badge>
      <Badge variant="primary" max={99}>120</Badge>
      <Badge variant="secondary">1</Badge>
      <Badge variant="secondary">99</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {statusVariants.map((v) => (
        <Badge key={v} variant={v}>{statusLabels[v]}</Badge>
      ))}
    </div>
  ),
};

export const Dot: Story = {
  name: 'BadgeDot',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: 'var(--bg-page)' }}>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <span style={{
          width: 40, height: 40, borderRadius: 'var(--radius-full)',
          background: 'var(--bg-muted)', display: 'block'
        }} />
        <BadgeDot style={{ position: 'absolute', top: 0, right: 0 }} />
      </div>
      <BadgeDot />
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'var(--font-default)' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 'var(--text-12)', color: 'var(--typography-black-60)' }}>숫자 뱃지</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge variant="primary">42</Badge>
          <Badge variant="secondary">42</Badge>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 'var(--text-12)', color: 'var(--typography-black-60)' }}>상태 뱃지</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {statusVariants.map((v) => (
            <Badge key={v} variant={v}>{statusLabels[v]}</Badge>
          ))}
        </div>
      </div>
    </div>
  ),
};
