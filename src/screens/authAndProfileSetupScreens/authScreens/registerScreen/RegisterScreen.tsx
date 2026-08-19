import { View, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native'
import React, {  useMemo, useRef, useState } from 'react'
import GradientHeader from '@/components/gradient/GradientHeader';
import InterTightSemiBold from '@/components/appFonts/InterTightSemiBold';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import AppButton from '@/components/appButton/AppButton';
import InterTightMedium from '@/components/appFonts/InterTightMedium';
import { createStyles } from './style';
import { images } from '@/config/images';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/apis/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useToast } from '@/hooks/useToast';
import { RootScreenProps } from '@/types/navigation.types';
import { useTranslation } from 'react-i18next';



interface LoginForm {
  email: string;
  password: string;
}
const RegisterScreen = ({navigation} : RootScreenProps<'RegisterScreen'>) => {

  const [formData, setFormData] = useState<LoginForm>({
      email: '',
      password: '',
    });
  
    const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { signup, loading } = useAuth();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const pushToken = useSelector((state: RootState) => state.notification.fcmToken)
  
    const handleInput = (name: string, value: string) => {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSignup = async () => {
      try {
          await signup({
          email: formData.email,
          password: formData.password,
          device_type: Platform.OS === 'ios' ? 'ios' : 'android',
          push_token: pushToken || undefined,
        });
        showToast('Signup Successful');
        navigation.navigate('LoginScreen');
      } catch (error) {
        console.log('SIGNUP ERROR', error);
        showToast(String(error), 'error' )
      }
    };
  
  const goLoginScreen = () => {
      navigation.navigate("LoginScreen")
    }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
      enabled={true}
      keyboardVerticalOffset={3}
    >
      <ScrollView style={styles.scrollview} keyboardShouldPersistTaps="handled">
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
                  {t('auth.signup.getStart')} 🚀
                </InterTightSemiBold>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  {t('auth.signup.startMssg')}
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
                      secureTextEntry
                      textContentType="password"
                      style={styles.noBorderInput}
                    />
                    <TouchableOpacity>
                      <Image source={images.img_vector} style={styles.img} />
                    </TouchableOpacity>
                  </View>
                </View>
                <AppButton
                  bg={theme.primary}
                  bttnTxt={t('button.createAccount')}
                  txtColor={theme.primaryText}
                  showLoader={loading}
                  gap={4}
                  onPress={handleSignup}
                />
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerTxtView}>
              <View style={styles.createaccountView}>
                <InterTightRegular fsize={16} fcolor={theme.textSecondary}>
                  {t('auth.signup.accntMssg')}
                </InterTightRegular>
                <TouchableOpacity onPress={goLoginScreen}>
                  <InterTightMedium fsize={16} fcolor={theme.textMuted}>
                    {t('button.login')}
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
}

export default RegisterScreen