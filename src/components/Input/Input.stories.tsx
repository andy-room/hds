import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, userEvent, expect } from 'storybook/test';
import { SearchMd, Lock01 } from '@untitled-ui/icons-react';
import { Input } from './Input';
import { InputSelector } from './InputSelector';
import { InputSearchCommon } from './InputSearchCommon';

const meta = {
  title: 'HDS/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    state: {
      control: 'select',
      options: ['enabled', 'focused', 'filled', 'disabled', 'error', 'success'],
    },
    size: {
      control: 'radio',
      options: ['md', 'sm'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Base states ── */

export const Enabled: Story = {
  name: 'Input / Enabled',
  args: {
    state: 'enabled',
    placeholder: 'Placeholder',
    onChange: fn(),
  },
};

export const Focused: Story = {
  name: 'Input / Focused',
  args: {
    state: 'focused',
    placeholder: 'Placeholder',
    onChange: fn(),
  },
};

export const Filled: Story = {
  name: 'Input / Filled',
  args: {
    state: 'filled',
    defaultValue: '텍스트',
    onChange: fn(),
  },
};

export const Disabled: Story = {
  name: 'Input / Disabled',
  args: {
    state: 'disabled',
    defaultValue: '텍스트',
    onChange: fn(),
  },
};

export const ErrorState: Story = {
  name: 'Input / Error',
  args: {
    state: 'error',
    defaultValue: '텍스트',
    helpText: '메시지가 노출됩니다.',
    onChange: fn(),
  },
};

export const SuccessState: Story = {
  name: 'Input / Success',
  args: {
    state: 'success',
    defaultValue: '텍스트',
    helpText: '메시지가 노출됩니다.',
    onChange: fn(),
  },
};

/* ── Size ── */

export const SizeSm: Story = {
  name: 'Input / Size sm',
  args: {
    size: 'sm',
    state: 'enabled',
    placeholder: 'Placeholder',
    onChange: fn(),
  },
};

/* ── All states side by side ── */

export const AllStates: Story = {
  name: 'Input / All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Input placeholder="enabled" />
      <Input state="focused" placeholder="focused" />
      <Input state="filled" defaultValue="텍스트" />
      <Input state="disabled" defaultValue="텍스트" />
      <Input state="error" defaultValue="텍스트" helpText="메시지가 노출됩니다." />
      <Input state="success" defaultValue="텍스트" helpText="메시지가 노출됩니다." />
    </div>
  ),
};

/* ── With leading icon ── */

export const WithLeadingIcon: Story = {
  name: 'Input / Leading Icon',
  args: {
    leadingIcon: <Lock01 width={16} height={16} />,
    placeholder: 'Placeholder',
    onChange: fn(),
  },
};

/* ── With clear button (fn icon) ── */

export const WithClearButton: Story = {
  name: 'Input / Clear Button (focused)',
  render: () => {
    function Demo() {
      const [val, setVal] = useState('텍스트');
      return (
        <Input
          state="focused"
          value={val}
          onChange={e => setVal(e.target.value)}
          onClear={() => setVal('')}
        />
      );
    }
    return <Demo />;
  },
};

/* ── input-file: with trailing button ── */

export const InputFile: Story = {
  name: 'Input / File (Trailing Button)',
  args: {
    placeholder: '선택된 파일이 없습니다.',
    trailingButtonText: '파일 선택',
    onTrailingButtonClick: fn(),
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    const btn = canvas.getByText('파일 선택');
    await userEvent.click(btn);
  },
};

/* ── input-search: with leading search icon ── */

export const InputSearch: Story = {
  name: 'Input / Search',
  args: {
    leadingIcon: <SearchMd width={16} height={16} />,
    placeholder: '검색어를 입력해 보세요.',
    onChange: fn(),
  },
};

/* ── Interactive typing test ── */

export const TypeTest: Story = {
  name: 'Input / Type Interaction',
  args: {
    placeholder: 'Placeholder',
    onChange: fn(),
  },
  play: async ({ canvas, args }) => {
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, '안녕하세요');
    await expect(args.onChange).toHaveBeenCalled();
    await expect(input).toHaveValue('안녕하세요');
  },
};

/* ── InputSelector ── */

export const SelectorEnabled: Story = {
  name: 'InputSelector / Enabled',
  render: () => (
    <InputSelector
      selectOptions={[
        { value: '010', label: '010' },
        { value: '011', label: '011' },
        { value: '016', label: '016' },
      ]}
      selectPlaceholder="010"
      placeholder="1234 - 5678"
    />
  ),
};

export const SelectorAllStates: Story = {
  name: 'InputSelector / All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <InputSelector
        state="enabled"
        selectOptions={[{ value: '010', label: '010' }]}
        selectPlaceholder="010"
        placeholder="1234 - 5678"
      />
      <InputSelector
        state="filled"
        selectOptions={[{ value: '010', label: '010' }]}
        selectPlaceholder="010"
        defaultValue="1234 - 5678"
        placeholder="1234 - 5678"
      />
      <InputSelector
        state="error"
        selectOptions={[{ value: '010', label: '010' }]}
        selectPlaceholder="010"
        placeholder="1234 - 5678"
        helpText="메시지가 노출됩니다."
      />
      <InputSelector
        state="success"
        selectOptions={[{ value: '010', label: '010' }]}
        selectPlaceholder="010"
        placeholder="1234 - 5678"
        helpText="메시지가 노출됩니다."
      />
      <InputSelector
        state="disabled"
        selectOptions={[{ value: '010', label: '010' }]}
        selectPlaceholder="010"
        placeholder="1234 - 5678"
      />
    </div>
  ),
};

/* ── InputSearchCommon ── */

export const SearchCommonEnabled: Story = {
  name: 'InputSearchCommon / Enabled',
  render: () => (
    <InputSearchCommon placeholder="원하는 콘텐츠를 검색해 보세요." />
  ),
};

export const SearchCommonFilled: Story = {
  name: 'InputSearchCommon / Filled (with clear)',
  render: () => {
    function Demo() {
      const [val, setVal] = useState('데이터');
      return (
        <InputSearchCommon
          value={val}
          onChange={e => setVal(e.target.value)}
          onClear={() => setVal('')}
          showBack
        />
      );
    }
    return <Demo />;
  },
};

export const SearchCommonResult: Story = {
  name: 'InputSearchCommon / Result',
  render: () => {
    function Demo() {
      const [val, setVal] = useState('데이터');
      return (
        <InputSearchCommon
          value={val}
          onChange={e => setVal(e.target.value)}
          onClear={() => setVal('')}
          isResult
        />
      );
    }
    return <Demo />;
  },
};
