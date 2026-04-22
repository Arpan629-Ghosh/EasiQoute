import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    height: 426,
    width: '100%',
  },
  headerContainer: {
    height: 96,
    width: '100%',
    gap: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6F4',
  },
  headerComponent: {
    height: 28,
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 56,
    flexDirection: 'row',
    gap: 105,
  },
  img: {
    height: 28,
    width: 28,
  },
  formContainer: {
    height: 335,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 12,
    gap: 24,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginHorizontal: 137.5,
  },
  profileImg: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
  },
  icon: {
    height: 28,
    width: 28,
    bottom: 0,
    position: 'absolute',
    left: 70,
  },
  inputContainer: {
    height: 166,
    width: '100%',
    gap: 20,
    marginTop: 24,
  },
  inp: {
    height: 73,
    width: '100%',
    gap: 8,
  },
  footer: {
    height: 104,
    width: '100%',
    marginTop: 344,
  },
  footerComponent: {
    height: 70,
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bttn: {
    height: 46,
    width: '94%',
    borderRadius: 12,
    padding: 12,
    gap: 12,
    backgroundColor: '#082B60',
    alignItems: 'center',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});