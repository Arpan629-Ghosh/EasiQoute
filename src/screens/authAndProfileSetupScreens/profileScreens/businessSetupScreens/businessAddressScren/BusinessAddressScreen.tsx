import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';

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
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/hooks/apis/useAuth';
import { useToast } from '@/hooks/useToast';
import { SearchAddressPayload } from '@/types/apis/auth.types';
import AddressList from '@/components/addressList/AddressList';

export interface FormData {
  address: string;
  city: string;
  postcode: string;
  country: string;
}

const BusinessAddressScreen = ({
  navigation,
  route,
}: BusinessAddressScreenProps) => {
  const existingAddress = route.params?.address;

  const [formData, setFormData] = useState<FormData>({
    address: existingAddress?.address || '',
    city: existingAddress?.city || '',
    postcode: existingAddress?.postcode || '',
    country: existingAddress?.country || '',
  });

  const [searchAddressInput, setSearchAddressInput] = useState('');

  const [searchData, setSearchData] = useState<SearchAddressPayload[]>([]);

  const addressRef = useRef<TextInput | null>(null);
  const cityRef = useRef<TextInput | null>(null);
  const postRef = useRef<TextInput | null>(null);
  const countryRef = useRef<TextInput | null>(null);

  const insets = useSafeAreaInsets();

  const debouncedSearch = useDebounce(searchAddressInput, 500);

  const { theme } = useAppTheme();

  const { searchAddress } = useAuth();

  const { showToast } = useToast();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleInput = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    route.params?.onGoBack(formData);

    navigation.goBack();
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (!debouncedSearch?.trim() || debouncedSearch.length < 3) {
        setSearchData([]);
        return;
      }

      try {
        const data = await searchAddress(debouncedSearch);

        if (Array.isArray(data)) {
          setSearchData(data);
        } else if (data) {
          setSearchData([data]);
        } else {
          setSearchData([]);
        }
      } catch (error) {
        console.log('SEARCH ERROR', error);

        showToast(String(error), 'error');

        setSearchData([]);
      }
    };

    fetchAddress();
  }, [debouncedSearch]);

  const handleSelectAddress = (item: SearchAddressPayload) => {
    setFormData({
      address: item.address_line_1 || '',
      city: item.city || '',
      postcode: item.postcode || '',
      country: item.country || '',
    });
    setSearchData([]);
    Keyboard.dismiss();
  };

  return (
    <View
      style={[
        styles.safeareaview,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <Header txt="Business Address" borderBottomEnabled={true} />

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.searchWrapper}>
              <View style={styles.inputicon}>
                <Image source={icons.ic_search} style={styles.searchic} />

                <Input
                  style={styles.noBorderInput}
                  placeholder="Search postcode"
                  returnKeyType="search"
                  value={searchAddressInput}
                  onChangeText={setSearchAddressInput}
                />
              </View>

              {searchData.length > 0 && (
                <AddressList
                  response={searchData}
                  onSelect={handleSelectAddress}
                />
              )}
            </View>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.inputContainer}>
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
                    value={formData.postcode}
                    onChangeText={txt => handleInput('postcode', txt)}
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
                    placeholder="Enter country"
                    value={formData.country}
                    onChangeText={txt => handleInput('country', txt)}
                    returnKeyType="done"
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>

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
  );
};

export default BusinessAddressScreen;
