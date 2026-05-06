import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    paddingBottom: 100,
  },
  basicinfo: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    gap: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E4E6F4',
  },
  inputs: {
    gap: 8,
    width: '48.5%',
  },
  inp: {
    gap: 8,
  },
  inputContainer: {
    gap: 12,
    flexDirection: 'row',
  },
  inputicon: {
    height: 48,
    flex: 1,
    borderWidth: 1,
    borderColor: '#E4E6F4',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    overflow: 'hidden',
    gap: 12,
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
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E4E6F4',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  newclient: {
    height: 29,
    width: 110,
  },
  upload: {
    height: 73,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  fileupload: {
    gap: 12,
  },
  files: {
    gap: 8,
  },
  docs: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
    borderColor: '#E4E6F4',
  },
  delete: {
    height: 24,
    width: 24,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerContainer: {
    paddingVertical: 12,
  },
  bttn: {
    height: 46,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 12,
    gap: 12,
    backgroundColor: '#082B60',
    alignItems: 'center',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
