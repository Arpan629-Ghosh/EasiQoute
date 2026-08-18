import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from '@/redux/store';
import { getDeviceLanguage } from '@/localization/getDeviceLanguage';

export const useAppLanguage = () => {
  const { i18n } = useTranslation();

  const languageMode = useSelector((state: RootState) => state.language.mode);

  const language =
    languageMode === 'Device' ? getDeviceLanguage() : languageMode;

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  return {
    language,
    languageMode,
    isDeviceLanguage: languageMode === 'Device',
  };
};
