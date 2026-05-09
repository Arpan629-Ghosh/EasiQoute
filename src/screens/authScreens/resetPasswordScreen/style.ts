
import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
    },
    forgotPasswordContainer: {
      width: '100%',
      gap: 24,
    },
    headerView: {
      width: '100%',
      paddingBottom: 12,
      gap: 12,
    },
    arrowContainer: {
  
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginTop: 56,
      marginBottom: 12,
    },
    img: {
      height: 28,
      width: 28,
    },
    formContainer: {
      gap: 32,
      marginHorizontal: 12,
      marginTop: 24,
    },
    txtView: {
      width: '100%',
      gap: 8,
    },
    inpbttnView: {

      width: '100%',
      gap: 24,
      marginTop: 32,
      justifyContent: 'space-between',
    },
    input: {
      gap: 8,
    },
    
    keyboardContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    icon: {
      height: 28,
      width: 28,
    },
    safeareaview: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });