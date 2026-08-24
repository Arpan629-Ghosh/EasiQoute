import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import AppButton from '@/components/appButton/AppButton';
import { createStyles } from './style';
import AppInput from '@/components/appInput/AppInput';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import { TextInput } from 'react-native-gesture-handler';
import { useAppTheme } from '@/hooks/useAppTheme';
import Header from '@/components/header/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/hooks/apis/useAuth';
import { SearchAddressPayload } from '@/types/apis/auth.types';
import { RootScreenProps } from '@/types/navigation.types';
import { useTranslation } from 'react-i18next';
import AddressDropdown from '@/components/adressDropdown/AddressDropdown';

export interface FormData {
  address: string;
  city: string;
  postcode: string;
  country: string;
}

const BusinessAddressScreen = ({
  navigation,
  route,
}: RootScreenProps<'BusinessAddressScreen'>) => {
  const existingAddress = route.params?.address;

  const [formData, setFormData] = useState<FormData>({
    address: existingAddress?.address || '',
    city: existingAddress?.city || '',
    postcode: existingAddress?.postcode || '',
    country: existingAddress?.country || '',
  });

  const [searchAddressInput, setSearchAddressInput] = useState('');

  const [searchData, setSearchData] = useState<SearchAddressPayload[]>([]);
   const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const addressRef = useRef<TextInput | null>(null);
  const cityRef = useRef<TextInput | null>(null);
  const postRef = useRef<TextInput | null>(null);
  const countryRef = useRef<TextInput | null>(null);

  const insets = useSafeAreaInsets();

  const debouncedSearch = useDebounce(searchAddressInput, 500);

  const { theme } = useAppTheme();

  const { searchAddress } = useAuth();
  const { t } = useTranslation();

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
        setAddressLoading(true)
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
        setSearchData([]);
        setAddressLoading(false)
      } finally {
        setAddressLoading(false)
      }
    };

    fetchAddress();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleSelectAddress = useCallback((item: SearchAddressPayload) => {
    setFormData({
      address: item.address_line_1 || '',
      city: item.city || '',
      postcode: item.postcode || '',
      country: item.country || '',
    });

    setSearchAddressInput('');
    setSearchData([]);

    Keyboard.dismiss();
  }, []);

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
        <Header
          txt={t('auth.businessProfile.addressHeader')}
          borderBottomEnabled={true}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <AddressDropdown
                data={searchData}
                value={debouncedSearch}
                loader={addressLoading}
                onText={setSearchAddressInput}
                onSelect={handleSelectAddress}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inp}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  {t('inputs.streetAddress.label')}
                </InterTightRegular>

                <AppInput
                  ref={addressRef}
                  placeholder={t('inputs.streetAddress.placeholder')}
                  value={formData.address}
                  onChangeText={txt => handleInput('address', txt)}
                  onSubmitEditing={() => cityRef.current?.focus()}
                  returnKeyType="next"
                />

                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {t('inputs.city.label')}
                  </InterTightRegular>

                  <AppInput
                    ref={cityRef}
                    placeholder={t('inputs.city.placeholder')}
                    value={formData.city}
                    onChangeText={txt => handleInput('city', txt)}
                    onSubmitEditing={() => postRef.current?.focus()}
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {t('inputs.postcode.label')}
                  </InterTightRegular>

                  <AppInput
                    ref={postRef}
                    placeholder={t('inputs.postcode.placeholder')}
                    value={formData.postcode}
                    onChangeText={txt => handleInput('postcode', txt)}
                    onSubmitEditing={() => countryRef.current?.focus()}
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {t('inputs.country.label')}
                  </InterTightRegular>

                  <AppInput
                    ref={countryRef}
                    placeholder={t('inputs.country.placeholder')}
                    value={formData.country}
                    onChangeText={txt => handleInput('country', txt)}
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <AppButton
            bg={theme.primary}
            bttnTxt={t('button.continue')}
            txtColor={theme.primaryText}
            onPress={handleSave}
          />
        </View>
      </View>
    </View>
  );
};

export default BusinessAddressScreen;
