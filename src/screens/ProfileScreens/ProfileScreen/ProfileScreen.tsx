import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './style';
import { icons } from '@/config/icons';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { images } from '@/config/images';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { ProfileScreenProps } from '@/types/navigation.types';

interface ProfileForm {
    name: string,
    phone: string
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
    
    
    const [formData, setFormData] = useState<ProfileForm>({
        name: "",
        phone: ""
    })

    const nameRef = useRef<TextInput | null>(null);
    const phRef = useRef<TextInput | null>(null);

    useEffect(() => {
        nameRef.current?.focus()
    },[])
  const navigateToBack = () => {
    navigation.navigate('IntroScreen2');
  };
    
  const handleInput = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
      enabled={true}
      keyboardVerticalOffset={3}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.headerComponent}>
                <ButtonComponent onPress={navigateToBack}>
                  <Image source={icons.ic_back} style={styles.img} />
                </ButtonComponent>

                <InterTightMedium fsize={18} fcolor="#2D2D2D">
                  Profile Setup
                </InterTightMedium>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.profilePic}>
                <ButtonComponent>
                  <Image
                    source={images.img_profile}
                    style={styles.profileImg}
                  />
                  <Image source={icons.ic_add} style={styles.icon} />
                </ButtonComponent>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
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
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
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
          <View style={styles.footer}>
            <View style={styles.footerComponent}>
              <ButtonComponent style={styles.bttn}>
                <InterTightMedium fsize={16} fcolor="#FFFFFF">
                  Continue
                </InterTightMedium>
              </ButtonComponent>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
