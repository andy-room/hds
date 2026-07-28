import { useState, useRef, useEffect } from 'react';
import { Calendar } from '@untitled-ui/icons-react';
import { DatePickerCalendar } from './DatePickerCalendar';
import { formatDate } from './utils';
import styles from './DatePicker.module.css';

export type DatePickerState = 'enabled' | 'focused' | 'filled' | 'disabled' | 'error' | 'success';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  placeholder?: string;
  state?: DatePickerState;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'YYYY.MM.DD',
  state,
  disabled = false,
  className,
  style,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value !== undefined ? value : internalValue;
  const isDisabled = disabled || state === 'disabled';
  const isError = state === 'error';
  const isSuccess = state === 'success';
  const isFocused = state === 'focused' || open;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  function handleSelect(date: Date) {
    setInternalValue(date);
    onChange?.(date);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className={[styles.wrapper, className].filter(Boolean).join(' ')} style={style}>
      <button
        type="button"
        className={[
          styles.trigger,
          isFocused && styles.focused,
          isError && styles.error,
          isSuccess && styles.success,
          isDisabled && styles.disabled,
        ].filter(Boolean).join(' ')}
        onClick={() => !isDisabled && setOpen(o => !o)}
        disabled={isDisabled}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={[styles.triggerText, !selectedDate && styles.placeholder].filter(Boolean).join(' ')}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        <Calendar width={16} height={16} className={styles.triggerIcon} />
      </button>

      {open && (
        <div className={styles.popup} role="dialog" aria-label="날짜 선택">
          <DatePickerCalendar
            mode="default"
            value={selectedDate}
            onChange={handleSelect}
            initialYear={selectedDate?.getFullYear()}
            initialMonth={selectedDate?.getMonth()}
          />
        </div>
      )}
    </div>
  );
}
