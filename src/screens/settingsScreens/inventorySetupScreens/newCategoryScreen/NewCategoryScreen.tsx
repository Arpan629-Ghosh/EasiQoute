import {  Image, TouchableOpacity, View, } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useAppTheme } from '@/hooks/useAppTheme'
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/ui/header/Header';
import AppInput from '@/components/ui/appInput/AppInput';
import AppButton from '@/components/ui/appButton/AppButton';
import InterTightRegular from '@/components/ui/appFonts/InterTightRegular';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '@/hooks/useToast';
import { images } from '@/config/images';
import { CreateCategories } from '@/types/apis/settings.types';
import { RootScreenProps } from '@/types/navigation.types';
import { useCreateCategory } from '@/hooks/apis/settings/useCreateCategory';
import { useDeleteCategory } from '@/hooks/apis/settings/useDeleteCategory';
import Loader from '@/components/ui/loader/Loader';


const NewCategoryScreen = ({ navigation, route }: RootScreenProps<'NewCategoryScreen'>) => {
  const editId = route.params?.editId;
  const name = route.params?.name;
  const [input, setInput] = useState<string>(name || "")
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const { createCategoryAsync, isCreatingCategory } = useCreateCategory();
  const { deleteCategoryAsync, isDeletingCategory } = useDeleteCategory();
  const { showToast } = useToast();
  const isEdit = !!editId
  
  const styles = useMemo(() => createStyles(theme), [theme])


  const handleCategory = async () => {
    try {
      const payload: CreateCategories = {
        name: input,
      };

      if (isEdit) {
        payload.id = editId;
      }

      await createCategoryAsync(payload);

      navigation.goBack();

      showToast(
        isEdit
          ? 'Category updated successfully.'
          : 'Category created successfully.',
        'success',
      );
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await deleteCategoryAsync(editId as number)
      showToast(response.message)
      navigation.goBack()
    } catch (error) {
      showToast(String(error), 'error')
    }
  }
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Header
            txt={editId ? 'Edit Category' : 'Create New Category'}
            borderBottomEnabled={true}
          />
          <View style={styles.inpContainer}>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Category Name
              </InterTightRegular>
              <AppInput
                value={input}
                onChangeText={txt => setInput(txt)}
                placeholder="Category Name"
                keyboardType="name-phone-pad"
                returnKeyLabel="done"
              />
            </View>
          </View>
        </View>
        <View style={styles.deleteView}>
          {editId && (
            <TouchableOpacity onPress={handleDeleteCategory}>
              <Image source={images.img_delete} style={styles.delete} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <AppButton
            bg={theme.primary}
            bttnTxt="Save"
            showLoader={isCreatingCategory}
            onPress={handleCategory}
            txtColor={theme.primaryText}
          />
        </View>
      </View>
      <Loader visible={ isDeletingCategory } />
    </LinearGradient>
  );
}

export default NewCategoryScreen