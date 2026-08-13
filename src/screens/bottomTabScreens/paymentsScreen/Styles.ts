import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      gap: 16,
    },
    header: {
      gap: 12,
    },
    headerComponent: {
      gap: 16,
      paddingHorizontal: 12,
    },
    topComponent: {
      //   gap: 8,
      //   flexDirection: 'row',
    },
    inputicon: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme.searchInput,
      backgroundColor: theme.searchInput,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      overflow: 'hidden',
      gap: 12,
    },
    searchic: {
      height: 24,
      width: 24,
    },
    noBorderInput: {
      flex: 1,
      borderWidth: 0,
      height: '100%',
      paddingHorizontal: 0,
    },
    add: {
      height: 48,
      width: 48,
      borderRadius: 32,
      right: 12,
      bottom: 12,
      position: 'absolute',
    },
    ic: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },
    flatlist: {
      flex: 1,
      paddingHorizontal: 12,
    },
    flat: {
      flexGrow: 1,
      paddingBottom: 120,
    },
    footer: {
      marginVertical: 20,
    },
  });