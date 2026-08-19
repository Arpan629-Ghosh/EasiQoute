import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json'
import bn from './locales/bn.json'
import hi from './locales/hi.json'
import gu from './locales/gu.json'

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',

  lng: 'en',

  fallbackLng: 'en',

  resources: {
    en: {
      translation: en,
    },
    hi: {
      translation: hi,
    },
    bn: {
      translation: bn,
    },
    gu: {
      translation: gu,
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
