// theme.types.ts
export interface Theme {
  // backgrounds
  background: string;
  surface: string;
  card: string;

  // text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // borders
  border: string;
  chipBorder: string;

  // actions
  primary: string;
  primaryText: string;
  secondary: string;

  // inputs
  inputBg: string;
  inputBorder: string;
  placeholder: string;
  searchInput: string;

  // status
  success: string;
  error: string;

  // gradients (based on your UI)
  gradientPrimary: string[];
}
