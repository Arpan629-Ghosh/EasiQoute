import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
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

interface ProfileForm {
  name: string;
  phone: string;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [formData, setFormData] = useState<ProfileForm>({
    name: '',
    phone: '',
  });

  const nameRef = useRef<TextInput | null>(null);
  const phRef = useRef<TextInput | null>(null);
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToBusinessSetup = () => {
    navigation.navigate('BusinessScreen');
  };

  const handleInput = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <View style={[styles.safeareaview, { paddingBottom: insets.bottom}]}>
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
                  <TouchableOpacity>
                    <Image
                      source={
                        isDark ? images.img_darkprofile : images.img_profile
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
              onPress={navigateToBusinessSetup}
              bg={theme.primary}
              bttnTxt="Continue"
              txtColor={theme.primaryText}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;
