import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'HDS/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['lg-desktop', 'lg-mobile', 'md', 'sm'] },
    currentPage: { control: { type: 'number', min: 1, max: 10 } },
    totalPages: { control: { type: 'number', min: 1, max: 20 } },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled(props: React.ComponentProps<typeof Pagination>) {
  const [page, setPage] = useState(props.currentPage ?? 1);
  return <Pagination {...props} currentPage={page} onPageChange={setPage} />;
}

export const LgDesktop: Story = {
  name: 'lg-desktop / 기본',
  render: () => <Controlled size="lg-desktop" currentPage={1} totalPages={5} />,
};

export const LgDesktopManyPages: Story = {
  name: 'lg-desktop / 페이지 다수 (10페이지)',
  render: () => <Controlled size="lg-desktop" currentPage={5} totalPages={10} />,
};

export const LgMobile: Story = {
  name: 'lg-mobile / 기본',
  render: () => <Controlled size="lg-mobile" currentPage={1} totalPages={8} />,
};

export const Md: Story = {
  name: 'md / 기본',
  render: () => <Controlled size="md" currentPage={1} totalPages={5} />,
};

export const Sm: Story = {
  name: 'sm / 기본',
  render: () => <Controlled size="sm" currentPage={1} totalPages={6} />,
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 32 }}>
      {(['lg-desktop', 'lg-mobile', 'md', 'sm'] as const).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-default)', fontSize: 'var(--text-12)', color: 'var(--typography-black-60)' }}>
            {size}
          </span>
          <Controlled size={size} currentPage={1} totalPages={5} />
        </div>
      ))}
    </div>
  ),
};

export const AllSizesDark: Story = {
  name: 'All Sizes (dark)',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div
      data-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 32,
        padding: 32,
        background: '#1B1C1E',
        borderRadius: 16,
      }}
    >
      {(['lg-desktop', 'lg-mobile', 'md', 'sm'] as const).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-default)', fontSize: '12px', color: 'rgba(247,247,248,0.45)' }}>
            {size}
          </span>
          <Controlled size={size} currentPage={1} totalPages={5} />
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive (Controls)',
  args: {
    size: 'lg-desktop',
    currentPage: 3,
    totalPages: 7,
  },
  render: args => <Controlled {...args} />,
};

export const PageNavigation: Story = {
  name: 'lg-desktop / 페이지 이동 테스트',
  render: () => <Controlled size="lg-desktop" currentPage={1} totalPages={3} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nextBtn = canvas.getByRole('button', { name: '다음 페이지' });
    await userEvent.click(nextBtn);

    const page2 = canvas.getByRole('button', { name: '2' });
    await expect(page2).toHaveAttribute('aria-current', 'page');
  },
};

export const DisabledPrev: Story = {
  name: 'lg-desktop / 첫 페이지 (이전 비활성)',
  render: () => <Controlled size="lg-desktop" currentPage={1} totalPages={5} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prevBtn = canvas.getByRole('button', { name: '이전 페이지' });
    await expect(prevBtn).toBeDisabled();
  },
};

export const DisabledNext: Story = {
  name: 'lg-desktop / 마지막 페이지 (다음 비활성)',
  render: () => <Controlled size="lg-desktop" currentPage={5} totalPages={5} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nextBtn = canvas.getByRole('button', { name: '다음 페이지' });
    await expect(nextBtn).toBeDisabled();
  },
};
