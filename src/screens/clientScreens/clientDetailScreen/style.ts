import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingBottom: 12,
      gap: 12,
    },
    headerComponent: {
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    img: {
      height: 28,
      width: 28,
    },
    headerText: {
      gap: 12,
    },
    content: {
      flex: 1,
      gap: 20,
      paddingHorizontal: 12,
    },
    amtDetails: {
      gap: 8,
    },
    amtHeader: {
      flexDirection: 'row',
      gap: 8,
    },
    card: {
      flex: 1,
      gap: 8,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    txt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    nextCard: {
      gap: 8,
    },
    payment: {
      justifyContent: 'space-between',
      //   alignItems: "center",
      height: 52,
    },
    detail: {
      gap: 16,
    },
    cardtwo: {
      gap: 16,
    },
    contact: {
      gap: 16,
    },
    infocard: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    contactdetail: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    ractivity: {
      flex: 1,
      gap: 16,
    },
    activityTxt: {
      height: 22,
      gap: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    empty: {
      height: 0,
      borderWidth: 1,
      width: 245,
      borderColor: '#0000000A',
    },
    add: {
      height: 48,
      width: 48,
      borderRadius: 32,
      right: 12,
      bottom: 62,
      position: 'absolute',
    },
    ic: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },
    flatlist: {
      paddingBottom: 120,
    },

    update: {
      position: 'absolute',
      top: 30,
      right: 0,

      width: 120,
      backgroundColor: theme.background,

      borderRadius: 10,
      paddingVertical: 6,

      // iOS
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 8,

      // Android
      elevation: 6,

      zIndex: 1000,
    },

    dropdownItem: {
      height: 40,
      paddingHorizontal: 14,

      justifyContent: 'center',
    },

    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.border,
    },
    animation: {
      position: 'relative',
    },
  });