import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createStyles } from './style';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { icons } from '@/config/icons';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { images } from '@/config/images';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import CustomToggle from '@/components/switch/CustomToggle';
import ReactNativePhoneInput from 'react-native-phone-input';
import ServiceChips from '@/components/servicesComponent/ServiceChips';
import ColorPickerSheet from '@/components/colorPicker/ColorPickerSheet';
import { useAppTheme } from '@/hooks/useAppTheme';
import Header from '@/components/header/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePicker from '@/components/imagePicker/ImagePicker';
import CountryPickerComponent from '@/components/countryPicker/CountryPickerComponent';
import { FormData } from '../businessAddressScren/BusinessAddressScreen';
import { useAuth } from '@/hooks/apis/useAuth';
import { useToast } from '@/hooks/useToast';
import { useSettings } from '@/hooks/apis/useSettings';
import { RootScreenProps } from '@/types/navigation.types';

interface BusinessForm {
  name: string;
  phone: string;
  color: string;
  vatNumber: string;
  services: string[];
  address: {
    address: string;
    city: string;
    postcode: string;
    country: string;
  } | null;
  profileImage: {
    uri: string;
    type: string;
    fileName?: string;
  } | null;
}

const BusinessScreen = ({ navigation, route }: RootScreenProps<'BusinessScreen'>) => {
  const [form, setForm] = useState<BusinessForm>({
    name: '',
    phone: '',
    color: '#00AAFF',
    vatNumber: '',
    services: [],
    address: null,
    profileImage: null,
  });
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const phoneRef = useRef<ReactNativePhoneInput>(null);
  const insets = useSafeAreaInsets();
  const {isEdit} = route.params || false
  const { theme, isDark } = useAppTheme();
  const { showToast } = useToast();
  const { companyProfileSetup, loading } = useAuth();
  const { updateCompanyProfile, settingLoading } = useSettings();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToAddress = () => {
    navigation.navigate('BusinessAddressScreen', {
      onGoBack: fillAddressForm,
      address: form.address,
    });
  };

  const handleCompanyProfileSetup = async () => {
    try {
      await companyProfileSetup({
        name: form.name,
        logo: form.profileImage || null,
        address: form.address?.address,
        postcode: form.address?.postcode,
        country: form.address?.country,
        city: form.address?.city,
        phone_number: form.phone,
        vat_number: form.vatNumber || null,
        brand_color: form.color,
      });
      showToast('Company profile setup successfully.');
      navigation.replace('MainTabs', {
        screen: 'Home',

        params: {
          screen: 'HomeScreen',
        },
      });
    } catch (error) {
      showToast(String(error), 'error')
      console.log('COMPANY PROFILE SETUP ERROR', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateCompanyProfile({
        name: form.name,
        logo: form.profileImage || null,
        address: form.address?.address,
        postcode: form.address?.postcode,
        country: form.address?.country,
        city: form.address?.city,
        phone_number: form.phone,
        vat_number: form.vatNumber || null,
        brand_color: form.color,
      });
      showToast('Company profile updated successfully.');
      navigation.navigate('MainTabs', {
        screen: 'Settings',

        params: {
          screen: 'SettingScreen',
        },
      });
    } catch (error) {
      showToast(String(error), 'error');
      console.log('COMPANY PROFILE SETUP ERROR', error);
    }
  }
  const updateField = useCallback((key: keyof BusinessForm, value: any) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const fillAddressForm = (data: FormData) => {
    setForm(prev => ({
      ...prev,
      address: {
        address: data.address,
        city: data.city,
        postcode: data.postcode,
        country: data.country,
      },
    }));
    // console.log(form);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    setOpenOptions(false);
  }, []);

  const toggleService = useCallback((type: string) => {
    if (type === 'Upload my own list') {
      console.log('Upload flow');
      return;
    }

    setForm(prev => {
      const isSelected = prev.services.includes(type);

      const updatedServices = isSelected
        ? prev.services.filter(item => item !== type)
        : [...prev.services, type];

      return {
        ...prev,
        services: updatedServices,
      };
    });
  }, []);

  const setImageUri = useCallback((uri: string) => {
    setForm(prev => ({
      ...prev,
      profileImage: {
        uri: uri,
        type: 'image/jpeg',
        fileName: 'profile.jpg',
      },
    }));
  }, []);

  const removeImageUri = useCallback(() => {
    setForm(prev => ({
      ...prev,
      profileImage: null,
    }));
  }, []);

  // console.log(user)

  return (
    <View style={[styles.safeareaview, { paddingBottom: insets.bottom }]}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
          enabled={true}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <Header
            txt={isEdit ? 'Business Information' : 'Business Profile Setup'}
            borderBottomEnabled={true}
          />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollview}
          >
            <View style={styles.firstContainer}>
              <View style={styles.logoContainer}>
                <View style={styles.profilePic}>
                  <TouchableOpacity onPress={() => setOpenOptions(true)}>
                    <Image
                      source={
                        form.profileImage
                          ? { uri: form.profileImage.uri }
                          : isDark
                          ? images.img_darkcamera
                          : images.img_camera
                      }
                      style={styles.profileImg}
                    />
                    <Image
                      source={isDark ? icons.ic_darkadd : icons.ic_add}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Your logo will appear on quotes, invoices, and client emails.
                </InterTightRegular>
              </View>
              <View style={styles.colorpicker}>
                <Image
                  source={images.img_brandcolor}
                  style={styles.brandcolor}
                />
                <View style={styles.colorView}>
                  <TouchableOpacity
                    style={[styles.colorBttn, { backgroundColor: form.color }]}
                    onPress={() => setOpen(true)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.businessInpContainer}>
              <View style={styles.businessComponent}>
                <View style={styles.businessInp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Business Name
                  </InterTightRegular>

                  <Input
                    value={form.name}
                    onChangeText={txt => updateField('name', txt)}
                    placeholder="Enter business name"
                    onSubmitEditing={() => phoneRef.current?.focus()}
                    keyboardType="name-phone-pad"
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.businessInp}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Business Phone number
                  </InterTightRegular>
                  <CountryPickerComponent
                    ref={phoneRef}
                    value={form.phone}
                    onChange={phone => updateField('phone', phone)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.addressInpContainer}>
              <View style={styles.addressFormNavContainer}>
                {form.address ? (
                  <>
                    <View style={styles.address}>
                      <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                        Address
                      </InterTightMedium>
                      <TouchableOpacity onPress={navigateToAddress}>
                        <Image source={icons.ic_edit} style={styles.edit} />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                        {' '}
                        {`${form.address.address} ${form.address.country}`}
                      </InterTightRegular>
                      <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                        {' '}
                        {`${form.address.city} ${form.address.postcode}`}
                      </InterTightRegular>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.txtContainer}>
                      <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                        Address
                      </InterTightMedium>
                    </View>
                    <TouchableOpacity
                      onPress={navigateToAddress}
                      style={styles.addimg}
                    >
                      <Image
                        source={images.img_address}
                        style={styles.addimg}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>

            <View style={styles.vatContainer}>
              <View style={styles.toggleContainer}>
                <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
                  Are you VAT registered?
                </InterTightRegular>
                <CustomToggle value={enabled} onToggle={setEnabled} />
              </View>

              {enabled && (
                <View style={styles.vatinpcontainer}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    VAT Number
                  </InterTightRegular>
                  <Input
                    value={form.vatNumber}
                    onChangeText={txt => updateField('vatNumber', txt)}
                    placeholder="Enter vat number"
                  />
                </View>
              )}
            </View>

            <View style={styles.serviceContainer}>
              <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                What do you do?
              </InterTightMedium>
              <View style={styles.bttnContainer}>
                <ServiceChips
                  selected={form.services}
                  onToggle={toggleService}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <ButtonComponent
              onPress={isEdit ? handleUpdateProfile :handleCompanyProfileSetup}
              bg={theme.primary}
              bttnTxt={isEdit ? 'Update Info' : 'Continue'}
              showLoader={loading || settingLoading}
              gap={4}
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

        <ColorPickerSheet
          visible={open}
          onClose={handleClose}
          onSelect={c => updateField('color', c)}
        />
      </View>
    </View>
  );
};

export default BusinessScreen;
