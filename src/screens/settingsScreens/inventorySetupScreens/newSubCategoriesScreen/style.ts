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
      height: 206,
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
    inputicon: {
      height: 50,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      overflow: 'hidden',
    },
    img: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
    },
    noBorderInput: {
      flex: 1,
      borderWidth: 0,
      height: '100%',
      paddingHorizontal: 0,
    },
    flatlist: {
      flex: 1,
      position: 'absolute',
      top: 98,
      left: 12,
      right: 12,
      maxHeight: 240,
      backgroundColor: theme.background,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      zIndex: 999,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 10,
    },

    contentContainer: {
      flexGrow: 1,
      paddingVertical: 6,
    },
    delete: {
      height: 33,
      width: 93,
    },
    main: {
      gap: 24,
    },
    deleteView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });