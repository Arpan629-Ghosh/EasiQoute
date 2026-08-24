import {
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
import InterTightMedium from '@/components/appFonts/InterTightMedium';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import AppButton from '@/components/appButton/AppButton';
import { SearchAddressPayload } from '@/types/apis/auth.types';
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/apis/useAuth';
import { useClient } from '@/hooks/apis/useClient';
import { RootScreenProps } from '@/types/navigation.types';
import AddressDropdown from '@/components/adressDropdown/AddressDropdown';

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

const AddClientScreen = ({
  navigation,
  route,
}: RootScreenProps<'AddClientScreen'>) => {
  const [clientFormData, setClientFormData] = useState<ClientForm>({
    clientName: route.params?.clientDetails?.name || '',
    companyName: route.params?.clientDetails?.company_name || '',
    phNo: route.params?.clientDetails?.phone || '',
    email: route.params?.clientDetails?.email || '',
    search: '',
    streetAddress: route.params?.clientDetails?.address || '',
    city: route.params?.clientDetails?.city || '',
    postcode: route.params?.clientDetails?.postcode || '',
    country: route.params?.clientDetails?.country || '',
  });
  const [searchData, setSearchData] = useState<SearchAddressPayload[]>([]);
  const [searchAddressInput, setSearchAddressInput] = useState('');
  const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const debouncedSearch = useDebounce(searchAddressInput, 500);
  const { theme } = useAppTheme();
  const { showToast } = useToast();
  const { createClient, updateClient, updateClientLoader, loading } =
    useClient();
  const { searchAddress } = useAuth();
  const insets = useSafeAreaInsets();
  const clientDetails = route.params?.clientDetails;
  const isEdit = !!clientDetails?.id;

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
        console.log(error);
        setSearchData([]);
        setAddressLoading(false);
      } finally {
        setAddressLoading(false);
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
      const res = await createClient({
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
      setClientFormData({
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

      navigation.navigate('ClientDetailScreen', {
        clientId: res.id,
      });
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  const handleEditClient = async () => {
    try {
      const res = await updateClient({
        id: clientDetails?.id,
        email: clientFormData.email,
        name: clientFormData.clientName,
        phone: formatPhone,
        company_name: clientFormData.companyName,
        address: clientFormData.streetAddress,
        city: clientFormData.city,
        postcode: clientFormData.postcode,
        country: clientFormData.country,
      });
      showToast('Customer updated successfully.');
      setClientFormData({
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

      navigation.navigate('ClientDetailScreen', {
        clientId: res.id,
      });
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <Header
        txt={isEdit ? 'Edit Client' : 'Add Client'}
        borderBottomEnabled={true}
      />
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
              <AppInput
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
              <AppInput
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
              <AppInput
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
              <AppInput
                placeholder="Email Address"
                value={clientFormData.email}
                onChangeText={txt => updateField('email', txt)}
                returnKeyType="next"
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.searchWrapper}>
              <AddressDropdown
                data={searchData}
                value={debouncedSearch}
                loader={addressLoading}
                onText={setSearchAddressInput}
                onSelect={handleSelectAddress}
              />
            </View>

            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Street Address
              </InterTightRegular>
              <AppInput
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
              <AppInput
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
              <AppInput
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
              <AppInput
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
          <AppButton
            bttnTxt={isEdit ? 'Update Client' : 'Add Client'}
            bg={theme.primary}
            txtColor={theme.primaryText}
            showLoader={loading || updateClientLoader}
            onPress={isEdit ? handleEditClient : handleAddClient}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default AddClientScreen;
