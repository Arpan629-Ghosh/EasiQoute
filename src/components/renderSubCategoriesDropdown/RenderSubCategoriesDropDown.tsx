import { Pressable, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import InterTightRegular from '../appFonts/InterTightRegular';
import { SubCategoriesPayload } from '@/types/apis/settings.types';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

interface Props {
  item: SubCategoriesPayload;
  onPress: () => void;
}
const RenderSubCategoriesDropDown: React.FC<Props> = ({ item, onPress }) => {
    const { theme } = useAppTheme();
        const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <View style={styles.items}>
      <Pressable style={styles.content} onPress={onPress}>
        <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
          {item.name}
        </InterTightRegular>
      </Pressable>
      <View style={styles.border} />
    </View>
  );
}

export default React.memo(RenderSubCategoriesDropDown)

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    border: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    items: {
      marginBottom: 5,
    },
    content: {
      marginHorizontal: 10,
      marginBottom: 5,
    },
  });