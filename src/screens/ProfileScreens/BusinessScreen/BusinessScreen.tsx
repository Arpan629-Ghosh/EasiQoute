import { Image, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { icons } from '@/config/icons';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { BusinessScreenProps } from '@/types/navigation.types';
import { images } from '@/config/images';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import ColorPickerSheet from '@/components/colorPicker/ColorPickerSheet';

const BusinessScreen = ({ navigation }: BusinessScreenProps) => {
  const [color, setColor] = useState('#00AAFF');
  const [open, setOpen] = useState(false);
  const navigateToBack = () => {
    navigation.navigate('ProfileScreen');
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerComponent}>
              <ButtonComponent onPress={navigateToBack}>
                <Image source={icons.ic_back} style={styles.img} />
              </ButtonComponent>

              <InterTightMedium fsize={18} fcolor="#2D2D2D">
                Business Profile Setup
              </InterTightMedium>
            </View>
          </View>

          <View style={styles.firstContainer}>
            <View style={styles.logoContainer}>
              <View style={styles.profilePic}>
                <ButtonComponent>
                  <Image source={images.img_camera} style={styles.profileImg} />
                  <Image source={icons.ic_add} style={styles.icon} />
                </ButtonComponent>
              </View>
              <InterTightRegular fsize={14} fcolor="#2D2D2D">
                Your logo will appear on quotes, invoices, and client emails.
              </InterTightRegular>
            </View>
            <View style={styles.colorpicker}>
              <Image source={images.img_brandcolor} style={styles.brandcolor} />
              <View style={styles.colorView}>
                <ButtonComponent
                  style={[styles.colorBttn, { backgroundColor: color }]}
                  onPress={() => setOpen(true)}
                />
              </View>
            </View>
          </View>
        </View>
        <ColorPickerSheet
          visible={open}
          onClose={() => setOpen(false)}
          onSelect={c => setColor(c)}
        />
      </View>
    </ScrollView>
  );
};

export default BusinessScreen;
