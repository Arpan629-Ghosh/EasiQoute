import { View, Image } from 'react-native'
import React, { useMemo } from 'react'
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/header/Header';
import { icons } from '@/config/icons';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { SubCategoriesScreenProps } from '@/types/navigation.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SubCategoriesScreen = ({navigation} : SubCategoriesScreenProps) => {
    const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();

    const navigateToNewSubCategory = () => {
        navigation.navigate("NewSubCategoryScreen")
    }
    return (
      <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
        <View style={styles.header}>
          <Header txt="Subcategories" borderBottomEnabled={true} />
          <View style={styles.inpContainer}>
            <View style={styles.inputicon}>
              <Image source={icons.ic_search} style={styles.searchic} />
              <Input
                style={styles.noBorderInput}
                placeholder="Search ‘Subcategories’"
                returnKeyType="search"
              />
            </View>
          </View>
        </View>
        <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
          <View style={styles.footerContainer}>
            <ButtonComponent
              bg={theme.primary}
              bttnTxt="New Subcategory"
              txtColor={theme.primaryText}
              gap={8}
                onPress={navigateToNewSubCategory}
            >
              <Image source={icons.ic_whiteadd} style={styles.icn} />
            </ButtonComponent>
          </View>
        </View>
      </LinearGradient>
    );
}

export default SubCategoriesScreen