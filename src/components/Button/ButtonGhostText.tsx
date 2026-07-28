import type { ButtonHTMLAttributes } from 'react';
import type { IconComponent } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';
import styles from './Button.module.css';

export interface ButtonGhostTextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  iconSize?: 12 | 16 | 20 | 24;
}

export function ButtonGhostText({
  leftIcon,
  rightIcon,
  iconSize = 16,
  disabled,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonGhostTextProps) {
  const cls = [styles.ghostText, disabled && styles.disabled, className].filter(Boolean).join(' ');

  return (
    <button type={type} disabled={disabled} className={cls} {...rest}>
      {leftIcon && <Icon icon={leftIcon} size={iconSize} />}
      <span>{children}</span>
      {rightIcon && <Icon icon={rightIcon} size={iconSize} />}
    </button>
  );
}
