import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { useMemo } from 'react'
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';


interface CardProps{
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>
}
const Card: React.FC<CardProps> = ({ children, style }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <View style = {[styles.card, style]}>
      {children}
    </View>
  )
}

export default React.memo(Card);

const createStyles = (theme: Theme) =>  StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    gap: 24,
    backgroundColor: theme.card,
  },
});