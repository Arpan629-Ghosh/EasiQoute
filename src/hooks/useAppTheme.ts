import { lightTheme } from '@/theme/light';
import { darkTheme } from '@/theme/dark';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


export const useAppTheme = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return {
    theme,
    isDark: mode === 'dark',
  };
};
