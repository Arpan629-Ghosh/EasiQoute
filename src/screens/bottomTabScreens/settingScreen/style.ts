import { Theme } from '@/types/theme.types';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 16,
    },
    header: {
      flexDirection: 'row',
   
      paddingHorizontal: 12,
    },
    scrollview: {
      flex: 1,
      gap: 12,
      paddingHorizontal: 12,
    },
    contentcontainer: {
      paddingBottom: 48,
    },
    card: {
      gap: 16,
    },
    profile: {
      flexDirection: 'row',
      gap: 16,
    },
    profilepic: {
      height: 56,
      width: 56,
      borderRadius: 56,
    },
    txt: {
      gap: 12,
    },
    editproflie: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'center',
    },
    icn: {
      height: 15,
      width: 5,
    },
    borderLine: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    content: {
      flex: 1,
      gap: 12,
    },
    
  });
