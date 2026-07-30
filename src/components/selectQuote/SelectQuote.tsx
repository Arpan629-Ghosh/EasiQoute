import { StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { QuoteItem } from '@/types/apis/quote.types';
import Card from '../cardDetailsComponent/Card';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import InterTightMedium from '../fontComponents/InterTightMedium';
import InterTightRegular from '../fontComponents/InterTightRegular';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface Props {
  item: QuoteItem;
  isSelected: boolean;
  onToggle: (item: QuoteItem) => void;
}
const SelectQuote = ({ item, isSelected, onToggle }: Props) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleToggle = useCallback(() => {
    onToggle(item);
  }, [item, onToggle]);

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerTxt}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            {item.title}
          </InterTightMedium>
          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            {item.name}
          </InterTightRegular>
        </View>
        <View style={styles.checkbox}>
          <BouncyCheckbox
            size={24}
            fillColor="#082B60"
            isChecked={isSelected}
            useBuiltInState={false}
            onPress={handleToggle}
          />
        </View>
      </View>
      <View style={styles.empty} />
      <View style={styles.footer}>
        <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
          {item.reference_number}
        </InterTightRegular>
        <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
          £{item.price}
        </InterTightRegular>
      </View>
    </Card>
  );
};

export default React.memo(SelectQuote);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      gap: 16,
      marginBottom: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTxt: {
      flex: 1,
      gap: 5,
    },
    checkbox: {
      marginLeft: 12
    },
    empty: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
