import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/header/Header';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { SearchAddressPayload } from '@/types/apis/auth.types';
import { useDebounce } from '@/hooks/useDebounce';
import AddressList from '@/components/addressList/AddressList';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/apis/useAuth';
import { useClient } from '@/hooks/apis/useClient';
import { AddClientScreenProps } from '@/types/navigation.types';

interface ClientForm {
  clientName: string;
  companyName: string;
  phNo: string;
  email: string;
  search: string;
  streetAddress: string;
  city: string;
  postcode: string;
  country: string;
}

const AddClientScreen = ({ navigation } : AddClientScreenProps) => {
  const [clientFormData, setClientFormData] = useState<ClientForm>({
    clientName: '',
    companyName: '',
    phNo: '',
    email: '',
    search: '',
    streetAddress: '',
    city: '',
    postcode: '',
    country: '',
  });
  const [searchData, setSearchData] = useState<SearchAddressPayload[]>([]);
  const debouncedSearch = useDebounce(clientFormData.search, 500);
  const { theme } = useAppTheme();
  const { showToast } = useToast();
  const { createClient, loading } = useClient();
  const { searchAddress } = useAuth();
  const insets = useSafeAreaInsets();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const formatPhone = clientFormData.phNo.startsWith('+44')
    ? clientFormData.phNo
    : `${'+44'}${clientFormData.phNo}`;

  const styles = useMemo(() => createStyles(theme), [theme]);

  const updateField = useCallback((name: keyof ClientForm, value: string) => {
    setClientFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSelectAddress = useCallback((item: SearchAddressPayload) => {
    setClientFormData(prev => ({
      ...prev,
      streetAddress: item.address_line_1 || '',
      city: item.city || '',
      postcode: item.postcode || '',
      country: item.country || '',
    }));
    setSearchData([]);
    Keyboard.dismiss();
  }, []);

  const handleAddClient = async () => {
    try {
      await createClient({
        email: clientFormData.email,
        name: clientFormData.clientName,
        phone: formatPhone,
        company_name: clientFormData.companyName,
        address: clientFormData.streetAddress,
        city: clientFormData.city,
        postcode: clientFormData.postcode,
        country: clientFormData.country,
      });
        showToast('Customer saved successfully.');
        navigation.goBack()
    } catch (error) {
      showToast(String(error), 'error');
    }
  };
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <Header txt="Add Client" borderBottomEnabled={true} />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview}
        >
          <View style={styles.form}>
            <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
              Client Information
            </InterTightMedium>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Client Name
              </InterTightRegular>
              <Input
                placeholder="Full name"
                value={clientFormData.clientName}
                onChangeText={txt => updateField('clientName', txt)}
                textContentType="name"
                keyboardType="name-phone-pad"
                returnKeyType="next"
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Company Name
              </InterTightRegular>
              <Input
                placeholder="Company name"
                value={clientFormData.companyName}
                onChangeText={txt => updateField('companyName', txt)}
                textContentType="name"
                keyboardType="name-phone-pad"
                returnKeyType="next"
              />
            </View>
          </View>
          <View style={styles.form}>
            <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
              Contact Details
            </InterTightMedium>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Phone Number
              </InterTightRegular>
              <Input
                placeholder="Phone number"
                value={clientFormData.phNo}
                onChangeText={txt => updateField('phNo', txt)}
                keyboardType="number-pad"
                returnKeyType="next"
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Email Address
              </InterTightRegular>
              <Input
                placeholder="Email Address"
                value={clientFormData.email}
                onChangeText={txt => updateField('email', txt)}
                returnKeyType="next"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.searchWrapper}>
              <View style={styles.inputicon}>
                <Image source={icons.ic_search} style={styles.searchic} />
                <Input
                  style={styles.noBorderInput}
                  placeholder="Search postcode"
                  returnKeyType="search"
                  value={clientFormData.search}
                  onChangeText={txt => updateField('search', txt)}
                />
              </View>

              {searchData.length > 0 && (
                <AddressList
                  response={searchData}
                  onSelect={handleSelectAddress}
                />
              )}
            </View>

            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Street Address
              </InterTightRegular>
              <Input
                placeholder="Street Address"
                value={clientFormData.streetAddress}
                onChangeText={txt => updateField('streetAddress', txt)}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                City
              </InterTightRegular>
              <Input
                placeholder="City"
                value={clientFormData.city}
                onChangeText={txt => updateField('city', txt)}
                textContentType="name"
                returnKeyType="next"
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Postcode
              </InterTightRegular>
              <Input
                placeholder="Postcode"
                value={clientFormData.postcode}
                onChangeText={txt => updateField('postcode', txt)}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Country
              </InterTightRegular>
              <Input
                placeholder="Country"
                value={clientFormData.country}
                onChangeText={txt => updateField('country', txt)}
                returnKeyType="done"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bttnTxt="Add Client"
            bg={theme.primary}
            txtColor={theme.primaryText}
            showLoader={loading}
            onPress={handleAddClient}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default AddClientScreen;
