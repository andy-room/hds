import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Flash } from '@untitled-ui/icons-react';
import { Chips } from './Chips';
import { ChipsItem } from './ChipsItem';
import { Tag } from './Tag';

const meta = {
  title: 'HDS/Chips',
  component: ChipsItem,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ChipsItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── ChipsItem ── */

export const FilterDefault: Story = {
  name: 'ChipsItem / Filter (default)',
  args: {
    type: 'filter',
    selected: false,
    children: '필터명',
    onClick: fn(),
  },
};

export const FilterSelected: Story = {
  name: 'ChipsItem / Filter (selected)',
  args: {
    type: 'filter',
    selected: true,
    children: '필터명',
    onClick: fn(),
    onCancel: fn(),
  },
};

export const OptionDefault: Story = {
  name: 'ChipsItem / Option (default)',
  args: {
    type: 'option',
    selected: false,
    children: '옵션명',
    onClick: fn(),
  },
};

export const OptionSelected: Story = {
  name: 'ChipsItem / Option (selected)',
  args: {
    type: 'option',
    selected: true,
    children: '옵션명',
    onClick: fn(),
  },
};

export const AllChipsItemStates: Story = {
  name: 'ChipsItem / All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 120, fontSize: 12, color: '#888' }}>filter / default</span>
        <ChipsItem type="filter" selected={false}>유형</ChipsItem>
        <ChipsItem type="filter" selected={false} showLeadingIcon leadingIcon={Flash}>유형</ChipsItem>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 120, fontSize: 12, color: '#888' }}>filter / selected</span>
        <ChipsItem type="filter" selected={true}>온라인</ChipsItem>
        <ChipsItem type="filter" selected={true} showLeadingIcon leadingIcon={Flash}>온라인</ChipsItem>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 120, fontSize: 12, color: '#888' }}>option / default</span>
        <ChipsItem type="option" selected={false}>옵션</ChipsItem>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 120, fontSize: 12, color: '#888' }}>option / selected</span>
        <ChipsItem type="option" selected={true}>옵션</ChipsItem>
      </div>
    </div>
  ),
};

/* ── Tag ── */

export const TagSm: Story = {
  name: 'Tag / sm',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Tag size="sm">태그</Tag>
      <Tag size="sm" cancel onCancel={fn()}>태그</Tag>
      <Tag size="sm" showLeadingIcon leadingIcon={Flash}>태그</Tag>
    </div>
  ),
};

export const TagLg: Story = {
  name: 'Tag / lg',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Tag size="lg">태그</Tag>
      <Tag size="lg" cancel onCancel={fn()}>태그</Tag>
      <Tag size="lg" showLeadingIcon leadingIcon={Flash}>태그</Tag>
    </div>
  ),
};

/* ── Chips container ── */

export const ChipsFilterDefault: Story = {
  name: 'Chips / Filter (default state)',
  render: () => (
    <Chips showFilter>
      <ChipsItem type="filter" selected={false}>유형</ChipsItem>
      <ChipsItem type="filter" selected={false}>교육비</ChipsItem>
      <ChipsItem type="filter" selected={false}>학습 시간</ChipsItem>
      <ChipsItem type="filter" selected={false}>학점</ChipsItem>
      <ChipsItem type="filter" selected={false} dropdown={false}>교재 제공</ChipsItem>
      <ChipsItem type="filter" selected={false} dropdown={false}>학습 가능</ChipsItem>
    </Chips>
  ),
};

export const ChipsFilterActive: Story = {
  name: 'Chips / Filter (active state)',
  render: () => (
    <Chips showFilter filterCount={2}>
      <ChipsItem type="filter" selected={true}>온라인</ChipsItem>
      <ChipsItem type="filter" selected={true}>10~20만원</ChipsItem>
      <ChipsItem type="filter" selected={false}>학습 시간</ChipsItem>
      <ChipsItem type="filter" selected={false}>학점</ChipsItem>
      <ChipsItem type="filter" selected={false} dropdown={false}>교재 제공</ChipsItem>
      <ChipsItem type="filter" selected={false} dropdown={false}>학습 가능</ChipsItem>
    </Chips>
  ),
};

function InteractiveChips() {
  const filters = [
    { id: 'type', label: '유형' },
    { id: 'price', label: '교육비' },
    { id: 'time', label: '학습 시간' },
    { id: 'credit', label: '학점' },
  ];
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <Chips showFilter filterCount={selected.size} onFilter={() => setSelected(new Set())}>
      {filters.map(f => (
        <ChipsItem
          key={f.id}
          type="filter"
          selected={selected.has(f.id)}
          onClick={() => toggle(f.id)}
          onCancel={() => toggle(f.id)}
        >
          {f.label}
        </ChipsItem>
      ))}
    </Chips>
  );
}

export const ChipsInteractive: Story = {
  name: 'Chips / Interactive',
  render: () => <InteractiveChips />,
};

function InteractiveTags() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Figma', 'Storybook']);
  const remove = (t: string) => setTags(prev => prev.filter(p => p !== t));

  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {tags.map(t => (
        <Tag key={t} size="sm" cancel onCancel={() => remove(t)}>
          {t}
        </Tag>
      ))}
    </div>
  );
}

export const TagInteractive: Story = {
  name: 'Tag / Interactive (cancel)',
  render: () => <InteractiveTags />,
};
