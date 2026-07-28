import React, { useState } from 'react';
import { ChevronDown } from '@untitled-ui/icons-react';
import styles from './Input.module.css';

export type InputSelectorState =
  | 'enabled'
  | 'focused-select'
  | 'focused-input'
  | 'filled'
  | 'disabled'
  | 'error'
  | 'success';

export interface InputSelectorOption {
  value: string;
  label: string;
}

export interface InputSelectorProps {
  state?: InputSelectorState;
  selectOptions?: InputSelectorOption[];
  selectValue?: string;
  onSelectChange?: (value: string) => void;
  selectPlaceholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function InputSelector({
  state = 'enabled',
  selectOptions = [],
  selectValue,
  onSelectChange,
  selectPlaceholder,
  value,
  defaultValue,
  onChange,
  placeholder,
  helpText,
  disabled,
  className,
  style,
}: InputSelectorProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [internalSelectValue, setInternalSelectValue] = useState(selectPlaceholder ?? '');

  const isDisabled = disabled || state === 'disabled';

  const displaySelect =
    selectValue !== undefined ? selectValue : internalSelectValue;

  const helpColor =
    state === 'error' ? '#FA2E43' : state === 'success' ? '#00BF40' : undefined;

  const rowClasses = [
    styles.selectorRow,
    (state === 'focused-select' || state === 'focused-input') && styles.focused,
    state === 'disabled' && styles.disabled,
    state === 'error' && styles.error,
    state === 'success' && styles.success,
  ]
    .filter(Boolean)
    .join(' ');

  function handleOptionClick(opt: InputSelectorOption) {
    if (selectValue === undefined) setInternalSelectValue(opt.label);
    onSelectChange?.(opt.value);
    setOpenDropdown(false);
  }

  return (
    <div
      className={[styles.selectorOuter, className].filter(Boolean).join(' ')}
      style={style}
    >
      <div className={rowClasses}>
        <button
          type="button"
          className={styles.selectorSelectBtn}
          onClick={() => !isDisabled && setOpenDropdown(o => !o)}
          disabled={isDisabled}
          aria-haspopup="listbox"
          aria-expanded={openDropdown}
        >
          <span>{displaySelect || selectPlaceholder}</span>
          <ChevronDown
            width={12}
            height={12}
            className={styles.selectorChevron}
          />
        </button>
        <input
          className={styles.selectorInput}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={isDisabled}
        />
      </div>
      {helpText && (
        <p
          className={styles.helpText}
          style={helpColor ? { color: helpColor } : undefined}
        >
          {helpText}
        </p>
      )}
      {openDropdown && selectOptions.length > 0 && (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            zIndex: 10,
            margin: '4px 0 0',
            padding: '6px',
            listStyle: 'none',
            background: '#FFFFFF',
            border: '1px solid #E1E2E4',
            borderRadius: '8px',
            boxShadow: '0px 4px 4px -4px rgba(0,0,0,0.05), 0px 16px 16px -8px rgba(0,0,0,0.1)',
            width: '70px',
          }}
        >
          {selectOptions.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={displaySelect === opt.label}
              onClick={() => handleOptionClick(opt)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-default)',
                fontSize: 'var(--text-14)',
                color: 'var(--typography-black-100)',
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
