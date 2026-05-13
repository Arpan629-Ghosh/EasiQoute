import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import { IntroScreenProps } from '@/types/navigation.types';
import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Text,
  StatusBar,
} from 'react-native';
import { createStyles } from './style';
import { OnboardingItem, useOnBoardingData } from '@/config/onBoardingData';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const { width } = Dimensions.get('window');



const IntroScreen = ({navigation} : IntroScreenProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme])

  const DATA = useOnBoardingData();

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
              <InterTightSemiBold key={index} fsize={24} fcolor={theme.textMuted} textAlign="center">
                {part.text}
              </InterTightSemiBold>
            ) : (
              <InterTightSemiBold key={index} fsize={24} fcolor={theme.textPrimary} textAlign="center">
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
    <View style={[styles.container, { paddingBottom: insets.bottom + 12 }]}>
      {isDark ? (
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
      ) : (
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
      )}
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
        <View style={styles.bttnContainer}>
          {currentIndex === 0 ? (
            <>
              <ButtonComponent
                onPress={handleNext}
                borderc={theme.border}
                bttnTxt="Skip"
                borderwidth={1}
                buttonWidth={165.5}
                txtColor={theme.textPrimary}
              />

              <ButtonComponent
                onPress={handleNext}
                bg={theme.primary}
                bttnTxt="Next"
                buttonWidth={165.5}
                txtColor={theme.primaryText}
              />
            </>
          ) : (
            <ButtonComponent
              bg={theme.primary}
              onPress={handleNavigation}
              bttnTxt=" Let's Go"
              buttonWidth={343}
              txtColor={theme.primaryText}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default IntroScreen;

