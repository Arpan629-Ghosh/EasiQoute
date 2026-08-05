import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.background,
    },
    inputicon: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      overflow: 'hidden',
      gap: 12,
      height: 48,
    },
    searchic: {
      height: 18,
      width: 18,
    },
    noBorderInput: {
      flex: 1,
      borderWidth: 0,
      height: '100%',
      paddingHorizontal: 0,
    },
    input: {
      paddingHorizontal: 16,
    },
    footer: {
      position: 'absolute',
      width: '100%',
      paddingBottom: 40,
      backgroundColor: theme.background,
      bottom: 0,
      left: 0,
      right: 0,
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
      marginTop: 16,
      paddingHorizontal: 12,
    },

    flatlistContent: {
      paddingBottom: 120,
    },
    loaderContainer: {
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });