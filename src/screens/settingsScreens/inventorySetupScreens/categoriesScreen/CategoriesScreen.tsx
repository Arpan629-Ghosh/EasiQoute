import { View, Image } from 'react-native';
import React, { useMemo } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { CategoriesScreenProps } from '@/types/navigation.types';

const CategoriesScreen = ({navigation}: CategoriesScreenProps) => {
  const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    
    const navigateToNewCategory = () => {
        navigation.navigate("NewCategoryScreen")
    }
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header txt="Categories" borderBottomEnabled={true} mTop={56} />
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
      <View style={styles.footer}>
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
