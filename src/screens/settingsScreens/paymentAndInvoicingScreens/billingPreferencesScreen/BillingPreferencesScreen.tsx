import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import React, { useMemo } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import LinearGradient from 'react-native-linear-gradient';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import { icons } from '@/config/icons';
import AppButton from '@/components/appButton/AppButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BillingPreferencesScreen = () => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header txt="Billing Preferences" borderBottomEnabled={true} />
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
            <View style={styles.formContainer}>
              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Default VAT Rate (%)
                </InterTightRegular>
                <View style={styles.inputicon}>
                  <AppInput
                    style={styles.noBorderInput}
                    placeholder="e.g. 18%"
                  />
                  <Image source={icons.ic_down} style={styles.img} />
                </View>
              </View>
              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Quote Expiry (Days)
                </InterTightRegular>
                <AppInput placeholder="e.g. 30 days" />
              </View>
              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Payment Terms (Days)
                </InterTightRegular>
                <AppInput placeholder="e.g. 30 days" />
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
};

export default BillingPreferencesScreen;
