import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { icons } from '@/config/icons';
import { styles } from './style';
import { BusinessAddressScreenProps } from '@/types/navigation.types';
import Input from '@/components/inputComponent/Input';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import { TextInput } from 'react-native-gesture-handler';

interface FormData{
  streetAddress: string;
  city: string;
  postcode: string,
  country: string
}

const BusinessAddressScreen = ({ navigation }: BusinessAddressScreenProps) => {

  const [formData, setFormData] = useState<FormData>({
    streetAddress: "",
    city: "",
    postcode: "",
    country: ""
  })

  const addressRef = useRef<TextInput | null>(null);
  const cityRef = useRef<TextInput | null>(null);
  const postRef = useRef<TextInput | null>(null);
  const countryRef = useRef < TextInput | null>(null)


  const handleInput = (name : string, value : string) => {
    setFormData((prev) => ({
      ...prev,
      [name] : value
    }))
  }
  const navigateToBack = () => {
    navigation.goBack()
  };
  return (
    <SafeAreaView style={styles.safeareaview} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
        enabled={true}
        keyboardVerticalOffset={3}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerComponent}>
              <ButtonComponent onPress={navigateToBack}>
                <Image source={icons.ic_back} style={styles.img} />
              </ButtonComponent>

              <InterTightMedium fsize={18} fcolor="#2D2D2D" textAlign="center">
                Business Address
              </InterTightMedium>

              <View style={styles.emptyview} />
            </View>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
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
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    Street Address
                  </InterTightRegular>
                  <Input
                    ref={addressRef}
                    placeholder="Enter street address"
                    value={formData.streetAddress}
                    onChangeText={txt => handleInput('streetAddress', txt)}
                    onSubmitEditing={() => cityRef.current?.focus()}
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inp}>
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
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
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
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
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    Country
                  </InterTightRegular>
                  <Input
                    ref={countryRef}
                    value={formData.country}
                    placeholder="Enter country"
                    onChangeText={txt => handleInput('country', txt)}
                    returnKeyType='done'
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.footerContainer}>
              <ButtonComponent style={styles.bttn}>
                <InterTightMedium fsize={16} fcolor="#FFFFFF">
                  Continue
                </InterTightMedium>
              </ButtonComponent>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BusinessAddressScreen;
