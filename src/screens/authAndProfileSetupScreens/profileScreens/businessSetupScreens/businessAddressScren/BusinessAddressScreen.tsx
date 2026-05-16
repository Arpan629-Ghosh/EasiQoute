import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { icons } from '@/config/icons';
import { createStyles } from './style';
import Input from '@/components/inputComponent/Input';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import { TextInput } from 'react-native-gesture-handler';
import { useAppTheme } from '@/hooks/useAppTheme';
import Header from '@/components/header/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BusinessAddressScreenProps } from '@/types/navigation.types';

export interface FormData {
  address: string;
  city: string;
  postcode: string;
  country: string;
}

const BusinessAddressScreen = ({ navigation, route }: BusinessAddressScreenProps) => {
  const existingAddress = route.params?.address;
  const [formData, setFormData] = useState<FormData>({
    address: existingAddress?.address || '',
    city: existingAddress?.city || '',
    postcode: existingAddress?.postcode || '',
    country: existingAddress?.country || '',
  });

  const addressRef = useRef<TextInput | null>(null);
  const cityRef = useRef<TextInput | null>(null);
  const postRef = useRef<TextInput | null>(null);
  const countryRef = useRef<TextInput | null>(null);
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleInput = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    route.params?.onGoBack(formData);

    navigation.goBack()
  }

  return (
    <View style={[styles.safeareaview, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
        enabled={true}
        keyboardVerticalOffset={3}
      >
        <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            <Header txt="Business Address" borderBottomEnabled={true} />
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.inputicon}>
                  <Image source={icons.ic_search} style={styles.searchic} />
                  <Input
                    style={styles.noBorderInput}
                    placeholder="Search postcode"
                    returnKeyType="search"
                  />
                </View>

                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Street Address
                  </InterTightRegular>
                  <Input
                    ref={addressRef}
                    placeholder="Enter street address"
                    value={formData.address}
                    onChangeText={txt => handleInput('address', txt)}
                    onSubmitEditing={() => cityRef.current?.focus()}
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    City
                  </InterTightRegular>
                  <Input
                    ref={cityRef}
                    placeholder="Enter city"
                    value={formData.city}
                    onChangeText={txt => handleInput('city', txt)}
                    onSubmitEditing={() => postRef.current?.focus()}
                    returnKeyType="next"
                  />
                </View>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Postcode
                  </InterTightRegular>
                  <Input
                    ref={postRef}
                    placeholder="Enter postcode"
                    onChangeText={txt => handleInput('postcode', txt)}
                    value={formData.postcode}
                    onSubmitEditing={() => countryRef.current?.focus()}
                    returnKeyType="next"
                  />
                </View>
                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Country
                  </InterTightRegular>
                  <Input
                    ref={countryRef}
                    value={formData.country}
                    placeholder="Enter country"
                    onChangeText={txt => handleInput('country', txt)}
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.footerContainer}>
              <ButtonComponent
                bg={theme.primary}
                bttnTxt="Continue"
                txtColor={theme.primaryText}
                onPress={handleSave}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BusinessAddressScreen;
