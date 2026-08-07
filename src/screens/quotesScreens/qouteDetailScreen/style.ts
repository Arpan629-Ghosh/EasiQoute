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
    txtView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
    },
    scrollview: {
      paddingBottom: 40,
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
      backgroundColor: theme.background,
    },
    footeritem: {
      flexDirection: 'row',
      padding: 12,
      gap: 12,
      justifyContent: 'center',
    },

    addicon: {
      height: 16,
      width: 16,
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
    imganimation: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
    },
    threedot: {
      paddingHorizontal: 12,
    },
  });
