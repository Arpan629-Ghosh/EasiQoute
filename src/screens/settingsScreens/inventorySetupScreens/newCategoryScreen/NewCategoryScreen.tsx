import {  View, } from 'react-native'
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


const NewCategoryScreen = ({navigation} : NewCategoryScreenProps) => {
  const [input, setInput] = useState<string>("")
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const { newCategories, settingLoading } = useSettings();
  const { showToast } = useToast();
  const styles = useMemo(() => createStyles(theme), [theme])
  
  const handleNewCategory = async () => {
    try {
      await newCategories({
        name: input,
      });
      navigation.goBack();
      showToast('Category updated successfully.');
    } catch (error) {
      showToast(String(error), 'error')
    }
    
  }
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header
          txt="Create New Category"
          borderBottomEnabled={true}
       
        />
        <View style={styles.inpContainer}>
          <View style = {styles.inp}>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              Category Name
            </InterTightRegular>
            <Input
              value={input}
              onChangeText={(txt) => setInput(txt)}
              placeholder="Category Name"
              keyboardType='name-phone-pad'
              returnKeyLabel='done'
            />
          </View>
        </View>
      </View>
      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="Save"
            showLoader={settingLoading}
            onPress={handleNewCategory}
            txtColor={theme.primaryText}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

export default NewCategoryScreen