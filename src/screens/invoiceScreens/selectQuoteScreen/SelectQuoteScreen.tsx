
import { useAppTheme } from '@/hooks/useAppTheme'
import { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { SelectQuoteScreenProps } from '@/types/navigation.types';

const SelectQuoteScreen = ({navigation}: SelectQuoteScreenProps) => {

    const { theme } = useAppTheme();
    const insets = useSafeAreaInsets();
    const styles = useMemo(() => createStyles(theme), [theme])

    const navigateToNewInvoiceScreens = () => {
        navigation.navigate("NewInvoiceScreens")
    }
  return (
      <LinearGradient colors={theme.gradientPrimary} style = {styles.container}>
          <Header
              txt="Select Quote"
              borderBottomEnabled = {true}
          />

          <View style = {styles.content}>
              {/* main content */}
          </View>

          <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
                  <View style={styles.footerContainer}>
                    <ButtonComponent
                      bg={theme.primary}
                      bttnTxt="Continue"
                      txtColor={theme.primaryText}
                      onPress={navigateToNewInvoiceScreens}
                    />
                  </View>
                </View>
    </LinearGradient>
  )
}

export default SelectQuoteScreen
