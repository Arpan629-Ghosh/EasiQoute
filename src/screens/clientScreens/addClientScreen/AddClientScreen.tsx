import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/ui/header/Header';
import InterTightMedium from '@/components/ui/appFonts/InterTightMedium';
import InterTightRegular from '@/components/ui/appFonts/InterTightRegular';
import AppInput from '@/components/ui/appInput/AppInput';
import AppButton from '@/components/ui/appButton/AppButton';
import { SearchAddressPayload } from '@/types/apis/auth.types';
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/hooks/useToast';
import { RootScreenProps } from '@/types/navigation.types';
import AddressDropdown from '@/components/adressDropdown/AddressDropdown';
import { useCreateClients } from '@/hooks/apis/clients/useCreateClients';
import { useUpdateClient } from '@/hooks/apis/clients/useUpdateClient';
import { formatPhone } from '@/utils/formatPhone';
import { useSearchAddress } from '@/hooks/apis/auth/useSearchAddress';

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
  const clientNameRef = useRef<TextInput>(null);
  const companyNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const streetAddressRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const postcodeRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);

 
  const debouncedSearch = useDebounce(searchAddressInput, 500);
  const { theme } = useAppTheme();
  const { showToast } = useToast();
  const { createClientMutateAsync, isCreating } = useCreateClients();
  const { updateClientMutate, isUpdatingClient } = useUpdateClient();
  const { data } = useSearchAddress(debouncedSearch);
  const insets = useSafeAreaInsets();
  const clientDetails = route.params?.clientDetails;
  const isEdit = !!clientDetails?.id;

  const focusNext = useCallback(
    (nextRef: React.RefObject<TextInput | null>) => {
      nextRef.current?.focus();
    },
    [],
  );

  useEffect(() => {
    const fetchAddress = async () => {
      if (!debouncedSearch?.trim() || debouncedSearch.length < 3) {
        setSearchData([]);
        return;
      }

      try {
        setAddressLoading(true)

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
      const res = await createClientMutateAsync({
        email: clientFormData.email,
        name: clientFormData.clientName,
        phone: formatPhone(clientFormData.phNo),
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
        clientId: res.payload.id,
      });
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  const handleEditClient = async () => {
    try {
      const res = await updateClientMutate({
        id: clientDetails?.id,
        email: clientFormData.email,
        name: clientFormData.clientName,
        phone: formatPhone(clientFormData.phNo),
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
        clientId: res.payload.id,
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
                ref={clientNameRef}
                placeholder="Full name"
                value={clientFormData.clientName}
                onChangeText={txt => updateField('clientName', txt)}
                textContentType="name"
                keyboardType="name-phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => focusNext(companyNameRef)}
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Company Name
              </InterTightRegular>
              <AppInput
                ref={companyNameRef}
                placeholder="Company name"
                value={clientFormData.companyName}
                onChangeText={txt => updateField('companyName', txt)}
                textContentType="name"
                keyboardType="name-phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => focusNext(phoneRef)}
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
                ref={phoneRef}
                placeholder="Phone number"
                value={clientFormData.phNo}
                onChangeText={txt => updateField('phNo', txt)}
                keyboardType="number-pad"
                returnKeyType="next"
                onSubmitEditing={() => focusNext(emailRef)}
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Email Address
              </InterTightRegular>
              <AppInput
                ref={emailRef}
                placeholder="Email Address"
                value={clientFormData.email}
                onChangeText={txt => updateField('email', txt)}
                returnKeyType="next"
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                onSubmitEditing={() => focusNext(streetAddressRef)}
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
                ref={streetAddressRef}
                placeholder="Street Address"
                value={clientFormData.streetAddress}
                onChangeText={txt => updateField('streetAddress', txt)}
                returnKeyType="next"
                onSubmitEditing={() => focusNext(cityRef)}
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                City
              </InterTightRegular>
              <AppInput
                ref={cityRef}
                placeholder="City"
                value={clientFormData.city}
                onChangeText={txt => updateField('city', txt)}
                textContentType="name"
                returnKeyType="next"
                onSubmitEditing={() => focusNext(postcodeRef)}
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Postcode
              </InterTightRegular>
              <AppInput
                ref={postcodeRef}
                placeholder="Postcode"
                value={clientFormData.postcode}
                onChangeText={txt => updateField('postcode', txt)}
                returnKeyType="next"
                onSubmitEditing={() => focusNext(countryRef)}
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Country
              </InterTightRegular>
              <AppInput
                ref={countryRef}
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
            showLoader={isCreating || isUpdatingClient}
            onPress={isEdit ? handleEditClient : handleAddClient}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default AddClientScreen;
