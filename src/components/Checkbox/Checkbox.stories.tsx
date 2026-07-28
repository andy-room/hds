import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'HDS/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: { label: '항목 선택', onChange: fn() },
};

export const Checked: Story = {
  args: { label: '항목 선택', defaultChecked: true, onChange: fn() },
};

export const NoLabel: Story = {
  name: 'No Label',
  args: { 'aria-label': '선택', onChange: fn() },
};

export const Disabled: Story = {
  args: { label: '비활성화', disabled: true },
};

export const DisabledChecked: Story = {
  name: 'Disabled Checked',
  args: { label: '비활성화(체크)', disabled: true, defaultChecked: true },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled Checked" disabled defaultChecked />
      <Checkbox />
    </div>
  ),
};

function ControlledExample() {
  const [items, setItems] = useState({ apple: false, banana: true, cherry: false });
  const toggle = (key: keyof typeof items) =>
    setItems(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ margin: '0 0 4px', fontSize: 'var(--text-12)', color: 'var(--typography-black-60)', fontFamily: 'var(--font-default)' }}>
        좋아하는 과일을 선택하세요
      </p>
      {Object.entries(items).map(([key, val]) => (
        <Checkbox
          key={key}
          label={key}
          checked={val}
          onChange={() => toggle(key as keyof typeof items)}
        />
      ))}
    </div>
  );
}

export const Group: Story = {
  name: 'Group (Controlled)',
  render: () => <ControlledExample />,
};

export const InteractionTest: Story = {
  args: { label: '클릭해서 선택', onChange: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledOnce();
  },
};
