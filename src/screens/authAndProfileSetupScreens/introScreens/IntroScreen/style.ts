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
    padding: 20,
    marginTop: 76,
  },
  image: {
    width: '100%',
    height: 488,
    resizeMode: 'contain',
  },

  footer: {
    width: '100%',
    gap: 24,
    alignItems: 'center',
    
  },

 
 
  slideContainer: {
    flexDirection: 'row',
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