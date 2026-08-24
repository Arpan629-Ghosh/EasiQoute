import { Theme } from '@/types/theme.types';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      gap: 2,
      backgroundColor: theme.background,
    },
    form: {
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
    },
    inp: {
      gap: 8,
    },
    inputicon: {
      height: 50,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      overflow: 'hidden',
      gap: 12,
    },
    noBorderInput: {
      flex: 1,
      borderWidth: 0,
      height: '100%',
      paddingHorizontal: 0,
    },
    
    footer: {
      width: '100%',

      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.background,
    },
    footerContainer: {
      paddingVertical: 12,
      marginHorizontal: 12,
    },
    scrollview: {
      paddingBottom: 140,
      flexGrow: 1,
    },
    keyboard: {
      flex: 1,
    },
    searchWrapper: {
      position: 'relative',
      zIndex: 999,
    },

     
  });
