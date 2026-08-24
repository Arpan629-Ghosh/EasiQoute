import { StyleSheet, TextInput, View } from 'react-native';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import ReactNativePhoneInput from 'react-native-phone-input';
import { fontFamily } from '@/constants/fontFamily';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal'
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
type Props = {
  value?: string;
  onChange?: (phone: string) => void;
};

const CountryPickerComponent = forwardRef<
  ReactNativePhoneInput<typeof TextInput>,
  Props
>(({ value, onChange }, ref) => {
  const [phoneCountryCode, setPhoneCountryCode] = useState<CountryCode>('FR');

  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(value || '');

  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme])

 
  useEffect(() => {
    if (value !== undefined) {
      setPhoneNumber(value);
    }
  }, [value]);

  const handleCountrySelect = (country: any) => {
    setPhoneCountryCode(country.cca2);

    const newPhoneNumber = `+${country.callingCode[0]}`;

    setPhoneNumber(newPhoneNumber);
    onChange?.(newPhoneNumber);

    if (ref && 'current' in ref && ref.current) {
      ref.current?.selectCountry(country.cca2.toLowerCase());
      ref.current?.setValue(newPhoneNumber);
    }

    setShowPhoneCountryPicker(false);
  };

  return (
    <View style={styles.container}>
      <ReactNativePhoneInput
        ref={ref}
        style={styles.input}
        initialValue={phoneNumber}
        initialCountry={phoneCountryCode.toLowerCase()}
        onPressFlag={() => setShowPhoneCountryPicker(true)}
        onChangePhoneNumber={text => {
          setPhoneNumber(text);
          onChange?.(text); 
        }}
      />

      <CountryPicker
        countryCode={phoneCountryCode}
        visible={showPhoneCountryPicker}
        onSelect={handleCountrySelect}
        onClose={() => setShowPhoneCountryPicker(false)}
        withFlagButton={false}
        withFilter
      />
    </View>
  );
});

export default React.memo(CountryPickerComponent);

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontFamily: fontFamily.INTER_TIGHT.regular,
    height: 48,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderColor: '#E4E6F4',
    color: theme.textPrimary,
  },
});
