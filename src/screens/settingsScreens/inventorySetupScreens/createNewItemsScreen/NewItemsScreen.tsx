import { TouchableOpacity, View, ScrollView, Image } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/ui/header/Header';
import AppButton from '@/components/ui/appButton/AppButton';
import InterTightRegular from '@/components/ui/appFonts/InterTightRegular';
import InterTightMedium from '@/components/ui/appFonts/InterTightMedium';
import AppInput from '@/components/ui/appInput/AppInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomDropdown, { Item } from '@/components/dropdown/CustomDropdown';
import { useToast } from '@/hooks/useToast';
import { images } from '@/config/images';
import { CreateItems } from '@/types/apis/settings.types';
import { RootScreenProps } from '@/types/navigation.types';
import { useAppConfig } from '@/hooks/apis/useAppConfig';
import { useSubCategoryList } from '@/hooks/apis/settings/useSubCategoryList';
import { useCreateItems } from '@/hooks/apis/settings/useCreateItems';
import { useDeleteItem } from '@/hooks/apis/settings/useDeleteItem';
import Loader from '@/components/ui/loader/Loader';


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
  const { subCategoryListData } = useSubCategoryList();
  const { createItemAsync, isCreatingItem} = useCreateItems();
  const { deleteItemAsync, isDeletingItem } = useDeleteItem();
  const {appConfigData} = useAppConfig();

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
      subCategoryListData?.map(item => ({ label: item.name, value: item.id })) || []
    );
  }, [subCategoryListData]);

  const handleItem = async () => {
    try {
      const category = appConfigData?.quote_categories.find(
        item =>
          item.name.toLowerCase() === itemData.category.trim().toLowerCase(),
      );


      if (!category) {
        showToast('Please select a valid category', 'error');
        return;
      }

      if (!itemData.subcategory) {
        showToast('Please select a subcategory', 'error');
        return;
      }

      if (!itemData.unit) {
        showToast('Please select a unit', 'error');
        return;
      }

      const payload: CreateItems = {
        category_id: category.id,
        subcategory_id: Number(itemData.subcategory.value),
        name: itemData.itemName.trim(),
        unit: String(itemData.unit.value),
        price: Number(itemData.pricePerUnit),
        cost: Number(itemData.unitCost),
        type: 'product',
      };

      if (editId) {
        payload.id = editId;
      }

      await createItemAsync(payload);

      showToast(
        isEdit ? 'Item updated successfully' : 'Item created successfully',
      );

      navigation.goBack();
    } catch (err) {
      showToast(String(err), 'error');
    }
  };

  const handleDeletetem = async () => {

    try {
      const res = await deleteItemAsync(editId as number);
      showToast(res.message);
      navigation.navigate('ItemsScreen')
    } catch (error) {
      showToast(String(error), 'error')
    }
   
  }

  const measurementUnitOptions = useMemo<Item[]>(() => {
    return (
      appConfigData?.measurement_units?.map(unit => ({
        label: unit.description,
        value: unit.id,
      })) || []
    );
  }, [appConfigData?.measurement_units]);

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
                {appConfigData?.quote_categories.map(item => {
                  const isSelected = itemData.category === item.name;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.8}
                      onPress={() => handleFilterOption(item.name)}
                      style={[
                        styles.filterbttn,
                        isSelected && styles.slectedfilterbttn,
                      ]}
                    >
                      <InterTightRegular
                        fsize={14}
                        fcolor={isSelected ? '#082B60' : '#89909D'}
                      >
                        {item.name}
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
                data={measurementUnitOptions}
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
            showLoader={isCreatingItem}
            onPress={handleItem}
          />
        </View>
      </View>
      <Loader visible={ isDeletingItem } />
    </LinearGradient>
  );
};

export default NewItemsScreen;
