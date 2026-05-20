import { View, Image } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { CategoriesScreenProps } from '@/types/navigation.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '@/hooks/apis/useSettings';
import { useToast } from '@/hooks/useToast';

const CategoriesScreen = ({navigation}: CategoriesScreenProps) => {
  const { theme } = useAppTheme();
  const { fetchCategories } = useSettings();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
    const styles = useMemo(() => createStyles(theme), [theme]);
    
    const navigateToNewCategory = () => {
        navigation.navigate("NewCategoryScreen")
    }
  useEffect(() => {
    const handleFetchCategories = async () => {
      try {
        const data = await fetchCategories();
        console.log("data", data)
      } catch (error) {
        showToast(String(error), 'error');
      }
    };
    handleFetchCategories()
  }, [])
  
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header txt="Categories" borderBottomEnabled={true} />
        <View style={styles.inpContainer}>
          <View style={styles.inputicon}>
            <Image source={icons.ic_search} style={styles.searchic} />
            <Input
              style={styles.noBorderInput}
              placeholder="Search ‘Categories’"
              returnKeyType="search"
            />
          </View>
        </View>
      </View>
      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="New Category"
            txtColor={theme.primaryText}
            gap={8}
            onPress={navigateToNewCategory}
          >
            <Image source={icons.ic_whiteadd} style={styles.icn} />
          </ButtonComponent>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CategoriesScreen;
