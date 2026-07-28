import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import styles from './ActionArea.module.css';

type BaseProps = {
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

type ButtonProps = BaseProps & {
  href?: undefined;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  'aria-label'?: string;
};

type AnchorProps = BaseProps & {
  href: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
  'aria-label'?: string;
};

export type ActionAreaProps = ButtonProps | AnchorProps;

export function ActionArea(props: ActionAreaProps) {
  const { disabled, className, style, 'aria-label': ariaLabel } = props;

  const cls = [styles.root, disabled && styles.disabled, className].filter(Boolean).join(' ');

  if (props.href !== undefined) {
    return (
      <a
        href={disabled ? undefined : props.href}
        target={props.target}
        rel={props.rel}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        className={cls}
        style={style}
      />
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cls}
      style={style}
    />
  );
}
