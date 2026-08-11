import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import BottomModalComponent from '../modal/BottomModalComponent';
import InterTightMedium from '../appFonts/InterTightMedium';
import InterTightSemiBold from '../appFonts/InterTightSemiBold';
import AppButton from '../appButton/AppButton';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import { FetchItemsData } from '@/types/apis/settings.types';
import RenderMargin from '../renderMargin/RenderMargin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  visible: boolean;
  onClose: () => void;
  margin_data: FetchItemsData[];
};

const MarginBottomSheet = ({ visible, onClose, margin_data }: Props) => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const renderItems: ListRenderItem<FetchItemsData> = useCallback(
    ({ item }) => {
      return <RenderMargin item={item} />;
    },
    [],
  );
  const totalRevenue = useMemo(() => {
    return margin_data.reduce(
      (sum, item) => sum + Number(item.total_price || 0),
      0,
    );
  }, [margin_data]);
  const totalCost = useMemo(() => {
    return margin_data.reduce(
      (sum, item) => sum + Number(item.total_cost || 0),
      0,
    );
  }, [margin_data]);

  const totalMargin = totalRevenue - totalCost;

  const totalPercentage = useMemo(() => {
    if (totalRevenue <= 0) {
      return '0';
    }

    return ((totalMargin / totalRevenue) * 100).toFixed(1);
  }, [totalMargin, totalRevenue]);

  return (
    <BottomModalComponent visible={visible} onClose={onClose} mheight={500}>
      <View style={styles.container}>
        <View style={styles.header}>
          <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
            Margin
          </InterTightMedium>
        </View>

        <View style={styles.tableHeader}>
          <View style={[styles.column, styles.nameColumn]}>
            <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
              Item Name
            </InterTightMedium>
          </View>

          <View style={styles.column}>
            <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
              Revenue
            </InterTightMedium>
          </View>

          <View style={styles.column}>
            <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
              Costs
            </InterTightMedium>
          </View>

          <View style={styles.column}>
            <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
              Margin
            </InterTightMedium>
          </View>
        </View>

        <FlatList
          data={margin_data}
          renderItem={renderItems}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <View style={styles.totalContainer}>
          <View style={[styles.column, styles.nameColumn]}>
            <InterTightSemiBold fsize={14} fcolor={theme.textPrimary}>
              Total
            </InterTightSemiBold>
          </View>

          <View style={styles.column}>
            <InterTightSemiBold fsize={14} fcolor={theme.textPrimary}>
              £{totalRevenue.toFixed(2)}
            </InterTightSemiBold>
          </View>

          <View style={styles.column}>
            <InterTightSemiBold fsize={14} fcolor={theme.textPrimary}>
              £{totalCost.toFixed(2)}
            </InterTightSemiBold>
          </View>

          <View style={styles.column}>
            <InterTightSemiBold fsize={14} fcolor={theme.textPrimary}>
              £{totalMargin.toFixed(2)}
            </InterTightSemiBold>

            <InterTightSemiBold fsize={14} fcolor={theme.textSecondary}>
              ({totalPercentage}%)
            </InterTightSemiBold>
          </View>
        </View>

        <View
          style={[
            styles.buttonContainer,
            { paddingBottom: insets.bottom + 12 },
          ]}
        >
          <AppButton
            bg={theme.primary}
            onPress={onClose}
            bttnTxt="Got It"
            txtColor={theme.primaryText}
            style={styles.button}
          />
        </View>
      </View>
    </BottomModalComponent>
  );
};

export default React.memo(MarginBottomSheet);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderTopEndRadius: 24,
      borderTopLeftRadius: 24,
      backgroundColor: theme.background,
    },

    header: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
    },

    tableHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.cardSecondary,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
    },

    listContainer: {
      paddingBottom: 8,
    },

    column: {
      flex: 1,
      justifyContent: 'center',
    },

    nameColumn: {
      flex: 1.7,
      paddingRight: 10,
    },

    totalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 16,
      backgroundColor: theme.cardSecondary,
      borderTopWidth: 0.5,
      borderTopColor: theme.border,
    },

    buttonContainer: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 20,
    },

    button: {
      height: 48,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
