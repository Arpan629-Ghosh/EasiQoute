import { Theme } from '@/types/theme.types';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeareaview: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
    },
    img: {
      height: 28,
      width: 28,
    },
    firstContainer: {
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 18,
    },
    logoContainer: {
      gap: 12,
      alignItems: 'center',
    },
    profileImg: {
      height: 100,
      width: 100,
      borderRadius: 50,
      resizeMode: 'cover',
    },
    profilePic: {
      height: 100,
      width: 100,
      borderRadius: 50,
      alignSelf: 'center',
    },
    icon: {
      height: 28,
      width: 28,
      bottom: 0,
      position: 'absolute',
      right: 0,
    },

    colorpicker: {
      gap: 8,
    },
    brandcolor: {
      height: 17,
      width: 99,
    },
    colorView: {
      height: 32,
      width: '100%',
      borderRadius: 7,
      borderWidth: 1,
      padding: 4,
      gap: 12,
      borderColor: theme.border,
      justifyContent: 'center',
    },
    colorBttn: {
      height: 24,
      borderRadius: 5,
    },
    businessInpContainer: {
      paddingVertical: 20,
      paddingHorizontal: 12,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.border,
    },
    businessComponent: {
      gap: 20,
    },
    businessInp: {
      gap: 8,
    },
    addressInpContainer: {
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    addressFormNavContainer: {
    
      borderRadius: 12,
      borderWidth: 2,
      padding: 12,
      gap: 12,
      borderColor: theme.border,
    
    },
    txtContainer: {
      height: 20,
      justifyContent: 'space-between',
    },
    addimg: {
      height: 29,
      width: 122,
    },
    vatContainer: {
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    toggleContainer: {
      height: 22,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    vatinpcontainer: {
      height: 73,
      gap: 8,
    },
    serviceContainer: {
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 12,
      gap: 20,
    },
    bttnContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: theme.background,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.border,
    },
    serviceImg: {
      height: 41,
      width: 112,
      resizeMode: 'contain',
    },
    footer: {
      width: '100%',

      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.background,
    },
    footerContainer: {
      paddingVertical: 12,
      marginHorizontal: 12,
    },
    bttn: {
      height: 46,
      borderRadius: 12,
      padding: 12,
      marginHorizontal: 12,
      gap: 12,
      backgroundColor: theme.primary,
      alignItems: 'center',
    },
    keyboardContainer: {
      flex: 1,
    },
    scrollview: {
      paddingBottom: 140,
      flexGrow: 1,
    },
    emptyview: {
      width: 28,
    },
    address: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    edit: {
      height: 20,
      width: 20
    }
  });
