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
import InterTightSemiBold from '@components/fontComponents/InterTightSemiBold';
import InterTightRegular from '@components/fontComponents/InterTightRegular';
import Input from '@components/inputComponent/Input';
import { images } from '@config/images';
import InterTightMedium from '@components/fontComponents/InterTightMedium';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { LoginScreenProps } from '@appTypes/navigation.types';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/apis/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface LoginForm {
  email: string;
  password: string;
}
const LoginScreen = ({ navigation }: LoginScreenProps) => {

  

  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const { theme } = useAppTheme();
  const { login } = useAuth();
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
      await login({
        email: formData.email,
        password: formData.password,
        device_type: Platform.OS === "ios" ? "ios" : "android",
        push_token: pushToken || undefined
      });
      navigation.replace('IntroScreen');
    } catch (error) {
      console.log("LOGIN ERROR", error)
    }
  }

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
                  Welcome Back 👋
                </InterTightSemiBold>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  Log in to manage your quotes and invoices with ease.
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
                      secureTextEntry={secureTextEntry}
                      textContentType="password"
                      style={styles.noBorderInput}
                    />
                    <TouchableOpacity onPress={handleSecureTextEntry}>
                      <Image source={images.img_vector} style={styles.img} />
                    </TouchableOpacity>
                  </View>
                </View>
                <ButtonComponent
                  onPress={handleLogin}
                  bg={theme.primary}
                  bttnTxt="Login"
                  txtColor={theme.primaryText}
                />
                <View style={styles.forgotpasswordView}>
                  <InterTightRegular fsize={16} fcolor={theme.textSecondary}>
                    Forgot password?{' '}
                  </InterTightRegular>
                  <TouchableOpacity onPress={resetPassword}>
                    <InterTightMedium fsize={16} fcolor={theme.textMuted}>
                      Reset
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
                  Don't have an account?{' '}
                </InterTightRegular>
                <TouchableOpacity onPress={createAccount}>
                  <InterTightMedium fsize={16} fcolor={theme.textMuted}>
                    Create Account
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
};

export default LoginScreen;
