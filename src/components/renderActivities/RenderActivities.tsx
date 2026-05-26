import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import InterTightMedium from '../fontComponents/InterTightMedium';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { useNavigation } from '@react-navigation/native';
import {   RootStackParamList } from '@/types/navigation.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import { RecentActivity } from '@/types/apis/home.types';

const STATUS_COLORS = {
  overdue: {
    view: '#F0535312',
    text: '#F05353',
  },

  due: {
    view: '#F0535312',
    text: '#F05353',
  },

  sent: {
    view: '#FFC81412',
    text: '#FFC814',
  },

  approved: {
    view: '#3AB48912',
    text: '#3AB489',
  },

  paid: {
    view: '#3AB48912',
    text: '#3AB489',
  },

  completed: {
    view: '#3AB48912',
    text: '#3AB489',
  },

  draft: {
    view: '#FF7F2612',
    text: '#FF7F26',
  },

  rejected: {
    view: '#F0535312',
    text: '#F05353',
  },

  cancelled: {
    view: '#F0535312',
    text: '#F05353',
  },
} as const;

const RenderActivities = ({ item }: { item: RecentActivity }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const statusColors = STATUS_COLORS[
    item.status as keyof typeof STATUS_COLORS
  ] || {
    view: '#E8ECF4',
    text: '#64748B',
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('QouteDetailScreen', {
            quoteId: item.id,
          })
        }
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.txtContainer}>
              <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                {item.title}
              </InterTightMedium>
              <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                {item.name}
              </InterTightRegular>
            </View>

            <View style={[styles.status, { backgroundColor: statusColors.view }]}>
              <InterTightMedium fsize={12} fcolor={statusColors.text}>
                {item.status}
              </InterTightMedium>
            </View>
          </View>

          <View style={styles.empty} />

          <View style={styles.footer}>
            <View style={styles.footerTxt}>
              <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                {item.type}
              </InterTightRegular>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                {item.reference_number}
              </InterTightRegular>
            </View>

            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              {item.price}
            </InterTightRegular>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(RenderActivities);

const createStyles = (theme: Theme) =>  StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 12,
    gap: 16,
    backgroundColor: theme.card,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtContainer: {
    height: '100%',
    gap: 5,
  },
  status: {
    height: 21,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
    gap: 10,
    backgroundColor: '#F0535312',
    alignItems: 'center',
  },
  empty: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: theme.border,
  },
  footer: {
    height: 17,
    width: '100%',
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerTxt: {
    flexDirection: 'row',
  },
});
