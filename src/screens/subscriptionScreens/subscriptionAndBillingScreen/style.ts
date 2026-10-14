import { Theme } from "@/types/theme.types";
import { scaleHeight } from "@/utils/normalize";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
          justifyContent: 'space-between',
      backgroundColor: theme.background
    },

    contentContainer: {
      gap: scaleHeight(24),
      paddingHorizontal: 12,
      marginTop: scaleHeight(16),
    },

    cardContainer: {
      gap: scaleHeight(12),
    },

    lg: {
      height: '100%',
      width: '100%',
    },
    card: {
      gap: 24,
    },

    cardHeader: {
      gap: 8,
    },

    listContainer: {
      gap: 16,
    },

    bhContainer: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
    },

    divider: {
      height: 0,
      borderWidth: 1,
      width: '67.5%',
      borderColor: '#0000000A',
    },
  });