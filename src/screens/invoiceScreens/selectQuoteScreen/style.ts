import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    footer: {
      width: '100%',
      backgroundColor: theme.background,
    },
    footerBttn: {
      borderTopColor: theme.border,
      borderTopWidth: 0.5,
    },
    footerItem: {
      padding: 12,
      flexDirection: 'row',
      backgroundColor: 'red',
    },
    footerContainer: {
      paddingVertical: 12,
      marginHorizontal: 16,
    },

    content: {
      flex: 1,
      paddingHorizontal: 12,
      marginTop: 16,
    },
    flat: {
      paddingBottom: 120,
    },
    loaderContainer: {
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });