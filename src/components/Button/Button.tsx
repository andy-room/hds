import type { ButtonHTMLAttributes } from 'react';
import type { IconComponent } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'neutral' | 'subtle' | 'outline';
export type ButtonSize = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  fullWidth?: boolean;
}

const ICON_SIZE: Record<ButtonSize, 12 | 16 | 20 | 24> = {
  xxxs: 12, xxs: 12, xs: 16, sm: 16, md: 20, lg: 20, xl: 24, xxl: 24, xxxl: 24,
};

export function Button({
  variant = 'primary',
  size = 'sm',
  leftIcon,
  rightIcon,
  fullWidth,
  disabled,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const iconSize = ICON_SIZE[size];
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} disabled={disabled} className={cls} {...rest}>
      {leftIcon && <Icon icon={leftIcon} size={iconSize} />}
      <span>{children}</span>
      {rightIcon && <Icon icon={rightIcon} size={iconSize} />}
    </button>
  );
}
