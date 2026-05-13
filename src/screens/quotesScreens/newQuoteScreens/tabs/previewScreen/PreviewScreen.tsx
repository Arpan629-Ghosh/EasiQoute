import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { createStyles } from './style'
import Input from '@/components/inputComponent/Input'
import ButtonComponent from '@/components/buttonComponent/ButtonComponent'
import { icons } from '@/config/icons'
import { images } from '@/config/images'
import { PreviewScreenProps } from '@/types/navigation.types'
import { useAppTheme } from '@/hooks/useAppTheme'
import {  useSafeAreaInsets } from 'react-native-safe-area-context'

const PreviewScreen = ({ navigation }: PreviewScreenProps) => {

  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme])
  const navigateToTemplatesScreen = () => {
    navigation.navigate('TemplatesScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.input}>
          <Input
            placeholder="Search or select subcategory"
            style={styles.noBorderInput}
          />
          <TouchableOpacity>
            <Image source={icons.ic_drop} style={styles.searchic} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.quote}>
          <Image source={images.img_quote} style={styles.quoteimg} />
        </View>
      </ScrollView>

      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <View style={styles.firstBttnContainer}>
          <ButtonComponent
            onPress={navigateToTemplatesScreen}
            borderwidth={1}
            borderc={theme.chipBorder}
            bttnTxt="Templates"
            txtColor={theme.textMuted}
          />
        </View>
        <View style={styles.secondBttnContainer}>
          <ButtonComponent
            borderc={theme.chipBorder}
            gap={8}
            borderwidth={1}
            buttonWidth={182}
            bttnTxt="Share"
            txtColor={theme.textMuted}
     
          >
            <Image source={icons.ic_share} style={styles.share} />
          </ButtonComponent>
          <ButtonComponent
            bg={theme.primary}
            buttonWidth={182}
            bttnTxt="Save"
            txtColor={theme.primaryText}
    
          />
        </View>
      </View>
    </View>
  );
};

export default PreviewScreen