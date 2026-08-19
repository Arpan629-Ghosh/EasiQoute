import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { createStyles } from './style';
import AppButton from '@/components/appButton/AppButton';
import InterTightSemiBold from '@/components/appFonts/InterTightSemiBold';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import { useAppTheme } from '@/hooks/useAppTheme';
import Header from '@/components/header/Header';
import { useAuth } from '@/hooks/apis/useAuth';
import { useToast } from '@/hooks/useToast';
import { RootScreenProps } from '@/types/navigation.types';
import { useTranslation } from 'react-i18next';

const ResetPasswordScreen = ({navigation} : RootScreenProps<'ResetPasswordScreen'>) => {
  const [input, setInput] = useState<string>('');
  const emailRef = useRef<TextInput | null>(null);
  const { theme } = useAppTheme();
  const { forgotPassword, loading } = useAuth();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleInput = (txt: string) => {
    setInput(txt);
  };
  
  const handleResetPassword = async () => {
    
    try {
      await forgotPassword({
        email: input,
      });
      showToast('Please check your email to reset your password.');
      navigation.navigate("LoginScreen")
    } catch (error) {
      console.log("FORGOTPASSWORD ERROR", error)
      showToast(String(error), 'error')
    }

  }
  return (
    <View style={styles.safeareaview}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
        enabled={true}
        keyboardVerticalOffset={3}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}
        >
          <View>
            <View style={styles.forgotPasswordContainer}>
              <Header borderBottomEnabled={false} />

              <View style={styles.formContainer}>
                <View style={styles.txtView}>
                  <InterTightSemiBold
                    fsize={24}
                    fcolor={theme.textPrimary}
                    textAlign="left"
                  >
                    {t('auth.forgotPassword.title')}
                  </InterTightSemiBold>

                  <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                    {t('auth.forgotPassword.mssg')}
                  </InterTightRegular>
                </View>

                <View style={styles.inpbttnView}>
                  <View style={styles.input}>
                    <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                      {t('inputs.email.label')}
                    </InterTightRegular>
                    <AppInput
                      ref={emailRef}
                      returnKeyType="next"
                      placeholder={t('inputs.email.placeholder')} 
                      autoCapitalize="none"
                      value={input}
                      onChangeText={(txt: string) => handleInput(txt)}
                      keyboardType="email-address"
                    />
                  </View>
                  <AppButton
                    bg={theme.primary}
                    bttnTxt={t('button.sendNow')}
                    txtColor={theme.primaryText}
                    showLoader={loading}
                    gap={4}
                    onPress={handleResetPassword}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPasswordScreen;
