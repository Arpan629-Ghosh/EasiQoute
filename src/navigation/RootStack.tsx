import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation.types'
import AuthStack from './authStack/AuthStack'


const Stack = createNativeStackNavigator<RootStackParamList>()
const RootStack = () => {
  return (
      <Stack.Navigator

      >
          <Stack.Screen
              name='AuthStack'
        component={AuthStack}
        options={
          {
            headerShown: false
          }
        }
          />
    </Stack.Navigator>
  )
}

export default RootStack