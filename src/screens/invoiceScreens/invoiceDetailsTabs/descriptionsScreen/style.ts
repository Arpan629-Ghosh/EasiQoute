import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      flex: 1,
      marginTop: 20,
    },
    scrollview: {
      paddingBottom: 40,
      marginHorizontal: 6,
    },
    infocard: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    inforow: {
      gap: 16,
    },
    img: {
      height: 28,
      width: 28,
    },
    empty: {
      borderWidth: 0.5,
      borderColor: theme.border,
      marginTop: 12,
    },
    expand: {
      gap: 12,
    },
    cardContainer: {
      gap: 8,
    },
    footer: {
      width: '100%',
      backgroundColor: theme.background,
    },
    footeritem: {
      paddingVertical: 12,
      marginHorizontal: 16,
    },
    addicon: {
      height: 16,
      width: 16,
    },
    intro: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });