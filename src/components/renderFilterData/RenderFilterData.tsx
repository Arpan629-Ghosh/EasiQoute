import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import Card from '../cardDetailsComponent/Card';
import InterTightMedium from '../fontComponents/InterTightMedium';
import { icons } from '@/config/icons';
import InterTightRegular from '../fontComponents/InterTightRegular';
import InterTightSemiBold from '../fontComponents/InterTightSemiBold';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import { FetchItemsData } from '@/types/apis/settings.types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation.types';


interface Props {
  item: FetchItemsData;
  count: number;
  decreaseCount: () => void;
  increaseCount: () => void;
}
const RenderFilterData: React.FC<Props> = ({
  item,
  count,
  decreaseCount,
  increaseCount,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToEdit = () => {
    navigation.navigate('NewItemsScreen', {
      editId: item.id,
      catName: item.category_name,
      subcatName: {
        label: item?.subcategory_name ?? '',
        value: item.subcategory_id ?? '',
      },
      itemName: item.name,
      unit: item.unit,
      pricePerUnit: item.price,
      unitCost: item.cost,
    });
  };
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.txtView}>
          <View style={styles.headerTxt}>
            <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
              {item.name}
            </InterTightMedium>
            <TouchableOpacity onPress={navigateToEdit}>
              <Image source={icons.ic_edit} style={styles.img} />
            </TouchableOpacity>
          </View>
          <View style={styles.catView}>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              {item.category_name}
            </InterTightRegular>
            <View style={styles.empty} />
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              {' '}
              {item.subcategory_name}
            </InterTightRegular>
          </View>
        </View>
        <View style={styles.counter}>
          <TouchableOpacity onPress={decreaseCount}>
            <Image source={icons.ic_minus} style={styles.img} />
          </TouchableOpacity>
          <InterTightSemiBold fsize={14} fcolor={theme.textMuted}>
            {count}
          </InterTightSemiBold>
          <TouchableOpacity onPress={increaseCount}>
            <Image source={icons.ic_plus} style={styles.img} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.header}>
        <View style={styles.footerTxtView}>
          <View style={styles.price}>
            <View style={styles.forRow}>
              <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                Unit: {''}
              </InterTightRegular>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                {item.unit}
              </InterTightRegular>
            </View>
            <InterTightRegular fsize={14} fcolor={theme.textMuted}>
              £{item.cost}
            </InterTightRegular>
          </View>
          <View style={styles.totalprice}>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              Total
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              £{item.price}
            </InterTightRegular>
          </View>
        </View>

        <TouchableOpacity style={styles.bttn}>
          <Image source={icons.ic_whiteadd} style={styles.icn} />
          <InterTightMedium fsize={14} fcolor={theme.primaryText}>
            Add
          </InterTightMedium>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default RenderFilterData;

const createStyles = (theme: Theme) => StyleSheet.create({
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
  headerTxt: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  img: {
    height: 20,
    width: 20,
  },
  catView: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  empty: {
    height: 3,
    width: 3,
    borderRadius: 3,
    backgroundColor: theme.textSecondary,
  },
  counter: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 12,
    borderColor: theme.primary,
    alignItems: 'center',
    height: 28,
  },
  line: {
    borderWidth: 0.5,
    borderColor: theme.border,
    width: '100%',
  },
  footerTxtView: {
    flexDirection: 'row',
    gap: 20,
  },
  price: {
    gap: 4,
  },
  forRow: {
    flexDirection: 'row',
  },
  bttn: {
    flexDirection: 'row',
    borderRadius: 7,
    paddingVertical: 4,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: theme.primary,
    alignItems: 'center',
    height: 28,
    width: 76,
  },
  icn: {
    height: 10,
    width: 10,
  },
  totalprice: {
    gap: 4,
  },
});
