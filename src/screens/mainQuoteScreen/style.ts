import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EEEC',
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
    marginTop: 56,
    paddingHorizontal: 12,
  },
  searchandfilter: {
    height: 48,
    gap: 8,
    flexDirection: 'row',
  },
  imgView: {
    height: 48,
    width: 48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  img: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
  inputicon: {
    width: 325,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    overflow: 'hidden',
    gap: 12,
  },
  searchic: {
    height: 18,
    width: 18,
  },
  noBorderInput: {
    flex: 1,
    borderWidth: 0,
    height: '100%',
    paddingHorizontal: 0,
  },

  flatlist: {
    flex: 1,
    paddingHorizontal: 12,
  
    
  },
  add: {
    height: 48,
    width: 48,
    borderRadius: 32,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: "auto"
  },
  ic: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    height: 606,
    gap: 16
  }
});