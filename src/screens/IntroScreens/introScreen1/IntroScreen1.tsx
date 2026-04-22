import { Image, ScrollView, View } from 'react-native'
import React from 'react'
import { styles } from './style'
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold'
import { images } from '@/config/images'
import ButtonComponent from '@/components/buttonComponent/ButtonComponent'
import InterTightMedium from '@/components/fontComponents/InterTightMedium'
import { IntroScreen1Props } from '@/types/navigation.types'

const IntroScreen1 = ({ navigation }: IntroScreen1Props) => {
  
  const handleNavigation = () => {
    navigation.navigate("IntroScreen2")
  }
  return (
    <ScrollView
     
      contentContainerStyle={styles.scrollView}
    >
      <View style={styles.container}>
        <View style={styles.introContainer}>
          <View style={styles.headerTextContainer}>
          
              <InterTightSemiBold
                fsize={24}
                fcolor="#2D2D2D"
                textAlign="center"
              >
                Streamline Your Clients Quotes & Invoices
              </InterTightSemiBold>
        
          </View>
          <View style={styles.imageContainer}>
            <Image source={images.img_intro} style={styles.imageContainer} />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerComponent}>
            <View style={styles.slideContainer}>
              <ButtonComponent
                onPress={handleNavigation}
                style={styles.slide1}
              />
              <ButtonComponent
                onPress={handleNavigation}
                style={styles.slide2}
              />
            </View>
            <View style={styles.bttnContainer}>
              <ButtonComponent onPress={handleNavigation} style={styles.bttn1}>
                <InterTightMedium fsize={16} fcolor="#2D2D2D">
                  Skip
                </InterTightMedium>
              </ButtonComponent>
              <ButtonComponent onPress={handleNavigation} style={styles.bttn2}>
                <InterTightMedium fsize={16} fcolor="#FFFFFF">
                  Next
                </InterTightMedium>
              </ButtonComponent>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default IntroScreen1