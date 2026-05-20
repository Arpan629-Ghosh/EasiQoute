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
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import LinearGradient from 'react-native-linear-gradient';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { images } from '@/config/images';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '@/hooks/apis/useSettings';
import { useToast } from '@/hooks/useToast';
import { ChangePasswordScreenProps } from '@/types/navigation.types';

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const ChangePasswordScreen = ({navigation} : ChangePasswordScreenProps) => {
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
                  <Input
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
                  <TouchableOpacity
                    onPress={() => togglePasswordVisibility('oldPassword')}
                  >
                    <Image source={images.img_vector} style={styles.img} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  New Password
                </InterTightRegular>
                <View style={styles.inputicon}>
                  <Input
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
                  <TouchableOpacity
                    onPress={() => togglePasswordVisibility('newPassword')}
                  >
                    <Image source={images.img_vector} style={styles.img} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Confirm New Password
                </InterTightRegular>
                <View style={styles.inputicon}>
                  <Input
                    ref={confirmRef}
                    placeholder="Confirm password"
                    secureTextEntry={hidePassword.confirmPassword}
                    textContentType="password"
                    style={styles.noBorderInput}
                    value={changePasswordData.confirmPassword}
                    onChangeText={txt => handleInput('confirmPassword', txt)}
                  />
                  <TouchableOpacity
                    onPress={() => togglePasswordVisibility('confirmPassword')}
                  >
                    <Image source={images.img_vector} style={styles.img} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <ButtonComponent
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
