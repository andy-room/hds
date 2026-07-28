import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from '@untitled-ui/icons-react';
import styles from './DatePickerCalendar.module.css';
import {
  buildCalendarGrid,
  formatMonthLabel,
  isSameDay,
  isStrictlyInRange,
  normalizeRange,
} from './utils';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const today = new Date();

export interface DatePickerCalendarProps {
  mode?: 'default' | 'range';
  value?: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  onChange?: (date: Date) => void;
  onRangeChange?: (start: Date, end: Date | null) => void;
  initialYear?: number;
  initialMonth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function DatePickerCalendar({
  mode = 'default',
  value,
  rangeStart: rangeStartProp,
  rangeEnd: rangeEndProp,
  onChange,
  onRangeChange,
  initialYear = today.getFullYear(),
  initialMonth = today.getMonth(),
  className,
  style,
}: DatePickerCalendarProps) {
  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [internalValue, setInternalValue] = useState<Date | null>(value ?? null);
  const [internalStart, setInternalStart] = useState<Date | null>(rangeStartProp ?? null);
  const [internalEnd, setInternalEnd] = useState<Date | null>(rangeEndProp ?? null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const selectedDate = value !== undefined ? value : internalValue;
  const rangeStart = rangeStartProp !== undefined ? rangeStartProp : internalStart;
  const rangeEnd = rangeEndProp !== undefined ? rangeEndProp : internalEnd;

  const cells = buildCalendarGrid(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear(y => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth(m => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear(y => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth(m => m + 1);
    }
  }

  function handleCellClick(date: Date) {
    if (mode === 'default') {
      setInternalValue(date);
      onChange?.(date);
    } else {
      if (!internalStart || (internalStart && internalEnd)) {
        setInternalStart(date);
        setInternalEnd(null);
        onRangeChange?.(date, null);
      } else {
        const [s, e] = normalizeRange(internalStart, date);
        setInternalStart(s);
        setInternalEnd(e);
        onRangeChange?.(s, e);
      }
    }
  }

  // effective range (either confirmed or preview with hover)
  const effectiveStart = rangeStart;
  const effectiveEnd = rangeEnd ?? (internalStart && !internalEnd && hoverDate ? hoverDate : null);

  return (
    <div
      className={[styles.calendar, className].filter(Boolean).join(' ')}
      style={style}
    >
      {/* Header */}
      <div className={styles.header}>
        <button type="button" className={styles.monthLabel} aria-label="월/년 선택">
          <span>{formatMonthLabel(viewYear, viewMonth)}</span>
          <ChevronDown width={12} height={12} className={styles.chevron} />
        </button>
        <div className={styles.navBtns}>
          <button type="button" className={styles.navBtn} onClick={prevMonth} aria-label="이전 달">
            <ChevronLeft width={16} height={16} />
          </button>
          <button type="button" className={styles.navBtn} onClick={nextMonth} aria-label="다음 달">
            <ChevronRight width={16} height={16} />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className={styles.grid}>
        {/* Day labels */}
        {DAY_LABELS.map(d => (
          <div key={d} className={[styles.cell, styles.dayLabel, d === '일' && styles.sunday].filter(Boolean).join(' ')}>
            {d}
          </div>
        ))}

        {/* Date cells */}
        {cells.map((date, idx) => {
          const isCurrentMonth = date.getMonth() === viewMonth;
          const isToday = isSameDay(date, today);
          const isSunday = date.getDay() === 0;
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          const isRangeStart = effectiveStart ? isSameDay(date, effectiveStart) : false;
          const isRangeEnd = effectiveEnd ? isSameDay(date, effectiveEnd) : false;
          const inRange = effectiveStart && effectiveEnd
            ? isStrictlyInRange(date, effectiveStart, effectiveEnd)
            : false;
          const isEdge = isRangeStart || isRangeEnd;

          const showStrip = mode === 'range' && (inRange || isEdge);
          const stripStart = isRangeStart && effectiveEnd !== null;
          const stripEnd = isRangeEnd;
          const stripMiddle = inRange;

          const isActive = mode === 'default' ? isSelected : isEdge;

          return (
            <div
              key={idx}
              className={styles.cellWrapper}
              onMouseEnter={() => mode === 'range' && setHoverDate(date)}
              onMouseLeave={() => mode === 'range' && setHoverDate(null)}
            >
              {showStrip && (
                <span
                  className={[
                    styles.strip,
                    stripStart && styles.stripStart,
                    stripEnd && styles.stripEnd,
                    stripMiddle && styles.stripMiddle,
                  ].filter(Boolean).join(' ')}
                />
              )}
              <button
                type="button"
                className={[
                  styles.cell,
                  styles.dateCell,
                  !isCurrentMonth && styles.outOfMonth,
                  isSunday && styles.sunday,
                  isToday && !isActive && styles.today,
                  isActive && styles.active,
                  inRange && !isEdge && styles.inRange,
                ].filter(Boolean).join(' ')}
                onClick={() => isCurrentMonth && handleCellClick(date)}
                tabIndex={isCurrentMonth ? 0 : -1}
                aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
                aria-pressed={isActive || undefined}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
