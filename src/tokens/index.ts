/* HDS Design Tokens — TypeScript constants */

export const spacing = {
  0:    '0px',
  0.5:  '2px',
  1:    '4px',
  2:    '8px',
  3:    '12px',
  4:    '16px',
  5:    '20px',
  6:    '24px',
  8:    '32px',
  10:   '40px',
  12:   '48px',
  16:   '64px',
  20:   '80px',
  24:   '96px',
  32:   '128px',
  40:   '160px',
} as const;

export const radius = {
  none: '0px',
  sm:   '4px',
  md:   '8px',
  lg:   '16px',
  xl:   '20px',
  '2xl':'32px',
  '3xl':'40px',
  full: '9999px',
} as const;

export const border = {
  1: '1px',
  2: '2px',
  3: '3px',
  4: '4px',
} as const;

export const shadow = {
  xs:  '0px 1px 4px 0px rgba(0, 0, 0, 0.05)',
  sm:  '0px 1px 4px 0px rgba(0, 0, 0, 0.05), 0px 1px 4px 0px rgba(0, 0, 0, 0.1)',
  md:  '0px 1px 4px -1px rgba(0, 0, 0, 0.05), 0px 4px 4px -1px rgba(0, 0, 0, 0.1)',
  lg:  '0px 4px 4px -4px rgba(0, 0, 0, 0.05), 0px 16px 32px -4px rgba(0, 0, 0, 0.1)',
  xl:  '0px 4px 4px -4px rgba(0, 0, 0, 0.05), 0px 16px 16px -8px rgba(0, 0, 0, 0.1)',
  '2xl': '0px 16px 32px -8px rgba(0, 0, 0, 0.4)',
} as const;

export const fontSize = {
  12: '12px',
  14: '14px',
  16: '16px',
  18: '18px',
  20: '20px',
  24: '24px',
  28: '28px',
  32: '32px',
  40: '40px',
  48: '48px',
  64: '64px',
} as const;

export const fontWeight = {
  regular: 400,
  medium:  500,
  bold:    700,
} as const;

export const letterSpacing = {
  12: '-0.0417em',
  14: '-0.0357em',
  16: '-0.0313em',
  18: '-0.0278em',
  20: '-0.035em',
  24: '-0.0292em',
  28: '-0.025em',
  32: '-0.0219em',
  40: '-0.0175em',
  48: '-0.0146em',
  64: '-0.0109em',
} as const;

export const breakpoint = {
  xsmall:  375,
  small:   768,
  medium:  1024,
  large:   1440,
  xlarge:  2500,
} as const;

export const fontFamily = {
  default: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
  number:  "'SUIT', 'Pretendard', sans-serif",
} as const;
