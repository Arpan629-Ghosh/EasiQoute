import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { createStyles } from './style';
import { icons } from '@/config/icons';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { images } from '@/config/images';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { ProfileScreenProps } from '@/types/navigation.types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/hooks/useAppTheme';

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
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToBack = () => {
    navigation.goBack();
  };

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
    <SafeAreaView style={styles.safeareaview} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        enabled={true}
        keyboardVerticalOffset={3}
      >
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
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.mainContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.headerComponent}>
                  <TouchableOpacity onPress={navigateToBack}>
                    {isDark ? (
                      <Image source={icons.ic_backwhite} style={styles.img} />
                    ) : (
                      <Image source={icons.ic_back} style={styles.img} />
                    )}
                  </TouchableOpacity>

                  <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
                    Profile Setup
                  </InterTightMedium>
                  <View style={styles.emptyview} />
                </View>
              </View>
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
            </View>
          </View>
        </ScrollView>
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
    </SafeAreaView>
  );
};

export default ProfileScreen;
