import { StyleSheet, View } from 'react-native'
import React from 'react'
import InterTightMedium from '../fontComponents/InterTightMedium';

interface CardHeaderProps{
    title?: string;
    rightComponent?: React.ReactNode;
}
const CardHeader: React.FC<CardHeaderProps> = ({ title, rightComponent }) => {
  return (
    <View style = {styles.cardHeader}>
      <InterTightMedium fsize={16} fcolor="#2D2D2D">
        {title}
      </InterTightMedium>
      {rightComponent}
    </View>
  );
};

export default CardHeader

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})