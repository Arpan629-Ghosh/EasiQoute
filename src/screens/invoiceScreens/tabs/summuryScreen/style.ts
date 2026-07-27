import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollview: {
      flex: 1,
    },
    content: {
      paddingBottom: 120,
      },
      header: {
          paddingVertical: 20,
          paddingHorizontal: 12,
          gap: 20,
          backgroundColor: theme.background,
          
      },
      linearGradient: {
          borderRadius: 12,
          gap: 12,
          padding: 12,
          height: 132,
          width: "100%"
      },
      txtView: {
          gap: 5
      }, 
      border: {
          borderWidth: 0.5,
          borderColor: theme.border
      }
  });