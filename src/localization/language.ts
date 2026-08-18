import { LanguageMode } from './types';

export interface LanguageOption {
  code: LanguageMode;
  label: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'Device',
    label: 'Device Language',
  },
  {
    code: 'en',
    label: 'English',
  },
  {
    code: 'hi',
    label: 'हिन्दी',
  },
  {
    code: 'bn',
    label: 'বাংলা',
  },
  {
    code: 'gu',
    label: 'ગુજરાતી',
  },
];
