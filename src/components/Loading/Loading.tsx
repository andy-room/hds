import styles from './Loading.module.css';

export type LoadingType = 'circular' | 'wavedot';

export interface LoadingProps {
  type?: LoadingType;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

// Figma ratios: stroke = 10/80 = 12.5%, arc ≈ 75%
function CircularSpinner({ size, color }: { size: number; color: string }) {
  const strokeWidth = Math.round(size * 0.125);
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const arc = circumference * 0.75;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={styles.circularSvg}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${arc} ${circumference}`}
      />
    </svg>
  );
}

// Figma ratios: dot = 10/58 ≈ 17.2%, gap ≈ same
function WaveDot({ size, color }: { size: number; color: string }) {
  const dotSize = Math.round(size * (10 / 58));
  const gap = Math.round(size * (10 / 58));

  return (
    <div
      className={styles.wavedotWrapper}
      style={{ gap, width: size, height: size }}
      aria-hidden="true"
    >
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className={styles.dot}
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
            animationDelay: `${i * 0.13}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Loading({
  type = 'circular',
  size,
  color,
  className,
  style,
  'aria-label': ariaLabel = '로딩 중',
}: LoadingProps) {
  const defaultSize = type === 'circular' ? 80 : 58;
  const defaultColor = type === 'circular' ? '#0066FF' : '#FFFFFF';

  const resolvedSize = size ?? defaultSize;
  const resolvedColor = color ?? defaultColor;

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={className}
      style={style}
    >
      {type === 'circular' ? (
        <CircularSpinner size={resolvedSize} color={resolvedColor} />
      ) : (
        <WaveDot size={resolvedSize} color={resolvedColor} />
      )}
    </span>
  );
}
