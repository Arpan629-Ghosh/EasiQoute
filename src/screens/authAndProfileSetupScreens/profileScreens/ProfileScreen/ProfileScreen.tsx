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
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { images } from '@/config/images';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { ProfileScreenProps } from '@/types/navigation.types';
import { useAppTheme } from '@/hooks/useAppTheme';
import Header from '@/components/header/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePicker from '@/components/imagePicker/ImagePicker';
import { useAuth } from '@/hooks/apis/useAuth';

interface ProfileForm {
  name: string;
  phone: string;
  imageUri?: {
    uri: string;
    type: string;
    fileName?: string;
  } | null;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [formData, setFormData] = useState<ProfileForm>({
    name: '',
    phone: '',
    imageUri: null,
  });
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const nameRef = useRef<TextInput | null>(null);
  const phRef = useRef<TextInput | null>(null);
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();
  const { profileSetup } = useAuth();
  const styles = useMemo(() => createStyles(theme), [theme]);

 

  const handleInput = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatPhone = formData.phone.startsWith("+44") ? formData.phone : `${"+44"}${formData.phone}`
  console.log(formatPhone)

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
  },[]);

  const removeImageUri = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      imageUri: null,
    }));
  }, []);
  
  const handleProfleSetup = async() => {
    try {
      await profileSetup({
        name: formData.name,
        phone: formatPhone,
        avatar: formData.imageUri || null
      })
      navigation.navigate("BusinessScreen")
    } catch (error) {
      console.log("PROFILE SETUP ERROR",error);
    }
  }

  return (
    <View style={[styles.safeareaview, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        enabled={true}
        keyboardVerticalOffset={3}
      >
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <Header borderBottomEnabled={true} txt="Profile Setup" />
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={styles.scrollview}
            >
              <View style={styles.formContainer}>
                <View style={styles.profilePic}>
                  <TouchableOpacity onPress={() => setOpenOptions(true)}>
                    <Image
                      source={
                        formData.imageUri
                          ? { uri: formData.imageUri.uri }
                        : isDark
                        ? images.img_darkprofile
                        : images.img_profile
                      }
                      style={styles.profileImg}
                    />
                    <Image
                      source={isDark ? icons.ic_darkadd : icons.ic_add}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.inp}>
                    <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                      Name
                    </InterTightRegular>
                    <Input
                      ref={nameRef}
                      onSubmitEditing={() => phRef.current?.focus()}
                      returnKeyType="next"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChangeText={(txt: string) => handleInput('name', txt)}
                      keyboardType="name-phone-pad"
                    />
                  </View>
                  <View style={styles.inp}>
                    <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                      Phone
                    </InterTightRegular>
                    <Input
                      ref={phRef}
                      returnKeyType="next"
                      placeholder="Enter phone no."
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
            <ButtonComponent
              onPress={handleProfleSetup}
              bg={theme.primary}
              bttnTxt="Continue"
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
