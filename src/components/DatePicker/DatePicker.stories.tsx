import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'HDS/DatePicker',
  component: DatePickerCalendar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DatePickerCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── DatePickerCalendar ── */

export const CalendarDefault: Story = {
  name: 'Calendar / Default',
  args: {
    mode: 'default',
    onChange: fn(),
  },
};

export const CalendarWithSelected: Story = {
  name: 'Calendar / With Selected Date',
  args: {
    mode: 'default',
    value: new Date(2026, 0, 10),
    onChange: fn(),
    initialYear: 2026,
    initialMonth: 0,
  },
};

export const CalendarRange: Story = {
  name: 'Calendar / Range mode',
  args: {
    mode: 'range',
    rangeStart: new Date(2026, 0, 7),
    rangeEnd: new Date(2026, 0, 15),
    onRangeChange: fn(),
    initialYear: 2026,
    initialMonth: 0,
  },
};

export const CalendarRangeInteractive: Story = {
  name: 'Calendar / Range (Interactive)',
  render: () => (
    <DatePickerCalendar
      mode="range"
      onRangeChange={fn()}
      initialYear={2026}
      initialMonth={0}
    />
  ),
};

/* ── DatePicker (trigger + popup) ── */

export const PickerEnabled: Story = {
  name: 'DatePicker / Enabled',
  render: () => <DatePicker onChange={fn()} />,
};

export const PickerFilled: Story = {
  name: 'DatePicker / Filled',
  render: () => <DatePicker value={new Date(2026, 0, 15)} onChange={fn()} />,
};

export const PickerError: Story = {
  name: 'DatePicker / Error',
  render: () => <DatePicker state="error" onChange={fn()} />,
};

export const PickerDisabled: Story = {
  name: 'DatePicker / Disabled',
  render: () => <DatePicker disabled onChange={fn()} />,
};

export const AllStates: Story = {
  name: 'DatePicker / All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <DatePicker placeholder="enabled" onChange={fn()} />
      <DatePicker state="focused" onChange={fn()} />
      <DatePicker value={new Date(2026, 0, 15)} state="filled" onChange={fn()} />
      <DatePicker state="error" onChange={fn()} />
      <DatePicker state="success" value={new Date(2026, 0, 10)} onChange={fn()} />
      <DatePicker disabled onChange={fn()} />
    </div>
  ),
};
