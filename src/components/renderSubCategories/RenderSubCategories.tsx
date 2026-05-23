import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { SubCategoriesPayload } from '@/types/apis/settings.types';
import Card from '../cardDetailsComponent/Card';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation.types';
import InterTightMedium from '../fontComponents/InterTightMedium';

const RenderSubCategories = ({ item }: { item: SubCategoriesPayload }) => {
  const { theme } = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToEdit = () => {
    navigation.navigate('NewSubCategoryScreen', {
      editId: item.id,
        name: item.name,
      catName: item.category.name
    });
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.cat}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            {item.name}
          </InterTightMedium>
          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            {item.category.name}
          </InterTightRegular>
        </View>
        <TouchableOpacity onPress={navigateToEdit}>
          <Image source={icons.ic_edit} style={styles.edit} />
        </TouchableOpacity>
      </View>

      <View style={styles.border} />
      <View style={styles.cardFooter}>
        <View style={styles.txt}>
          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            Items:
          </InterTightRegular>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            {item.category.items_count}
          </InterTightRegular>
        </View>
      </View>
    </Card>
  );
};

export default RenderSubCategories;

const createStyles = (theme: Theme) =>
    StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    card: {
      gap: 16,
      marginBottom: 8,
    },
    edit: {
      height: 24,
      width: 24,
    },
    border: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    cardFooter: {
      flexDirection: 'row',
      gap: 16,
      justifyContent: 'space-between',
    },
    txt: {
      flexDirection: 'row',
    },
    cat: {
      gap: 5,
    },
  });
