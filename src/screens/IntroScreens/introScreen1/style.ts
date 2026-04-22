import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  introContainer: {
    width: '94%',
    gap: 32,
    marginTop: 76,
    marginHorizontal: 12,
  },
  headerTextContainer: {
    width: '100%',
    gap: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 488,
    width: '100%',
  },
  footer: {
    height: 126,
    width: '100%',
  },
  footerComponent: {
    height: 92,
    width: '100%',
    gap: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  slideContainer: {
    flexDirection: 'row',
    height: 6,
    width: 40,
    gap: 4,
  },
  slide1: {
    height: 6,
    width: 24,
    borderRadius: 30,
    backgroundColor: '#082B60',
  },
  slide2: {
    height: 6,
    width: 12,
    borderRadius: 30,
    backgroundColor: '#E4E6F4',
  },
  bttnContainer: {
    height: 46,
    width: 343,
    gap: 12,
    marginTop: 8,
    flexDirection: 'row',
  },
  bttn1: {
    height: 46,
    width: 165.5,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E6F4',
    alignItems: 'center',
  },
  bttn2: {
    height: 46,
    width: 165.5,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    backgroundColor: '#082B60',
    borderColor: '#E4E6F4',
    alignItems: 'center',
  },
});