import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { FetchItemsData } from '@/types/apis/settings.types';
import { useAppTheme } from '@/hooks/useAppTheme';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { Theme } from '@/types/theme.types';

const RenderMargin = ({ item }: { item: FetchItemsData }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme] )
  const revenue = Number(item.total_price || 0);
  const cost = Number(item.total_cost || 0);
  const margin = revenue - cost;

  const marginPercentage =
    revenue > 0 ? ((margin / revenue) * 100).toFixed(1) : '0';

  return (
    <View style={styles.row}>
      <View style={[styles.column, styles.nameColumn]}>
        <InterTightRegular
          numberOfLines={1}
          fsize={14}
          fcolor={theme.textPrimary}
        >
          {item.name}
        </InterTightRegular>
      </View>

      <View style={styles.column}>
        <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
          £{revenue.toFixed(2)}
        </InterTightRegular>
      </View>

      <View style={styles.column}>
        <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
          £{cost.toFixed(2)}
        </InterTightRegular>
      </View>

      <View style={styles.column}>
        <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
          £{margin.toFixed(2)}
        </InterTightRegular>

        <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
          ({marginPercentage}%)
        </InterTightRegular>
      </View>
    </View>
  );
};

export default RenderMargin;

const createStyles = (theme: Theme) => StyleSheet.create({
    row: {
      flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.border,
  },

  column: {
    flex: 1,
    justifyContent: 'center',
  },

  nameColumn: {
    flex: 1.6,
    paddingHorizontal: 12,
  },
});
