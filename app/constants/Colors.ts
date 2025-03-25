export const Colors = {
  primary: '#0a7ea4',
  secondary: '#808080',
  background: '#ffffff',
  text: '#000000',
  lightText: '#666666',
  darkText: '#333333',
  error: '#ff0000',
  success: '#00ff00',
  warning: '#ffff00',
  info: '#0000ff',
} as const;

export type ColorName = keyof typeof Colors;
