import type { SVGProps } from 'react';

export type IconSize = 16 | 20 | 24 | 32 | 40;
export type IconComponent = React.ComponentType<SVGProps<SVGSVGElement>>;

export interface IconProps {
  icon: IconComponent;
  size?: IconSize;
  color?: string;
  className?: string;
  'aria-label'?: string;
}

export function Icon({ icon: IconSvg, size = 24, color = 'currentColor', className, 'aria-label': ariaLabel }: IconProps) {
  return (
    <IconSvg
      width={size}
      height={size}
      stroke={color}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    />
  );
}
