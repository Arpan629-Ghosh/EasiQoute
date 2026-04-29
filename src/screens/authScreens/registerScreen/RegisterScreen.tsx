import { View, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import GradientHeader from '@/components/gradient/GradientHeader';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { styles } from './style';
import { images } from '@/config/images';
import { RegisterScreenProps } from '@/types/navigation.types';


interface LoginForm {
  email: string;
  password: string;
}
const RegisterScreen = ({navigation} : RegisterScreenProps) => {

  const [formData, setFormData] = useState<LoginForm>({
      email: '',
      password: '',
    });
  
    const emailRef = useRef<TextInput | null>(null);
    const passwordRef = useRef<TextInput | null>(null);
  
    useEffect(() => {
      emailRef.current?.focus()
    },[])
  
    const handleInput = (name: string, value: string) => {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
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
                  fcolor="#2D2D2D"
                  textAlign="left"
                >
                  Let’s Get Started 🚀
                </InterTightSemiBold>
                <InterTightRegular fsize={14} fcolor="#89909D">
                  Sign up and simplify your quoting and invoicing process.
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
                      secureTextEntry
                      textContentType="password"
                      style={styles.noBorderInput}
                    />
                    <ButtonComponent>
                      <Image source={images.img_vector} style={styles.img} />
                    </ButtonComponent>
                  </View>
                </View>
                <ButtonComponent style={styles.bttn}>
                  <InterTightMedium fsize={16} fcolor="#FFFFFF">
                    Create Account
                  </InterTightMedium>
                </ButtonComponent>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerTxtView}>
              <View style={styles.createaccountView}>
                <InterTightRegular fsize={16} fcolor="#89909D">
                  Already have an account?
                </InterTightRegular>
                <ButtonComponent onPress={goLoginScreen}>
                  <InterTightMedium fsize={16} fcolor="#082B60">
                    Login
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
}

export default RegisterScreen