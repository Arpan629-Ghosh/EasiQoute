import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { IntroItem } from '@/config/onBoardingData'


interface Prop {
    item: IntroItem
}
const RenderItem = ({item} : Prop) => {
  return (
    <View style = {styles.img}>
          <Image source={item.image} style={styles.img} />
    </View>
  )
}

export default React.memo(RenderItem)

const styles = StyleSheet.create({
  img: {
    marginTop: 32,
    height: 488,
    width: '100%',
  },
});