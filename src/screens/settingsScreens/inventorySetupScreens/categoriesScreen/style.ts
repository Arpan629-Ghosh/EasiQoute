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
    inpContainer: {
      paddingHorizontal: 12,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,

      width: '100%',

      backgroundColor: theme.background,

      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    footerContainer: {
      paddingVertical: 12,
      marginHorizontal: 16,
    },
    icn: {
      height: 12,
      width: 12,
    },
    flatlist: {
      flexGrow: 1,
      marginTop: 16,
      paddingHorizontal: 12,
      paddingBottom: 120,
    },
    loaderContainer: {
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    initialLoaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }); 