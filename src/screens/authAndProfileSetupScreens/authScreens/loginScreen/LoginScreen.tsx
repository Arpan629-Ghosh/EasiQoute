import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { createStyles } from './styles';
import GradientHeader from '@components/gradient/GradientHeader';
import InterTightSemiBold from '@/components/appFonts/InterTightSemiBold';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import { images } from '@config/images';
import InterTightMedium from '@/components/appFonts/InterTightMedium';
import AppButton from '@/components/appButton/AppButton';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/apis/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useToast } from '@/hooks/useToast';
import { RootScreenProps } from '@/types/navigation.types';
import { useTranslation } from 'react-i18next';
import { useAppLanguage } from '@/hooks/useAppLanguage';

interface LoginForm {
  email: string;
  password: string;
}
const LoginScreen = ({ navigation }: RootScreenProps<'LoginScreen'>) => {

  

  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const { theme } = useAppTheme();
  const { login, loading } = useAuth();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { languageMode } = useAppLanguage();
  const pushToken = useSelector((state: RootState) => state.notification.fcmToken)
  const styles = useMemo(() => createStyles(theme), [theme]);
  const handleInput = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const createAccount = () => {
    navigation.navigate('RegisterScreen');
  };

  const resetPassword = () => {
    navigation.navigate('ResetPasswordScreen')
  }

  const handleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const handleLogin = async () => {
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
        device_type: Platform.OS === "ios" ? "ios" : "android",
        push_token: pushToken || undefined
      });
      showToast('Login Successful');
      if (response.is_profile_setup && response.is_company_profile_setup)
        navigation.replace('MainTabs', {
          screen: "Home",
          params: {
            screen: "HomeScreen"
          }
        });
   
      else if(response.is_profile_setup)
        navigation.navigate('BusinessScreen', {
          isEdit: false
        });
      else 
        navigation.replace("IntroScreen")
    } catch (error) {
      console.log("LOGIN ERROR", error)
      showToast(String(error), 'error')
    }
  }
  console.log(languageMode)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
      enabled={true}
      keyboardVerticalOffset={3}
    >
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <GradientHeader />

            <View style={styles.form}>
              <View style={styles.textView}>
                <InterTightSemiBold
                  fsize={24}
                  fcolor={theme.textPrimary}
                  textAlign="left"
                >
                  {t('auth.login.welcomeBack')} 👋
                </InterTightSemiBold>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  {t('auth.login.loginMssg')}
                </InterTightRegular>
              </View>

              <View style={styles.formView}>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {t('inputs.email.label')}
                  </InterTightRegular>
                  <AppInput
                    ref={emailRef}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    returnKeyType="next"
                    placeholder={t('inputs.email.placeholder')}
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(txt: string) => handleInput('email', txt)}
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {t('inputs.password.label')}
                  </InterTightRegular>
                  <View style={styles.inputicon}>
                    <AppInput
                      ref={passwordRef}
                      placeholder={t('inputs.password.placeholder')}
                      value={formData.password}
                      onChangeText={(txt: string) =>
                        handleInput('password', txt)
                      }
                      secureTextEntry={secureTextEntry}
                      textContentType="password"
                      style={styles.noBorderInput}
                    />
                    <TouchableOpacity onPress={handleSecureTextEntry}>
                      <Image source={images.img_vector} style={styles.img} />
                    </TouchableOpacity>
                  </View>
                </View>
                <AppButton
                  onPress={handleLogin}
                  bg={theme.primary}
                  bttnTxt={t('button.login')}
                  showLoader={loading}
                  gap={4}
                  txtColor={theme.primaryText}
                />
                <View style={styles.forgotpasswordView}>
                  <InterTightRegular fsize={16} fcolor={theme.textSecondary}>
                    {t('auth.login.forgotPassword')}{' '}
                  </InterTightRegular>
                  <TouchableOpacity onPress={resetPassword}>
                    <InterTightMedium fsize={16} fcolor={theme.textMuted}>
                      {t('auth.login.reset')}
                    </InterTightMedium>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerTxtView}>
              <View style={styles.createaccountView}>
                <InterTightRegular fsize={16} fcolor={theme.textSecondary}>
                  {t('auth.login.accntMssg')}
                </InterTightRegular>
                <TouchableOpacity onPress={createAccount}>
                  <InterTightMedium fsize={16} fcolor={theme.textMuted}>
                    {t('button.createAccount')}
                  </InterTightMedium>
                </TouchableOpacity>
              </View>
              <View style={styles.borderLine} />
              <View style={styles.createaccountView}>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  {t('common.auth.footerMssg')}
                </InterTightRegular>
                <TouchableOpacity>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {t('common.auth.tos')}{' '}
                  </InterTightRegular>
                </TouchableOpacity>

                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  {t('common.auth.and')}{' '}
                </InterTightRegular>
                <TouchableOpacity>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                   {t('common.auth.privacy')}
                  </InterTightRegular>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
