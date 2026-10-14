import { Theme } from "@/types/theme.types";
import { scaleHeight, scaleWidth } from "@/utils/normalize";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      flexGrow: 1,
      backgroundColor: theme.background,
    },
    centerLogo: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: 12,
      gap: 16,
      // flexGrow: 0,
      // flexShrink: 0,
    },
    backgroundPattern: {
      position: 'absolute',
      width: '100%',
      height: scaleHeight(165),
      left: 0,
      top: 0,
      // flexGrow: 0,
      // flexShrink: 0,
      //   zIndex: 0,
    },
    img: {
      height: scaleHeight(165),
      width: '100%',
      resizeMode: 'contain',
    },
    content: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',

      padding: 0,
      gap: scaleHeight(12),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 12,
    },
    crossView: {
      height: 32,
      width: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icn: {
      height: 14,
      width: 14,
    },
    mainContent: {
      width: '100%',
      // height: scaleHeight(482),

      flexDirection: 'column',
      alignItems: 'center',

      paddingHorizontal: scaleWidth(12),
      gap: scaleHeight(36),
    },
    logo: {
      width: '100%',
      // height: heightScale(159),

      flexDirection: 'column',
      alignItems: 'center',

      padding: 0,
      gap: scaleHeight(32),

      alignSelf: 'stretch',
      flexGrow: 0,
      flexShrink: 0,
    },
    subscription: {
      width: scaleWidth(142.96),
      height: scaleHeight(92),

      flexDirection: 'column',
      alignItems: 'center',

      padding: 0,
      gap: scaleHeight(12),

      flexGrow: 0,
      flexShrink: 0,
    },
    priceView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    vector: {
      width: scaleHeight(97.5),
      height: 0.5,
      opacity: 1,
    },
    subprice: {
      flexDirection: 'row',
      borderRadius: 28,
      borderWidth: 0.5,
      paddingVertical: 10,
      paddingHorizontal: 12,
      gap: 10,
      backgroundColor: theme.cardSecondary,
      borderColor: theme.border,
    },

    txt: {
      fontStyle: 'italic',
    },

    benefitsView: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: scaleHeight(20),
    },
    bHeader: {
      width: '100%',
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    star: {
      height: 12,
      width: 12,
    },
    benifitTxt: {
      letterSpacing: 16 * 0.16,
    },
    footer: {
      width: '100%',
      marginTop: 'auto',
      bottom: 0,
      left: 0,
      right: 0,
    },

    footerContainer: {
      width: '100%',
      padding: scaleWidth(12),
      gap: scaleHeight(14),
    },

    subscribeButton: {
      width: '100%',
    },

    gradientText: {
      flex: 1,
      textAlign: 'center',
      lineHeight: scaleHeight(20),
    },

    footerLinks: {
      width: '100%',
      height: scaleHeight(17),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: scaleWidth(12),
    },

    linkDivider: {
      borderWidth: 1,
      height: scaleHeight(17),
      borderColor: theme.border,
    },
    primaryButton: {
      borderRadius: scaleWidth(12),
    },
    footerContent: {
      gap: scaleHeight(16),
    },
    empty: {
      height: 16,
      width: 16,
    },

    gradientView: {
      width: '100%',
      height: scaleHeight(48),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: scaleHeight(12),
      paddingHorizontal: scaleWidth(16),
      borderRadius: scaleWidth(12),
    },

    link: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '28.5%',
    },
  });