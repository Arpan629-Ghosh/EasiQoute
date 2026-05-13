import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    flatlist: {
      flex: 1,
      marginTop: 16,
      marginHorizontal: 12,
    },
    footer: {
      width: '100%',
      backgroundColor: theme.background,
    },
    footeritem: {
      flexDirection: 'row',
      padding: 12,
      gap: 12,
      justifyContent: 'center',
    },
    
    
    addicon: {
      height: 12,
      width: 12,
    },
  });