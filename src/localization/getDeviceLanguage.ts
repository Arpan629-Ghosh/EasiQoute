import { getLocales } from 'react-native-localize';
import { LanguageCode } from './types';

const SUPPORTED_LANGUAGES: LanguageCode[] = ['en', 'hi', 'bn', 'gu'];

export const getDeviceLanguage = (): LanguageCode => {
  const deviceLanguage = getLocales()[0]?.languageCode;

  if (
    deviceLanguage &&
    SUPPORTED_LANGUAGES.includes(deviceLanguage as LanguageCode)
  ) {
    return deviceLanguage as LanguageCode;
  }

  return 'en';
};
