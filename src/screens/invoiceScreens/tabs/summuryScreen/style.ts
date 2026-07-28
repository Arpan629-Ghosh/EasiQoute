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
    header: {
      paddingVertical: 20,
      // paddingHorizontal: 12,
      gap: 20,
      backgroundColor: theme.background,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
    },
    linearGradient: {
      borderRadius: 12,
      gap: 12,
      padding: 12,
      height: 132,
      // width: "100%"
    },
    txtView: {
      gap: 5,
    },
    border: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    phoneText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    basicInfo: {
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 20,
      backgroundColor: theme.background,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
    },
    invNumber: {
      gap: 8,
    },
    invField: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
      gap: 12,
      borderColor: theme.border,
      backgroundColor: theme.cardSecondary,
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
    inputs: {
      gap: 8,
      width: '48.5%',
    },
    searchic: {
      height: 18,
      width: 18,
    },
    note: {
      gap: 8,
    },
    fileupload: {
      gap: 12,
    },
    upload: {
      height: 73,
      width: '100%',
      resizeMode: 'cover',
      borderRadius: 12,
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
  });
