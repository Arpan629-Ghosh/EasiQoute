import { StyleSheet, View } from 'react-native'
import React from 'react'
import InterTightRegular from '../fontComponents/InterTightRegular';


interface InfoRowProps{
    label?: string;
    value?: string;
}
const InfoRow: React.FC<InfoRowProps> = ({label, value}) => {
  return (
    <View style = {styles.inforow}>
      <InterTightRegular fsize={14} fcolor="#89909D">
        {label}
      </InterTightRegular>
      <InterTightRegular fsize={14} fcolor="#2D2D2D">
        {value}
      </InterTightRegular>
    </View>
  );
}

export default InfoRow

const styles = StyleSheet.create({
    inforow: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})