import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { createStyles } from './style';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { useAppTheme } from '@/hooks/useAppTheme';
import Header from '@/components/header/Header';

const ResetPasswordScreen = () => {
  const [input, setInput] = useState<string>('');
  const emailRef = useRef<TextInput | null>(null);
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleInput = (txt: string) => {
    setInput(txt);
  };

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
                    <Input
                      ref={emailRef}
                      returnKeyType="next"
                      placeholder="Enter your email"
                      value={input}
                      onChangeText={(txt: string) => handleInput(txt)}
                      keyboardType="email-address"
                    />
                  </View>
                  <ButtonComponent
                    bg={theme.primary}
                    bttnTxt="  Send Now"
                    txtColor={theme.primaryText}
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
