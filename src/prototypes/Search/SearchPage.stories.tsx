import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchPage } from './SearchPage';

const meta = {
  title: 'Prototypes/Search',
  component: SearchPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'gray', values: [{ name: 'gray', value: '#E5E7EB' }] },
  },
} satisfies Meta<typeof SearchPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '통합검색 리스트',
  args: {
    initialQuery: '데이터 분석',
    onBack: () => {},
  },
};

export const EmptyQuery: Story = {
  name: '검색어 없음',
  args: {
    initialQuery: '',
    onBack: () => {},
  },
};
