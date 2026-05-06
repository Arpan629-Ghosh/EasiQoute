import { Theme } from '@/types/theme.types';
import { StyleSheet } from 'react-native';

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
      marginTop: 56,
    },
    img: {
      height: 28,
      width: 28,
    },
    mainContainer: {
      flex: 1,
      gap: 20,
      marginTop: 4,
      paddingHorizontal: 12,
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
    },
    txtView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
    },
    scrollview: {
      paddingBottom: 40
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
    intro: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      paddingBottom: 40,
      backgroundColor: theme.footerBg,
    },
    footeritem: {
      flexDirection: 'row',
      padding: 12,
      gap: 12,
      justifyContent: 'center',
    },
    bttn: {
      height: 46,
      width: 169.5,
      borderRadius: 12,
      borderWidth: 1,
      padding: 12,
      gap: 8,
      backgroundColor: theme.background,
      borderColor: '#082B60',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addicon: {
      height: 16,
      width: 16,
    },
  });
