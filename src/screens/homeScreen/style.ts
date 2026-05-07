import { Theme } from '@/types/theme.types';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: Theme) =>  StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  bg: {
    height: 381,
    width: '100%',
    position: 'relative',
  },
  header: {
    position: 'absolute',
    height: 289,
    gap: 12,
    right: 0,
    left: 0,
  },
  headerComponent: {
    height: 233,
    paddingHorizontal: 16,
    gap: 24,
    bottom: 0,
    top: 56,
  },
  headerTxt: {
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    gap: 12,
    flexDirection: 'row',
    height: 40,
    width: 190,
    alignItems: 'center',
  },
  profilepic: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: 'blue',
  },
  pro: {
    height: 28,
    width: 66,
  },
  details: {
    height: 169,
    gap: 12,
    alignItems: 'center',
  },
  invoiceqoute: {
    flexDirection: 'row',
    height: 94,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    borderWidth: 0.5,
  },
  emptyView: {
    height: 70,
  },
  icons: {
    height: 63,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vector: {
    height: 14,
    width: 13.6,
    resizeMode: 'cover',
  },
  activityContainer: {
    flex: 1,
    marginTop: -68,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 16,
    backgroundColor: theme.surface,
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
    width: 219,
    borderColor: '#0000000A',
  },
  footer: {
    height: 41,
    padding: 12,
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#F5F6FB',
  },
  flatlist: {
    paddingBottom: 20
  }
});
