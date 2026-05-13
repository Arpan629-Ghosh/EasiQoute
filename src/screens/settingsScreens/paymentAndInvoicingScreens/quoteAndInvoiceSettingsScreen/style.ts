import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    keyboard: {
      flex: 1,
    },
    scrollview: {
      flexGrow: 1,
      paddingBottom: 140,
    },
    formContainer: {
      gap: 20,
      paddingVertical: 20,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },
    inp: {
      gap: 8,
    },
    inpHeader: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    icn: {
      height: 14,
      width: 14,
    },
    signature: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      gap: 8,
      borderColor: theme.border,
  
      alignItems: 'center',
    },
    addsign: {
      height: 18,
      width: 18,
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
    sign: {
      height: 50,
      width: '100%',
      backgroundColor: '#EFEDED',
    },
  });