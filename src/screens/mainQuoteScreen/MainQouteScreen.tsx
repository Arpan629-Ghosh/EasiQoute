import { Image, View } from 'react-native';
import React from 'react';
import { styles } from './style';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';

const MainQouteScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View style={styles.headerComponent}>
            <InterTightSemiBold fsize={24} fcolor="#2D2D2D">
              Quotes
            </InterTightSemiBold>
            <View style={styles.searchandfilter}>
              <View style={styles.inputicon}>
                <Image source={icons.ic_whitesearch} style={styles.searchic} />
                <Input
                  inputWidth={325}
                  bg="#FFFFFF"
                  style={styles.noBorderInput}
                />
              </View>

              <View style={styles.imgView}>
                <Image source={icons.ic_filter} style={styles.img} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MainQouteScreen;
