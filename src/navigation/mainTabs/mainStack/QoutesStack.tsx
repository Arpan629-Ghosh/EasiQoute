import React from 'react'
import { QuoteStackParamList } from '@/types/navigation.types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainQouteScreen from '@/screens/mainQuoteScreen/MainQouteScreen'


const Stack = createNativeStackNavigator<QuoteStackParamList>()
const QoutesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='MainQuoteScreen'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='MainQuoteScreen'
        component={MainQouteScreen}
        options={{
          title: "Main Quote",
          headerShown: false
        }}
      />
      
    </Stack.Navigator>
  )
}

export default QoutesStack