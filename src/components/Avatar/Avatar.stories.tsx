import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';
import type { AvatarSize } from './Avatar';

const meta = {
  title: 'HDS/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_SRC = 'https://i.pravatar.cc/150?img=5';

export const Image: Story = {
  args: {
    src: SAMPLE_SRC,
    alt: '홍길동',
    size: 48,
  },
};

export const NoImage: Story = {
  name: 'No Image (fallback)',
  args: {
    alt: '이미지 없음',
    size: 48,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByRole('img', { name: '이미지 없음' });
    await expect(img).toBeInTheDocument();
  },
};

export const ImageError: Story = {
  name: 'Image Error (onerror → noimg)',
  args: {
    src: 'https://invalid-url-that-will-fail.example/img.jpg',
    alt: '로드 실패',
    size: 48,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {([24, 32, 40, 48, 56, 64] as AvatarSize[]).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar src={SAMPLE_SRC} alt="사용자" size={size} />
          <span style={{ fontSize: 11, color: 'var(--typography-black-60)', fontFamily: 'var(--font-default)' }}>
            {size}px
          </span>
        </div>
      ))}
    </div>
  ),
};

export const NoImageSizes: Story = {
  name: 'No Image Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {([24, 32, 40, 48, 56, 64] as AvatarSize[]).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar alt="사용자" size={size} />
          <span style={{ fontSize: 11, color: 'var(--typography-black-60)', fontFamily: 'var(--font-default)' }}>
            {size}px
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, background: 'var(--bg-page)', padding: 24 }}>
      <AvatarGroup
        size={32}
        avatars={[
          { src: 'https://i.pravatar.cc/150?img=1', alt: '사용자1' },
          { src: 'https://i.pravatar.cc/150?img=2', alt: '사용자2' },
          { src: 'https://i.pravatar.cc/150?img=3', alt: '사용자3' },
        ]}
      />
      <AvatarGroup
        size={40}
        max={3}
        avatars={[
          { src: 'https://i.pravatar.cc/150?img=4', alt: '사용자4' },
          { src: 'https://i.pravatar.cc/150?img=5', alt: '사용자5' },
          { src: 'https://i.pravatar.cc/150?img=6', alt: '사용자6' },
          { src: 'https://i.pravatar.cc/150?img=7', alt: '사용자7' },
          { src: 'https://i.pravatar.cc/150?img=8', alt: '사용자8' },
        ]}
      />
    </div>
  ),
};
