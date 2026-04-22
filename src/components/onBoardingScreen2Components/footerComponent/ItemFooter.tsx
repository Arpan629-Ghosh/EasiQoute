import { StyleSheet, View } from 'react-native';
import React from 'react';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { AuthStackParamList } from '@/types/navigation.types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ItemFooter = () => {
  
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>()
  const navigateToBack = () => {
    navigation.navigate("IntroScreen1")
  }

  const navigateToProfile = () => {
    navigation.navigate("ProfileScreen")
  }
  return (
    <View style={styles.footerComponent}>
      <View style={styles.slideContainer}>
        <ButtonComponent onPress={navigateToBack} style={styles.slide2} />
        <ButtonComponent style={styles.slide1} />
      </View>
      <View style={styles.bttnContainer}>
        <ButtonComponent onPress={navigateToProfile} style={styles.bttn}>
          <InterTightMedium fsize={16} fcolor="#FFFFFF">
            Let’s Go!
          </InterTightMedium>
        </ButtonComponent>
      </View>
    </View>
  );
};

export default ItemFooter;

const styles = StyleSheet.create({
  footerComponent: {
    height: 92,
    width: '100%',
    marginTop: 90,
    gap: 24,
    alignItems: 'center',

  },
  slideContainer: {
    flexDirection: 'row',
    height: 6,
    width: 40,
    gap: 4,
  },
  slide1: {
    height: 6,
    width: 24,
    borderRadius: 30,
    backgroundColor: '#082B60',
  },
  slide2: {
    height: 6,
    width: 12,
    borderRadius: 30,
    backgroundColor: '#E4E6F4',
  },
  bttnContainer: {
    height: 46,
    gap: 12,
    marginTop: 8,
    flexDirection: 'row',
  },
  bttn: {
    height: 46,
    width: '100%',
    borderRadius: 12,
    gap: 12,
    padding: 12,
    backgroundColor: '#082B60',
    alignItems: 'center',
  },
});
