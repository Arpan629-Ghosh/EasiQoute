import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '@/hooks/useAppTheme';
import InterTightMedium from '../appFonts/InterTightMedium';

interface CardHeaderProps{
    title?: string;
  rightComponent?: React.ReactNode;
  children?: React.ReactNode;
}
const CardHeader: React.FC<CardHeaderProps> = ({ title, rightComponent, children }) => {
  const {theme} = useAppTheme()
  return (
    <View style = {styles.cardHeader}>
      <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
        {title}
      </InterTightMedium>
      {rightComponent}
      {children}
    </View>
  );
};

export default React.memo(CardHeader);

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})