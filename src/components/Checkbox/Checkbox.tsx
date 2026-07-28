import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

export function Checkbox({ label, disabled, id: idProp, className, ...rest }: CheckboxProps) {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <label
      htmlFor={id}
      className={[styles.root, disabled && styles.disabled, className].filter(Boolean).join(' ')}
    >
      <span className={styles.box}>
        <input id={id} type="checkbox" disabled={disabled} className={styles.input} {...rest} />
        <span className={styles.indicator} aria-hidden="true">
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 6L5 9L10 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      {label != null && <span className={styles.label}>{label}</span>}
    </label>
  );
}
