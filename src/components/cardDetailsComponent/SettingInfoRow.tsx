import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import React from 'react';
import InterTightRegular from '../appFonts/InterTightRegular';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';

interface Props {
  icon?: ImageSourcePropType;
  txt: string;
  children?: React.ReactNode;
  arrowEnabled?: boolean;
}
const SettingInfoRow: React.FC<Props> = ({
  icon,
  txt,
  children,
  arrowEnabled = true,
}) => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.icontxt}>
        <Image source={icon} style={styles.icn} />
        <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
          {txt}
        </InterTightRegular>
      </View>
      <View style={styles.appearance}>
        {children}
        {arrowEnabled && (
          <Image source={icons.ic_arrowicn} style={styles.icn} />
        )}
      </View>
    </View>
  );
};

export default React.memo(SettingInfoRow);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icontxt: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  icn: {
    height: 28,
    width: 28,
  },
  appearance: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
