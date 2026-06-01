import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ClientStackParamList } from '@/types/navigation.types'
import ClientScreen from '@/screens/bottomTabScreens/clientScreen/ClientScreen';


const Stack = createNativeStackNavigator<ClientStackParamList>();
const ClientStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='ClientScreen'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='ClientScreen'
        component={ClientScreen}
      />
    </Stack.Navigator>
  )
}

export default ClientStack