import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";

export const createStyles =(theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    overflow: 'hidden',
    marginTop: 16,
    marginHorizontal: 16,
  },
  noBorderInput: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 12,
    height: '100%',
  },
  searchic: {
    height: 18,
    width: 18,
  },
  header: {
    borderBottomWidth: 0.5,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: theme.background,
    borderBottomColor: theme.border,
  },
  footer: {
    backgroundColor: theme.background,
    borderTopWidth: 0.5,
    borderTopColor: theme.border,
  },
  firstBttnContainer: {
    paddingTop: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  secondBttnContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    marginBottom: 34,
  },
  share: {
    height: 16,
    width: 18,
  },
  quote: {
    paddingTop: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
  quoteimg: {
    height: 705,
    width: 'auto',
    },
    scrollView: {
        flexGrow: 1,
      paddingBottom: 16
  }
});