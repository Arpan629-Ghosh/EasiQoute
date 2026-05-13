import { Image, View } from 'react-native';
import React, { useMemo } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/header/Header';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { icons } from '@/config/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NewSubCategoryScreen = () => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header
          txt="Create New Subcategory"
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
              />
              <Image source={icons.ic_down} style={styles.img} />
            </View>
          </View>
          <View style={styles.inp}>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              Subcategory Name
            </InterTightRegular>
            <Input placeholder="Subcategory Name" />
          </View>
        </View>
      </View>
      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="Save"
            txtColor={theme.primaryText}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default NewSubCategoryScreen;
