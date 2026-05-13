import { Theme } from '@/types/theme.types';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
    },
    forgotPasswordContainer: {
      width: '100%',
      gap: 24,
    },
   
    
    formContainer: {
      gap: 32,
      marginHorizontal: 12,
   
    },
    txtView: {
      width: '100%',
      gap: 8,
    },
    inpbttnView: {
      width: '100%',
      gap: 24,
      marginTop: 32,
      justifyContent: 'space-between',
    },
    input: {
      gap: 8,
    },

    keyboardContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    icon: {
      height: 28,
      width: 28,
    },
    safeareaview: {
      flex: 1,
      backgroundColor: theme.background,
      
    },
  });
