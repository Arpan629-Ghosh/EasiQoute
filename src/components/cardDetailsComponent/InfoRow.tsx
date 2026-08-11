import { StyleSheet, View } from 'react-native'
import React from 'react'
import InterTightRegular from '../appFonts/InterTightRegular';
import { useAppTheme } from '@/hooks/useAppTheme';


interface InfoRowProps{
    label?: string;
  value?: string | number;
  activeColor?: boolean;
}
const InfoRow: React.FC<InfoRowProps> = ({ label, value, activeColor=false }) => {
  const { theme } = useAppTheme();
  return (
    <View style={styles.inforow}>
      <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
        {label}
      </InterTightRegular>
      <InterTightRegular
        fsize={14}
        fcolor={activeColor ? '#082B60' : theme.textPrimary}
      >
        {value}
      </InterTightRegular>
    </View>
  );
}

export default React.memo(InfoRow);

const styles = StyleSheet.create({
    inforow: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})