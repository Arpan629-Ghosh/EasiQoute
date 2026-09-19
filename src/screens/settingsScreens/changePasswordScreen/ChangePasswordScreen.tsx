import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import LinearGradient from 'react-native-linear-gradient';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import AppButton from '@/components/appButton/AppButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '@/hooks/apis/useSettings';
import { useToast } from '@/hooks/useToast';
import { RootScreenProps } from '@/types/navigation.types';
import { Eye, EyeOff } from 'lucide-react-native';

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const ChangePasswordScreen = ({navigation} : RootScreenProps<'ChangePasswordScreen'>) => {
  const [changePasswordData, setChangePaswordData] =
    useState<ChangePasswordForm>({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  const [hidePassword, setHidePassword] = useState({
    oldPassword: true,
    newPassword: true,
    confirmPassword: true
  })
  const oldRef = useRef<TextInput | null>(null);
  const newRef = useRef<TextInput | null>(null);
  const confirmRef = useRef<TextInput | null>(null);
  const insets = useSafeAreaInsets();
  const { changePassword, settingLoading } = useSettings();
  const { showToast } = useToast();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleInput = (name: string, value: string) => {
    setChangePaswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (
    field: keyof typeof hidePassword,
  ) => {
    setHidePassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChangePassword = async () => {
    try {
      await changePassword({
        old_password: changePasswordData.oldPassword,
        new_password: changePasswordData.newPassword,
      });
      showToast('Password changed successfully.');
      navigation.navigate('MainTabs', {
        screen: "Settings",

        params: {
          screen: "SettingScreen"
        }
      })
    } catch (error) {
      showToast(String(error), 'error')
    }
    
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header txt="Change Password" borderBottomEnabled={true} />

      <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Old Password
                </InterTightRegular>
                <View style={styles.inputicon}>
                  <AppInput
                    ref={oldRef}
                    placeholder="Enter old password"
                    secureTextEntry={hidePassword.oldPassword}
                    textContentType="password"
                    style={styles.noBorderInput}
                    value={changePasswordData.oldPassword}
                    onChangeText={txt => handleInput('oldPassword', txt)}
                    onSubmitEditing={() => newRef.current?.focus()}
                    returnKeyType="next"
                  />
                  {hidePassword.oldPassword ? (
                    <EyeOff
                      size={24}
                      color={theme.textPrimary}
                      onPress={() => togglePasswordVisibility('oldPassword')}
                    />
                  ) : (
                    <Eye
                      size={24}
                      color={theme.textPrimary}
                      onPress={() => togglePasswordVisibility('oldPassword')}
                    />
                  )}
                </View>
              </View>
              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  New Password
                </InterTightRegular>
                <View style={styles.inputicon}>
                  <AppInput
                    ref={newRef}
                    placeholder="Enter new password"
                    secureTextEntry={hidePassword.newPassword}
                    textContentType="password"
                    style={styles.noBorderInput}
                    value={changePasswordData.newPassword}
                    onChangeText={txt => handleInput('newPassword', txt)}
                    onSubmitEditing={() => confirmRef.current?.focus()}
                    returnKeyType="next"
                  />
                  {hidePassword.newPassword ? (
                    <EyeOff
                      size={24}
                      color={theme.textPrimary}
                      onPress={() => togglePasswordVisibility('newPassword')}
                    />
                  ) : (
                    <Eye
                      size={24}
                      color={theme.textPrimary}
                      onPress={() => togglePasswordVisibility('newPassword')}
                    />
                  )}
                </View>
              </View>
              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Confirm New Password
                </InterTightRegular>
                <View style={styles.inputicon}>
                  <AppInput
                    ref={confirmRef}
                    placeholder="Confirm password"
                    secureTextEntry={hidePassword.confirmPassword}
                    textContentType="password"
                    style={styles.noBorderInput}
                    value={changePasswordData.confirmPassword}
                    onChangeText={txt => handleInput('confirmPassword', txt)}
                  />
                  {hidePassword.confirmPassword ? (
                    <EyeOff
                      size={24}
                      color={theme.textPrimary}
                      onPress={() => togglePasswordVisibility('confirmPassword')}
                    />
                  ) : (
                    <Eye
                      size={24}
                      color={theme.textPrimary}
                      onPress={() => togglePasswordVisibility('confirmPassword')}
                    />
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <AppButton
              bg={theme.primary}
              bttnTxt="Change Password"
              txtColor={theme.primaryText}
              onPress={handleChangePassword}
              showLoader={settingLoading}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ChangePasswordScreen;
