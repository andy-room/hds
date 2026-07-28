import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Home01, Plus, X, ChevronRight, SearchMd } from '@untitled-ui/icons-react';
import { Button } from './Button';
import { ButtonIcon } from './ButtonIcon';
import { ButtonGhostText } from './ButtonGhostText';
import { ButtonGhostIcon } from './ButtonGhostIcon';
import type { ButtonVariant, ButtonSize } from './Button';

const meta = {
  title: 'HDS/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'neutral', 'subtle', 'outline'] },
    size: { control: 'select', options: ['xxxs','xxs','xs','sm','md','lg','xl','xxl','xxxl'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Button ── */

export const Primary: Story = {
  args: { variant: 'primary', size: 'sm', children: '버튼', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '버튼' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {(['primary','neutral','subtle','outline'] as ButtonVariant[]).map(v => (
        <Button key={v} variant={v}>{v}</Button>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="primary" leftIcon={Plus}>추가</Button>
        <Button variant="neutral" rightIcon={ChevronRight}>다음</Button>
        <Button variant="outline" leftIcon={SearchMd}>검색</Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      {(['xxxs','xxs','xs','sm','md','lg','xl','xxl','xxxl'] as ButtonSize[]).map(s => (
        <Button key={s} variant="primary" size={s}>{s}</Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { variant: 'primary', children: '비활성화', disabled: true, onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: '비활성화' });
    await expect(btn).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/* ── ButtonIcon ── */

export const IconButton: Story = {
  name: 'ButtonIcon',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <ButtonIcon icon={Plus} variant="solid" size="sm" aria-label="추가" />
      <ButtonIcon icon={Plus} variant="outline" size="sm" aria-label="추가" />
      <ButtonIcon icon={X} variant="solid" size="md" aria-label="닫기" />
      <ButtonIcon icon={SearchMd} variant="outline" size="md" aria-label="검색" />
    </div>
  ),
};

export const IconButtonSizes: Story = {
  name: 'ButtonIcon Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {(['xxxs','xxs','xs','sm','md','lg','xl'] as ButtonSize[]).map(s => (
        <ButtonIcon key={s} icon={Plus} variant="solid" size={s} aria-label={`추가 ${s}`} />
      ))}
    </div>
  ),
};

/* ── ButtonGhostText ── */

export const GhostText: Story = {
  name: 'ButtonGhostText',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <ButtonGhostText>취소</ButtonGhostText>
      <ButtonGhostText leftIcon={Plus} iconSize={16}>더보기</ButtonGhostText>
      <ButtonGhostText rightIcon={ChevronRight} iconSize={16}>더보기</ButtonGhostText>
      <ButtonGhostText disabled>비활성화</ButtonGhostText>
    </div>
  ),
};

/* ── ButtonGhostIcon ── */

export const GhostIcon: Story = {
  name: 'ButtonGhostIcon',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <ButtonGhostIcon icon={Home01} size="xs" aria-label="홈" />
      <ButtonGhostIcon icon={Home01} size="sm" aria-label="홈" />
      <ButtonGhostIcon icon={Home01} size="md" aria-label="홈" />
      <ButtonGhostIcon icon={Home01} size="lg" aria-label="홈" />
      <ButtonGhostIcon icon={Home01} size="xl" aria-label="홈" />
      <ButtonGhostIcon icon={X} size="md" aria-label="닫기" />
      <ButtonGhostIcon icon={SearchMd} size="md" aria-label="검색" />
    </div>
  ),
};
