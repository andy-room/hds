import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md';
export type InputState = 'enabled' | 'focused' | 'filled' | 'disabled' | 'error' | 'success';

function FnIconClear() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#AEB0B6" />
      <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FnIconError() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#FA2E43" />
      <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FnIconSuccess() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#00BF40" />
      <path d="M6 10.5L8.5 13L14 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  state?: InputState;
  leadingIcon?: React.ReactNode;
  onClear?: () => void;
  trailingButtonText?: string;
  onTrailingButtonClick?: () => void;
  helpText?: string;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    state = 'enabled',
    leadingIcon,
    onClear,
    trailingButtonText,
    onTrailingButtonClick,
    helpText,
    disabled,
    className,
    wrapperClassName,
    wrapperStyle,
    ...inputProps
  },
  ref
) {
  const isDisabled = disabled || state === 'disabled';

  const showClearBtn = Boolean(onClear) && !isDisabled && (state === 'enabled' || state === 'focused');
  const showErrorIcon = state === 'error';
  const showSuccessIcon = state === 'success';

  const helpColor =
    state === 'error' ? '#FA2E43' : state === 'success' ? '#00BF40' : undefined;

  const rowClasses = [
    styles.inputRow,
    size === 'sm' && styles.sm,
    state === 'focused' && styles.focused,
    state === 'disabled' && styles.disabled,
    state === 'error' && styles.error,
    state === 'success' && styles.success,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={[styles.wrapper, wrapperClassName].filter(Boolean).join(' ')}
      style={wrapperStyle}
    >
      <div className={rowClasses}>
        {leadingIcon && (
          <span className={styles.leadingIcon} aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          className={[styles.inputEl, size === 'sm' && styles.inputElSm, className]
            .filter(Boolean)
            .join(' ')}
          disabled={isDisabled}
          {...inputProps}
        />
        {showClearBtn && (
          <button
            type="button"
            className={styles.fnBtn}
            onClick={onClear}
            tabIndex={-1}
            aria-label="입력 초기화"
          >
            <FnIconClear />
          </button>
        )}
        {showErrorIcon && (
          <span className={styles.fnIcon}>
            <FnIconError />
          </span>
        )}
        {showSuccessIcon && (
          <span className={styles.fnIcon}>
            <FnIconSuccess />
          </span>
        )}
        {trailingButtonText && (
          <button
            type="button"
            className={styles.trailingBtn}
            onClick={onTrailingButtonClick}
            disabled={isDisabled}
          >
            {trailingButtonText}
          </button>
        )}
      </div>
      {helpText && (
        <p
          className={styles.helpText}
          style={helpColor ? { color: helpColor } : undefined}
        >
          {helpText}
        </p>
      )}
    </div>
  );
});
