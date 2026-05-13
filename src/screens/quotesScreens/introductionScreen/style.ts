import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    contaner: {
      flex: 1,
    },
    mainContainer: {
      gap: 4,
    },
    header: {
      width: '100%',
      paddingBottom: 12,
      gap: 12,
    },
    arrowContainer: {
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    img: {
      height: 28,
      width: 28,
      },
      txtContainer: {
          gap: 20,
          paddingHorizontal: 12
      },
      contentHeader: {
          flexDirection: "row"
      }
    
  });