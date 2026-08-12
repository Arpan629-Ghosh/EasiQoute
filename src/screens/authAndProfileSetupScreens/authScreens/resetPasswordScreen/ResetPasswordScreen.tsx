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

const ResetPasswordScreen = ({navigation} : RootScreenProps<'ResetPasswordScreen'>) => {
  const [input, setInput] = useState<string>('');
  const emailRef = useRef<TextInput | null>(null);
  const { theme } = useAppTheme();
  const { forgotPassword, loading } = useAuth();
  const { showToast } = useToast();
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
                    Forgot Password?
                  </InterTightSemiBold>

                  <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                    No worries! Just enter your email, and we’ll help you reset
                    your password.
                  </InterTightRegular>
                </View>

                <View style={styles.inpbttnView}>
                  <View style={styles.input}>
                    <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                      Email
                    </InterTightRegular>
                    <AppInput
                      ref={emailRef}
                      returnKeyType="next"
                      placeholder="Enter your email"
                      autoCapitalize='none'
                      value={input}
                      onChangeText={(txt: string) => handleInput(txt)}
                      keyboardType="email-address"
                    />
                  </View>
                  <AppButton
                    bg={theme.primary}
                    bttnTxt="  Send Now"
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
