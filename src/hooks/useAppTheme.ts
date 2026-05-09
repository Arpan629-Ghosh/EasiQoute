import { lightTheme } from '@/theme/light';
import { darkTheme } from '@/theme/dark';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useColorScheme } from 'react-native';

export const useAppTheme = () => {
  const systemTheme = useColorScheme();
  const mode = useSelector((state: RootState) => state.theme.mode);

  let theme;

  if (mode === 'Device') {
    theme = systemTheme === 'dark' ? darkTheme : lightTheme;
  } else {
    theme = mode === 'Dark' ? darkTheme : lightTheme;
  }

  const isDark = mode === 'Device' ? systemTheme === 'dark' : mode === 'Dark';

  return {
    theme,
    isDark,
    mode,
  };
};
