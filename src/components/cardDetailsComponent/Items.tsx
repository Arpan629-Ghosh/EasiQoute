import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import InterTightRegular from '../appFonts/InterTightRegular';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

interface ItemProps {
  heading: string;
  subHeading1: string;
  subHeading2: string;
  subHeading3: string;
  value1: string;
  value2: string;
  value3: string;
}
const Items: React.FC<ItemProps> = ({
  heading,
  subHeading1,
  subHeading2,
  subHeading3,
  value1,
  value2,
  value3,
}) => {
    const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View style={styles.contaner}>
      <InterTightRegular fsize={14} fcolor="#A6ADB9">
        {heading}
      </InterTightRegular>
      <View style={styles.itemContainer}>
        <View style={styles.items}>
          <InterTightRegular fsize={14} fcolor="#A6ADB9">
            {subHeading1}
          </InterTightRegular>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            {value1}
          </InterTightRegular>
        </View>
        <View style={styles.items}>
          <InterTightRegular fsize={14} fcolor="#A6ADB9">
            {subHeading2}
          </InterTightRegular>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            {value2}
          </InterTightRegular>
        </View>
        <View style={styles.items}>
          <InterTightRegular fsize={14} fcolor="#A6ADB9">
            {subHeading3}
          </InterTightRegular>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            {value3}
          </InterTightRegular>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Items);

const createStyles =(theme: Theme) => StyleSheet.create({
  contaner: {
    flex: 1,
    marginTop: 8,
  },
  itemContainer: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  items: {
    width: 110,
    borderRadius: 8,
    padding: 8,
    gap: 8,

    backgroundColor: theme.cardSecondary,
  },
});
