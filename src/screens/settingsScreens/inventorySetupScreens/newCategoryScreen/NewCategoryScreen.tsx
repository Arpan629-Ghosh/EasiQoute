import {  Image, TouchableOpacity, View, } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useAppTheme } from '@/hooks/useAppTheme'
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/header/Header';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '@/hooks/apis/useSettings';
import { useToast } from '@/hooks/useToast';
import { NewCategoryScreenProps, } from '@/types/navigation.types';
import { images } from '@/config/images';
import { CreateCategories } from '@/types/apis/settings.types';


const NewCategoryScreen = ({ navigation, route }: NewCategoryScreenProps) => {
  const editId = route.params?.editId;
  const name = route.params?.name;
  const [input, setInput] = useState<string>(name || "")
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const { newCategories, settingLoading, deleteCategory } = useSettings();
  const { showToast } = useToast();
  const isEdit = !!editId
  
  const styles = useMemo(() => createStyles(theme), [theme])
  console.log(editId)

  const handleCategory = async () => {
    try {
      const payload: CreateCategories = {
        name: input,
      };

      if (isEdit) {
        payload.id = editId;
      }

      await newCategories(payload);

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
      const response = await deleteCategory(editId as number)
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
              <Input
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
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="Save"
            showLoader={settingLoading}
            onPress={handleCategory}
            txtColor={theme.primaryText}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

export default NewCategoryScreen