import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createStyles } from './style';
import { icons } from '@/config/icons';
import AppButton from '@/components/appButton/AppButton';
import { images } from '@/config/images';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import { useAppTheme } from '@/hooks/useAppTheme';
import Header from '@/components/header/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePicker from '@/components/imagePicker/ImagePicker';
import { useAuth } from '@/hooks/apis/useAuth';
import { useToast } from '@/hooks/useToast';
import { RootScreenProps } from '@/types/navigation.types';
import { useTranslation } from 'react-i18next';
import AppImage from '@/components/appImage/AppImage';
import { useGetUserDetails } from '@/hooks/apis/useGetUserDetails';
import { ProfileSetupPayload } from '@/types/apis/auth.types';

interface ProfileForm {
  name: string;
  phone: string;
  imageUri?: {
    uri: string;
    type: string;
    fileName?: string;
  } | null;
}

const ProfileScreen = ({ navigation, route }: RootScreenProps<'ProfileScreen'>) => {
  const [formData, setFormData] = useState<ProfileForm>({
    name: route.params.name ?? '',
    phone: route.params.phone ?? '',
    imageUri: route.params.url ?
      {
        uri: route.params.url,
        type: 'image/jpeg',
        fileName: 'profile.jpg',
      } : null,
  });
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const nameRef = useRef<TextInput | null>(null);
  const phRef = useRef<TextInput | null>(null);
  const insets = useSafeAreaInsets();
  const { isEdit } = route.params || false;
  const { theme, isDark } = useAppTheme();
  const {  user } = useAuth();
  const { isProfileUpdating, updateProfileAsync } = useGetUserDetails();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleInput = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');

    // Remove 44 if already present
    const number = digits.startsWith('44') ? digits.slice(2) : digits;

    return `+44${number}`;
  };

  const handleClose = useCallback(() => {
    setOpenOptions(false);
  }, []);

  const setImageUri = useCallback((uri: string) => {
    setFormData(prev => ({
      ...prev,
      imageUri: {
        uri: uri,
        type: 'image/jpeg',
        fileName: 'profile.jpg',
      },
    }));
  }, []);

  const removeImageUri = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      imageUri: null,
    }));
  }, []);

  const handleProfleSetup = async () => {
    let payload: ProfileSetupPayload = {
      name: formData.name,
      phone: formatPhone(formData.phone),
      avatar: formData.imageUri || null,
    };
    try {
      await updateProfileAsync(payload);
      showToast('Profile updated successfully.');
      if (isEdit) {
        navigation.navigate('MainTabs', {
          screen: 'Settings',

          params: {
            screen: 'SettingScreen'
          }
        })
      }
      else if (user?.is_company_profile_setup) navigation.replace('MainTabs', {
        screen: 'Home',

        params: {
          screen: 'HomeScreen',
        },
      });
      else
        navigation.navigate('BusinessScreen', {
          isEdit: false,
        });
    } catch (error) {
      showToast(String(error), 'error');
      console.log('PROFILE SETUP ERROR', error);
    }
  };

  return (
    <View style={[styles.safeareaview, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        enabled={true}
        keyboardVerticalOffset={3}
      >
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <Header
              borderBottomEnabled={true}
              txt={isEdit ? t('auth.profile.edit') : t('auth.profile.header')}
            />
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={styles.scrollview}
            >
              <View style={styles.formContainer}>
                <View style={styles.profilePic}>
                  <TouchableOpacity onPress={() => setOpenOptions(true)}>
                    <AppImage
                      uri={formData.imageUri?.uri}
                      fallbackImage={isDark ? images.img_darkprofile : images.img_profile}
                      style={styles.profileImg}
                    />
                    
                    {/* <Image
                      source={
                        formData.imageUri
                          ? { uri: formData.imageUri.uri }
                          : isDark
                          ? images.img_darkprofile
                          : images.img_profile
                      }
                      style={styles.profileImg}
                    /> */}
                    <Image
                      source={isDark ? icons.ic_darkadd : icons.ic_add}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.inp}>
                    <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                      {t('inputs.name.label')}
                    </InterTightRegular>
                    <AppInput
                      ref={nameRef}
                      onSubmitEditing={() => phRef.current?.focus()}
                      returnKeyType="next"
                      placeholder={t('inputs.name.placeholder')}
                      value={formData.name}
                      onChangeText={(txt: string) => handleInput('name', txt)}
                      keyboardType="name-phone-pad"
                    />
                  </View>
                  <View style={styles.inp}>
                    <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                      {t('inputs.phone.label')}
                    </InterTightRegular>
                    <AppInput
                      ref={phRef}
                      returnKeyType="next"
                      placeholder={t('inputs.phone.placeholder')}
                      value={formData.phone}
                      onChangeText={(txt: string) => handleInput('phone', txt)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerComponent}>
            <AppButton
              onPress={handleProfleSetup}
              bg={theme.primary}
              bttnTxt={isEdit ? 'Update Profile' : 'Continue'}
              showLoader={isProfileUpdating}
              gap={4}
              txtColor={theme.primaryText}
            />
          </View>
        </View>
        <ImagePicker
          visible={openOptions}
          onClose={handleClose}
          onImageUri={setImageUri}
          onRemoveUri={removeImageUri}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;
