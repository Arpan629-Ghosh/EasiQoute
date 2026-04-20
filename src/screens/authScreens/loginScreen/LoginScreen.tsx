import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { styles } from './styles';
import GradientHeader from '../../../components/gradient/GradientHeader';
import InterTightSemiBold from '../../../components/fontComponents/InterTightSemiBold';
import InterTightRegular from '../../../components/fontComponents/InterTightRegular';
import Input from '../../../components/inputComponent/Input';
import { images } from '../../../config/images';
import InterTightMedium from '../../../components/fontComponents/InterTightMedium';


interface LoginForm {
  email: string;
  password: string
}
const LoginScreen = () => {

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: ""
  })

  const emailRef = useRef<TextInput | null>(null)
  const passwordRef = useRef<TextInput | null>(null)

  const handleInput = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
        enabled={true}
        keyboardVerticalOffset={3}
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <GradientHeader />

            <View style={styles.form}>
              <View style={styles.textView}>
                <InterTightSemiBold fsize={24} fcolor="#2D2D2D">
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
                      secureTextEntry
                      textContentType="password"
                      style={styles.noBorderInput}
                    />
                    <TouchableOpacity>
                      <Image source={images.img_vector} style={styles.img} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Pressable style={styles.bttn}>
                  <InterTightMedium fsize={16} fcolor="#FFFFFF">
                    Login
                  </InterTightMedium>
                </Pressable>

                <View style={styles.forgotpasswordView}>
                  <InterTightRegular fsize={16} fcolor="#89909D">
                    Forgot password?{' '}
                  </InterTightRegular>
                  <TouchableOpacity>
                    <InterTightRegular fsize={16} fcolor="#082B60">
                      Reset
                    </InterTightRegular>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;
