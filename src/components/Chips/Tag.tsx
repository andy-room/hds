import type { SVGProps } from 'react';
import { XClose } from '@untitled-ui/icons-react';
import styles from './Tag.module.css';

type IconComponent = React.ComponentType<SVGProps<SVGSVGElement>>;

export interface TagProps {
  size?: 'sm' | 'lg';
  children: React.ReactNode;
  leadingIcon?: IconComponent;
  showLeadingIcon?: boolean;
  cancel?: boolean;
  onCancel?: (e: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Tag({
  size = 'sm',
  children,
  leadingIcon: LeadingIcon,
  showLeadingIcon = false,
  cancel = false,
  onCancel,
  className,
  style,
}: TagProps) {
  return (
    <span
      className={[styles.tag, styles[size], className].filter(Boolean).join(' ')}
      style={style}
    >
      {showLeadingIcon && LeadingIcon && (
        <LeadingIcon width={12} height={12} className={styles.icon} />
      )}
      <span className={styles.label}>{children}</span>
      {cancel && (
        <button
          type="button"
          aria-label="삭제"
          className={styles.cancelBtn}
          onClick={onCancel}
        >
          <XClose width={12} height={12} />
        </button>
      )}
    </span>
  );
}
