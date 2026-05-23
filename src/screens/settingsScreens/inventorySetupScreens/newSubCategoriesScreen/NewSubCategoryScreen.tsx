import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/header/Header';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { icons } from '@/config/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '@/hooks/apis/useSettings';
import RenderCategoriesDropDown from '@/components/renderCategoriesDropDown/RenderCategoriesDropDown';
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/hooks/useToast';
import { NewSubCategoryScreenProps } from '@/types/navigation.types';
import { images } from '@/config/images';
import { CreateSubCategories } from '@/types/apis/settings.types';

const NewSubCategoryScreen = ({
  navigation,
  route,
}: NewSubCategoryScreenProps) => {
  const editId = route.params?.editId;
  const name = route.params?.name;
  const catName = route.params?.catName;
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(catName || '');
  const [input, setInput] = useState<string>(name || '');
  const { theme } = useAppTheme();
  const {
    subcat_data,
    settingLoading,
    data,
    newSubCtaegories,
    deleteSubCategory,
  } = useSettings();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const debouncedSearch = useDebounce(search);
  const isEdit = !!editId;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handlePress = (category: string) => {
    setSearch(category);
    setOpen(false);
  };

  const handleInput = (txt: string) => {
    setSearch(txt);
    if (txt.trim()) setOpen(true);
  };

  const handleSubCategories = async () => {
    const category_from_input = debouncedSearch.toLowerCase();
    const category_from_api = data.filter(
      item => item.name.toLowerCase() === category_from_input,
    );
    console.log(category_from_api)
    const category_id = category_from_api[0].id;
    console.log(category_id)
    try {
      const payload: CreateSubCategories = {
        category_id: category_id,
        name: input,
      };

      if (isEdit) {
        payload.id = editId;
      }
      await newSubCtaegories(payload);
      showToast(
        isEdit
          ? 'Sub category updated successfully'
          : 'Sub category created successfully.',
      );
      navigation.goBack();
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  const handleDeleteSubCategories = async () => {
    const subcat_from_input = input.toLowerCase();
    const subcat_from_api = subcat_data.filter(
      item => item.name.toLowerCase() === subcat_from_input,
    );
    const category_id = subcat_from_api[0].category.id;
    try {
      const reponse = await deleteSubCategory({
        id: editId,
        category_id: category_id,
        name: input,
      });
      showToast(reponse.message);
      navigation.goBack();
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  const processedData = useMemo(() => {
    let result = [...data];
    if (!debouncedSearch.trim()) return result;
    const lower = debouncedSearch.toLowerCase();
    result = result.filter(item => item.name.toLowerCase().includes(lower));
    return result;
  }, [data, debouncedSearch]);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Header
            txt={editId ? 'Edit Subcategory' : 'Create New Subcategory'}
            borderBottomEnabled={true}
          />
          <View style={styles.inpContainer}>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Category
              </InterTightRegular>
              <View style={styles.inputicon}>
                <Input
                  style={styles.noBorderInput}
                  placeholder="Search or select category"
                  value={search}
                  onChangeText={txt => handleInput(txt)}
                />
                <TouchableOpacity onPress={() => setOpen(!open)}>
                  <Image source={icons.ic_down} style={styles.img} />
                </TouchableOpacity>
              </View>
            </View>
            {open && processedData.length > 0 && (
              <FlatList
                data={processedData}
                renderItem={({ item }) => (
                  <RenderCategoriesDropDown
                    item={item}
                    onPress={() => handlePress(item.name)}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.flatlist}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
              />
            )}
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Subcategory Name
              </InterTightRegular>
              <Input
                placeholder="Subcategory Name"
                value={input}
                onChangeText={txt => setInput(txt)}
                keyboardType="name-phone-pad"
                returnKeyType="next"
              />
            </View>
          </View>
        </View>
        <View style={styles.deleteView}>
          {editId && (
            <TouchableOpacity onPress={handleDeleteSubCategories}>
              <Image source={images.img_delete} style={styles.delete} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="Save"
            txtColor={theme.primaryText}
            onPress={handleSubCategories}
            showLoader={settingLoading}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default NewSubCategoryScreen;
