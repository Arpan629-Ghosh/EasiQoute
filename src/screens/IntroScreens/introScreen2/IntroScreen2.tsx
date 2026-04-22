import { View, FlatList } from 'react-native'
import React from 'react'
import { styles } from './style'
import { DATA } from '@/config/onBoardingData'
import RenderItem from '@/components/onBoardingScreen2Components/renderItemComponent/RenderItem'
import ItemHeader from '@/components/onBoardingScreen2Components/headerComponent/ItemHeader'
import ItemFooter from '@/components/onBoardingScreen2Components/footerComponent/ItemFooter'
import { IntroScreen2Props } from '@/types/navigation.types'

const IntroScreen2: React.FC<IntroScreen2Props> = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (<RenderItem item={item} />)}
        keyExtractor={item => item.id}
        ListHeaderComponent={<ItemHeader />}
        ListFooterComponent={<ItemFooter/>}
      />
    </View>
  )
}

export default IntroScreen2