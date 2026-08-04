import { Theme } from '@/types/theme.types';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollview: {
      flex: 1,
    },
    content: {
      paddingBottom: 120,
    },
    basicinfo: {
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 20,
      backgroundColor: theme.background,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    inputs: {
      gap: 8,
      width: '48.5%',
    },
    inp: {
      gap: 8,
    },
    inputContainer: {
      gap: 12,
      flexDirection: 'row',
    },
    inputicon: {
      height: 48,
      flex: 1,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 12,
      overflow: 'hidden',
      gap: 12,
    },
    noBorderInput: {
      flex: 1,
      borderWidth: 0,
      paddingHorizontal: 12,
      height: '100%',
    },
    searchic: {
      height: 18,
      width: 18,
    },
    switch: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      overflow: 'hidden',
    },
    newclient: {
      height: 29,
      width: 110,
    },
    upload: {
      height: 73,
      width: '100%',
      resizeMode: 'cover',
      borderRadius: 12,
    },
    fileupload: {
      gap: 12,
    },
    files: {
      gap: 8,
    },
    docs: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
      alignItems: 'center',
    },
    delete: {
      justifyContent: 'space-between',
      borderColor: theme.border,
      height: 24,
      width: 24,
    },
    footer: {
      position: 'absolute',
      width: '100%',
      backgroundColor: theme.background,
      bottom: 0,
      left: 0,
      right: 0,
    },
    footerContainer: {
      paddingVertical: 12,
      marginHorizontal: 16,
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
    keyboardContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    loaderContainer: {
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
