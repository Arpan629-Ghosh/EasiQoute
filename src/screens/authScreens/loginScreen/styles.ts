import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    gap: 32,
    justifyContent: 'space-between',
  },
  formContainer: {
    width: '100%',
    height: 527,
    gap: 32,
  },
  form: {
    width: '93%',
    height: 345,
    gap: 32,
    marginTop: 165,
    marginHorizontal: 13,
  },
  textView: {
    height: 54,
    width: '100%',
    gap: 8,
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
  footer: {
    height: 143,
    width: '100%',
    marginTop: 142,
  },
  footerTxtView: {
    height: 109,
    width: '100%',
    padding: 12,
    gap: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  createaccountView: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    // width: "100%"
  },
  borderLine: {
    height: 0,
    width: '100%',
    borderWidth: 0.5,
    backgroundColor: '#E4E6F4',
  },
  privacyView: {
    flexDirection: 'row',
    gap: 5,
  },
});