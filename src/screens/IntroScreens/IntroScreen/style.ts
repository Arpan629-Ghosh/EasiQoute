import { Theme } from "@/types/theme.types";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  slide: {
    width,
    height: 578,
    padding: 20,
    marginTop: 76,
  },
  image: {
    width: '100%',
    height: 488,
    resizeMode: 'contain',
  },

  footer: {
    bottom: 40,
    width: '100%',
    paddingBottom: 16,
    gap: 24,
    alignItems: 'center',
  },
  skip: {
    fontSize: 16,
    color: '#999',
  },
  nextBtn: {
    backgroundColor: '#0A2A5E',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  bttn1: {
    height: 46,
    width: 165.5,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    borderColor: theme.border,
    alignItems: 'center',
  },
  bttn2: {
    height: 46,
    width: 165.5,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    backgroundColor: theme.primary,
   
    alignItems: 'center',
  },
  fullBtn: {
    width: '100%',
    backgroundColor: '#0A2A5E',
    paddingVertical: 14,
    borderRadius: 10,
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
});