import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    formContainer: {
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 20,
      backgroundColor: theme.background,
    },
    inp: {
      gap: 8,
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

    scrollview: {
      flexGrow: 1,
      paddingBottom: 140,
    },
    keyboard: {
      flex: 1,
    },
  });