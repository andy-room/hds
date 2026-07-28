import type { ButtonHTMLAttributes } from 'react';
import type { IconComponent } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';
import styles from './Button.module.css';

export type ButtonGhostIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ButtonGhostIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconComponent;
  size?: ButtonGhostIconSize;
  'aria-label': string;
}

const ICON_SIZE: Record<ButtonGhostIconSize, 12 | 16 | 20 | 24 | 32 | 48> = {
  xs: 12, sm: 16, md: 20, lg: 24, xl: 32, xxl: 48,
};

export function ButtonGhostIcon({
  icon,
  size = 'md',
  disabled,
  className,
  type = 'button',
  ...rest
}: ButtonGhostIconProps) {
  const cls = [
    styles.ghostIcon,
    styles[`ghost-${size}`],
    disabled && styles.disabled,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} disabled={disabled} className={cls} {...rest}>
      <Icon icon={icon} size={ICON_SIZE[size]} />
    </button>
  );
}
