import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingBottom: 12,
      gap: 12,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
      backgroundColor: theme.background,
    },
    content: {
      gap: 2,
      backgroundColor: theme.background,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
    },
    inputs: {
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 20,
    },
    amt: {
      gap: 8,
    },
    select: {
      flexDirection: 'row',
      gap: 8,
    },
    options: {
      flexDirection: 'row',
      borderRadius: 12,
      borderWidth: 1,
      padding: 6,
      borderColor: theme.border,
    },
    option: {
      borderRadius: 5,
      padding: 12,
      gap: 12,
      alignItems: 'center',
    },

    selectAmt: {
      borderRadius: 8,
      backgroundColor: theme.primary,
    },
    invoiceDropDown: {
      gap: 8,
    },

    inputicon: {
      height: 48,
      //   flex: 1,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 12,
      //   overflow: 'hidden',
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

    bottom: {
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 20,
      backgroundColor: theme.background,
    },
    bottomContent: {
      gap: 16,
    },
    border: {
      borderWidth: 1,
      borderColor: theme.border,
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

    depositInput: {
      flex: 1,
    },
    loaderContainer: {
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });