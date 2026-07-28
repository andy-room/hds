import type { AvatarProps, AvatarSize } from './Avatar';
import { Avatar } from './Avatar';
import styles from './AvatarGroup.module.css';

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  size?: AvatarSize;
  max?: number;
  className?: string;
}

export function AvatarGroup({ avatars, size = 32, max = 5, className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;
  const px = `${size}px`;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {visible.map((avatar, i) => (
        <Avatar
          key={i}
          {...avatar}
          size={size}
          className={[styles.item, styles.avatarItem].filter(Boolean).join(' ')}
        />
      ))}
      {overflow > 0 && (
        <span
          className={[styles.item, styles.overflow].join(' ')}
          style={{ width: px, height: px }}
          aria-label={`${overflow}명 더`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
