import type { SVGProps } from 'react';
import { ChevronDown, XClose } from '@untitled-ui/icons-react';
import styles from './ChipsItem.module.css';

type IconComponent = React.ComponentType<SVGProps<SVGSVGElement>>;

export interface ChipsItemProps {
  type?: 'filter' | 'option';
  selected?: boolean;
  children: React.ReactNode;
  leadingIcon?: IconComponent;
  showLeadingIcon?: boolean;
  dropdown?: boolean;
  cancel?: boolean;
  onClick?: () => void;
  onCancel?: (e: React.MouseEvent) => void;
  className?: string;
}

export function ChipsItem({
  type = 'filter',
  selected = false,
  children,
  leadingIcon: LeadingIcon,
  showLeadingIcon = false,
  dropdown,
  cancel,
  onClick,
  onCancel,
  className,
}: ChipsItemProps) {
  const showDropdown = dropdown ?? (type === 'filter' && !selected);
  const showCancel = cancel ?? (type === 'filter' && selected);

  return (
    <button
      type="button"
      className={[
        styles.chip,
        styles[type],
        selected ? styles.selected : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {showLeadingIcon && LeadingIcon && (
        <LeadingIcon width={12} height={12} className={styles.icon} />
      )}
      <span className={styles.label}>{children}</span>
      {showDropdown && (
        <ChevronDown width={12} height={12} className={styles.icon} />
      )}
      {showCancel && (
        <span
          role="button"
          aria-label="선택 해제"
          className={styles.cancelBtn}
          onClick={e => { e.stopPropagation(); onCancel?.(e); }}
        >
          <XClose width={12} height={12} />
        </span>
      )}
    </button>
  );
}
