import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';

import { SearchAddressPayload } from '@/types/apis/auth.types';
import InterTightRegular from '../appFonts/InterTightRegular';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

interface RenderAddressProps {
  item: SearchAddressPayload;
}

const RenderAddress: React.FC<RenderAddressProps> = ({ item }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <InterTightRegular
        fsize={14}
        fcolor={theme.textPrimary}
        style={styles.address}
        numberOfLines={1}
      >
        {item.address_line_1}
      </InterTightRegular>

      <View style={styles.bottomRow}>
        <InterTightRegular
          fsize={14}
          fcolor={theme.textSecondary}
          numberOfLines={1}
        >
          {item.city}
        </InterTightRegular>

        <View style={styles.dot} />

        <InterTightRegular
          fsize={14}
          fcolor={theme.textSecondary}
          numberOfLines={1}
        >
          {item.postcode}
        </InterTightRegular>

        <View style={styles.dot} />

        <InterTightRegular
          fsize={14}
          fcolor={theme.textSecondary}
          numberOfLines={1}
        >
          {item.country}
        </InterTightRegular>
      </View>
    </View>
  );
};

export default RenderAddress;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 5,
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      gap: 4,
    },

    pressedContainer: {
      opacity: 0.7,
    },

    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    bottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
    },

    address: {
      flex: 1,
    },

    dot: {
      height: 4,
      width: 4,
      borderRadius: 999,
      backgroundColor: theme.textSecondary,
    },
  });
