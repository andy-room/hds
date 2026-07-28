import styles from './Badge.module.css';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'brand'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'normal';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  max?: number;
  className?: string;
}

export function Badge({ variant = 'primary', children, max, className }: BadgeProps) {
  let content = children;

  if (max !== undefined && typeof children === 'number' && children > max) {
    content = `${max}+`;
  }

  return (
    <span className={[styles.root, styles[variant], className].filter(Boolean).join(' ')}>
      {content}
    </span>
  );
}

export function BadgeDot({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={[styles.dot, className].filter(Boolean).join(' ')}
      style={style}
      role="status"
      aria-label="알림"
    />
  );
}
