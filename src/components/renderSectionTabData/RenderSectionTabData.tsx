import { Image, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { SectionTabData } from '@/config/SectionData';
import Card from '../quoteDetailCard/Card';
import InterTightMedium from '../fontComponents/InterTightMedium';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

const RenderSectionTabData = ({ item }: { item: SectionTabData }) => {
    const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <View style={styles.cards}>
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
            <Image source={icons.ic_radio} style={styles.icon} />
          </View>
        </View>
        <View style={styles.empty} />
        <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
          {item.summury}
        </InterTightRegular>
      </Card>
    </View>
  );
};

export default RenderSectionTabData;

const createStyles = (theme: Theme) => StyleSheet.create({
  cards: {
    gap: 8,
  },
  card: {
    gap: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtView: {
    gap: 5,
  },
  nested: {
    flexDirection: 'row',
  },
  icons: {
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    height: 24,
    width: 24,
  },
  empty: {
    borderWidth: 0.5,
    borderColor: theme.border,
  },
});
