import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
      backgroundColor: theme.background,
    },

    inpContainer: {
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 20,
      height: 113,
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
    inp: {
      gap: 8,
    },
    delete: {
      height: 33,
      width: 93,
    },
    main: {
      gap: 24,
    },
    deleteView: {
      justifyContent: "center",
      alignItems: "center"
    }
  });