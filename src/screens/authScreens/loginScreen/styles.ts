import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    width: '100%',
    height: 527,
    gap: 32,
    // backgroundColor: "green"
  },
  form: {
    width: 378,
    height: 345,
    gap: 32,
    marginTop: 150,
    marginLeft: 12,
    // backgroundColor: "red"
  },
  textView: {
    height: 54,
    width: '100%',
    // backgroundColor: "green"
  },
  formView: {
    height: 259,
    width: '100%',
    gap: 16,
  },
  inp: {
    height: 73,
    width: '100%',
    gap: 8,
  },
  inputicon: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E4E6F4',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  img: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  noBorderInput: {
    flex: 1,
    borderWidth: 0,
    height: '100%',
    paddingHorizontal: 0,
  },
  bttn: {
    width: '100%',
    height: 46,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    backgroundColor: '#082B60',
    alignItems: 'center',
  },
  forgotpasswordView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});