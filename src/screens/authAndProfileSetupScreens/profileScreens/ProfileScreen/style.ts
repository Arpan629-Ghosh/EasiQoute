import { Theme } from "@/types/theme.types";
import { StyleSheet } from "react-native";


export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  headerComponent: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  img: {
    height: 28,
    width: 28,
  },
  formContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 12,
    gap: 24,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginHorizontal: 137.5,
  },
  profileImg: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 50
  },
  icon: {
    height: 28,
    width: 28,
    bottom: 0,
    position: 'absolute',
    left: 70,
  },
  inputContainer: {
    width: '100%',
    gap: 20,
    marginTop: 24,
  },
  inp: {
    width: '100%',
    gap: 8,
  },
  footer: {
    width: '100%',
  },
  footerComponent: {
    paddingVertical: 12,
    marginHorizontal: 12
  },
 
  keyboardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  safeareaview: {
    flex: 1,
    backgroundColor: theme.background,
  },
  emptyview: {
    width: 28,
  },
  scrollview: {
    flex: 1
  }
});