// useSyncThemeWithSystem.ts
import { setTheme } from '@/redux/theme/themeSlice';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';


export const useSyncAppTheme = () => {
  const scheme = useColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (scheme === 'dark') {
      dispatch(setTheme('dark'));
    } else {
      dispatch(setTheme('light'));
    }
  }, [scheme,dispatch]);
};
