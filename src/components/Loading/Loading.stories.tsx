import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './Loading';

const meta = {
  title: 'HDS/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'radio', options: ['circular', 'wavedot'] },
    size: { control: { type: 'range', min: 16, max: 120, step: 4 } },
    color: { control: 'color' },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  name: 'Loading / Circular',
  args: { type: 'circular' },
};

export const WaveDot: Story = {
  name: 'Loading / Wave Dot',
  render: () => (
    <div style={{ background: '#0066FF', padding: 24, borderRadius: 12, display: 'inline-flex' }}>
      <Loading type="wavedot" />
    </div>
  ),
};

export const WaveDotDark: Story = {
  name: 'Loading / Wave Dot (dark dot)',
  render: () => (
    <div style={{ background: '#F7F7F8', padding: 24, borderRadius: 12, display: 'inline-flex' }}>
      <Loading type="wavedot" color="#171719" />
    </div>
  ),
};

export const CircularSizes: Story = {
  name: 'Loading / Circular Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Loading type="circular" size={28} />
      <Loading type="circular" size={40} />
      <Loading type="circular" size={56} />
      <Loading type="circular" size={80} />
    </div>
  ),
};

export const UseCaseOverlay: Story = {
  name: 'Use Case / Page overlay',
  render: () => (
    <div
      style={{
        position: 'relative',
        width: 360,
        height: 200,
        background: '#F7F7F8',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loading type="circular" />
    </div>
  ),
};

export const UseCaseButton: Story = {
  name: 'Use Case / Button with loading',
  render: () => (
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 56,
        padding: '0 24px',
        background: '#0066FF',
        border: 'none',
        borderRadius: 12,
        color: '#FFFFFF',
        fontSize: 16,
        cursor: 'not-allowed',
      }}
    >
      <Loading type="wavedot" size={28} />
    </button>
  ),
};

export const AllTypes: Story = {
  name: 'Loading / All Types',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Loading type="circular" />
        <span style={{ fontSize: 12, color: '#70737C' }}>circular</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          background: '#0066FF',
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Loading type="wavedot" />
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>wavedot</span>
      </div>
    </div>
  ),
};
