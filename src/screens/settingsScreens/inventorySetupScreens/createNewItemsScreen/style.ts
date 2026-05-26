import { Theme } from '@/types/theme.types';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      backgroundColor: theme.background,
      borderBottomColor: theme.border,
    },

    scrollContainer: {
      paddingBottom: 140,
    },

    content: {
      flex: 1,
      backgroundColor: theme.background,
    },

    filterandinput: {
      paddingVertical: 20,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },

    filterheading: {
      gap: 8,
    },

    filter: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    filterbttn: {
      borderRadius: 33,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: theme.cardSecondary,
      marginRight: 8,
      marginBottom: 8,
    },

    slectedfilterbttn: {
      backgroundColor: theme.chip,
      borderColor: theme.chipBorder,
      borderWidth: 1,
    },

    formContainer: {
      paddingVertical: 20,
      paddingHorizontal: 12,
    },

    inp: {
      gap: 8,
      marginBottom: 20,
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
      backgroundColor: theme.background,
    },

    noBorderInput: {
      flex: 1,
      borderWidth: 0,
      height: '100%',
      paddingHorizontal: 0,
      backgroundColor: 'transparent',
    },

    img: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
    },

    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      paddingBottom: 40,
      backgroundColor: theme.background,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },

    footerContainer: {
      paddingVertical: 12,
      marginHorizontal: 16,
    },
    deleteView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    delete: {
      height: 33,
      width: 93,
    },
  });
