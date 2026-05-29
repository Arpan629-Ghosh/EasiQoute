import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    body: {
      height: 451,
      gap: 20,
      paddingVertical: 20,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },
    inp: {
      gap: 8,
    },
    nextinp: {
      gap: 8,
      marginBottom: 45,
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
    bttn: {
      height: 46,
      borderRadius: 12,
      padding: 12,
      marginHorizontal: 12,
      gap: 12,
      backgroundColor: theme.primary,
      alignItems: 'center',
    },
    scrollview: {
      flex: 1,
    },
    deleteView: {
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    delete: {
      height: 33,
      width: 93,
    },
  });