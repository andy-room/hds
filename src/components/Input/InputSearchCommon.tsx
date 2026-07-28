import React, { forwardRef } from 'react';
import { SearchMd } from '@untitled-ui/icons-react';
import styles from './Input.module.css';

export type InputSearchCommonState = 'enabled' | 'focused' | 'filled' | 'result';

function FnIconClear() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#AEB0B6" />
      <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15.8332 10H4.1665M4.1665 10L9.99984 15.8333M4.1665 10L9.99984 4.16667" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface InputSearchCommonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  showSearch?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  onClear?: () => void;
  isResult?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const InputSearchCommon = forwardRef<HTMLInputElement, InputSearchCommonProps>(
  function InputSearchCommon(
    {
      showSearch = true,
      showBack = false,
      onBack,
      onClear,
      isResult = false,
      value,
      onChange,
      placeholder = '원하는 콘텐츠를 검색해 보세요.',
      className,
      style,
      ...inputProps
    },
    ref
  ) {
    const hasValue = Boolean(value);

    const pillClasses = [
      styles.searchCommonPill,
      isResult && styles.searchResult,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        className={[styles.searchCommonWrapper, className].filter(Boolean).join(' ')}
        style={style}
      >
        {showBack && (
          <button
            type="button"
            className={styles.searchCommonBack}
            onClick={onBack}
            aria-label="뒤로"
          >
            <BackIcon />
          </button>
        )}
        <div className={pillClasses}>
          {showSearch && (
            <SearchMd
              width={16}
              height={16}
              className={styles.searchCommonSearchIcon}
            />
          )}
          <input
            ref={ref}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles.searchCommonInput}
            {...inputProps}
          />
          {hasValue && onClear && (
            <button
              type="button"
              className={styles.searchCommonClear}
              onClick={onClear}
              aria-label="검색어 지우기"
            >
              <FnIconClear />
            </button>
          )}
        </div>
      </div>
    );
  }
);
