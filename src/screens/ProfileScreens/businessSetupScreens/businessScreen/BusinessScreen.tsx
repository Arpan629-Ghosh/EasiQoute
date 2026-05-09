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
import { BusinessScreenProps } from '@/types/navigation.types';
import { images } from '@/config/images';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import CustomToggle from '@/components/switch/CustomToggle';
import ReactNativePhoneInput from 'react-native-phone-input';
import ServiceChips from '@/components/servicesComponent/ServiceChips';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorPickerSheet from '@/components/colorPicker/ColorPickerSheet';
import { useAppTheme } from '@/hooks/useAppTheme';
import Header from '@/components/header/Header';

interface BusinessForm {
  name: string;
  phone: string;
  color: string;
  vatNumber: string;
  services: string[];
  profileImage: string | null;
}

const BusinessScreen = ({ navigation }: BusinessScreenProps) => {
  const [form, setForm] = useState<BusinessForm>({
    name: '',
    phone: '',
    color: '#00AAFF',
    vatNumber: '',
    services: [],
    profileImage: null,
  });
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const phoneRef = useRef<ReactNativePhoneInput>(null);
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  

  const navigateToAddress = () => {
    navigation.navigate('BusinessAddressScreen');
  };

  const navigateToTabs = () => {
    navigation.replace('MainTabs');
  };

  const updateField = useCallback((key: keyof BusinessForm, value: any) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
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

  return (
    <SafeAreaView style={styles.safeareaview} edges={['top']}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
          enabled={true}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.scrollview}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <Header txt="Business Profile Setup" borderBottomEnabled={true} />
            <View style={styles.firstContainer}>
              <View style={styles.logoContainer}>
                <View style={styles.profilePic}>
                  <TouchableOpacity>
                    <Image
                      source={
                        isDark ? images.img_darkcamera : images.img_camera
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
                  {/* <CountryPickerComponent
                    ref={phoneRef}
                    value={form.phone}
                    onChange={phone => updateField('phone', phone)}
                  /> */}
                </View>
              </View>
            </View>
            <View style={styles.addressInpContainer}>
              <View style={styles.addressFormNavContainer}>
                <View style={styles.txtContainer}>
                  <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                    Address
                  </InterTightMedium>
                </View>
                <TouchableOpacity
                  onPress={navigateToAddress}
                  style={styles.addimg}
                >
                  <Image source={images.img_address} style={styles.addimg} />
                </TouchableOpacity>
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
              onPress={navigateToTabs}
              bg={theme.primary}
              bttnTxt="Continue"
              txtColor={theme.primaryText}
            />
          </View>
        </View>

        <ColorPickerSheet
          visible={open}
          onClose={handleClose}
          onSelect={c => updateField('color', c)}
        />
      </View>
    </SafeAreaView>
  );
};

export default BusinessScreen;
