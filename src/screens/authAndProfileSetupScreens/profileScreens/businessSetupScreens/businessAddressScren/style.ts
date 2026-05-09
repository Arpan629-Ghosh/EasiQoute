import { Theme } from '@/types/theme.types';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeareaview: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
    },
    keyboardContainer: {
      flex: 1,
    },
    headerComponent: {
      height: 56,
      width: '100%',
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerContainer: {
      width: '100%',
      gap: 12,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    img: {
      height: 28,
      width: 28,
    },
    emptyview: {
      width: 28,
    },
    formContainer: {
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 24,
    },
    inputContainer: {
      gap: 20,
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
    searchic: {
      height: 18,
      width: 18,
    },
    inp: {
      gap: 8,
    },
    footer: {
      width: '100%',
      paddingBottom: 40,
    },
    footerContainer: {
      paddingVertical: 12,
      marginHorizontal: 12,
    },
    bttn: {
      height: 46,
      borderRadius: 12,
      padding: 12,
      marginHorizontal: 12,
      gap: 12,
      backgroundColor: theme.primary,
      alignItems: 'center',
    },
    scrollview: {
      paddingBottom: 120,
      flex: 1,
    },
  });
