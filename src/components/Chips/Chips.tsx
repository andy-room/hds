import { FilterLines } from '@untitled-ui/icons-react';
import styles from './Chips.module.css';

export interface ChipsProps {
  children: React.ReactNode;
  showFilter?: boolean;
  filterCount?: number;
  onFilter?: () => void;
  className?: string;
}

export function Chips({
  children,
  showFilter = false,
  filterCount = 0,
  onFilter,
  className,
}: ChipsProps) {
  const isActive = filterCount > 0;

  return (
    <div className={[styles.chips, className].filter(Boolean).join(' ')}>
      {showFilter && (
        <div className={styles.filterSection}>
          <button
            type="button"
            aria-label="필터"
            className={[styles.filterBtn, isActive && styles.filterActive].filter(Boolean).join(' ')}
            onClick={onFilter}
          >
            <FilterLines width={20} height={20} />
            {isActive && (
              <span className={styles.filterBadge}>
                {filterCount > 99 ? '99+' : filterCount}
              </span>
            )}
          </button>
          <span className={styles.divider} aria-hidden="true" />
        </div>
      )}
      <div className={styles.list}>
        {children}
      </div>
    </div>
  );
}
