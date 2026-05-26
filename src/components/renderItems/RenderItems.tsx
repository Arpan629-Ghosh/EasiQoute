import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import Card from '../cardDetailsComponent/Card';
import InterTightMedium from '../fontComponents/InterTightMedium';
import { FetchItemsData } from '@/types/apis/settings.types';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { icons } from '@/config/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation.types';

const RenderItems = ({ item }: { item: FetchItemsData }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    
    const navigateToEdit = () => {
        navigation.navigate("NewItemsScreen", {
            editId: item.id,
            catName: item.category_name,
            subcatName: {
                label: item?.subcategory_name ?? '',
                value: item.subcategory_id ?? ''
            },
            itemName: item.name,
            unit: item.unit,
            pricePerUnit: item.price,
            unitCost: item.cost
        })
    }
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.txt}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            {item.name}
          </InterTightMedium>
          <View style={styles.subTxt}>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              {item.category_name}
            </InterTightRegular>
            <View style={styles.dot} />
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              {item.subcategory_name}
            </InterTightRegular>
          </View>
        </View>
        <TouchableOpacity onPress={navigateToEdit}>
          <Image source={icons.ic_edit} style={styles.img} />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerComponent}>
          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            Unit
          </InterTightRegular>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            {item.unit}
          </InterTightRegular>
        </View>
        <View style={styles.footerComponent}>
          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            Price/Unit
          </InterTightRegular>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            £{item.price}
          </InterTightRegular>
        </View>
        <View style={styles.footerComponent}>
          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            Unit Cost
          </InterTightRegular>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            £{item.cost}
          </InterTightRegular>
        </View>
      </View>
    </Card>
  );
};

export default RenderItems;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      gap: 16,
      marginBottom: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    txt: {
      gap: 5,
    },
    subTxt: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5
    },
    dot: {
      height: 3,
      width: 3,
      borderRadius: 3,
      backgroundColor: theme.textSecondary,
    },
    img: {
      height: 24,
      width: 24,
    },
    footer: {
      flexDirection: 'row',
      gap: 8,
    },
    footerComponent: {
      flex: 1,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      gap: 8,
      backgroundColor: theme.cardSecondary,
    },
  });
