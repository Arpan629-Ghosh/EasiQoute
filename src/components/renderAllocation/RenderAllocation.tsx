import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Allocation } from '@/types/apis/payments.types';
import Card from '../cardDetailsComponent/Card';
import InterTightMedium from '../appFonts/InterTightMedium';
import { useAppTheme } from '@/hooks/useAppTheme';
import InterTightRegular from '../appFonts/InterTightRegular';
import { formatDate } from '@/utils/formatDate';

const RenderAllocation = ({ item }: { item: Allocation }) => {
  const { theme } = useAppTheme();
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.details}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            £{item.amount}
          </InterTightMedium>
          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            invoice:{' '}
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              {item.reference}
            </InterTightRegular>
          </InterTightRegular>
        </View>
        <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
          {formatDate(item.due_date)}
        </InterTightRegular>
      </View>
    </Card>
  );
};

export default RenderAllocation;

const styles = StyleSheet.create({
  details: {
    gap: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 8,
  },
});
