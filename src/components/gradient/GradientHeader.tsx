import { Image, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { images } from '@config/images';

const GradientHeader = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.logoContainer}>
        <Image source={images.img_bg} style={styles.logoContainer} />
        <Image source={images.img_logo} style={styles.logo} />
      </View>
    </View>
  );
};

export default GradientHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    width: '100%',
    height: 170,
    // gap : 10
  },
  logo: {
    width: 162.59,
    height: 30,
    position: 'absolute',
    marginTop: 80,
    marginLeft: 106.2,
    marginBottom: 46,
    marginRight: 106.2,
    resizeMode: 'contain',
  },
});
