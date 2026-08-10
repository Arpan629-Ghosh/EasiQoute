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
    cardContainer: {
      gap: 8,
    },
    status: {
      height: 26,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 4.5,
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F973151A',
    },
    statusimg: {
      height: 28,
      width: 128,
    },
    cardone: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infocard: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    inforow: {
      gap: 16,
    },
    empty: {
      borderWidth: 0.5,
      borderColor: theme.border,
      marginTop: 12,
    },
    img: {
      height: 28,
      width: 28,
    },
    contact: {
      gap: 16,
    },
    contactdetail: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    cardtwo: {
      gap: 16,
    },
    margin: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    expand: {
      gap: 12,
    },
    invoice: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    txt: {
      gap: 8,
    },
    invst: {
      paddingHorizontal: 10,
      gap: 10,
      borderRadius: 5,
      height: 24,
      backgroundColor: '#F5F6FB',
      alignItems: 'center',
      justifyContent: 'center',
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
  });