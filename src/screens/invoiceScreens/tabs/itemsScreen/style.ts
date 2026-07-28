import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    linearGradient: {
      flex: 1,
    },

    header: {
      gap: 16,
      padding: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
      backgroundColor: theme.background,
    },
    filteritems: {
      flexDirection: 'row',
      gap: 8,
    },
    filterbttn: {
      borderRadius: 33,
      paddingVertical: 10,
      paddingHorizontal: 12,
      gap: 12,
      backgroundColor: theme.cardSecondary,
    },
    slectedfilterbttn: {
      backgroundColor: theme.chip,
      borderColor: theme.chipBorder,
      borderWidth: 1,
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
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 12,
      overflow: 'hidden',
    },
    footer: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderTopColor: theme.border,
      backgroundColor: theme.background,
      width: '100%',
      alignItems: 'center',
    },
    footerComponent: {
      paddingVertical: 12,
    },
    txtContainer: {
      paddingVertical: 16,
      gap: 12,
    },
    txt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    close: {
      height: 18,
      width: 18,
    },
    inforow: {
      gap: 16,
      width: 'auto',
      marginBottom: 16,
    },
    empty: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    bttnContainer: {
      padding: 12,
      gap: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icn: {
      height: 16,
      width: 16,
    },
    flatlist: {
      flex: 1,

      paddingTop: 16,
      paddingHorizontal: 12,
    },
  });