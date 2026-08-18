import en from './locales/en';
export type TranslationKeys = typeof en;
export type LanguageCode = 'en' | 'hi' | 'bn' | 'gu';
export type LanguageMode = 'Device' | LanguageCode;