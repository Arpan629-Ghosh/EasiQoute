import { TouchableOpacity, View, ScrollView, Image } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/header/Header';
import AppButton from '@/components/appButton/AppButton';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import InterTightMedium from '@/components/appFonts/InterTightMedium';
import AppInput from '@/components/appInput/AppInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomDropdown, { Item } from '@/components/dropdown/CustomDropdown';
import { useSettings } from '@/hooks/apis/useSettings';
import { useToast } from '@/hooks/useToast';
import { images } from '@/config/images';
import { CreateItems } from '@/types/apis/settings.types';
import { RootScreenProps } from '@/types/navigation.types';
const FilterOptions = ['Materials', 'Labour', 'Services', 'Miscellaneous'];
const unitOptions: Item[] = [
  {
    label: 'Item',
    value: 'item',
  },
  {
    label: 'Hour',
    value: 'hour',
  },
  {
    label: 'Kg',
    value: 'kg',
  },
  {
    label: 'Meter',
    value: 'meter',
  },
  {
    label: 'Ft',
    value: 'ft'
  }
];

interface ItemForm {
  category: string;
  subcategory: Item | null;
  itemName: string;
  unit: Item | null;
  pricePerUnit: string;
  unitCost: string;
}
const NewItemsScreen = ({ navigation, route }: RootScreenProps<'NewItemsScreen'>) => {
  const {
    editId,
    catName,
    subcatName,
    itemName,
  } = route.params || {};
  const [itemData, setItemData] = useState<ItemForm>({
    category: catName || '',
    subcategory: subcatName || null,
    itemName: itemName || '',
    unit: null,
    pricePerUnit: route.params?.pricePerUnit
      ? String(route.params.pricePerUnit)
      : '',
    unitCost: route.params?.unitCost ? String(route.params.unitCost) : '',
  });
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { showToast } = useToast();
  const isEdit = !!editId
  const { subcat_data, data, settingLoading, error, createItems, deleteItem } = useSettings();

  const updateField = useCallback(
    <K extends keyof ItemForm>(key: K, value: ItemForm[K]) => {
      setItemData(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const handleFilterOption = useCallback((option: string) => {
    setItemData(prev => ({
      ...prev,
      category: prev.category === option ? '' : option,
      subcategory: null,
    }));
  }, []);

  const subCategoryOptions = useMemo(() => {
    return (
      subcat_data?.map(item => ({ label: item.name, value: item.id })) || []
    );
  }, [subcat_data]);

  // const validateForm = () => {
  //   if (!itemData.category) {
  //     showToast('Please select category', 'error');
  //     return false;
  //   }

  //   if (!itemData.subcategory) {
  //     showToast('Please select subcategory', 'error');
  //     return false;
  //   }

  //   if (!itemData.itemName.trim()) {
  //     showToast('Please enter item name', 'error');
  //     return false;
  //   }

  //   if (!itemData.unit) {
  //     showToast('Please select unit', 'error');
  //     return false;
  //   }

  //   if (!itemData.pricePerUnit.trim()) {
  //     showToast('Please enter price per unit', 'error');
  //     return false;
  //   }

  //   if (!itemData.unitCost.trim()) {
  //     showToast('Please enter unit cost', 'error');
  //     return false;
  //   }

  //   return true;
  // };

  const handleItem = async () => {

    try {
      const category_from_input = itemData.category.toLowerCase();
      const category_from_api = data.filter(
        item => item.name.toLowerCase() === category_from_input,
      );
     
      
      const category_id = category_from_api[0].id;
      const payload: CreateItems = {
        category_id: category_id,
        subcategory_id: Number(itemData.subcategory?.value),
        name: itemData.itemName.trim(),
        unit: String(itemData.unit?.value),
        price: Number(itemData.pricePerUnit),
        cost: Number(itemData.unitCost),
        type: 'product',
      };

      if(isEdit) payload.id = editId
      await createItems(payload);

      showToast(isEdit ? "Item updated successfully" : 'Item created successfully');
      navigation.goBack();
    } catch (err) {
     
      showToast(String(err), 'error');
    }
  };

  const handleDeletetem = () => {
    deleteItem(editId as number);

    if (error) {
      showToast(String(error), 'error')
      navigation.goBack()
    }
    else {
      showToast("Item deleted successfully!")
      navigation.goBack()
    }
  }
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header
          txt={editId ? 'Edit Item' : 'Create New Item'}
          borderBottomEnabled
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.filterandinput}>
            <View style={styles.filterheading}>
              <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                Category
              </InterTightMedium>

              <View style={styles.filter}>
                {FilterOptions.map(item => {
                  const isSelected = itemData.category === item;

                  return (
                    <TouchableOpacity
                      key={item}
                      activeOpacity={0.8}
                      onPress={() => handleFilterOption(item)}
                      style={[
                        styles.filterbttn,
                        isSelected && styles.slectedfilterbttn,
                      ]}
                    >
                      <InterTightRegular
                        fsize={14}
                        fcolor={isSelected ? '#082B60' : '#89909D'}
                      >
                        {item}
                      </InterTightRegular>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={styles.filterheading}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Subcategory
              </InterTightRegular>

              <CustomDropdown
                data={subCategoryOptions}
                value={itemData.subcategory?.label || ''}
                placeholder="Select subcategory"
                onChange={(item: Item) => updateField('subcategory', item)}
              />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Item Name
              </InterTightRegular>

              <AppInput
                placeholder="Item Name"
                value={itemData.itemName}
                onChangeText={txt => updateField('itemName', txt)}
                textContentType="name"
                returnKeyType="next"
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Unit
              </InterTightRegular>

              <CustomDropdown
                data={unitOptions}
                value={itemData.unit?.label || ''}
                placeholder="Select unit"
                onChange={(item: Item) => updateField('unit', item)}
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Price per Unit
              </InterTightRegular>

              <AppInput
                placeholder="e.g. 10"
                value={itemData.pricePerUnit}
                onChangeText={txt => updateField('pricePerUnit', txt)}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Unit Cost
              </InterTightRegular>

              <AppInput
                placeholder="e.g. 5"
                value={itemData.unitCost}
                onChangeText={txt => updateField('unitCost', txt)}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        </View>
        <View style={styles.deleteView}>
          {editId && (
            <TouchableOpacity onPress={handleDeletetem}>
              <Image source={images.img_delete} style={styles.delete} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <View
        style={[
          styles.footer,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.footerContainer}>
          <AppButton
            bg={theme.primary}
            bttnTxt={isEdit ? 'Save Changes' : 'Save'}
            txtColor={theme.primaryText}
            showLoader={settingLoading}
            onPress={handleItem}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default NewItemsScreen;
