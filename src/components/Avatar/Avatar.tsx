import { useState } from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 24 | 32 | 40 | 48 | 56 | 64;

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;
}

export function Avatar({ src, alt = '', size = 48, className }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  const cls = [styles.root, className].filter(Boolean).join(' ');
  const px = `${size}px`;

  if (!src || failed) {
    return (
      <span
        className={[cls, styles.noimg].join(' ')}
        style={{ width: px, height: px }}
        aria-label={alt || '프로필 이미지 없음'}
        role="img"
      >
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="24" cy="24" r="24" fill="currentColor" opacity="0.08" />
          <circle cx="24" cy="19" r="7" fill="currentColor" opacity="0.4" />
          <path
            d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cls}
      style={{ width: px, height: px }}
      onError={() => setFailed(true)}
    />
  );
}
