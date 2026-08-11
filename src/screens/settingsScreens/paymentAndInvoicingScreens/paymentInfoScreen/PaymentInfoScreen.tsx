import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { useAppTheme } from '@/hooks/useAppTheme'
import { createStyles } from './style';
import Header from '@/components/header/Header';
import LinearGradient from 'react-native-linear-gradient';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import InterTightMedium from '@/components/appFonts/InterTightMedium';
import AppInput from '@/components/appInput/AppInput';
import AppButton from '@/components/appButton/AppButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PaymentInfoScreen = () => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
    const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header txt="Payment Info" borderBottomEnabled={true} />
      <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <View style={styles.header}>
                <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                  Payment Link
                </InterTightMedium>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    PayPal, Stripe, or other
                  </InterTightRegular>
                  <AppInput placeholder="sarah.johnson@paypal.com" />
                </View>
              </View>
              <View style={styles.formContainer}>
                <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                  Bank Info
                </InterTightMedium>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Bank Name
                  </InterTightRegular>
                  <AppInput placeholder="Barclays UK" />
                </View>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Account Name
                  </InterTightRegular>
                  <AppInput placeholder="Alpha Renovates Pvt. Ltd." />
                </View>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Account Number
                  </InterTightRegular>
                  <AppInput placeholder="65301942" />
                </View>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Sort Code
                  </InterTightRegular>
                  <AppInput placeholder="20-14-60" />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <AppButton
              bg={theme.primary}
              bttnTxt="Save Changes"
              txtColor={theme.primaryText}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

export default PaymentInfoScreen