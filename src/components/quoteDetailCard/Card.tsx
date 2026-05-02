import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'


interface CardProps{
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>
}
const Card: React.FC<CardProps> = ({children, style}) => {
  return (
    <View style = {[styles.card, style]}>
      {children}
    </View>
  )
}

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    gap: 24,
    backgroundColor: '#FFFFFF',
  },
});