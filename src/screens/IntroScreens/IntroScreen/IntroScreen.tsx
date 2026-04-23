import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import { IntroScreenProps } from '@/types/navigation.types';
import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import { styles } from './style';
import { DATA, OnboardingItem } from '@/config/onBoardingData';


const { width } = Dimensions.get('window');



const IntroScreen = ({navigation} : IntroScreenProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    }
  };
    
    const handleNavigation = () => {
        navigation.navigate("ProfileScreen")
    }

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    return (
      <View style={styles.slide}>
        <Text>
          {item.textParts.map((part, index) =>
            part.highlight ? (
              <InterTightSemiBold key={index} fsize={24} fcolor="#082B60" textAlign="center">
                {part.text}
              </InterTightSemiBold>
            ) : (
              <InterTightSemiBold key={index} fsize={24} fcolor="#2D2D2" textAlign="center">
                {part.text}
              </InterTightSemiBold>
            ),
          )}
        </Text>

        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      <View style={styles.footer}>
        {currentIndex === 0 ? (
          <View style={styles.slideContainer}>
            <View style={styles.slide1} />
            <View style={styles.slide2} />
          </View>
        ) : (
          <View style={styles.slideContainer}>
            <View style={styles.slide2} />
            <View style={styles.slide1} />
          </View>
        )}
        <View style = {styles.bttnContainer}>
          {currentIndex === 0 ? (
            <>
              <ButtonComponent onPress={handleNext} style={styles.bttn1}>
                <InterTightMedium fsize={16} fcolor="#2D2D2D">
                  Skip
                </InterTightMedium>
              </ButtonComponent>

              <ButtonComponent style={styles.bttn2} onPress={handleNext}>
                <InterTightMedium fsize={16} fcolor="#FFFFFF">
                  Next
                </InterTightMedium>
              </ButtonComponent>
            </>
          ) : (
            <ButtonComponent onPress={handleNavigation} style={styles.fullBtn}>
              <InterTightMedium fsize={16} fcolor="#FFFFFF">
                Let's Go
              </InterTightMedium>
            </ButtonComponent>
          )}
        </View>
      </View>
    </View>
  );
};

export default IntroScreen;

