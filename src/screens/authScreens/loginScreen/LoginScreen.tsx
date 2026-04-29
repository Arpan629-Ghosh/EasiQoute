import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import GradientHeader from '@components/gradient/GradientHeader';
import InterTightSemiBold from '@components/fontComponents/InterTightSemiBold';
import InterTightRegular from '@components/fontComponents/InterTightRegular';
import Input from '@components/inputComponent/Input';
import { images } from '@config/images';
import InterTightMedium from '@components/fontComponents/InterTightMedium';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { LoginScreenProps } from '@appTypes/navigation.types';

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

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

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

  const handleLogin = () => {
    navigation.replace('IntroScreen')
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
                  fcolor="#2D2D2D"
                  textAlign="left"
                >
                  Welcome Back 👋
                </InterTightSemiBold>
                <InterTightRegular fsize={14} fcolor="#89909D">
                  Log in to manage your quotes and invoices with ease.
                </InterTightRegular>
              </View>

              <View style={styles.formView}>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
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
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
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
                    <ButtonComponent onPress={handleSecureTextEntry}>
                      <Image source={images.img_vector} style={styles.img} />
                    </ButtonComponent>
                  </View>
                </View>
                <ButtonComponent onPress={handleLogin} style={styles.bttn}>
                  <InterTightMedium fsize={16} fcolor="#FFFFFF">
                    Login
                  </InterTightMedium>
                </ButtonComponent>

                <View style={styles.forgotpasswordView}>
                  <InterTightRegular fsize={16} fcolor="#89909D">
                    Forgot password?
                  </InterTightRegular>
                  <ButtonComponent onPress={resetPassword}>
                    <InterTightMedium fsize={16} fcolor="#082B60">
                      Reset
                    </InterTightMedium>
                  </ButtonComponent>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerTxtView}>
              <View style={styles.createaccountView}>
                <InterTightRegular fsize={16} fcolor="#89909D">
                  Don't have an account?{' '}
                </InterTightRegular>
                <ButtonComponent onPress={createAccount}>
                  <InterTightMedium fsize={16} fcolor="#082B60">
                    Create Account
                  </InterTightMedium>
                </ButtonComponent>
              </View>
              <View style={styles.borderLine} />
              <View style={styles.createaccountView}>
                <InterTightRegular fsize={14} fcolor="#89909D">
                  By continuing, you agree to our{' '}
                </InterTightRegular>
                <ButtonComponent>
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    Terms of Service{' '}
                  </InterTightRegular>
                </ButtonComponent>

                <InterTightRegular fsize={14} fcolor="#89909D">
                  and{' '}
                </InterTightRegular>
                <ButtonComponent>
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    Privacy Policy
                  </InterTightRegular>
                </ButtonComponent>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
