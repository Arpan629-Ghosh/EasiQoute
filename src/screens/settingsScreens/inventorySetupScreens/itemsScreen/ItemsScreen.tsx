import { View, Image } from 'react-native'
import React, { useMemo } from 'react'
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/header/Header';
import { icons } from '@/config/icons';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { ItemsScreenProps } from '@/types/navigation.types';

const ItemsScreen = ({navigation} : ItemsScreenProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToNewItem = () => {
    navigation.navigate('NewItemsScreen');
  };
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header txt="Items" borderBottomEnabled={true} mTop={56} />
        <View style={styles.inpContainer}>
          <View style={styles.inputicon}>
            <Image source={icons.ic_search} style={styles.searchic} />
            <Input
              style={styles.noBorderInput}
              placeholder="Search ‘Items’"
              returnKeyType="search"
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="New Item"
            txtColor={theme.primaryText}
            gap={8}
              onPress={navigateToNewItem}
          >
            <Image source={icons.ic_whiteadd} style={styles.icn} />
          </ButtonComponent>
        </View>
      </View>
    </LinearGradient>
  );
}

export default ItemsScreen