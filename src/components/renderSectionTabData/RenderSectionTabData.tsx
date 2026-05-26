import { Image, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { SectionTabData } from '@/config/SectionData';
import Card from '../cardDetailsComponent/Card';
import InterTightMedium from '../fontComponents/InterTightMedium';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import BouncyCheckbox from "react-native-bouncy-checkbox";


const RenderSectionTabData = ({ item }: { item: SectionTabData }) => {
    const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.txtView}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            {item.heading}
          </InterTightMedium>
          <View style={styles.nested}>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              Order:{' '}
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              {item.orderNumber}
            </InterTightRegular>
          </View>
        </View>
        <View style={styles.icons}>
          <Image source={icons.ic_edit} style={styles.icon} />

          <View style={styles.checkbox}>
            <BouncyCheckbox
              size={24}
              fillColor="#082B60"
              
            />
          </View>
        </View>
      </View>
      <View style={styles.empty} />
      <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
        {item.summury}
      </InterTightRegular>
    </Card>
  );
};

export default RenderSectionTabData;

const createStyles = (theme: Theme) => StyleSheet.create({
  card: {
    gap: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
  },
  txtView: {
    flex: 1,
    gap: 5,
    paddingRight: 12
  },
  nested: {
    flexDirection: 'row',
  },
  icons: {
    flexDirection: 'row',
    alignItems: "center",
    transform:  [{translateX: 14}]
  },
  icon: {
    height: 24,
    width: 24,
  },
  empty: {
    borderWidth: 0.5,
    borderColor: theme.border,
  },
  checkbox: {
    marginLeft: 12,
    right: 0
  }
});
