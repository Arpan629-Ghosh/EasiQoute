import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerComponent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    img: {
      height: 28,
      width: 28,
    },
    content: {
      gap: 20,
      marginTop: 16,
      paddingHorizontal: 12,
    },
    topCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    status: {
      borderRadius: 5,
      paddingVertical: 4.5,
      paddingHorizontal: 10,
      gap: 10,
    },
    infocard: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    inforow: {
      gap: 16,
    },
    allocationHeader: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    border: {
      borderWidth: 1,
      borderColor: '#0000000A',
      height: 0,
      width: '80%',
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
      scrolling: {
        flex: 1
      },
      flat: {
          marginTop: 16,
          paddingHorizontal: 12
      },
      flatlist: {
          paddingBottom: 120
      }
  });