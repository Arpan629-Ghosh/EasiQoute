import { View, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native'
import React, {  useMemo, useRef, useState } from 'react'
import GradientHeader from '@/components/gradient/GradientHeader';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { createStyles } from './style';
import { images } from '@/config/images';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/apis/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useToast } from '@/hooks/useToast';
import { RootScreenProps } from '@/types/navigation.types';



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
  const {showToast} = useToast()
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
                  Let’s Get Started 🚀
                </InterTightSemiBold>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  Sign up and simplify your quoting and invoicing process.
                </InterTightRegular>
              </View>

              <View style={styles.formView}>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Email
                  </InterTightRegular>
                  <Input
                    ref={emailRef}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    returnKeyType="next"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChangeText={(txt: string) => handleInput('email', txt)}
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Password
                  </InterTightRegular>
                  <View style={styles.inputicon}>
                    <Input
                      ref={passwordRef}
                      placeholder="Enter password"
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
                <ButtonComponent
                  bg={theme.primary}
                  bttnTxt="Create Account"
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
                  Already have an account?{' '}
                </InterTightRegular>
                <TouchableOpacity onPress={goLoginScreen}>
                  <InterTightMedium fsize={16} fcolor={theme.textMuted}>
                    Login
                  </InterTightMedium>
                </TouchableOpacity>
              </View>
              <View style={styles.borderLine} />
              <View style={styles.createaccountView}>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  By continuing, you agree to our{' '}
                </InterTightRegular>
                <TouchableOpacity>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Terms of Service{' '}
                  </InterTightRegular>
                </TouchableOpacity>

                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  and{' '}
                </InterTightRegular>
                <TouchableOpacity>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Privacy Policy
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