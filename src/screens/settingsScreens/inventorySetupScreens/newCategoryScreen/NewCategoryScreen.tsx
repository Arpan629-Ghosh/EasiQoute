import {  View, } from 'react-native'
import React, { useMemo } from 'react'
import { useAppTheme } from '@/hooks/useAppTheme'
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/header/Header';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';

const NewCategoryScreen = () => {
    const { theme } = useAppTheme();
    const styles  = useMemo(() => createStyles(theme), [theme])
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header
          txt="Create New Category"
          borderBottomEnabled={true}
          mTop={56}
        />
        <View style={styles.inpContainer}>
          <View style = {styles.inp}>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              Category Name
            </InterTightRegular>
            <Input placeholder="Category Name" />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
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
}

export default NewCategoryScreen