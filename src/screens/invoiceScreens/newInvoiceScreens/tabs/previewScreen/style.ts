import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    containe: {
      flex: 1,
    },
    webViewContainer: {
      flex: 1,
      marginHorizontal: 12,
      marginTop: 12,
      overflow: 'hidden',
      backgroundColor: theme.background,
    },

    webView: {
      flex: 1,
      backgroundColor: theme.background,
    },

    loader: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    footer: {
      backgroundColor: theme.background,
      borderTopWidth: 0.5,
      borderTopColor: theme.border,
    },
    firstBttnContainer: {
      paddingTop: 12,
      paddingHorizontal: 12,
      gap: 12,
    },
    secondBttnContainer: {
      flexDirection: 'row',
      padding: 12,
      gap: 12,
    },
    share: {
      height: 16,
      width: 18,
    },
  });