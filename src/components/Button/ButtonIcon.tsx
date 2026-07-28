import type { ButtonHTMLAttributes } from 'react';
import type { IconComponent } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';
import type { ButtonSize } from './Button';
import styles from './Button.module.css';

export type ButtonIconVariant = 'solid' | 'outline';

export interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconComponent;
  variant?: ButtonIconVariant;
  size?: ButtonSize;
  'aria-label': string;
}

const ICON_SIZE: Record<ButtonSize, 12 | 16 | 20 | 24> = {
  xxxs: 12, xxs: 12, xs: 16, sm: 16, md: 20, lg: 20, xl: 24, xxl: 24, xxxl: 24,
};

export function ButtonIcon({
  icon,
  variant = 'solid',
  size = 'sm',
  disabled,
  className,
  type = 'button',
  ...rest
}: ButtonIconProps) {
  const cls = [
    styles.btnIcon,
    styles[`icon-${variant}`],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} disabled={disabled} className={cls} {...rest}>
      <Icon icon={icon} size={ICON_SIZE[size]} />
    </button>
  );
}
