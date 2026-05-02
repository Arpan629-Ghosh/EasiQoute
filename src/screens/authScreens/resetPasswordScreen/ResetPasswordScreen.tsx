import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import React, {  useMemo, useRef, useState } from 'react';
import { createStyles } from './style';
import { icons } from '@/config/icons';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { ResetPasswordScreenProps } from '@/types/navigation.types';
import { useAppTheme } from '@/hooks/useAppTheme';


const ResetPasswordScreen = ({navigation} : ResetPasswordScreenProps) => {
  const [input, setInput] = useState<string>('');
  const emailRef = useRef<TextInput | null>(null)
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme])



  const handleInput = (txt: string) => {
    setInput(txt);
  };

  const handleBack = () => {
    navigation.goBack()
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
      enabled={true}
      keyboardVerticalOffset={3}
    >
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        {isDark ? (
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
        ) : (
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
        )}

        <View>
          <View style={styles.forgotPasswordContainer}>
            <View style={styles.headerView}>
              <View style={styles.arrowContainer}>
                <ButtonComponent style={styles.icon} onPress={handleBack}>
                  {isDark ? (
                    <Image source={icons.ic_backwhite} style={styles.img} />
                  ) : (
                    <Image source={icons.ic_back} style={styles.img} />
                  )}
                </ButtonComponent>
              </View>
            </View>

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
                <ButtonComponent style={styles.bttn}>
                  <InterTightMedium fsize={16} fcolor="#FFFFFF">
                    Send Now
                  </InterTightMedium>
                </ButtonComponent>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
