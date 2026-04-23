import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    height: '100%',
    width: '100%',
  },
  headerComponent: {
    height: 28,
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 56,
    flexDirection: 'row',
    gap: 70,
  },
  headerContainer: {
    height: 96,
    width: '100%',
    gap: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6F4',
  },
  img: {
    height: 28,
    width: 28,
  },
  firstContainer: {
    height: 267,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 12,
    gap: 18,
  },
  logoContainer: {
    height: 146,
    width: '100%',
    gap: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  profileImg: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginHorizontal: 137.5,
  },
  icon: {
    height: 28,
    width: 28,
    bottom: 0,
    position: 'absolute',
    left: 70,
  },

  colorpicker: {
    height: 57,
    width: '100%',
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
      borderColor: '#CED1DA',
    justifyContent: "center"
  },
  colorBttn: {
    height: 24,
    borderRadius: 5,

  },
});