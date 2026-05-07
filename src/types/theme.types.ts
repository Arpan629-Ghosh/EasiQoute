// theme.types.ts
export interface Theme {
  // backgrounds
  background: string;
  surface: string;
  card: string;
  cardSecondary: string;

  // text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // borders
  border: string;
  chip: string;
  chipBorder: string;
  footerBg: string;
  topTab: string;

  // actions
  primary: string;
  primaryText: string;
  secondary: string;

  // inputs
  inputBg: string;
  inputBorder: string;
  placeholder: string;
  searchInput: string;

  // gradients (based on your UI)
  gradientPrimary: string[];
}
